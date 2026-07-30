import GradientBorder from "@/components/GradientBorder/GradientBorder";
import SectionTitleRow from "@/components/SectionTitleRow/SectionTitleRow";
import GradientBorderWrapper1 from "@/components/Shared/GradientBorderWrapper1";
import Image from "next/image";
import React from "react";


const DailyActivities = ({daily_activities}) => {

const activities = daily_activities?.sub_sections;
// console.log("activities",activities)

  return (
    <div id="daily-activities" className="scroll-mt-24">
      <SectionTitleRow leftTitle={"Daily Activities"} rightTitle={"日常活動"} />

      <div className="pt-3 md:pt-6">
        <GradientBorder
          className="shadow-md"
          radius={20}
          innerClassName="pt-[40px] pb-[25px] pr-[20px] pl-[20px]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {activities?.map((item) => (

              <GradientBorderWrapper1
                rounded="rounded-[20px]"
                innerRounded="rounded-[19px]"
              >
                <div
                  key={item.id}
                  className="relative w-full min-h-[250px] flex flex-col items-center justify-center p-2 lg:p-3 rounded-[20px]
                 shadow-md text-center bg-white border border-[#86efac]/30 hover:shadow-lg transition-all duration-300"
                >
                  {/* Top Label Capsule */}


                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-full h-14   flex items-center justify-center ">
                    <GradientBorderWrapper1
                      rounded="rounded-full"
                      innerRounded="rounded-full"
                      className=" "
                      innerClassName="px-3 py-2"
                    >
                      <span className="text-[#00401A] font-semibold text-sm">
                        {item?.title}
                      </span>
                    </GradientBorderWrapper1>
                  </div>


                  {/* Text Content */}
                  <div className="z-10 mt-4">
                    <h2 className="text-[#333333] text-sm md:text-base font-bold leading-relaxed">
                      {item.short_description}
                    </h2>
                  </div>

                  {/* Subtle bottom-left decorative glow inside card */}
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#51F909]/5 to-transparent
                 rounded-bl-[32px] pointer-events-none" />
                </div>
              </GradientBorderWrapper1>



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
            <button className="flex items-center justify-center w-8 h-8 text-gray-650 hover:opacity-85 transition-opacity cursor-pointer">
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

export default DailyActivities;
