"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import GradientBorderWrapper1 from "@/components/Shared/GradientBorderWrapper1";
import axiosInstance from "@/helper/axiosInstance";
import toast from "react-hot-toast";

export default function ConversionForm({ application, onCancel }) {
    const { register, handleSubmit, reset } = useForm();
    const appId = application?.id;

    const [applicantPhoto, setApplicantPhoto] = useState(null);
    const [pictureArea, setPictureArea] = useState(null);
    const [imamSign, setImamSign] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        if (!appId) {
            toast.error("Please select an approved application to fill the form.");
            return;
        }

        const formData = new FormData();
        formData.append("informations[name]", data.name || "");
        formData.append("informations[muslim_name]", data.muslimName || "");
        formData.append("informations[date_of_birth]", data.dob || "");
        formData.append("informations[mobile_no]", data.mobile || "");
        formData.append("informations[witness_one]", data.witness1 || "");
        formData.append("informations[witness_two]", data.witness2 || "");
        formData.append("informations[witness_three]", data.witness3 || "");
        formData.append("informations[prevous_religion]", data.previousReligion || "");
        formData.append("informations[nationality]", data.nationality || "");
        formData.append("informations[address]", data.address || "");
        formData.append("informations[declared_date]", data.declaredDate || "");
        formData.append("informations[passport_no]", data.passport || "");

        if (pictureArea?.file) {
            formData.append("informations[attached][picture_area]", pictureArea.file);
        }
        if (imamSign?.file) {
            formData.append("informations[attached][imam_sign]", imamSign.file);
        }

        try {
            setLoading(true);
            const response = await axiosInstance.post(`/conversion/${appId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200 || response.status === 201 || response.data?.success) {
                toast.success("Conversion form submitted successfully.");
                reset();
                setApplicantPhoto(null);
                setPictureArea(null);
                setImamSign(null);
            } else {
                toast.error(response.data?.message || "Failed to submit form.");
            }
        } catch (error) {
            console.error("Submission Error:", error);
            toast.error(error.response?.data?.message || "An error occurred during submission.");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "—";
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
    };

    const formatTime = (time) => {
        if (!time) return "—";
        const [h, m] = time.split(":");
        const hour = parseInt(h, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        const hour12 = hour % 12 || 12;
        return `${hour12}:${m} ${ampm}`;
    };

    return (
        <section className="borderDonationHome p-4 sm:p-6 mt-6 relative">
            {onCancel && (
                <button 
                    onClick={onCancel}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-red-500 transition-colors"
                    title="Close form"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}

            <h2 className="text-xl sm:text-2xl font-semibold mb-6 pr-8">
                Converted Person Information
            </h2>

            {application && (
                <div className="mb-8 p-4 sm:p-5 bg-green-50/80 rounded-xl border border-green-200 shadow-sm">
                    <h3 className="text-green-800 font-semibold mb-3 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Selected Booking Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-6 text-sm text-green-900">
                        <div className="flex flex-col">
                            <span className="text-green-700/70 text-xs uppercase tracking-wider font-semibold mb-1">Date</span>
                            <span className="font-medium">{formatDate(application.booked_date)}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-green-700/70 text-xs uppercase tracking-wider font-semibold mb-1">Time Slot</span>
                            <span className="font-medium">{formatTime(application.start_time)} - {formatTime(application.end_time)}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-green-700/70 text-xs uppercase tracking-wider font-semibold mb-1">Status</span>
                            <span className="inline-flex items-center gap-1.5 font-medium text-green-700">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Approved
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">

                    <FormRow en="Name" jp="氏名" {...register("name")} />
                    <FormRow en="Nationality" jp="国籍" {...register("nationality")} />

                    <FormRow en="Muslim Name" jp="イスラム教徒の名前" {...register("muslimName")} />
                    <FormRow en="Address" jp="住所" {...register("address")} />

                    <FormRow en="Date of Birth" jp="生年月日" type="date" {...register("dob")} />
                    <FormRow en="Declared Date" jp="申告日" type="date" {...register("declaredDate")} />

                    <FormRow en="Mobile No" jp="携帯電話番号" {...register("mobile")} />
                    <FormRow en="Witness" jp="証人" {...register("witness1")} />

                    <FormRow en="Witness" jp="証人" {...register("witness2")} />
                    <FormRow en="Witness 3" jp="証人 3" {...register("witness3")} />

                    <ImageField en="Picture Area" jp="画像エリア" image={pictureArea} setImage={setPictureArea} />
                    <FormRow en="Previous Religion" jp="以前の宗教" {...register("previousReligion")} />

                    <ImageField en="Imam Sign" jp="イマームのサイン" image={imamSign} setImage={setImamSign} />
                    <FormRow en="Passport No." jp="パスポート番号" {...register("passport")} />

                    <ImageField en="Applicant Picture" jp="申請者の写真" image={applicantPhoto} setImage={setApplicantPhoto} />
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-wrap items-center gap-3 mt-10">
                    <button type="submit" disabled={loading} className="bg-[#52B920] text-white px-4 py-2.5 md:px-6 md:py-3.5 text-sm  md:text-base rounded-[10px] hover:bg-green-600 disabled:opacity-50 transition-colors">
                        {loading ? "Submitting..." : "Submit Form"}
                    </button>
                    
                    {onCancel && (
                        <button 
                            type="button" 
                            onClick={onCancel}
                            className="bg-gray-100 text-gray-700 px-4 py-2.5 md:px-6 md:py-3.5 text-sm md:text-base rounded-[10px] hover:bg-gray-200 transition-colors mr-auto"
                        >
                            Cancel
                        </button>
                    )}

                    <GradientBorderWrapper1>
                        <button type="button" className=" px-4 py-2.5 md:px-6 md:py-3.5 text-sm  md:text-base text-gray-700    shadow-sm rounded-[11px] cursor-pointer ">
                            View Certificate
                        </button>
                    </GradientBorderWrapper1>
                    <GradientBorderWrapper1
                      
                    >
                        <button type="button" className=" px-4 py-2.5 md:px-6 md:py-3.5 text-sm  md:text-base text-gray-700 rounded-md cursor-pointer">
                            Download Certificate
                        </button>
                    </GradientBorderWrapper1>

                </div>
            </form>
        </section>
    );
}

function FormRow({ en, jp, type = "text", ...props }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
            <label className="md:w-44">
                <p className="font-semibold text-gray-800 text-sm sm:text-base">
                    {en}
                </p>
                <p className="text-[11px] sm:text-xs text-gray-400">
                    {jp}
                </p>
            </label>

            <span className="hidden md:block text-gray-400">:</span>

            <input
                type={type}
                placeholder="Type Now"
                {...props}
                className="w-full md:flex-1 px-3 py-2.5 rounded-md border border-green-700 outline-none text-sm"
            />
        </div>
    );
}

function ImageField({ en, jp, image, setImage }) {
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImage({
            file,
            preview: URL.createObjectURL(file),
        });
    };

    const removeImage = () => {
        URL.revokeObjectURL(image.preview);
        setImage(null);
    };

    return (
        <div className="flex flex-col md:flex-row gap-2 md:gap-3">
            <label className="md:w-44">
                <p className="font-semibold text-gray-800 text-sm sm:text-base">
                    {en}
                </p>
                <p className="text-[11px] sm:text-xs text-gray-400">
                    {jp}
                </p>
            </label>

            <span className="hidden md:block pt-2 text-gray-400">:</span>

            <div className="flex-1">
                {!image ? (
                    <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-md p-4 text-xs sm:text-sm text-gray-500 hover:bg-green-50">
                        <span>Click to upload image</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                ) : (
                    <div className="relative w-full max-w-[80px]">
                        <img src={image.preview} alt="preview" className="rounded-md w-full object-cover" />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded"
                        >
                            ✕
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

