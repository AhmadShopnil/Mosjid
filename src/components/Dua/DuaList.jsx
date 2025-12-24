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
import { DuaCardInnerPage } from "./DuaCardInnerPage";



export default function DuaList({ duas, settings, homePage, loading, currentPage, setCurrentPage, totalPages }) {
    const [selectedDua, setSelectedDua] = useState(null)
    const view_more = getMetaValueByMetaName(settings, "view_more") || "";
    const read_more = getMetaValueByMetaName(settings, "read_more") || "";
    const download = getMetaValueByMetaName(settings, "download") || "";


    // get notice extra data from home page section management

    const sections = homePage?.sections_on_api;
    const dua_extraData = sections.find((s) => s.title_slug === "dua");
    // const heading_part_1 = splitBySpace(dua_extraData?.sub_title)[0]
    // const heading_part_2 = splitBySpace(dua_extraData?.sub_title)[1]
    const Inner_page_title = dua_extraData?.custom_information.find((item) => item.label === "Inner_page_title")

    // console.log("selectedDua", selectedDua)

    return (
        <div>
            <div
                className=" p-5 sm:p-8 border border-[#C9E9BA] rounded-[10px]  "
                style={{

                }}
            >
                {/* heading */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
                    <h4 className="text-2xl lg:text-3xl text-[#00401A] font-bold mb-4 gradient-border_b pb-3">{Inner_page_title?.value}
                    </h4>
                </div>

                {/* duas List */}
                {loading ?
                    <SkeletonNoticeItem />
                    :

                    <ul className="space-y-3">
                        {duas?.map((item, i) => (

                            <li
                                key={i}
                                className="flex justify-between items-center border  border-[#D9E2DD] p-1.5  rounded-[10px]
                            relative z-10 bg-white"
                            >
                                {/* Left Content */}
                                <div className="flex items-center gap-2 sm:gap-2">
                                    {/* icon */}
                                    <div
                                        className="bg-[#F2F2F2] border border-[#E6ECE8] w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-[10px] 
                                    p-1.5 md:p-2 flex justify-center items-center "
                                    >
                                        <Image
                                            src="/images/dua/icon.png"
                                            alt="icon"
                                            width={40}
                                            height={38}
                                            className='hidden sm:flex'
                                        />
                                        <Image
                                            src="/images/dua/icon.png"
                                            alt="icon"
                                            width={24}
                                            height={34}
                                            className='flex sm:hidden'
                                        />
                                    </div>
                                    <div>
                                        <p className="sm:hidden text-[#00401A] font-semibold text-[12px] ">{item?.sub_title.slice(0, 18)}</p>
                                        <p className="hidden sm:block text-[#00401A] font-semibold text-[15px]">{item?.sub_title.slice(0, 130)}</p>
                                        <button
                                            type="button"
                                            aria-label="read more"
                                            onClick={() => setSelectedDua(item)}
                                            className="text-[#001609] font-semibold sm:font-bold text-xs md:text-sm
                                             hover:text-[#F7BA2A] flex gap-1 items-center mt-1 "
                                        >
                                            {read_more}
                                            <span className='mt-0.5'><FaLongArrowAltRight /></span>
                                        </button>
                                    </div>
                                </div>


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
            <div className="mt-6">
                {selectedDua && <DuaCardInnerPage dua={selectedDua} />}

            </div>
        </div>
    );
}
