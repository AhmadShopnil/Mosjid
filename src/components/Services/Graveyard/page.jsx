

import React from "react";

import GraveyardTimeline from "./GraveyardTimeline";
import GraveyardTopSection from "./GraveyardTopSection";
import { getPage } from "@/helper/actions";
import { getImageUrl } from "@/helper/getImageUrl";
import GraveyardBenefit from "./GraveyardBenefit";
import GraveyardFacilities from "./GraveyardFacilities";




export default async function GraveyardSection() {
  const madrashaData = await getPage("graveyard-land-roadmap");
  const sections = madrashaData?.sections_on_api;

  const madrasa_timeline = sections.find((s) => s.title_slug === "madrasa-time-line");
  const facilities_graveyard = sections.find((s) => s.title_slug === "facilities-of-graveyard");
  const graveyard_benefits = sections.find((s) => s.title_slug === "benefit-of-graveyard");

  const timeline_image = getImageUrl(madrasa_timeline?.image_media);

  return (
    <section className="w-full space-y-4 md:space-y-10 ">
      <GraveyardTopSection />

      {timeline_image && <GraveyardTimeline timeline_image={timeline_image} />}

      <GraveyardFacilities facilities_graveyard={facilities_graveyard} />
      <GraveyardBenefit graveyard_benefits={graveyard_benefits} />




    </section>
  );
}

/*  Cards */
