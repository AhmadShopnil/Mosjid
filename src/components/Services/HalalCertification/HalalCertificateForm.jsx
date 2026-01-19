"use client";

import { useState } from "react";

const INITIAL_STATE = {
    // Row 1
    companyName: "",
    businessAddress: "",
    contact: "",
    representativeName: "",

    // Row 2
    title: "",
    certificateNumber: "",
    issueDate: "",
    issueDqrCodeVerificationLink: "",

    // Row 3
    companyName2: "",
    businessAddress2: "",
    contact2: "",
    representativeName2: "",

    // Row 4
    productName: "",
    category: "",
    scopeOfCertification: "",
    halalStandardUsed: "",
};

export default function HalalCertificateForm() {
    const [form, setForm] = useState(INITIAL_STATE);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", form);
    };

    return (
        <div className="borderDonationHome rounded-[20px] px-8 py-8">
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8 border-b-2 border-gray-200 pb-2">
                Halal Certificate Form
            </h2>

            <form onSubmit={handleSubmit}>
                {/* ROW 1 */}
                <SectionTitle title="Business Information" />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input label="Company Name" name="companyName" value={form.companyName} onChange={handleChange} />
                    <Input label="Business Address" name="businessAddress" value={form.businessAddress} onChange={handleChange} />
                    <Input label="Contact" name="contact" value={form.contact} onChange={handleChange} />
                    <Input label="Representative Name" name="representativeName" value={form.representativeName} onChange={handleChange} />
                </div>

                {/* ROW 2 */}
                <SectionTitle title="Certificate Identity" />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input label="Title" name="title" value={form.title} onChange={handleChange} />
                    <Input label="Certificate Number" name="certificateNumber" value={form.certificateNumber} onChange={handleChange} />

                    <Select
                        label="Issue Date"
                        name="issueDate"
                        value={form.issueDate}
                        onChange={handleChange}
                        options={[
                            { value: "", label: "Select" },
                            { value: "2024", label: "2024" },
                            { value: "2025", label: "2025" },
                        ]}
                    />

                    <Input
                        label="QR Code Verification Link"
                        name="issueDqrCodeVerificationLink"
                        value={form.issueDqrCodeVerificationLink}
                        onChange={handleChange}
                    />
                </div>

                {/* ROW 3 */}
                <SectionTitle title="Certified Entity" />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input label="Company Name" name="companyName2" value={form.companyName2} onChange={handleChange} />
                    <Input label="Business Address" name="businessAddress2" value={form.businessAddress2} onChange={handleChange} />
                    <Input label="Contact" name="contact2" value={form.contact2} onChange={handleChange} />
                    <Input label="Representative Name" name="representativeName2" value={form.representativeName2} onChange={handleChange} />
                </div>

                {/* ROW 4 */}
                <SectionTitle title=" Certified Product or Service" />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input label="Product Name" name="productName" value={form.productName} onChange={handleChange} />

                    <Select
                        label="Category"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        options={[
                            { value: "", label: "Select" },
                            { value: "food", label: "Food" },
                            { value: "cosmetics", label: "Cosmetics" },
                            { value: "pharmaceutical", label: "Pharmaceutical" },
                        ]}
                    />

                    <Input
                        label="Scope of Certification"
                        name="scopeOfCertification"
                        value={form.scopeOfCertification}
                        onChange={handleChange}
                    />

                    <Input
                        label="Halal Standard Used"
                        name="halalStandardUsed"
                        value={form.halalStandardUsed}
                        onChange={handleChange}
                    />
                </div>

                {/* BUTTONS */}
                <div className="flex justify-end gap-4 mt-8">
                    <button
                        type="submit"
                        className="bg-[#52B920] text-white text-lg px-6 py-2.5 rounded-[10px]"
                    >
                        Submit
                    </button>

                    <button
                        type="button"
                        onClick={() => setForm(INITIAL_STATE)}
                        className="bg-[#FFE9E9] border border-[#FF0000] text-[#333333] text-lg px-6 py-2.5 rounded-[10px]"
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

const Input = ({ label, name, value, onChange, type = "text" }) => (
    <div>
        <label className="text-sm block mb-1">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full h-12 rounded-xl border border-green-700 px-4"
        />
    </div>
);

const Select = ({ label, name, value, onChange, options }) => (
    <div>
        <label className="text-sm block mb-1">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full h-12 rounded-xl border border-green-700 px-4 bg-white"
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    </div>
);
