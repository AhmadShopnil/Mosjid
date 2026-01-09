
import BannerFatwaServer from '@/components/Fatwah/BannerFatwaServer'
import FatwahFilteredClientPage from '@/components/Fatwah/FatwahFilteredClientPage'
import { getBooksData, getFatwah, getFatwahFiltersData, getPage, getSettings } from '@/helper/actions'
import React from 'react'


export default async function page() {

  const fatwahs = await getFatwah();
  const settings = await getSettings()
  const homePage = await getPage("home-sections-heading-management")

  const majhabs = await getFatwahFiltersData("majhabs")
 const books = await getBooksData(57)
  const chapter = await getFatwahFiltersData("bookchapters")
  const section = await getFatwahFiltersData("booksections")
  const data_for_filter = { majhabs, books, chapter, section }


  const requestData = "Fatwa"
  // console.log("fatwah", fatwahs?.data)
  return (
    <div>
      <BannerFatwaServer />
      <FatwahFilteredClientPage
        fatwahs={fatwahs}
        settings={settings}
        homePage={homePage}
        books={books}
        data_for_filter={data_for_filter} />

    </div>
  )
}
