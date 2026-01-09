

import BooksPage from '@/components/Books/BooksPage';
import BannerInnerPageServerSide from '@/components/Shared/BannerInnerPageServerSide';
import { getCategories, getPage, getSettings } from '@/helper/actions'

import { transformNoticeCategories } from '@/helper/transformNoticeCategories'
import React from 'react'




export default async function page() {
  const settings = await getSettings();
  const homePage = await getPage("home-sections-heading-management")
  const cat = await getCategories("books_categories")

  const formattedCategories = transformNoticeCategories(cat);



  return (
    <div>
      <BannerInnerPageServerSide />
      <BooksPage
        settings={settings}
        homePage={homePage}
        formattedCategories={formattedCategories}

      />

    </div>
  )
}
