"use client";
import Container from "@/components/Shared/Container";
// components/HeroSection.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";


export default function HeroSectionSlider() {
  return (
    <section className="bg-green-50 h-[570px] relative">
      {/* Full-width Banner Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/banner/ban1.png" 
          alt="Hero Banner"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Content on top of the banner */}
      <Container className="relative flex h-full     ">
       <div className="absolute top-1/4 w-[40%] ">
        <h3 className="text-4xl text-[#00401A] font-bold leading-12">Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</h3>
        <p className="text-2xl text-[#00401A] font-bold leading-10 my-2"> Lorem ipsum dolor sit amet Lorem ipsum dolor</p>
        <p className="text-base text-[#001609] mb-10"> Lorem ipsum dolor sit amet Lorem ipsum dolor. Lorem ipsum dolor sit amet Lorem ipsum dolor. Lorem ipsum dolor sit amet Lorem ipsum dolor. Lorem ipsum dolor sit amet Lorem ipsum dolor. </p>
        <Link
        href='/'
        className="bg-[#F7BA2A] px-5 py-3 rounded-xl text-white text-lg "
        >
          Read more
        </Link>
       </div>
      </Container>
    </section>
  );
}
