import Benefits from "@/components/Services/islamicSchool/Benefits";
import ContactFormIslamicSchool from "@/components/Services/islamicSchool/ContactFormIslamicSchool";
import Facilities from "@/components/Services/islamicSchool/Facilities";
import IslamicSchoolHeader from "@/components/Services/islamicSchool/IslamicSchoolHeader";
import TimeLine from "@/components/Services/islamicSchool/TimeLine";
import SuggestionBox from "@/components/Services/SuggestionBox/SuggestionBox";
import { getPage } from "@/helper/actions";
import React from "react";

export default async function page() {


  const isalamic_school_development = await getPage("islamic-school-overview")
  const sections = isalamic_school_development?.sections_on_api;

  const isalamic_school_development_timeline = sections.find((s) => s.title_slug === "time-line-of-islamic-school-");
  const isalamic_school_development_facilities = sections.find((s) => s.title_slug === "islamic-school-facilities");
  const isalamic_school_development_benefits = sections.find((s) => s.title_slug === "islamic-school-benefit-");
  // console.log("isalamic_school_development_timeline",isalamic_school_development_timeline)

  return (
    <div className="space-y-3 lg:space-y-4">
      <IslamicSchoolHeader />
      <TimeLine isalamic_school_development_timeline={isalamic_school_development_timeline} />
      <Facilities isalamic_school_development_facilities={isalamic_school_development_facilities} />
      <Benefits isalamic_school_development_benefits={isalamic_school_development_benefits} />

      <SuggestionBox />
      {/* <ContactFormIslamicSchool /> */}
    </div>
  );
}
