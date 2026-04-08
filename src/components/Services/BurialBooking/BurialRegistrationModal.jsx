"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axiosInstance from "@/helper/axiosInstance";

const registrationSchema = z.object({
  gender: z.string().min(1, "Required"),
  date_of_birth: z.string().min(1, "Required"),
  date_of_death: z.string().min(1, "Required"),
  place_of_death: z.string().min(1, "Required"),
  nationality: z.string().min(1, "Required"),
  passport_no: z.string().min(1, "Required"),
  id_card: z.string().min(1, "Required"),
  janazah_prayer_location: z.string().min(1, "Required"),
  janazah_date: z.string().min(1, "Required"),
  grave_number: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
  relationship: z.string().min(1, "Required"),
});

export default function BurialRegistrationModal({ bookingId, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setErrorMsg("");

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const res = await axiosInstance.post(`/burial/${bookingId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (res.data?.success === false || res.data?.errors || res.data?.success === "error") {
        throw new Error(res.data?.message || JSON.stringify(res.data?.errors) || "Failed to update record.");
      }

      alert("Burial registration completed securely!");
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error("Booking Registration Error:", err);
      const message = err?.response?.data?.message || err?.message || "Something went wrong";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto w-full h-full p-4">
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 md:p-8 overflow-y-auto max-h-[95vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold p-2"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
          Complete Burial Registration
        </h2>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <Input label="Gender" {...register("gender")} error={errors.gender?.message} />
            <Input type="date" label="Date of Birth" {...register("date_of_birth")} error={errors.date_of_birth?.message} />
            <Input type="date" label="Date of Death" {...register("date_of_death")} error={errors.date_of_death?.message} />
            <Input label="Place of Death" {...register("place_of_death")} error={errors.place_of_death?.message} />
            <Input label="Nationality" {...register("nationality")} error={errors.nationality?.message} />
            <Input label="Passport No" {...register("passport_no")} error={errors.passport_no?.message} />
            <Input label="ID Card" {...register("id_card")} error={errors.id_card?.message} />
            <Input label="Janazah Prayer Location" {...register("janazah_prayer_location")} error={errors.janazah_prayer_location?.message} />
            <Input type="date" label="Janazah Date" {...register("janazah_date")} error={errors.janazah_date?.message} />
            <Input label="Grave Number" {...register("grave_number")} error={errors.grave_number?.message} />
            <Input label="Address" {...register("address")} error={errors.address?.message} />
            <Input label="Relationship" {...register("relationship")} error={errors.relationship?.message} />

          </div>

          <div className="flex justify-end gap-4 mt-8 pt-4 border-t">
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="px-6 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Reusable Input purely scoped to modal logic 
function Input({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input
        {...props}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-green-500"
      />
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
}
