"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import BlogCardHome from "./BlogCardHome";
import { motion } from "framer-motion";

import { getMetaValueByMetaName } from "@/helper/metaHelpers";

export default function Blogs({ blogsAllData }) {


  const { view_more_button_text, blogsSectionTitle, settings, blogs } = blogsAllData;


  // const view_more_button_text =
  //   getMetaValueByMetaName(settings, "view_more") ;

  // console.log("settings  from blogs home", settings)
  console.log("view_more_button_text  from blogs home", view_more_button_text)




  return (
    <motion.div
      className="gradient-border rounded-3xl p-5 bg-white shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* heading */}
      <motion.div
        className="gradient-border_b pb-2 flex justify-between"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h4 className="text-[#00401A] font-bold text-base">
          {blogsSectionTitle}
        </h4>

        <motion.div whileHover={{ x: 4 }}>
          <Link
            href="/blogs"
            className="text-[#00401A] font-bold text-sm flex gap-2 items-center"
          >
            {view_more_button_text} 
          
            <Image
              src="/images/others/arrowR.png"
              alt="a1"
              width={18}
              height={18}
            />
          </Link>
        </motion.div>
      </motion.div>

      {/* Blogs */}
      <div className="mt-6 flex flex-col gap-3">
        {blogs?.slice(0, 3).map((blog, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            viewport={{ once: true }}
          >
            <BlogCardHome blog={blog} settings={settings} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
