"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/helper/axiosInstance";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

// 🔹 Reusable function for posting contact form
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

export default function Contact() {
  const searchParams = useSearchParams();
  const nameFromQuery = searchParams.get("name") || ""; // get name from query (if available)

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  // When query name exists → set it as subject in the message field
  useEffect(() => {
    if (nameFromQuery) {
      setFormData((prev) => ({
        ...prev,
        message: `Subject: ${nameFromQuery}\n`, // subject line prefilled
      }));
    }
  }, [nameFromQuery]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      subject: nameFromQuery || "No Subject",
      product_id: "",
      product_name: "",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      comment: formData.message,
    };

    const result = await postForm("/contacts/create", payload);

    if (result.success) {
      toast.success("Your message was sent successfully!");
      setFormData({ name: "", phone: "", email: "", message: "" });
    } else {
      toast.error(`Error: ${result.message}`);
    }
  };

  return (
    <section className="grid md:grid-cols-2 gap-6 min-h-[668px]">
      {/* Left Side: Contact Form */}
      <div className="bg-gradient-to-br from-[#3198A0] to-[#51F909] p-6 md:p-10 rounded-[10px] shadow-lg flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-white h-[66px] placeholder:text-base p-3 rounded-[10px] outline-none focus:ring-2 focus:ring-green-500 text-gray-700 placeholder-gray-400"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-white h-[66px] placeholder:text-base p-3 rounded-[10px] outline-none focus:ring-2 focus:ring-green-500 text-gray-700 placeholder-gray-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-white h-[66px] placeholder:text-base p-3 rounded-[10px] outline-none focus:ring-2 focus:ring-green-500 text-gray-700 placeholder-gray-400"
          />
          <textarea
            name="message"
            rows={4}
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-white placeholder:text-base p-3 rounded-[10px] outline-none focus:ring-2 focus:ring-green-500 text-gray-700 placeholder-gray-400"
          />
          <button
            type="submit"
            className="h-[60px] text-bold text-[20px] w-full bg-[#3E8B18] shadow-lg text-white font-semibold py-3 rounded-[10px] hover:opacity-90 transition"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Right Side: Map */}
      <div className="w-full h-full rounded-[10px] overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13144.682918739936!2d135.4584222!3d34.70085625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e7dd9a7a22f3%3A0x6e2f9e76e5b69b37!2sOwada%2C%20Nishiyodogawa%20Ward%2C%20Osaka%2C%20555-0034%2C%20Japan!5e0!3m2!1sen!2sjp!4v1698593754001!5m2!1sen!2sjp"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

{/* 
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-[10px] overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13145.46284914788!2d135.4796146!3d34.6937249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e6f0c80d5c53%3A0xfaa4b4a98ffb08e7!2sOsaka%2C%20Japan!5e0!3m2!1sen!2sjp!4v1731323560000!5m2!1sen!2sjp"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div> */}

    </section>
  );
}
