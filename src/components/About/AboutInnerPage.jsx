"use client"

import React, { useEffect, useState } from "react"
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import SidebarMainDrawer from '@/components/Shared/SidebarMainDrawer'
import axiosInstance from "@/helper/axiosInstance"
import SocialShare from "../Shared/SocialShare"
import { getImageUrl } from "@/helper/getImageUrl"
import BreadcrumbForNested from "../Shared/BreadcrumbForNested"
import { useSelected } from "@/context/SelectedContext"
import { useSelectedParrent } from "@/context/SelectedContextParrent"
import SkeletonDescription from "../Shared/Skeleton/SkeletonDescription"
import { motion, AnimatePresence } from "framer-motion";



export default function AboutInnerPage({ homePage, formattedCategories, slug }) {
    const { selected, clearSelected } = useSelected();
    const { selectedParrent, clearSelectedParrent } = useSelectedParrent();


    const [abouDatas, setAboutdatas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [selectedCat, setSelectedCat] = useState(null)
    // pagination states
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(10)
    const perPage = 1


    useEffect(() => {
        // clearSelected();
        // clearSelectedParrent();

    }, [])



    useEffect(() => {
        // setSelected(null)
        const fetchAboutData = async () => {
            setLoading(true)
            let url = `/posts?term_type=about_info&category_slug=${slug}&page=${currentPage}&per_page=${perPage}`

            try {
                const response = await axiosInstance.get(url)
                const data = response?.data?.data || []
                const meta = response?.data?.meta || {}

                setAboutdatas(data)
                setTotalPages(meta.last_page || 1)
            } catch (err) {
                console.error("Error fetching about:", err)
                setError(err.message || "Failed to fetch about")
            } finally {
                setLoading(false)
            }
        }

        fetchAboutData()
    }, [slug])


    const sections = homePage?.sections_on_api;
    const about_ExtraData = sections.find((s) => s.title_slug === "about-data");
    const image_arabic = getImageUrl(about_ExtraData?.image_media);




    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 24,
            filter: "blur(2px)",
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };





    return (
        <div>
            <div>
                <BreadcrumbForNested
                    items={[
                        { label: "Home", link: "/" },
                        { label: "About", link: "/about" },
                        { label: selectedParrent?.name, link: "/about" },
                        { label: selected?.name, link: null },
                    ]}
                />
            </div>

            <Container className="flex gap-6 my-6">
                {/* sidebar */}
                <SidebarMainDrawer
                    categories={formattedCategories}
                    setSelectedCat={setSelectedCat}
                    dataForContact={selected?.name || "about"}
                    isAboutNavigate={true} />

                {/* main content */}
                <AnimatePresence mode="wait">
                    <motion.div
                      key={slug}

                        className="w-full space-y-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: 12 }}
                    >
                        {/* Header */}
                        <motion.div variants={itemVariants}>
                            <InnerHeader
                                title={about_ExtraData?.sub_title}
                                image={image_arabic}
                            />
                        </motion.div>

                        {/* Content */}
                        {loading ? (
                            <motion.div variants={itemVariants}>
                                <SkeletonDescription />
                            </motion.div>
                        ) : abouDatas?.length > 0 ? (
                            <motion.div variants={itemVariants}>
                                <div>
                                    <h4 className="text-[#333333] font-bold text-2xl">
                                        {abouDatas[0]?.name}
                                    </h4>

                                    <div
                                        className="text-[#333333] text-sm sm:text-base mt-4"
                                        dangerouslySetInnerHTML={{
                                            __html: abouDatas[0]?.description,
                                        }}
                                    />
                                </div>

                                <div className="border-t mt-8 pt-3 flex items-center gap-4 text-[#D9E2DD]">
                                    <SocialShare data={abouDatas[0]?.description} />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.p
                                variants={itemVariants}
                                className="text-sm md:text-base lg:text-lg text-center"
                            >
                                No data Found
                            </motion.p>
                        )}
                    </motion.div>
                </AnimatePresence>


            </Container>
        </div>
    )
}
