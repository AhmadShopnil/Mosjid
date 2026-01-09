"use client";

import React, { useState } from "react";
import { XCircle } from "lucide-react"; // optional: nice clear icon

export default function FindBySearch({
  button_text = "Find",
  onSearch = () => { },
}) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const isDisabled = false;

  // run search
  const handleSearch = () => {
    onSearch({ name, number });
  };

  // clear inputs
  const handleClear = () => {
    setName("");
    setNumber("");
    onSearch({ name: "", number: "" });
  };

  return (
    <div
      className={`borderDonationHome shadow-md bg-white px-5 sm:px-6 py-5 sm:py-10 rounded-2xl ${isDisabled ? "opacity-50 pointer-events-none select-none" : ""
        }`}
    >
      <div className="flex items-center flex-col lg:flex-row gap-3">
        {/* By Name */}
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="By Name"
            disabled={isDisabled}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`h-[54px] w-full pl-10 pr-4 py-3 
              border border-green-900 rounded-full 
              placeholder-gray-400 placeholder:text-sm
              focus:border-transparent focus:ring-2 focus:ring-[#F7BA2A]
              ${isDisabled
                ? "cursor-not-allowed bg-gray-100"
                : "focus:outline-none"
              }`}
          />
        </div>

        {/* By Number */}
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="By Number"
            disabled={isDisabled}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className={`h-[54px] w-full pl-10 pr-4 py-3 
                      border border-green-900 rounded-full 
                      placeholder-gray-400 placeholder:text-sm
                      focus:border-transparent focus:ring-2 focus:ring-[#F7BA2A]
                      ${isDisabled
                ? "cursor-not-allowed bg-gray-100"
                : "focus:outline-none"
              }`}
          // className={`h-[54px] w-full pl-10 pr-4 py-3 border border-green-900 
          //   rounded-full placeholder-gray-400 placeholder:text-sm ${isDisabled ? "cursor-not-allowed bg-gray-100" : "focus:outline-none focus:ring-2 focus:ring-[#F7BA2A]"
          //   }`}
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={isDisabled}
          className={`bg-[#F7BA2A] w-full lg:w-auto text-[#00401A] h-[56px] font-bold px-6 py-3 rounded-full shadow-md transition text-lg hover:bg-[#e0a520]`}
        >
          {button_text}
        </button>

        {/* Clear Button */}
        <button
          onClick={handleClear}
          disabled={isDisabled}
          className={`flex w-full lg:w-auto items-center justify-center gap-1 h-[56px] px-4 py-3 rounded-full border border-gray-300 text-gray-700 font-semibold transition hover:bg-gray-100 hover:text-gray-900`}
        >
          <XCircle className="w-5 h-5" />
          Clear
        </button>
      </div>
    </div>
  );
}
