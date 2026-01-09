"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import { useRouter } from "next/navigation";
import { useSelected } from "@/context/SelectedContext";
import { useSelectedParrent } from "@/context/SelectedContextParrent";
import { useFatwaFilters } from "@/context/FatwaFilterContext";


export default function ServicesSidebar({
  categories,

}) {
  const { selected, setSelected, clearSelected } = useSelected();





  const router = useRouter();
  const [hovered, setHovered] = useState("");
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (item) => {
    setExpandedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  // handle different useCase in same sidebar
  const handleOnClickItem = (category) => {
    setSelected(category);
    // setSelectedParrent(null);
    // console.log("link", category)
    router.push(`/services${category?.link}`);

  };


  return (
    <div className="bg-white rounded-[20px] border border-[#C9E9BA] overflow-hidden shadow-sm ">
      {/* Header */}
      <div className="bg-white p-5">
        <h3 className="text-2xl font-bold text-[#00401A] gradient-border_b pb-2">
          Menu / メニュー
        </h3>
      </div>

      {/* Categories List */}
      <div className="flex flex-col gap-3 px-4 pb-4">
        {categories?.map((category) => {
          const isExpanded = expandedItems[category.id];

          return (
            <div key={category.id}>
              {/* Category Item */}
              <button
                onMouseEnter={() => setHovered(category.id)}
                onMouseLeave={() => setHovered("")}
                onClick={() => handleOnClickItem(category)}
                className={`group w-full h-[61px] px-3 py-3 flex items-center gap-3  transition-all
                   
                  ${isExpanded ||
                    category.id == hovered ||
                    category?.id == selected?.id
                    ? "gradient-bg-sidebar-item text-white rounded-t-[10px]"
                    : "bg-[#EEF8E9] rounded-[10px]"
                  }
                  `}
              >
                {/* Icon with hover/active change */}
                <span className="relative flex-shrink-0 w-[40px] h-[40px]">
                  <img
                    src={category?.icon}
                    alt={category?.name + " icon"}
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-200
                      group-hover:brightness-0 group-hover:invert  ${(isExpanded || category.id == hovered || category?.id == selected?.id) && "brightness-0 invert"}`}
                  />
                </span>



                {/* Text Content */}
                <div className="flex-1 text-left py-1 ">
                  <p
                    className={`font-bold text-sm transition-colors  ${isExpanded ||
                        category.id == hovered ||
                        category?.id == selected?.id

                        ? "text-white"
                        : "text-[#B98C20] group-hover:text-white"
                      }`}
                  >
                    {category?.name}
                  </p>
                  {category?.subtitle && (
                    <p
                      className={`text-sm font-bold transition-colors ${isExpanded ||
                          category.id == hovered ||
                          category?.id == selected?.id
                          ? "text-white"
                          : "text-[#00401A] group-hover:text-white"
                        }`}
                    >
                      {category?.subtitle}
                    </p>
                  )}
                </div>

                {/* Chevron Icons */}
                {category?.hasSubItems ? (
                  <ChevronDown
                    size={24}
                    className={`flex-shrink-0 transition-transform ${isExpanded
                        ? "rotate-180 text-white"
                        : "text-[#141B34] group-hover:text-white"
                      }`}
                  />
                ) : category?.isArrow ? (
                  <ChevronRight
                    size={24}
                    className={`flex-shrink-0 text-[#141B34] group-hover:text-white ${(isExpanded || category.id == hovered || category?.id == selected?.id) && "text-white"}`}
                  />
                ) : null}
              </button>

              {/* Sub Items */}
              {/* Sub Items */}
              {category?.hasSubItems && isExpanded && (
                <div className="bg-[#EEF8E9] border-t border-gray-200 p-2 space-y-2">
                  {category?.childs?.map((subItem, index) => (
                    <button
                      onClick={() => handleOnClickSubItem(subItem, category)}
                      key={index}
                      className="w-full px-3 py-2 h-[54px] flex items-center justify-between text-left text-sm text-[#00401A]
                      bg-white hover:bg-[#C9E9BA] transition-colors rounded-[10px]"
                    >
                      <div className="flex flex-col leading-tight font-semibold">
                        <span>{subItem?.name}</span>
                        <span className="text-sm text-gray-600">
                          {subItem?.description}
                        </span>
                      </div>
                      <ChevronRight
                        size={20}
                        className="text-[#141B34] flex-shrink-0"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
