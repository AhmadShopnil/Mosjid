
"use client"

import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import React, { useEffect, useState } from 'react'
import SidebarMainDrawer from '../Shared/SidebarMainDrawer'
import { getImageUrl } from '@/helper/getImageUrl'
import SingleEventDetailsCard from './SingleEventDetailsCard'
import RelatedItemsSection from './RelatedEventsSections'
import axiosInstance from '@/helper/axiosInstance'
import BreadcrumbForNested from '../Shared/BreadcrumbForNested'
import { useSelectedParrent } from '@/context/SelectedContextParrent'
import { useSelected } from '@/context/SelectedContext'





export default function SingleEventPage({ homePage, settings, event, formattedCategories }) {
    const { selected, setSelected, clearSelected } = useSelected();
    const { selectedParrent, setSelectedParrent, clearSelectedParrent } = useSelectedParrent();
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [selectedCat, setSelectedCat] = useState(null)
    const sections = homePage?.sections_on_api;
    const events_ExtraData = sections.find((s) => s.title_slug === "islamic-blog-and-events");
    const arabic = getImageUrl(events_ExtraData?.image_media)







    // fetching data
    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true)
            let url = `/posts?term_type=events&per_page=3`
            if (event?.categories[0]?.id) {
                url = `/posts?term_type=events&category_id=${event?.categories[0]?.id}&per_page=4`
            }
            try {
                const response = await axiosInstance.get(url)
                const data = response?.data?.data || []
                const meta = response?.data?.meta || {}

                setEvents(data)

            } catch (err) {
                console.error("Error fetching events:", err)
                setError(err.message || "Failed to fetch events")
            } finally {
                setLoading(false)
            }
        }

        fetchEvents()
    }, [])

    // console.log("cat releted",event?.categories[0]?.id)
    // console.log("releted events",events)







    return (
        <div>

            <div>
                {/* <BannerInnerPage /> */}
                <BreadcrumbForNested
                    items={[
                        { label: "Home", link: "/" },
                        { label: "Events", link: "/events" },
                        { label: selectedParrent?.name, link: "/events" },
                        { label: selected?.name, link:" /events" },
                        { label: event?.name, link: null },

                    ]}
                />
                {/* <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Events" /> */}

            </div>


            <Container className='flex gap-6 my-6'>
                {/* sidebar */}
                <SidebarMainDrawer categories={formattedCategories} isNavigate={"events"} setSelectedCat={setSelectedCat} dataForContact={`${event?.name} event`} />


                {/* main content */}
                <div className=' w-full space-y-6'>
                    <InnerHeader title={events_ExtraData?.sub_title} image={arabic} />

                    <SingleEventDetailsCard event={event} />

                </div>
            </Container>
            <RelatedItemsSection datas={events} events_ExtraData={events_ExtraData} />

        </div>
    )
}
