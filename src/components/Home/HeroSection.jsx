
"use client"
// components/HeroSection.tsx
import Image from "next/image";
import React from "react";
import Container from "../Shared/Container";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-green-50 h-[570px] ">
      <div className="absolute  top-1/4  w-[50%] h-[330px] border-y-4 border-r-4
       border-[#3096A3]  ">

      </div> 
      <Container className="flex  h-full  ">
        {/* Left Content */}
        <div className="w-[60%] h-full flex  items-center "> 
          <div className="w-[75%]">
  
              <h3 className="text-4xl font-bold text-[#00401A] leading-11 mb-2">Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</h3>
              <h4 className="text-2xl font-bold text-[#00401A] leading-11 mb-2">Lorem ipsum dolor sit amet consectetur</h4>
              <p className="text-base  text-[#00401A] leading-7 mb-4">Lorem ipsum dolor sit amet consectetur. Sodales integer vitae sed mauris proin gravida. Proin vestibulum adipiscing iaculis quis quis. </p>
              <Link
              href="/"
              className="bg-[#F7BA2A] px-5 py-2.5 rounded-[10px] font-bold text-[20px]"
              >
                Read More
              </Link>
          </div>
        </div>
          {/* right side */}
          <div className="w-[40%] h-full "> 
            <Image
            src={'/images/banner/1.png'}
            alt={"banner1"}
            width={547}
            height={571}
            />


          </div>
      </Container>
    </section>
  );
}
