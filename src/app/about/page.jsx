

import AboutInnerPage from '@/components/About/AboutInnerPage';
import BannerInnerPage from '@/components/Shared/BannerInnerPage';
import BannerInnerPageServerSide from '@/components/Shared/BannerInnerPageServerSide';
import { getCategories, getPage, getSettings } from '@/helper/actions'
import { transformNoticeCategories } from '@/helper/transformNoticeCategories'
import React from 'react'



export default async function page() {
  const settings = await getSettings();
  const homePage = await getPage("home-sections-heading-management")
  const cat = await getCategories("about_categories")

  const formattedCategories = transformNoticeCategories(cat);

  // console.log("formattedCategories", formattedCategories);


  return (
    <div>
      <BannerInnerPage  />
      {/* <BannerInnerPageServerSide /> */}
      <AboutInnerPage
        settings={settings}
        homePage={homePage}
        formattedCategories={formattedCategories}
      />

    </div>
  )
}
