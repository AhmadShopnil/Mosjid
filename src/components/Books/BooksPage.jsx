
"use client"

import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import React, { useEffect, useState } from 'react'
import axiosInstance from '@/helper/axiosInstance'
import SidebarMainDrawer from '../Shared/SidebarMainDrawer'
import BookList from './BookList'
import { splitBySlash } from '@/helper/splitBySpace'
import { getImageUrl } from '@/helper/getImageUrl'
import BreadcrumbForNested from '../Shared/BreadcrumbForNested'
import { useSelected } from '@/context/SelectedContext'
import { useSelectedParrent } from '@/context/SelectedContextParrent'
import BookSuggetionsList from './BookSuggetionsList'







export default function BooksPage({ homePage, settings, formattedCategories }) {
      const { selected, setSelected, clearSelected } = useSelected();
    const { selectedParrent, setSelectedParrent, clearSelectedParrent } = useSelectedParrent();
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
    const fetchBooks = async () => {

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

    fetchBooks()
  }, [selectedCat, currentPage])


  const sections = homePage?.sections_on_api;
  const islamic_books_ExtraData = sections.find((s) => s.title_slug === "islamic-books");
  const heading_part_1 = splitBySlash(islamic_books_ExtraData?.title)[0]
  const heading_part_2 = splitBySlash(islamic_books_ExtraData?.title)[1]

  const image_arabic = getImageUrl(islamic_books_ExtraData?.image_media);
  const icon = getImageUrl(islamic_books_ExtraData?.background_media);

  const download_books_button = islamic_books_ExtraData?.custom_information?.find((item) => item.label === "download_books_button")




  useEffect(() => {
         clearSelected();
         clearSelectedParrent();
    }, [])

  // console.log("books", books)



  return (
    <div>

      <div>
        <BannerInnerPage />
        {/* <BreadcrumbForNested homeLabel="Home" homeLink="/" middle="Books" middleLink="/books" currentPage={selected?.name} /> */}
         <BreadcrumbForNested
                          items={[
                              { label: "Home", link: "/" },
                              { label: "Books", link: "/books" },
                              { label: selectedParrent?.name, link:  "/books" },
                              { label: selected?.name, link: null },
      
                          ]}
                      />

      </div>


      <Container className='flex gap-6 my-6'>
        {/* sidebar */}
        <SidebarMainDrawer categories={formattedCategories} setSelectedCat={setSelectedCat} dataForContact={`Books`} />

        {/* main content */}
        <div className=' w-full space-y-6'>
          <InnerHeader title={islamic_books_ExtraData?.sub_title} image={image_arabic} />

          <div>
            <BookList
              books={books}
              settings={settings}
              homePage={homePage}
              loading={loading}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              download_books_button={download_books_button}
            />
          </div>

        </div>
      </Container>
        <BookSuggetionsList datas={books}  />

    </div>
  )
}
