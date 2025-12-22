"use client"

import React from 'react'
import { getMetaValueByMetaName } from '@/helper/metaHelpers'
import BlogCard from './BlogCard'
import Pagination from '../Shared/Pagination'
import { getImageUrl } from '@/helper/getImageUrl'
import BlogCardSkeletonList from '../Shared/Skeleton/BlogCardSkeletonList'
import { motion } from "framer-motion"

/* =======================
   Scroll Animation
======================= */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: .75,
      ease: "easeOut",
    },
  },
}

export default function Blogs({
  blogs,
  settings,
  homePage,
  loading,
  currentPage,
  setCurrentPage,
  totalPages,
  section_title,
}) {
  const sections = homePage?.sections_on_api || []
  const blog_events_ExtraData = sections.find(
    (s) => s.title_slug === "islamic-blog-and-events"
  )

  const image = getImageUrl(blog_events_ExtraData?.image_media)
  const blogsSectionTitle =
    blog_events_ExtraData?.custom_information?.find(
      (item) => item.label === "top_blogs"
    )

  const view_more_button_text =
    getMetaValueByMetaName(settings, "view_more") || ""

  return (
    <div className="border border-[#C9E9BA] rounded-[20px] p-5 bg-[#c9e9ba20] shadow-md">
      {/* Heading */}
      <div className="flex justify-between">
        <h4 className="text-[#00401A] font-bold text-xl sm:text-2xl lg:text-3xl gradient-border_b pb-2">
          {section_title || blogsSectionTitle?.value}
        </h4>
      </div>

      {/* Blogs */}
      {loading ? (
        <BlogCardSkeletonList />
      ) : blogs && blogs.length > 0 ? (
        <motion.div
          className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} // 🔥 animate on scroll up & down
        >
          {blogs.map((blog, i) => (
            <motion.div key={i} variants={cardVariants}>
              <BlogCard blog={blog} settings={settings} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="mt-6 text-center text-gray-500 text-lg">
          No blogs found.
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
