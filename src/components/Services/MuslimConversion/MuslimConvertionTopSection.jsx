"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

import MuslimConversionBookingForm from "./MuslimConversionBookingForm";
import { useAuth } from "@/context/AuthContext";
import SectionTitleRow from "@/components/SectionTitleRow/SectionTitleRow";


const menuList = [
    { icon: "1.svg", label: "Conversion Booking List" ,label2: "変換予約"},
    { icon: "3.svg", label: "Converted  List",label2: "変換されたリスト" },
    { icon: "2.svg", label: "My Applications",label2: "私のアプリケーション" },
    { icon: "3.svg", label: "Conversion Guide Line " ,label2: "変換ガイドライン"},
]


export default function MuslimConvertionTopSection({ onActionClick,setRefreshBookings }) {
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
                               A dedicated initiative of Osaka Masjid providing Shahadah services, Islamic education, mentoring, community support, and spiritual guidance for new Muslims.
                            </p>
                        </div>


                        <div className=" flex  justify-center my-8">
                            <Image
                                src="/images/offerServices/muslimConvertion/muslim-convertion.svg"
                                alt="Islamic Names Background"
                                width={550}
                                height={200}
                                className=""
                            />
                        </div>

                        {/* Menu Buttons  */}
                        <div className="mt-10 rounded-[30px] p-4 lg:p-6 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] flex flex-wrap justify-around items-stretch gap-y-4 gap-x-2">
                            {menuList?.map((item, i) => (
                                <React.Fragment key={i}>
                                    {i > 0 && (
                                        <div className="hidden sm:flex items-center">
                                            <div className="h-[80px] w-[2px] bg-[#F7BA2A]/40" />
                                        </div>
                                    )}
                                    <motion.div
                                        onClick={() => onActionClick && onActionClick(item.label)}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                        className="flex flex-col items-center text-center cursor-pointer transition w-24"
                                    >
                                        <Image
                                            src={`/images/offerServices/IslamicName/${item.icon}`}
                                            alt={item.label}
                                            width={50}
                                            height={50}
                                            className="w-[50px] h-[50px] mx-auto"
                                        />
                                        <div className="font-bold text-sm mt-1">
                                            <span className="text-[#B98C20] block leading-snug">{item.label}</span>
                                            <span className="text-[#00401A] block leading-snug">{item.label2}</span>
                                        </div>
                                    </motion.div>
                                </React.Fragment>
                            ))}
                        </div>


                    </div>

                    {/* Right Section */}
                    <div>
                        <div className="space-y-3 mt-4 h-full">
                            {isAuthenticated ? (
                                <MuslimConversionBookingForm  setRefreshBookings={setRefreshBookings}/>
                            ) : (
                                <div className="flex flex-col items-center justify-center space-y-6 text-center bg-white/60 p-4 lg:p-8 rounded-2xl h-full shadow-inner border border-green-100 w-full min-h-[400px]">
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
