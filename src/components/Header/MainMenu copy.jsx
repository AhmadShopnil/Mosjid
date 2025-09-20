// components/Navbar.tsx
import Image from "next/image";
import React from "react";

const menuItems=[
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
          ]


export default function MainMenu() {
  return (
   <div className="reletive bg-[#00401A] text-white  h-[40px]">
     <div className="max-w-7xl mx-auto flex items-center px-4 ">
        <div className="w-[15%] top-0 absolute">
           <Image
           src="/images/logo.png"
           alt='a1'
           width={400}
           height={400}
           />
        </div>
        {/* Navigation Links */}
        <div className="absolute   top-[30px] bg-red-300 left-[200px]">
        <div className=" flex space-x-3 px-4 py-2 text-sm">
          {menuItems.map((link, i) => (
            <a
              key={i}
              href="#"
              className="hover:bg-teal-700 px-3 py-1 rounded-md"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
     
    </div>
   </div>
  );
}
