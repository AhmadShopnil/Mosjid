"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import CustomSelectForFatwaFinder from "../UI/CustomSelectForFatwaFinder";
import { useFatwaFilters } from "@/context/FatwaFilterContext";

export default function FatwaSearchForm({ data_for_filter }) {
  const [searchText, setSearchText] = useState()
  const {
    selectedMajhabs,
    setSelectedMajhabs,

    selectedBooks,
    setSelectedBooks,

    selectedChapter,
    setSelectedChapter,

    selectedSection,
    setSelectedSection,

    selectedSearchTerm,
    setSelectedSearchTerm,
  } = useFatwaFilters();

  const { majhabs, books, chapter, section } = data_for_filter;

  //  const { majhabs, books  } = data_for_filter;


  const handleSearchTerm = () => {
    setSelectedSearchTerm(searchText)
  }



  return (
    <div className="w-full bg-[#F6FFF8] rounded-md p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-4">

        {/* LEFT SECTION */}
        <div className="w-full md:w-[50%] flex flex-col gap-3">
          {majhabs?.data?.map((m, i) => (
            <button
              key={i}
              onClick={() => setSelectedMajhabs(m.name_en)}
              className={`cursor-pointer h-[56px] flex flex-col justify-center items-center py-3 rounded-md text-sm font-semibold transition-all duration-300
                ${selectedMajhabs === m.name_en
                  ? "gradient-bg-fatwah-finder text-white shadow"
                  : "bg-[#D7EFD8] hover:bg-[#C9E8CA]"
                }`}
            >
              <span>{m.name_en}</span>
              <span>{m.name_jp}</span>
            </button>
          ))}
        </div>

        {/* RIGHT SECTION */}
        <div className="md:w-[50%] flex flex-col gap-3 w-full">

          <CustomSelectForFatwaFinder
            lvl="Books"
            parrent_lvl={"Majhabs"}
            selectedParrent={selectedMajhabs}
            selected={selectedBooks}
            setSelected={setSelectedBooks}
            options={books}
          />

          <CustomSelectForFatwaFinder
            lvl="Chapters"
            parrent_lvl={"Books"}
            selectedParrent={selectedBooks}
            selected={selectedChapter}
            setSelected={setSelectedChapter}
            options={selectedBooks?.chapters}
          />

          <CustomSelectForFatwaFinder
            lvl="Sections"
            parrent_lvl={"Chapters"}
            selectedParrent={selectedChapter}
            selected={selectedSection}
            setSelected={setSelectedSection}
            options={selectedChapter?.sections}
          />

          <input

            type="text"
            placeholder="Search By Word Or Fatwa No..."
            value={selectedSearchTerm || ""}
            onChange={(e) => setSelectedSearchTerm(e.target.value)}
            className="w-full h-[56px] border border-gray-200 rounded-md px-3 py-2 focus:ring-green-400"
          />
        </div>
      </div>

      <div className="flex justify-center h-[56px] mt-4">
        <Link
          href="/fatwah/fatwah-filtered"
          onClick={handleSearchTerm}
          className="w-full text-lg flex items-center justify-center gap-2 bg-[#F7BA2A] hover:bg-[#f0aa00] text-[#00401A] py-2 rounded-md"
        >
          <Search size={18} />
          Search
        </Link>
      </div>
    </div>
  );
}
