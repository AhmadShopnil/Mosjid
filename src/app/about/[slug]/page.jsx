

import AboutInnerPage from '@/components/About/AboutInnerPage';
import BannerInnerPage from '@/components/Shared/BannerInnerPage';
import { getCategories, getPage, getSettings } from '@/helper/actions'
import { transformNoticeCategories } from '@/helper/transformNoticeCategories'
import React from 'react'



export default async function page({ params }) {
    const { slug } = await params;
    const settings = await getSettings();
    const homePage = await getPage("home-sections-heading-management")
    const cat = await getCategories("about_categories")

    const formattedCategories = transformNoticeCategories(cat);

    // console.log("formattedCategories", formattedCategories);


    return (
        <div>
            <BannerInnerPage />
            {/* <BannerInnerPageServerSide /> */}
            <AboutInnerPage
                slug={slug}
                settings={settings}
                homePage={homePage}
                formattedCategories={formattedCategories}
            />

        </div>
    )
}
