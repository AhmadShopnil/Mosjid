"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";

export default function CustomSelectDictionary({
  options,
  lvl,
  selected,
  setSelected,
  parrent_lvl,
  selectedParrent,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null); // NEW

  // Position dropdown
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

  // CLOSE ON CLICK OUTSIDE
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
          {selected ? selected?.name_en : lvl}
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
            ref={dropdownRef} // NEW
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
            {selectedParrent == null ? (
              <p className="font-medium text-sm text-gray-800">
                Please select {parrent_lvl} at first
              </p>
            ) : options?.length > 0 ? (
              options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left px-4 py-2 rounded-md transition ${selected?.name_en === option.name_en
                      ? "bg-[#C9E9BA] text-green-900"
                      : "bg-white hover:bg-[#C9E9BA]"
                    }`}
                >



                  <div className="flex justify-between">
                    <span className="font-medium text-sm text-gray-800">
                      {option?.name_en}
                    </span>
                      <span className="font-medium text-sm text-gray-800">
                    Total:  {option?.dictionaries_count}
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
          </div>,
          document.body
        )}
    </>
  );
}
