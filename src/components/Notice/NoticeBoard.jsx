"use client"

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { getDay_Month_Year } from "@/helper/formateDate";
import { getMetaValueByMetaName } from "@/helper/metaHelpers";
import { splitBySpace } from "@/helper/splitBySpace";
import Pagination from "../Shared/Pagination";
import { Download } from "lucide-react";
import { FaLongArrowAltRight } from "react-icons/fa";
import SkeletonNoticeItem from "../Shared/Skeleton/SkeletonNoticeItem";



export default function NoticeBoard({ notices, settings, homePage, loading,currentPage,setCurrentPage,totalPages }) {

    const view_more = getMetaValueByMetaName(settings, "view_more") || "";
    const read_more = getMetaValueByMetaName(settings, "read_more") || "";
    const download = getMetaValueByMetaName(settings, "download") || "";

    
    // get notice extra data from home page section management

    const sections = homePage?.sections_on_api;
    const notice_heading = sections.find((s) => s.title_slug === "notice-board");
    const heading_part_1 = splitBySpace(notice_heading?.sub_title)[0]
    const heading_part_2 = splitBySpace(notice_heading?.sub_title)[1]
    const notice_board_title_2 = notice_heading?.custom_information.find((item) => item.label === "notice_board_title_2")



    return (
        <div
            className=" p-5 sm:p-8 border border-[#C9E9BA] rounded-[10px] bg-[#c9e9ba28] "
            style={{


            }}
        >
            {/* heading */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
                <div className="flex items-center gap-2 gradient-border_b mb-4 sm:mb-0 pb-3 ">

                    <Image
                        src="/images/prayertimes/noticeicon2.png"
                        alt="Book Icon"
                        width={30}
                        height={35}
                    />

                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]">
                        <p>
                            {notice_heading?.sub_title}
                        </p>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-3 sm:gap-4">

                    <button className="border border-[#00401A] text-[#001609] hover:bg-[#00401A] hover:text-white transition-colors duration-400
               font-bold rounded-full px-5 py-2.5 text-sm sm:text-base cursor-pointer">
                        {view_more}
                    </button>
                </div>

            </div>



            {/* Notices List */}

            {loading ?
                <SkeletonNoticeItem />
                :

                <ul className="space-y-3">
                    {notices?.map((item, i) => (

                        <li
                            key={i}
                            className="flex justify-between items-center border  border-[#D9E2DD] p-1.5  rounded-full 
                            relative z-10 bg-white"
                        >
                            {/* Left Content */}
                            <div className="flex items-center gap-2 sm:gap-4">
                                {/* icon */}
                                <div
                                    className=" border border-[#E6ECE8] w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full 
                                    p-1.5 md:p-2 flex justify-center items-center "
                                >
                                    <Image
                                        src="/images/prayertimes/noticeicon2.png"
                                        alt="icon"
                                        width={30}
                                        height={38}
                                        className='hidden sm:flex'
                                    />
                                    <Image
                                        src="/images/prayertimes/noticeicon2.png"
                                        alt="icon"
                                        width={24}
                                        height={34}
                                        className='flex sm:hidden'
                                    />
                                </div>
                                <div>
                                    <p className="sm:hidden text-[#00401A] font-semibold text-[12px] ">{item?.sub_title.slice(0, 18)}</p>
                                    <p className="hidden sm:block text-[#00401A] font-semibold text-[15px]">{item?.sub_title.slice(0, 120)}</p>
                                    <Link
                                        href="/fatwah/1"
                                        className="text-[#00401A] font-semibold sm:font-bold text-xs md:text-sm hover:text-[#F7BA2A] 
                      flex gap-1 items-center "
                                    >
                                        {read_more}
                                        <span className='mt-0.5'><FaLongArrowAltRight /></span>
                                    </Link>
                                </div>
                            </div>

                            {/* Download Button */}
                            <button className="flex items-center gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-3 cursor-pointer gradient-border3 
                  rounded-[100px] text-[#00401A] font-bold text-xs sm:text-sm md:text-lg ">
                                {download}
                                <Download className="w-4 h-4" />
                            </button>
                        </li>


                    ))}
                </ul>
            }


            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
