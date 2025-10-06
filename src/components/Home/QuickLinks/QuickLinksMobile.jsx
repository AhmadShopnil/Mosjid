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


export default function QuickLinksMobile() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  return (
    <section className="bg-[#E5F5DE] py-8">
      <Container className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-9 gap-4">
        {quickLinks.map((link, i) => {
          const isHovered = hoveredCard === i;

          return (
            <div
              key={i}
              className={`flex flex-col items-center justify-center 
                rounded-[50px] py-3.5 cursor-pointer text-center gradient-border
                transition-all duration-200 
                ${isHovered
                  ? "bg-gradient-to-r  from-[rgba(81,250,6,1)] to-[rgba(0,119,36,1)] text-white shadow-lg scale-105"
                  : "bg-white text-[#00401A] shadow"
                }`}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
               onClick={() => handleScroll(link.targetId)}
            >
              {/* Icon Section */}
              <div className=" flex items-center justify-center">
                <Image
                  src={isHovered ? link.activeIcon : link.icon}
                  alt={link.name}
                  width={80}
                  height={80}
                  className="object-contain transition-all duration-300"
                />
              </div>

              {/* Title */}
              <p className="mt-2 text-xs sm:text-base font-bold">{link.name}</p>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
