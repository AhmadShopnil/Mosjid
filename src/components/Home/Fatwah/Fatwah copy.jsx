"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import FatwahBox from "./FatwahBox";

export default function FatwahSection() {
  const fatwahs = [
    { id: 1, title: "Lorem ipsum dolor sit amet dolor sit amet, consectetur...", link: "#" },
    { id: 2, title: "Lorem ipsum dolor sit amet dolor sit amet, consectetur...", link: "#" },
    { id: 3, title: "Lorem ipsum dolor sit amet dolor sit amet, consectetur...", link: "#" },
    { id: 4, title: "Lorem ipsum dolor sit amet dolor sit amet, consectetur...", link: "#" },
    { id: 5, title: "Lorem ipsum dolor sit amet dolor sit amet, consectetur...", link: "#" },
    { id: 6, title: "Lorem ipsum dolor sit amet  dolor sit amet, consectetur...", link: "#" },
  ];

  return (
    <div
    className="relative "
    //  className="relative bg-gradient-to-br from-green-100 to-white min-h-screen"
        style={{
        backgroundImage: "url('/images/fatwah/bg.png')",
        backgroundSize: "cover",          
        backgroundPosition: "center",     
        backgroundRepeat: "no-repeat",  
      }}
     >
      <FatwahBox/>
    </div>
  );
}
