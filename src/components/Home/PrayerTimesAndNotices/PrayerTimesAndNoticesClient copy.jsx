"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "@/components/Shared/Container";
import PrayerTimes from "./PrayerTimes";
import NoticeBoard from "./NoticeBoard";

export default function PrayerTimesAndNoticesClient({ notices, settings, homePage, prayerTimes, ProhibitedTime }) {


  return (
    <div id="prayer-times">
      <Container className="flex flex-col xl:flex-row w-full gap-6 py-14">

        {/* Fade Right Animation (from left → right) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="w-full xl:w-[62%]"
        >
          <PrayerTimes
            prayerTimes={prayerTimes}
            ProhibitedTime={ProhibitedTime}
            settings={settings}
            homePage={homePage} />
        </motion.div>

        {/* Fade Left Animation (from right → left) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="w-full xl:w-[38%]"
        >
          <NoticeBoard
            notices={notices}
            settings={settings}
            homePage={homePage}
          />
        </motion.div>

      </Container>
    </div>
  );
}
