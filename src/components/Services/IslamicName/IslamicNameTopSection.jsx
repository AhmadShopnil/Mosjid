"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

/* ---------------- animation variants ---------------- */

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

export default function IslamicNameTopSection() {
  return (
    <motion.div
      className="relative overflow-hidden rounded-[20px] border border-gray-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={container}
    >
      {/* 🔹 Animated Background Image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
      >
        <Image
          src="/images/offerServices/IslamicName/bg.png"
          alt="Islamic Names Background"
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
        <motion.div variants={fadeLeft} className="flex flex-col">
          <div>
            <motion.h3
              variants={fadeUp}
              className="text-[#B98C20] text-[30px] md:text-[36px] font-bold mb-3 pb-3"
            >
              Islamic Names
            </motion.h3>

            <motion.p
              variants={fadeUp}
              className="text-[#B98C20] text-base mt-2"
            >
              Islamic names embody faith, heritage, and values, offering children
              identity, blessings, and connection to tradition. They serve as
              gifts of love, guiding lights, and lifelong reminders of culture and
              spirituality.
            </motion.p>
          </div>

          {/* Floating Dua Image */}
          <motion.div
            className="flex justify-center my-8"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/images/offerServices/dua.svg"
              alt="Dua Illustration"
              width={190}
              height={200}
            />
          </motion.div>
        </motion.div>

        {/* Right Section */}
        <motion.div variants={fadeRight}>
          <motion.h3
            variants={fadeUp}
            className="text-[#B98C20] text-[30px] md:text-[36px] font-bold text-end mb-3 pb-3"
          >
            イスラム教の名前
          </motion.h3>

          <motion.div
            className="space-y-3 mt-4"
            variants={container}
          >
            {[
              { icon: "1.svg", label: "Name List" },
              { icon: "3.svg", label: "Blessed Name" },
              { icon: "2.svg", label: "Search Name" },
              { icon: "3.svg", label: "Islamic Naming Guidelines" },
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
