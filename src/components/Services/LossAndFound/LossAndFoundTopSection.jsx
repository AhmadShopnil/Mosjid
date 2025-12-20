import Image from "next/image";
import React from "react";

export default function LossAndFoundTopSection() {
  return (
    <div className="relative overflow-hidden rounded-[20px] ">

      {/* 🔹 Background Image */}
      <Image
        src="/images/offerServices/IslamicName/bg.png" // 🔁 change to your bg image
        alt="Islamic Names Background"
        fill
        priority
        className="object-cover  scale-110 opacity-30"
      />

      {/* 🔹 Overlay (for readability) */}
      <div className="absolute inset-0 bg-[#F9FFF6]/70 " />

      {/* 🔹 Content */}
      <div className="relative px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Left Section */}
        <div>
          <h3 className="text-[#B98C20] text-[36px] font-bold mb-3 pb-3">
            Islamic Names
          </h3>
          <p className="text-[#B98C20] text-base mt-2">
            Islamic names embody faith, heritage, and values, offering children
            identity, blessings, and connection to tradition. They serve as
            gifts of love, guiding lights, and lifelong reminders of culture and
            spirituality.
          </p>


       <div className=" flex  justify-center mt-8">
           <Image
            src="/images/offerServices/LostFound/topsectionIcon.svg" // 🔁 change to your bg image
            alt="Islamic Names Background"
            width={170}
            height={230}
            className=""
          />
       </div>
       <div className="space-y-1">
        <p className="text-[#B98C20] text-base">location:</p>
         <p className="text-[#B98C20] text-base">Visiting Hours:</p>
          <p className="text-[#B98C20] text-base">Contact:</p>
       </div>

        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-[#B98C20] text-[36px] font-bold text-end mb-3 pb-3">
            イスラム教の名前
          </h3>

          <div className="space-y-3 mt-4">
            {[
              { icon: "1.svg", label: "Name List" },
              { icon: "3.svg", label: "Blessed Name" },
              { icon: "2.svg", label: "Search Name" },
              { icon: "3.svg", label: "Islamic Naming Guidelines" },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-[#F7BA2A] bg-white/50  p-4 flex items-center gap-4 rounded-[10px]"
              >
                <Image
                  src={`/images/offerServices/IslamicName/${item.icon}`}
                  alt={item.label}
                  width={50}
                  height={50}
                  className="w-[50px] h-[50px]"
                />
                <span className="text-[#B98C20] text-2xl font-bold">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
