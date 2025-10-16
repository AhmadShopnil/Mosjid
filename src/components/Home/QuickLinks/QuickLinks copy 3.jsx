"use client";

import React, { useState } from "react";
import Image from "next/image";
import Container from "@/components/Shared/Container";

const quickLinks = [
  {
    name: "Prayer Times",
    jp: "祈りの時間",
    targetId: "prayer-times",
    icon: "/images/QuickLinks/normal/prayer times.png",
    activeIcon: "/images/QuickLinks/hover/prayer times.png",
  },
  {
    name: "Notice Board",
    jp: "掲示板",
    targetId: "notice-board",
    icon: "/images/QuickLinks/normal/notice board.png",
    activeIcon: "/images/QuickLinks/hover/notice board ES.png",
  },
  {
    name: "Fatwa",
    jp: "ファトワ",
    targetId: "fatwah",
    icon: "/images/QuickLinks/normal/Fatwa 03.png",
    activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
  },
  {
    name: "Offered Services",
    jp: "提供されるサービス",
    targetId: "offered-services",
    icon: "/images/QuickLinks/normal/Blog & event.png",
    activeIcon: "/images/QuickLinks/hover/Blog & event.png",
  },
  {
    name: "Dictionary",
    jp: "辞書",
    targetId: "dictionary",
    icon: "/images/QuickLinks/normal/Dictionary.png",
    activeIcon: "/images/QuickLinks/hover/Dictionary.png",
  },
  {
    name: "Directory",
    jp: "ディレクトリ",
    targetId: "directory",
    icon: "/images/QuickLinks/normal/Directory.png",
    activeIcon: "/images/QuickLinks/hover/Directory.png",
  },
  {
    name: "Donation",
    jp: "寄付",
    targetId: "donation",
    icon: "/images/QuickLinks/normal/Donation.png",
    activeIcon: "/images/QuickLinks/hover/Donation.png",
  },
  {
    name: "Gallery",
    jp: "ギャラリー",
    targetId: "gallery",
    icon: "/images/QuickLinks/normal/Gallery.png",
    activeIcon: "/images/QuickLinks/hover/Gallery.png",
  },
];

export default function QuickLinks() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCount = 7; // how many cards visible at once
  const maxIndex = quickLinks.length - visibleCount;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : maxIndex
    );
  };

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-[#E5F5DE] py-10 relative overflow-hidden">

      <div
        className="absolute right-0 bottom-0"
      >
        <Image
          src="/images/QuickLinks/img1.png"
          alt='img'
          width={210}
          height={100}
          className="object-contain transition-all duration-300"
        />
      </div>

      <Container>
        {/* Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-8 top-1/2 z-10 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-md flex items-center justify-center text-green-800 hover:text-amber-400 text-3xl transition"
        >
          ‹
        </button>
        <button
          onClick={handleNext}
          className="absolute right-8 top-1/2 z-10 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-md flex items-center justify-center text-green-800 hover:text-amber-400 text-3xl transition"
        >
          ›
        </button>

        {/* Slider Container */}
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (200 + 24)}px)`, // card width + gap
            }}
          >
            {quickLinks.map((link, i) => {
              const isHovered = hoveredCard === i;
              return (
                <div
                  key={i}
                  className={`quicklinks relative flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${isHovered ? "text-white" : "text-[#00401A]"
                    }`}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleScroll(link.targetId)}
                >
                  <div className="relative z-10 flex flex-col items-center justify-center w-full h-full rounded-[30px]">
                    <div className="w-[116px] h-[90px] flex items-center justify-center">
                      <Image
                        src={isHovered ? link.activeIcon : link.icon}
                        alt={link.name}
                        width={130}
                        height={90}
                        className="object-contain transition-all duration-300"
                      />
                    </div>
                    <p className="text-lg font-bold">{link.name}</p>
                    <p className="text-lg font-bold">{link.jp}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>

      {/* ✅ Gradient border CSS */}
      <style jsx>{`
        .quicklinks {
          width: 200px;
          height: 200px;
          border-radius: 30px;
          position: relative;
          overflow: hidden;
          background: white;
          z-index: 0;
          flex-shrink: 0;
        }

        .quicklinks::before {
          content: "";
          position: absolute;
          inset: 0;
          padding: 2px; /* border thickness */
          border-radius: 30px;
          background: linear-gradient(to right, #3096a3, #53ff00);
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          z-index: 1;
        }

        .quicklinks:hover {
          background: linear-gradient(147deg, #51fa06 0%, #007724 100%);
          color: white;
        }
      `}</style>
    </section>
  );
}
