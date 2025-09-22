
"use client"

// components/Home/QuickLinks.jsx
import React, { useState } from "react";

// FIX: Import individually to prevent "__barrel_optimize__" error
import Book from "lucide-react/dist/esm/icons/book";
import Heart from "lucide-react/dist/esm/icons/heart";
import ImageIcon from "lucide-react/dist/esm/icons/image";
import FileText from "lucide-react/dist/esm/icons/file-text";
import { DictionaryIcon, DonationIcon, FatwaIcon, GalleryIcon, PrayerTimesIcon } from "../../Icons/QuickLinks";
import Container from "../../Shared/Container";
import Image from "next/image";

const quickLinks = [
  {
    name: "Prayer Times",
    icon: <PrayerTimesIcon />,
    activeIcon: "/images/QuickLinks/hover/prayer times.png"
  },
  //   { name: "Fatwa", icon: <FatwaIcon/> },
  {
    name: "Dictionary", icon: <DictionaryIcon />,
    activeIcon: "/images/QuickLinks/hover/Dictionary.png"
  },
  {
    name: "Gallery", icon: <GalleryIcon />,
    activeIcon: "/images/QuickLinks/hover/Gallery.png"
  },
  {
    name: "Donation", icon: <DonationIcon />,
    activeIcon: "/images/QuickLinks/hover/Donation.png"
  },
];

export default function QuickLinks() {
  const [hoveredCard, setHoveredCard] = useState(null);

  
  return (
    <section className="bg-[#E5F5DE] py-6">
      <Container className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">


        {quickLinks.map((link, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center
             bg-white shadow rounded-3xl py-5.5  hover:bg-teal-50
              transition cursor-pointer text-center gradient-border "
            onMouseEnter={() => setHoveredCard(true)}
            onMouseLeave={() => setHoveredCard(null)}
          >

            <Image
              src={
                hoveredCard === true
                  ? `${link?.activeIcon}`
                  : `${link?.icon}`
              }
              alt="Details Button"
              width={100}
              height={100}
            />
            {link.icon}
            <p className="mt-2 text-base font-bold text-[#00401A]">{link.name}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
