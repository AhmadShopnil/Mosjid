"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

import { formatTo12Hour } from "@/helper/formatTo12Hour";

export default function PrayerTimeTableRow({ prayer, index }) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.4,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      className="bg-[#F6FFF1] text-gray-800 border-b border-gray-200 last:border-b-0"
    >
      <td className="p-1 flex items-center gap-2">
        <Image src={prayer?.featured_image} alt="icon" width={50} height={50} />

        <span className="font-bold text-base text-[#00401A]">
          {prayer?.name}
          <br />
          <span className="text-[#00401a5d]">{prayer?.sub_title}</span>
        </span>
      </td>
      <td className="p-3 text-[#56410F] text-base ">{prayer?.time}</td>

      <td className="px-3 text-[#3E8B18] text-base ">
        {prayer?.wakt_start_hanfi !== prayer?.wakt_start_safi ? (
          <>
            <div className="flex items-center  gap-2 ">
              <span> {formatTo12Hour(prayer?.wakt_start_hanfi)}</span>
              <Image
                src="/images/prayertimes/jahur.svg"
                alt="icon"
                width={20}
                height={20}
                className=""
              />
            </div>

            <div className="flex items-center  gap-2 ">
              <span className="border-t-1 border-gray-200 ">
                {formatTo12Hour(prayer?.wakt_start_safi)}
              </span>
              <div className="flex">
                <Image
                  src="/images/prayertimes/jahur.svg"
                  alt="icon"
                  width={20}
                  height={20}
                  className=""
                />

                <Image
                  src="/images/prayertimes/jahur.svg"
                  alt="icon"
                  width={20}
                  height={20}
                  className=""
                />
              </div>
            </div>
          </>
        ) : (
          <span>{formatTo12Hour(prayer?.wakt_start_hanfi)}</span>
        )}
      </td>

      <td className="px-3 text-[#FF0000] text-base ">
        {prayer?.wakt_end_safi !== prayer?.wakt_end_hanfi ? (
          <>
            <div className="text-[#EB5757] flex items-center  gap-2">
              <span> {formatTo12Hour(prayer?.wakt_end_hanfi)}</span>
              <Image
                src="/images/prayertimes/jahur.svg"
                alt="icon"
                width={20}
                height={20}
                className=""
              />
            </div>

            <div className="text-[#EB5757] flex items-center  gap-2 ">
              <span className=" border-t-1 border-gray-200 ">
                {" "}
                {formatTo12Hour(prayer?.wakt_end_safi)}
              </span>
              <div className="flex">
                <Image
                  src="/images/prayertimes/jahur.svg"
                  alt="icon"
                  width={20}
                  height={20}
                  className=""
                />

                <Image
                  src="/images/prayertimes/jahur.svg"
                  alt="icon"
                  width={20}
                  height={20}
                  className=""
                />
              </div>
            </div>
          </>
        ) : (
          <span>{formatTo12Hour(prayer?.wakt_end_hanfi)}</span>
        )}
      </td>
    </motion.tr>
  );
}
