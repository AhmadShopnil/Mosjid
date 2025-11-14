
"use client"

import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import React, { useEffect, useState } from 'react'
import SidebarMainDrawer from '../Shared/SidebarMainDrawer'
import SingleBlogDetailsCard from './SingleBlogDetailsCard'
import { getImageUrl } from '@/helper/getImageUrl'
import RelatedItemsSection from '../Shared/RelatedItemsSection'
import axiosInstance from '@/helper/axiosInstance'
import SocialShare from '../Shared/SocialShare'
import { useSelected } from '@/context/SelectedContext'
import BreadcrumbForNested from '../Shared/BreadcrumbForNested'
import { useSelectedParrent } from '@/context/SelectedContextParrent'





export default function SingleBlogsPage({ homePage, settings, blog, formattedCategories }) {
    const { selected, setSelected, clearSelected } = useSelected();
    const { selectedParrent, setSelectedParrent, clearSelectedParrent } = useSelectedParrent();
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [selectedCat, setSelectedCat] = useState(null)
    const sections = homePage?.sections_on_api;
    const blog_events_ExtraData = sections.find((s) => s.title_slug === "islamic-blog-and-events");
    const arabic = getImageUrl(blog_events_ExtraData?.image_media)



    // useEffect(() => {
    //     clearSelected();
    // }, [])



    // fetching data
    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true)
            let url = `/posts?term_type=post&per_page=3`
            if (blog?.categories[0]?.id) {
                url = `/posts?term_type=post&category_id=${blog?.categories[0]?.id}&per_page=4`
            }

            try {
                const response = await axiosInstance.get(url)
                const data = response?.data?.data || []
                const meta = response?.data?.meta || {}

                setBlogs(data)
                // setTotalPages(meta.last_page || 1)
            } catch (err) {
                console.error("Error fetching blogs:", err)
                setError(err.message || "Failed to fetch blogs")
            } finally {
                setLoading(false)
            }
        }

        fetchBlogs()
    }, [])


    // console.log("cat releted",blog?.categories[0]?.id)
    // console.log("releted blogs",blogs)




    return (
        <div>

            <div>
                {/* <BannerInnerPage /> */}
                <BreadcrumbForNested
                    items={[
                        { label: "Home", link: "/" },
                        { label: "Blogs", link: "/blogs" },
                        { label: selectedParrent?.name, link: "/blogs" },
                        { label: selected?.name, link: null },

                    ]}
                />
                {/* <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Blogs" /> */}

            </div>


            <Container className=''>
                <div className='flex gap-6 my-6'>
                    {/* sidebar */}
                    <SidebarMainDrawer categories={formattedCategories} isNavigate={"blogs"} setSelectedCat={setSelectedCat} dataForContact={`${blog?.name} blog`} />


                    {/* main content */}
                    <div className=' w-full space-y-6'>
                        <InnerHeader title={blog_events_ExtraData?.sub_title} image={arabic} />

                        <SingleBlogDetailsCard blog={blog} settings={settings} />
                        <div className='flex justify-end'>
                            <SocialShare />
                        </div>

                    </div>
                </div>

            </Container>

            <RelatedItemsSection datas={blogs} blog_events_ExtraData={blog_events_ExtraData} />

        </div>
    )
}
