"use client";
import React from "react";
import Container from "@/components/Shared/Container";
import PrayerTimes from "./PrayerTimes";
import NoticeBoard from "./NoticeBoard";

export default function PrayerTimesAndNoticesClient({
  notices,
  settings,
  homePage,
  prayerTimes,
  ProhibitedTime,
}) {
  return (

    <div id="prayer-times">
      <Container className="flex flex-col xl:flex-row w-full gap-6 py-14">

        <div
          className="w-full xl:w-[62%]"
        >
          <PrayerTimes
            prayerTimes={prayerTimes}
            ProhibitedTime={ProhibitedTime}
            settings={settings}
            homePage={homePage}
          />
        </div>

     

        <div       
          className="w-full xl:w-[38%]"
        >
          <NoticeBoard
            notices={notices}
            settings={settings}
            homePage={homePage}
          />
        </div>

        

      </Container>
    </div>

  );
}
