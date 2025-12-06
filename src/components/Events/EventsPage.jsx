
"use client"

import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import React, { useEffect, useState } from 'react'
import axiosInstance from '@/helper/axiosInstance'
import SidebarMainDrawer from '../Shared/SidebarMainDrawer'
import Events from './Events'
import { getImageUrl } from '@/helper/getImageUrl'
import { useSelected } from '@/context/SelectedContext'
import BreadcrumbForNested from '../Shared/BreadcrumbForNested'
import { useSelectedParrent } from '@/context/SelectedContextParrent'







export default function EventsPage({ homePage, settings, formattedCategories }) {
  const { selected, setSelected, clearSelected } = useSelected();
  const { selectedParrent, setSelectedParrent, clearSelectedParrent } = useSelectedParrent();
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCat, setSelectedCat] = useState(null)
  // pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  const perPage = 16

  useEffect(() => {
    clearSelected();
    clearSelectedParrent();
  }, [])


  // fetching data
  useEffect(() => {
    const fetchEvents = async () => {

      setLoading(true)

      let url = `/posts?term_type=events&page=${currentPage}&per_page=${perPage}`
      if (selected?.id) {
        url = `/posts?term_type=events&category_id=${selected?.id}&page=${currentPage}&per_page=${perPage}`
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


  // console.log("blogs", blogs)
  const sections = homePage?.sections_on_api;
  const blog_events_ExtraData = sections.find((s) => s.title_slug === "islamic-blog-and-events");
  const arabic = getImageUrl(blog_events_ExtraData?.image_media)

  const requestData = selected?.name ? `Events of ${selected?.name} ` : "Events"
  const section_title = selected?.name || selectedParrent?.name
  return (
    <div>

      <div>
        {/* <BannerInnerPage /> */}
        <BreadcrumbForNested
          items={[
            { label: "Home", link: "/" },
            { label: "Events", link: "/events" },
            { label: selectedParrent?.name, link: "/events" },
            { label: selected?.name, link: null },

          ]}
        />
        {/* <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Events" /> */}

      </div>


      <Container className='flex gap-6 my-6'>
        {/* sidebar */}
        <SidebarMainDrawer categories={formattedCategories} setSelectedCat={setSelectedCat} dataForContact={requestData} />

        {/* main content */}
        <div className=' w-full space-y-6'>
          <InnerHeader title={blog_events_ExtraData?.sub_title} image={arabic} />

          <div>
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
          </div>

        </div>
      </Container>

    </div>
  )
}
