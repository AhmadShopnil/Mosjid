"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getMetaValueByMetaName } from "@/helper/metaHelpers";
import { Download } from "lucide-react";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function FatwaListClient({ fatwahs, penIcon, settings }) {
    
  const read_more = getMetaValueByMetaName(settings, "read_more") || "";
  const download = getMetaValueByMetaName(settings, "download") || "";

  return (
    <div>
      {" "}
      <ul className="space-y-4">
        {fatwahs?.data?.slice(0, 6).map((item, i) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              delay: i * 0.15, 
              ease: "easeOut",
            }}
            className="flex justify-between items-center border bg-white border-[#D9E2DD] p-1.5 rounded-full 
            relative z-10"
          >
            {/* Left Content */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="border border-[#E6ECE8] rounded-full p-1.5 md:p-2 w-[60px] h-[60px] ">
                <Image
                  src={penIcon}
                  alt="icon"
                  width={45}
                  height={45}
                  className="hidden sm:flex"
                />
                <Image
                  src={penIcon}
                  alt="icon"
                  width={40}
                  height={40}
                  className="flex sm:hidden"
                />
              </div>

              <div>
                <p
                  className="text-[#00401A] truncate w-[110px] sm:w-[250px] md:w-[420px] 
                  text-sm md:text-lg font-bold"
                >
                  {item?.word_ja}
                </p>

                <Link
                  href={`/fatwah/${item?.id}`}
                  className="text-[#00401A] font-bold text-xs md:text-sm hover:text-[#F7BA2A] flex gap-1 items-center"
                >
                  {read_more}
                  <span className="mt-0.5">
                    <FaLongArrowAltRight />
                  </span>
                </Link>
              </div>
            </div>

            {/* Download button */}
            <button
              className="flex items-center gap-2 px-4 md:px-5 py-3 cursor-pointer gradient-border3 
              rounded-[100px] text-[#00401A] font-bold text-xs sm:text-sm md:text-lg"
            >
              {download}
              <Download className="w-5 h-5" />
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
