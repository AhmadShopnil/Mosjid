"use client"

import React, { useEffect, useState } from "react"
import ArchiveNotice from '@/components/Notice/ArchiveNotice'
import NoticeBoard from '@/components/Notice/NoticeBoard'
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import SidebarMainDrawer from '@/components/Shared/SidebarMainDrawer'
import axiosInstance from "@/helper/axiosInstance"
import { getImageUrl } from "@/helper/getImageUrl"
import BreadcrumbForNested from "../Shared/BreadcrumbForNested"
import { useSelected } from "@/context/SelectedContext"
import { useSelectedParrent } from "@/context/SelectedContextParrent"
import { motion, AnimatePresence } from "framer-motion"




export default function NoticePage({ homePage, settings, formattedCategories }) {
    const { selected, setSelected, clearSelected } = useSelected();
    const { selectedParrent, setSelectedParrent, clearSelectedParrent } = useSelectedParrent();
    const [notices, setNotices] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedCat, setSelectedCat] = useState(null)
    // pagination states
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(10)
    const perPage = 6


    useEffect(() => {
        clearSelected();
        clearSelectedParrent();
    }, [])



    useEffect(() => {
        const fetchNotices = async () => {
            setLoading(true)
            let url = `/posts?term_type=notices&page=${currentPage}&per_page=${perPage}&order_by=order_column:asc`
            if (selectedCat) {
                url = `/posts?term_type=notices&category_id=${selectedCat}&page=${currentPage}&per_page=${perPage}&order_by=order_column:asc`
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
    const arabic = getImageUrl(notice_Extra_data?.image_media)
    const section_title = selected?.name || selectedParrent?.name



    // for animation
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
            filter: "blur(1px)",
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.75,
                ease: "easeOut",
            },
        },
    }


    return (
        <div>
            <div>
                <BreadcrumbForNested
                    items={[
                        { label: "Home", link: "/" },
                        { label: "Notices", link: "/notices" },
                        { label: selectedParrent?.name, link: "/notices" },
                        { label: selected?.name, link: null },

                    ]}
                />
            </div>

            <Container className="flex gap-6 my-6">
                {/* sidebar */}
                <SidebarMainDrawer categories={formattedCategories} setSelectedCat={setSelectedCat} dataForContact={`Notice`} />

                {/* main content */}
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
                                title={notice_Extra_data?.sub_title}
                                image={arabic}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <NoticeBoard
                                section_title={section_title}
                                homePage={homePage}
                                notices={notices}
                                settings={settings}
                                loading={loading}
                                currentPage={currentPage}
                                totalPages={totalPages}
                                setCurrentPage={setCurrentPage}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <ArchiveNotice homePage={homePage} />
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

            </Container>
        </div>
    )
}
