
import BlogsPage from '@/components/Blogs/BlogsPage';
import BannerInnerPageServerSide from '@/components/Shared/BannerInnerPageServerSide';
import { getCategories, getPage, getSettings } from '@/helper/actions'
import { transformNoticeCategories } from '@/helper/transformNoticeCategories'
import React from 'react'




export default async function page() {
  const settings = await getSettings();
  const homePage = await getPage("home-sections-heading-management")
  const cat = await getCategories("post_category")

  const formattedCategories = transformNoticeCategories(cat);


// test
  return (
    <div>
      <BannerInnerPageServerSide />
      <BlogsPage
        settings={settings}
        homePage={homePage}
        formattedCategories={formattedCategories}

      />

    </div>
  )
}
