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

const FileInputWithPreview = ({ id, label, value, onChange, heightClass = "h-[46px]" }) => {
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
        className={`flex items-center justify-center w-full border border-gray-300 rounded-md p-2.5 ${heightClass} bg-gray-50 text-center text-xs text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors`}
      >
        {label}
      </label>
      <input
        id={id}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            onChange(e.target.files[0]);
          }
        }}
      />
      {preview && (
        <div className="flex justify-center w-full border border-dashed border-gray-300 rounded p-2 bg-white">
          <Image src={preview} alt="Preview" width={200} height={100} className="object-cover h-24 rounded" unoptimized />
        </div>
      )}
    </div>
  );
};

const WitnessSection = ({ side, data, attachedData, onFieldChange, onAttachedChange }) => (
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
        <FileInputWithPreview
          id={`${side}-witness-sign`}
          label="Attached Signature"
          value={attachedData ? attachedData[`${side}_witness_sign`] : null}
          onChange={(file) => onAttachedChange && onAttachedChange(`${side}_witness_sign`, file)}
        />
      </div>
    </div>
  </div>
);

const MarriageForm = ({ application, onCancel, onSubmitSuccess }) => {
  // Initialize form data from the application's informations or empty
  const getInitialData = () => {
    let rawInfo = application?.others_infomartions || application?.informations || {};

    if (typeof rawInfo === 'string') {
      try {
        rawInfo = JSON.parse(rawInfo);
      } catch (e) {
        rawInfo = {};
      }
    }

    // The data might be nested inside an "informations" key, or directly on the object.
    const info = rawInfo?.informations || rawInfo;

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
      others: info?.others || {},
      attached: {
        // ...(info?.attached || {}),
        sign: info?.attached?.sign || null,
        bride_sign: info?.attached?.bride_sign || null,
        groom_sign: info?.attached?.groom_sign || null,
        bride_witness_sign: info?.attached?.bride_witness_sign || null,
        groom_witness_sign: info?.attached?.groom_witness_sign || null,
        bride_photo: info?.attached?.bride_photo || null,
        groom_photo: info?.attached?.groom_photo || null,
      },
    };
  };

  const [formData, setFormData] = useState(getInitialData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  console.log("application", application)

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

  const handleAttachedChange = (field, file) => {
    setFormData((prev) => ({
      ...prev,
      attached: { ...prev.attached, [field]: file },
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setMessage({ text: "", type: "" });

      const formPayload = new FormData();
      // Use POST with _method = POST so laravel accepts files correctly on update
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

      // Others (Maintained from previous booking forms)
      if (formData.others) {
        Object.keys(formData.others).forEach((key) => {
          formPayload.append(`informations[others][${key}]`, formData.others[key] || "");
        });
      }

      // Attached
      Object.keys(formData.attached).forEach((key) => {
        const fileOrStr = formData.attached[key];
        if (fileOrStr instanceof File) {
          formPayload.append(`informations[attached][${key}]`, fileOrStr);
        } else if (typeof fileOrStr === 'string' && fileOrStr) {
          formPayload.append(`informations[attached][${key}]`, fileOrStr);
        }
      });

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
                  <FileInputWithPreview
                    id="groom-sign"
                    label="Attached Signature"
                    value={formData.attached.groom_sign}
                    onChange={(file) => handleAttachedChange("groom_sign", file)}
                  />
                </div>
              </div>

              {/* Groom Photo */}
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="w-1/3">
                  <p className="text-[14px] text-[#333333]">新郎の写真</p>
                  <p className="font-bold text-[18px] text-[#333333]">
                    Groom Photo :
                  </p>
                </div>

                <div className="md:w-2/3 w-full">
                  <FileInputWithPreview
                    id="groom-photo"
                    label="Attached Photo"
                    value={formData.attached.groom_photo}
                    onChange={(file) => handleAttachedChange("groom_photo", file)}
                  />
                </div>
              </div>

              <WitnessSection
                side="groom"
                data={formData.groom}
                attachedData={formData.attached}
                onFieldChange={handleGroomChange}
                onAttachedChange={handleAttachedChange}
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
                  <FileInputWithPreview
                    id="bride-sign-main"
                    label="Attached Signature"
                    value={formData.attached.bride_sign}
                    onChange={(file) => handleAttachedChange("bride_sign", file)}
                  />
                </div>
              </div>

              {/* Bride Photo */}
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="w-1/3">
                  <p className="text-[14px] text-[#333333]">花嫁の写真</p>
                  <p className="font-bold text-[18px] text-[#333333]">
                    Bride Photo :
                  </p>
                </div>

                <div className="md:w-2/3 w-full">
                  <FileInputWithPreview
                    id="bride-photo"
                    label="Attached Photo"
                    value={formData.attached.bride_photo}
                    onChange={(file) => handleAttachedChange("bride_photo", file)}
                  />
                </div>
              </div>

              <WitnessSection
                side="bride"
                data={formData.bride}
                attachedData={formData.attached}
                onFieldChange={handleBrideChange}
                onAttachedChange={handleAttachedChange}
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
                <FileInputWithPreview
                  id="solemnizer-sign"
                  label="Attached Signature"
                  value={formData.attached.sign}
                  onChange={(file) => handleAttachedChange("sign", file)}
                  heightClass="h-[56px]"
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
            {
              application?.others_infomartions?.informations?.bride?.name != null ?
                <span className='bg-[#58b847] text-white px-8 py-2 rounded-md font-bold hover:bg-green-700 transition disabled:opacity-50'>Already submited</span>
                :
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-[#58b847] text-white px-8 py-2 rounded-md font-bold hover:bg-green-700 transition disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>

            }
            {/* <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#58b847] text-white px-8 py-2 rounded-md font-bold hover:bg-green-700 transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Submitting..." : "Submit"}
            </button> */}
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

          </div>
        </div>
      </GradientBorder >
    </div >
  );
};

export default MarriageForm;