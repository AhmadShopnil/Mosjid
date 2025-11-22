"use client";
import React from "react";
import { FaWhatsapp, FaFacebookMessenger, FaRegThumbsUp, FaDownload } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { Download } from "lucide-react";
import { formatDateToDDMMYYYY } from "@/helper/formatDateToDDMMYYYY";

export default function FatwaDetailSection({singleFatwah}) {
  return (
    <section className=" ">
      {/* Header Section */}
      <div className="flex justify-between items-center flex-wrap gap-2 bg-[#D9E2DD] h-[80px]  rounded-[10px] pl-4 md:pl-6
      pr-2 
      ">
        <div className="flex items-center gap-4  h-[80px] ">
          <p className="h-full flex items-center text-base text-[#000000] font-medium border-r border-[#B0C4B8] pr-4">
            <span className="">Fatwa No : {singleFatwah?.fatwa_number}</span>
          </p>

          <p className="h-full flex items-center text-base text-[#000000] font-medium border-r border-[#B0C4B8] pr-4">
            <span className="">Date : {formatDateToDDMMYYYY(singleFatwah?.created_at)}</span>
          </p>

        </div>

        {/* Font Size Controls */}
        <div className="flex items-center gap-2 bg-[#E6ECE8] px-3 py-1 rounded-md text-[#000000] font-medium text-4xl
        h-[65px]
        ">
          <button className="px-2 hover:text-green-700 transition cursor-pointer">+</button>
          <span className="px-3">Aa</span>
          <button className="px-2 hover:text-green-700 transition cursor-pointer">-</button>
        </div>
      </div>


      {/* main content */}
      <div className="bg-white border border-[#DDEEDC] rounded-[20px] p-4 md:p-6 shadow-sm mt-7">

        {/* Title */}
        <h2 className="text-[#00401A] text-lg md:text-2xl  mt-4 mb-6 ">
         {singleFatwah?.word_en}
        </h2>

        {/* Fatwa Body */}
        <div className=" text-sm md:text-base leading-relaxed text-[#595959]">
       <p>
         {singleFatwah?.description_en}
       </p>
        </div>

        {/* Footer Section */}
        <div className="flex justify-between items-center flex-wrap mt-4">
          {/* Social & Reactions */}
          <div className="flex items-center gap-4 text-green-600 text-lg">
            <FaWhatsapp className="cursor-pointer hover:text-green-800 transition" />
            <FaFacebookMessenger className="cursor-pointer hover:text-green-800 transition" />
            <BsChatDots className="cursor-pointer hover:text-green-800 transition" />
            <div className="flex items-center gap-1 text-[#00401A] text-sm">
              <FaRegThumbsUp className="text-green-600" /> 10
            </div>
            <div className="flex items-center gap-1 text-[#00401A] text-sm">
              <FaRegThumbsUp className="text-green-600" /> 10
            </div>
          </div>

          {/* Download Button */}
          <button className="flex items-center gap-2 px-4 md:px-5 py-3 cursor-pointer gradient-border3 
                  rounded-[100px] text-[#00401A] font-bold text-xs sm:text-sm md:text-lg ">
            Download Now
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
