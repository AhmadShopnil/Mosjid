"use client";
import React from "react";
import Container from "../Shared/Container";

export default function FatwaHeadline() {
  const fatwas = [
    "Fatwa 1: প্রতিদিন নামাজের নিয়ম ও সময় সম্পর্কে সাধারণ নির্দেশনা।",
    "Fatwa 2: যাকাত হিসাব ও দরকারি বিষয়াবলী।",
    "Fatwa 3: ব্যবসায় হালাল-হারাম নির্ণয়ের সাধারণ নীতিমালা।",
    "Fatwa 4: পারিবারিক ও বিবাহকর্মে ইসলামিক পরামর্শ।",
    "Fatwa 5: রমাদানের রোজা ও ব্যক্তিগত দায়িত্বাদি।",
  ];

  return (
    <div
      className="w-full "
      style={{
        background: "linear-gradient(180deg, rgba(100,164,69,1) 0%, rgba(48,150,163,1) 100%)",
      }}
    >
      <Container className="">
        <div className="h-10 flex items-center gap-4 overflow-hidden">
          {/* Left fixed label */}
          <div className="bg-[#E5F5DE] text-[#00401A] h-10 w-20 flex items-center justify-center font-medium ">
            Fatwa
          </div>

          {/* Vertical ticker */}
          <div className="relative h-10 flex-1 overflow-hidden">
            <div className="ticker-inner">
              {/* Original list */}
              {fatwas.map((t, i) => (
                <div key={i} className="ticker-item">
                  {t}
                </div>
              ))}
              {/* Duplicate for seamless looping */}
              {fatwas.map((t, i) => (
                <div key={`dup-${i}`} className="ticker-item">
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Local CSS */}
      <style jsx>{`
        /* The ticker container */
        .ticker-inner {
          display: flex;
          flex-direction: column;
          /* Slower speed: 8s for smooth scrolling */
          animation: scroll-vertical 18s linear infinite;
          will-change: transform;
        }

        /* Each scrolling item */
        .ticker-item {
          height: 2.5rem; /* Matches Tailwind h-10 */
          display: flex;
          align-items: center;
          padding-left: 0.5rem;
          color: #ffffff;
          font-size: 0.875rem; /* text-sm */
          white-space: nowrap;
        }

        /* Pause animation on hover */
        .ticker-inner:hover {
          animation-play-state: paused;
        }

        /* Keyframes for smooth vertical scroll */
        @keyframes scroll-vertical {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </div>
  );
}
