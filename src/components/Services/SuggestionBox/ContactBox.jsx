"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/helper/axiosInstance";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import Image from "next/image";


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

export default function ContactBox() {
    const searchParams = useSearchParams();
    const nameFromQuery = searchParams.get("name") || "";

    const [formData, setFormData] = useState({

        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",

    });


    useEffect(() => {
        if (nameFromQuery) {
            setFormData((prev) => ({
                ...prev,
                subject: `Subject: ${nameFromQuery}\n`,
            }));
        }
    }, [nameFromQuery]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {

            name: formData?.name,
            email: formData?.email,
            phone: formData?.phone,
            subject: formData?.subject || "No Subject",
            comment: formData?.message,
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
        <section className="grid md:grid-cols-2 gap-6 min-h-[668px] bg-gradient-to-br from-[#3198A0] to-[#51F909]
         p-6 md:p-10 rounded-[10px] shadow-xl">
            {/* Left Side: Contact Form */}
            <div className=" rounded-[10px]  flex flex-col justify-center">
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
                    <input
                        type="text"
                        name="subject"

                        placeholder="Subject"
                        value={formData?.subject}
                        onChange={handleChange}
                        className="w-full bg-white h-[66px] placeholder:text-base p-3 rounded-[10px] outline-none focus:ring-2 focus:ring-green-500 text-gray-700 placeholder-gray-400"
                    />
                    <textarea
                        name="message"
                        rows={4}
                        placeholder="Message"
                        value={formData?.message}
                        onChange={handleChange}
                        className="w-full bg-white placeholder:text-base p-3 rounded-[10px] outline-none focus:ring-2 focus:ring-green-500 text-gray-700 placeholder-gray-400"
                    />
                    <button

                        aria-label="submit"
                        type="submit"
                        className="cursor-pointer h-[60px] text-bold text-[20px] w-full bg-[#3E8B18] shadow-lg text-white font-semibold py-3 rounded-[10px] hover:opacity-90 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>

            {/* Right Side: Map */}
            <div className="w-full h-full rounded-[10px] overflow-hidden shadow-lg">
                <Image
                    src="/images/offerServices/SuggetionBoxFrame.svg"
                    alt=" "
                    width={1000}
                    height={1000}
                    className="object-contain"
                />
            </div>



        </section>
    );
}
