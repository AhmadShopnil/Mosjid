"use client";

import { useState } from "react";
import axiosInstance from "@/helper/axiosInstance";

const INITIAL_STATE = {
    student_name: "",
    date_of_birth: "",
    gender: "",
    nationality: "",
    parent_name: "",
    parent_contact: "",
    parent_email: "",
    relationship: "",
    previous_school: "",
    grade_level: "",
    course_interest: "",
    address: "",
};

export default function AdmissionForm() {
    const [form, setForm] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });
        setLoading(true);

        try {
            // Placeholder endpoint for admission form submission
            // const response = await axiosInstance.post("/madrasha/admission", form);
            // if (response.data) {
                setMessage({ type: "success", text: "Admission form submitted successfully! We will contact you soon." });
                setForm(INITIAL_STATE);
            // }
        } catch (error) {
            setMessage({ type: "error", text: "An error occurred while submitting. Please try again." });
            console.error("Error submitting admission form:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="borderDonationHome rounded-[20px] px-8 py-8 bg-white shadow-sm">
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8 border-b-2 border-gray-100 pb-4 text-[#00401A]">
                Madrasha Admission Form
            </h2>

            {message.text && (
                <div className={`p-4 mb-6 rounded-xl text-center font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Student Information */}
                <div>
                    <SectionTitle title="Student Information" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Student Full Name" name="student_name" value={form.student_name} onChange={handleChange} required />
                        <Input label="Date of Birth" name="date_of_birth" type="date" value={form.date_of_birth} onChange={handleChange} required />
                        <Select
                            label="Gender"
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            required
                            options={[
                                { value: "", label: "Select Gender" },
                                { value: "male", label: "Male" },
                                { value: "female", label: "Female" },
                            ]}
                        />
                        <Input label="Nationality" name="nationality" value={form.nationality} onChange={handleChange} required />
                    </div>
                </div>

                {/* Parent/Guardian Information */}
                <div>
                    <SectionTitle title="Parent/Guardian Information" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Parent/Guardian Name" name="parent_name" value={form.parent_name} onChange={handleChange} required />
                        <Input label="Contact Number" name="parent_contact" value={form.parent_contact} onChange={handleChange} required />
                        <Input label="Email Address" name="parent_email" type="email" value={form.parent_email} onChange={handleChange} required />
                        <Input label="Relationship to Student" name="relationship" value={form.relationship} onChange={handleChange} required />
                    </div>
                </div>

                {/* Educational Background & Selection */}
                <div>
                    <SectionTitle title="Academic Details" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Previous School (if any)" name="previous_school" value={form.previous_school} onChange={handleChange} />
                        <Input label="Grade/Class Applying For" name="grade_level" value={form.grade_level} onChange={handleChange} required />
                        <Select
                            label="Course Interest"
                            name="course_interest"
                            value={form.course_interest}
                            onChange={handleChange}
                            required
                            options={[
                                { value: "", label: "Select Course" },
                                { value: "hifz", label: "Hifz-ul-Quran" },
                                { value: "arabic", label: "Arabic Language" },
                                { value: "islamic_studies", label: "Islamic Studies" },
                                { value: "tajweed", label: "Tajweed" },
                            ]}
                        />
                        <Input label="Residential Address" name="address" value={form.address} onChange={handleChange} required />
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-center gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`min-w-[180px] text-white text-lg px-8 py-3 rounded-full transition-all duration-300 ${
                            loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#00401A] hover:bg-[#00602A] shadow-md hover:shadow-lg"
                        }`}
                    >
                        {loading ? "Submitting..." : "Submit Application"}
                    </button>
                </div>
            </form>
        </div>
    );
}

const SectionTitle = ({ title }) => (
    <div className="mb-4 mt-8 border-l-4 border-[#B98C20] pl-3">
        <h3 className="font-bold text-lg text-[#00401A]">
            {title}
        </h3>
    </div>
);

const Input = ({ label, name, value, onChange, type = "text", required = false }) => (
    <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-[#333333]">{label} {required && <span className="text-red-500">*</span>}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full h-12 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-[#00401A] transition-colors bg-[#F9F9F9]"
        />
    </div>
);

const Select = ({ label, name, value, onChange, options, required = false }) => (
    <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-[#333333]">{label} {required && <span className="text-red-500">*</span>}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full h-12 rounded-xl border border-gray-200 px-4 bg-[#F9F9F9] focus:outline-none focus:border-[#00401A] transition-colors"
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    </div>
);
