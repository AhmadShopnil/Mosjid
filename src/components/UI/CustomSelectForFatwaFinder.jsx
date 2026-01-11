"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";


export default function CustomSelectForFatwaFinder({
  options,
  selected,
  setSelected,
  lvl,
  parrent_lvl,
  selectedParrent
}) {

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {

      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);










  return (
    <div ref={containerRef} className="relative w-full">

      {/* Selected Box */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="cursor-pointer w-full h-[56px] border border-gray-200 rounded-md px-3 py-2 bg-white flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        <span className="text-gray-700">
          {selected ? selected?.name_en : lvl}
        </span>
        <ChevronDown
          size={18}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-20 w-full mt-1 p-2 space-y-2 bg-[#EEF8E9] border border-gray-200 rounded-md shadow-md max-h-80 overflow-auto">

          {selectedParrent == null ? (
            <p className="font-medium text-sm text-gray-800">
              Please select {parrent_lvl} at first
            </p>
          ) : (
            <>
              {options?.length > 0 ? (
                options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(option)}
                    className={`cursor-pointer w-full text-left px-4 py-2 rounded-md transition ${selected?.id === option?.id
                        ? "bg-[#C9E9BA] text-green-900"
                        : "bg-white hover:bg-[#C9E9BA]"
                      }`}
                  >
                   <div className="flex justify-between">
                     <span className="font-medium text-sm text-gray-800">
                      {option?.name_en}
                    </span>
                      <span className="font-medium text-sm text-gray-800">
                     Total: {option?.fatwas_count}
                    </span>
                   </div>
                    <p className="text-xs text-gray-500">{option?.name_jp}</p>
                  </button>
                ))
              ) : (
                <p className="font-medium text-sm text-gray-800">
                  No {lvl} Found
                </p>
              )}
            </>
          )}

        </div>
      )}
    </div>
  );
}
