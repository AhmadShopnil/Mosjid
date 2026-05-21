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
        // Attachments
        id_card_file: null,
        death_certificate_file: null,
        id_card_preview: null,
        death_certificate_preview: null
    });

    useEffect(() => {
        if (application) {
            // Check if there is already filled form information in others_infomartions
            let info = application?.others_infomartions || {};
            if (typeof info === 'string') {
                try {
                    info = JSON.parse(info);
                } catch (e) {
                    info = {};
                }
            }
            
            const finalInfo = info.informations || info;

            setFormData({
                deceased_person_name: finalInfo.deceased_person_name || application.deceased_name || "",
                gender: finalInfo.gender || "",
                date_of_birth: finalInfo.date_of_birth || "",
                date_of_death: finalInfo.date_of_death || "",
                place_of_death: finalInfo.place_of_death || "",
                nationality: finalInfo.nationality || "",
                passport_no: finalInfo.passport_no || "",
                id_card: finalInfo.id_card || "",
                janazah_prayer_location: finalInfo.janazah_prayer_location || "",
                janazah_date: finalInfo.janazah_date || "",
                burial_date: application.burial_date || "",
                grave_number: finalInfo.grave_number || "",
                applicant_name: application.name || "",
                contact_number: application.contact_no || "",
                address: finalInfo.address || "",
                relationship: application.relationship || "",
                // Attached files: show pre-existing paths from database if present
                id_card_preview: finalInfo.attached?.id_card || null,
                death_certificate_preview: finalInfo.attached?.death_certificate || null,
                id_card_file: null,
                death_certificate_file: null
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

            // Root level fields matching backend expectations
            submitData.append("name", formData.applicant_name);
            submitData.append("contact_no", formData.contact_number);
            submitData.append("deceased_name", formData.deceased_person_name);
            submitData.append("relationship", formData.relationship);
            submitData.append("burial_date", formData.burial_date);
            
            if (application.estimated_burial_time) {
                submitData.append("estimated_burial_time", application.estimated_burial_time);
            }
            if (application.start_time) {
                submitData.append("start_time", application.start_time);
            }
            if (application.end_time) {
                submitData.append("end_time", application.end_time);
            }

            // others_infomartions object format matching exact Postman schema keys
            submitData.append("others_infomartions[gender]", formData.gender);
            submitData.append("others_infomartions[address]", formData.address);
            submitData.append("others_infomartions[id_card]", formData.id_card);
            submitData.append("others_infomartions[nationality]", formData.nationality);
            submitData.append("others_infomartions[passport_no]", formData.passport_no);
            submitData.append("others_infomartions[grave_number]", formData.grave_number);
            submitData.append("others_infomartions[janazah_date]", formData.janazah_date);
            submitData.append("others_infomartions[relationship]", formData.relationship);
            submitData.append("others_infomartions[date_of_birth]", formData.date_of_birth);
            submitData.append("others_infomartions[date_of_death]", formData.date_of_death);
            submitData.append("others_infomartions[place_of_death]", formData.place_of_death);
            submitData.append("others_infomartions[janazah_prayer_location]", formData.janazah_prayer_location);

            // Append newly uploaded files if selected
            if (formData.id_card_file) {
                submitData.append("others_infomartions[attached][id_card]", formData.id_card_file);
            }
            if (formData.death_certificate_file) {
                submitData.append("others_infomartions[attached][death_certificate]", formData.death_certificate_file);
            }

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
                            { label: "Male (男性)", value: "Male" },
                            { label: "Female (女性)", value: "Female" },
                            { label: "Other (その他)", value: "Other" },
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
                            ...countries.map(c => ({ label: c.name, value: c.name }))
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
                            ...relationships.map(r => ({ label: r.name, value: r.name }))
                        ]}
                        value={formData.relationship}
                        onChange={(val) => handleInputChange("relationship", val)}
                        required
                    />
                </div>

                {/* File Attachments Section */}
                <div className="w-full h-[1px] bg-gray-300 my-8" />
                
                <h3 className="text-xl font-bold text-[#333333] mb-4">
                  Attachments / 添付ファイル
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-1.5">
                        <div className="flex flex-col">
                            <span className="text-sm font-extrabold text-[#333333] leading-tight">
                                ID Card / Residence Card Copy
                            </span>
                            <span className="text-[10px] text-gray-500 leading-tight">
                                身分証 / 在留カードのコピー
                            </span>
                        </div>
                        <FileInputWithPreview
                            id="attached-id-card"
                            label={formData.id_card_file ? formData.id_card_file.name : "Choose ID Card Copy"}
                            value={formData.id_card_file || formData.id_card_preview}
                            onChange={(file) => handleInputChange("id_card_file", file)}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="flex flex-col">
                            <span className="text-sm font-extrabold text-[#333333] leading-tight">
                                Death Certificate Copy
                            </span>
                            <span className="text-[10px] text-gray-500 leading-tight">
                                死亡診断書のコピー
                            </span>
                        </div>
                        <FileInputWithPreview
                            id="attached-death-certificate"
                            label={formData.death_certificate_file ? formData.death_certificate_file.name : "Choose Death Certificate Copy"}
                            value={formData.death_certificate_file || formData.death_certificate_preview}
                            onChange={(file) => handleInputChange("death_certificate_file", file)}
                        />
                    </div>
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

const FileInputWithPreview = ({ id, label, value, onChange, heightClass = "h-[50px]" }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }
    if (typeof value === "string") {
      setPreview(`https://admin.osakamasjid.org/public/${value}`);
    } else if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [value]);

  return (
    <div className="w-full flex flex-col gap-2">
      <label
        htmlFor={id}
        className={`flex items-center justify-center w-full border border-[#B0C4B8] rounded-[10px] p-3.5 ${heightClass} bg-white text-center text-xs text-gray-600 font-semibold cursor-pointer hover:bg-gray-50 transition-colors`}
      >
        {label}
      </label>
      <input
        id={id}
        type="file"
        accept="image/*,application/pdf"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            onChange(e.target.files[0]);
          }
        }}
      />
      {preview && (
        <div className="flex justify-center w-full border border-dashed border-gray-300 rounded-lg p-2 bg-white">
          {typeof value === "string" || (value instanceof File && value.type.startsWith("image/")) ? (
            <img src={preview} alt="Preview" className="object-cover h-24 rounded max-w-xs" />
          ) : (
            <span className="text-xs text-gray-500 font-semibold">Selected Document (PDF/File)</span>
          )}
        </div>
      )}
    </div>
  );
};
