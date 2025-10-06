"use client";

import React, { useState } from "react";
import Image from "next/image";
import Container from "@/components/Shared/Container";

const quickLinks = [
  {
    name: "Prayer Times",
    targetId: "prayer-times",
    icon: "/images/QuickLinks/normal/prayer times.png",
    activeIcon: "/images/QuickLinks/hover/prayer times.png",
  },
  {
    name: "Dictionary",
    targetId: "dictionary",
    icon: "/images/QuickLinks/normal/Dictionary.png",
    activeIcon: "/images/QuickLinks/hover/Dictionary.png",
  },
  {
    name: "Gallery",
    targetId: "gallery",
    icon: "/images/QuickLinks/normal/Gallery.png",
    activeIcon: "/images/QuickLinks/hover/Gallery.png",
  },
  {
    name: "Donation",
    targetId: "donation",
    icon: "/images/QuickLinks/normal/Donation.png",
    activeIcon: "/images/QuickLinks/hover/Donation.png",
  },
];


export default function QuickLinks() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  return (
    <section className="bg-[#E5F5DE] py-8">
      <Container className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
        {quickLinks.map((link, i) => {
          const isHovered = hoveredCard === i;

          return (
            <div
              key={i}
              className={`flex flex-col w-[190px] h-[190px] items-center justify-center 
                rounded-[30px] py-3.5 cursor-pointer text-center 
                transition-all duration-100 
                ${isHovered
                  ? "gradient-bg-quicklinks    text-white shadow-lg scale-105"
                  : "bg-white text-[#00401A] shadow"
                }`}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleScroll(link.targetId)}
            >
              {/* Icon Section */}
              <div className="w-[116px] h-[90px] flex items-center justify-center">
                <Image
                  src={isHovered ? link.activeIcon : link.icon}
                  alt={link.name}
                  width={130}
                  height={90}
                  className="object-contain transition-all duration-300"
                />
              </div>

              {/* Title */}
              <p className=" text-lg font-bold">{link.name}</p>
              <p className=" text-lg font-bold">祈りの時間</p>

            </div>
          );
        })}
      </Container>
    </section>
  );
}
