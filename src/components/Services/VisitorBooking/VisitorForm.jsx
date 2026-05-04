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
    purpose_visit: "",
    program_request: "",
    slot_id: "",
};

export default function VisitorForm({ onSuccess }) {
    const [form, setForm] = useState(INITIAL_STATE);
    const [isLoggedIn, setIsLoggedIn] = useState(null); // null means checking, false means not logged in
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [dynamicSlots, setDynamicSlots] = useState([]);
    const [loadingSlots, setLoadingSlots] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    // Fetch slots whenever visit_date changes
    useEffect(() => {
        const fetchSlots = async () => {
            if (!form.visit_date) {
                setDynamicSlots([]);
                return;
            }
            try {
                setLoadingSlots(true);
                const res = await axiosInstance.get('/slots', {
                    params: { booked_date: form.visit_date, type: 'visitor' }
                });
                if (res.data && res.data.slots) {
                    setDynamicSlots(res.data.slots);
                } else {
                    setDynamicSlots([]);
                }
            } catch (err) {
                console.error("Failed to fetch slots:", err);
                setDynamicSlots([]);
            } finally {
                setLoadingSlots(false);
            }
        };
        fetchSlots();
        // Reset slot selection on date change
        setForm((prev) => ({ ...prev, slot_id: "" }));
    }, [form.visit_date]);

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
            // Append all fields except start_time/end_time (they come from slot)
            const { slot_id, ...rest } = form;
            Object.entries(rest).forEach(([key, value]) => {
                if(value) {
                    payload.append(key, value);
                }
            });

            // Find selected slot for times
            const selectedSlot = dynamicSlots.find((s) => s.id === Number(slot_id));
            if (selectedSlot) {
                payload.append("start_time", selectedSlot.start_time);
                payload.append("end_time", selectedSlot.end_time);
                payload.append("slot_id", selectedSlot.id);
            } else if (slot_id) {
                // fallback if slot not found
                payload.append("slot_id", slot_id);
            }

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
              
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

                    <div className="space-y-1">
                        <label className="text-sm block mb-1 font-semibold text-[#B98C20]">Time Slot / 時間帯</label>
                        <select
                            name="slot_id"
                            value={form.slot_id}
                            onChange={handleChange}
                            disabled={!form.visit_date || loadingSlots}
                            className={`w-full h-12 rounded-xl border border-green-700 px-4 bg-white focus:outline-none focus:ring-1 focus:ring-green-600 ${(!form.visit_date || loadingSlots) ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            <option value="" disabled>
                                {!form.visit_date ? "Select booking date first" : loadingSlots ? "Loading slots..." : "Select a time slot"}
                            </option>
                            {dynamicSlots.filter((slot) => slot.status === "1").map((slot) => {
                                const isBooked = slot.slot_trace_count >= 1;
                                return (
                                    <option key={slot.id} value={slot.id} disabled={isBooked} className={isBooked ? "text-red-500 font-semibold bg-red-50" : "text-green-700"}>
                                        {slot.name} ({slot.start_time} - {slot.end_time}){isBooked ? " - Already Booked" : ""}
                                    </option>
                                );
                            })}
                        </select>
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
