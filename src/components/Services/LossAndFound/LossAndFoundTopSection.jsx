"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";


const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
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

export default function LossAndFoundTopSection() {
  return (
    <motion.div
      className="relative overflow-hidden rounded-[20px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={container}
    >
      {/* 🔹 Animated Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
      >
        <Image
          src="/images/offerServices/IslamicName/bg.png"
          alt="Lost & Found Background"
          fill
          priority
          className="object-cover opacity-30"
        />
      </motion.div>

      {/* 🔹 Overlay */}
      <div className="absolute inset-0 bg-[#F9FFF6]/70" />

      {/* 🔹 Content */}
      <div className="relative px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <motion.div variants={fadeLeft}>
          <motion.h3
            variants={fadeUp}
            className="text-[#B98C20] text-[30px] md:text-[36px] font-bold mb-3 pb-3"
          >
            Book Your Lost & Found
          </motion.h3>

          <motion.p variants={fadeUp} className="text-[#B98C20] text-base mt-2">
            If you’ve lost or found something within the masjid premises, our team
            is here to help ensure belongings are returned to their rightful owners.
          </motion.p>

          {/* Floating Icon */}
          <motion.div
            className="flex justify-center mt-8"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/images/offerServices/LostFound/topsectionIcon.svg"
              alt="Lost & Found"
              width={170}
              height={230}
            />
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-1 mt-4">
            <p className="text-[#B98C20] text-base">Location:</p>
            <p className="text-[#B98C20] text-base">Visiting Hours:</p>
            <p className="text-[#B98C20] text-base">Contact:</p>
          </motion.div>
        </motion.div>

        {/* Right Section */}
        <motion.div variants={fadeRight}>
          <motion.h3
            variants={fadeUp}
            className="text-[#B98C20] text-[30px] md:text-[36px] font-bold text-end mb-3 pb-3"
          >
            遺失物・拾得物
          </motion.h3>

          <motion.div
            className="space-y-3 mt-4"
            variants={container}
          >
            {[
              { icon: "1.svg", label: "Lost Item Report" },
              { icon: "3.svg", label: "Lost Items List" },
              { icon: "3.svg", label: "Found Items List" },
              { icon: "3.svg", label: "Guides Line" },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.03, y: -2 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="border border-[#F7BA2A] bg-white/60 p-2.5 md:p-4 flex items-center gap-3 md:gap-4 rounded-[10px]"
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
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
