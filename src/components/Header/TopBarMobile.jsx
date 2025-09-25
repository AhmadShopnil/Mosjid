"use client";

import Image from "next/image";
import React, { useState } from "react";
import Container from "../Shared/Container";
import { TbMailFilled } from "react-icons/tb";
import { FaPhoneVolume } from "react-icons/fa6";
import { ImFacebook2 } from "react-icons/im";

const languages = [
  {
    title: "English",
    icon: "/images/others/English.png",
  },
  {
    title: "Japanese",
    icon: "/images/others/Japan.png",
  },
  {
    title: "Arabic",
    icon: "/images/others/Arabic.png",
  },
];

export default function TopbarMobile() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  return (
    <div className="bg-white py-2 z-[50]">
      <Container>
        <div className="flex flex-col  items-center justify-between gap-4">
          {/* Language Selection */}
          <div className="flex flex-col  items-center sm:gap-4 w-full">
            <span className="text-sm sm:text-base text-[#00401A] font-bold mb-2 sm:mb-0">
              Select Language:
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {languages.map((language) => (
                <button
                  key={language.title}
                  onClick={() => setSelectedLanguage(language.title)}
                  className={`px-3 sm:px-5 flex items-center gap-2 py-1.5 rounded-full text-sm font-bold transition-colors ${
                    selectedLanguage === language.title
                      ? "bg-[#00401A] text-white"
                      : "bg-white text-[#00401A] hover:bg-gray-300 border border-[#00401a51]"
                  }`}
                >
                  <Image
                    src={language.icon}
                    alt={language.title}
                    width={20}
                    height={10}
                    className="object-contain"
                  />
                  <span>{language.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contact and Social Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full">
            {/* Mail */}
            <div className="flex items-center gap-2">
              <TbMailFilled className="text-lg text-[#00401A]" />
              <span className="text-sm sm:text-base text-[#00401A]">
                info.soakamasjid@gmail.com
              </span>
            </div>

            {/* Phone Number */}
            <div className="flex items-center gap-2">
              <FaPhoneVolume className="text-lg text-[#00401A]" />
              <span className="text-sm sm:text-base text-[#00401A]">
                +880 150 3230 232
              </span>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 items-center">
              <a
                href="#"
                className="text-blue-500 text-xl hover:text-blue-600 transition"
              >
                <ImFacebook2 />
              </a>
              <a href="#">
                <Image
                  src="/images/footer/insta.png"
                  alt="Instagram"
                  width={28}
                  height={28}
                  className="hover:opacity-80 transition"
                />
              </a>
              <a href="#">
                <Image
                  src="/images/footer/linkdin.png"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                  className="hover:opacity-80 transition"
                />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
