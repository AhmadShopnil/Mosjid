import FatwahClientPage from '@/components/Fatwah/FatwahClientPage'

import { getFatwah, getFatwahFiltersData, getPage, getSettings } from '@/helper/actions'

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

  // console.log("books", books)



  // console.log("formatFatwaBooksForSidebarData", formatFatwaBooksForSidebarData);



  //  const requestData = selected?.name ? `Blogs of ${selected?.name} ` : "Blogs"
  const requestData = "Fatwah"

  return (
    <div>

   <FatwahClientPage fatwahs={fatwahs} settings={settings} homePage={homePage} books={books} data_for_filter={data_for_filter}/>

    </div>
  )
}
