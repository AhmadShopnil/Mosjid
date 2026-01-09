"use client"

import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import React, { useEffect, useState } from 'react'
import axiosInstance from '@/helper/axiosInstance'
import SidebarMainDrawer from '../Shared/SidebarMainDrawer'
import Events from './Events'
import { getImageUrl } from '@/helper/getImageUrl'
import BreadcrumbForNested from '../Shared/BreadcrumbForNested'
import { useSelected } from '@/context/SelectedContext'
import { useSelectedParrent } from '@/context/SelectedContextParrent'

// 👉 animation
import { motion, AnimatePresence } from "framer-motion"

/* =======================
   Animation Variants
======================= */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.55,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
}

export default function EventsPage({ homePage, settings, formattedCategories }) {
  const { selected, clearSelected } = useSelected()
  const { selectedParrent, clearSelectedParrent } = useSelectedParrent()

  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCat, setSelectedCat] = useState(null)

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  const perPage = 16

  useEffect(() => {
    clearSelected()
    clearSelectedParrent()
  }, [])


  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)

      let url = `/posts?term_type=events&page=${currentPage}&per_page=${perPage}`
      if (selected?.id) {
        url = `/posts?term_type=events&category_id=${selected.id}&page=${currentPage}&per_page=${perPage}`
      }

      try {
        const response = await axiosInstance.get(url)
        const data = response?.data?.data || []
        const meta = response?.data?.meta || {}

        setEvents(data)
        setTotalPages(meta.last_page || 1)
      } catch (err) {
        console.error("Error fetching events:", err)
        setError(err.message || "Failed to fetch events")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [selectedCat, currentPage])


  const sections = homePage?.sections_on_api || []
  const blog_events_ExtraData = sections.find(
    (s) => s.title_slug === "islamic-blog-and-events"
  )

  const arabic = getImageUrl(blog_events_ExtraData?.image_media)
  const requestData = selected?.name ? `Events of ${selected?.name}` : "Events"
  const section_title = selected?.name || selectedParrent?.name

  return (
    <div>
      {/* Breadcrumb */}
      <BreadcrumbForNested
        items={[
          { label: "Home", link: "/" },
          { label: "Events", link: "/events" },
          { label: selectedParrent?.name, link: "/events" },
          { label: selected?.name, link: null },
        ]}
      />

      <Container className="flex gap-6 my-6">
        {/* Sidebar */}
        <SidebarMainDrawer
          categories={formattedCategories}
          setSelectedCat={setSelectedCat}
          dataForContact={requestData}
        />

    
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCat}-${currentPage}`}
            className="w-full space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 10 }}
          >
            <motion.div variants={itemVariants}>
              <InnerHeader
                title={blog_events_ExtraData?.sub_title}
                image={arabic}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Events
                section_title={section_title}
                events={events}
                settings={settings}
                homePage={homePage}
                loading={loading}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </div>
  )
}
