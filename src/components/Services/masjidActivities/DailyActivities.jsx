import GradientBorder from "@/components/GradientBorder/GradientBorder";
import SectionTitleRow from "@/components/SectionTitleRow/SectionTitleRow";
import Image from "next/image";
import React from "react";

const adhanData = [
  {
    id: "01",
    label: "After Fajr",
    title: "Qur'an Dars & Adult Tajweed, Tafsir, Grammar",
  },
  {
    id: "02",
    label: "After Zuhr",
    title: "Dawah, Tajweed, Hifz, and Hadith",
  },
  {
    id: "03",
    label: "After Asr",
    title: "Salah, Adult Hifz, Fiqh, and Mirāth Studies",
  },
  {
    id: "04",
    label: "After Maghrib",
    title: "Children’s Qur’an Learning Class",
  },
  {
    id: "05",
    label: "After Isha",
    title: "Dawah & Children’s Qur’an Class",
  },
];

const DailyActivities = () => {
  return (
    <div id="daily-activities" className="scroll-mt-24">
      <SectionTitleRow leftTitle={"Daily Activities"} rightTitle={"日常活動"} />
      
      <div className="pt-6">
        <GradientBorder
          radius={20}
          innerClassName="pt-[70px] pb-[40px] pr-[40px] pl-[40px]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {adhanData.map((item) => (
              <div
                key={item.id}
                className="relative w-full min-h-[250px] flex flex-col items-center justify-center p-6 rounded-[32px] shadow-md text-center bg-white border border-[#86efac]/30 hover:shadow-lg transition-all duration-300"
              >
                {/* Top Label Capsule */}
                <div
                  className="absolute -top-6 left-1/2 -translate-x-1/2 w-36 h-12 flex items-center justify-center rounded-full bg-white border border-[#86efac] shadow-sm"
                >
                  <span className="text-[#00401A] font-bold text-xs">
                    {item.label}
                  </span>
                </div>

                {/* Text Content */}
                <div className="z-10 mt-4">
                  <h2 className="text-[#00401A] text-sm font-bold leading-relaxed">
                    {item.title}
                  </h2>
                </div>

                {/* Subtle bottom-left decorative glow inside card */}
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#51F909]/5 to-transparent rounded-bl-[32px] pointer-events-none" />
              </div>
            ))}
          </div>
        </GradientBorder>

        {/* Share buttons row */}
        <div className="flex justify-end">
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
        </div>
      </div>
    </div>
  );
};

export default DailyActivities;
