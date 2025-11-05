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
import Pagination from "../Shared/Pagination"
import ImageGalleryInnerPage from "./ImageGalleryInnerPage"
import { getMetaValueByMetaName } from "@/helper/metaHelpers"


export default function GalleryPage({ homePage, settings, formattedCategories }) {

  const [galleryDatas, setGallerydatas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [selectedCat, setSelectedCat] = useState(null)
  // pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  const perPage = 6

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      let url = `/posts?term_type=img_gallery&page=${currentPage}&per_page=${perPage}`
      if (selectedCat) {
        url = `/posts?term_type=img_gallery&category_id=${selectedCat}&page=${currentPage}&per_page=${perPage}`
      }

      try {
        const response = await axiosInstance.get(url)
        const data = response?.data?.data || []
        const meta = response?.data?.meta || {}

        setGallerydatas(data)
        setTotalPages(meta.last_page || 1)
      } catch (err) {
        console.error("Error fetching gallery:", err)
        setError(err.message || "Failed to fetch galley")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedCat, currentPage])


  const sections = homePage.sections_on_api;
  const view_more_button_text = getMetaValueByMetaName(settings, "view_more") || "";
  const img_gallery_heading = sections.find((s) => s.title_slug === "gallery");




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
          <div
          >

            <ImageGalleryInnerPage loading={loading} gallery={galleryDatas}  />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />

          </div>

        </div>
      </Container>
    </div>
  )
}
