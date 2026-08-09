"use client";

import Image from "next/image";
import React from "react";
import BurialBookingForm from "./BurialBookingForm";
import { useAuth } from "@/context/AuthContext";
import SectionTitleRow from "@/components/SectionTitleRow/SectionTitleRow";
import { motion } from "framer-motion";

/* animation variants */
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const menuList = [
    { icon: "1.svg", label: "Booking List\n", label2: "予約一覧" },
    { icon: "3.svg", label: "Burial Register\n", label2: "埋葬登録簿" },
    { icon: "3.svg", label: "Burial Policies\n", label2: "埋葬ポリシー" },
];

export default function BurialBookingTopSection({ onSuccess, onActionClick, formRef }) {
    const { isAuthenticated, openAuthModal } = useAuth();

    return (
        <motion.section
            ref={formRef}
            className="relative overflow-hidden rounded-[30px] border border-gray-200 mt-8 scroll-mt-32"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={container}
        >
            {/* Animated Background Image */}
            <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 8, ease: "easeOut" }}
            >
                <Image
                    src="/images/offerServices/IslamicName/bg.png"
                    alt="Burial Booking Background"
                    fill
                    priority
                    className="object-cover opacity-30"
                />
            </motion.div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-[#F9FFF6]/70" />

            <div className="relative p-4 lg:p-7">
                <SectionTitleRow
                    leftTitle={"Burial Booking"}
                    rightTitle={"埋葬予約"}
                />

                <div className="bg-orange-50/30 flex items-center justify-center p-0 md:p-2 lg:p-6 rounded-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
                        {/* LEFT */}
                        <motion.div className="flex flex-col" variants={fadeLeft}>
                            <p className="text-[#B98C20] mb-6">
                                As a sacred place of rest for our community, it is filled with peace, dignity, and remembrance — a place where faith and bonds honor those who came before us.
                                <br />
                                私たちの共同体の聖なる安息の場として、平和と尊厳と追憶に満ち、信仰と絆が先人を敬う場所です。
                            </p>

                            <div className="flex justify-center my-8">
                                <Image
                                    src="/images/offerServices/burial.svg"
                                    alt="Burial Icon"
                                    width={190}
                                    height={200}
                                    className="object-contain"
                                />
                            </div>

                            <div className="rounded-[30px] p-4 lg:p-6 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] mt-auto flex flex-wrap justify-around items-end gap-3">
                                {menuList.map((item, i) => (
                                    <React.Fragment key={i}>
                                        {i > 0 && (
                                            <div className="hidden sm:block h-[50px] w-[2px] bg-[#F7BA2A]/40 self-center" />
                                        )}
                                        <motion.div
                                            onClick={() => onActionClick && onActionClick(item.label.trim())}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                            className="flex flex-col items-center text-center cursor-pointer transition"
                                        >
                                            <img
                                                src={`/images/offerServices/IslamicName/${item.icon}`}
                                                alt=""
                                            />
                                            <div className="text-[#B98C20] font-bold text-base whitespace-pre-wrap">
                                                <span>{item.label}</span>
                                                <span className="text-[#00401A]">{item.label2}</span>
                                            </div>
                                        </motion.div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </motion.div>

                        {/* RIGHT */}
                        <motion.div variants={fadeRight} className="w-full">
                            {isAuthenticated ? (
                                <BurialBookingForm onSuccess={onSuccess} />
                            ) : (
                                <div className="flex flex-col items-center justify-center space-y-6 text-center bg-white/60 p-8 rounded-2xl h-full shadow-inner border border-orange-100 w-full min-h-[400px]">
                                    <div className="text-4xl p-4 rounded-full bg-white text-[#B98C20] shadow-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
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
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
