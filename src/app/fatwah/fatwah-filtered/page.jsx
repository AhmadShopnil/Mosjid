
import FatwaFinder from '@/components/Fatwah/FatwahFinder'
import FatwahSearchResult from '@/components/Fatwah/FatwahSearchResult'
import FatwaListInner from '@/components/Fatwah/FatwaListInner'

import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'

import SidebarMainDrawer from '@/components/Shared/SidebarMainDrawer'
import { sideBarCategories } from '@/data/sidebar'
import { getFatwah, getFatwahFiltersData, getPage, getSettings } from '@/helper/actions'
import { formatFatwaBooksForSidebar } from '@/helper/formatFatwaBooksForSidebar'
import React from 'react'


export default async function page() {

  const fatwahs = await getFatwah();
  const settings = await getSettings()
  const homePage = await getPage("home-sections-heading-management")
  const books = await getFatwahFiltersData("books")

  const formatFatwaBooksForSidebarData = formatFatwaBooksForSidebar(books)


  // console.log("fatwah", fatwahs?.data)
  return (
    <div>

      <div>
        <BannerInnerPage />
        <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Fatwah" />
      </div>
      <Container className='mt-10'>
        <FatwaFinder />
      </Container>

      <Container className='flex gap-6 my-6'>
        {/* sidebar */}
        <SidebarMainDrawer categories={formatFatwaBooksForSidebarData} isAskQuestion={true} isFatwahFilter={true}     />


        {/* <div className='w-[400px] space-y-6'>
          <Sidebar categories={categories} />
        </div> */}



        {/* main content */}
        <div className=' w-full'>
          <FatwahSearchResult title="Fatwa Finder Results" titleWidth="w-[420px]"  settings={settings} homePage={homePage} />

        </div>
      </Container>

    </div>
  )
}
