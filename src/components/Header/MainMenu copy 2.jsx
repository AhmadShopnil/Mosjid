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
    icon: "/images/QuickLinks/white/home.png",
    activeIcon: "/images/QuickLinks/hover/home-05.png",
  },
  {
    name: "Services",
    link: "services",
    icon: "/images/QuickLinks/white/service2.png",
    activeIcon: "/images/QuickLinks/normal2/5.png",
    submenu: [
      {
        name: "Offered Services",
        link: "services",
        icon: "/images/QuickLinks/offer-service.png",
        activeIcon: "/images/QuickLinks/white/service2.png",
        submenu: [
          {
            name: "Marriage",
            link: "services/marriage",
            icon: "/images/QuickLinks/normal2/marriage.png",
          },
          {
            name: "Funeral",
            link: "services/funeral",
            icon: "/images/QuickLinks/normal2/marriage.png",
          },
        ],
      },
      {
        name: "Dua",
        link: "dua",
        icon: "/images/QuickLinks/dua.png",
      },
      {
        name: "Gallery",
        link: "gallery",
        icon: "/images/QuickLinks/gallery.png",
      },
    ],
  },
  {
    name: "Contact",
    link: "contact",
    icon: "/images/QuickLinks/white/phone.png",
    activeIcon: "/images/QuickLinks/white/phone.png",
  },
];

export default function MainMenu({ settings }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [openSubmenus, setOpenSubmenus] = useState({}); // for mobile nested open/close

  const toggleDrawer = () => setIsOpen(!isOpen);
  const toggleMobileSubmenu = (indexPath) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [indexPath]: !prev[indexPath],
    }));
  };

  const logo_path = getMediaLinkByMetaName(settings, "footer_logo");
  const logo_url = `${BASE_URL}${logo_path}`;

  // Recursive submenu renderer for desktop
  const renderSubmenu = (submenu, level = 1) => (
    <div
      className={`absolute left-full top-0 bg-[#EEF8E9] text-[#00401A] shadow-xl rounded-md mt-0 min-w-[200px] 
        z-50 transition-all duration-200 ease-in-out hidden group-hover:block`}
    >
      {submenu.map((sub, k) => (
        <div key={k} className="relative group/submenu">
          <Link
            href={`/${sub.link}`}
            className="flex items-center gap-2 px-4 py-2.5 font-bold hover:text-[#F7BA2A] text-xs whitespace-nowrap"
          >
            <Image
              src={sub.icon}
              alt={sub.name}
              width={18}
              height={18}
              className="object-contain"
            />
            {sub.name}
            {sub.submenu && <ChevronDown className="w-3 h-3 rotate-[-90deg]" />}
          </Link>

          {/* Recursive submenu (if exists) */}
          {sub.submenu && renderSubmenu(sub.submenu, level + 1)}
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative bg-[#00401A] text-white py-2 xl:py-0">
      <Container className="flex items-center justify-center relative px-4">
        {/* Logo */}
        <div className="absolute -top-8 left-4 sm:left-8 z-40">
          <div className="hidden lg:flex bg-white shadow-xl rounded-xl w-[120px] h-[110px] items-center justify-center">
            <Image
              src={logo_url}
              alt="Logo"
              width={80}
              height={100}
              className="object-cover"
            />
          </div>
          <div className="lg:hidden bg-white shadow-xl rounded-xl w-[90px] h-[100px] flex items-center justify-center">
            <Image
              src={logo_url}
              alt="Logo"
              width={65}
              height={70}
              className="object-cover"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden w-full xl:flex justify-center">
          <nav className="flex flex-wrap justify-center gap-2 py-3 text-sm sm:text-base relative">
            {menuItems.map((item, i) => (
              <div
                key={i}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(i)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={`/${item.link}`}
                  className="hover:text-yellow-400 px-1 py-1 transition-colors duration-200 flex justify-center items-center"
                >
                  <div className="w-5 h-5 flex items-center justify-center mr-1">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={20}
                      height={20}
                      className="object-contain w-full h-full brightness-0 invert"
                    />
                  </div>
                  <span className="text-sm font-semibold flex items-center gap-1">
                    {item.name}
                    {item.submenu && (
                      <ChevronDown className="w-3 h-3 mt-0.5" />
                    )}
                  </span>
                </Link>

                {/* Level 1 Dropdown */}
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
                      <div key={j} className="relative group/submenu">
                        <Link
                          href={`/${sub.link}`}
                          className="flex items-center gap-2 px-4 py-2.5 font-bold hover:text-[#F7BA2A] text-xs whitespace-nowrap"
                        >
                          <Image
                            src={sub.icon}
                            alt={sub.name}
                            width={18}
                            height={18}
                            className="object-contain"
                          />
                          {sub.name}
                          {sub.submenu && (
                            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
                          )}
                        </Link>
                        {/* Recursive next-level submenu */}
                        {sub.submenu && renderSubmenu(sub.submenu, 2)}
                      </div>
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
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] sm:w-[320px] bg-gradient-to-b from-green-50 to-white text-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200 bg-white shadow-sm">
          <Image
            src={logo_url}
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <button onClick={toggleDrawer}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Scrollable Menu Items */}
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-1">
            {menuItems.map((item, i) => {
              const indexKey = `${i}`;
              const isOpenSub = openSubmenus[indexKey];
              return (
                <div key={i} className="relative border-b border-gray-200">
                  <button
                    onClick={() =>
                      item.submenu
                        ? toggleMobileSubmenu(indexKey)
                        : setIsOpen(false)
                    }
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-green-50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm border border-gray-100">
                        <Image
                          src={item?.activeIcon || item.icon}
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
                    {item.submenu && (
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                          isOpenSub ? "rotate-180 text-green-500" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Mobile submenu */}
                  {item.submenu && isOpenSub && (
                    <div className="pl-8 bg-white">
                      {item.submenu.map((sub, j) => {
                        const subKey = `${i}-${j}`;
                        const subOpen = openSubmenus[subKey];
                        return (
                          <div key={j}>
                            <button
                              onClick={() =>
                                sub.submenu
                                  ? toggleMobileSubmenu(subKey)
                                  : setIsOpen(false)
                              }
                              className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-gray-700 hover:text-green-700"
                            >
                              <span>{sub.name}</span>
                              {sub.submenu && (
                                <ChevronDown
                                  className={`w-3 h-3 transition-transform ${
                                    subOpen ? "rotate-180" : ""
                                  }`}
                                />
                              )}
                            </button>

                            {/* Nested submenu */}
                            {sub.submenu && subOpen && (
                              <div className="pl-6 py-1">
                                {sub.submenu.map((nested, k) => (
                                  <Link
                                    key={k}
                                    href={`/${nested.link}`}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-2 text-xs text-gray-600 hover:text-green-600"
                                  >
                                    {nested.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
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
