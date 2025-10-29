"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function SidebarDrawer({ categories }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState("");
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (item) => {
    setExpandedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  return (
    <>
      {/* ======= Mobile Toggle Button ======= */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-[#C9E9BA]">
        <h3 className="text-lg font-bold text-[#00401A]">Category</h3>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-md bg-[#EEF8E9] text-[#00401A]"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* ======= Sidebar Drawer Overlay (Mobile) ======= */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ======= Sidebar Drawer Content ======= */}
      <aside
        className={`fixed top-0 left-0 z-50 w-80 h-full bg-white border-r border-[#C9E9BA] shadow-lg transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:shadow-none lg:w-[320px]
        `}
      >
        {/* Drawer Header (mobile only) */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-[#C9E9BA]">
          <h3 className="text-lg font-bold text-[#00401A]">Category</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md bg-[#EEF8E9] text-[#00401A]"
          >
            <X size={24} />
          </button>
        </div>

        {/* ======= Your Original Sidebar ======= */}
        <div className="bg-white rounded-[10px] overflow-y-auto h-full">
          <div className="bg-white p-5">
            <h3 className="text-2xl font-bold text-[#00401A] gradient-border_b pb-2">
              Category/カテゴリ
            </h3>
          </div>

          <div className="flex flex-col gap-3 px-4 pb-4">
            {categories?.map((category) => {
              const isExpanded = expandedItems[category.id];
              return (
                <div key={category.id}>
                  <button
                    onMouseEnter={() => setHovered(category.id)}
                    onMouseLeave={() => setHovered("")}
                    onClick={() =>
                      category.hasSubItems && toggleExpand(category.id)
                    }
                    className={`group w-full h-[60px] px-4 py-3 flex items-center gap-3 transition-all
                      ${
                        isExpanded || category.id == hovered
                          ? "gradient-bg-sidebar-item text-white rounded-t-[10px]"
                          : "bg-[#EEF8E9] rounded-[10px]"
                      }`}
                  >
                    <span className="relative flex-shrink-0 w-[42px] h-[42px]">
                      <img
                        src={category.icon}
                        alt={category.title + " icon"}
                        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-200
                          ${
                            isExpanded
                              ? "opacity-0"
                              : "opacity-100 group-hover:opacity-0"
                          }`}
                        draggable={false}
                      />
                      <img
                        src={category.activeIcon}
                        alt={category.title + " active icon"}
                        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-200
                          ${
                            isExpanded
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-100"
                          }`}
                        draggable={false}
                      />
                    </span>

                    <div className="flex-1 text-left">
                      <p
                        className={`font-bold text-sm transition-colors ${
                          isExpanded
                            ? "text-white"
                            : "text-[#B98C20] group-hover:text-white"
                        }`}
                      >
                        {category.title}
                      </p>
                      {category.subtitle && (
                        <p
                          className={`text-sm font-bold transition-colors ${
                            isExpanded
                              ? "text-white"
                              : "text-[#00401A] group-hover:text-white"
                          }`}
                        >
                          {category.subtitle}
                        </p>
                      )}
                    </div>

                    {category.hasSubItems ? (
                      <ChevronDown
                        size={24}
                        className={`flex-shrink-0 transition-transform ${
                          isExpanded
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
                            <span className="text-sm text-gray-600">
                              イスラム教の書籍
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
      </aside>
    </>
  );
}
