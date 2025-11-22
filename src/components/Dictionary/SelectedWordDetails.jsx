import Image from 'next/image';
import React from 'react'
import SocialShare from '../Shared/SocialShare';
// Reusable Component
function LabelBox({ label, value }) {
  return (
    <div className="border border-[#E0E0E0] rounded-[10px] h-auto  md:h-[50px] flex">
      <div className="w-[30%] h-full px-3 py-2 md:py-0 bg-[#e0e0e06d] flex items-center justify-between text-base text-[#000000]">
        <span>{label}</span>
        <span>:</span>
      </div>

      <div className="w-[70%] h-full px-3 flex items-center text-base text-black">
        {value || "—"}
      </div>
    </div>
  );
}

export default function SelectedWordDetails({selectedItem}) {
  return (
    <div>   {/* Selected Item Details Section */}
      <div className="gradient-border rounded-2xl p-8 bg-white">
        <div className="bg-[#E5F5DE] h-[50px] flex items-center justify-center rounded-[8px] mb-6">
          <h2 className="text-center text-xl font-semibold text-[#00401A]">
            {selectedItem ? selectedItem?.word_en  : "Details"}
          </h2>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side */}
          <div className="space-y-4">
            <LabelBox label="Japanese" value={selectedItem?.word_ja} />
            <LabelBox label="Pron in English" value={selectedItem?.description_en} />
            <LabelBox label="Pron in Japanese" value={selectedItem?.description_ja} />
            <LabelBox label="Pron in Roman" value={selectedItem?.description_ar} />
            
            
            {/* <LabelBox label="Usage" value={selectedItem?.usage} /> */}
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            <LabelBox label="Arabic" value={selectedItem?.word_ar} />
            <LabelBox label="English" value={selectedItem?.word_en} />
            <LabelBox label="Usage" value={selectedItem?.usage} />
            <LabelBox label="Explanation" value={selectedItem?.explanation} />
          </div>
        </div>

        <div className="text-center mt-6 text-[#000000] text-xl md:text-2xl">
          www.osakamasjid.com
        </div>
      </div>

      {/* Social icons bottom */}
      <div className="py-4 flex justify-end items-center">
             <SocialShare />
           </div>
      </div>
  )
}
