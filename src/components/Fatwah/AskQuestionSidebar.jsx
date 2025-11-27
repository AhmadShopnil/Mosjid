"use client"

import axiosInstance from '@/helper/axiosInstance';
import { getMetaValueByMetaName } from '@/helper/metaHelpers';
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function AskQuestionSidebar() {
    const [settings, setSettings] = useState();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true)
            let url = `/frontend/settings`

            try {
                const response = await axiosInstance.get(url)
                const data = response?.data?.data || []
                setSettings(data)
            } catch (err) {
                console.error("Error fetching settings:", err)
                setError(err.message || "Failed to fetch settings")
            } finally {
                setLoading(false)
            }
        }

        fetchSettings()
    }, [])

    let ask_a_question_feature = "";
    if (settings) {
        ask_a_question_feature = getMetaValueByMetaName(settings, "ask_a_question_feature") || "";
    }

    const isDisabled =
        ask_a_question_feature?.toLowerCase?.().trim() === "no";

    return (
        <div
            className={`
                bg-white rounded-[20px] border border-[#C9E9BA] overflow-hidden shadow-sm p-4 
                ${isDisabled ? "opacity-50 pointer-events-none select-none " : ""}
            `}
        >
            {/* Header */}
            <div className='flex justify-between'>
                <div className='gradient-border_b pb-2'>
                    <h4 className='text-[#00401A] text-2xl font-bold'>Ask A Question</h4>
                    <h4 className='text-[#00401A] text-2xl font-bold'>質問する</h4>
                </div>

                <Image
                    src="/images/fatwah/qq.svg"
                    alt="Logo"
                    width={60}
                    height={60}
                    className='hidden sm:flex w-[60px] h-[60px]'
                />
            </div>

            <div className='min-h-[150px] mt-5 flex flex-col justify-between'>
                <p className='text-sm text-[#00401A]'>
                    If you don’t have the question you want, click below to ask your question
                </p>

                <div className="relative group w-full mt-2">
                    
                    {isDisabled ? (
                        <div
                            className="
                                gradient-bg-fatwah-finder text-sm font-bold text-white
                                h-[36px] px-6 py-2 rounded-[10px]
                                shadow-md flex items-center justify-center gap-2
                                cursor-not-allowed opacity-80
                            "
                        >
                            <span>Ask a Question</span>
                            <span className="text-xl">›</span>
                        </div>
                    ) : (
                        <Link
                            href="/fatwah/ask-question"
                            className="
                                gradient-bg-fatwah-finder text-sm font-bold text-white
                                h-[36px] px-6 py-2 rounded-[10px]
                                shadow-md transition-all duration-300 hover:opacity-90
                                flex items-center justify-center gap-2
                            "
                        >
                            <span>Ask a Question</span>
                            <span className="text-xl">›</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}
