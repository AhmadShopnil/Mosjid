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
    <div className="relative min-h-[600px]">
      {/* Background Image - Top Half Only */}
      <div className="absolute top-0 left-0 w-full h-2/3">
        <Image
          src="/images/fatwah/bg.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="relative z-10">
        <FatwahBox />
      </div>
    </div>
  );
}
