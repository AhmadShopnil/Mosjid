import AboutInnerPage from '@/components/About/AboutInnerPage';
import BannerInnerPageServerSide from '@/components/Shared/BannerInnerPageServerSide';
import { getCategories, getPage, getSettings } from '@/helper/actions'
import { transformNoticeCategories } from '@/helper/transformNoticeCategories'
import React from 'react'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function page({ params }) {
    const { slug } = params;

    // fake delay (3 seconds)
    // await delay(3000);

    const settings = await getSettings();
    const homePage = await getPage("home-sections-heading-management")
    const cat = await getCategories("about_categories")

    const formattedCategories = transformNoticeCategories(cat);

    return (
        <div>
            <BannerInnerPageServerSide />
            <AboutInnerPage
                slug={slug}
                settings={settings}
                homePage={homePage}
                formattedCategories={formattedCategories}
            />
        </div>
    )
}
