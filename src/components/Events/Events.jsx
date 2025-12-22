"use client"

import React from 'react'

import EventCard from './EventCard'
import Pagination from '../Shared/Pagination'
import EventCardSkeletonList from '../Shared/Skeleton/EventCardSkeletonList'
import { motion } from "framer-motion"


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
      duration: 0.65,
      ease: "easeOut",
    },
  },
}

export default function Events({
  events,
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

  const eventsSectionTitle =
    blog_events_ExtraData?.custom_information?.find(
      (item) => item.label === "upcoming_events"
    )

  return (
    <div className="gradient-border rounded-3xl p-6 bg-[#F9FFF6] h-full shadow-md">
      {/* Heading */}
      <div className="flex justify-between">
        <h4 className="text-[#00401A] font-bold text-xl sm:text-2xl md:text-3xl gradient-border_b pb-3">
          {section_title || eventsSectionTitle?.value}
        </h4>
      </div>

      {/* Events */}
      {loading ? (
        <EventCardSkeletonList />
      ) : events?.length === 0 ? (
        <div className="mt-6 w-full flex justify-center">
          <p className="text-gray-600 text-lg font-medium">
            No events found
          </p>
        </div>
      ) : (
        <motion.div
          className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} 
        >
          {events.map((event, i) => (
            <motion.div key={i} variants={cardVariants}>
              <EventCard
                event={event}
                index={i}
                settings={settings}
              />
            </motion.div>
          ))}
        </motion.div>
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
