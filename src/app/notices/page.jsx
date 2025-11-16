
import ArchiveNotice from '@/components/Notice/ArchiveNotice'
import NoticeBoard from '@/components/Notice/NoticeBoard'
import NoticePage from '@/components/Notice/NoticePage'
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import Sidebar from '@/components/Shared/Sidebar'
import SidebarMainDrawer from '@/components/Shared/SidebarMainDrawer'
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

      <NoticePage
        settings={settings}
        homePage={homePage}
        notices={notices}
        formattedCategories={formattedCategories}

      />

    </div>
  )
}
