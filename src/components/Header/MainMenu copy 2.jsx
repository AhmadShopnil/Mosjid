"use client";

import Image from "next/image";
import React, { useState } from "react";
import Container from "../Shared/Container";
import { Menu, X } from "lucide-react";
import Topbar from "./Topbar";
import TopbarMobile from "./TopBarMobile";
import Link from "next/link";

// const menuItems = [
//   "Home",
//   "About Us",
//   "Prayer Time",
//   "Notice Board",
//   "Fatwa",
//   "Dictionary",
//   "Directory",
//   "Gallery",
//   "Blog & Event",
//   "Contact Us",
// ];


const menuItems = [
  {
    name: "Home",
    link: "prayer-times",
    icon: "/images/QuickLinks/hover/home-05.png",
    activeIcon: "/images/QuickLinks/hover/home-05.png",
  },
  {
    name: "About",
    link: "about",
    icon: "/images/QuickLinks/hover/About us.png",
    activeIcon: "/images/QuickLinks/hover/About us.png",
  },
  {
    name: "Prayer Times",
    link: "prayer-times",
    icon: "/images/QuickLinks/hover/prayer times.png",
    activeIcon: "/images/QuickLinks/hover/prayer times.png",
  },
  {
    name: "Notice Board",
    link: "notice-board",
    icon: "/images/QuickLinks/hover/notice board ES.png",
    activeIcon: "/images/QuickLinks/hover/prayer times.png",
  },
  {
    name: "Fatwah",
    link: "prayer-times",
    icon: "/images/QuickLinks/hover/Fatwa 03.png",
    activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
  },

  {
    name: "Services",
    link: "prayer-times",
    icon: "/images/QuickLinks/hover/prayer times.png",
    activeIcon: "/images/QuickLinks/hover/prayer times.png",
  },
  {
    name: "Dictionary",
    link: "dictionary",
    icon: "/images/QuickLinks/hover/Dictionary.png",
    activeIcon: "/images/QuickLinks/hover/Dictionary.png",
  },
  {
    name: "Directory",
    link: "prayer-times",
    icon: "/images/QuickLinks/hover/prayer times.png",
    activeIcon: "/images/QuickLinks/hover/Directory.png",
  },
    {
    name: "Donation",
    link: "donation",
    icon: "/images/QuickLinks/hover/Donation.png",
    activeIcon: "/images/QuickLinks/hover/Donation.png",
  },
  {
    name: "Dua",
    link: "doa",
    icon: "/images/QuickLinks/hover/Dua.png",
    activeIcon: "/images/QuickLinks/hover/Donation.png",
  },
  {
    name: "Gallery",
    link: "gallery",
    icon: "/images/QuickLinks/hover/Gallery.png",
    activeIcon: "/images/QuickLinks/hover/Gallery.png",
  },

  {
    name: "Books",
    link: "books",
    icon: "/images/QuickLinks/hover/book.png",
    activeIcon: "/images/QuickLinks/hover/Donation.png",
  },
   {
    name: "Blog and Events",
    link: "books",
    icon: "/images/QuickLinks/hover/Blog & event.png",
    activeIcon: "/images/QuickLinks/hover/Blog & event.png",
  },
  {
    name: "Contact",
    link: "contact",
    icon: "/images/QuickLinks/hover/calling.png",
    activeIcon: "/images/QuickLinks/hover/calling.png",
  },
];

export default function MainMenu({ settings }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative bg-[#00401A]  text-white py-2 xl:py-0">
      <Container className="flex items-center justify-center relative px-4">
        {/* Logo */}
        <div className="absolute -top-8 left-4 sm:left-8 z-40">
          <div className="hidden lg:flex bg-white shadow-xl rounded-xl w-[120px] h-[110px]  items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={300}
              height={300}
              className="object-cover w-[80px] h-[100px]"
            />
          </div>
          <div className="lg:hidden bg-white shadow-xl rounded-xl w-[110px] h-[120 px] flex items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="object-cover w-[70px] h-[90px]"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden w-full xl:flex justify-center">
          <nav className="flex flex-wrap justify-center gap-1.5   py-3 text-sm sm:text-base">
            {menuItems.map((item, i) => (
              <Link
                key={i}
                href="#"
                className="hover:text-yellow-400 px-0.5 py-1 transition-colors duration-200 flex justify-center items-center "
              >
                <div className="w-6 h-6 flex justify-center items-center ">
                  <Image
                    src={item?.icon}
                    alt={item.name}
                    width={30}
                    height={30}
                    className="object-cover"
                  />
                </div>
                <span className="text-[13px] font-semibold">{item?.name}</span>
              </Link>

            ))}
          </nav>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="xl:hidden ml-auto">
          <button onClick={toggleDrawer} aria-label="Toggle Menu">
            {isOpen ? (
              <X className="w-7 h-7 text-white" />
            ) : (
              <Menu className="w-7 h-7 text-white" />
            )}
          </button>
        </div>
      </Container>

      {/* Background Overlay with Blur */}
      {isOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
        ></div>
      )}

      {/* Bottom Drawer Menu */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white text-black rounded-t-2xl shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-y-0" : "translate-y-full"
          }`}
      >
        <div className="px-4 py-8">
          <div className="grid grid-cols-2 gap-4 justify-items-center mb-4">
            {menuItems.map((item, i) => (

              <Link
                key={i}
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-[#00401A] hover:text-green-600 transition-colors"
              >
                <Image src={item.icon} alt={item.name} width={20} height={10} />
                {item?.name}
              </Link>
            ))}
          </div>
          <TopbarMobile settings={settings} />
        </div>
      </div>
    </div>
  );
}
