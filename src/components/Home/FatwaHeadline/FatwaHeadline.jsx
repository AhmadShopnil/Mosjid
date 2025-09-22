"use client";
import Container from "@/components/Shared/Container";
import React, { useEffect, useState } from "react";


export default function FatwaHeadline() {
  const fatwas = [
    "Fatwa 1: প্রতিদিন নামাজের নিয়ম ও সময় সম্পর্কে সাধারণ নির্দেশনা।",
    "Fatwa 2: যাকাত হিসাব ও দরকারি বিষয়াবলী।",
    "Fatwa 3: ব্যবসায় হালাল-হারাম নির্ণয়ের সাধারণ নীতিমালা।",
    "Fatwa 4: পারিবারিক ও বিবাহকর্মে ইসলামিক পরামর্শ।",
    "Fatwa 5: রমাদানের রোজা ও ব্যক্তিগত দায়িত্বাদি।",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % fatwas.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [fatwas.length]);

  return (
    <div
      className="w-full"
      style={{
        background:
          "linear-gradient(180deg, rgba(100,164,69,1) 0%, rgba(48,150,163,1) 100%)",
      }}
    >
      <Container>
        <div className="h-10 flex items-center gap-4 overflow-hidden">
          {/* Left fixed label */}
          <div className="bg-[#E5F5DE] text-[#00401A] h-10 w-20 flex items-center justify-center font-medium">
            Fatwa
          </div>

          {/* Fatwa text with smooth fade animation */}
          <div className="relative flex-1 h-10 overflow-hidden flex items-center">
            <div
              key={currentIndex} // triggers animation when text changes
              className="absolute w-full pl-2 text-white text-sm flex items-center justify-start animate-fadeSlide"
              style={{ height: "2.5rem" }} // same as h-10 for perfect alignment
            >
              {fatwas[currentIndex]}
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
