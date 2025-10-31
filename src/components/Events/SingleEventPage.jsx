
"use client"

import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import React, {  useState } from 'react'
import SidebarMainDrawer from '../Shared/SidebarMainDrawer'
import { getImageUrl } from '@/helper/getImageUrl'
import SingleEventDetailsCard from './SingleEventDetailsCard'





export default function SingleEventPage({ homePage, settings, event, formattedCategories }) {

    const [selectedCat, setSelectedCat] = useState(null)


    const sections = homePage?.sections_on_api;
    const events_ExtraData = sections.find((s) => s.title_slug === "islamic-blog-and-events");
    const arabic = getImageUrl(events_ExtraData?.image_media)


    return (
        <div>

            <div>
                <BannerInnerPage />
                <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Events" />

            </div>


            <Container className='flex gap-6 my-6'>
                {/* sidebar */}
                <SidebarMainDrawer categories={formattedCategories} isNavigate={"events"} setSelectedCat={setSelectedCat} />


                {/* main content */}
                <div className=' w-full space-y-6'>
                    <InnerHeader title={"ブログとイベント"} image={arabic} />

                    <SingleEventDetailsCard event={event} />

                </div>
            </Container>

        </div>
    )
}
