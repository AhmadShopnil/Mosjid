import Benefits from "@/components/Services/islamicSchool/Benefits";
import ContactFormIslamicSchool from "@/components/Services/islamicSchool/ContactFormIslamicSchool";
import Facilities from "@/components/Services/islamicSchool/Facilities";
import IslamicSchoolHeader from "@/components/Services/islamicSchool/IslamicSchoolHeader";
import TimeLine from "@/components/Services/islamicSchool/TimeLine";
import React from "react";

export default function page() {
  return (
    <div>
      <IslamicSchoolHeader />
      <TimeLine />
      <Facilities />
      <Benefits />
      <ContactFormIslamicSchool />
    </div>
  );
}
