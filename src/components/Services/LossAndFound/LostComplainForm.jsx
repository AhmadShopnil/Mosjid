"use client";

import { useState } from "react";
import axiosInstance from "@/helper/axiosInstance";

const INITIAL_STATE = {
  name: "",
  item_name: "",
  spot_area: "",
  lost_found_date: "",
  item_type: "",
  contact_no: "",
  status: "0",
  item_image: null,
};

export default function LostComplainForm({ onSuccess }) {
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      // Safely append non-null file/text blobs
      if (value !== "" && value !== null) {
        formData.append(key, value);
      }
    });

    try {
      const res = await axiosInstance.post("/lossfound", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (res.data?.success === false || res.data?.errors || res.data?.success === "error") {
        const errorMessage = res.data?.message || JSON.stringify(res.data?.errors) || "Failed to submit.";
        throw new Error(errorMessage);
      }

      alert("Lost complain submitted successfully!");
      setForm(INITIAL_STATE);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("API Submission Error:", error);
      const errMsg = error?.response?.data?.message || error?.message || "Something went wrong";
      alert(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[20px] px-4 py-6 md:px-8 md:py-8">
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-[#000000]">
        Loss & Found Complain
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
          {/* Applicant Name */}
          <div>
            <label className="text-sm mb-1 block">Applicant Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              placeholder="今すぐ入力"
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-green-700 h-[48px] md:h-[54px] text-sm md:text-base px-2 md:px-4 focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* Lost Item Name */}
          <div>
            <label className="text-sm mb-1 block">Lost Item Name</label>
            <input
              type="text"
              name="item_name"
              value={form.item_name}
              placeholder="今すぐ入力"
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-green-700 h-[48px] md:h-[54px] text-sm md:text-base px-2 md:px-4 focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* Lost Spot */}
          <div>
            <label className="text-sm mb-1 block">Lost Spot/Area</label>
            <input
              type="text"
              name="spot_area"
              value={form.spot_area}
              placeholder="今すぐ入力"
              onChange={handleChange}
              className="w-full rounded-xl border border-green-700 h-[48px] md:h-[54px] text-sm md:text-base px-2 md:px-4 focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* Date */}
          <div>
            <label className="text-sm mb-1 block">Lost Date</label>
            <input
              type="date"
              name="lost_found_date"
              value={form.lost_found_date}
              onChange={handleChange}
              required
              className="w-full bg-white rounded-xl border border-green-700 h-[48px] md:h-[54px] text-sm md:text-base px-2 md:px-4 focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* Item Type */}
          <div>
            <label className="text-sm mb-1 block">Item Type</label>
            <select
              name="item_type"
              value={form.item_type}
              onChange={handleChange}
              required
              className="w-full bg-white rounded-xl border border-green-700 h-[48px] md:h-[54px] text-sm md:text-base px-2 md:px-4 focus:outline-none focus:ring-1 focus:ring-green-600"
            >
              <option value="">選択</option>
              <option value="Document">Document</option>
              <option value="Wallet">Wallet</option>
              <option value="Mobile">Mobile</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Upload */}
          <div>
            <label className="text-sm mb-1 block">Upload Image</label>
            <input
              type="file"
              name="item_image"
              accept="image/*"
              onChange={handleChange}
              className="w-full bg-white rounded-xl border border-green-700 h-[48px] md:h-[54px] text-sm md:text-base px-2 md:px-4 py-2 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:bg-green-100 file:text-green-700"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="text-sm mb-1 block">Contact No</label>
            <input
              type="text"
              name="contact_no"
              value={form.contact_no}
              placeholder="今すぐ入力"
              onChange={handleChange}
              required
              className="w-full h-[48px] md:h-[54px] rounded-xl border border-green-700 px-2 md:px-4 focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>
          {/* Form Status (Lost / Found) */}
          <div>
            <label className="text-sm mb-1 block">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              required
              className="w-full bg-white rounded-xl border border-green-700 h-[48px] md:h-[54px] text-sm md:text-base px-2 md:px-4 focus:outline-none focus:ring-1 focus:ring-green-600"
            >
              <option value="0">Lost</option>
              <option value="1">Found</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#52B920] text-white text-lg px-8 py-2 md:py-2.5 rounded-[10px] hover:bg-green-600 transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => setForm(INITIAL_STATE)}
            className="bg-[#FFE9E9] border border-[#FF0000] text-[#333333] text-lg px-8 py-2 md:py-2.5 rounded-[10px] hover:bg-red-50 transition disabled:opacity-60"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

  );
}
