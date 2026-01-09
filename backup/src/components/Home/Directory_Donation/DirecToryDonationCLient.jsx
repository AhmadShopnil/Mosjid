"use client";

import Container from '@/components/Shared/Container';
import React from 'react';
import Directory from './Directory/Directory';
import MakeDonation from './Donation/MakeDonation';
import { motion } from "framer-motion";

export default function DirecToryDonationClient({
  allDataFOrDirectory,
  donationMethods,
  homePage
}) {

  const sections = homePage?.sections_on_api;
  const make_your_donation = sections.find((s) => s.title_slug === "make-your-doantion");

  return (
    <Container className="flex flex-col xl:flex-row w-full h-full gap-4  ">

      {/* LEFT SECTION — DIRECTORY */}
      <motion.div
        className="w-full xl:w-[50%] flex-1 "
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Directory allDataFOrDirectory={allDataFOrDirectory} />
      </motion.div>

      {/* RIGHT SECTION — MAKE DONATION */}
      <motion.div
        className="w-full xl:w-[50%] flex-1 "
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        viewport={{ once: true, amount: 0.2 }}
      >
     
        <MakeDonation
          donationMethods={donationMethods}
          make_your_donation={make_your_donation}
        />
      </motion.div>

    </Container>
  );
}
