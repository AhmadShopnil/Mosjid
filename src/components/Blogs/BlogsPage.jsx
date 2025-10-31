
"use client"

import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import React, { useEffect, useState } from 'react'
import Blogs from './Blogs'
import axiosInstance from '@/helper/axiosInstance'
import SidebarMainDrawer from '../Shared/SidebarMainDrawer'




export default function BlogsPage({ homePage, settings, formattedCategories }) {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCat, setSelectedCat] = useState(null)
  // pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  const perPage = 6


  // fetching data
  useEffect(() => {
    const fetchBlogs = async () => {

      setLoading(true)

      let url = `/posts?term_type=post&page=${currentPage}&per_page=${perPage}`
      if (selectedCat) {
        url = `/posts?term_type=post&category_id=${selectedCat}&page=${currentPage}&per_page=${perPage}`
      }


      try {
        const response = await axiosInstance.get(url)
        const data = response?.data?.data || []
        const meta = response?.data?.meta || {}

        setBlogs(data)
        setTotalPages(meta.last_page || 1)
      } catch (err) {
        console.error("Error fetching blogs:", err)
        setError(err.message || "Failed to fetch blogs")
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [selectedCat, currentPage])

  // console.log("blogs", blogs)


  return (
    <div>

      <div>
        <BannerInnerPage />
        <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Blogs" />

      </div>


      <Container className='flex gap-6 my-6'>
        {/* sidebar */}
        <SidebarMainDrawer categories={formattedCategories} setSelectedCat={setSelectedCat} />

       
        {/* main content */}
        <div className=' w-full space-y-6'>
          <InnerHeader title={"ブログとイベント"} image={"/images/fatwah/fatwaharbic_white.png"} />

          <div>
            <Blogs
              blogs={blogs}
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
