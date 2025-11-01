"use client";


import Image from "next/image";
import Pagination from "../Shared/Pagination";
import { useEffect, useState } from "react";
import { getDay_Month_Year } from "@/helper/formateDate";
import axiosInstance from "@/helper/axiosInstance";

export default function ArchiveNotice() {
    const [notices, setNotices] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5);

    const perPage = 6

    useEffect(() => {
        const fetchNotices = async () => {
            setLoading(true)
            let url = `/posts?term_type=notices&category_id=20&page=${currentPage}&per_page=${perPage}`


            try {
                const response = await axiosInstance.get(url)
                const data = response?.data?.data || []
                const meta = response?.data?.meta || {}

                setNotices(data)


                setTotalPages(meta.last_page || 1)
            } catch (err) {
                console.error("Error fetching notices:", err)
                setError(err.message || "Failed to fetch notices")
            } finally {
                setLoading(false)
            }
        }

        fetchNotices()

    }, [currentPage])



    return (
        <div className="">
            <div className="bg-[#c9e9ba28] border border-[#C9E9BA] rounded-md p-4">
                <h2 className="text-3xl font-semibold text-[#00401A] mb-6 ">
                    <span className="gradient-border_b pb-1">Archive Notice</span>

                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                    {notices.map((notice, index) => (
                        <div
                            key={index}
                            className="border border-[#D9E2DD] rounded-[10px] bg-white p-4 "
                        >
                            {/* Top section with date + title + desc */}
                            <div className="flex gap-3">
                                <div>
                                    {/* Date box */}
                                    <div className=" rounded-md w-[70px] h-[70px] flex flex-col items-center justify-center py-1 bg-[#F2F2F2] text-[#00401A]">
                                        <span className="text-3xl font-bold leading-tight ">
                                            {getDay_Month_Year(notice?.created_at, "day")}
                                        </span>
                                        <span className="text-sm text-gray-600 leading-none">
                                            {getDay_Month_Year(notice?.created_at, "month")}
                                        </span>
                                        <span className="text-sm font-medium text-gray-500 leading-none">
                                            {getDay_Month_Year(notice?.created_at, "year")}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-[#333333] mb-1">
                                        {notice?.name}
                                    </h3>



                                    <div
                                        className="text-base  text-[#333333] leading-relaxed "
                                        dangerouslySetInnerHTML={{ __html: notice?.description }}
                                    />
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t mt-3 pt-3 flex items-center gap-3 text-[#D9E2DD]">
                                <div className="border-r-2 border-gray-300 pr-3">
                                    <Image
                                        src="/images/notice/twiter.png"
                                        alt='a1'
                                        width={23}
                                        height={23}
                                    />
                                </div>
                                <div className="border-r-2 border-gray-300 pr-3">
                                    <Image
                                        src="/images/notice/fb.png"
                                        alt='a1'
                                        width={15}
                                        height={15}
                                    />
                                </div>
                                <div className="border-r-2 border-gray-300 pr-3">
                                    <Image
                                        src="/images/notice/whatsapp.png"
                                        alt='a1'
                                        width={20}
                                        height={20}
                                    />
                                </div>
                                <div className="border-r-2 border-gray-300 pr-3">
                                    <Image
                                        src="/images/notice/printer.png"
                                        alt='a1'
                                        width={22}
                                        height={22}
                                    />
                                </div>
                                <div>
                                    <Image
                                        src="/images/notice/download.png"
                                        alt='a1'
                                        width={22}
                                        height={22}
                                    />
                                </div>


                            </div>
                        </div>
                    ))}
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>




        </div>
    );
}
