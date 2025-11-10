"use client";

import React, { useState } from "react";
import Image from "next/image";
import Container from "@/components/Shared/Container";
import Link from "next/link";
import { quickLinksAll } from "@/data/quickLinksData";
import { BASE_URL } from "@/helper/baseUrl";





export default function QuickLinksMobile({quickLinks}) {
  const [hoveredCard, setHoveredCard] = useState(null);


  return (
    <section className="bg-[#E5F5DE] py-8">
      <Container className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 2xl:grid-cols-8 gap-2">
        {quickLinks?.items?.map((link, i) => {
          const isHovered = hoveredCard === i;

          return (
            <Link
              key={i}
              href={`${link?.link}`}
              className={`flex flex-col items-center justify-center  transition-all duration-200 
                rounded-[50px] py-3.5 px-2 cursor-pointer text-center gradient-border
              bg-[#F5FFF8] text-[#00401A] shadow`}
              // onMouseEnter={() => setHoveredCard(i)}
              // onMouseLeave={() => setHoveredCard(null)}
              // onClick={() => handleOnclick(link)}
            >
              {/* Icon Section */}
              <div className=" flex items-center justify-center ">

                <Image
                  src={`${BASE_URL}${link?.menu_icon_url}`}
                alt={link?.label}
                  width={30}
                  height={33}
                  className={`object-contain transition-all duration-100 "}`}
                // className={`object-contain transition-all duration-100 group-hover:brightness-0 
                //   group-hover:invert  ${isHovered && "brightness-0 invert"}`}
                />
              </div>

              {/* Title */}
              <p className="mt-2 text-xs sm:text-sm font-semibold">{link?.label}</p>
              {/* <p className="mt-1 text-xs sm:text-sm font-semibold">{link?.jp}</p> */}
            </Link>
          );
        })}
      </Container>
    </section>
  );
}
