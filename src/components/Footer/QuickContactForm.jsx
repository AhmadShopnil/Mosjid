"use client"

import axiosInstance from '@/helper/axiosInstance';
import React, { useState } from 'react'
import toast from "react-hot-toast";


const postForm = async (endpoint, formData) => {
  try {
    const res = await axiosInstance.post(endpoint, formData);
    return {
      success: true,
      message: res.data.message || "Submitted successfully",
    };
  } catch (error) {
    const message = error.response?.data?.message || "Submission failed";
    return { success: false, message };
  }
};



export default function QuickContactForm({ section_3_title }) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            subject: "No Subject",
            product_id: "",
            product_name: "",
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            comment: formData.message,
        };
        // console.log("contact payload", payload);

        const result = await postForm("/contacts/create", payload);

        // console.log("response from", result);

        if (result.success) {
            toast.success(`Your Message sent Successfully`);
            setFormData({ name: "", email: "", message: "" });
        } else {
            toast.error(`Error: ${result.message}`);
        }
    };


    return (
        <div>
            <h3 className="text-2xl text-[#00401A] font-bold mb-4 gradient-border_b pb-2.5">
                {section_3_title}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-green-600"
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-green-600"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-green-600"
                />
                <textarea
                    name="message"
                    placeholder="Message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-green-600"
                />
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}
