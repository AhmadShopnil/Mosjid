import GradientBorder from "@/components/GradientBorder/GradientBorder";
import SectionTitleRow from "@/components/SectionTitleRow/SectionTitleRow";
import Image from "next/image";
import React from "react";

const adhanData = [
  { id: "01", title: "Opening Bayan", subtitle: "(Religious Talk)" },
  { id: "02", title: "Eid Salah", subtitle: "(Two Rak'ah Prayer)" },
  { id: "03", title: "Du'a before", subtitle: "Khutbah" },
  { id: "04", title: "Two Khutbahs", subtitle: "delivered in Arabic" },
];

const EidPrayer = () => {
  return (
    <div id="eid-prayer" className="mt-16 scroll-mt-24">
      <SectionTitleRow leftTitle={"Eid Prayer Sequence"} rightTitle={"イード礼拝の順序"} />
      
      <div className="pt-6">
        <GradientBorder radius={20} innerClassName="p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {adhanData.map((item) => (
              <div 
                key={item.id} 
                className="relative flex items-center min-h-[90px] w-full pl-[56px] group"
              >
                {/* Left Circle holding the step number */}
                <div className="absolute left-0 z-20 flex h-[56px] w-[56px] items-center justify-center rounded-full border-[1.5px] border-[#86efac] bg-white shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <span className="text-base font-bold text-[#00401A]">{item.id}</span>
                </div>

                {/* SVG Inward Curve Notch Mask */}
                <div className="absolute left-[38px] top-1/2 -translate-y-1/2 z-10 w-[20px] h-[60px] pointer-events-none">
                  <svg viewBox="0 0 20 60" className="w-full h-full fill-white" preserveAspectRatio="none">
                    <path d="M20,0 C8,0 0,10 0,30 C0,50 8,60 20,60 Z" fill="white" />
                    <path d="M20,0 C8,0 0,10 0,30 C0,50 8,60 20,60" fill="none" stroke="#86efac" strokeWidth="1.5" />
                  </svg>
                </div>

                {/* Card Content Body */}
                <div className="flex-grow bg-white border border-[#86efac] border-l-0 rounded-r-[24px] rounded-l-none h-[80px] flex items-center pl-6 pr-4 shadow-sm group-hover:shadow-md transition-shadow duration-300 relative">
                  {/* Subtle inner radial pastel glow */}
                  <div className="absolute inset-0 rounded-r-[24px] pointer-events-none bg-[radial-gradient(circle_at_bottom_left,rgba(81,249,9,0.05),transparent_50%)]" />
                  
                  <div className="z-10">
                    <h2 className="text-[#00401A] text-xs font-bold leading-snug">
                      {item.title}
                    </h2>
                    {item.subtitle && (
                      <p className="text-[#00401A] text-[11px] font-semibold opacity-90 mt-0.5 leading-snug">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GradientBorder>

        {/* Share buttons row */}
        {/* <div className="flex justify-end">
          <div className="flex items-center justify-end space-x-3 p-4 w-fit">
            <button className="flex items-center justify-center w-8 h-8 rounded-full hover:opacity-85 transition-opacity cursor-pointer">
              <Image
                src="/images/offerServices/masjidActivities/twitter.svg"
                alt="twitter"
                width="24"
                height="24"
              />
            </button>
            <div className="h-6 w-[1px] bg-[#BDBDBD]" />
            <button className="flex items-center justify-center w-8 h-8 rounded-full hover:opacity-85 transition-opacity cursor-pointer">
              <Image
                src="/images/offerServices/masjidActivities/facebook.svg"
                alt="facebook"
                width="24"
                height="24"
              />
            </button>
            <div className="h-6 w-[1px] bg-[#BDBDBD]" />
            <button className="flex items-center justify-center w-8 h-8 rounded-full hover:opacity-85 transition-opacity cursor-pointer">
              <Image
                src="/images/offerServices/masjidActivities/whatsapp.svg"
                alt="whatsapp"
                width="24"
                height="24"
              />
            </button>
            <div className="h-6 w-[1px] bg-[#BDBDBD]" />
            <button className="flex items-center justify-center w-8 h-8 text-gray-655 hover:opacity-85 transition-opacity cursor-pointer">
              <Image
                src="/images/offerServices/masjidActivities/printer.svg"
                alt="printer"
                width="24"
                height="24"
              />
            </button>
            <div className="h-6 w-[1px] bg-[#BDBDBD]" />
            <button className="flex items-center justify-center w-8 h-8 rounded-full hover:opacity-85 transition-opacity cursor-pointer">
              <Image
                src="/images/offerServices/masjidActivities/download.svg"
                alt="download"
                width="24"
                height="24"
              />
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default EidPrayer;