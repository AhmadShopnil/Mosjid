"use client";


import { getMetaValueFromExtraFields } from "@/helper/metaHelpers";
import { X } from "lucide-react";



export default function DuaModal({
  isOpen,
  onClose,
  dua,
}) {


  if (!isOpen || !dua) return null;

 const header_left = getMetaValueFromExtraFields(dua, "header_left")
  const header_right = getMetaValueFromExtraFields(dua, "header_right")
  const dua_no = getMetaValueFromExtraFields(dua, "dua_no")
  const dua_main = getMetaValueFromExtraFields(dua, "info_1")
  const pronunciation = getMetaValueFromExtraFields(dua, "info_2")
  const meaning = getMetaValueFromExtraFields(dua, "info_3")
  const info_4 = getMetaValueFromExtraFields(dua, "info_4")
  const info_5 = getMetaValueFromExtraFields(dua, "info_5")
  const note = getMetaValueFromExtraFields(dua, "note")
  const footer_info = getMetaValueFromExtraFields(dua, "footer_info")






  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-lg max-w-3xl w-full p-6 md:p-8 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
        >
          <X className="w-6 h-6" />
        </button>

      <div>
           <div className=" bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-b from-[#EEF8E9] to-[#BAFF98] px-4 py-4 gradient-border-bottom">
        <span className="text-[#00401A] font-bold text-xl sm:text-2xl">
          {header_left}
        </span>

        <span className="bg-[#00401A] text-white text-xs sm:text-lg font-bold px-3 sm:px-5 py-3 rounded-full">
          Dua No: {dua_no}
        </span>

        <span className="text-[#00401A] font-bold text-xl sm:text-2xl">
          {header_right}
        </span>
      </div>

      {/* Inner Section */}
      <div className="px-4 py-6 space-y-5 text-center">
        {/* Dua Title */}
        <div className="space-y-2">
          <p className="text-[#333333] font-semibold text-2xl mb-4">
            {dua?.name}  </p>
          <p className="text-[#333333] font-semibold text-2xl border-t-1  border-[#F6C249] pt-5">
            {dua?.sub_title}
          </p>
        </div>

        {/* Arabic Text */}
        {/* <p className="text-[#333333] leading-8 text-base ">
          {dua_main}
        </p> */}
          <div
          className="text-[#333333] leading-8 text-base"
          dangerouslySetInnerHTML={{ __html: dua?.description }}
        />

        {/* Japanese Pronunciation Section */}
        <div className="space-y-10">
          <div className="flex ">
            <span className="w-30 text-[#333333] text-base">{info_4} ：</span>
            <p className="text-[#333333] text-left">
              {pronunciation}
            </p>
          </div>

          <div className="flex  ">
            <span className="w-30 text-[#333333] text-base">{info_5} ：</span>
            <p className="text-[#333333] text-left">
              {meaning}
            </p>
          </div>
        </div>

        {/* Note */}
        <div className=" border-gray-300 pt-3 text-base text-[#828282] ">
          <span className="font-semibold text-[#00401A]">Note: </span >
          <span>{note}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center bg-gradient-to-b from-[#EEF8E9] to-[#BAFF98] px-4 py-4">
        <a
          href="https://www.osakamasjid.com"
          className="text-[#000000] text-xl sm:text-2xl font-medium hover:underline"
        >
          {footer_info}
        </a>
      </div>
    </div>
      </div>
      </div>
    </div>
  );
}
