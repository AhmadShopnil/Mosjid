

import React from "react";


import GraveyardTopSection from "./GraveyardTopSection";
import { getPage } from "@/helper/actions";
import GraveyardBenefit from "./GraveyardBenefit";
import GraveyardFacilities from "./GraveyardFacilities";
import { ScrollSection } from "./GraveyardScrollWrapper";
import GraveyardTimeLine from "./GraveyardTimeLine";


export default async function GraveyardSection() {
  const madrashaData = await getPage("graveyard-land-roadmap");
  const sections = madrashaData?.sections_on_api;

  const graveyard_timeline = sections.find((s) => s.title_slug === "timeline-of-graveyard");
  const facilities_graveyard = sections.find((s) => s.title_slug === "facilities-of-graveyard");
  const graveyard_benefits = sections.find((s) => s.title_slug === "benefit-of-graveyard");



  return (
    <section className="w-full space-y-4 md:space-y-10 ">
      <GraveyardTopSection />

      <ScrollSection id="graveyard-timeline">
        <GraveyardTimeLine timeLines={graveyard_timeline?.sub_sections} />
      </ScrollSection>

      <ScrollSection id="graveyard-facilities">
        <GraveyardFacilities facilities_graveyard={facilities_graveyard} />
      </ScrollSection>

      <ScrollSection id="graveyard-benefits">
        <GraveyardBenefit graveyard_benefits={graveyard_benefits} />
      </ScrollSection>

    </section>
  );
}

/*  Cards */

