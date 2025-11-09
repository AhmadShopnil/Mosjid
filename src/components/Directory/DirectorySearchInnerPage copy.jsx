"use client";

import { Search, MapPin } from "lucide-react";
import CustomSelectRoundedWhite from "../UI/CustomSelectRoundedWhite";

export default function DirectorySearchInnerPage() {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-start gap-4 flex-wrap">

      {/* Search Input */}
      <div className="relative w-full sm:w-[280px] md:w-[230px] ">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Find a business"
          className="w-full h-[56px] pl-10 pr-4 py-3 border border-green-900 rounded-full focus:outline-none placeholder-gray-400"
        />
      </div>

      {/* Location Input */}
      <div className="relative w-full sm:w-[280px] md:w-[240px]">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Dhaka,1212"
          className="w-full h-[56px] pl-10 pr-4 py-3 border border-green-900 rounded-full focus:outline-none placeholder-gray-400"
        />
      </div>

      {/* Another Input (Optional) */}
      <div className="relative w-full sm:w-[280px] md:w-[240px]">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Another filter"
          className="w-full h-[56px] pl-10 pr-4 py-3 border border-green-900 rounded-full focus:outline-none placeholder-gray-400"
        />
      </div>

      {/* Find Button */}
      <button
        className="h-[56px] bg-[#F7BA2A] hover:bg-[#f8c645] text-[#00401A] font-semibold px-10 py-3 rounded-full 
        shadow-md transition text-lg w-full sm:w-auto"
      >
        Find
      </button>
    </div>
  );
}
