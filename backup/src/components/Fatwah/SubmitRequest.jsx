"use client"

import axiosInstance from '@/helper/axiosInstance';
import { getMetaValueByMetaName } from '@/helper/metaHelpers';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function SubmitRequest({ dataForContact }) {
    const [settings, setSettings] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true);
            let url = `/frontend/settings`;

            try {
                const response = await axiosInstance.get(url);
                const data = response?.data?.data || [];
                setSettings(data);
            } catch (err) {
                console.error("Error fetching settings:", err);
                setError(err.message || "Failed to fetch settings");
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    let submit_a_question_feature = "";
    if (settings) {
        submit_a_question_feature =
            getMetaValueByMetaName(settings, "submit_a_question_feature") || "";
    }

    const isDisabled = submit_a_question_feature?.toLowerCase?.().trim() === "no";

    return (
        <div
            className={`
                bg-white rounded-[20px] border border-[#C9E9BA] 
                overflow-hidden shadow-sm p-4
                ${isDisabled ? "opacity-50 pointer-events-none select-none " : ""}
            `}
        >
            {/* Header */}
            <div className='gradient-border_b pb-2'>
                <h4 className='text-[#00401A] text-2xl font-bold'>Submit Your Request</h4>
                <h4 className='text-[#00401A] text-2xl font-bold'>リクエストを送信</h4>
            </div>

            <div className='min-h-[150px] mt-5 flex flex-col justify-between'>
                <p className='text-sm text-[#00401A]'>
                    If you have any Questions related
                    <span className='text-[#B98C20] font-semibold'> {dataForContact}</span>,
                    Please Submit Your Request
                </p>

                <div className="relative group w-full mt-2">
                    {isDisabled ? (
                        // DISABLED BUTTON — Same as Ask Sidebar
                        <div
                            className="
                                gradient-bg-fatwah-finder text-sm font-bold text-white
                                h-[36px] px-6 py-2 rounded-[10px]
                                shadow-md flex items-center justify-center gap-2
                                cursor-not-allowed opacity-80
                            "
                        >
                            <span>Submit A Request</span>
                            <span className="text-xl">›</span>
                        </div>
                    ) : (
                        // ACTIVE BUTTON — Same as Ask Sidebar
                        <Link
                            href={{
                                pathname: "/contact",
                                query: { name: dataForContact },
                            }}
                            className="
                                gradient-bg-fatwah-finder text-sm font-bold text-white
                                h-[36px] px-6 py-2 rounded-[10px]
                                shadow-md transition-all duration-300 hover:opacity-90
                                flex items-center justify-center gap-2
                            "
                        >
                            <span>Submit A Request</span>
                            <span className="text-xl">›</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
