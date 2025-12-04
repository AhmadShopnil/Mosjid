import React from "react";
import Image from "next/image";
import { getMetaValueFromExtraFields } from "@/helper/metaHelpers";
import { formatTo12Hour } from "@/helper/formatTo12Hour";

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
        const prayerTime =  prayer?.time;
        const waktStartTime =formatTo12Hour(prayer?.wakt_start_hanfi);
        const waktStartTime_2 =formatTo12Hour(prayer?.wakt_start_safi);
        const waktEndTime = formatTo12Hour(prayer?.wakt_end_hanfi);
        const waktEndTime2 = formatTo12Hour(prayer?.wakt_end_safi);

        return (
          <div
            key={index}
            className="rounded-2xl border border-gray-100 bg-gradient-to-tr from-[#F9FFF5] to-[#FFFFFF] p-3 shadow-md transition hover:shadow-lg"
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between border-b-2 border-[#E5F5DE] pb-2">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/prayertimes/eid.png"
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
                  ファジル
                </span>
               </div>

              
              </div>
              <span className="rounded-md bg-[#E6F3FF] px-3 py-1 text-md font-medium text-[#1D6FD6]">
               {prayer?.time}
              </span>
            </div>

            {/* Times */}
            <div className="grid grid-cols-3 gap-3 text-center">
             
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500">{wakt_start?.value}</span>
                <span className="mt-1 text-sm font-medium text-[#3E8B18]  ">
                  {waktStartTime}
                </span>
                {waktStartTime != waktStartTime_2 && (
                  <span className="text-xs font-medium text-[#3E8B18] border-t-1 border-gray-300">
                    {waktStartTime_2}
                  </span>
                )}
              </div>
               <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500">{jamat_start?.value}</span>
                <span className="mt-1 text-sm font-medium text-[#56410F]">
                  {prayerTime}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500">{wakt_end?.value}</span>
                <span className="mt-1 text-sm font-medium text-[#FF0000]">
                  {waktEndTime}
                </span>
                  {waktEndTime != waktEndTime2 && (
                  <span className="text-xs font-medium text-[#FF0000] border-t-1 border-gray-300">
                    {waktEndTime2}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
