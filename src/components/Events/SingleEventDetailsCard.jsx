"use client";

import { getMetaValueFromExtra_Fields } from "@/helper/metaHelpers";
import Image from "next/image";
import React, { useState } from "react";
import SocialShare from "../Shared/SocialShare";

export default function SingleEventDetailsCard({ event }) {
  const [language, setLanguage] = useState("jp");

  const day = getMetaValueFromExtra_Fields(event, "day");
  const month = getMetaValueFromExtra_Fields(event, "month");
  const time = getMetaValueFromExtra_Fields(event, "time");
  const year = getMetaValueFromExtra_Fields(event, "year");
  const location = getMetaValueFromExtra_Fields(event, "location");

  const jpDescription = event?.description || "";
  const enDescription =
    getMetaValueFromExtra_Fields(event, "description_secondary_events") || "";

  const description =
    language === "en" && enDescription ? enDescription : jpDescription;

  return (
    <div>
      {/* Event Card */}
      <div
        className="grid grid-cols-1 xl:grid-cols-6 gap-3 p-5 sm:p-7 bg-white 
        rounded-xl shadow-md overflow-hidden gradient-border"
      >
        {/* Left Column — Event Time */}
        <div className="col-span-1 flex xl:flex-col xl:items-start gap-4">
          <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#000000]">
            Date Time <br />
            イベント時間
          </h4>
             <div
            className="bg-[#F2F2F2] rounded-md text-[#000000] w-[140px] 
            sm:w-[170px] h-[90px] sm:h-[100px] p-3 xl:mt-5 space-y-2 
            flex flex-col justify-center items-start"
          >
            <p className="text-[#00401A] font-bold text-sm sm:text-base">Date/日付</p>
            <div className="space-x-1">

              <span className="text-[#00401A] font-semibold text-2xl md:text-3xl">
                {day}
              </span>
              <span className="text-[#00401A] text-sm">{month}</span>
            </div>
           
          </div>

          {/* <div
            className="bg-[#F2F2F2] rounded-md text-[#000000] w-[140px] 
            sm:w-[170px] h-[90px] sm:h-[100px] p-3 xl:mt-5 space-y-2 
            flex flex-col justify-center items-start"
          >
            <div className="space-x-1">
              <span className="text-[#00401A] font-semibold text-2xl md:text-3xl">
                {day}
              </span>
              <span className="text-[#00401A] text-sm">{month}</span>
            </div>
            <p className="text-[#00401A] text-xs sm:text-sm">{time}</p>
          </div> */}
           <div
            className="bg-[#F2F2F2] rounded-md text-[#000000] w-[140px] 
            sm:w-[170px] h-[90px] sm:h-[100px] p-3 xl:mt-5 space-y-2 
            flex flex-col justify-center items-start"
          >
           <p className="text-[#00401A] font-bold text-sm sm:text-base">Time/時間</p>
            <p className="text-[#00401A] text-xs sm:text-sm">{time}</p>
          </div>
        </div>

        {/* Middle Column — Event Name + Description */}
        <div className="lg:col-span-3 flex flex-col justify-start">
          <div className="flex justify-between items-center">
            <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#000000]">
              Event Name <br />
              イベント名
            </h4>

            {/* Language Switch */}
            <div className="flex border rounded-full overflow-hidden">
              <button
                onClick={() => setLanguage("jp")}
                className={`px-4 py-1 text-sm font-medium transition cursor-pointer ${
                  language === "jp"
                    ? "bg-[#00401A] text-white"
                    : "bg-white text-[#00401A]"
                }`}
              >
                日本語
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-4 py-1 text-sm font-medium transition cursor-pointer ${
                  language === "en"
                    ? "bg-[#00401A] text-white"
                    : "bg-white text-[#00401A]"
                }`}
              >
                English
              </button>
            </div>
          </div>

          <div className="mt-5 sm:mt-7">
            <h4 className="text-lg sm:text-xl text-[#52B920] font-semibold border-b border-gray-300 pb-2 mb-3">
              {event?.name}
            </h4>

            {/* Description */}
            <div
              className="text-[#333333] text-sm sm:text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>

        {/* Right Column — Event Image */}
        <div className="lg:col-span-2 flex flex-col justify-between">
          <div className="w-full overflow-hidden h-[240px] sm:h-[300px] lg:h-[400px]">
            <Image
              src={event?.featured_image}
              alt="event-image"
              width={400}
              height={400}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Footer (Social Share) */}
      <div className="mt-5">
        <SocialShare />
      </div>
    </div>
  );
}
