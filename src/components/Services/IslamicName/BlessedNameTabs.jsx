"use client";

import SectionTitleSmall from "@/components/SectionTitleRow/SectionTitleSmall";

export default function BlessedNameTabs({
  categories = [],
  activeCategory,
  onChange,
}) {
  return (
    <div className=" px-4 md:px-6 py-4 md:py-10">
      {/* Header */}
      <div className="flex items-center justify-between  mb-4">
        <SectionTitleSmall
          leftTitle={"Blessed Name"}
          rightTitle={"祝福された御名"}
        />
        
      </div>

      

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat)}
              className={`px-5 py-2 lg:py-2.5 lg:px-7 rounded-full border text-sm lg:text-lg font-medium transition cursor-pointer
                ${
                  isActive
                    ? "bg-[#0B4D2B] text-white border-[#0B4D2B]"
                    : "bg-white text-[#0B4D2B] border-gray-300 hover:bg-gray-100"
                }
              `}
            >
              {cat?.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
