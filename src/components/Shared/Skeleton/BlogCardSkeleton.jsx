import React from "react";

export default function BlogCardSkeleton() {
  return (
    <div className="bg-[#EEF8E9] rounded-[20px] flex gap-3 sm:gap-4 md:gap-5 p-3 animate-pulse">
      {/* Image Placeholder */}
      <div
        className="rounded-[10px] w-[40px] h-[40px] sm:w-[100px] sm:h-[100px] 
        bg-gray-300 flex-shrink-0"
      ></div>

      {/* Text Placeholder */}
      <div className="flex flex-col justify-between sm:py-1 w-full">
        <div className="space-y-2">
          <div className="h-3 w-1/3 bg-gray-300 rounded"></div>
          <div className="hidden sm:block h-4 w-3/4 bg-gray-300 rounded"></div>
          <div className="sm:hidden h-4 w-1/2 bg-gray-300 rounded"></div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="h-3 w-20 bg-gray-300 rounded"></div>
          <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
