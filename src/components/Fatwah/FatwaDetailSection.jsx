"use client";
import React, { useState } from "react";
import { FaRegThumbsUp, FaRegEye } from "react-icons/fa";
import { Download } from "lucide-react";
import { formatDateToDDMMYYYY } from "@/helper/formatDateToDDMMYYYY";
import SocialShare from "../Shared/SocialShare";

export default function FatwaDetailSection({ singleFatwah }) {

  // Font size state (default 16px)
  const [fontSize, setFontSize] = useState(16);
  const [fontSizeOfTitle, setFontSizeOfTitle]=useState(24)
  

  const increaseFont = () => {
    setFontSize(prev => prev + 2);
    setFontSizeOfTitle(prev => prev + 1)
    
  };

  const decreaseFont = () => {
     setFontSize(prev => prev - 2);
    setFontSizeOfTitle(prev => prev - 1)
  };

  return (
    <section>

      {/* ----- Header ----- */}
      <div className="flex justify-between items-center gap-2 bg-[#D9E2DD] rounded-[10px] pl-3 pr-2 py-2 md:h-[80px] md:pl-6">

        <div className="flex items-center gap-3 w-full md:w-auto text-sm md:text-base">
          <p className="flex items-center font-medium text-[#000] border-r border-[#B0C4B8] pr-3">
            Fatwa No: {singleFatwah?.fatwa_number}
          </p>

          <p className="flex items-center font-medium text-[#000] border-r border-[#B0C4B8] pr-3">
            Date: {formatDateToDDMMYYYY(singleFatwah?.created_at)}
          </p>
        </div>

        {/* ----- Font Size Control ----- */}
        <div className="flex items-center gap-1 bg-[#E6ECE8] px-2 py-1 rounded-md text-[#000] font-medium text-xl md:text-4xl h-[45px] md:h-[65px]">

          <button
            onClick={increaseFont}
            className="px-2 hover:text-green-700 transition cursor-pointer"
          >
            +
          </button>

          <span className="px-2 md:px-3 ">
            Aa
          </span>

          <button
            onClick={decreaseFont}
            className="px-2 hover:text-green-700 transition cursor-pointer"
          >
            -
          </button>

        </div>
      </div>

      {/* ----- Content ----- */}
      <div className="bg-white border border-[#DDEEDC] rounded-[20px] p-4 md:p-6 shadow-sm mt-7">

        {/* Title */}
        <h2 className="text-[#00401A]   mt-4 mb-6"
        
        style={{ fontSize: `${fontSizeOfTitle}px` }}
        >
          {singleFatwah?.word_ja}
        </h2>

        {/* Description (Dynamic Font Size) */}
        <div
          className="leading-relaxed text-[#595959]"
          style={{ fontSize: `${fontSize}px` }}
          dangerouslySetInnerHTML={{ __html: singleFatwah?.description_ja }}
        />

        {/* Footer */}
        <div className="flex justify-between items-center flex-wrap mt-4 gap-4 border-t border-gray-300 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-green-600 text-lg">
            <SocialShare />

            <div className="flex gap-4">
              <div className="flex items-center gap-1 text-[#00401A] text-xl">
                <FaRegThumbsUp className="text-green-600" /> 10
              </div>
              <div className="flex items-center gap-1 text-[#00401A] text-xl">
                <FaRegEye className="text-green-600" /> 10
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 md:px-5 py-3 cursor-pointer gradient-border3 rounded-[100px] text-[#00401A] font-bold text-xs sm:text-sm md:text-lg">
            Download Now
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
