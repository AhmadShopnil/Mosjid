"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axiosInstance from "@/helper/axiosInstance";

// Validation schema mapped exactly to API fields
const burialSchema = z.object({
  name: z.string().min(1, "Applicant name is required"),
  deceased_name: z.string().min(1, "Deceased name is required"),
  relationship: z.string().min(1, "Relationship is required"),
  burial_date: z.string().min(1, "Burial date is required"),
  estimated_burial_time: z.string().min(1, "Burial time is required"),
  contact_no: z.string().min(8, "Valid contact number required"),
});

export default function BurialBookingForm({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(burialSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setSuccess("");
      setErrorMsg("");

      // Create Form-Data payload
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const res = await axiosInstance.post("/burial", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (res.data?.success === false || res.data?.errors || res.data?.success === "error") {
        const errorMessage = res.data?.message || JSON.stringify(res.data?.errors) || "Failed to submit booking.";
        throw new Error(errorMessage);
      }

      setSuccess("Form submitted successfully!");
      reset();
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

      <Input
        type="time"
        label="Estimated Burial Time"
        {...register("estimated_burial_time")}
        error={errors.estimated_burial_time?.message}
      />

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
          className="border border-green-500 text-green-700 px-6 py-2 rounded-md hover:bg-green-100 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => reset()}
          className="border border-red-500 text-red-600 bg-red-100 hover:bg-red-200 px-6 py-2 rounded-md cursor-pointer disabled:opacity-50"
        >
          Cancel
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
          ${
            highlight
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
