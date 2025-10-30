"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Icon } from "@iconify/react";



export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  // if (totalPages <= 1) return null; 

  const pages= [];

  // Always include the first page
  pages.push(1);

  // Add ellipsis after first page if needed
  if (currentPage > 4) {
    pages.push("...");
  }

  // Calculate middle pages dynamically
  const startPage = Math.max(2, currentPage - 2);
  const endPage = Math.min(totalPages - 1, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Add ellipsis before last page if needed
  if (currentPage < totalPages - 3) {
    pages.push("...");
  }

  // Always include the last page
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center  gap-2 mt-8">
      {/* Prev Button */}
      <button
        className={`p-2 rounded-[10px] bg-[#F2994A] text-white ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {/* <Icon icon="tdesign:arrow-left" width="24" height="24" /> */}
        <ChevronLeft className="" />
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={` border rounded-[10px] text-xl transition w-[40px] h-[40px] cursor-pointer  ${
              page === currentPage
                ? " text-[#F7BA2A] border-2 border-[#F7BA2A]"
                : "hover:bg-gray-100 border-2 border-[#E0E0E0]"
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index}
           className={`text-center border rounded-[10px] text-xl transition w-[40px] h-[40px]  ${
              page === currentPage
                ? " text-[#F7BA2A] border-2 border-[#F7BA2A]"
                : "hover:bg-gray-100 border-2 border-[#E0E0E0]"
            }`}
         >
            {page}
          </span>
        )
      )}

      {/* Next Button */}
      <button
        className={`p-2 rounded-[10px] bg-[#F2994A] text-white  w-[40px] h-[40px] ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {/* <Icon icon="tdesign:arrow-right" width="24" height="24" /> */}
        <ChevronRight className="" />
      </button>
    </div>
  );
}
