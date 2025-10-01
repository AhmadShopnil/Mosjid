// components/Navbar.tsx
import Image from "next/image";
import React from "react";
import MainMenu from "./MainMenu";
import Topbar from "./Topbar";
import { getSettings } from "@/helper/actions";

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


export default async function Header() {

  const settings = await getSettings();

  return (
   <div className="">
    <div className=" bg-white">
   <Topbar settings={settings}/>
    </div>
   <MainMenu settings={settings}/>
   </div>
  );
}
