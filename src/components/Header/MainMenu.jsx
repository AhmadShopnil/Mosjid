"use client";

import Image from "next/image";
import React, { useState } from "react";
import Container from "../Shared/Container";
import { Menu, X } from "lucide-react";
import Topbar from "./Topbar";
import TopbarMobile from "./TopBarMobile";
import Link from "next/link";

const menuItems = [
  "Home",
  "About Us",
  "Prayer Time",
  "Notice Board",
  "Fatwa",
  "Dictionary",
  "Directory",
  "Gallery",
  "Blog & Event",
  "Contact Us",
];

export default function MainMenu({settings}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative bg-[#00401A] text-white py-2 xl:py-0">
      <Container className="flex items-center justify-center relative px-4">
        {/* Logo */}
        <div className="absolute -top-8 left-4 sm:left-8 z-40">
          <div className="hidden lg:flex bg-white shadow-xl rounded-xl w-[120px] h-[120px]  items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={300}
              height={300}
              className="object-cover w-[80px] h-[100px]"
            />
          </div>
           <div className="lg:hidden bg-white shadow-xl rounded-xl w-[80px] h-[85 px] flex items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="object-cover w-[50px] h-[65px]"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden w-full xl:flex justify-center">
          <nav className="flex flex-wrap justify-center gap-3 py-3 text-sm sm:text-base">
            {menuItems.map((link, i) => (
              <a
                key={i}
                href="#"
                className="hover:text-yellow-400 px-3 py-1 transition-colors duration-200"
              >
                {link}
              </a>
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
        className={`fixed bottom-0 left-0 right-0 bg-white text-black rounded-t-2xl shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="px-4 py-8">
          <div className="grid grid-cols-2 gap-4 justify-items-center mb-4">
          {menuItems.map((link, i) => (
              <Link
                key={i}
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-[#00401A] hover:text-green-600 transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>
          <TopbarMobile settings={settings}/>
        </div>
      </div>
    </div>
  );
}
