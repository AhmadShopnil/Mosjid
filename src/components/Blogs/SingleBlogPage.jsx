
"use client"

import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import React, { useEffect, useState } from 'react'
import SidebarMainDrawer from '../Shared/SidebarMainDrawer'
import SingleBlogDetailsCard from './SingleBlogDetailsCard'
import { getImageUrl } from '@/helper/getImageUrl'





export default function SingleBlogsPage({ homePage, settings, blog, formattedCategories }) {

    const [selectedCat, setSelectedCat] = useState(null)


    const sections = homePage?.sections_on_api;
    const blog_events_ExtraData = sections.find((s) => s.title_slug === "islamic-blog-and-events");
    const arabic = getImageUrl(blog_events_ExtraData?.image_media)


    return (
        <div>

            <div>
                <BannerInnerPage />
                <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Blogs" />

            </div>


            <Container className='flex gap-6 my-6'>
                {/* sidebar */}
                <SidebarMainDrawer categories={formattedCategories} isNavigate={true} setSelectedCat={setSelectedCat} />


                {/* main content */}
                <div className=' w-full space-y-6'>
                    <InnerHeader title={"ブログとイベント"} image={arabic} />

                    <SingleBlogDetailsCard blog={blog} />

                </div>
            </Container>

        </div>
    )
}
