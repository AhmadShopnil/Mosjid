"use client"

import React, { useEffect, useState } from "react"
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import SidebarMainDrawer from '@/components/Shared/SidebarMainDrawer'
import axiosInstance from "@/helper/axiosInstance"
import Image from "next/image"
import SocialShare from "../Shared/SocialShare"
import { splitBySlash } from "@/helper/splitBySpace"
import { getImageUrl } from "@/helper/getImageUrl"
import BreadcrumbForNested from "../Shared/BreadcrumbForNested"
import { useSelected } from "@/context/SelectedContext"
import { useSelectedParrent } from "@/context/SelectedContextParrent"

import SkeletonDescription from "../Shared/Skeleton/SkeletonDescription"
import BannerInnerPageServerSide from "../Shared/BannerInnerPageServerSide"



export default function AboutInnerPage({ homePage, settings, formattedCategories }) {
    const { selected, setSelected, clearSelected } = useSelected();
    const { selectedParrent, setSelectedParrent, clearSelectedParrent } = useSelectedParrent();


    const [abouDatas, setAboutdatas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [selectedCat, setSelectedCat] = useState(null)
    // pagination states
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(10)
    const perPage = 6


    useEffect(() => {
        // setSelected(null)
        clearSelected();
        clearSelectedParrent();

    }, [])




    useEffect(() => {
        // setSelected(null)
        const fetchAboutData = async () => {
            setLoading(true)
            let url = `/posts?term_type=about_info&page=${currentPage}&per_page=${perPage}`
            if (selectedCat) {
                url = `/posts?term_type=about_info&category_id=${selectedCat}&page=${currentPage}&per_page=${perPage}`
            }

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
    }, [selectedCat, currentPage])


    const sections = homePage?.sections_on_api;
    const about_ExtraData = sections.find((s) => s.title_slug === "about-data");


    const image_arabic = getImageUrl(about_ExtraData?.image_media);
    //   const icon = getImageUrl(about_ExtraData?.background_media);



    // console.log("about selected", selected)

    return (
        <div>
            <div>
                {/* <BannerInnerPage /> */}
                {/* <BannerInnerPageServerSide /> */}
                <BreadcrumbForNested
                    items={[
                        { label: "Home", link: "/" },
                        { label: "About", link: "/about" },
                        { label: selectedParrent?.name, link: "/about" },
                        { label: selected?.name, link: null },

                    ]}
                />

                {/* <Breadcrumb
                    paths={[
                        { label: "About Us", link: "/about" },
                        { label: abouDatas[0]?.name }, 
                    ]}
                /> */}
            </div>

            <Container className="flex gap-6 my-6">
                {/* sidebar */}
                <SidebarMainDrawer categories={formattedCategories} setSelectedCat={setSelectedCat} dataForContact={abouDatas[0]?.name} />

                {/* main content */}
                <div className="w-full space-y-6">
                    <InnerHeader title={about_ExtraData?.sub_title} image={image_arabic} />

                    {loading ? (
                        <SkeletonDescription />
                    ) : abouDatas?.length > 0 ? (
                        <div>
                            <div>
                                <h4 className='text-[#333333] font-bold text-2xl'>{abouDatas[0]?.name} </h4>

                                <div
                                    className="text-[#333333] text-sm sm:text-base mt-4"
                                    dangerouslySetInnerHTML={{ __html: abouDatas[0]?.description }}
                                />
                            </div>

                            <div className="border-t mt-8 pt-3 flex items-center gap-4 text-[#D9E2DD]">
                                <SocialShare />
                            </div>
                        </div>
                    ) : (
                        <>
                            <p className="text-sm md:text-base lg:text-lg text-center">{`No Information Found for `}
                                <span>{selected?.name}</span>
                            </p>

                            <p className="text-sm md:text-base lg:text-lg text-center">{`墓地に関する情報は見つかりませんでした `}
                                <span>{selected?.description}</span>
                            </p>
                        </>
                    )}
                </div>

            </Container>
        </div>
    )
}
