"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "@/helper/axiosInstance";



const INITIAL_FORM_STATE = {
    name: "",
    email: "",
    contact: "",
    subject: "",
    question: "",
};

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



export default function AskQuestionPage({ askFatwaPage }) {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleReset = () => {
        setFormData(INITIAL_FORM_STATE);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);

        const payload = {
            name: formData?.name,
            email: formData?.email,
            phone: formData?.contact,
            subject: formData?.subject || "No Subject",
            comment: formData?.question,
        };

        try {
            const result = await postForm(
                "/contacts/create",
                payload
            );

            if (result.success) {
                toast.success("Question Submited Successfully");
                handleReset();
            } else {
                toast.error(result.message);
            }
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="bg-white border border-[#DDEEDC] rounded-[10px] shadow-lg w-full">
            {/* Header */}
            <div className="bg-[#E5F5DE] min-h-[64px] md:h-[76px] flex items-center justify-center px-4 text-center">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#00401A]">
                    {askFatwaPage?.sub_title}
                </h2>
            </div>

            <div className="p-3 sm:p-4 md:p-6 lg:p-8">
                {/* Text Section */}
                <div
                    className="bg-white border border-gray-200 rounded-[16px] sm:rounded-[20px]
        p-3 sm:p-4 md:p-6 lg:p-8
        text-sm sm:text-base leading-7 sm:leading-8 text-[#595959] mb-5 sm:mb-6"
                    dangerouslySetInnerHTML={{
                        __html: askFatwaPage?.description,
                    }}
                />

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
                >
                    <InputField
                        label="あなたの名前"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                    />

                    <InputField
                        label="電子メールアドレス"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                    />

                    <InputField
                        label="または連絡先"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="Whatsapp Or Contact"
                    />

                    <InputField
                        label="主題"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                    />

                    {/* Question */}
                    <div className="flex flex-col md:col-span-2">
                        <label className="text-sm mb-1 text-black">質問の要約</label>
                        <textarea
                            name="question"
                            value={formData.question}
                            onChange={handleChange}
                            rows={6}
                            placeholder="Your Question in Short"
                            required
                            className="border border-[#B0C4B8] rounded-[10px] py-3 px-2 text-sm
            focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row justify-end gap-3 md:col-span-2 mt-4">
                        <button
                            type="button"
                            onClick={handleReset}
                            disabled={loading}
                            className="h-[48px] sm:h-[56px] w-full sm:w-auto
            px-6 sm:px-12 text-base sm:text-lg
            borderGradientButton text-[#00401A] rounded-[10px]
            hover:bg-green-50 transition cursor-pointer"
                        >
                            Reset
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="h-[48px] sm:h-[56px] w-full sm:w-auto
            px-6 sm:px-12 text-base sm:text-lg
            bg-[#F7BA2A] text-[#00401A] rounded-[10px]
            hover:bg-[#e4a819] transition cursor-pointer"
                        >
                            {loading ? "Submitting..." : "Submit Your Question"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

}

/* ----------------------------------
   Reusable Input Component
---------------------------------- */

function InputField({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
}) {
    return (
        <div className="flex flex-col">
            <label className="text-sm mb-1 text-black">{label}</label>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
                autoComplete="off"
                className="border border-[#B0C4B8] rounded-[10px] py-3 px-2 text-sm
        focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
        </div>
    );
}
