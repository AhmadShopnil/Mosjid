

import React from "react";
import MadrashaBenefits from "./MadrashaBenefits";
import MadrasaFacilities from "./MadrasaFacilities";
import Image from "next/image";
import MadrashaTimeline from "./MadrashaTimeline";
import MadrashaTopSection from "./MadrashaTopSection";
import { getPage } from "@/helper/actions";
import { getImageUrl } from "@/helper/getImageUrl";




export default async function MadrasaSection({ madrashaPageData }) {
  const madrashaData = await getPage("madrasha-2");
  const sections = madrashaData?.sections_on_api;

  const madrasa_timeline = sections.find((s) => s.title_slug === "madrasa-time-line");
  const madrasa_facilities = sections.find((s) => s.title_slug === "madrasa-facilities");
  const madrasa_benefits = sections.find((s) => s.title_slug === "madrasa-benefits-");

  const timeline_image = getImageUrl(madrasa_timeline?.image_media);

  return (
    <section className="w-full space-y-4 md:space-y-6 ">
      <MadrashaTopSection />

      {timeline_image && <MadrashaTimeline timeline_image={timeline_image} />}


      <MadrasaFacilities madrasa_facilities={madrasa_facilities} />

      <MadrashaBenefits madrasa_benefits={madrasa_benefits} />

    </section>
  );
}

/*  Cards */
