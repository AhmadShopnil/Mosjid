import GradientBorder from "@/components/GradientBorder/GradientBorder";
import SectionTitleRow from "@/components/SectionTitleRow/SectionTitleRow";
import Image from "next/image";
import React from "react";

const adhanData = [
  { img: "/images/offerServices/masjidActivities/male.svg", title: "Over 300 men gather" },
  { img: "/images/offerServices/masjidActivities/Female.svg", title: "10 to 15 women attend" },
  { img: "/images/offerServices/masjidActivities/ladies.svg", title: "Separate prayer area for women" },
  { img: "/images/offerServices/masjidActivities/separate_entries.svg", title: "Dedicated entrance for sisters" },
  { img: "/images/offerServices/masjidActivities/image14.svg", title: "Both khutbahs delivered in Arabic" },
  { img: "/images/offerServices/masjidActivities/juma.svg", title: "Spiritual atmosphere and sense of community" },
  { img: "/images/offerServices/masjidActivities/hala_store.svg", title: "Halal shopping and meals available nearby" },
  { img: "/images/offerServices/masjidActivities/restaurants.svg", title: "Bayan (religious talk) in japanese" },
];

const BenefitsOfJumah = () => {
  return (
    <div id="benefits-of-jumah" className="pt-16 scroll-mt-24">
      <SectionTitleRow leftTitle={"Benefits of Jumuʿah Prayer"} rightTitle={"ジュムア礼拝の利点"} />
      
      <div className="pt-6">
        <GradientBorder radius={20} innerClassName="p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {adhanData.map((item, index) => (
              <div
                key={index}
                className="relative w-full min-h-[100px] bg-white rounded-[24px] border border-[#86efac]/35 shadow-sm hover:shadow-md transition-all duration-300 p-4 flex items-center gap-4 overflow-hidden"
              >
                {/* Left Circle Icon Container with green-cyan thin border wrapper */}
                <div className="flex-shrink-0 w-16 h-16 rounded-full p-[1.5px] bg-gradient-to-b from-[#3198A0] to-[#51F909] shadow-sm">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                    <Image
                      src={item.img}
                      alt=""
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Right Text Content */}
                <div className="flex-grow z-10">
                  <h2 className="text-[#00401A] text-xs font-bold leading-snug">
                    {item.title}
                  </h2>
                </div>

                {/* Subtle pastel corner blur */}
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#3198A0]/5 to-transparent rounded-bl-[24px] pointer-events-none" />
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
        </div>
      </div>
    </div>
  );
};

export default BenefitsOfJumah;