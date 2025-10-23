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



export default function NoticeBoard({ notices, settings, homePage }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5);


    const view_more = getMetaValueByMetaName(settings, "view_more") || "";
    const read_more = getMetaValueByMetaName(settings, "read_more") || "";

    // get notice extra data from home page section management

    const sections = homePage?.sections_on_api;
    const notice_heading = sections.find((s) => s.title_slug === "notice-board");
    const heading_part_1 = splitBySpace(notice_heading?.sub_title)[0]
    const heading_part_2 = splitBySpace(notice_heading?.sub_title)[1]

    const notice_board_title_2 = notice_heading?.custom_information.find((item) => item.label === "notice_board_title_2")


    // console.log("string",string)

    return (
        <div
            className=" p-5 sm:p-8 border border-[#C9E9BA] rounded-[10px] bg-[#c9e9ba28] "
            style={{
                //   backgroundImage: "url('/images/home/noticeBg.png')",
                // backgroundImage: "url('/images/home/noticeBg.png')",

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

                <div className="flex items-center gap-3 sm:gap-4">

                    <button className="border border-[#00401A] text-[#001609] hover:bg-[#00401A] hover:text-white transition-colors duration-400
               font-bold rounded-full px-5 py-2.5 text-sm sm:text-base cursor-pointer">
                        {view_more}
                    </button>
                </div>

            </div>



            {/* Notices List */}
            <ul className="space-y-3">
                {notices?.slice(0, 6).map((notice, i) => (


                    <li
                        key={i}
                        className="flex space-x-3 justify-between bg-white/90 backdrop-blur-sm border border-gray-300  rounded-md shadow-sm"
                    >

                        <div className="flex gap-3 p-2">
                            {/* Date Section */}
                            <div className="w-[80px]  md:w-[90px]  text-center bg-gray-100 rounded-md p-2.5 leading-5">
                                <p className="text-3xl font-bold text-[#00401A] leading-6">

                                    {getDay_Month_Year(notice?.created_at, "day")}
                                </p>
                                <p className="text-sm text-[#00401A] leading-5"> {getDay_Month_Year(notice?.created_at, "month")}</p>
                                <p className="text-sm text-[#00401A]"> {getDay_Month_Year(notice?.created_at, "year")}</p>
                            </div>

                            {/* Notice Text */}
                            <div className="flex flex-col justify-start gap-1  ">
                                <p className="sm:hidden text-[#00401A] text-sm">{notice?.sub_title.slice(0, 40)}</p>
                                <p className="hidden sm:block text-[#00401A] text-sm">{notice?.sub_title.slice(0, 120)}</p>
                                <Link
                                    href={`/notice`}
                                    className="text-sm font-bold text-[#001609] flex gap-2 items-center hover:text-[#F7BA2A]"
                                >
                                    <span> {read_more}</span>
                                    <FaLongArrowAltRight />
                                    {/* <Image
                                    src="/images/others/arrowR.png"
                                    alt='a1'
                                    width={19}
                                    height={19}
                                /> */}
                                </Link>
                                {/* <button className="flex items-center gap-2 mt-3 cursor-pointer 
                  rounded-[10px] text-[#0E7560] font-bold text-xs sm:text-sm  hover:text-[#F7BA2A] ">
                                    Download
                                    <Download className="w-4 h-4" />
                                </button> */}
                            </div>
                        </div>
                        <div className="">
                            <button className="flex items-center gap-2 px-4 md:px-5 py-3 cursor-pointer 
                  rounded-[10px] text-[#00401A] font-bold text-xs sm:text-sm md:text-base hover:text-[#F7BA2A] ">
                            Download
                            <Download className="w-5 h-5" />
                        </button>
                        </div>
                    </li>
                ))}
            </ul>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
