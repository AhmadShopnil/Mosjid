"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookQuran } from "@fortawesome/free-solid-svg-icons";

export default function LoadingCommon() {
  return (
    <div className="loader-bg fixed inset-0 z-[9999] flex flex-col items-center justify-center">
      {/* Icon Container */}
      <div className="relative w-32 h-32 flex items-center justify-center mb-8">
        {/* Circular Progress */}
        <svg
          className="absolute w-full h-full -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#064E3B"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#FBBF24"
            strokeWidth="6"
            fill="none"
            strokeDasharray="283"
            strokeDashoffset="283"
            className="circle-progress"
          />
        </svg>

        <div className="z-10 text-white text-5xl pulse-effect">
          <FontAwesomeIcon icon={faBookQuran} className="w-10" />
        </div>

        <div className="absolute inset-0 bg-emerald-600 rounded-full blur-xl opacity-20"></div>
      </div>

      {/* Text */}
      <div className="text-center space-y-3 z-10">
        <h1 className="text-3xl md:text-4xl text-white font-serif-display tracking-widest uppercase">
          Osaka <span className="text-amber-400">Masjid</span>
        </h1>
        <p className="text-emerald-200 text-sm tracking-widest font-light">
          YOUR SPIRITUAL HOME IN THE CITY
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-1 bg-emerald-900 rounded-full mt-8 overflow-hidden relative">
        <div className="h-full bg-amber-400 rounded-full progress-bar-fill" />
      </div>

      <div className="absolute bottom-10 text-emerald-300/50 text-xs">
        Loading Resources...
      </div>
    </div>
  );
}
