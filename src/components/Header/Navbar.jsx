// components/Navbar.tsx
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


export default function Navbar() {
  return (
   <div className="bg-[#00401A] text-white overflow-hidden">
     <div className="max-w-7xl mx-auto flex items-center px-4">
        <div className="w-[10%] ">
         <span>OsakaMasjid</span>
        </div>
        {/* Navigation Links */}
        <div className="w-[90%]">
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
