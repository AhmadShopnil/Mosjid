import React from "react";
import Image from "next/image";
import { getMetaValueFromExtraFields } from "@/helper/metaHelpers";

export default function PrayerTimesMobile({ prayerTimes, prayer_time }) {
  const jamat_start = prayer_time?.custom_information.find(
    (item) => item.label === "jamat_start"
  );
  const name_of_salat = prayer_time?.custom_information.find(
    (item) => item.label === "name_of_salat"
  );
  const wakt_start = prayer_time?.custom_information.find(
    (item) => item.label === "wakt_start"
  );
  const wakt_end = prayer_time?.custom_information.find(
    (item) => item.label === "wakt_end"
  );

  return (
    <div className="mt-6 grid gap-5 sm:hidden">
      {prayerTimes?.map((prayer, index) => {
        const prayerTime = getMetaValueFromExtraFields(prayer, "time");
        const waktStartTime = getMetaValueFromExtraFields(prayer, "start_time");
        const waktStartTime_2 = getMetaValueFromExtraFields(
          prayer,
          "start_time_2"
        );
        const waktEndTime = getMetaValueFromExtraFields(prayer, "end_time");

        return (
          <div
            key={index}
            className="rounded-2xl border border-gray-100 bg-gradient-to-tr from-[#F9FFF5] to-[#FFFFFF] p-5 shadow-md transition hover:shadow-lg"
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/prayertimes/eid.png"
                  alt="prayer-icon"
                  width={42}
                  height={42}
                  className="rounded-full bg-[#E8F9E4] p-2"
                />
                <span className="text-lg font-semibold text-[#00401A]">
                  {prayer?.name}
                </span>
              </div>
              <span className="rounded-full bg-[#E6F3FF] px-3 py-1 text-xs font-medium text-[#1D6FD6]">
                {prayerTime}
              </span>
            </div>

            {/* Times */}
            <div className="grid grid-cols-3 gap-3 text-center">
             
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500">{wakt_start?.value}</span>
                <span className="mt-1 text-base font-medium text-[#3E8B18]  ">
                  {waktStartTime}
                </span>
                {waktStartTime_2 && (
                  <span className="text-sm font-medium text-[#3E8B18] border-t-1 border-gray-300">
                    {waktStartTime_2}
                  </span>
                )}
              </div>
               <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500">{jamat_start?.value}</span>
                <span className="mt-1 text-base font-medium text-[#56410F]">
                  {prayerTime}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500">{wakt_end?.value}</span>
                <span className="mt-1 text-base font-medium text-[#FF0000]">
                  {waktEndTime}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
