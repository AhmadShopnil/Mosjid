"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";




export default function Sidebar({ categories, setSelectedCat, isNavigate, directoryNavigate }) {
  const router = useRouter();
  const [hovered, setHovered] = useState("")
  const [expandedItems, setExpandedItems] = useState({
    // worship: false,
    // lifeMatters: false,
    // prohibition: false,
    // quran: false,
    // purity: false,
    // social: false,
    // beliefs: false,
    // decency: false,
  });

  const toggleExpand = (item) => {

    setExpandedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };


// handle different useCase in same sidebar
  const handleOnClickItem = (category) => {

    if (!category?.hasSubItems) {

      if (directoryNavigate) {
        router.push(`/directory/${category?.id}`);
      }

      else if (isNavigate) {
        router.push(`/${isNavigate}`);
      }
      else if (category?.link) {
        router.push(`${category?.link}`);
      }
      else {

        if (setSelectedCat != null) {
          setSelectedCat(category.id);
        }

      }

    }

    if (category?.hasSubItems) {
      toggleExpand(category.id);
    }
  };

  const handleOnClickSubItem = (subItem) => {

    if (directoryNavigate) {
      router.push(`/directory/${subItem?.id}`);
    }

    else if (isNavigate) {
      router.push(`/${isNavigate}`);

    }
    else if (subItem?.link) {



      router.push(`${subItem?.link}`);
    }
    else {
      setSelectedCat(subItem.id);
    }


  };

  

  return (
    <div className="bg-white rounded-[10px] border border-[#C9E9BA] overflow-hidden shadow-sm ">
      {/* Header */}
      <div className="bg-white p-5">
        <h3 className="text-2xl font-bold text-[#00401A] gradient-border_b pb-2">
          Menu/メニュー
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
                onClick={() =>
                  handleOnClickItem(category)

                }
                className={`group w-full h-[60px] px-4 py-3 flex items-center gap-3  transition-all
                   
                  ${isExpanded || category.id == hovered
                    ? "gradient-bg-sidebar-item text-white rounded-t-[10px]"
                    : "bg-[#EEF8E9] rounded-[10px]"
                  }
                  `
                }

              >
                {/* Icon with hover/active change */}
                <span className="relative flex-shrink-0 w-[42px] h-[42px]">

                  <img
                    src={category?.icon}
                    alt={category?.title + " icon"}
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-200
                      group-hover:brightness-0 group-hover:invert  ${isExpanded && "brightness-0 invert"}`}

                  />

                </span>

                {/* <span className="relative flex-shrink-0 w-[42px] h-[42px]">
                  <img
                    src={category?.icon}
                    alt={category?.title + " icon"}
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-200
                      ${isExpanded ? "opacity-0" : "opacity-100 group-hover:opacity-0"}`}
                    draggable={false}
                  />

                  <img
                    src={category.activeIcon}
                    alt={category.title + " active icon"}
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-200
                      ${isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                    draggable={false}
                  />
                </span> */}

                {/* Text Content */}
                <div className="flex-1 text-left">
                  <p
                    className={`font-bold text-sm transition-colors ${isExpanded
                      ? "text-white"
                      : "text-[#B98C20] group-hover:text-white"
                      }`}
                  >
                    {category.title}
                  </p>
                  {category?.subtitle && (
                    <p
                      className={`text-sm font-bold transition-colors ${isExpanded
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
                    className="flex-shrink-0 text-[#141B34] group-hover:text-white"
                  />
                ) : null}
              </button>

              {/* Sub Items */}
              {/* Sub Items */}
              {category?.hasSubItems && isExpanded && (
                <div className="bg-[#EEF8E9] border-t border-gray-200 p-2 space-y-2">
                  {category?.childs?.map((subItem, index) => (
                    <button
                      onClick={() => handleOnClickSubItem(subItem)}
                      key={index}
                      className="w-full px-3 py-2 h-[54px] flex items-center justify-between text-left text-sm text-[#00401A]
         bg-white hover:bg-[#C9E9BA] transition-colors rounded-[10px]"
                    >
                      <div className="flex flex-col leading-tight font-semibold">
                        <span>{subItem?.name}</span>
                        <span className="text-sm text-gray-600">{subItem?.description}</span>
                      </div>
                      <ChevronRight size={20} className="text-[#141B34] flex-shrink-0" />
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
