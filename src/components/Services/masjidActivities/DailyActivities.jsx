import GradientBorder from "@/components/GradientBorder/GradientBorder";
import SectionTitleRow from "@/components/SectionTitleRow/SectionTitleRow";
import Image from "next/image";
import React from "react";

// 1. JSON Data
const adhanData = [
  {
    id: "01",
    label: "After Fajr",
    title: "Qur’an Dars & Adult Tajweed, Tafsir, Grammar",
  },
  { id: "02", label: "After Zuhr", title: ".Dawah, Tajweed, Hifz, and Hadith" },
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
  { id: "05", label: "After Isha", title: "Dawah & Children’s Qur’an Class" },
];

const DailyActivities = () => {
  return (
    <div>
      {/* Responsive Container: 
        Items center correctly on all screens. 
        Increased gap-y to prevent overlapping of the "After..." capsules.
      */}
      <SectionTitleRow leftTitle={"Daily Activities"} rightTitle={"日常活動"} />
      <div className="pt-6">
        <GradientBorder
          radius={20}
          innerClassName="pt-[70px] pb-[40px] pr-[40px] pl-[40px] "
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-y-14 gap-5">
            {adhanData?.map((item) => (
              <div
                key={item.id}
                className="relative w-full min-h-[250px] flex flex-col items-center justify-center p-6 rounded-[40px] shadow-lg text-center"
                style={{
                  /* 1. Define a 1px transparent border */
                  border: "1px solid transparent",
                  /* 2. Layer two backgrounds: 
           The first is the white inner fill (content-box)
           The second is the gradient (border-box) */
                  background:
                    "linear-gradient(white, white) padding-box, " +
                    "linear-gradient(to bottom, #3198A0, #51F909) border-box",
                }}
              >
                {/* Top Label Capsule - Also simplified to one div */}
                <div
                  className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-16 flex items-center justify-center rounded-full"
                  style={{
                    border: "1px solid transparent",
                    background:
                      "linear-gradient(white, white) padding-box, " +
                      "linear-gradient(to bottom, #3198A0, #51F909) border-box",
                  }}
                >
                  <span className="text-[#00401A] font-bold">{item.label}</span>
                </div>

                {/* Text Content */}
                <div className="z-10">
                  <h2 className="text-[#00401A] text-base font-bold">
                    {item.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </GradientBorder>
        <div className="flex justify-end">
          <div className="flex items-center justify-end space-x-4 p-4  w-fit">
            {/* Twitter / X */}
            <button className="flex items-center justify-center w-10 h-10 rounded-full  hover:opacity-90 transition-opacity">
              <Image
                src="/images/offerServices/masjidActivities/twitter.svg"
                alt="twitter"
                width="30"
                height="30"
              />
            </button>

            <div className="h-8 w-[1px] bg-[#BDBDBD]" />

            {/* Facebook */}
            <button className="flex items-center justify-center w-10 h-10">
              <Image
                src="/images/offerServices/masjidActivities/facebook.svg"
                alt="facebook"
                width="30"
                height="30"
              />
            </button>

            <div className="h-8 w-[1px] bg-[#BDBDBD]" />

            {/* WhatsApp */}
            <button className="flex items-center justify-center w-10 h-10">
              <Image
                src="/images/offerServices/masjidActivities/whatsapp.svg"
                alt="whatsapp"
                width="30"
                height="30"
              />
            </button>

            <div className="h-8 w-[1px] bg-[#BDBDBD]" />

            {/* Print */}
            <button className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800">
              <Image
                src="/images/offerServices/masjidActivities/printer.svg"
                alt="printer"
                width="30"
                height="30"
              />
            </button>

            <div className="h-8 w-[1px] bg-[#BDBDBD]" />

            {/* Download */}
            <button className="flex items-center justify-center w-10 h-10 rounded-full transition-colors">
              <Image
                src="/images/offerServices/masjidActivities/download.svg"
                alt="download"
                width="30"
                height="30"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyActivities;
