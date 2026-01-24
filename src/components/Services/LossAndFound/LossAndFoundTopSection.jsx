import Image from "next/image";
import React from "react";

export default function LossAndFoundTopSection() {
  return (
    <div className="relative overflow-hidden rounded-[20px] ">

      {/*  Background Image */}
      <Image
        src="/images/offerServices/IslamicName/bg.png"
        alt="Islamic Names Background"
        fill
        priority
        className="object-cover  scale-110 opacity-30"
      />

      {/*  Overlay (for readability) */}
      <div className="absolute inset-0 bg-[#F9FFF6]/70 " />

      {/*  Content */}
      <div className="relative px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Left Section */}
        <div>
          <h3 className="text-[#B98C20] text-[36px] font-bold mb-3 pb-3">
            Book Your Lost & Found
          </h3>
          <p className="text-[#B98C20] text-base mt-2">
            If you’ve lost or found something within the masjid premises, our team is here to help ensure belongings are returned to their rightful owners.
          </p>


          <div className=" flex  justify-center mt-8">
            <Image
              src="/images/offerServices/LostFound/topsectionIcon.svg"
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
              { icon: "1.svg", label: "Lost Item Report" },
              { icon: "3.svg", label: "Lost Items List" },
              { icon: "3.svg", label: "Found Items List" },
              { icon: "3.svg", label: "Guides Line" },
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
