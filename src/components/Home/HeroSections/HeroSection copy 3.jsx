"use client";
import Container from "@/components/Shared/Container";
// components/HeroSection.tsx
import Image from "next/image";
import React from "react";


export default function HeroSection() {
  return (
    <section className="bg-green-50 h-[570px] relative">
      {/* Full-width Banner Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/banner/banner1.png" 
          alt="Hero Banner"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Content on top of the banner */}
      <Container className="relative flex h-full items-center justify-center text-center">
       
      </Container>
    </section>
  );
}
