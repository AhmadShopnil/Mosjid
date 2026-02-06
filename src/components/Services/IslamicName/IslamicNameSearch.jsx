"use client";

import { useState } from "react";
import { XCircle } from "lucide-react";

export default function IslamicNameSearch({
  button_text = "Find",
  onSearch = () => { },
}) {
  const [gender, setGender] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    onSearch({ gender, keyword });
  };

  const handleClear = () => {
    setGender("");
    setKeyword("");
    onSearch({ gender: "", keyword: "" });
  };

  return (
    <div className="shadow-md bg-white px-4 py-4  sm:px-6 md:py-10  rounded-2xl">

      <div className=" text-[#B98C20] flex items-center justify-between  rounded-t-[10px] mb-1.5 md:mb-3">
        <h2 className="text-xl sm:text-xl font-bold">
          Search Name
        </h2>
        <h2 className="text-xl sm:text-xl font-bold">
          検索名
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className=" w-full border border-green-900 rounded-[10px] h-[48px] md:h-[54px] text-sm md:text-base px-2  md:px-4"
        >
          <option value="">All Gender</option>
          <option value="boy">Boy</option>
          <option value="girl">Girl</option>
        </select>

        <input
          type="text"
          placeholder="Search by name or meaning"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className=" w-full border border-green-900 rounded-[10px] h-[48px] md:h-[54px] text-sm md:text-base px-2  md:px-4"
        />

        <button
          onClick={handleSearch}
          className="bg-[#F7BA2A]  rounded-[10px] font-bold cursor-pointer h-[48px] md:h-[54px] text-sm md:text-base px-2  md:px-4 lg:px-12"
        >
          {button_text}
        </button>

        <button
          onClick={handleClear}
          className="flex items-center justify-center  gap-1 rounded-[10px] border  cursor-pointer h-[48px] md:h-[54px] text-sm md:text-base px-2  md:px-4 lg:px-12"
        >
          <XCircle className="w-5 h-5" />
          Clear
        </button>
      </div>
    </div>
  );
}
