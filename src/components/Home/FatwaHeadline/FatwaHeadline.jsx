"use client";
import Container from "@/components/Shared/Container";
import React, { useEffect, useState } from "react";


export default function FatwaHeadline({ fatwahs }) {

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % fatwahs?.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [fatwahs?.length]);

  return (
    <div
      className="w-full bg-[#549F62]"
      // style={{
      //   background:
      //     "linear-gradient(180deg, rgba(100,164,69,1) 0%, rgba(48,150,163,1) 100%)",
      // }}
    >
      <Container>
        <div className="h-12.5 flex items-center gap-4 overflow-hidden">
          {/* Left fixed label */}
          <div className=" bg-[#E5F5DE] text-base sm:text-lg md:text-xl text-[#00401A] h-12.5 px-4 flex items-center justify-center font-bold">
            Updates
          </div>

          {/* Fatwa text with smooth fade animation */}
          <div className="relative flex-1 h-10 overflow-hidden flex items-center">
            <div
              key={currentIndex} // triggers animation when text changes
              className="absolute w-full pl-2 text-white text-sm  md:text-base font-semibold flex items-center justify-start animate-fadeSlide"
              style={{ height: "2.5rem" }}
            >
              {fatwahs[currentIndex]?.name.slice(0,30)}
            </div>
          </div>
        </div>
      </Container>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeSlide {
          0% {
            opacity: 0;
            transform: translateY(100%);
          }
          15% {
            opacity: 1;
            transform: translateY(0%);
          }
          85% {
            opacity: 1;
            transform: translateY(0%);
          }
          100% {
            opacity: 0;
            transform: translateY(-100%);
          }
        }

        .animate-fadeSlide {
          animation: fadeSlide 5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
