"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  const [expandedItems, setExpandedItems] = useState({
    worship: false,
    lifeMatters: false,
    prohibition: false,
    quran: false,
    purity: false,
    social: false,
    beliefs: false,
    decency: false,
  });

  const toggleExpand = (item) => {
    setExpandedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const categories = [
    {
      id: "worship",
      icon: "/images/fatwah/pen.png",
      activeIcon: "/images/QuickLinks/hover/1.png",
      title: "Worship",
      subtitle: "イバーダ",
      hasSubItems: true,
      subItems: ["Prayer", "Fasting", "Hajj"],
    },
    {
      id: "lifeMatters",
      icon: "/images/fatwah/pen.png",
      activeIcon: "/images/QuickLinks/hover/Blog & event-1.png",
      title: "Life Matters",
      subtitle: "詳細",
      hasSubItems: true,
      subItems: ["Family", "Work", "Health"],
    },
    {
      id: "prohibition",
      icon: "/images/fatwah/pen.png",
      activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
      title: "Prohibition & Lawful",
      subtitle: "ハラール",
      hasSubItems: true,
      subItems: ["Halal", "Haram", "Makruh"],
    },
    {
      id: "chapter",
      icon: "/images/fatwah/pen.png",
      activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
      title: "Chapter",
      subtitle: "イスラムの章",
      hasSubItems: false,
      isArrow: true,
    },
    {
      id: "section",
      icon: "/images/fatwah/pen.png",
      activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
      title: "Section",
      subtitle: "イスラムの章",
      hasSubItems: false,
      isArrow: true,
    },
    {
      id: "quran",
      icon: "/images/fatwah/pen.png",
      activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
      title: "Quran and Hadith",
      subtitle: "ギャラリー",
      hasSubItems: true,
      subItems: ["Quran", "Hadith", "Tafsir"],
    },
    {
      id: "purity",
      icon: "/images/fatwah/pen.png",
      activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
      title: "Purity and Impurity",
      subtitle: "詳細",
      hasSubItems: true,
      subItems: ["Wudu", "Ghusl", "Tayammum"],
    },
    {
      id: "social",
      icon: "/images/fatwah/pen.png",
      activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
      title: "Social Life",
      subtitle: "ブログイベント",
      hasSubItems: true,
      subItems: ["Etiquette", "Rights", "Duties"],
    },
    {
      id: "beliefs",
      icon: "/images/fatwah/pen.png",
      activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
      title: "Beliefs",
      subtitle: "",
      hasSubItems: true,
      subItems: ["Aqeedah", "Tawheed"],
    },
    {
      id: "decency",
      icon: "/images/fatwah/pen.png",
      activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
      title: "Decency",
      subtitle: "イスラム教の道徳",
      hasSubItems: true,
      subItems: ["Modesty", "Honesty", "Kindness"],
    },
  ];

  return (
    <div className="bg-white rounded-[10px] border border-[#C9E9BA] overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-white p-5">
        <h3 className="text-2xl font-bold text-[#00401A] gradient-border_b pb-2">
          Category/カテゴリ
        </h3>
      </div>

      {/* Categories List */}
      <div className="flex flex-col gap-3 px-4 pb-4">
        {categories.map((category) => {
          const isExpanded = expandedItems[category.id];

          return (
            <div key={category.id}>
              {/* Category Item */}
              <button
                onClick={() =>
                  category.hasSubItems && toggleExpand(category.id)
                }
                className={`group w-full h-[60px] px-4 py-3 flex items-center gap-3  transition-all
                  ${isExpanded
                    ? "gradient-bg-sidebar-item text-white rounded-t-[10px]"
                    : "bg-[#EEF8E9] gradient-bg-sidebar-item-b  rounded-[10px]"
                  }`}
              >
                {/* Icon with hover/active change */}
                <span className="relative flex-shrink-0 w-[42px] h-[42px]">
                  {/* Normal icon */}
                  <img
                    src={category.icon}
                    alt={category.title + " icon"}
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-200
                      ${isExpanded ? "opacity-0" : "opacity-100 group-hover:opacity-0"}`}
                    draggable={false}
                  />

                  {/* Active icon */}
                  <img
                    src={category.activeIcon}
                    alt={category.title + " active icon"}
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-200
                      ${isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                    draggable={false}
                  />
                </span>
                {/* <span className="relative flex-shrink-0 w-[48px] h-[48px]">
                  <Image
                    src={category.icon}
                    alt="icon"
                    fill
                    className={`object-contain transition-opacity duration-300 ${
                      isExpanded ? "opacity-0" : "opacity-100 group-hover:opacity-0"
                    }`}
                  />
                  <Image
                    src={category.activeIcon}
                    alt="active icon"
                    fill
                    className={`object-contain transition-opacity duration-300 ${
                      isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100 "
                    }`}
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
                  {category.subtitle && (
                    <p
                      className={`text-sm font-bold transition-colors ${isExpanded
                        ? "text-white"
                        : "text-[#00401A] group-hover:text-white"
                        }`}
                    >
                      {category.subtitle}
                    </p>
                  )}
                </div>

                {/* Chevron Icons */}
                {category.hasSubItems ? (
                  <ChevronDown
                    size={24}
                    className={`flex-shrink-0 transition-transform ${isExpanded
                      ? "rotate-180 text-white"
                      : "text-[#141B34] group-hover:text-white"
                      }`}
                  />
                ) : category.isArrow ? (
                  <ChevronRight
                    size={24}
                    className="flex-shrink-0 text-[#141B34] group-hover:text-white"
                  />
                ) : null}
              </button>

              {/* Sub Items */}
              {/* Sub Items */}
              {category.hasSubItems && isExpanded && (
                <div className="bg-[#EEF8E9] border-t border-gray-200 p-2 space-y-2">
                  {category.subItems.map((subItem, index) => (
                    <button
                      key={index}
                      className="w-full px-3 py-2 h-[54px] flex items-center justify-between text-left text-sm text-[#00401A]
         bg-white hover:bg-[#C9E9BA] transition-colors rounded-[10px]"
                    >
                      <div className="flex flex-col leading-tight font-semibold">
                        <span>{subItem}</span>
                        <span className="text-sm text-gray-600">イスラム教の書籍</span>
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
