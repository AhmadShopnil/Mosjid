"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookQuran } from "@fortawesome/free-solid-svg-icons";

export default function PageLoader() {
  const pathname = usePathname();
  const loaderRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const progressBar = progressRef.current;

    if (!loader || !progressBar) return;

    // Reset state
    loader.classList.remove("opacity-0", "pointer-events-none");
    loader.style.transform = "scale(1)";
    document.body.classList.add("overflow-hidden");
    document.body.classList.remove("loading-complete");

    // Force reflow (important for restarting animation)
    void loader.offsetWidth;

    // Start animations EXACT like HTML
    document.body.classList.add("loading-complete");
    progressBar.style.width = "100%";
    progressBar.style.transition = "width 5s ease-in-out";

    const timer = setTimeout(() => {
      loader.classList.add("opacity-0", "pointer-events-none");
      loader.style.transform = "scale(1.1)";
      document.body.classList.remove("overflow-hidden");
    }, 5000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      ref={loaderRef}
      className="loader-bg fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out"
    >
      {/* Icon Container */}
      <div className="relative w-32 h-32 flex items-center justify-center mb-8">
        <svg
          className="circular-loader absolute w-full h-full text-amber-400"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="45" stroke="currentColor" />
        </svg>

        <div className="z-10 text-white text-5xl pulse-effect">
          <FontAwesomeIcon icon={faBookQuran} className="w-10"/>
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
        <div
          ref={progressRef}
          className="h-full bg-amber-400 rounded-full w-0"
        />
      </div>

      <div className="absolute bottom-10 text-emerald-300/50 text-xs">
        Loading Resources...
      </div>
    </div>
  );
}
