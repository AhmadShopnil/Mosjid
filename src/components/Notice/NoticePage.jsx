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



    return (
        <div>
            <div>
                <BannerInnerPage />
                <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Notices Board" />
            </div>

            <Container className="flex gap-6 my-6">
                {/* sidebar */}
                <SidebarMainDrawer categories={formattedCategories} setSelectedCat={setSelectedCat} />

                {/* main content */}
                <div className="w-full space-y-6">
                    <InnerHeader title={"掲示板"} image={"/images/fatwah/fatwaharbic_white.png"} />

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

                    <ArchiveNotice />
                </div>
            </Container>
        </div>
    )
}
