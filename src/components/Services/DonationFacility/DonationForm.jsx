"use client";

import { useState } from "react";
import axiosInstance from "@/helper/axiosInstance";

const INITIAL_STATE = {
    name: "",
    contact_no: "",
    address: "",
    intended_date: "",
    organization_name: "",
    organization_role: "",
    organization_type: "",
    organization_status: "",
};



export default function DonationForm() {
    const [form, setForm] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: "", type: "" });

        try {
            const res = await axiosInstance.post("/donations", form);
            console.log("Donation Response:", res);
            setMessage({ text: "Donation submitted successfully!", type: "success" });
            setForm(INITIAL_STATE);
        } catch (error) {
            console.error("Donation Error:", error);
            setMessage({ text: "Failed to submit donation. Please try again.", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="borderDonationHome rounded-[20px] px-8 py-8">
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
                Donation Form
            </h2>

            <form onSubmit={handleSubmit}>
               
                {/* FORM FIELDS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                    <div>
                        <label className="text-sm block mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4"
                        />
                    </div>

                    <div>
                        <label className="text-sm block mb-1">Contact No</label>
                        <input
                            type="text"
                            name="contact_no"
                            value={form.contact_no}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4"
                        />
                    </div>

                    <div>
                        <label className="text-sm block mb-1">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4"
                        />
                    </div>

                    <div>
                        <label className="text-sm block mb-1">Intended Date</label>
                        <input
                            type="date"
                            name="intended_date"
                            value={form.intended_date}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4 bg-white"
                        />
                    </div>

                    <div>
                        <label className="text-sm block mb-1">Organization Name</label>
                        <input
                            type="text"
                            name="organization_name"
                            value={form.organization_name}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4"
                        />
                    </div>

                    <div>
                        <label className="text-sm block mb-1">Organization Role</label>
                        <input
                            type="text"
                            name="organization_role"
                            value={form.organization_role}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4"
                        />
                    </div>

                    <div>
                        <label className="text-sm block mb-1">Organization Type</label>
                        <input
                            type="text"
                            name="organization_type"
                            value={form.organization_type}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4"
                        />
                    </div>

                    <div>
                        <label className="text-sm block mb-1">Organization Status</label>
                        <input
                            type="text"
                            name="organization_status"
                            value={form.organization_status}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4"
                        />
                    </div>
                </div>

                {/* Message */}
                {message.text && (
                    <div className={`mt-4 p-3 rounded-lg text-sm font-semibold ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message.text}
                    </div>
                )}

                {/* Buttons */}
                <div className="flex justify-end gap-4 mt-8">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#52B920] text-white text-lg px-4 py-2.5 rounded-[10px] disabled:opacity-50"
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setForm(INITIAL_STATE);
                            setMessage({ text: "", type: "" });
                        }}
                        className="bg-[#FFE9E9] border border-[#FF0000] text-[#333333] text-lg px-4 py-2.5 rounded-[10px]"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
