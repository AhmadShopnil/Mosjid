import React from "react";
import Image from "next/image";
import { getMetaValueFromExtraFields } from "@/helper/metaHelpers";

export default function ProhibitedTimeMobile({ prayerTimes, prayer_time, isDisabled,calculatedProhibitedTimes }) {

  // const jamat_start = prayer_time?.custom_information.find(
  //   (item) => item.label === "jamat_start"
  // );
  // const name_of_salat = prayer_time?.custom_information.find(
  //   (item) => item.label === "name_of_salat"
  // );
  // const wakt_start = prayer_time?.custom_information.find(
  //   (item) => item.label === "wakt_start"
  // );
  // const wakt_end = prayer_time?.custom_information.find(
  //   (item) => item.label === "wakt_end"
  // );

  const prohibited_time_start_title = prayer_time?.custom_information.find(
    (item) => item.label === "prohibited_time_start"
  );
  const prohibited_time_start_title_jp = prayer_time?.custom_information.find(
    (item) => item.label === "prohibited_time_start_jp"
  );
  const prohibited_time_end_title = prayer_time?.custom_information.find(
    (item) => item.label === "prohibited_time_end"
  );

  const prohibited_time_end_title_jp = prayer_time?.custom_information.find(
    (item) => item.label === "wakt_end_jp"
  );

  return (
    <div className="mt-6 grid gap-5 sm:hidden">
      {prayerTimes?.map((prayer, index) => {
        const prohibited_time_start = getMetaValueFromExtraFields(
          prayer,
          "prohibited-time-start"
        );
        const prohibited_time_end = getMetaValueFromExtraFields(
          prayer,
          "prohibited-time-end"
        );

        return (
          <div
            key={index}
            className={`
              rounded-2xl border border-gray-100 bg-gradient-to-tr from-[#F9FFF5] to-[#FFFFFF]
              p-3 shadow-md transition
              ${
                isDisabled
                  ? "opacity-40 grayscale pointer-events-none"
                  : "hover:shadow-lg"
              }
            `}
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between border-b-2 border-[#E5F5DE] pb-2">
              <div className="flex items-center gap-3">
                <Image
                  src={prayer?.featured_image}
                  alt="prayer-icon"
                  width={42}
                  height={42}
                  className="rounded-full bg-[#E8F9E4] p-2"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-[#00401A]">
                    {prayer?.name}
                  </span>
                  <span className="text-lg font-semibold text-[#00401a86]">
                    {prayer?.sub_title}
                  </span>
                </div>
              </div>
            </div>

            {/* Times */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="flex flex-col items-center">
                <span className="text-xs text-[#00401A]">
                  {prohibited_time_start_title?.value}
                </span>
                <span className="text-xs text-gray-500">
                  {prohibited_time_start_title_jp?.value}
                </span>
                <span className="mt-1 text-base font-medium text-[#3E8B18]">
                  {calculatedProhibitedTimes[prayer?.name]?.start} 
                  {/* {prohibited_time_start} */}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-xs text-[#00401A]">
                  {prohibited_time_end_title?.value}
                </span>
                <span className="text-xs text-gray-500">
                  {prohibited_time_end_title_jp?.value}
                </span>
                <span className="mt-1 text-base font-medium text-[#FF0000]">
                   {calculatedProhibitedTimes[prayer?.name]?.end}
                  {/* {prohibited_time_end} */}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
