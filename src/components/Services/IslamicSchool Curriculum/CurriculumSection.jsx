"use client";

import { motion } from "framer-motion";

export default function CurriculumSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="relative bg-[#F3FBEA] border-[6px] border-[#FFC83D] rounded-[36px] p-6 md:p-10">

        {/* Level Badge */}
        <div className="absolute -top-5 -left-5 w-14 h-14 bg-[#0B78D0] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
          01
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#C48A00]">
              Maktab Foundation
            </h2>
            <p className="text-[#C48A00] font-medium">Ages: 3–6</p>
          </div>

          <div className="text-right">
            <h3 className="text-lg font-bold text-[#C48A00]">
              マクタブ基礎課程
            </h3>
            <p className="text-[#C48A00] font-medium">3～6歳</p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            title="Academic Focus"
            items={[
              "Basic literacy",
              "Numeracy",
              "General knowledge",
              "Early social skills",
            ]}
          />

          <InfoCard
            title="Religious Focus"
            items={[
              "Qaida Nooraniyah",
              "Nazirah al-Qur’an",
              "Akhlaq (manners)",
              "Seerah stories",
            ]}
          />

          <InfoCard
            title="Outcomes"
            items={[
              "Islamic Etiquette",
              "Child ready for schooling",
              "Qur’an recitation fluency",
              "Spiritual Maturity",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

/* ===============================
   CARD COMPONENT
================================ */
function InfoCard({
  title,
  items,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white border-2 border-[#1E7F1E] rounded-2xl p-5 flex flex-col justify-between"
    >
      {/* Header */}
      <div className="inline-block bg-[#56B820] text-white text-sm font-semibold px-4 py-1 rounded-full mb-4 self-start">
        {title}
      </div>

      {/* List */}
      <ul className="space-y-3 mb-6">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-gray-700">
            <span className="w-3 h-3 bg-[#56B820] rounded-full mt-1.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Buttons */}
      <div className="flex gap-3">
        <button className="flex-1 bg-[#E6F6DA] text-[#1E7F1E] font-medium py-2 rounded-lg hover:bg-[#d9f0c8] transition">
          View in Details
        </button>
        <button className="flex-1 bg-[#56B820] text-white font-medium py-2 rounded-lg hover:bg-[#4aa71d] transition">
          View in Japanese
        </button>
      </div>
    </motion.div>
  );
}
