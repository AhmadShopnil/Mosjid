import { Download, Facebook, Printer, Twitter, Wheat } from "lucide-react";
import React from "react";

// Custom SVG to create the inward curve (notch)
const CurveSvg = () => (
  <svg
    /* viewBox height updated to 70 to match your new requirement */
    viewBox="0 0 120 80"
    /* h-[80px] ensures the SVG matches the div height exactly */
    className="w-[120px] h-[80px] -rotate-90 fill-white"
    preserveAspectRatio="none"
  >
    <path 
      /* Path adjusted: V 70 ensures the fill goes to the full width of the 'base' */
      d="M0,0 C 20,0 30,40 60,40 C 90,40 100,0 120,0 V 70 H 0 Z" 
      fill="white"
      stroke="#86efac"
      strokeWidth="2"
    />
    {/* This rect hides the right-side border (bottom after rotation).
       x="118" targets the very edge of the 120 width.
       height="70" matches your new height requirement.
    */}
    <rect x="118" y="0" width="5" height="70" fill="white" />
  </svg>
);

const EidPrayer = ({ number = "01", title = "Opening Bayan", subtitle = "(Religious Talk)" }) => {
  return (
    <div className="flex items-center justify-center mt-10 p-12 bg-gray-50">
      <div className="relative flex items-center h-36 ">
        
        {/* 1. The Number Circle - Positioned exactly in the notch */}
        <div className="absolute left-[-10px] z-30 flex h-[57px] w-[57px] items-center justify-center rounded-full border-[1.5px] border-[#86efac] bg-white shadow-sm">
          <span className="text-2xl font-bold text-[#064e3b]">{number}</span>
        </div>

        {/* 2. The Card Body */}
        <div className="relative w-full h-full ml-20">
          {/* The SVG Notch */}
          <div className="absolute top-7 -left-23">
            
          <CurveSvg />
          </div>
          {/* The Main Content Area */}
          <div className="h-full w-full bg-white rounded-[40px] rounded-tl-none rounded-bl-none border-y border-r border-[#86efac]/40 shadow-xl shadow-green-900/5 flex items-center justify-center pl-10 pr-6">
            <div className="text-center">
              <h2 className="text-[22px] font-bold text-[#064e3b] leading-tight">
                {title}
              </h2>
              <p className="text-[19px] font-semibold text-[#14532d] opacity-80 leading-tight">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
        <div >
            <div className="flex items-center justify-end space-x-4 p-4  w-fit">
      
      {/* Twitter / X */}
      <button className="flex items-center justify-center w-10 h-10 rounded-full  hover:opacity-90 transition-opacity">
        <img src="/images/offerServices/masjidActivities/twitter.svg" alt="" />
      </button>

      <div className="h-8 w-[1px] bg-[#BDBDBD]" />

      {/* Facebook */}
      <button className="flex items-center justify-center w-10 h-10">
         <img src="/images/offerServices/masjidActivities/facebook.svg" alt="" />
      </button>

      <div className="h-8 w-[1px] bg-[#BDBDBD]" />

      {/* WhatsApp */}
      <button className="flex items-center justify-center w-10 h-10">
       <img src="/images/offerServices/masjidActivities/whatsapp.svg" alt="" />
      </button>

      <div className="h-8 w-[1px] bg-[#BDBDBD]" />

      {/* Print */}
      <button className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800">
       <img src="/public/offerServices/images/masjidActivities/printer.svg" alt="" />
      </button>

      <div className="h-8 w-[1px] bg-[#BDBDBD]" />

      {/* Download */}
      <button className="flex items-center justify-center w-10 h-10 rounded-full transition-colors">
         <img src="/public/offerServices/images/masjidActivities/download.svg" alt="" />
      </button>

    </div>
    </div> 
      </div>
    </div>
  );
};

export default EidPrayer;