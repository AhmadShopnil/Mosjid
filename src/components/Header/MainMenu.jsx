import Image from "next/image";
import React from "react";
import Container from "../Shared/Container";

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

export default function MainMenu() {
  return (
    <div className="relative bg-[#00401A] text-white">
      <Container className=" flex items-center justify-center relative px-4">
        {/* Logo - absolutely positioned to overlap */}
        <div className="absolute -top-8 left-4 sm:left-8">
          <div className="bg-white shadow-lg rounded-xl w-[120px] h-[120px] flex items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={310}
              height={310}
              className="object-cover w-[95px] h-[95px]"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="w-full flex justify-center ">
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
      </Container>
    </div>
  );
}
