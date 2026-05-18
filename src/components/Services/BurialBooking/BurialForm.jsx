'use client';

import React, { useState, useEffect } from 'react';
import axiosInstance from '@/helper/axiosInstance';

export default function BurialForm({ application, countries = [], relationships = [], onCancel, onSubmitSuccess }) {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    // Setup initial state from the selected application
    const [formData, setFormData] = useState({
        deceased_person_name: "",
        gender: "",
        date_of_birth: "",
        date_of_death: "",
        place_of_death: "",
        nationality: "",
        passport_no: "",
        id_card: "",
        janazah_prayer_location: "",
        janazah_date: "",
        burial_date: "",
        grave_number: "",
        applicant_name: "",
        contact_number: "",
        address: "",
        relationship: "",
    });

    useEffect(() => {
        if (application) {
            // Check if there is already filled form information in others_informations
            const info = application?.others_infomartions?.informations || {};
            setFormData({
                deceased_person_name: info.deceased_person_name || application.deceased_name || "",
                gender: info.gender || "",
                date_of_birth: info.date_of_birth || "",
                date_of_death: info.date_of_death || "",
                place_of_death: info.place_of_death || "",
                nationality: info.nationality || "",
                passport_no: info.passport_no || "",
                id_card: info.id_card || "",
                janazah_prayer_location: info.janazah_prayer_location || "",
                janazah_date: info.janazah_date || "",
                burial_date: info.burial_date || application.burial_date || "",
                grave_number: info.grave_number || "",
                applicant_name: info.applicant_name || application.name || "",
                contact_number: info.contact_number || application.contact_no || "",
                address: info.address || "",
                relationship: info.relationship || application.relationship || "",
            });
        }
    }, [application]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        try {
            const submitData = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    submitData.append(key, value);
                }
            });

            // Endpoint matches the /burial/{id} submission for registration details
            const res = await axiosInstance.post(`/burial/${application.id}`, submitData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (res.data?.success === false || res.data?.errors || res.data?.success === "error") {
                throw new Error(res.data?.message || JSON.stringify(res.data?.errors) || "Failed to update record.");
            }

            alert("Burial form completed and saved successfully!");
            if (onSubmitSuccess) onSubmitSuccess();
        } catch (err) {
            console.error("Burial Form Error:", err);
            const msg = err?.response?.data?.message || err?.message || "Something went wrong. Please try again.";
            setErrorMsg(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto rounded-[30px] border-2 border-[#52B920]/30 bg-[#F9FFF6]/80 backdrop-blur-sm p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
            <h2 className="text-[36px] font-extrabold text-[#333333] text-center mb-2">
                Burial Form
            </h2>
            <div className="w-full h-[1px] bg-gray-300 mb-8" />

            {errorMsg && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl text-sm font-medium">
                    {errorMsg}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Row 1 */}
                    <FormField
                        labelEn="Deceased Person Name"
                        labelJp="故人の氏名"
                        placeholder="故人の氏名"
                        value={formData.deceased_person_name}
                        onChange={(val) => handleInputChange("deceased_person_name", val)}
                        required
                    />

                    <FormField
                        labelEn="Gender"
                        labelJp="性別"
                        type="select"
                        options={[
                            { label: "Select Gender", value: "" },
                            { label: "Male (男性)", value: "0" },
                            { label: "Female (女性)", value: "1" },
                            { label: "Other (その他)", value: "2" },
                        ]}
                        value={formData.gender}
                        onChange={(val) => handleInputChange("gender", val)}
                        required
                    />

                    <FormField
                        labelEn="Date of Birth"
                        labelJp="生年月日"
                        type="date"
                        value={formData.date_of_birth}
                        onChange={(val) => handleInputChange("date_of_birth", val)}
                        required
                    />

                    <FormField
                        labelEn="Date of Death"
                        labelJp="死亡日"
                        type="date"
                        value={formData.date_of_death}
                        onChange={(val) => handleInputChange("date_of_death", val)}
                        required
                    />

                    {/* Row 2 */}
                    <FormField
                        labelEn="Place of Death"
                        labelJp="死亡場所"
                        placeholder="死亡場所"
                        value={formData.place_of_death}
                        onChange={(val) => handleInputChange("place_of_death", val)}
                        required
                    />

                    <FormField
                        labelEn="Nationality"
                        labelJp="国籍"
                        type="select"
                        options={[
                            { label: "Select Nationality", value: "" },
                            ...countries.map(c => ({ label: c.name, value: String(c.id) }))
                        ]}
                        value={formData.nationality}
                        onChange={(val) => handleInputChange("nationality", val)}
                        required
                    />

                    <FormField
                        labelEn="Passport Number"
                        labelJp="パスポート番号"
                        placeholder="パスポート番号"
                        value={formData.passport_no}
                        onChange={(val) => handleInputChange("passport_no", val)}
                        required
                    />

                    <FormField
                        labelEn="Id Card Number"
                        labelJp="身分証番号"
                        placeholder="身分証番号"
                        value={formData.id_card}
                        onChange={(val) => handleInputChange("id_card", val)}
                        required
                    />

                    {/* Row 3 */}
                    <FormField
                        labelEn="Janazah Prayer location"
                        labelJp="葬礼場所"
                        placeholder="葬礼場所"
                        value={formData.janazah_prayer_location}
                        onChange={(val) => handleInputChange("janazah_prayer_location", val)}
                        required
                    />

                    <FormField
                        labelEn="Janazah Date"
                        labelJp="葬礼日付"
                        type="date"
                        value={formData.janazah_date}
                        onChange={(val) => handleInputChange("janazah_date", val)}
                        required
                    />

                    <FormField
                        labelEn="Burial Date"
                        labelJp="埋葬日"
                        type="date"
                        value={formData.burial_date}
                        onChange={(val) => handleInputChange("burial_date", val)}
                        required
                    />

                    <FormField
                        labelEn="Grave Number"
                        labelJp="墓番号"
                        placeholder="墓番号"
                        value={formData.grave_number}
                        onChange={(val) => handleInputChange("grave_number", val)}
                        required
                    />

                    {/* Row 4 */}
                    <FormField
                        labelEn="Applicant Name"
                        labelJp="申請者氏名"
                        placeholder="申請者氏名"
                        value={formData.applicant_name}
                        onChange={(val) => handleInputChange("applicant_name", val)}
                        required
                    />

                    <FormField
                        labelEn="Contact Number"
                        labelJp="連絡先番号"
                        placeholder="連絡先番号"
                        value={formData.contact_number}
                        onChange={(val) => handleInputChange("contact_number", val)}
                        required
                    />

                    <FormField
                        labelEn="Address"
                        labelJp="住所"
                        placeholder="住所"
                        value={formData.address}
                        onChange={(val) => handleInputChange("address", val)}
                        required
                    />

                    <FormField
                        labelEn="Relationship to the deceased"
                        labelJp="故人との関係"
                        type="select"
                        options={[
                            { label: "Select Relationship", value: "" },
                            ...relationships.map(r => ({ label: r.name, value: String(r.id) }))
                        ]}
                        value={formData.relationship}
                        onChange={(val) => handleInputChange("relationship", val)}
                        required
                    />
                </div>

                <div className="flex justify-end gap-4 pt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#52B920] hover:bg-[#469f1a] text-white px-8 py-3 rounded-xl font-bold transition shadow-md disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="border border-[#ff8d8d] text-[#ff4d4d] bg-[#ffebeb] hover:bg-[#ffd6d6] px-8 py-3 rounded-xl font-bold transition shadow-sm cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

function FormField({ labelEn, labelJp, type = "text", placeholder, value, onChange, options = [], required = false }) {
    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex flex-col">
                <span className="text-sm font-extrabold text-[#333333] leading-tight">
                    {labelEn} {required && <span className="text-red-500">*</span>}
                </span>
                <span className="text-[10px] text-gray-500 leading-tight">
                    {labelJp}
                </span>
            </div>

            {type === "select" ? (
                <select
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full border border-[#B0C4B8] rounded-[10px] px-3.5 h-[50px] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#52B920]/40 appearance-none cursor-pointer"
                >
                    {options.map((opt, i) => (
                        <option key={i} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full border border-[#B0C4B8] rounded-[10px] px-3.5 h-[50px] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#52B920]/40"
                />
            )}
        </div>
    );
}
