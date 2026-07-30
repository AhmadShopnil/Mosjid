"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function CustomSelectSimple({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  className = ""
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const handleSelect = (option) => {
    onChange(option.value);
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

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Selected Box */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="cursor-pointer w-full border border-green-900 rounded-[10px] h-[48px] md:h-[54px] text-sm md:text-base px-2 md:px-4 bg-white flex justify-between items-center focus:outline-none focus:ring-1 focus:ring-green-900"
      >
        <span className="text-gray-700 text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={18}
          className={`transition-transform text-gray-500 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute z-20 w-full mt-1 p-2 space-y-2 bg-[#EEF8E9] border border-gray-200 rounded-[10px] 
        shadow-lg max-h-60 overflow-auto">
          {options.length > 0 ? (
            options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className={`cursor-pointer w-full text-left px-4 py-2 rounded-md transition text-sm md:text-base ${
                  value === option.value
                    ? "bg-[#C9E9BA] text-green-900 font-medium"
                    : "bg-white text-gray-800 hover:bg-[#C9E9BA]"
                }`}
              >
                {option.label}
                <br />
                {option.label2}
              </button>
            ))
          ) : (
            <p className="px-4 py-2 text-sm text-gray-500">No options</p>
          )}
        </div>
      )}
    </div>
  );
}
