"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { getMetaValueByMetaName } from "@/helper/metaHelpers";
import Link from "next/link";
import { getImageUrl } from "@/helper/getImageUrl";
import { FaLongArrowAltRight } from "react-icons/fa";
import Pagination from "../Shared/Pagination";

export default function FatwaListInner({
  fatwahs,
  settings,
  homePage,
  title,
  currentPage,
  setCurrentPage,
  totalPages,
  titleWidth = "w-[420px]",
}) {
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(5);
  const view_more = getMetaValueByMetaName(settings, "view_more") || "";
  const read_more = getMetaValueByMetaName(settings, "read_more") || "";
  const download = getMetaValueByMetaName(settings, "download") || "";

  const sections = homePage?.sections_on_api;
  const fatwah_ExtraData = sections.find((s) => s.title_slug === "fatwah");
  const image = getImageUrl(fatwah_ExtraData?.image_media);
  const penIcon = getImageUrl(fatwah_ExtraData?.background_media);
  const fatwah_title_2 = fatwah_ExtraData?.custom_information.find(
    (item) => item.label === "fatwah_title_2",
  );

  // console.log("from fatwa list ",fatwahs)

  return (
    <div className="borderFatwaInner  rounded-[10px] shadow-md">
      {/* Content Area */}
      <div
        //  className=" w-full bg-[#e9f3e536] rounded-[10px] p-4 md:p-12"
        className=" w-full bg-[#F9FFF6] rounded-[10px] p-3 sm:p-8"
      >
        <div className="flex justify-between">
          <div className="flex items-center  gap-2 gradient-border_b  sm:mb-0 pb-2    ">
            <Image
              src={penIcon}
              alt="Book Icon"
              width={45}
              height={45}
              className="mb-2"
            />
            <div className="text-sm sm:text-2xl md:text-3xl font-bold text-[#00401A]">
              <p>{title}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/fatwah/fatwah-filtered"
              className="border border-[#00401A] text-[#001609] hover:bg-[#00401A] hover:text-white transition-colors duration-400
               font-bold rounded-full px-5 py-2.5 text-xs sm:text-base cursor-pointer"
            >
              {view_more}
            </Link>
          </div>
        </div>
        {/* List */}

        {fatwahs?.length == 0 ? (
          <>
            <h4 className="text-center text-gray-500 text-sm md:text-lg font-semibold py-8">
              ❌ Not Data Found
            </h4>
          </>
        ) : (
          <ul className="space-y-4 mt-6">
            {fatwahs?.map((item) => (
              <li
                key={item?.id}
                className="flex justify-between items-center border border-[#D9E2DD] p-1.5  rounded-full relative z-10 
                bg-[#FFFFFF]"
              >
                {/* Left Content */}
                <div className="flex items-center gap-1.5 sm:gap-4">
                  {/* icon */}
                  <div className=" border border-[#E6ECE8] rounded-full p-1.5 md:p-2 w-[45px] h-[45px]  sm:w-[60px] sm:h-[60px] flex justify-center items-center ">
                    <Image
                      src={penIcon}
                      alt="icon"
                      width={45}
                      height={45}
                      className="hidden sm:flex"
                    />
                    <Image
                      src={penIcon}
                      alt="icon"
                      width={30}
                      height={30}
                      className="flex sm:hidden"
                    />
                  </div>
                  <div>
                    <p
                     className={`text-[#00401A] truncate   
                     text-[13px] md:text-lg font-bold w-[140px]  sm:w-[300px] md:w-full `}
                    //   className={`text-[#00401A] truncate w-[110px] sm:w-[250px]  
                    //  text-sm md:text-lg font-bold md:${titleWidth}`}
                    >
                      {item?.word_ja}
                      {/* {item?.description_ja} */}
                      {/* {item?.description_en} */}
                    </p>
                  
                    <Link
                      href={`/fatwah/${item?.id}`}
                      className="text-[#00401A] font-bold text-xs md:text-sm hover:text-[#F7BA2A] 
                      flex gap-1 items-center "
                    >
                      {read_more}
                      <span className="mt-0.5">
                        <FaLongArrowAltRight />
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  className="flex items-center gap-2 px-3 md:px-5 py-3 cursor-pointer gradient-border3 
                  rounded-[100px] text-[#00401A] font-bold text-xs sm:text-sm md:text-lg "
                >
                  {download}
                  <Download className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
