"use client";

import { getMetaValueFromExtraFields } from "@/helper/metaHelpers";
import Image from "next/image";
import React from "react";

export default function DirectoryDetailsSection({ directory }) {
    const directory_sl_no = getMetaValueFromExtraFields(directory, "directory_sl_no");
    const directory_name = getMetaValueFromExtraFields(directory, "directory_name");
    const directory_phone = getMetaValueFromExtraFields(directory, "directory_phone");
    const diretory_juma_time = getMetaValueFromExtraFields(directory, "diretory_juma_time");
    const directory_address = getMetaValueFromExtraFields(directory, "directory_address");
    const directory_email = getMetaValueFromExtraFields(directory, "directory_email");
    const directory_website = getMetaValueFromExtraFields(directory, "directory_website");
    const directory_established = getMetaValueFromExtraFields(directory, "directory_established");
    const directory_status = getMetaValueFromExtraFields(directory, "directory_status");
    const directory_facilities = getMetaValueFromExtraFields(directory, "directory_facilities");
    const directory_others = getMetaValueFromExtraFields(directory, "directory_others");

    // Helper function for cleaner UI blocks
    const InfoRow = ({ label, value }) => (
        <div className="flex flex-col sm:flex-row items-start sm:items-center border border-[#E0E0E0] rounded-[10px] min-h-[50px]
     overflow-hidden">
            <div className="w-full sm:w-[35%] min-h-[50px] px-3 py-2 bg-[#e0e0e06d] flex items-center justify-between text-base text-[#000000]">
                <span>{label}</span>
                <span className="hidden sm:inline">:</span>
            </div>
            <div className="flex-1 w-full px-3 py-2 text-[#333] break-words">{value || "-"}</div>
        </div>
    );

    return (
        <div>
            {/* Details Section */}
            <div className="gradient-border rounded-2xl p-4 sm:p-8 bg-white">

                <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                    <Image
                        src="/images/directory/bg2.png"
                        alt="img"
                        width={340}
                        height={425}
                        className="object-contain transition-all duration-300"
                    />
                </div>



                {/* Header */}
                <div className="bg-[#E5F5DE] h-[50px] flex items-center justify-center rounded-[8px] mb-6">
                    <h2 className="text-center text-lg sm:text-xl font-semibold text-[#00401A]">
                        {directory?.name || "Directory Details"}
                    </h2>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Left column */}
                    <div className="space-y-4">
                        <InfoRow label="Name" value={directory_name} />
                        <InfoRow label="Address" value={directory_address} />
                        <InfoRow label="Phone/Fax" value={directory_phone} />
                        <InfoRow label="Email" value={directory_email} />
                        <InfoRow label="Website" value={directory_website} />
                    </div>

                    {/* Right column */}
                    <div className="space-y-4">
                        <InfoRow label="Established in" value={directory_established} />
                        <InfoRow label="Juma prayer" value={diretory_juma_time} />
                        <InfoRow label="Status" value={directory_status} />
                        <InfoRow label="Facilities" value={directory_facilities} />
                        <InfoRow label="Others" value={directory_others} />
                    </div>
                </div>

                {/* Website URL */}
                {directory_website && (
                    <div className="text-center mt-8 text-[#000000] text-lg sm:text-2xl break-all">
                        {directory_website}
                    </div>
                )}
            </div>

            {/* Social Icons */}
            <div className="py-4 flex justify-end items-center">
                <div className="flex items-center gap-4 text-[#D9E2DD]">
                    {[
                        { src: "/images/notice/twiter.png", w: 23, h: 23 },
                        { src: "/images/notice/fb.png", w: 15, h: 15 },
                        { src: "/images/notice/whatsapp.png", w: 20, h: 20 },
                        { src: "/images/notice/printer.png", w: 22, h: 22 },
                        { src: "/images/notice/download.png", w: 22, h: 22 },
                    ].map((icon, i) => (
                        <div
                            key={i}
                            className={`${i < 4 ? "border-r-2 border-gray-300 pr-3" : ""
                                } flex items-center`}
                        >
                            <Image src={icon.src} alt="icon" width={icon.w} height={icon.h} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
