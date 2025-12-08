"use client";
import React from "react";
import { FaWhatsapp, FaFacebookMessenger, FaRegThumbsUp, FaDownload, FaRegEye } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { Download } from "lucide-react";
import { formatDateToDDMMYYYY } from "@/helper/formatDateToDDMMYYYY";
import SocialShare from "../Shared/SocialShare";

export default function FatwaDetailSection({ singleFatwah }) {
  return (
    <section className=" ">
      {/* Header Section */}

      <div
        className="
    flex justify-between items-center  gap-2 
    bg-[#D9E2DD] rounded-[10px] 
    pl-3 pr-2 
    h-auto py-2
    md:h-[80px] md:py-0 md:pl-6
  "
      >

        {/* Left Section */}
        <div
          className="
      flex items-center gap-3 
      w-full md:w-auto
      
      text-sm md:text-base
      h-auto md:h-[80px]
    "
        >
          <p className="flex items-center font-medium text-[#000] border-r border-[#B0C4B8] pr-3">
            Fatwa No: {singleFatwah?.fatwa_number}
          </p>

          <p className="flex items-center font-medium text-[#000] border-r border-[#B0C4B8] pr-3">
            Date: {formatDateToDDMMYYYY(singleFatwah?.created_at)}
          </p>
        </div>

        {/* Font Size Controls */}
        <div
          className="
      flex items-center gap-1 
      bg-[#E6ECE8] px-2 py-1 rounded-md 
      text-[#000] font-medium
      text-xl md:text-4xl
      h-[45px] md:h-[65px]
    "
        >
          <button className="px-2 hover:text-green-700 transition cursor-pointer">+</button>
          <span className="px-2 md:px-3">Aa</span>
          <button className="px-2 hover:text-green-700 transition cursor-pointer">-</button>
        </div>

      </div>



      {/* main content */}
      <div className="bg-white border border-[#DDEEDC] rounded-[20px] p-4 md:p-6 shadow-sm mt-7">

        {/* Title */}
        <h2 className="text-[#00401A] text-lg md:text-2xl  mt-4 mb-6 ">
          {singleFatwah?.word_ja}
        </h2>

        {/* Fatwa Body */}
        <div className=" text-sm md:text-base leading-relaxed text-[#595959]">
          {/* <p>
            {singleFatwah?.description_ja}
           
          </p> */}

          <div
            className="text-sm md:text-base leading-relaxed text-[#595959]"
            dangerouslySetInnerHTML={{ __html:singleFatwah?.description_ja }}
          />
        </div>

        {/* Footer Section */}
        <div className="flex justify-between items-center flex-wrap mt-4  gap-4 ">
          {/* Social & Reactions */}

          <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-4 text-green-600 text-lg">
            <SocialShare />
            <div className="flex gap-4 sm:items-center justify-start  ">
              <div className="sm:ml-4 flex items-center gap-1 text-[#00401A] text-xl ">
                <FaRegThumbsUp className="text-green-600" /> 10
              </div>
              <div className="flex items-center gap-1 text-[#00401A] text-xl">
                <FaRegEye className="text-green-600" /> 10
              </div>
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
