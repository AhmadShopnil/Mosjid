import Image from "next/image";
import React from "react";
import BurialBookingForm from "./BurialBookingForm";


const menuList = [
    { icon: "1.svg", label: "Booking List" },
    { icon: "3.svg", label: "Burial Register" },
    { icon: "2.svg", label: "Burial Form" },
    { icon: "3.svg", label: "Burial Policies" },
]


export default function BurialBookingTopSection() {
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

            {/*  Overlay  */}
            <div className="absolute inset-0 bg-[#F9FFF6]/70 " />

            {/*  Content */}
            <div className="relative px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Left Section */}
                <div className="flex flex-col ">
                    <div className="">
                        <h3 className="text-[#B98C20] text-[36px] font-bold mb-3 pb-3">
                            Burial Booking
                        </h3>
                        <p className="text-[#B98C20] text-base mt-2">
                            As a sacred place of rest for our community, it is filled with peace, dignity, and remembrance — a place where faith and bonds honor those who came before us.”
                            私たちの共同体の聖なる安息の場として、平和と尊厳と追憶に満ち、信仰と絆が先人を敬う場所です
                        </p>
                    </div>


                    <div className=" flex  justify-center my-8">
                        <Image
                            src="/images/offerServices/burial.svg" //  change to your bg image
                            alt="Islamic Names Background"
                            width={190}
                            height={200}
                            className=""
                        />
                    </div>

                    <div className="mt-10 flex flex-wrap gap-4 justify-around  border-2 border-[#F7BA2A] rounded-xl p-4 ">
                        {menuList.map((item, i) => (
                            <div
                                key={i}
                                className=" bg-white/50  pr-4  flex flex-col justify-center items-center border-r-2 border-r-gray-300 "
                            >
                                <div className="w-[50px] h-[50px]">
                                    <Image
                                        src={`/images/offerServices/IslamicName/${item.icon}`}
                                        alt={item.label}
                                        width={40}
                                        height={40}
                                        className="w-[40px] h-[40px] "
                                    />
                                </div>
                                <span className="text-[#B98C20] text-base font-bold">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>


                </div>

                {/* Right Section */}
                <div>
                    <h3 className="text-[#B98C20] text-[36px] font-bold text-end mb-3 pb-3">
                         埋葬予約
                    </h3>

                    <div className="space-y-3 mt-4">
                        <BurialBookingForm />
                    </div>
                </div>

            </div>
        </div>
    );
}
