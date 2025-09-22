"use client";

import { Search, MapPin } from "lucide-react";

export default function SearchSection() {
  return (
    <div className="flex items-center gap-3">
      {/* Search Input */}
      <div className="relative flex-1 max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Find a business"
          className="w-full pl-10 pr-4 py-2 border border-green-900 rounded-full focus:outline-none placeholder-gray-400"
        />
      </div>

      {/* Location Input */}
      <div className="relative flex-1 max-w-xs">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Dhaka,1212"
          className="w-full pl-10 pr-4 py-2 border border-green-900 rounded-full focus:outline-none placeholder-gray-400"
        />
      </div>

      {/* Find Button */}
      <button className="bg-[#F5B623] hover:bg-[#e0a320] text-green-900 font-semibold px-7 py-2 rounded-full shadow-md transition text-lg">
        Find
      </button>
    </div>
  );
}
