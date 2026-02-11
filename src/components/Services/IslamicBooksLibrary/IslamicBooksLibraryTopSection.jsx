"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

/* ---------------- animation variants (shared) ---------------- */

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

export default function IslamicBooksLibraryTopSection() {
  return (
    <motion.div
      className="relative overflow-hidden rounded-[20px] border border-gray-200"
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
          alt="Islamic Books Library Background"
          fill
          priority
          className="object-cover opacity-30"
        />
      </motion.div>

      {/* 🔹 Overlay */}
      <div className="absolute inset-0 bg-[#F9FFF6]/70" />

      {/* 🔹 Content */}
      <div className="relative px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <motion.div variants={fadeLeft}>
          <motion.h3
            variants={fadeUp}
            className="text-[#B98C20] text-[36px] font-bold mb-3 pb-3"
          >
            Islamic Books Library
          </motion.h3>

          <motion.p variants={fadeUp} className="text-[#B98C20] text-base mt-2">
            Welcome to the House of Allah. We ask all visitors to uphold modesty,
            respect, and cleanliness during their time in the Masjid.
          </motion.p>

          {/* Floating Book Illustration */}
          <motion.div
            className="w-full flex justify-center mt-6 md:mt-12"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/images/offerServices/book.svg"
              alt="Islamic Book"
              width={200}
              height={200}
              className="object-contain"
            />
          </motion.div>
        </motion.div>

        {/* Right Section */}
        <motion.div variants={fadeRight}>
          <motion.h3
            variants={fadeUp}
            className="text-[#B98C20] text-[36px] font-bold text-end mb-3 pb-3"
          >
            イスラム教の書籍
          </motion.h3>

          <motion.div className="space-y-3 mt-4" variants={container}>
            {[
              { icon: "1.svg", label: "Book Your Visit" },
              { icon: "3.svg", label: "Visitor Booking List" },
              { icon: "2.svg", label: "Visitor Record" },
              { icon: "3.svg", label: "Visitor Guidelines" },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.03, y: -2 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="border border-[#F7BA2A] bg-white/60 p-4 flex items-center gap-4 rounded-[10px]"
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
        </motion.div>
      </div>
    </motion.div>
  );
}
