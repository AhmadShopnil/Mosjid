"use client";

import { getMetaValueFromExtraFields } from "@/helper/metaHelpers";
import { X } from "lucide-react";




export default function DonationModal({
    isOpen,
    onClose,
    donation,
}) {


    if (!isOpen || !donation) return null;






    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-2xl shadow-lg max-w-3xl w-full p-6 md:p-8 overflow-y-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
                >
                    <X className="w-6 h-6" />
                </button>


                <div className=" bg-white overflow-hidden p-2">
                    <p className="text-[#F7BA2A] mb-1 text-xs sm:text-sm  md:text-base font-bold mt-2 ">{donation?.sub_title}</p>

                    <div
                        className="text-[#333333] leading-8 text-base"
                        dangerouslySetInnerHTML={{ __html: donation?.description }}
                    />


                </div>
            </div>
        </div>
    );
}
