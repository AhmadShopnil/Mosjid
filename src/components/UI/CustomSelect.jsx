"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";




export default function CustomSelect({options}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Selected Box */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="w-full h-[56px] border border-gray-200 rounded-md px-3 py-2 bg-white flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        <span className="text-gray-700">
          {selected ? selected.labelEn : "Select"}
        </span>
        <ChevronDown
          size={18}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute z-20 w-full mt-1 p-2 space-y-2 bg-[#EEF8E9] border border-gray-200 rounded-md 
        shadow-md max-h-80 overflow-auto">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(option)}
              className={`w-full text-left px-4 py-2 rounded-md transition  ${
                selected?.labelEn === option.labelEn
                  ? "bg-[#C9E9BA] text-green-900"
                  : " bg-white hover:bg-[#C9E9BA]"
              }`}
            >
              <p className="font-medium text-sm text-gray-800">
                {option.labelEn}
              </p>
              <p className="text-xs text-gray-500">{option.labelJp}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
