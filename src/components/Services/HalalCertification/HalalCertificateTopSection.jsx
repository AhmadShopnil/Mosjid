"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export default function HalalCertificateTopSection() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[20px] border border-gray-200"
        >
            {/* Background Image */}
            <motion.div
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 0.3 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
            >
                <Image
                    src="/images/offerServices/IslamicName/bg.png"
                    alt="Islamic Names Background"
                    fill
                    priority
                    className="object-cover"
                />
            </motion.div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-[#F9FFF6]/70" />

            {/* Content */}
            <div className="relative px-4 sm:px-6 py-14">
                {/* Titles */}
                <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-wrap justify-between"
                >
                    <h3 className="text-[#B98C20] text-[36px] font-bold mb-3 pb-3">
                        HALAL CERTIFICATE
                    </h3>
                    <h3 className="text-[#B98C20] text-[36px] font-bold text-end mb-3 pb-3">
                        ハラール認証
                    </h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Section */}
                    <motion.div
                        initial={{ x: -40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p className="text-[#B98C20] text-base mt-2">
                            Welcome to the House of Allah. We ask all visitors to uphold modesty,
                            respect, and cleanliness during their time in the Masjid.
                        </p>

                        <div className="w-full flex justify-center mt-4 md:mt-12">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <Image
                                    src="/images/offerServices/halal-certification.svg"
                                    alt="Halal Certificate"
                                    width={180}
                                    height={200}
                                    className="object-contain"
                                />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Section */}
                    <motion.div
                        initial={{ x: 40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="space-y-3 mt-4"
                    >
                        {[
                            { icon: "1.svg", label: "Halal Certificate Form" },
                            { icon: "3.svg", label: "Halal Certified List" },
                            { icon: "2.svg", label: "Issuing Rules of Halal Certification" },
                            { icon: "3.svg", label: "Visitor Guides Line" },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 + i * 0.15 }}
                                className="border border-[#F7BA2A] bg-white/50 p-4 flex items-center gap-4 rounded-[10px]"
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
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
