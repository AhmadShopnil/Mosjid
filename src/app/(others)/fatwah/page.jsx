import BannerFatwaServer from '@/components/Fatwah/BannerFatwaServer';
import FatwahClientPage from '@/components/Fatwah/FatwahClientPage'
import BannerInnerPageServerSide from '@/components/Shared/BannerInnerPageServerSide';

import { getFatwah, getFatwahFiltersData, getPage, getSettings } from '@/helper/actions'
import { getImageUrl } from '@/helper/getImageUrl';

import React from 'react'


export default async function page() {

  const fatwahs = await getFatwah();
  const settings = await getSettings()
  const homePage = await getPage("home-sections-heading-management")

  const majhabs = await getFatwahFiltersData("majhabs")
  const books = await getFatwahFiltersData("books")
  const chapter = await getFatwahFiltersData("bookchapters")
  const section = await getFatwahFiltersData("booksections")
  const data_for_filter = { majhabs, books, chapter, section }



  const requestData = "Fatwa"

  return (
    <div>

      <BannerFatwaServer />
      <FatwahClientPage fatwahs={fatwahs} settings={settings} homePage={homePage} books={books} data_for_filter={data_for_filter} />

    </div>
  )
}
