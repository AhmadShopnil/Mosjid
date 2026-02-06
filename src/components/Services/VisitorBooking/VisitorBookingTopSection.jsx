import Image from "next/image";
import React from "react";

export default function VisitorBookingTopSection() {
    return (
        <div className="relative overflow-hidden rounded-[20px] border border-gray-200">

            {/*  Background Image */}
            <Image
                src="/images/offerServices/IslamicName/bg.png"
                alt="Islamic Names Background"
                fill
                priority
                className="object-cover  scale-110 opacity-30"
            />

            {/* 🔹 Overlay (for readability) */}
            <div className="absolute inset-0 bg-[#F9FFF6]/70 " />

            {/* 🔹 Content */}
            <div className="relative px-4 sm:px-6 py-14 ">
                {/* title */}
                <div className="flex flex-wrap justify-between">
                    <h3 className="text-[#B98C20] text-[30px] md:text-[36px] font-bold mb-1 pb-1 md:mb-3 md:pb-3">
                        Masjid Visitation
                    </h3>
                    <h3 className="text-[#B98C20] text-[30px] md:text-[36px] font-bold text-end mb-3 pb-3">
                        モスク訪問
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Section */}
                    <div>

                        <p className="text-[#B98C20] text-base mt-2 ">
                            Welcome to the House of Allah. We ask all visitors to uphold modesty, respect, and cleanliness during their time in the Masjid.
                        </p>

                        <div className="">
                            <div className="w-full flex justify-center mt-2 md:mt-8 h-full">
                                <Image
                                    src="/images/offerServices/visitor-booking.svg"
                                    alt="book"
                                    width={160}
                                    height={200}
                                    className="object-contain"
                                />
                            </div>

                            <div className="mt-2 space-y-2">

                                <p className="text-[#B98C20] text-base mt-2 ">
                                    location:4-12-16 owada nishi yodogawa ku osaka shi,osaka fu, japan.
                                </p>
                                <p className="text-[#B98C20] text-base mt-2 ">
                                 Visiting Hours:13.30 to 1700
                                </p>
                                <p className="text-[#B98C20] text-base mt-2 ">
                                    Contact:080-3822 4143
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Right Section */}
                    <div>
                        {/* <h3 className="text-[#B98C20] text-[36px] font-bold text-end mb-3 pb-3">
                        イスラム教の名前
                    </h3> */}

                        <div className="space-y-3 mt-4">
                            {[
                                { icon: "1.svg", label: "Halal Certificate Form" },
                                { icon: "3.svg", label: "Halal Certified List" },
                                { icon: "2.svg", label: "Issuing Rules of Halal Certification" },
                                { icon: "3.svg", label: "Visitor Guides Line" },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="border border-[#F7BA2A] bg-white/50   p-2.5 md:p-4 gap-2 md:gap-4  flex items-center rounded-[10px]"
                                >
                                    <Image
                                        src={`/images/offerServices/IslamicName/${item.icon}`}
                                        alt={item.label}
                                        width={50}
                                        height={50}
                                        className="w-[36px] h-[36px] md:w-[50px] md:h-[50px]"
                                    />
                                    <span className="text-[#B98C20] text-lg sm:text-xl md:text-2xl font-bold">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
