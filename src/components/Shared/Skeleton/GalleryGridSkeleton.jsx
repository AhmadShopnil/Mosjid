"use client";

import React from "react";

export default function GalleryGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 animate-pulse">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-gray-200 rounded-xl overflow-hidden shadow-sm"
        >
          {/* Image placeholder */}
          <div className="w-full h-48 bg-gray-300"></div>

          {/* Content placeholder */}
          <div className="p-3 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
