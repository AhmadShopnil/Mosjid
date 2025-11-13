"use client"

import React, { useEffect, useState } from "react"
import ArchiveNotice from '@/components/Notice/ArchiveNotice'
import NoticeBoard from '@/components/Notice/NoticeBoard'
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import SidebarMainDrawer from '@/components/Shared/SidebarMainDrawer'
import axiosInstance from "@/helper/axiosInstance"
import { splitBySlash } from "@/helper/splitBySpace"
import { getImageUrl } from "@/helper/getImageUrl"

export default function NoticePage({ homePage, settings, formattedCategories }) {
    
    const [notices, setNotices] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedCat, setSelectedCat] = useState(null)
    // pagination states
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(10)
    const perPage=6

    useEffect(() => {
        const fetchNotices = async () => {
            setLoading(true)
            let url = `/posts?term_type=notices&page=${currentPage}&per_page=${perPage}`
            if (selectedCat) {
                url = `/posts?term_type=notices&category_id=${selectedCat}&page=${currentPage}&per_page=${perPage}`
            }

            try {
                const response = await axiosInstance.get(url)
                const data = response?.data?.data || []
                const meta = response?.data?.meta || {}

                setNotices(data)
                setTotalPages(meta.last_page || 1)
            } catch (err) {
                console.error("Error fetching notices:", err)
                setError(err.message || "Failed to fetch notices")
            } finally {
                setLoading(false)
            }
        }

        fetchNotices()
    }, [selectedCat, currentPage])



  // get notice extra data from home page section management
  const sections = homePage?.sections_on_api;
  const notice_Extra_data = sections.find((s) => s.title_slug === "notice-board");
  const heading_part_1 = splitBySlash(notice_Extra_data?.title)[0]
  const heading_part_2 = splitBySlash(notice_Extra_data?.title)[1]

   const arabic = getImageUrl(notice_Extra_data?.image_media)
    const icon = getImageUrl(notice_Extra_data?.background_media)

    

    return (
        <div>
            <div>
                <BannerInnerPage />
                <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Notices Board" />
            </div>

            <Container className="flex gap-6 my-6">
                {/* sidebar */}
                <SidebarMainDrawer categories={formattedCategories} setSelectedCat={setSelectedCat} dataForContact={`Notice`} />

                {/* main content */}
                <div className="w-full space-y-6">
                    <InnerHeader title={notice_Extra_data?.sub_title} image={arabic} />

                    {/* Notice board */}
                    <NoticeBoard
                        homePage={homePage}
                        notices={notices}
                        settings={settings}
                        loading={loading}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                    />

                    <ArchiveNotice   homePage={homePage} />
                </div>
            </Container>
        </div>
    )
}
