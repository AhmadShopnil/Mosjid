

"use client";

import { Search, MoreVertical, X, FilterX } from "lucide-react";
import CustomSelector from "./CustomSelector";

export default function BookSearchSection({
  searchTerm,
  setSearchTerm,
  onSearch,
  onClear,
  writers,
  selectedWriter,
  setSelectedWriter,
  topics,
  selectedTopic,
  setSelectedTopic,
  publishers,
  selectedPublisher,
  setSelectedPublisher,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div id="dictionary">
      <div className="bg-white rounded-[20px] gradient-border px-4 py-8 sm:p-10 relative shadow-md">
        {/* 🔹 SEARCH BAR */}
        <div className="relative mb-6 flex flex-col sm:flex-row gap-3">
          <div className="bg-[#00401A] rounded-full p-1 flex items-center w-full sm:w-[95%]">
            <input
              type="text"
              placeholder="Search Word..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white text-sm placeholder-[#B0C4B8] px-4 py-2 outline-none"
            />

            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setTimeout(onSearch, 0); // Trigger search with empty term
                }}
                className="text-teal-200 hover:text-white p-1 mr-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <div className="flex items-center gap-2 mr-2">
              {/* <span className="text-[#B0C4B8] text-sm">EN</span> */}
              <MoreVertical className="w-4 h-4 text-teal-200" />
            </div>
          </div>

          <div className="my-auto w-full sm:w-[5%]">
            <button
              onClick={onSearch}
              className="hidden sm:flex bg-[#00401A] rounded-full p-4 hover:bg-green-800 transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5 text-[#F7BA2A]" />
            </button>

            <button
              onClick={onSearch}
              className="sm:hidden bg-[#00401A] rounded-xl p-3 text-white font-bold hover:bg-green-800 transition-colors w-full cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>

        {/* 🔹 SELECTORS & CLEAR BUTTON */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 flex-1 gap-3 w-full">
            <CustomSelector
              label="Writer Name"
              options={writers}
              selected={selectedWriter}
              setSelected={setSelectedWriter}
              selectedParrent={true} // bypass parent level check in CustomSelector
            />
            <CustomSelector
              label="Topic"
              options={topics}
              selected={selectedTopic}
              setSelected={setSelectedTopic}
              selectedParrent={true}
            />
            <CustomSelector
              label="Publisher"
              options={publishers}
              selected={selectedPublisher}
              setSelected={setSelectedPublisher}
              selectedParrent={true}
            />
          </div>

          <button
            onClick={onClear}
            className="flex items-center gap-2 whitespace-nowrap px-6 py-2.5 bg-red-50 text-red-600 rounded-full font-semibold hover:bg-red-100 transition-colors cursor-pointer border border-red-200"
          >
            <FilterX className="w-5 h-5" />
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}
