// components/Navbar.tsx
import Image from "next/image";
import React from "react";
import MainMenu from "./MainMenu";
import Topbar from "./Topbar";
import { getMenus, getSettings } from "@/helper/actions";

export default async function Header() {
  const settings = await getSettings();
  const menuItems = await getMenus(1);

  return (
    <div className="sticky top-0 z-[500] bg-white shadow-md">
      {/* Topbar */}
      <div className="bg-white">
        <Topbar settings={settings} />
      </div>

      {/* Main Menu */}
      <MainMenu settings={settings} menuItems={menuItems?.items} />
    </div>
  );
}
