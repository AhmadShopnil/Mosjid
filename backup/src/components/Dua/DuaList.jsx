"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { getMetaValueByMetaName } from "@/helper/metaHelpers";
import Pagination from "../Shared/Pagination";
import SkeletonNoticeItem from "../Shared/Skeleton/SkeletonNoticeItem";
import { DuaCardInnerPage } from "./DuaCardInnerPage";
import { FaLongArrowAltRight } from "react-icons/fa";
import SocialShare from "../Shared/SocialShare";
import { X } from "lucide-react";

export default function DuaList({
    duas,
    settings,
    homePage,
    loading,
    currentPage,
    setCurrentPage,
    totalPages,
}) {
    const [selectedDua, setSelectedDua] = useState(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const duaIdFromUrl = searchParams.get("duaId");

    const read_more = getMetaValueByMetaName(settings, "read_more") || "";

    //  auto open dua if shared link has ?duaId=
    useEffect(() => {
        if (duaIdFromUrl && duas?.length) {
            const foundDua = duas.find(
                (d) => String(d.id) === String(duaIdFromUrl)
            );

            if (foundDua) {
                setSelectedDua(foundDua);
            }
        }
    }, [duaIdFromUrl, duas]);

    //  handle read more click
    const handleReadMore = (dua) => {
        setSelectedDua(dua);
        router.push(`?duaId=${dua.id}`, { scroll: false });
    };

    //  clear selected dua  close feature)
    const clearSelectedDua = () => {
        setSelectedDua(null);
        router.push("?", { scroll: false });
    };

    // get dua extra data from home page section management
    const sections = homePage?.sections_on_api;
    const dua_extraData = sections?.find((s) => s.title_slug === "dua");
    const Inner_page_title = dua_extraData?.custom_information.find(
        (item) => item.label === "Inner_page_title"
    );

    return (
        <div>

            <div className="p-5 sm:p-8 border border-[#C9E9BA] rounded-[10px]">
                {/* Heading */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
                    <h4 className="text-2xl lg:text-3xl text-[#00401A] font-bold pb-3">
                        {Inner_page_title?.value}
                    </h4>
                </div>

                {/* Dua List */}
                {loading ? (
                    <SkeletonNoticeItem />
                ) : (
                    <ul className="space-y-3">
                        {duas?.map((item, i) => (
                            <li
                                key={i}
                                className="flex justify-between items-center border border-[#D9E2DD] p-1.5 rounded-[10px] bg-white"
                            >
                                {/* Left Content */}
                                <div className="flex items-center gap-2">
                                    {/* Icon */}
                                    <div className="bg-[#F2F2F2] border border-[#E6ECE8] w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-[10px] p-2 flex justify-center items-center">
                                        <Image
                                            src="/images/dua/icon.png"
                                            alt="icon"
                                            width={36}
                                            height={36}
                                        />
                                    </div>

                                    {/* Text */}
                                    <div>
                                        <p className="text-[#00401A] font-semibold text-sm md:text-base">
                                            {item?.sub_title.slice(0, 120)}
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() => handleReadMore(item)}
                                            className="text-[#001609] font-semibold text-xs md:text-sm hover:text-[#F7BA2A] flex gap-1 items-center mt-1"
                                        >
                                            {read_more}
                                            <span className="mt-0.5">
                                                <FaLongArrowAltRight />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>


            <div className="mt-6">
                {selectedDua && (
                    <div className="">
                        {/* Close Button */}
                        <div className="flex justify-end py-2">
                            <button
                                onClick={clearSelectedDua}
                                aria-label="Close"
                                className=" top-4 right-4 w-8 h-8 flex items-center justify-center
                   rounded-full bg-[#00401A] hover:bg-[#F7BA2A]  transition cursor-pointer"
                            >
                                <X size={18} className="text-white" />
                            </button>
                        </div>
                        <DuaCardInnerPage
                            dua={selectedDua}
                            onClose={clearSelectedDua}
                        />
                        <div className=" mt-6  flex items-center justify-end gap-4 text-[#D9E2DD]">
                            <SocialShare />
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}
