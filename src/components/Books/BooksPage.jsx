
"use client"

import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import React, { useEffect, useState } from 'react'
import axiosInstance from '@/helper/axiosInstance'
import SidebarMainDrawer from '../Shared/SidebarMainDrawer'
import BookList from './BookList'







export default function BooksPage({ homePage, settings, formattedCategories }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCat, setSelectedCat] = useState(null)
  // pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  const perPage = 5



  // fetching data
  useEffect(() => {
    const fetchEvents = async () => {

      setLoading(true)

      let url = `/posts?term_type=islamic_books&page=${currentPage}&per_page=${perPage}`
      if (selectedCat) {
        url = `/posts?term_type=islamic_books&category_id=${selectedCat}&page=${currentPage}&per_page=${perPage}`
      }


      try {
        const response = await axiosInstance.get(url)
        const data = response?.data?.data || []
        const meta = response?.data?.meta || {}

        setBooks(data)
        setTotalPages(meta.last_page || 1)
      } catch (err) {
        console.error("Error fetching events:", err)
        setError(err.message || "Failed to fetch events")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [selectedCat, currentPage])


  // console.log("blogs", blogs)



  return (
    <div>

      <div>
        <BannerInnerPage />
        <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Events" />

      </div>


      <Container className='flex gap-6 my-6'>
        {/* sidebar */}
        <SidebarMainDrawer categories={formattedCategories} setSelectedCat={setSelectedCat} />

        {/* main content */}
        <div className=' w-full space-y-6'>
            <InnerHeader title={"イスラム教の書籍"} image={"/images/isamicBooks/arabic-white.png"} />

          <div>
            <BookList
              books={books}
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
