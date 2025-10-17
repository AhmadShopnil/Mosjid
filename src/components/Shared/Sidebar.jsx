"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import Image from "next/image"

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
  })

  const toggleExpand = (item) => {
    setExpandedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }))
  }

  const categories = [
    {
      id: "worship",
      icon: "/images/fatwah/pen.png",
      title: "Worship",
      subtitle: "イバーダ",
      hasSubItems: true,
      subItems: ["Prayer", "Fasting", "Hajj"],
    },
    {
      id: "lifeMatters",
      icon: "/images/fatwah/pen.png",
      title: "Life Matters",
      subtitle: "詳細",
      hasSubItems: true,
      subItems: ["Family", "Work", "Health"],
    },
    {
      id: "prohibition",
      icon: "/images/fatwah/pen.png",
      title: "Prohibition & Lawful",
      subtitle: "ハラール",
      isActive: true,
      hasSubItems: true,
      subItems: ["Halal", "Haram", "Makruh"],
    },
    {
      id: "chapter",
      icon: "/images/fatwah/pen.png",
      title: "Chapter",
      subtitle: "イスラムの章",
      hasSubItems: false,
      isArrow: true,
    },
    {
      id: "section",
      icon: "/images/fatwah/pen.png",
      title: "Section",
      subtitle: "イスラムの章",
      hasSubItems: false,
      isArrow: true,
    },
    {
      id: "quran",
      icon: "/images/fatwah/pen.png",
      title: "Quran and Hadith",
      subtitle: "ギャラリー",
      hasSubItems: true,
      subItems: ["Quran", "Hadith", "Tafsir"],
    },
    {
      id: "purity",
      icon: "/images/fatwah/pen.png",
      title: "Purity and Impurity",
      subtitle: "詳細",
      hasSubItems: true,
      subItems: ["Wudu", "Ghusl", "Tayammum"],
    },
    {
      id: "social",
      icon: "/images/fatwah/pen.png",
      title: "Social Life",
      subtitle: "ブログイベント",
      hasSubItems: true,
      subItems: ["Etiquette", "Rights", "Duties"],
    },
    {
      id: "beliefs",
      icon: "/images/fatwah/pen.png",
      title: "Beliefs",
      subtitle: "",
      hasSubItems: true,
      subItems: ["Aqeedah", "Tawheed"],
    },
    {
      id: "decency",
      icon: "/images/fatwah/pen.png",
      title: "Decency",
      subtitle: "イスラム教の道徳",
      hasSubItems: true,
      subItems: ["Modesty", "Honesty", "Kindness"],
    },
  ]

  return (
    <div className="w-80 bg-white rounded-[10px] border border-[#C9E9BA] overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-white px-4 py-3 ">
        <h3 className="text-2xl font-bold text-[#00401A] gradient-border_b pb-2">Category/カテゴリ</h3>
      </div>

      {/* Categories List */}
      <div className=" flex flex-col gap-3 px-4 pb-4">
        {categories.map((category) => (
          <div key={category.id}>
            {/* Category Item */}
            <button
              onClick={() => category.hasSubItems && toggleExpand(category.id)}
              className={`w-full h-[60px] px-4 py-3 flex items-center gap-3 transition-colors rounded-xl ${expandedItems[category?.id]
                  ? "bg-green-500 text-white "
                  : "bg-[#EEF8E9] text-[#B98C20] hover:bg-green-500 hover:text-white"
                }`}
            >
              {/* Icon */}
              <span className="text-xl flex-shrink-0">

                <Image
                  src={category.icon}
                  alt="Book Icon"
                  width={40}
                  height={40}
                  className="w-[48px] h-[48px]"
                />

                </span>

              {/* Text Content */}
              <div className="flex-1 text-left">
                <p className="font-bold text-sm ">{category.title}</p>
                {category.subtitle && <p className="text-sm font-bold text-[#00401A] ">{category.subtitle}</p>}
              </div>

              {/* Chevron */}
              {category.hasSubItems ? (
                <ChevronDown
                  size={24}
                  className={`flex-shrink-0 transition-transform text-[#141B34] ${expandedItems[category.id] ? "rotate-180" : ""}`}
                />
              ) : category.isArrow ? (
                <ChevronRight size={24} className="flex-shrink-0 text-[#141B34] " />
              ) : null}
            </button>

            {/* Sub Items */}
            {category.hasSubItems && expandedItems[category.id] && (
              <div className="bg-gray-50 border-t border-gray-200">
                {category.subItems.map((subItem, index) => (
                  <button
                    key={index}
                    className="w-full px-8 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {subItem}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
