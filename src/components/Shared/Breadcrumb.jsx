"use client";

import React from "react";
import Container from "../Shared/Container";
import Link from "next/link";



export default function Breadcrumb({
  homeLabel = "Home",
  currentPage,
  homeLink = "/",
}) {
  return (
    <div className="w-full h-[60px] flex items-center gradient-bredcumb">
      <Container className="w-full h-full">
        <div className="flex h-full">
         {/* Home Section */}
        <Link
        href={homeLink}
          className="gradient-bredcumb-a text-lg font-medium px-6 flex items-center justify-center  h-full w-[106px] text-[#00401A]"
          style={{
            backgroundColor: "#3198A0",
            clipPath:
              "polygon(98.41% 50%, 75% 99.05%, 0.71% 99.05%, 17.77% 50%, 0% 0.95%, 75% 0.95%)",
          }}
        >
          <span>  {homeLabel}</span>
        </Link>

          {/* Dynamic Section */}
          <div
            className="text-[#52B920] text-lg pr-2 flex items-center justify-center h-full w-[200px] -ml-4"
            style={{
              clipPath:
                "polygon(89.35% 50%, 75% 99.05%, 0.71% 99.05%, 12.71% 50%, 0% 0.95%, 75% 0.95%)",
              backgroundColor: "#ffffff",
            }}
          >
            <span>{currentPage}</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
