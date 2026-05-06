"use client";
import Image from "next/image";
import React from "react";

import MuslimConversionBookingForm from "./MuslimConversionBookingForm";
import { useAuth } from "@/context/AuthContext";
import SectionTitleRow from "@/components/SectionTitleRow/SectionTitleRow";


const menuList = [
    { icon: "1.svg", label: "Conversion Booking List" },
    { icon: "3.svg", label: "Converted  List" },
    { icon: "2.svg", label: "My Applications" },
    { icon: "3.svg", label: "Conversion Guide Line " },
]


export default function MuslimConvertionTopSection({ onActionClick }) {
    const { isAuthenticated, openAuthModal } = useAuth();

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


                <SectionTitleRow
                    leftTitle={"Muslim Conversion Booking"}
                    rightTitle={"イスラム教改宗予約"}
                />

                {/* <div className="flex flex-wrap justify-between mb-4">
                    <h3 className="text-[#B98C20] text-[36px] font-bold ">
                        Muslim Conversion Booking
                    </h3>
                    <h3 className="text-[#B98C20] text-[36px] font-bold ">
                        イスラム教改宗予約
                    </h3>
                </div> */}

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

                        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 justify-around shadow-xl  rounded-3xl py-8 px-6 ">
                            {menuList.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col  justify-start items-center hover:cursor-pointer gap-4    "
                                    onClick={() => onActionClick && onActionClick(item.label)}
                                >
                                    <div className="w-[50px] h-[50px]  ">
                                        <Image
                                            src={`/images/offerServices/IslamicName/${item.icon}`}
                                            alt={item.label}
                                            width={40}
                                            height={40}
                                            className="w-[50px] h-[50px] mx-auto hover:shadow-2xl  hover:rounded-sm"
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
                        <div className="space-y-3 mt-4 h-full">
                            {isAuthenticated ? (
                                <MuslimConversionBookingForm />
                            ) : (
                                <div className="flex flex-col items-center justify-center space-y-6 text-center bg-white/60 p-8 rounded-2xl h-full shadow-inner border border-green-100 w-full min-h-[400px]">
                                    <div className="text-4xl p-4 rounded-full bg-white text-[#B98C20] shadow-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#B98C20]">Authentication Required</h3>
                                    <p className="text-gray-700 text-base max-w-md">
                                        Please log in or register an account to continue with Muslim Conversion booking.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => openAuthModal("login")}
                                        className="bg-[#58b847] hover:bg-[#4a9f3b] text-white px-10 py-3 rounded-xl font-bold transition-all shadow-md mt-4 cursor-pointer"
                                    >
                                        Quick Login / Register
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
