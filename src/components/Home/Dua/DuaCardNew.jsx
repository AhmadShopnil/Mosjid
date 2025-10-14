"use client";
import React from "react";

const DuaCardNew = ({ dua }) => {

const details=" رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِيْنَرَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِيْنَرَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِيْنَ رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِيْنَرَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِيْنَرَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِيْنَ رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِيْنَرَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِيْنَرَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِيْنَ رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِيْنَرَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِيْنَرَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِيْنَ رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِيْنَرَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِيْنَرَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِيْنَ رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِيْنَرَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِيْنَرَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِيْنَ"


  return (
    <div className="max-w-[520px] mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-b from-[#EEF8E9] to-[#BAFF98] px-4 py-4 border-b-3 border-[#a35024ab]">
        <span className="text-[#00401A] font-bold text-xl sm:text-2xl">
          {dua?.name || "مسجد أوساكا"}
        </span>

        <span className="bg-[#00401A] text-white text-sm sm:text-lg font-bold px-4 py-1 rounded-full">
          Dua No: {dua?.id || "01"}
        </span>

        <span className="text-[#00401A] font-bold text-xl sm:text-2xl">
          {dua?.sub_title || "大阪モスク"}
        </span>
      </div>

      {/* Inner Section */}
      <div className="px-4 py-6 space-y-5 text-center">
        {/* Dua Title */}
        <div className="space-y-2">
          <p className="text-[#333333] font-semibold text-2xl mb-4">
           اسم الدعاء : سيكون النص الوهمي هنا سيكون النص الوهمي هنا 
          </p>
          <p className="text-[#333333] font-semibold text-2xl border-t-1  border-[#F6C249] pt-5">
            ドゥア名：ダミーテキストはここにあります
          </p>
        </div>

        {/* Arabic Text */}
        <p className="text-[#333333] leading-8 text-base ">
     { details?.slice(0,580)}
        </p>

        {/* Japanese Pronunciation Section */}
        <div className="space-y-10">
          <div className="flex ">
            <span className="w-30 text-[#333333] text-base">発音 ：</span>
            <p className="text-[#333333] text-left">
              主よ、私たちを不正を働く人々と一緒にしないでください。主よ、
              私たちを不正を働く人々と一緒にしないで...
            </p>
          </div>

            <div className="flex  ">
            <span className="w-30 text-[#333333] text-base">発音 ：</span>
            <p className="text-[#333333] text-left">
              主よ、私たちを不正を働く人々と一緒にしないでください。主よ、
              私たちを不正を働く人々と一緒にしないで...
            </p>
          </div>
        </div>

        {/* Note */}
        <div className=" border-gray-300 pt-3 text-base text-[#828282] ">
          <span className="font-semibold text-[#00401A]">Note:</span > Lorem ipsum
          dolor sit amet, consectetur Pellentesque Lorem ipsum dolor sit amet.
        </div>
      </div>

      {/* Footer */}
      <div className="text-center bg-gradient-to-b from-[#EEF8E9] to-[#BAFF98] px-4 py-4">
        <a
          href="https://www.osakamasjid.com"
          className="text-[#000000] text-xl sm:text-2xl font-medium hover:underline"
        >
          www.osakamasjid.com
        </a>
      </div>
    </div>
  );
};

export default DuaCardNew;
