"use client";

import React from "react";

export default function SkeletonBookCardInnerPage() {
  return (
    <div
      className={`flex flex-col md:flex-row md:space-x-4 bg-white/80 backdrop-blur-sm border border-gray-200 p-4 sm:p-6
      rounded-[20px] shadow-sm animate-pulse`}
    >
      {/* Image Skeleton */}
      <div className="flex justify-center md:justify-start mb-4 md:mb-0">
        <div className="w-[180px] h-[240px] sm:w-[200px] sm:h-[270px] md:w-[230px] md:h-[300px] rounded-[10px] bg-gray-200" />
      </div>

      {/* Content Skeleton */}
      <div className="flex-1 space-y-3">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="space-y-3">
            <div className="w-48 h-5 bg-gray-200 rounded" />
            <div className="w-40 h-5 bg-gray-200 rounded" />
            <div className="w-32 h-5 bg-gray-200 rounded" />
          </div>

          <div className="w-40 h-10 bg-gray-200 rounded-full" />
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2 mt-4">
          <div className="w-36 h-6 bg-gray-200 rounded" />
          <div className="w-full h-4 bg-gray-200 rounded" />
          <div className="w-full h-4 bg-gray-200 rounded" />
          <div className="w-5/6 h-4 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
