"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";

export default function CustomSelectRounded({ options,lvl }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef(null);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [isOpen]);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <>
      {/* Selected Box */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="w-full rounded-3xl border appearance-none border-gray-200 px-3 py-2 bg-gray-100
        flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        <span className="text-gray-700">
          {selected ? selected.labelEn : lvl}
        </span>
        <ChevronDown
          size={18}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown List — rendered outside the container */}
      {isOpen &&
        createPortal(
          <div
            style={{
              position: "absolute",
              top: dropdownPos.top,
              left: dropdownPos.left,
              width: dropdownPos.width,
              zIndex: 9999,
            }}
            className="p-2 space-y-2 bg-[#EEF8E9] border border-gray-200 rounded-md 
            shadow-md max-h-80 overflow-auto"
          >
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className={`w-full text-left px-4 py-2 rounded-md transition ${
                  selected?.labelEn === option.labelEn
                    ? "bg-[#C9E9BA] text-green-900"
                    : "bg-white hover:bg-[#C9E9BA]"
                }`}
              >
                <p className="font-medium text-sm text-gray-800">
                  {option.labelEn}
                </p>
                <p className="text-xs text-gray-500">{option.labelJp}</p>
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
