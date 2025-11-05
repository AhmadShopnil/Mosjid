"use client";

import React from "react";

const SkeletonBanner = () => {
  return (
    <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-[400px] overflow-hidden rounded-2xl bg-gray-200 animate-pulse">
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
    </div>
  );
};

export default SkeletonBanner;
