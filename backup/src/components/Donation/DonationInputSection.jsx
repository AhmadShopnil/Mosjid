"use client";

import { getMetaValueByMetaName } from "@/helper/metaHelpers";
import CustomSelectRoundedWhite from "../UI/CustomSelectRoundedWhite";

export default function DonationInputSection({
  donate_now_button,
  isActive = "No",
  heading_part_1,
  heading_part_2,
  make_your_donation,
  settings
}) {

  // const disabled = isActive === "No";



  let submit_a_question_feature = "";
  if (settings) {
    submit_a_question_feature = getMetaValueByMetaName(settings, "donation_feature") || "";
  }

  const isDisabled =
    submit_a_question_feature?.toLowerCase?.().trim() === "no";


  return (
    <div
      className={`${isDisabled ? "opacity-50 pointer-events-none select-none" : ""}`}
    >
      {/* Heading */}
      <div
        className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-[#00401A] flex flex-wrap gap-4 justify-center 
          border-b border-[#B0C4B8] pb-2 mb-10 text-center"
      >
        <p>
          <span className="text-[#F7BA2A]">{heading_part_1}</span> {heading_part_2}
        </p>

        <span className="text-[#B0C4B8]">/</span>

        <p>{make_your_donation?.sub_title}</p>
      </div>

      {/* Input Section */}
      <div className="flex items-center flex-col lg:flex-row gap-3">

        {/* Select */}
        <div className="relative flex-1 w-full">
          <CustomSelectRoundedWhite
            lvl="Select"
            options={[
              { labelEn: "Masjid", labelJp: "マスジド" },
              { labelEn: "Madrasha", labelJp: "マドラシャ" },
              { labelEn: "Zakat", labelJp: "ザカート" },
            ]}
            disabled={isDisabled}
          />
        </div>

        {/* Mobile / Email */}
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Mobile or Email"
            disabled={isDisabled}
            className={`h-[54px] w-full pl-10 pr-4 py-3 border border-green-900 rounded-full
              placeholder-gray-400 placeholder:text-sm
              ${isDisabled ? "cursor-not-allowed bg-gray-100" : "focus:outline-none"}`}
          />
        </div>

        {/* Amount */}
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Write Amount"
            disabled={isDisabled}
            className={`h-[54px] w-full pl-10 pr-4 py-3 border border-green-900 rounded-full
              placeholder-gray-400 placeholder:text-sm
              ${isDisabled ? "cursor-not-allowed bg-gray-100" : "focus:outline-none"}`}
          />
        </div>

        {/* Button */}
        <button
          type="button"
          aria-label="donate"
          disabled={isDisabled}
          className={`w-full lg:w-auto bg-[#F7BA2A] text-[#00401A] h-[56px] font-bold px-9 py-3 rounded-full 
            shadow-md transition text-lg
            ${isDisabled ? "cursor-not-allowed opacity-70" : "hover:bg-[#e0a520] cursor-pointer"}`}
        >
          {donate_now_button?.value}
        </button>

      </div>
    </div>
  );
}
