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
    <div className="shadow-md bg-white px-5 sm:px-6 py-6 rounded-2xl">

      <div className=" h-[50px] text-[#B98C20] flex items-center justify-between  rounded-t-[10px] mb-1.5 md:mb-3">
        <h2 className="text-lg sm:text-xl font-bold">
          Search Name
        </h2>
        <h2 className="text-lg sm:text-xl font-bold">
          検索名
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="h-[54px] w-full border border-green-900 rounded-[10px] px-4"
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
          className="h-[54px] w-full border border-green-900 rounded-[10px] px-4"
        />

        <button
          onClick={handleSearch}
          className="bg-[#F7BA2A] h-[56px] px:4 md:px-8 lg:px-32 rounded-[10px] font-bold cursor-pointer"
        >
          {button_text}
        </button>

        <button
          onClick={handleClear}
          className="flex items-center gap-1 h-[56px] px-4 rounded-[10px] border  cursor-pointer"
        >
          <XCircle className="w-5 h-5" />
          Clear
        </button>
      </div>
    </div>
  );
}
