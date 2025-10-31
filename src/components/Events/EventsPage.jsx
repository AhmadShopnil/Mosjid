
"use client"

import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import React, { useEffect, useState } from 'react'
import axiosInstance from '@/helper/axiosInstance'
import SidebarMainDrawer from '../Shared/SidebarMainDrawer'
import Events from './Events'




const categories = [
  {
    id: "worship",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/1.png",
    title: "Worship",
    subtitle: "イバーダ",
    hasSubItems: true,
    subItems: ["Prayer", "Fasting", "Hajj"],
  },
  {
    id: "lifeMatters",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/Blog & event-1.png",
    title: "Life Matters",
    subtitle: "詳細",
    hasSubItems: true,
    subItems: ["Family", "Work", "Health"],
  },
  {
    id: "prohibition",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
    title: "Prohibition & Lawful",
    subtitle: "ハラール",
    hasSubItems: true,
    subItems: ["Halal", "Haram", "Makruh"],
  },
  {
    id: "chapter",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
    title: "Chapter",
    subtitle: "イスラムの章",
    hasSubItems: false,
    isArrow: true,
  },
  {
    id: "section",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
    title: "Section",
    subtitle: "イスラムの章",
    hasSubItems: false,
    isArrow: true,
  },
  {
    id: "quran",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
    title: "Quran and Hadith",
    subtitle: "ギャラリー",
    hasSubItems: true,
    subItems: ["Quran", "Hadith", "Tafsir"],
  },
  {
    id: "purity",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
    title: "Purity and Impurity",
    subtitle: "詳細",
    hasSubItems: true,
    subItems: ["Wudu", "Ghusl", "Tayammum"],
  },
  {
    id: "social",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
    title: "Social Life",
    subtitle: "ブログイベント",
    hasSubItems: true,
    subItems: ["Etiquette", "Rights", "Duties"],
  },
  {
    id: "beliefs",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
    title: "Beliefs",
    subtitle: "",
    hasSubItems: true,
    subItems: ["Aqeedah", "Tawheed"],
  },
  {
    id: "decency",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
    title: "Decency",
    subtitle: "イスラム教の道徳",
    hasSubItems: true,
    subItems: ["Modesty", "Honesty", "Kindness"],
  },
];

const categories2 = [
  {
    id: "worship",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/1.png",
    title: "Worship",
    subtitle: "イバーダ",
    hasSubItems: true,
    subItems: ["Prayer", "Fasting", "Hajj"],
  },
  {
    id: "lifeMatters",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/Blog & event-1.png",
    title: "Life Matters",
    subtitle: "詳細",
    hasSubItems: true,
    subItems: ["Family", "Work", "Health"],
  },
  {
    id: "prohibition",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
    title: "Prohibition & Lawful",
    subtitle: "ハラール",
    hasSubItems: true,
    subItems: ["Halal", "Haram", "Makruh"],
  },

];


export default function EventsPage({ homePage, settings, formattedCategories }) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCat, setSelectedCat] = useState(null)
  // pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  const perPage = 16



  // fetching data
  useEffect(() => {
    const fetchEvents = async () => {

      setLoading(true)

      let url = `/posts?term_type=events&page=${currentPage}&per_page=${perPage}`
      if (selectedCat) {
        url = `/posts?term_type=events&category_id=${selectedCat}&page=${currentPage}&per_page=${perPage}`
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



  return (
    <div>

      <div>
        <BannerInnerPage />
        <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Events" />

      </div>


      <Container className='flex gap-6 my-6'>
        {/* sidebar */}
        <SidebarMainDrawer categories={formattedCategories} setSelectedCat={setSelectedCat} />

        {/* main content */}
        <div className=' w-full space-y-6'>
            <InnerHeader title={"掲示板"} image={"/images/fatwah/fatwaharbic_white.png"} />

          <div>
            <Events
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
