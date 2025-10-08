"use client";

import Image from "next/image";
import React, { useState } from "react";
import Container from "../Shared/Container";
import { Menu, X } from "lucide-react";
import TopbarMobile from "./TopBarMobile";
import Link from "next/link";

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
    link: "notice-board",
    icon: "/images/QuickLinks/hover/notice board ES.png",
    activeIcon: "/images/QuickLinks/normal2/3.png",
  },
  {
    name: "Fatwah",
    link: "prayer-times",
    icon: "/images/QuickLinks/hover/Fatwa 03.png",
    activeIcon: "/images/QuickLinks/normal2/4.png",
  },

  {
    name: "Services",
    link: "prayer-times",
    icon: "/images/QuickLinks/hover/prayer times.png",
    activeIcon: "/images/QuickLinks/normal2/5.png",
  },
  {
    name: "Dictionary",
    link: "dictionary",
    icon: "/images/QuickLinks/hover/Dictionary.png",
    activeIcon: "/images/QuickLinks/normal2/6.png",
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
  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <div className="relative bg-[#00401A] text-white py-2 xl:py-0">
      <Container className="flex items-center justify-center relative px-4">
        {/* Logo */}
        <div className="absolute -top-8 left-4 sm:left-8 z-40">
          <div className="hidden lg:flex bg-white shadow-xl rounded-xl w-[120px] h-[110px] items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={300}
              height={300}
              className="object-cover w-[80px] h-[100px]"
            />
          </div>
          <div className="lg:hidden bg-white shadow-xl rounded-xl w-[100px] h-[100px] flex items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden w-full xl:flex justify-center">
          <nav className="flex flex-wrap justify-center gap-1.5 py-3 text-sm sm:text-base">
            {menuItems.map((item, i) => (
              <Link
                key={i}
                href={`/${item.link}`}
                className="hover:text-yellow-400 px-0.5 py-1 transition-colors duration-200 flex justify-center items-center"
              >
                <div className="w-6 h-6 flex justify-center items-center mr-1">
                  <Image
                    src={item?.icon}
                    alt={item?.name}
                    width={26}
                    height={26}
                    className="object-contain"
                  />
                </div>
                <span className="text-[13px] font-semibold">{item?.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Hamburger */}
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

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        ></div>
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] sm:w-[320px] bg-gradient-to-b from-green-50 to-white text-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200 bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            {/* <span className="font-bold text-[#00401A] text-lg">Menu</span> */}
          </div>
          <button onClick={toggleDrawer}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

{/* Scrollable Menu Items */}
<div className="flex-1 overflow-y-auto space-y-2 py-6">
  {menuItems.map((item, i) => (
    <Link
      key={i}
      href={`/${item.link}`}
      onClick={() => setIsOpen(false)}
      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-green-100 transition-all duration-200"
    >
      {/* Icon Wrapper */}
      <div className="w-6 h-6 flex items-center justify-center overflow-hidden">
        <Image
          src={item?.activeIcon}
          alt={item.name}
          width={24}
          height={24}
          className="object-contain w-6 h-6 border "
        />
      </div>

      <span className="font-medium text-gray-700 text-[15px]">{item.name}</span>
    </Link>
  ))}
</div>

        {/* Fixed Bottom Section */}
        <div className=" border-gray-200 bg-white  shadow-inner ">
          <TopbarMobile settings={settings} />
        </div>
      </div>
    </div>
  );
}
