"use client";

import Image from "next/image";
import Container from '@/components/Shared/Container';
import React from 'react';
import Directory from './Directory/Directory';
import MakeDonation from './Donation/MakeDonation';

export default function DirecToryDonation() {
  return (
    <div className="relative min-h-[700px] pt-36 pb-20">
      {/* Background Image - Top Half */}
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src="/images/directory/bg.png" // Change to your actual image path
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Container className="flex flex-col xl:flex-row w-full h-full gap-6">
          <div className="w-full xl:w-[50%]">
            <Directory />
          </div>
          <div className="w-full xl:w-[50%] h-full">
            <MakeDonation />
          </div>
        </Container>
      </div>
    </div>
  );
}
