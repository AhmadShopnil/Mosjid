"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function IslamicCurriculum() {
  return (
    <section className="w-full bg-[#f7fff0] py-10">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between bg-green-500 text-white rounded-md px-4 py-2">
          <span className="font-semibold">イスラーム学校</span>
          <span className="font-semibold">منهج المدرسة الإسلامية</span>
        </div>

        {/* Main Grid */}
        <div className="relative mt-10 border-2 border-yellow-400 rounded-xl p-6">
          {/* Center Logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white rounded-full p-4 shadow-lg">
              <Image
                src="/logo.png"
                alt="Islamic School"
                width={120}
                height={120}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {leftLevels.map((item) => (
                <LevelCard key={item.no} {...item} align="left" />
              ))}
            </div>

            <div />

            {/* Right Column */}
            <div className="space-y-4">
              {rightLevels.map((item) => (
                <LevelCard key={item.no} {...item} align="right" />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-2 border-yellow-400 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">Z</div>
            <h3 className="text-lg font-semibold">Maktab & Nazirah Foundation (Age 3–6)</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <FocusCard key={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LevelCard({ no, title, align }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-4 border border-yellow-300 rounded-lg p-3 bg-white"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-lg border border-yellow-400 text-yellow-600 font-bold">
        {no}
      </div>
      <p className="text-sm font-medium text-gray-700">{title}</p>
    </motion.div>
  );
}

function FocusCard() {
  return (
    <div className="border border-green-400 rounded-xl p-4 bg-white">
      <h4 className="text-sm font-semibold text-green-600 text-center mb-3">Focus Areas</h4>
      <ul className="space-y-2 text-sm text-gray-600">
        {[1, 2, 3, 4].map((i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            Nazirah of the Qur’an (recitation)
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <button className="text-xs text-green-600">View More</button>
        <button className="text-xs bg-green-500 text-white px-3 py-1 rounded">See in Japanese</button>
      </div>
    </div>
  );
}

const leftLevels = [
  { no: "01", title: "Maktab Foundation" },
  { no: "02", title: "Primary School + Hifz Continuation" },
  { no: "03", title: "Elementary + Full Time Hifz" },
  { no: "04", title: "Middle School + Junior Aalim" },
];

const rightLevels = [
  { no: "05", title: "High School + Thanaviya Aamma" },
  { no: "06", title: "Senior High / Pre-University + Thanaviya Khassa" },
  { no: "07", title: "University + Aaliya (Advanced Level)" },
  { no: "08", title: "Postgraduate + Aalimiyyah & Takhassus" },
];