"use client"

import React, { useEffect, useState } from "react"
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import SidebarMainDrawer from '@/components/Shared/SidebarMainDrawer'
import axiosInstance from "@/helper/axiosInstance"
import Image from "next/image"


export default function AboutInnerPage({ homePage, settings, formattedCategories }) {

    const [abouDatas, setAboutdatas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [selectedCat, setSelectedCat] = useState(null)
    // pagination states
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(10)
    const perPage = 6

    useEffect(() => {
        const fetchAboutData = async () => {
            setLoading(true)
            let url = `/posts?term_type=about_info&page=${currentPage}&per_page=${perPage}`
            // if (selectedCat) {
            //     url = `/posts?term_type=about_info&category_id=${selectedCat}&page=${currentPage}&per_page=${perPage}`
            // }

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



    return (
        <div>
            <div>
                <BannerInnerPage />
                <Breadcrumb homeLabel="Home" homeLink="/" currentPage="About Us" />
            </div>

            <Container className="flex gap-6 my-6">
                {/* sidebar */}
                <SidebarMainDrawer categories={formattedCategories} setSelectedCat={setSelectedCat} />

                {/* main content */}
                <div className="w-full space-y-6">
                    <InnerHeader title={"私たちについて"} image={"/images/about/arabic.png"} />

                    <div>
                        <div>
                            <h4 className='text-[#333333] font-bold text-2xl'>{abouDatas[0]?.name} </h4>

                         
                            <div
                                className="text-[#333333]  text-xs sm:text-base mt-4 "
                                dangerouslySetInnerHTML={{ __html: abouDatas[0]?.description }}
                            />

                        </div>
                        <div className="border-t mt-8 pt-3 flex items-center gap-4 text-[#D9E2DD]">
                            <div className="border-r-2 border-gray-300 pr-3">
                                <Image
                                    src="/images/notice/twiter.png"
                                    alt='a1'
                                    width={23}
                                    height={23}
                                />
                            </div>
                            <div className="border-r-2 border-gray-300 pr-3">
                                <Image
                                    src="/images/notice/fb.png"
                                    alt='a1'
                                    width={15}
                                    height={15}
                                />
                            </div>
                            <div className="border-r-2 border-gray-300 pr-3">
                                <Image
                                    src="/images/notice/whatsapp.png"
                                    alt='a1'
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div className="border-r-2 border-gray-300 pr-3">
                                <Image
                                    src="/images/notice/printer.png"
                                    alt='a1'
                                    width={22}
                                    height={22}
                                />
                            </div>
                            <div>
                                <Image
                                    src="/images/notice/download.png"
                                    alt='a1'
                                    width={22}
                                    height={22}
                                />
                            </div>


                        </div>

                    </div>

                </div>
            </Container>
        </div>
    )
}
