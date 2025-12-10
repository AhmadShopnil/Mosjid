"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { splitBySlash } from "@/helper/splitBySpace";
import { getImageUrl } from "@/helper/getImageUrl";
import DirectorySearchHome from "./DirectorySearchHome";

export default function Directory({ allDataFOrDirectory }) {
  const { locations, directory_categories, homePage } = allDataFOrDirectory;

  const sections = homePage?.sections_on_api;
  const directory_extradata = sections.find(
    (s) => s.title_slug === "directory"
  );

  const heading_part_1 = splitBySlash(directory_extradata?.title)[0];
  const heading_part_2 = splitBySlash(directory_extradata?.title)[1];

  const arabic_image = getImageUrl(directory_extradata?.image_media);
  const icon = getImageUrl(directory_extradata?.background_media);

  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.55,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div
      id="directory"
      className="gradient-border h-full px-5 sm:px-8 pt-5 sm:pt-8 pb-20 rounded-[20px] bg-white relative shadow-lg"
    >
      <div className="absolute right-0 top-0">
        <Image
          src="/images/directory/Directory bg.png"
          alt="img"
          width={510}
          height={200}
          className="object-contain transition-all duration-300"
        />
      </div>

      {/* Heading */}
      <div className="flex justify-between mb-3">
        <div className="flex items-center gap-1 gradient-border_b pb-3">
          <Image src={icon} alt="Icon" width={60} height={59} />

          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]">
            <p>
              <span>{heading_part_1} </span>
              <span className="text-[#F7BA2A]">{heading_part_2}</span>
            </p>
            <p>{directory_extradata?.sub_title}</p>
          </div>
        </div>

        <div className="flex">
          <Image
            src={arabic_image}
            alt="Arabic"
            width={331}
            height={60}
            className="hidden sm:flex"
          />
          <Image
            src={arabic_image}
            alt="Arabic"
            width={150}
            height={40}
            className="sm:hidden"
          />
        </div>
      </div>

      <p className="text-sm">{directory_extradata?.short_description}</p>

      {/* Inputs */}
      <div className="mt-6">
        <DirectorySearchHome locations={locations} />
      </div>

      {/* Animated Directory Cards */}
      <div className="mt-8 md:mt-11 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-4 2xl:grid-cols-5 gap-2.5">
        {directory_categories?.map((item, index) => (
          <motion.div
            key={item.id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
          >
            <Link
              href={`/directory/${item?.id}`}
              className="gradient-borderDirectory h-[140px] flex flex-col items-center justify-center
             bg-white rounded-[20px] px-3 py-3 transition cursor-pointer text-center 
             hover:bg-teal-50 hover:scale-[1.04] duration-300"
            >
              <Image src={item?.image} alt="icon" width={60} height={60} />
              <p className="mt-2 text-base font-bold text-gray-700">{item?.name}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
