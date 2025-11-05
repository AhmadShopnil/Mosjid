

import SubmitRequest from '@/components/Fatwah/SubmitRequest'
import GalleryPage from '@/components/GalleryPage/GalleryPage'

import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import Sidebar from '@/components/Shared/Sidebar'
import SidebarMainDrawer from '@/components/Shared/SidebarMainDrawer'
import { sideBarCategories } from '@/data/sidebar'
import { getCategories, getImageGallery, getPage, getSettings } from '@/helper/actions'
import { getMetaValueByMetaName } from '@/helper/metaHelpers'
import { transformNoticeCategories } from '@/helper/transformNoticeCategories'

import Image from 'next/image'
import React from 'react'

export default async function page() {

    const gallery = await getImageGallery();


    const cat = await getCategories("gallery_categories")
    const formattedCategories = transformNoticeCategories(cat);
    const settings = await getSettings();
    const homePage = await getPage("home-sections-heading-management");
    const sections = homePage.sections_on_api;
    const view_more_button_text = getMetaValueByMetaName(settings, "view_more") || "";
    const img_gallery_heading = sections.find((s) => s.title_slug === "gallery");


    
    return (
        <div>

            <div>
                <BannerInnerPage />
                <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Gallery" />
            </div>


            <Container className='flex gap-6 my-6'>
                {/* sidebar */}
                <SidebarMainDrawer categories={formattedCategories} isNavigate={false} />
                {/* main content */}
                <div className=' w-full space-y-6'>
                    <InnerHeader title={img_gallery_heading?.title} image={"/images/gallery/arabic2.png"} />

                    <div className='overflow-hidden'>
                        <GalleryPage gallery={gallery} img_gallery_heading={img_gallery_heading} view_more_button_text={view_more_button_text} />

                    </div>

                </div>
            </Container>

        </div>
    )
}
