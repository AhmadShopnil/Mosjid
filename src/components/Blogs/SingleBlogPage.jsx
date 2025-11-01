
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





export default function SingleBlogsPage({ homePage, settings, blog, formattedCategories }) {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [selectedCat, setSelectedCat] = useState(null)
    const sections = homePage?.sections_on_api;
    const blog_events_ExtraData = sections.find((s) => s.title_slug === "islamic-blog-and-events");
    const arabic = getImageUrl(blog_events_ExtraData?.image_media)



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
                <BannerInnerPage />
                <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Blogs" />

            </div>


            <Container className=''>
                <div className='flex gap-6 my-6'>
                    {/* sidebar */}
                    <SidebarMainDrawer categories={formattedCategories} isNavigate={"blogs"} setSelectedCat={setSelectedCat} />


                    {/* main content */}
                    <div className=' w-full space-y-6'>
                        <InnerHeader title={"ブログとイベント"} image={arabic} />

                        <SingleBlogDetailsCard blog={blog} />
                        <div className='flex justify-end'>
                            <SocialShare/>
                        </div>

                    </div>
                </div>

            </Container>

            <RelatedItemsSection datas={blogs} title={"Related Blogs/ 関連ブログ"} />

        </div>
    )
}
