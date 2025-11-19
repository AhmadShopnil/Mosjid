
"use client"

import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import React, { useEffect, useState } from 'react'
import Blogs from './Blogs'
import axiosInstance from '@/helper/axiosInstance'
import SidebarMainDrawer from '../Shared/SidebarMainDrawer'
import { splitBySlash } from '@/helper/splitBySpace'
import { getImageUrl } from '@/helper/getImageUrl'
import { useSelected } from '@/context/SelectedContext'
import BreadcrumbForNested from '../Shared/BreadcrumbForNested'
import { useSelectedParrent } from '@/context/SelectedContextParrent'




export default function BlogsPage({ homePage, settings, formattedCategories }) {
  const { selected, setSelected, clearSelected } = useSelected();
  const { selectedParrent, setSelectedParrent, clearSelectedParrent } = useSelectedParrent();
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCat, setSelectedCat] = useState(null)
  // pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  const perPage = 10


  useEffect(() => {
    clearSelected();
    clearSelectedParrent();
  }, [])



  // fetching data
  useEffect(() => {


    const fetchBlogs = async () => {

      setLoading(true)

      let url = `/posts?term_type=post&page=${currentPage}&per_page=${perPage}`
      if (selected?.id) {
        url = `/posts?term_type=post&category_id=${selected?.id}&page=${currentPage}&per_page=${perPage}`
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



  const sections = homePage?.sections_on_api;
  const blog_events_ExtraData = sections.find((s) => s.title_slug === "islamic-blog-and-events");


  const heading_part_1 = splitBySlash(blog_events_ExtraData?.title)[0]
  const heading_part_2 = splitBySlash(blog_events_ExtraData?.title)[1]

  const image_arabic = getImageUrl(blog_events_ExtraData?.image_media);
  const icon = getImageUrl(blog_events_ExtraData?.background_media);

 const requestData = selected?.name ? `Blogs of ${selected?.name} ` : "Blogs"



  return (
    <div>

      <div>
        {/* <BannerInnerPage /> */}
        {/* <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Blogs" /> */}
        <BreadcrumbForNested
          items={[
            { label: "Home", link: "/" },
            { label: "Blogs", link: "/blogs" },
            { label: selectedParrent?.name, link: "/blogs" },
            { label: selected?.name, link: null },

          ]}
        />

      </div>


      <Container className='flex gap-6 my-6'>
        {/* sidebar */}
        <SidebarMainDrawer categories={formattedCategories} setSelectedCat={setSelectedCat} dataForContact={requestData} />


        {/* main content */}
        <div className=' w-full space-y-6'>
          <InnerHeader title={blog_events_ExtraData?.sub_title} image={image_arabic} />

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
