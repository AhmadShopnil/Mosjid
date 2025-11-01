"use client"

import React, { useEffect, useState } from "react"
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import SidebarMainDrawer from '@/components/Shared/SidebarMainDrawer'
import axiosInstance from "@/helper/axiosInstance"
import DuaList from "./DuaList"
import { DuaCardInnerPage } from "./DuaCardInnerPage"

export default function DuaPageInner({ homePage, settings, formattedCategories }) {

    const [duas, setDuas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
   
    const [selectedCat, setSelectedCat] = useState(null)
    // pagination states
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(10)
    const perPage = 6

    useEffect(() => {
        const fetchDuas = async () => {
            setLoading(true)
            let url = `/posts?term_type=dua&page=${currentPage}&per_page=${perPage}`
            if (selectedCat) {
                url = `/posts?term_type=dua&category_id=${selectedCat}&page=${currentPage}&per_page=${perPage}`
            }

            try {
                const response = await axiosInstance.get(url)
                const data = response?.data?.data || []
                const meta = response?.data?.meta || {}

                setDuas(data)
                setTotalPages(meta.last_page || 1)
            } catch (err) {
                console.error("Error fetching Duas:", err)
                setError(err.message || "Failed to fetch duas")
            } finally {
                setLoading(false)
            }
        }

        fetchDuas()
    }, [selectedCat, currentPage])



    return (
        <div>
            <div>
                <BannerInnerPage />
                <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Duas" />
            </div>

            <Container className="flex gap-6 my-6">
                {/* sidebar */}
                <SidebarMainDrawer categories={formattedCategories} setSelectedCat={setSelectedCat} />

                {/* main content */}
                <div className="w-full space-y-6">
                    <InnerHeader title={"デュアス"} image={"/images/fatwah/fatwaharbic_white.png"} />

                    {/* Notice board */}
                    <DuaList
                        homePage={homePage}
                        duas={duas}
                        settings={settings}
                        loading={loading}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                       
                    />
                    

                </div>
            </Container>
        </div>
    )
}
