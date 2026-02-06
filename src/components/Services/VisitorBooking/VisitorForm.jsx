"use client";

import { useState } from "react";

const INITIAL_STATE = {
    applicantName: "",
    organizationName: "",
    gender: "",
    city: "",
    numberOfVisitor: "",
    contact: "",

    // 2nd row
    date: "",
    time: "",
    duration: "",
    purposeOfVisit: "",
    programequest: "",
};

export default function VisitorForm() {
    const [form, setForm] = useState(INITIAL_STATE);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <div className="  px-4 py-6 md:px-8 md:py-8 ">
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
                Visitor Form
            </h2>

            <form onSubmit={handleSubmit}>
               
                {/* ROW 1 */}
 <div className="mb-4 md:mb-6 flex w-full justify-between">
                    <h3 className="font-semibold text-sm md:text-2xl text-[#B98C20]"> Visitor Booking</h3>
                    <h3 className="font-semibold text-sm md:text-2xl text-[#B98C20]"> 訪問者の予約</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 ">
                    <div>
                        <label className="text-sm  block mb-1">Full Name</label>
                        <input
                            type="text"
                            name="applicantName"
                            value={form.applicantName}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4"
                        />
                    </div>

                    <div>
                        <label className="text-sm block mb-1">Organization Name</label>
                        <input
                            type="text"
                            name="organizationName"
                            value={form.organizationName}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4"
                        />
                    </div>

                    <div>
                        <label className="text-sm block mb-1">Gender</label>
                        <select
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4 bg-white"
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm block mb-1">City</label>
                        <input
                            type="text"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4"
                        />
                    </div>

                    <div>
                        <label className="text-sm block mb-1">Number of Visitor</label>
                        <input
                            type="number"
                            name="numberOfVisitor"
                            value={form.numberOfVisitor}
                            onChange={handleChange}
                            min={1}
                            className="w-full h-12 rounded-xl border border-green-700 px-4"
                        />
                    </div>

                    <div>
                        <label className="text-sm block mb-1">Contact</label>
                        <input
                            type="text"
                            name="contact"
                            value={form.contact}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4"
                        />
                    </div>
                </div>

  {/* ROW 2 */}
                <div className="mb-y md:my-6 flex w-full justify-betstartween">
                    <h3 className="font-semibold text-sm md:text-2xl text-[#B98C20]"> Visit Details</h3>
                    {/* <h3 className="font-semibold text-sm md:text-xl"> 訪問者の予約</h3> */}
                </div>
              
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
                    <div>
                        <label className="text-sm block mb-1">Visit Date</label>
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4 bg-white"
                        />
                    </div>

                    <div>
                        <label className="text-sm block mb-1">Visit Time</label>
                        <input
                            type="time"
                            name="time"
                            value={form.time}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4 bg-white"
                        />
                    </div>

                    <div>
                        <label className="text-sm block mb-1">Duration</label>
                        <input
                            type="text"
                            name="duration"
                            placeholder="e.g. 2 Hours"
                            value={form.duration}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4"
                        />
                    </div>

                    <div>
                        <label className="text-sm block mb-1">Purpose of Visit</label>
                        <input
                            type="text"
                            name="purposeOfVisit"
                            value={form.purposeOfVisit}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4"
                        />
                    </div>

                    <div>
                        <label className="text-sm block mb-1">Program Request</label>
                        <input
                            type="text"
                            name="programequest"
                            value={form.programequest}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl border border-green-700 px-4"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 mt-8">
                    <button
                        type="submit"
                        className="bg-[#52B920] text-white text-lg px-4 py-2.5 rounded-[10px]"
                    >
                        Submit
                    </button>

                    <button
                        type="button"
                        onClick={() => setForm(INITIAL_STATE)}
                        className="bg-[#FFE9E9] border border-[#FF0000] text-[#333333] text-lg px-4 py-2.5 rounded-[10px]"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
