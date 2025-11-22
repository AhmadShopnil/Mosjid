"use client";

import React from "react";

export default function FatwaListSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Title Skeleton */}
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-300 rounded-md"></div>
          <div className="h-7 w-40 bg-gray-300 rounded-md"></div>
        </div>
        <div className="h-9 w-24 bg-gray-300 rounded-full"></div>
      </div>

      {/* List Skeleton */}
      <ul className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <li
            key={i}
            className="flex justify-between items-center border border-[#D9E2DD] p-2 rounded-full"
          >
            {/* Left side */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div>
                <div className="h-4 w-48 bg-gray-300 rounded-md mb-2"></div>
                <div className="h-3 w-24 bg-gray-300 rounded-md"></div>
              </div>
            </div>

            {/* Right Button Skeleton */}
            <div className="h-9 w-28 bg-gray-300 rounded-full"></div>
          </li>
        ))}
      </ul>

      {/* Pagination Skeleton */}
      <div className="mt-6 flex justify-center gap-3">
        <div className="h-8 w-8 bg-gray-300 rounded"></div>
        <div className="h-8 w-8 bg-gray-300 rounded"></div>
        <div className="h-8 w-8 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
