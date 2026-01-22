import Image from "next/image";
import React from "react";

import MuslimConversionBookingForm from "./MuslimConversionBookingForm";


const menuList = [
    { icon: "1.svg", label: "Conversion Booking" },
    { icon: "3.svg", label: "Converted  List" },
    { icon: "2.svg", label: "Conversion Form" },
    { icon: "3.svg", label: "Conversion Guide Line " },
]


export default function MuslimConvertionTopSection() {
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
            <div className="relative px-4 sm:px-6 py-10 ">

                <div className="flex flex-wrap justify-between mb-4">
                    <h3 className="text-[#B98C20] text-[36px] font-bold ">
                        Muslim Conversion Booking
                    </h3>
                    <h3 className="text-[#B98C20] text-[36px] font-bold ">
                        イスラム教改宗予約
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Section */}
                    <div className="flex flex-col ">
                        <div className="">


                            <p className="text-[#B98C20] text-base mt-2">
                                Schedule your Shahada ceremony with our masjid and begin your journey into Islam, embracing a path of faith, peace, and spiritual growth
                            </p>
                        </div>


                        <div className=" flex  justify-center my-8">
                            <Image
                                src="/images/offerServices/muslim-convertion.svg"
                                alt="Islamic Names Background"
                                width={550}
                                height={200}
                                className=""
                            />
                        </div>

                        <div className="mt-10 grid grid-cols-4 gap-4 justify-around shadow-2xl  rounded-3xl py-8 px-6 ">
                            {menuList.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col  justify-start items-center hover:cursor-pointer gap-4    "
                                >
                                    <div className="w-[50px] h-[50px]  ">
                                        <Image
                                            src={`/images/offerServices/IslamicName/${item.icon}`}
                                            alt={item.label}
                                            width={40}
                                            height={40}
                                            className="w-[50px] h-[50px] mx-auto hover:shadow-2xl hover:bg-white hover:rounded-sm"
                                        />
                                    </div>
                                    <span className="text-[#B98C20] text-center text-sm md:text-base font-bold w-28">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>


                    </div>

                    {/* Right Section */}
                    <div>

                        <div className="space-y-3 mt-4">
                            <MuslimConversionBookingForm />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
