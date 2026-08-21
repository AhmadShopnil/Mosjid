import Benefits from "@/components/Services/islamicSchool/Benefits";
import ContactFormIslamicSchool from "@/components/Services/islamicSchool/ContactFormIslamicSchool";
import Facilities from "@/components/Services/islamicSchool/Facilities";
import IslamicSchoolHeader from "@/components/Services/islamicSchool/IslamicSchoolHeader";
import TimeLine from "@/components/Services/islamicSchool/TimeLine";
import SuggestionBox from "@/components/Services/SuggestionBox/SuggestionBox";
import React from "react";

export default function page() {
  return (
    <div className="space-y-3 lg:space-y-4">
      <IslamicSchoolHeader />
      <TimeLine />
      <Facilities />
      <Benefits />

      <SuggestionBox/>
      {/* <ContactFormIslamicSchool /> */}
    </div>
  );
}
