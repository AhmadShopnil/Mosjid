import AskQuestionSidebar from '@/components/Fatwah/AskQuestionSidebar'
import FatwaFinder from '@/components/Fatwah/FatwahFinder'
import FatwahSlected from '@/components/Fatwah/FatwahSlected'
import FatwaListInner from '@/components/Fatwah/FatwaListInner'
import SubmitRequest from '@/components/Fatwah/SubmitRequest'
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import Sidebar from '@/components/Shared/Sidebar'
import SidebarMainDrawer from '@/components/Shared/SidebarMainDrawer'
import { sideBarCategories } from '@/data/sidebar'
import { getFatwa, getFatwah, getFatwahFiltersData, getPage, getSettings } from '@/helper/actions'
import { formatFatwaBooksForSidebar } from '@/helper/formatFatwaBooksForSidebar'
import React from 'react'


export default async function page() {

  const fatwahs = await getFatwah();
  const settings = await getSettings()
  const homePage = await getPage("home-sections-heading-management")
  const books = await getFatwahFiltersData("books")

  const formatFatwaBooksForSidebarData = formatFatwaBooksForSidebar(books)

//  const requestData = selected?.name ? `Blogs of ${selected?.name} ` : "Blogs"
 const requestData =  "Fatwah"
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

        <SidebarMainDrawer
         categories={formatFatwaBooksForSidebarData} 
         isAskQuestion={true} 
         isFatwahFilter={true} 
      
         dataForContact={requestData} />

        {/* <div className='w-[400px] space-y-6'>
          <Sidebar categories={categories} />
        </div> */}



        {/* main content */}
        <div className=' w-full'>
          <FatwaListInner title="New Fatawa" titleWidth="w-[420px]" fatwahs={fatwahs?.data} settings={settings} homePage={homePage} />
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-3 lxl:gap-6  mt-6'>
            <FatwahSlected settings={settings} homePage={homePage} />
            {/* <FatwaListInner title="Selected Fatwah " titleWidth="w-[220px]" fatwahs={fatwahs?.data} settings={settings} homePage={homePage} /> */}
            <FatwaListInner title="Top Rated Fatwah" titleWidth="w-[220px]" fatwahs={fatwahs?.data} settings={settings} homePage={homePage} />
          </div>
        </div>
      </Container>

    </div>
  )
}
