'use client'
import GradientBorder from '@/components/GradientBorder/GradientBorder';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import axiosInstance from '@/helper/axiosInstance';

const InputField = ({
  labelJp,
  labelEn,
  placeholder = "Type Now",
  type = "text",
  value,
  onChange,
}) => (
  <div className="flex flex-col mb-3">
    <div className="flex flex-col md:flex-row md:items-center">
      <div className="w-full md:w-1/3 mb-1 md:mb-0">
        <p className="text-[14px] text-[#333333]">{labelJp}</p>
        <p className="font-bold text-[18px] text-[#333333]">
          {labelEn} <span>:</span>
        </p>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="w-full md:w-2/3 border border-gray-300 rounded-md p-2.5 h-[46px] text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
      />
    </div>
  </div>
);

const WitnessSection = ({ side, data, onFieldChange }) => (
  <div className="space-y-3">
    <InputField
      labelJp="証人１の氏名"
      labelEn="Witness Name"
      value={data.witness_name}
      onChange={(v) => onFieldChange("witness_name", v)}
    />
    <InputField
      labelJp="目撃者との連絡"
      labelEn="Witness Contact"
      value={data.witness_contact}
      onChange={(v) => onFieldChange("witness_contact", v)}
    />
    <InputField
      labelJp="住所"
      labelEn="Address"
      value={data.witness_address}
      onChange={(v) => onFieldChange("witness_address", v)}
    />
    <div className="flex flex-col md:flex-row md:items-center">
      <div className="w-full md:w-1/3">
        <p className="text-[14px] text-[#333333]">サイン</p>
        <p className="font-bold text-[18px] text-[#333333]">
          Sign <span>:</span>
        </p>
      </div>
      <div className="md:w-2/3 w-full">
        <label
          htmlFor={`${side}-witness-sign`}
          className="flex items-center justify-center w-full border border-gray-300 rounded-md p-2.5 h-[46px] bg-gray-50 text-center text-xs text-gray-400 cursor-pointer"
        >
          Attached Signature
        </label>
        <input
          id={`${side}-witness-sign`}
          type="file"
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  </div>
);

const MarriageForm = ({ application, onCancel, onSubmitSuccess }) => {
  // Initialize form data from the application's others_infomartions or empty
  const getInitialData = () => {
    const info = application?.others_infomartions;
    return {
      groom: {
        muslim_name: info?.groom?.muslim_name || "",
        name: info?.groom?.name || "",
        father_name: info?.groom?.father_name || "",
        age: info?.groom?.age || "",
        nationality: info?.groom?.nationality || "",
        religion: info?.groom?.religion || "",
        passport_no: info?.groom?.passport_no || "",
        address: info?.groom?.address || "",
        witness_name: info?.groom?.witness_name || "",
        witness_contact: info?.groom?.witness_contact || "",
        witness_address: info?.groom?.witness_address || "",
      },
      bride: {
        muslim_name: info?.bride?.muslim_name || "",
        name: info?.bride?.name || "",
        father_name: info?.bride?.father_name || "",
        age: info?.bride?.age || "",
        nationality: info?.bride?.nationality || "",
        religion: info?.bride?.religion || "",
        passport_no: info?.bride?.passport_no || "",
        address: info?.bride?.address || "",
        witness_name: info?.bride?.witness_name || "",
        witness_contact: info?.bride?.witness_contact || "",
        witness_address: info?.bride?.witness_address || "",
      },
      other: {
        date_of_marriage: info?.other?.date_of_marriage || "",
        place_of_marriage: info?.other?.place_of_marriage || "",
        mahar_details: info?.other?.mahar_details || "",
        solemnized_by_name: info?.other?.solemnized_by_name || "",
        address: info?.other?.address || "",
      },
    };
  };

  const [formData, setFormData] = useState(getInitialData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Re-initialize when application changes
  useEffect(() => {
    setFormData(getInitialData());
    setMessage({ text: "", type: "" });
  }, [application?.id]);

  const handleGroomChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      groom: { ...prev.groom, [field]: value },
    }));
  };

  const handleBrideChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      bride: { ...prev.bride, [field]: value },
    }));
  };

  const handleOtherChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      other: { ...prev.other, [field]: value },
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setMessage({ text: "", type: "" });

      const formPayload = new FormData();
      // Use POST with _method = PUT so laravel accepts files correctly on update
      formPayload.append("_method", "POST");

      // Groom
      Object.keys(formData.groom).forEach((key) => {
        formPayload.append(`informations[groom][${key}]`, formData.groom[key] || "");
      });

      // Bride
      Object.keys(formData.bride).forEach((key) => {
        formPayload.append(`informations[bride][${key}]`, formData.bride[key] || "");
      });

      // Other
      Object.keys(formData.other).forEach((key) => {
        formPayload.append(`informations[other][${key}]`, formData.other[key] || "");
      });

      // Attached
      const groomSign = document.getElementById("groom-sign")?.files?.[0];
      if (groomSign) formPayload.append("informations[attached][groom_sign]", groomSign);

      const groomWitnessSign = document.getElementById("groom-witness-sign")?.files?.[0];
      if (groomWitnessSign) formPayload.append("informations[attached][groom_witness_sign]", groomWitnessSign);

      const brideSign = document.getElementById("bride-sign-main")?.files?.[0];
      if (brideSign) formPayload.append("informations[attached][bride_sign]", brideSign);

      const brideWitnessSign = document.getElementById("bride-witness-sign")?.files?.[0];
      if (brideWitnessSign) formPayload.append("informations[attached][bride_witness_sign]", brideWitnessSign);

      const solemnizerSign = document.getElementById("solemnizer-sign")?.files?.[0];
      if (solemnizerSign) formPayload.append("informations[attached][sign]", solemnizerSign);

      console.log("formPayload", formPayload)
      // Submit via POST using axios, the proxy config will proxy this multipart/form-data request
      const formSubmitResponse = await axiosInstance.post(`/marriage/${application.id}`, formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("formSubmitResponse", formSubmitResponse)

      setMessage({
        text: "Marriage form submitted successfully!",
        type: "success",
      });

      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err) {
      console.error(err);
      setMessage({
        text: "Failed to submit form. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!application) return null;

  return (
    <div className="pt-4">
      <GradientBorder>
        <div className="p-4">
          {/* Application Info Banner */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-6">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="font-bold text-[#00401A]">
                Booking ID: {application.unique_id}
              </span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-700">
                Date: {application.booked_date}
              </span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-700">
                Time: {application.start_time} - {application.end_time}
              </span>
            </div>
          </div>

          {/* Header / Top Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Groom Column */}
            <section>
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-4xl font-bold text-[#00401A]">
                  Particulars of
                  <br />
                  Groom
                </h2>
                <div>
                  <Image
                    src="/images/offerServices/marriageFacilities/maleIcon.svg"
                    alt="Groom"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
              <InputField
                labelJp="ムスリमの名前"
                labelEn="Muslim Name"
                value={formData.groom.muslim_name}
                onChange={(v) => handleGroomChange("muslim_name", v)}
              />
              <InputField
                labelJp="名前"
                labelEn="Name"
                value={formData.groom.name}
                onChange={(v) => handleGroomChange("name", v)}
              />
              <InputField
                labelJp="父親の名前"
                labelEn="Father Name"
                value={formData.groom.father_name}
                onChange={(v) => handleGroomChange("father_name", v)}
              />
              <InputField
                labelJp="年齢"
                labelEn="Age"
                value={formData.groom.age}
                onChange={(v) => handleGroomChange("age", v)}
              />
              <InputField
                labelJp="国籍"
                labelEn="Nationality"
                value={formData.groom.nationality}
                onChange={(v) => handleGroomChange("nationality", v)}
              />
              <InputField
                labelJp="宗教"
                labelEn="Religion"
                value={formData.groom.religion}
                onChange={(v) => handleGroomChange("religion", v)}
              />
              <InputField
                labelJp="パスポートナンバー"
                labelEn="Passport No."
                value={formData.groom.passport_no}
                onChange={(v) => handleGroomChange("passport_no", v)}
              />
              <InputField
                labelJp="住所"
                labelEn="Address"
                value={formData.groom.address}
                onChange={(v) => handleGroomChange("address", v)}
              />
            </section>

            {/* Bride Column */}
            <section>
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-4xl font-bold text-[#00401A]">
                  Particulars of
                  <br />
                  Bride
                </h2>
                <div>
                  <Image
                    src="/images/offerServices/marriageFacilities/femaleIcon.svg"
                    alt="bride"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
              <InputField
                labelJp="ムスリムの名前"
                labelEn="Muslim Name"
                value={formData.bride.muslim_name}
                onChange={(v) => handleBrideChange("muslim_name", v)}
              />
              <InputField
                labelJp="名前"
                labelEn="Name"
                value={formData.bride.name}
                onChange={(v) => handleBrideChange("name", v)}
              />
              <InputField
                labelJp="父親の名前"
                labelEn="Father Name"
                value={formData.bride.father_name}
                onChange={(v) => handleBrideChange("father_name", v)}
              />
              <InputField
                labelJp="年齢"
                labelEn="Age"
                value={formData.bride.age}
                onChange={(v) => handleBrideChange("age", v)}
              />
              <InputField
                labelJp="国籍"
                labelEn="Nationality"
                value={formData.bride.nationality}
                onChange={(v) => handleBrideChange("nationality", v)}
              />
              <InputField
                labelJp="宗教"
                labelEn="Religion"
                value={formData.bride.religion}
                onChange={(v) => handleBrideChange("religion", v)}
              />
              <InputField
                labelJp="パスポートナンバー"
                labelEn="Passport No."
                value={formData.bride.passport_no}
                onChange={(v) => handleBrideChange("passport_no", v)}
              />
              <InputField
                labelJp="住所"
                labelEn="Address"
                value={formData.bride.address}
                onChange={(v) => handleBrideChange("address", v)}
              />
            </section>
          </div>

          <hr className="my-8 border-gray-200" />

          {/* Middle Marriage Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 mb-8">
            <div>
              <p className="text-[14px] text-[#333333]">結婚の日</p>
              <p className="font-bold text-[18px] text-[#333333] mb-1">
                Date of Marriage
              </p>
              <input
                type="date"
                value={formData.other.date_of_marriage || ""}
                onChange={(e) =>
                  handleOtherChange("date_of_marriage", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md p-2.5 h-[46px] text-sm appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-green-600"
              />
            </div>
            <div>
              <p className="text-[14px] text-[#333333]">結婚の場所</p>
              <p className="font-bold text-[18px] text-[#333333] mb-1">
                Place of Marriage
              </p>
              <input
                type="text"
                placeholder="Type Now"
                value={formData.other.place_of_marriage || ""}
                onChange={(e) =>
                  handleOtherChange("place_of_marriage", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md p-2.5 h-[46px] text-sm bg-white focus:outline-none focus:ring-1 focus:ring-green-600"
              />
            </div>
            <div>
              <p className="text-[14px] text-[#333333]">結納金の量と内容</p>
              <p className="font-bold text-[18px] text-[#333333] mb-1">
                Amount of Dower (Mahar) With Detail
              </p>
              <input
                className="w-full border border-gray-300 outline-none focus:border-[#58b847] rounded-md p-2.5 h-[46px] text-sm"
                placeholder="Type Now"
                value={formData.other.mahar_details || ""}
                onChange={(e) =>
                  handleOtherChange("mahar_details", e.target.value)
                }
              />
            </div>
          </div>

          {/* Signatures & Witnesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Groom */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="w-1/3">
                  <p className="text-[14px] text-[#333333]">新部のサイン</p>
                  <p className="font-bold text-[18px] text-[#333333]">
                    Sign of Groom :
                  </p>
                </div>

                <div className="md:w-2/3 w-full">
                  <label
                    htmlFor="groom-sign"
                    className="flex items-center justify-center w-full border border-gray-300 rounded-md p-2.5 h-[46px] bg-gray-50 text-center text-xs text-gray-400 cursor-pointer"
                  >
                    Attached Signature
                  </label>
                  <input
                    id="groom-sign"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              <WitnessSection
                side="groom"
                data={formData.groom}
                onFieldChange={handleGroomChange}
              />
            </div>

            {/* Bride */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="w-1/3">
                  <p className="text-[14px] text-[#333333]">花嫁のサイン</p>
                  <p className="font-bold text-[18px] text-[#333333]">
                    Sign of Bride :
                  </p>
                </div>

                <div className="md:w-2/3 w-full">
                  <label
                    htmlFor="bride-sign-main"
                    className="flex items-center justify-center w-full border border-gray-300 rounded-md p-2.5 h-[46px] bg-gray-50 text-center text-xs text-gray-400 cursor-pointer"
                  >
                    Attached Signature
                  </label>
                  <input
                    id="bride-sign-main"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              <WitnessSection
                side="bride"
                data={formData.bride}
                onFieldChange={handleBrideChange}
              />
            </div>
          </div>

          {/* Certification Footer */}
          <div className="mt-10 text-[#333333] border-gray-300 space-y-2 border-t pt-6">
            <p className="italic">
              住所私は、花嫁花婿がイスラム法に従って結納金の受け入れ（イジャブとクブル）
            </p>
            <p className="font-bold text-[18px]">
              I certify that Bride &amp; Groom have exchange the offering and
              acceptance (Ijab and Qubul)
            </p>
            <p className="italic text-[14px]">
              の承認を証明する。従って、夫婦になることを宣言する。
            </p>
            <p className="font-bold text-[18px]">
              according to Islamic Law and are declared Husband and Wife
            </p>
          </div>

          {/* Solemnizer Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 mt-8">
            <div>
              <p className="text-[14px] text-[#333333]">名前で厳粛に結婚</p>
              <p className="font-bold text-[#333333] text-[18px] mb-1">
                Marriage Solemnized By Name
              </p>
              <input
                placeholder="Type Now"
                value={formData.other.solemnized_by_name || ""}
                onChange={(e) =>
                  handleOtherChange("solemnized_by_name", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md outline-none focus:border-[#58b847] px-2.5 h-[56px] text-sm"
              />
            </div>
            <div>
              <p className="text-[14px] text-[#333333]">住所</p>
              <p className="font-bold text-[#333333] text-[18px] mb-1">
                Address
              </p>
              <input
                placeholder="Type Now"
                value={formData.other.address || ""}
                onChange={(e) =>
                  handleOtherChange("address", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md outline-none focus:border-[#58b847] h-[56px] px-3 text-sm"
              />
            </div>
            <div>
              <p className="text-[#333333] text-[14px]">サイン</p>
              <p className="font-bold text-[#333333] text-[18px] mb-1">Sign</p>
              <div className="md:w-2/3 w-full">
                <label
                  htmlFor="solemnizer-sign"
                  className="flex items-center justify-center border w-full border-gray-300 rounded-md p-2.5 h-[56px] bg-gray-50 text-center text-xs text-gray-400 cursor-pointer"
                >
                  Attached Signature
                </label>
                <input
                  id="solemnizer-sign"
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Message */}
          {message.text && (
            <div className="mt-4">
              <p
                className={`text-sm font-medium ${message.type === "success"
                  ? "text-green-600"
                  : "text-red-600"
                  }`}
              >
                {message.text}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-10">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#58b847] text-white px-8 py-2 rounded-md font-bold hover:bg-green-700 transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            <button
              onClick={() => {
                setFormData(getInitialData());
                setMessage({ text: "", type: "" });
                if (onCancel) onCancel();
              }}
              className="bg-[#fde2e2] text-red-600 border border-red-300 px-8 py-2 rounded-md font-bold hover:bg-red-100 transition cursor-pointer"
            >
              Cancel
            </button>
            <button className="bg-white text-gray-700 border border-green-400 px-8 py-2 rounded-md font-bold hover:bg-green-50 transition cursor-pointer">
              View Certificate
            </button>
          </div>
        </div>
      </GradientBorder>
    </div>
  );
};

export default MarriageForm;