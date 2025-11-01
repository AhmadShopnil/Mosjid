"use client";

import React, { useState } from "react";
import Image from "next/image";
import Container from "@/components/Shared/Container";
import Link from "next/link";

// const quickLinks = [
//   {
//     name: "Prayer Times",
//     targetId: "prayer-times",
//     icon: "/images/QuickLinks/normal/prayer times.png",
//     activeIcon: "/images/QuickLinks/hover/prayer times.png",
//   },
//   {
//     name: "Dictionary",
//     targetId: "dictionary",
//     icon: "/images/QuickLinks/normal/Dictionary.png",
//     activeIcon: "/images/QuickLinks/hover/Dictionary.png",
//   },
//   {
//     name: "Gallery",
//     targetId: "gallery",
//     icon: "/images/QuickLinks/normal/Gallery.png",
//     activeIcon: "/images/QuickLinks/hover/Gallery.png",
//   },
//   {
//     name: "Donation",
//     targetId: "donation",
//     icon: "/images/QuickLinks/normal/Donation.png",
//     activeIcon: "/images/QuickLinks/hover/Donation.png",
//   },
// ];

const quickLinks = [
  {
    name: "Prayer Times",
    jp: "祈りの時間",
    targetId: "prayer-times",
    link: "/prayer-times",
    icon: "/images/QuickLinks/prayer-times.png",
    // icon: "/images/QuickLinks/normal/prayer times.png",
    activeIcon: "/images/QuickLinks/hover/prayer times.png",
  },
  {
    name: "Notice Board",
    jp: "掲示板",
    targetId: "notice-board",
    link: "/notices",
    icon: "/images/QuickLinks/notice.png",
    // icon: "/images/QuickLinks/normal/notice board.png",
    activeIcon: "/images/QuickLinks/hover/notice board ES.png",
  },

  {
    name: "Fatwa",
    jp: "ファトワ",
    targetId: "fatwah",
    link: "/fatwah",
    icon: "/images/QuickLinks/fatwa.png",
    // icon: "/images/QuickLinks/normal/Fatwa 03.png",
    activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
  },
  {
    name: "Donation",
    jp: "寄付",
    targetId: "donation",
    link: "/donation",
    icon: "/images/QuickLinks/donation.png",
    // icon: "/images/QuickLinks/normal/Donation.png",
    activeIcon: "/images/QuickLinks/hover/Donation.png",
  },
  {
    name: "Offered Services",
    jp: "提供されるサービス",
    targetId: "offered-services",
    link: "/",
    icon: "/images/QuickLinks/offer-service.png",
    // icon: "/images/QuickLinks/normal/Blog & event.png",
    activeIcon: "/images/QuickLinks/hover/Blog & event.png",
  },
  {
    name: "Dictionary",
    jp: "辞書",
    targetId: "dictionary",
    link: "/dictionary",
    icon: "/images/QuickLinks/dictionary.png",
    // icon: "/images/QuickLinks/normal/Dictionary.png",
    activeIcon: "/images/QuickLinks/hover/Dictionary.png",
  },
  {
    name: "Directory",
    jp: "ディレクトリ",
    targetId: "directory",
    link: "/directory",
    icon: "/images/QuickLinks/directory.png",
    // icon: "/images/QuickLinks/normal/Directory.png",
    activeIcon: "/images/QuickLinks/hover/Directory.png",
  },
  {
    name: "Blogs & Events",
    jp: "イスラムのブログとイベント",
    targetId: "blogs-events",
    link: "/blogs",
    icon: "/images/QuickLinks/blog-event.png",
    // icon: "/images/QuickLinks/normal/Donation.png",
    activeIcon: "/images/QuickLinks/hover/Donation.png",
  },

  {
    name: "Gallery",
    jp: "ギャラリー",
    targetId: "gallery",
    link: "/gallery",
    icon: "/images/QuickLinks/gallery.png",
    // icon: "/images/QuickLinks/normal/Gallery.png",
    activeIcon: "/images/QuickLinks/hover/Gallery.png",
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

  const handleOnclick=()=>{

  }


  return (
    <section className="bg-[#E5F5DE] py-8">
      <Container className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-4">
        {quickLinks.map((link, i) => {
          const isHovered = hoveredCard === i;

          return (
            <Link
              key={i}
              href={`${link?.link}`}
              className={`flex flex-col items-center justify-center  transition-all duration-200 
                rounded-[50px] py-3.5 cursor-pointer text-center gradient-border
              bg-white text-[#00401A] shadow`}
              // onMouseEnter={() => setHoveredCard(i)}
              // onMouseLeave={() => setHoveredCard(null)}
              // onClick={() => handleOnclick(link)}
            >
              {/* Icon Section */}
              <div className=" flex items-center justify-center">

                <Image
                  src={link.icon}
                  alt={link.name}
                  width={35}
                  height={40}
                  className={`object-contain transition-all duration-100 "}`}
                // className={`object-contain transition-all duration-100 group-hover:brightness-0 
                //   group-hover:invert  ${isHovered && "brightness-0 invert"}`}
                />
              </div>

              {/* Title */}
              <p className="mt-2 text-xs sm:text-base font-bold">{link.name}</p>
            </Link>
          );
        })}
      </Container>
    </section>
  );
}
