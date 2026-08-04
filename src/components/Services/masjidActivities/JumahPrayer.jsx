import GradientBorder from "@/components/GradientBorder/GradientBorder";
import SectionTitleRow from "@/components/SectionTitleRow/SectionTitleRow";
import GradientBorderWrapper1 from "@/components/Shared/GradientBorderWrapper1";
import Image from "next/image";
import React from "react";

const adhanData = [
  { id: "01", title: "First Adhan", subtitle: "(Call to Prayer)", time: "12:45" },
  { id: "02", title: "Bayan", subtitle: "(Religious Talk) in Japanese", time: "12:50" },
  { id: "03", title: "Break for", subtitle: "Sunnah Prayers", time: "13:15" },
  { id: "04", title: "Second Adhan", subtitle: "", time: "13:20" },
  { id: "05", title: "Two Khutbahs", subtitle: "(Sermons) in Arabic", time: "13:25" },
  { id: "06", title: "Iqamah for", subtitle: "Jumu'ah Salah", time: "13:30" },
];

const JumahPrayer = ({jumuah_prayer_sequence}) => {
const data = jumuah_prayer_sequence?.sub_sections;
console.log("data",data)

  return (
    <div id="jumah-prayer" className="mt-16 scroll-mt-24">
      <SectionTitleRow leftTitle={"Jumuʿah Prayer Sequence"} rightTitle={"金曜礼拝の順序"} />

      <div className="pt-6">
        <GradientBorder
          radius={20}
          className="shadow-md"
          innerClassName="pt-[80px] pb-[60px] pr-[30px] pl-[30px]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-16 gap-6">
            {data.map((item) => (

              <GradientBorderWrapper1
                rounded="rounded-[20px]"
                innerRounded="rounded-[19px]"
                className="shadow-md hover:shadow-lg transition-all duration-300 "
                innerClassName=""
              >
                <div
                  key={item.id}
                  className="relative w-full min-h-[180px] flex flex-col items-center justify-start  rounded-[36px] bg-white
                 "
                >
                  {/* Top Number Circle with Arrow */}
                  <div className="absolute -top-5 left-9 -translate-x-1/2 w-16 h-16 rounded-full bg-white border border-[#86efac] 
                shadow-sm flex items-center justify-center relative">
                    <span className="text-[#00401A] font-extrabold text-sm">{item.sub_title}</span>

                    {/* Small Green Triangle Accent Pointing Right */}
                    {/* <div
                      className="absolute -right-3 top-[22px] w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent 
                    border-l-[8px] border-l-[#86efac]"
                    /> */}
                  </div>

                  {/* Text Content */}
                  <div className="z-10 text-center px-2 py-2 -mt-3 ">
                    <h2 className="text-[#00401A] text-sm  font-bold ">
                      {item.title}
                    </h2>
                    {/* {item.short_description && (
                      <p className="text-[#00401A] text-sm md:text-base font-bold  mt-1 opacity-90">
                        {item.short_description}
                      </p>
                    )} */}
                  </div>

                  {/* Bottom Time Capsule */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-14  flex items-center justify-center ">
                    <GradientBorderWrapper1
                      rounded="rounded-full"
                      innerRounded="rounded-full"
                      className="w-full text-center "
                      innerClassName="px-4  py-2"
                    >
                      <span className="text-[#00401A] font-bold text-lg">
                        {item?.short_description}
                      </span>
                    </GradientBorderWrapper1>
                  </div>
                  {/* <div
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-10 flex items-center justify-center rounded-full bg-white border border-[#86efac] shadow-sm"
                >
                  <span className="text-[#00401A] font-bold text-xs">
                    {item.time}
                  </span>
                </div> */}

                  {/* Subtle light-green gradient inner glow */}
                  <div className="absolute inset-0 rounded-[36px] pointer-events-none bg-[radial-gradient(circle_at_bottom_left,rgba(81,249,9,0.05),transparent_60%)]" />
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
            <button className="flex items-center justify-center w-8 h-8 text-gray-655 hover:opacity-85 transition-opacity cursor-pointer">
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

export default JumahPrayer;