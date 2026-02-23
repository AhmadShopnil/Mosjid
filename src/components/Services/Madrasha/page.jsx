"use client";

import React from "react";
import MadrashaBenefits from "./MadrashaBenefits";
import MadrasaFacilities from "./MadrasaFacilities";
import Image from "next/image";
import MadrashaTimeline from "./MadrashaTimeline";
import MadrashaTopSection from "./MadrashaTopSection";




export default function MadrasaSection({ madrashaPageData }) {



  return (
    <section className="w-full space-y-4 md:space-y-6 ">
      <MadrashaTopSection />
      <MadrashaTimeline timeLineImage={madrashaPageData?.featured_image} />

      <MadrasaFacilities />

      <MadrashaBenefits />

    </section>
  );
}

/*  Cards */
