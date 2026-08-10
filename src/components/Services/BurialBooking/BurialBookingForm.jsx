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
  contact_no: z.string().min(11, "Phone number must contain at least 11 digits"),
});

export default function BurialBookingForm({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [dynamicSlots, setDynamicSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const todayStr = new Date().toLocaleDateString("en-CA");

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
    const cleanPhone = data.contact_no.replace(/\D/g, "");
    if (cleanPhone.length !== 11) {
      setErrorMsg("Phone number must contain exactly 11 digits (e.g., 090-1234-5678).");
      return;
    }

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
      formData.append("contact_no", cleanPhone);

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
      className="space-y-5 text-[#B98C20] w-full"
    >
      <Input
        labelEn="Applicant Name"
        labelJp="申請者氏名"
        placeholder="Enter applicant name"
        {...register("name")}
        error={errors.name?.message}
      />

      <Input
        labelEn="Deceased Name"
        labelJp="故人氏名"
        placeholder="Enter deceased name"
        {...register("deceased_name")}
        error={errors.deceased_name?.message}
      />

      <Input
        labelEn="Relationship"
        labelJp="故人との関係"
        placeholder="Relationship to the deceased"
        {...register("relationship")}
        error={errors.relationship?.message}
      />

      <Input
        type="date"
        // labelEn="Burial Date"
        labelEn="Booking Date"
        labelJp="イベント日"
        min={todayStr}
        {...register("burial_date", {
          onChange: (e) => {
            if (e.target.value && e.target.value < todayStr) {
              e.target.value = "";
              setErrorMsg("Please select a future date or today.");
            } else {
              setErrorMsg("");
            }
          }
        })}
        error={errors.burial_date?.message}
      />

      {/* Dynamic Burial Time Slot Selection */}
      <Input
        type="select"
        labelEn="Time Slot"
        labelJp="開始時間"
        {...register("slot_id")}
        disabled={!burial_date || loadingSlots}
        error={errors.slot_id?.message}
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
      </Input>

      {/* Display selected slot time */}
      {watch("slot_id") && dynamicSlots.find((s) => s.id === Number(watch("slot_id"))) && (
        <div className="flex flex-col mb-3 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
            <span className="font-bold text-sm">Selected Time</span>
            <div className="sm:col-span-2 bg-green-50 border border-green-300 rounded-xl px-4 py-3 text-green-800 text-sm font-medium">
              {dynamicSlots.find((s) => s.id === Number(watch("slot_id"))).start_time} – {dynamicSlots.find((s) => s.id === Number(watch("slot_id"))).end_time}
            </div>
          </div>
        </div>
      )}

      <Input
        labelEn="Phone Number"
        labelJp="電話番号"
        placeholder="e.g., 090-1234-5678"
        {...register("contact_no", {
          onChange: (e) => {
            const val = e.target.value.replace(/[^0-9-\s]/g, "");
            e.target.value = val;
          }
        })}
        error={errors.contact_no?.message}
      />

      {success && (
        <p className="text-sm font-medium text-green-600">
          {success}
        </p>
      )}

      {errorMsg && (
        <p className="text-sm font-medium text-red-600">
          {errorMsg}
        </p>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 rounded-xl text-[#333333] font-medium transition-colors hover:opacity-90 sm:max-w-[43.75rem] disabled:opacity-50 cursor-pointer"
          style={{
            border: "2px solid transparent",
            backgroundImage: "linear-gradient(white, white), linear-gradient(to bottom, #3198A0, #51F909)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}
        >
          {loading ? "Submitting..." : "Submit Booking"}
        </button>

        <button
          type="button"
          onClick={() => {
            reset();
            setSuccess("");
            setErrorMsg("");
          }}
          className="border border-[#FF0000] text-[#FF0000] bg-[#FFE9E9] h-14 w-full cursor-pointer sm:max-w-[22.75rem] rounded-xl font-medium hover:bg-red-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// Reusable Input
function Input({ labelEn, labelJp, error, type = "text", ...props }) {
  return (
    <div className="flex flex-col mb-3 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
        <div className="grid grid-col-2 gap-0.5">
          <label className="font-bold">{labelEn}</label>
          <label className="font-bold text-[#00401A]">{labelJp}</label>
        </div>
        
        {type === "select" ? (
          <select
            {...props}
            className={`sm:col-span-2 border-2 border-[#F7BA2A] rounded-xl px-4 h-14 bg-white/50 focus:outline-none appearance-none ${props.disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {props.children}
          </select>
        ) : (
          <input
            {...props}
            type={type}
            className="sm:col-span-2 border-2 border-[#F7BA2A] rounded-xl px-4 h-14 bg-white/50 focus:outline-none"
          />
        )}
      </div>
      {error && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
           <div className="hidden sm:block"></div>
           <p className="sm:col-span-2 text-xs text-red-500 mt-1">{error}</p>
        </div>
      )}
    </div>
  );
}
