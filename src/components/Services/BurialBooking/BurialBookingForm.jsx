"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import axiosInstance from "@/helper/axiosInstance";

// Validation schema mapped exactly to API fields
const burialSchema = z.object({
  name: z.string().min(1, "Applicant name is required"),
  deceased_name: z.string().min(1, "Deceased name is required"),
  relationship: z.string().min(1, "Relationship is required"),
  burial_date: z.string().min(1, "Burial date is required"),
  slot_id: z.string().min(1, "Burial time slot is required"),
  contact_no: z.string().min(8, "Valid contact number required"),
});

export default function BurialBookingForm({ onSuccess }) {
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
    resolver: zodResolver(burialSchema),
    defaultValues: {
      slot_id: "",
    }
  });

  const burial_date = watch("burial_date");

  // Fetch slots whenever the selected burial date changes
  useEffect(() => {
    const fetchSlots = async () => {
      if (!burial_date) {
        setDynamicSlots([]);
        return;
      }
      try {
        setLoadingSlots(true);
        const res = await axiosInstance.get('/slots', {
          params: { booked_date: burial_date, type: 'burial' }
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
  }, [burial_date, setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setSuccess("");
      setErrorMsg("");

      const selectedSlot = dynamicSlots.find((s) => s.id === Number(data.slot_id));
      if (!selectedSlot) throw new Error("Invalid slot selected");

      // Create Form-Data payload matching exactly the expected backend parameters
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("deceased_name", data.deceased_name);
      formData.append("relationship", data.relationship);
      formData.append("burial_date", data.burial_date);
      formData.append("slot_id", String(selectedSlot.id));
      formData.append("start_time", selectedSlot.start_time);
      formData.append("end_time", selectedSlot.end_time);
      formData.append("estimated_burial_time", selectedSlot.start_time);
      formData.append("contact_no", data.contact_no);

      const res = await axiosInstance.post("/burial", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (res.data?.success === false || res.data?.errors || res.data?.success === "error") {
        const errorMessage = res.data?.message || JSON.stringify(res.data?.errors) || "Failed to submit booking.";
        throw new Error(errorMessage);
      }

      setSuccess("Form submitted successfully!");
      reset();
      setDynamicSlots([]);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      const message = err?.response?.data?.message || err?.message || "Something went wrong";
      setErrorMsg(message);
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
        label="Applicant Name"
        placeholder="申請者氏名"
        {...register("name")}
        error={errors.name?.message}
      />

      <Input
        label="Deceased Name"
        placeholder="故人氏名"
        {...register("deceased_name")}
        error={errors.deceased_name?.message}
      />

      <Input
        label="Relationship to the deceased"
        placeholder="故人との関係"
        {...register("relationship")}
        error={errors.relationship?.message}
      />

      <Input
        type="date"
        label="Burial Date"
        {...register("burial_date")}
        error={errors.burial_date?.message}
      />

      {/* Dynamic Burial Time Slot Selection */}
      <div className="space-y-1">
        <label className="block font-semibold text-[#c58a1f]">
          Time Slot
        </label>
        <select
          {...register("slot_id")}
          disabled={!burial_date || loadingSlots}
          className={`w-full px-3 py-2 rounded-md outline-none bg-white border border-orange-300 ${(!burial_date || loadingSlots) ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          <option value="" disabled>
            {!burial_date
              ? "Select burial date first"
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
        label="Contact No."
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
          className="border border-green-500 text-green-700 px-6 py-2 rounded-md hover:bg-green-100 disabled:opacity-50 cursor-pointer animate-all duration-300"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}

//  Reusable Input 
function Input({ label, error, highlight, ...props }) {
  return (
    <div className="space-y-1">
      <label className="block font-semibold text-[#c58a1f]">
        {label}
      </label>

      <input
        {...props}
        className={`w-full px-3 py-2 rounded-md outline-none bg-white
          ${highlight
            ? "border-2 border-green-500"
            : "border border-orange-300"
          }`}
      />

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
