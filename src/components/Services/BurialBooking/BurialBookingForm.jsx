"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

//  Validation 
const burialSchema = z.object({
  applicantName: z.string().min(1, "Applicant name is required"),
  deceasedName: z.string().min(1, "Deceased name is required"),
  relationship: z.string().min(1, "Relationship is required"),
  burialDate: z.string().min(1, "Burial date is required"),
  burialTime: z.string().min(1, "Burial time is required"),
  contactNo: z.string().min(8, "Valid contact number required"),
});

export default function BurialBookingForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

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

      const res = await fetch("/api/burial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSuccess("Form submitted successfully");
      reset();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl  p-6 rounded-lg space-y-3"
    >
      <Input
        label="Applicant Name"
        placeholder="申請者氏名"
        {...register("applicantName")}
        error={errors.applicantName?.message}
      />

      <Input
        label="Deceased Name"
        placeholder="故人氏名"
        {...register("deceasedName")}
        error={errors.deceasedName?.message}
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
        {...register("burialDate")}
        error={errors.burialDate?.message}
        // highlight
      />

      <Input
        type="time"
        label="Estimated Burial Time"
        {...register("burialTime")}
        error={errors.burialTime?.message}
        // highlight
      />

      <Input
        label="Contact No."
        placeholder="電話番号"
        {...register("contactNo")}
        error={errors.contactNo?.message}
      />

      {success && (
        <p className="text-green-600 text-sm">{success}</p>
      )}

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="border border-green-500 text-green-700 px-6 py-2 rounded-md hover:bg-green-100 disabled:opacity-50  cursor-pointer"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        <button
          type="button"
          onClick={() => reset()}
          className="border border-red-500 text-red-600 bg-red-100 hover:bg-red-200 px-6 py-2 rounded-md  cursor-pointer"
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
