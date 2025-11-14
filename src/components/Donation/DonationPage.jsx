
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
import BreadcrumbForNested from '../Shared/BreadcrumbForNested'
import { useSelected } from '@/context/SelectedContext'
import { useSelectedParrent } from '@/context/SelectedContextParrent'






export default function DonationPage({ homePage, settings, formattedCategories }) {
    const { selected, setSelected, clearSelected } = useSelected();
    const { selectedParrent, setSelectedParrent, clearSelectedParrent } = useSelectedParrent();
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


  const icon = getImageUrl(make_your_donation?.background_media);
  const donate_now_button = make_your_donation?.custom_information?.find((item) => item.label === "donate_button") || " Donate Now"


 useEffect(() => {    
         clearSelected();
         clearSelectedParrent();
    }, [])


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
        {/* <BreadcrumbForNested homeLabel="Home" homeLink="/" middle="Donation" middleLink="/donation" currentPage={selected?.name} /> */}
         <BreadcrumbForNested
                  items={[
                    { label: "Home", link: "/" },
                    { label: "Donation", link: "/donation" },
                    { label: selectedParrent?.name, link: "/donation"  },
                    { label: selected?.name, link: null },
        
                  ]}
                />

      </div>


      <Container className='flex gap-6 my-6'>
        {/* sidebar */}
        <SidebarMainDrawer categories={formattedCategories} setSelectedCat={setSelectedCat} dataForContact={"donations"} />

        {/* main content */}
        <div className=' w-full space-y-6'>
          <InnerHeader title={make_your_donation?.sub_title} image={image_arabic} />

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
