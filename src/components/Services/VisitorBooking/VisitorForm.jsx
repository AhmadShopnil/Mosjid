"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/helper/axiosInstance";

const INITIAL_STATE = {
    full_name: "",
    organization_name: "",
    gender: "",
    country_name: "",
    number_of_visitors: "",
    contact_number: "",
    visit_date: "",
    start_time: "",
    end_time: "",
    purpose_visit: "",
    program_request: "",
};

export default function VisitorForm({ onSuccess }) {
    const [form, setForm] = useState(INITIAL_STATE);
    const [isLoggedIn, setIsLoggedIn] = useState(null); // null means checking, false means not logged in
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });

    useEffect(() => {
        const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setMessage({ text: "", type: "" });

            // Create form-data payload matching Postman precisely
            const payload = new FormData();
            Object.keys(form).forEach(key => {
                if(form[key]) {
                    payload.append(key, form[key]);
                }
            });

            const res = await axiosInstance.post('/visitors', payload, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            console.log("Visitor API Response:", res.data);

            // Sometimes the API returns 200 OK but with success: false or validation errors
            if (res.data?.success === false || res.data?.errors || res.data?.success === "error") {
                const errorMessage = res.data?.message || JSON.stringify(res.data?.errors) || "Failed to submit booking.";
                throw new Error(errorMessage);
            }

            setMessage({ text: "Visitor booking submitted successfully!", type: "success" });
            setForm(INITIAL_STATE);

            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.error(error);
            const errMsg = error?.response?.data?.message || error?.message || "Failed to submit booking.";
            setMessage({ text: errMsg, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    if (isLoggedIn === null) {
        return null; // or loading spinner
    }

    if (!isLoggedIn) {
        return (
            <div className="px-4 py-12 md:px-8 text-center bg-gray-50 border rounded-lg border-gray-200 mt-6 mx-4 md:mx-8">
                <h2 className="text-xl md:text-2xl font-bold text-red-600 mb-2">Login Required</h2>
                <p className="text-gray-600">Please log in to your account securely to fill out the Visitor Booking form.</p>
            </div>
        );
    }

    return (
        <div className="px-4 py-6 md:px-8 md:py-8">
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
                Visitor Form
            </h2>

            <form onSubmit={handleSubmit}>
                {/* ROW 1 */}
                <div className="mb-4 md:mb-6 flex w-full justify-between">
                    <h3 className="font-semibold text-sm md:text-2xl text-[#B98C20]"> Visitor Booking</h3>
                    <h3 className="font-semibold text-sm md:text-2xl text-[#B98C20]"> 訪問者の予約</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <div>
                        <label className="text-sm block mb-1">Full Name</label>
                        <input
                            type="text"
                            name="full_name"
                            value={form.full_name}
                            onChange={handleChange}
                            required
                            className="w-full h-12 rounded-xl border border-green-700 px-4 focus:outline-none focus:ring-1 focus:ring-green-600"
                        />
                    </div>

                    <div>
                        <label className="text-sm block mb-1">Organization Name</label>
                        <input
                            type="text"
                            name="organization_name"
                            value={form.organization_name}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4 focus:outline-none focus:ring-1 focus:ring-green-600"
                        />
                    </div>

                    <div>
                        <label className="text-sm block mb-1">Gender</label>
                        <select
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4 bg-white focus:outline-none focus:ring-1 focus:ring-green-600"
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm block mb-1">Country Name</label>
                        <input
                            type="text"
                            name="country_name"
                            value={form.country_name}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4 focus:outline-none focus:ring-1 focus:ring-green-600"
                        />
                    </div>

                    <div>
                        <label className="text-sm block mb-1">Number of Visitors</label>
                        <input
                            type="number"
                            name="number_of_visitors"
                            value={form.number_of_visitors}
                            onChange={handleChange}
                            min={1}
                            className="w-full h-12 rounded-xl border border-green-700 px-4 focus:outline-none focus:ring-1 focus:ring-green-600"
                        />
                    </div>

                    <div>
                        <label className="text-sm block mb-1">Contact Number</label>
                        <input
                            type="text"
                            name="contact_number"
                            value={form.contact_number}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4 focus:outline-none focus:ring-1 focus:ring-green-600"
                        />
                    </div>
                </div>

                {/* ROW 2 */}
                <div className="mb-4 mt-6 md:mt-8 flex w-full justify-between">
                    <h3 className="font-semibold text-sm md:text-2xl text-[#B98C20]"> Visit Details</h3>
                    <h3 className="font-semibold text-sm md:text-2xl text-[#B98C20]"> 訪問の詳細</h3>
                </div>
              
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                        <label className="text-sm block mb-1">Visit Date</label>
                        <input
                            type="date"
                            name="visit_date"
                            value={form.visit_date}
                            onChange={handleChange}
                            required
                            className="w-full h-12 rounded-xl border border-green-700 px-4 bg-white focus:outline-none focus:ring-1 focus:ring-green-600"
                        />
                    </div>

                    <div>
                        <label className="text-sm block mb-1">Start Time</label>
                        <input
                            type="time"
                            name="start_time"
                            value={form.start_time}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4 bg-white focus:outline-none focus:ring-1 focus:ring-green-600"
                        />
                    </div>

                    <div>
                        <label className="text-sm block mb-1">End Time</label>
                        <input
                            type="time"
                            name="end_time"
                            value={form.end_time}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4 bg-white focus:outline-none focus:ring-1 focus:ring-green-600"
                        />
                    </div>

                    <div>
                        <label className="text-sm block mb-1">Purpose of Visit</label>
                        <input
                            type="text"
                            name="purpose_visit"
                            value={form.purpose_visit}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4 focus:outline-none focus:ring-1 focus:ring-green-600"
                        />
                    </div>

                    <div>
                        <label className="text-sm block mb-1">Program Request</label>
                        <input
                            type="text"
                            name="program_request"
                            value={form.program_request}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4 focus:outline-none focus:ring-1 focus:ring-green-600"
                        />
                    </div>
                </div>

                {/* Notice / Messages */}
                {message.text && (
                    <div className="mt-6 text-center">
                        <p className={`text-base font-bold ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            {message.text}
                        </p>
                    </div>
                )}

                {/* Buttons */}
                <div className="flex justify-end gap-4 mt-8">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#52B920] text-white text-lg px-8 py-2.5 rounded-[10px] hover:bg-green-600 disabled:opacity-60 transition"
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>

                    <button
                        type="button"
                        onClick={() => setForm(INITIAL_STATE)}
                        disabled={loading}
                        className="bg-[#FFE9E9] border border-[#FF0000] text-[#333333] text-lg px-8 py-2.5 rounded-[10px] hover:bg-red-50 disabled:opacity-60 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
