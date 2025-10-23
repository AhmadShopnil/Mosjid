"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import CustomSelect from "../UI/CustomSelect";

const madhhabs = [
  { name: "Maliki", arabic: "المالكي", jp: "マリキ" },
  { name: "Hanafi", arabic: "الحنفي", jp: "ハナフィー派" },
  { name: "Shafi'i", arabic: "الشافعي", jp: "シャーフィイー派" },
  { name: "Hanbali", arabic: "الحنبلي", jp: "ハンバリ" },
];

export default function FatwaSearchForm() {
  const [selected, setSelected] = useState("Hanafi");

  return (
    <div className="w-full bg-[#F6FFF8] rounded-md p-4 md:p-6 flex flex-col md:flex-row gap-4">
      {/* Left Section */}
      <div className="w-full md:w-[530px] flex flex-col gap-3">
        {madhhabs.map((m) => (
          <button
            key={m.name}
            onClick={() => setSelected(m.name)}

            className={`flex flex-col justify-center h-[56px] items-center py-3 rounded-md text-sm font-semibold transition-all duration-300
              ${selected === m.name
                ? "gradient-bg-fatwah-finder text-white shadow"
                : "bg-[#D7EFD8] hover:bg-[#C9E8CA]"
              }`}

          // className={`flex flex-col justify-center h-[56px] items-center py-3 rounded-md text-sm font-semibold transition-all duration-300
          //   ${
          //     selected === m.name
          //       ? "bg-gradient-to-r from-[#0EBD65] via-[#4DDE5E] to-[#8AE52E] text-white shadow"
          //       : "bg-[#D7EFD8] hover:bg-[#C9E8CA]"
          //   }`}

          >
            <span className="text-sm font-bold">{m.arabic}</span>
            <span className="text-sm font-bold">{m.jp}</span>
          </button>
        ))}
      </div>

      {/* Right Section */}
      <form className=" flex flex-col gap-3  w-full">
        {/* Row 1 */}
        <div className="flex gap-2 h-[56px]">
          <div className="w-1/2">
            <CustomSelect options={ [
              { labelEn: "Madrassa", labelJp: "マドラサ" },
              { labelEn: "Mosque", labelJp: "モスク" },
              { labelEn: "Cemetery", labelJp: "墓地" },
              { labelEn: "Converted Muslim", labelJp: "改宗したイスラム教徒" },
            ]} />
          </div>
          <input
            type="text"
            placeholder="By Word..."
            className="w-1/2 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>


        {/* Row 2 */}
        <div className="flex gap-2 h-[56px]">
          <select className="w-1/2 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400">
            <option>Chapter</option>
          </select>
          <input
            type="text"
            placeholder="Fatwa By Number..."
            className="w-1/2 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Row 3 */}
        <div className="flex gap-2  h-[56px] ">
          <select className="w-1/2 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400">
            <option>Section</option>
          </select>
          <input
            type="text"
            placeholder="Fatwa Verify By Number..."
            className="w-1/2 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Search Button */}
        <div className="sm:col-span-2 lg:col-span-3 flex justify-center  h-[56px]">
          <button
            type="submit"
            className="w-full text-lg  flex items-center justify-center gap-2 bg-[#F7BA2A] hover:bg-[#f0aa00] text-[#00401A]  py-2 rounded-md transition"
          >
            <Search size={18} />
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
