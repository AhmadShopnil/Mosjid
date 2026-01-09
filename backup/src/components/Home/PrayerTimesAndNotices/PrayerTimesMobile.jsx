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


  const name_of_salat_jp = prayer_time?.custom_information.find((item) => item.label === "name_of_salat_jp")
  const jamat_start_jp = prayer_time?.custom_information.find((item) => item.label === "jamat_start_jp")
  const wakt_start_jp = prayer_time?.custom_information.find((item) => item.label === "wakt_start_jp")
  const wakt_end_jp = prayer_time?.custom_information.find((item) => item.label === "wakt_end_jp")




  return (
    <div className="mt-6 grid gap-5 sm:hidden">
      {prayerTimes?.map((prayer, index) => {
        const prayerTime = prayer?.time;

        // const waktStartTime = prayer?.wakt_start_hanfi;
        // const waktEndTime = prayer?.wakt_end_hanfi;

        // const waktStartTime_2 = prayer?.wakt_start_safi;

        // const waktEndTime2 = prayer?.wakt_end_safi;

        const waktStartTime = formatTo12Hour(prayer?.wakt_start_hanfi);
        const waktEndTime = formatTo12Hour(prayer?.wakt_end_hanfi);

        const waktStartTime_2 = formatTo12Hour(prayer?.wakt_start_safi);
        const waktEndTime2 = formatTo12Hour(prayer?.wakt_end_safi);

        return (
          <div
            key={index}
            className="rounded-2xl border border-gray-100 bg-gradient-to-tr from-[#F9FFF5] to-[#FFFFFF] p-2.5 shadow-md
             transition hover:shadow-lg"
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between border-b-2 border-[#E5F5DE] pb-2">
              <div className="flex items-center gap-3">
                <Image
                  src={prayer?.featured_image}
                  alt="prayer-icon"
                  width={40}
                  height={40}
                  className="rounded-full bg-[#E8F9E4] p-1"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-[#00401A]">
                    {prayer?.name}
                  </span>
                  <span className="text-sm font-semibold text-[#00401a86]">
                    {prayer?.sub_title}
                  </span>
                </div>


              </div>
              <span className="rounded-md bg-[#E6F3FF] px-2 py-1 text-[13px] font-medium text-[#1D6FD6]">
                {prayer?.time}
              </span>
            </div>

            {/* Times */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="flex flex-col items-center">
                <span className="text-[12px] text-[#00401A]">{wakt_start?.value}</span>
                <span className="text-[12px] text-gray-500">{wakt_start_jp?.value}</span>



                {waktStartTime != waktStartTime_2 ? (

                  <div>

                    <div className="flex items-center justify-center gap-0.5">
                      <span className="mt-1 text-[12px] font-medium text-[#3E8B18]  ">
                        {waktStartTime}
                      </span>
                      <Image
                        src="/images/prayertimes/jahur.svg"
                        alt="icon"
                        width={14}
                        height={14}
                        className=''
                      />
                    </div>

                    <div className=" border-t-1 border-gray-300 flex items-center justify-center gap-0.5">
                      <span className="text-[12px] font-medium text-[#3E8B18] ">
                          {waktStartTime_2}
                      </span>
                    

                      <div className='flex '>
                        <Image
                          src="/images/prayertimes/jahur.svg"
                          alt="icon"
                          width={14}
                          height={14}
                          className=''
                        />

                        <Image
                          src="/images/prayertimes/jahur.svg"
                          alt="icon"
                          width={14}
                          height={14}
                          className=''
                        />

                      </div>

                    </div>
                  </div>

                )

                  :
                  <span className="mt-1 text-[12px] font-medium text-[#3E8B18]  ">
                    {waktStartTime}
                  </span>

                }
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[12px] text-[#00401A]">{jamat_start?.value}

                </span>
                <span className="text-[12px] text-gray-500">{jamat_start_jp?.value}</span>
                <span className="mt-1 text-[12px] font-medium text-[#56410F]">
                  {prayerTime}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[12px] text-[#00401A]">{wakt_end?.value}</span>
                <span className="text-[12px] text-gray-500">{wakt_end_jp?.value}</span>

                {waktEndTime != waktEndTime2 ? (

                  <div className="">

                    <div className="flex items-center justify-center gap-1">
                      <span className="mt-1 text-[12px] font-medium text-[#FF0000]">
                        {waktEndTime}
                      </span>
                      <Image
                        src="/images/prayertimes/jahur.svg"
                        alt="icon"
                        width={14}
                        height={14}
                        className=''
                      />
                    </div>


                    <div className="border-t-1 border-gray-300 flex items-center justify-center gap-1 ">
                      <span className="text-[12px] font-medium text-[#FF0000]  flex items-center justify-center gap-2">
                        {waktEndTime2}
                      </span>
                      <div className='flex'>
                        <Image
                          src="/images/prayertimes/jahur.svg"
                          alt="icon"
                          width={14}
                          height={14}
                          className=''
                        />

                        <Image
                          src="/images/prayertimes/jahur.svg"
                          alt="icon"
                          width={14}
                          height={14}
                          className=''
                        />

                      </div>
                    </div>


                  </div>

                )


                  :
                  <span className="mt-1 text-[12px] font-medium text-[#FF0000]">
                    {waktEndTime}
                  </span>

                }
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
