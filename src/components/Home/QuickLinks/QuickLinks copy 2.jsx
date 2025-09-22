"use client";

import React, { useState } from "react";
;

import Image from "next/image";
import { DictionaryIcon, DonationIcon, GalleryIcon, PrayerTimesIcon } from "@/components/Icons/QuickLinks";
import Container from "@/components/Shared/Container";

const quickLinks = [
  {
    name: "Prayer Times",
    icon: "/images/QuickLinks/normal/prayer times.png",
    activeIcon: "/images/QuickLinks/hover/prayer times.png",
  },
  {
    name: "Dictionary",
    icon: "/images/QuickLinks/normal/Dictionary.png",
    activeIcon: "/images/QuickLinks/hover/Dictionary.png",
  },
  {
    name: "Gallery",
    icon: "/images/QuickLinks/normal/Gallery.png",
    activeIcon: "/images/QuickLinks/hover/Gallery.png",
  },
  {
    name: "Donation",
    icon: "/images/QuickLinks/normal/Donation.png",
    activeIcon: "/images/QuickLinks/hover/Donation.png",
  },
];

export default function QuickLinks() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="bg-[#E5F5DE] py-6">
      <Container className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
        {quickLinks.map((link, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center
             bg-white shadow rounded-[50px] py-3.5 hover:bg-[#007724] 
             transition cursor-pointer text-center gradient-border text-[#00401A] hover:text-white"
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="w-[130px] h-[90px] flex items-center justify-center">
              {hoveredCard === i ? (
                <Image
                  src={link.activeIcon}
                  alt={`${link.name} Active Icon`}
                  width={150}
                  height={100}
                  className="object-contain"
                />
              ) : (
                <div className="text-teal-700">
                  <Image
                    src={link.icon}
                    alt={`${link.name} Active Icon`}
                    width={150}
                    height={100}
                    className="object-contain"
                  /></div>
              )}
            </div>
            <p className="mt-2 text-base font-bold ">
              {link.name}
            </p>
          </div>
        ))}
      </Container>
    </section>
  );
}
