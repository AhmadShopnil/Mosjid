"use client";

import { useState } from "react";
import axiosInstance from "@/helper/axiosInstance";

const INITIAL_STATE = {
    // Row 1 (Business Information)
    company_name: "",
    company_address: "",
    company_contact_no: "",
    company_representive: "",

    // Row 2 (Certificate Identity)
    title: "",
    certificate_number: "",
    issue_date: "",
    expiry_date: "",
    qr_code_link: "",

    // Row 3 (Certified Entity)
    certificate_name: "",
    certificate_address: "",
    certificate_representive: "",

    // Row 4 (Certified Product or Service)
    product_name: "",
    product_category: "",
    product_scope: "",
    product_halal_use: "",
};

export default function HalalCertificateForm({ onCancel }) {
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
            const response = await axiosInstance.post("/halal", form);
            if (response.data) {
                setMessage({ type: "success", text: "Form submitted successfully!" });
                setForm(INITIAL_STATE);
            }
        } catch (error) {
            setMessage({ type: "error", text: "An error occurred while submitting." });
            console.error("Error submitting halal form:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="borderDonationHome rounded-[20px] px-8 py-8">
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8 border-b-2 border-gray-200 pb-2">
                Halal Certificate Form
            </h2>

            {message.text && (
                <div className={`p-4 mb-6 rounded-xl text-center font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* ROW 1 */}
                <SectionTitle title="Business Information" />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input label="Company Name" name="company_name" value={form.company_name} onChange={handleChange} required />
                    <Input label="Business Address" name="company_address" value={form.company_address} onChange={handleChange} required />
                    <Input label="Contact No" name="company_contact_no" value={form.company_contact_no} onChange={handleChange} required />
                    <Input label="Representative Name" name="company_representive" value={form.company_representive} onChange={handleChange} required />
                </div>

                {/* ROW 2 */}
                <SectionTitle title="Certificate Identity" />

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <Input label="Title" name="title" value={form.title} onChange={handleChange} />
                    <Input label="Certificate Number" name="certificate_number" value={form.certificate_number} onChange={handleChange} />

                    <Input
                        label="Issue Date"
                        name="issue_date"
                        type="date"
                        value={form.issue_date}
                        onChange={handleChange}
                    />

                    <Input
                        label="Expiry Date"
                        name="expiry_date"
                        type="date"
                        value={form.expiry_date}
                        onChange={handleChange}
                    />

                    <Input
                        label="QR Code Link"
                        name="qr_code_link"
                        value={form.qr_code_link}
                        onChange={handleChange}
                    />
                </div>

                {/* ROW 3 */}
                <SectionTitle title="Certified Entity" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input label="Company Name" name="certificate_name" value={form.certificate_name} onChange={handleChange} />
                    <Input label="Business Address" name="certificate_address" value={form.certificate_address} onChange={handleChange} />
                    <Input label=" Representative Name & Title" name="certificate_representive" value={form.certificate_representive} onChange={handleChange} />
                </div>

                {/* ROW 4 */}
                <SectionTitle title="Certified Product or Service" />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input label="Product Name" name="product_name" value={form.product_name} onChange={handleChange} />

                    <Select
                        label="Product Category"
                        name="product_category"
                        value={form.product_category}
                        onChange={handleChange}
                        options={[
                            { value: "", label: "Select" },
                            { value: "1", label: "Food" },
                            { value: "2", label: "Cosmetics" },
                            { value: "3", label: "Pharmaceutical" },
                        ]}
                    />

                    <Input
                        label="Scope of Certification"
                        name="product_scope"
                        value={form.product_scope}
                        onChange={handleChange}
                    />

                    <Input
                        label="Halal Standard Used"
                        name="product_halal_use"
                        value={form.product_halal_use}
                        onChange={handleChange}
                    />
                </div>

                {/* BUTTONS */}
                <div className="flex justify-end gap-4 mt-8">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`text-white text-lg px-6 py-2.5 rounded-[10px] transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#52B920] hover:bg-green-600"
                            }`}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => {
                            setForm(INITIAL_STATE);
                            if (onCancel) onCancel();
                        }}
                        className="bg-[#FFE9E9] border border-[#FF0000] text-[#333333] text-lg px-6 py-2.5 rounded-[10px] hover:bg-red-50 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

/*  Reusable Components */

const SectionTitle = ({ title }) => (
    <div className="my-6">
        <h3 className="font-semibold text-sm md:text-xl ">
            {title}
        </h3>
    </div>
);

const Input = ({ label, name, value, onChange, type = "text", required = false }) => (
    <div>
        <label className="text-sm block mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full h-12 rounded-xl border border-green-700 px-4 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
    </div>
);

const Select = ({ label, name, value, onChange, options, required = false }) => (
    <div>
        <label className="text-sm block mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full h-12 rounded-xl border border-green-700 px-4 bg-white focus:outline-none focus:ring-1 focus:ring-green-500"
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    </div>
);
