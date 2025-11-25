
import FatwahFilteredClientPage from '@/components/Fatwah/FatwahFilteredClientPage'
import FatwaFinder from '@/components/Fatwah/FatwahFinder'
import FatwahSearchResult from '@/components/Fatwah/FatwahSearchResult'
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import SidebarDrawerForBooks from '@/components/Shared/SidebarDrawerForBooks'
import { getFatwah, getFatwahFiltersData, getPage, getSettings } from '@/helper/actions'
import { formatFatwaBooksForSidebar } from '@/helper/formatFatwaBooksForSidebar'
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
  // console.log("fatwah", fatwahs?.data)
  return (
    <div>

      <FatwahFilteredClientPage
        fatwahs={fatwahs}
        settings={settings}
        homePage={homePage}
        books={books}
        data_for_filter={data_for_filter} />

    </div>
  )
}
