"use client";

import Image from "next/image";
import React from "react";
import BurialBookingForm from "./BurialBookingForm";
import { useAuth } from "@/context/AuthContext";

const menuList = [
    { icon: "1.svg", label: "Booking List" },
    { icon: "3.svg", label: "Burial Register" },
    { icon: "3.svg", label: "Burial Policies" },
];

export default function BurialBookingTopSection({ onSuccess, onActionClick, formRef }) {
    const { isAuthenticated, openAuthModal } = useAuth();

    return (
        <div ref={formRef} className="relative overflow-hidden rounded-[20px] scroll-mt-32">
            {/* Background Image */}
            <Image
                src="/images/offerServices/IslamicName/bg.png"
                alt="Islamic Names Background"
                fill
                priority
                className="object-cover scale-110 opacity-30"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-[#F9FFF6]/70" />

            {/* Content */}
            <div className="relative px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Section */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h3 className="text-[#B98C20] text-[36px] font-bold mb-3 pb-3">
                            Burial Booking
                        </h3>
                        <p className="text-[#B98C20] text-base mt-2">
                            As a sacred place of rest for our community, it is filled with peace, dignity, and remembrance — a place where faith and bonds honor those who came before us.
                            <br />
                            私たちの共同体の聖なる安息の場として、平和と尊厳と追憶に満ち、信仰と絆が先人を敬う場所です。
                        </p>
                    </div>

                    <div className="flex justify-center my-8">
                        <Image
                            src="/images/offerServices/burial.svg"
                            alt="Burial Icon"
                            width={190}
                            height={200}
                            className="object-contain"
                        />
                    </div>

                    <div className="mt-10 flex flex-wrap gap-4 justify-around border-2 border-[#F7BA2A] rounded-xl p-4 bg-white/30">
                        {menuList.map((item, i) => (
                            <div
                                key={i}
                                onClick={() => onActionClick && onActionClick(item.label)}
                                className="cursor-pointer hover:bg-white/40 p-2 rounded-lg transition flex flex-col justify-center items-center flex-1 min-w-[80px]"
                            >
                                <div className="w-[40px] h-[40px] relative mb-1">
                                    <Image
                                        src={`/images/offerServices/IslamicName/${item.icon}`}
                                        alt={item.label}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-[#B98C20] text-sm md:text-base font-bold text-center">
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
                        {isAuthenticated ? (
                            <BurialBookingForm onSuccess={onSuccess} />
                        ) : (
                            <div className="flex flex-col items-center justify-center space-y-6 text-center bg-white/80 p-8 rounded-2xl h-full shadow-inner border border-orange-100 min-h-[400px]">
                                <div className="text-4xl p-4 rounded-full bg-white text-[#B98C20] shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-[#B98C20]">Authentication Required</h3>
                                <p className="text-gray-700 text-base max-w-md">
                                    Please log in or register an account to continue with Burial Booking.
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
    );
}
