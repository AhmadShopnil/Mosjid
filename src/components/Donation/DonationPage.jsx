
"use client"

import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import React, { useEffect, useState } from 'react'
import axiosInstance from '@/helper/axiosInstance'
import SidebarMainDrawer from '../Shared/SidebarMainDrawer'
import MakeDonationInner from './MakeDonationInner'
import { getImageUrl } from '@/helper/getImageUrl'






export default function DonationPage({ homePage, settings, formattedCategories }) {
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCat, setSelectedCat] = useState(null)
  // pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  const perPage = 6

 const sections = homePage.sections_on_api;
  const make_your_donation = sections.find((s) => s.title_slug === "make-your-doantion");
  const image_arabic = getImageUrl(make_your_donation?.image_media);

  // fetching data
  useEffect(() => {
    const fetchBlogs = async () => {

      setLoading(true)

      let url = `/posts?term_type=donations&page=${currentPage}&per_page=${perPage}`
      if (selectedCat) {
        url = `/posts?term_type=donations&category_id=${selectedCat}&page=${currentPage}&per_page=${perPage}`
      }
      try {
        const response = await axiosInstance.get(url)
        const data = response?.data?.data || []
        const meta = response?.data?.meta || {}

        setDonations(data)
        setTotalPages(meta.last_page || 1)
      } catch (err) {
        console.error("Error fetching donations:", err)
        setError(err.message || "Failed to fetch donations")
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [selectedCat, currentPage])


  // console.log("donations", donations)



  return (
    <div>

      <div>
        <BannerInnerPage />
        <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Donations" />

      </div>


      <Container className='flex gap-6 my-6'>
        {/* sidebar */}
        <SidebarMainDrawer categories={formattedCategories} setSelectedCat={setSelectedCat} />

      

        {/* main content */}
        <div className=' w-full space-y-6'>
          <InnerHeader title={"掲示板"} image={"/images/donation/arabic_white.png"} />

          <div>
            <MakeDonationInner
              donations={donations}
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
