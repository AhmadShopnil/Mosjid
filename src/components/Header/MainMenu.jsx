"use client";

import Image from "next/image";
import React, { useState } from "react";
import Container from "../Shared/Container";
import { Menu, X, ChevronDown } from "lucide-react";
import TopbarMobile from "./TopBarMobile";
import Link from "next/link";
import { getMediaLinkByMetaName } from "@/helper/metaHelpers";
import { BASE_URL } from "@/helper/baseUrl";

const menuItems = [
  {
    name: "Home",
    link: "/",
    icon: "/images/QuickLinks/hover/home-05.png",
    activeIcon: "/images/QuickLinks/hover/home-05.png",
  },
  {
    name: "About",
    link: "about",
    icon: "/images/QuickLinks/hover/About us.png",
    activeIcon: "/images/QuickLinks/normal2/7.png",
  },
  {
    name: "Prayer Times",
    link: "prayer-times",
    icon: "/images/QuickLinks/hover/prayer times.png",
    activeIcon: "/images/QuickLinks/normal2/2.png",
  },
  {
    name: "Notice Board",
    link: "notices",
    icon: "/images/QuickLinks/hover/notice board ES.png",
    activeIcon: "/images/QuickLinks/normal2/3.png",
  },
  {
    name: "Fatwah",
    link: "fatwah",
    icon: "/images/QuickLinks/hover/Fatwa 03.png",
    activeIcon: "/images/QuickLinks/normal2/4.png",
    submenu: [
      {
        name: "Ask Fatwah",
        link: "/fatwah/ask",
        icon: "/images/QuickLinks/normal2/4.png",
      },
      {
        name: "View Fatwahs",
        link: "/fatwah/all",
        icon: "/images/QuickLinks/normal2/4.png",
      },
    ],
  },
  {
    name: "Services",
    link: "services",
    icon: "/images/QuickLinks/hover/prayer times.png",
    activeIcon: "/images/QuickLinks/normal2/5.png",
    submenu: [
      {
        name: "Marriage Service",
        link: "/services/marriage",
         icon: "/images/QuickLinks/normal2/5.png",
      },
      {
        name: "Funeral Service",
        link: "/services/funeral",
        icon: "/images/QuickLinks/normal2/2.png",
      },
    ],
  },
  {
    name: "Dictionary",
    link: "dictionary",
    icon: "/images/QuickLinks/hover/Dictionary.png",
    activeIcon: "/images/QuickLinks/normal2/6.png",
    submenu: [
      {
        name: "Arabic-English",
        link: "/dictionary/arabic",
         icon: "/images/QuickLinks/normal2/2.png",
      },
      {
        name: "Islamic Terms",
        link: "/dictionary/islamic",
        icon: "/images/QuickLinks/normal2/5.png",
      },
    ],
  },
  {
    name: "Directory",
    link: "prayer-times",
    icon: "/images/QuickLinks/hover/prayer times.png",
    activeIcon: "/images/QuickLinks/normal2/7.png",
  },
  {
    name: "Donation",
    link: "donation",
    icon: "/images/QuickLinks/hover/Donation.png",
    activeIcon: "/images/QuickLinks/normal2/2.png",
  },
  {
    name: "Dua",
    link: "doa",
    icon: "/images/QuickLinks/hover/Dua.png",
    activeIcon: "/images/QuickLinks/normal2/3.png",
  },
  {
    name: "Gallery",
    link: "gallery",
    icon: "/images/QuickLinks/hover/Gallery.png",
    activeIcon: "/images/QuickLinks/normal2/4.png",
  },
  {
    name: "Books",
    link: "books",
    icon: "/images/QuickLinks/hover/book.png",
    activeIcon: "/images/QuickLinks/normal2/5.png",
  },
  {
    name: "Blog and Events",
    link: "books",
    icon: "/images/QuickLinks/hover/Blog & event.png",
    activeIcon: "/images/QuickLinks/normal2/6.png",
  },
  {
    name: "Contact",
    link: "contact",
    icon: "/images/QuickLinks/hover/calling.png",
    activeIcon: "/images/QuickLinks/normal2/7.png",
  },
];

export default function MainMenu({ settings }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDrawer = () => setIsOpen(!isOpen);
  const logo_path = getMediaLinkByMetaName(settings, "footer_logo");
  const logo_url = `${BASE_URL}${logo_path}`;

  return (
    <div className="relative bg-[#00401A] text-white py-2 xl:py-0">
      <Container className="flex items-center justify-center relative px-4">
        {/* Logo */}
        <div className="absolute -top-8 left-4 sm:left-8 z-40">
          <div className="hidden lg:flex bg-white shadow-xl rounded-xl w-[120px] h-[110px] items-center justify-center">
            <Image src={logo_url} alt="Logo" width={80} height={100} className="object-cover" />
          </div>
          <div className="lg:hidden bg-white shadow-xl rounded-xl w-[100px] h-[100px] flex items-center justify-center">
            <Image src={logo_url} alt="Logo" width={80} height={80} className="object-cover" />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden w-full xl:flex justify-center">
          <nav className="flex flex-wrap justify-center gap-1 py-3 text-sm sm:text-base relative">
            {menuItems.map((item, i) => (
              <div
                key={i}
                className="relative"
                onMouseEnter={() => setActiveDropdown(i)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={`/${item.link}`}
                  className="hover:text-yellow-400 px-2 py-1 transition-colors duration-200 flex justify-center items-center"
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={22}
                    height={22}
                    className="object-contain mr-1"
                  />
                  <span className="text-sm font-semibold flex items-center gap-1">
                    {item.name}
                    {item.submenu && <ChevronDown className="w-3 h-3 mt-0.5" />}
                  </span>
                </Link>

                {/* Dropdown */}
                {item.submenu && (
                  <div
                    className={`absolute left-0 top-full bg-[#EEF8E9] text-[#00401A] shadow-xl rounded-md mt-3 min-w-[200px] 
                      z-50 transition-all duration-200 ease-in-out transform ${
                      activeDropdown === i
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2"
                    }`}
                  >
                    {item.submenu.map((sub, j) => (
                      <Link
                        key={j}
                        href={sub.link}
                        className="flex items-center gap-2 px-4 py-2  hover:text-[#F7BA2A] text-xs"
                      >
                        <Image
                          src={sub.icon}
                          alt={sub.name}
                          width={18}
                          height={18}
                          className="object-contain"
                        />
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Mobile Hamburger */}
        <div className="xl:hidden ml-auto">
          <button onClick={toggleDrawer} aria-label="Toggle Menu">
            {isOpen ? <X className="w-7 h-7 text-white" /> : <Menu className="w-7 h-7 text-white" />}
          </button>
        </div>
      </Container>

      {/* Overlay */}
      {isOpen && <div onClick={toggleDrawer} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] sm:w-[320px] bg-gradient-to-b from-green-50 to-white text-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200 bg-white shadow-sm">
          <Image src={logo_url} alt="Logo" width={40} height={40} className="object-contain" />
          <button onClick={toggleDrawer}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Scrollable Menu Items */}
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-1">
            {menuItems.map((item, i) => (
              <div key={i} className="relative group border-b border-gray-200 last:border-none">
                <Link
                  href={`/${item.link}`}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gradient-to-r
                   hover:from-green-50 hover:to-green-100 transition-all duration-200 "
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm border border-gray-100">
                      <Image
                        src={item?.activeIcon}
                        alt={item.name}
                        width={24}
                        height={24}
                        className="object-contain w-5 h-5"
                      />
                    </div>
                    <span className="font-medium text-gray-800 text-[15px] group-hover:text-green-600 transition-colors duration-200">
                      {item.name}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-green-500 transition-transform duration-200" />
                </Link>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="border-gray-200 bg-white shadow-inner sticky bottom-0 py-3">
          <TopbarMobile settings={settings} />
        </div>
      </div>
    </div>
  );
}
