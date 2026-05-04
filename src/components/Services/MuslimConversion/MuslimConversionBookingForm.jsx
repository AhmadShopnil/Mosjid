"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "@/helper/axiosInstance";

//  Validation 
const bookigSchema = z.object({
    name: z.string().min(1, "Applicant name is required"),
    father_name: z.string().min(1, "Father name is required"),
    booked_date: z.string().min(1, "Date is required"),
    slot_id: z.string().min(1, "Time slot is required"),
    contact_no: z.string().min(8, "Valid contact number required"),
});

export default function MuslimConversionBookingForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [dynamicSlots, setDynamicSlots] = useState([]);
    const [loadingSlots, setLoadingSlots] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(bookigSchema),
        defaultValues: {
            slot_id: "",
        }
    });

    const booked_date = watch("booked_date");

    useEffect(() => {
        const fetchSlots = async () => {
            if (!booked_date) {
                setDynamicSlots([]);
                return;
            }
            try {
                setLoadingSlots(true);
                const res = await axiosInstance.get('/slots', {
                    params: { booked_date, type: 'conversion' }
                });
                if (res.data && res.data.slots) {
                    setDynamicSlots(res.data.slots);
                } else {
                    setDynamicSlots([]);
                }
            } catch (err) {
                console.error("Failed to fetch slots:", err);
                setDynamicSlots([]);
            } finally {
                setLoadingSlots(false);
            }
        };
        fetchSlots();
        setValue("slot_id", ""); // Reset slot on date change
    }, [booked_date, setValue]);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setSuccess("");
            setErrorMsg("");

            const selectedSlot = dynamicSlots.find((s) => s.id === Number(data.slot_id));
            if (!selectedSlot) throw new Error("Invalid slot selected");

            const payload = {
                ...data,
                slot_id: Number(data.slot_id),
                start_time: selectedSlot.start_time,
                end_time: selectedSlot.end_time,
            };

            const res = await axiosInstance.post("/conversion", payload);

            setSuccess("Booking submitted successfully!");
            reset();
            setDynamicSlots([]);
        } catch (err) {
            console.error(err);
            setErrorMsg("Failed to submit booking. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-xl p-6 rounded-lg space-y-3"
        >
            <Input
                label="Applicant Name / 申請者名"
                placeholder="申請者氏名"
                {...register("name")}
                error={errors.name?.message}
            />

            <Input
                label="Father Name / 父親の名前"
                placeholder="故人氏名"
                {...register("father_name")}
                error={errors.father_name?.message}
            />

            <Input
                type="date"
                label="Booking Date / 予約日"
                {...register("booked_date")}
                error={errors.booked_date?.message}
            />

            <div className="space-y-1">
                <label className="block font-semibold text-[#B98C20]">
                    Time Slot / 時間帯
                </label>
                <select
                    {...register("slot_id")}
                    disabled={!booked_date || loadingSlots}
                    className={`w-full px-3 py-3 rounded-lg outline-none border border-[#B98C20] bg-white ${(!booked_date || loadingSlots) ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    <option value="" disabled>
                        {!booked_date
                            ? "Select booking date first"
                            : loadingSlots
                                ? "Loading slots..."
                                : "Select a time slot"}
                    </option>
                    {dynamicSlots
                        .filter((slot) => slot.status === "1")
                        .map((slot) => {
                            const isBooked = slot.slot_trace_count >= 1;
                            return (
                                <option
                                    key={slot.id}
                                    value={slot.id}
                                    disabled={isBooked}
                                    className={isBooked ? "text-red-500 font-semibold bg-red-50" : "text-green-700"}
                                >
                                    {slot.name} ({slot.start_time} - {slot.end_time}) {isBooked ? "- Already Booked" : ""}
                                </option>
                            );
                        })}
                </select>
                {errors.slot_id && (
                    <p className="text-xs text-red-500">{errors.slot_id.message}</p>
                )}
            </div>

            <Input
                label="Contact No. / お問い合わせ番号"
                placeholder="電話番号"
                {...register("contact_no")}
                error={errors.contact_no?.message}
            />

            {success && (
                <p className="text-green-600 text-sm font-medium">{success}</p>
            )}
            {errorMsg && (
                <p className="text-red-600 text-sm font-medium">{errorMsg}</p>
            )}

            <div className="flex justify-end gap-4 pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="border border-green-500 text-green-700 px-6 py-2 rounded-md hover:bg-green-100 disabled:opacity-50 cursor-pointer"
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>

                {/* <button
                    type="button"
                    onClick={() => {
                        reset();
                        setSuccess("");
                        setErrorMsg("");
                    }}
                    className="border border-red-500 text-red-600 bg-red-100 hover:bg-red-200 px-6 py-2 rounded-md cursor-pointer"
                >
                    Cancel
                </button> */}
            </div>
        </form>
    );
}

// Reusable Input 
const Input = React.forwardRef(({ label, error, highlight, ...props }, ref) => {
    return (
        <div className="space-y-1">
            <label className="block font-semibold text-[#B98C20]">
                {label}
            </label>

            <input
                ref={ref}
                {...props}
                className={`w-full px-3 py-3 rounded-lg outline-none 
          ${highlight
                        ? "border-2 border-green-500"
                        : "border border-[#B98C20]"
                    }`}
            />

            {error && (
                <p className="text-xs text-red-500">{error}</p>
            )}
        </div>
    );
});
Input.displayName = 'Input';
