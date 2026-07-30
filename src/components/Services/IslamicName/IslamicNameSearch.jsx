"use client";

import { useState } from "react";
import { XCircle } from "lucide-react";
import CustomSelectSimple from "@/components/UI/CustomSelectSimple";
import SectionTitleSmall from "@/components/SectionTitleRow/SectionTitleSmall";

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

  const genderOptions = [
    { value: "", label: "All Gender ", label2: "オールジェンダ" },
    { value: "boy", label: "Boy", label2: "男の子" },
    { value: "girl", label: "Girl", label2: "女の子" },
  ];

  return (
    <div className="shadow-md bg-white px-4 py-4 sm:px-6 md:py-10 rounded-2xl">

      <div className="text-[#B98C20] flex items-center justify-between rounded-t-[10px] mb-1.5 md:mb-3">

        <SectionTitleSmall
          leftTitle={" Search Name"}
          rightTitle={"検索名"}
        />

        {/* <h2 className="text-xl sm:text-xl font-bold">
          Search Name
        </h2>
        <h2 className="text-xl sm:text-xl font-bold">
          検索名
        </h2> */}
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
        <div className="w-full md:w-[350px] lg:w-[450px] h-[48px] md:h-[54px]">
          <CustomSelectSimple
            options={genderOptions}
            value={gender}
            onChange={(val) => setGender(val)}
            placeholder="Select Gender"
          />
        </div>

        <input
          type="text"
          placeholder="Search by name in English, Japanese, Arabic"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full border border-green-900 rounded-[10px] h-[48px] md:h-[54px] text-sm md:text-base px-2 md:px-4"
        />

        <button
          onClick={handleSearch}
          className="bg-[#F7BA2A] rounded-[10px] font-bold cursor-pointer h-[48px] md:h-[54px] text-sm md:text-base px-2 md:px-4 lg:px-12"
        >
          {button_text}
        </button>

        <button
          onClick={handleClear}
          className="flex items-center justify-center gap-1 rounded-[10px] border cursor-pointer h-[48px] md:h-[54px] text-sm md:text-base px-2 md:px-4 lg:px-12"
        >
          <XCircle className="w-5 h-5" />
          Clear
        </button>
      </div>
    </div>
  );
}
