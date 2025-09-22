// components/Navbar.tsx
import Image from "next/image";
import React from "react";
import MainMenu from "./MainMenu";
import Topbar from "./Topbar";

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


export default function Header() {
  return (
   <div className="">
    <div className=" bg-white">
   <Topbar/>
    </div>
   <MainMenu/>
   </div>
  );
}
