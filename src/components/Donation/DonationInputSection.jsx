"use client";


import CustomSelectRoundedWhite from "../UI/CustomSelectRoundedWhite";

export default function DonationInputSection({donate_now_button}) {
  return (
    <div className="flex items-center  flex-col lg:flex-row gap-3">
      <div className="relative flex-1  w-full">

        <CustomSelectRoundedWhite lvl="Select" options={[
          { labelEn: "Masjid", labelJp: "マスジド" },
          { labelEn: "Madrasha", labelJp: "マドラシャ" },
          { labelEn: "Zakat", labelJp: "ザカート" },
         
        ]} />


      </div>
    
     

      {/* Location Input */}
      <div className="relative flex-1  w-full">
        {/* <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
        <input
          type="text"
          placeholder="Mobile or Email"
          className="h-[54px] w-full pl-10 pr-4 py-3 border border-green-900 rounded-full focus:outline-none
           placeholder-gray-400 placeholder:text-sm"
        />
      </div>
      {/* Location Input */}
      <div className="relative flex-1 w-full">
        {/* <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
        <input
          type="text"
          placeholder="Write Amount"
          className="h-[54px] w-full pl-10 pr-4 py-3 border border-green-900 rounded-full focus:outline-none
           placeholder-gray-400 placeholder:text-sm"
        />
      </div>

      {/* Find Button */}
      <button
   
       className="cursor-not-allowed  w-full lg:w-auto  bg-[#F7BA2A] hover:bg-[#F7BA2A] text-[#00401A] h-[56px] font-bold px-9 py-3 rounded-full 
      shadow-md transition text-lg">
        {donate_now_button?.value}
      </button>
    </div>
  );
}
