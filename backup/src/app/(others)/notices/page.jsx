

import NoticePage from '@/components/Notice/NoticePage'
import BannerInnerPageServerSide from '@/components/Shared/BannerInnerPageServerSide';
import { getCategories, getNotices, getPage, getSettings } from '@/helper/actions'
import { transformNoticeCategories } from '@/helper/transformNoticeCategories'
import React from 'react'


export default async function page() {

  const notices = await getNotices();
  const settings = await getSettings()
  const homePage = await getPage("home-sections-heading-management")
  const cat = await getCategories("notice_categories")

  const formattedCategories = transformNoticeCategories(cat);
  // console.log("notice cats", formattedCategories)



  return (
    <div>

      <BannerInnerPageServerSide />
      <NoticePage
        settings={settings}
        homePage={homePage}
        notices={notices}
        formattedCategories={formattedCategories}

      />

    </div>
  )
}
