"use client";

import { useState } from "react";

export default function LostComplainForm() {
  const [form, setForm] = useState({
    applicantName: "",
    itemName: "",
    spot: "",
    date: "",
    type: "",
    contact: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await fetch("/api/lost-complain", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Submission failed");

      alert("Lost complain submitted successfully");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
   
      <div className="borderDonationHome rounded-[20px] px-8 py-8">
        <h2 className="text-center text-2xl sm:text-3xl  md:text-4xl font-bold mb-8 text-[#000000] bg-red-100\">
          Lost Complain
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
            {/* Applicant Name */}
            <div>
              <label className="text-sm mb-1 block">Applicant Name</label>
              <input
                type="text"
                name="applicantName"
                placeholder="今すぐ入力"
                onChange={handleChange}
                className="w-full h-12 rounded-xl border border-green-700 px-4"
              />
            </div>

            {/* Lost Item Name */}
            <div>
              <label className="text-sm mb-1 block">Lost Item Name</label>
              <input
                type="text"
                name="itemName"
                placeholder="今すぐ入力"
                onChange={handleChange}
                className="w-full h-12 rounded-xl border border-green-700 px-4"
              />
            </div>

            {/* Lost Spot */}
            <div>
              <label className="text-sm mb-1 block">Lost Spot/Area</label>
              <input
                type="text"
                name="spot"
                placeholder="今すぐ入力"
                onChange={handleChange}
                className="w-full h-12 rounded-xl border border-green-700 px-4"
              />
            </div>

            {/* Date */}
            <div>
              <label className="text-sm mb-1 block">Lost Date</label>
              <select
                name="date"
                onChange={handleChange}
                className="w-full h-12 rounded-xl border border-green-700 px-4"
              >
                <option value="">選択</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
              </select>
            </div>

            {/* Item Type */}
            <div>
              <label className="text-sm mb-1 block">Item Type</label>
              <select
                name="type"
                onChange={handleChange}
                className="w-full h-12 rounded-xl border border-green-700 px-4"
              >
                <option value="">選択</option>
                <option value="document">Document</option>
                <option value="wallet">Wallet</option>
                <option value="mobile">Mobile</option>
              </select>
            </div>

            {/* Upload */}
            <div>
              <label className="text-sm mb-1 block">Upload Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full h-12 rounded-xl border border-green-700 px-4 py-2"
              />
            </div>

            {/* Contact */}
            <div>
              <label className="text-sm mb-1 block">Contact No</label>
              <input
                type="text"
                name="contact"
                placeholder="今すぐ入力"
                onChange={handleChange}
                className="w-full h-12 rounded-xl border border-green-700 px-4"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="submit"
              className="bg-[#52B920] text-white text-lg px-3 sm:px-4 py-2 sm:py-2.5 rounded-[10px] "
            >
              Submit
            </button>

            <button
              type="reset"
                className="bg-[#FFE9E9]  border border-[#FF0000] text-[#333333] text-lg px-3 sm:px-4 py-2 sm:py-2.5 
                rounded-[10px]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

  );
}
