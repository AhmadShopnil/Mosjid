
import DictionaryPage from '@/components/Dictionary/DictionaryPage'
import DictionarySearchSection from '@/components/Dictionary/DictionarySearchSection'

import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import SidebarDrawerForBooks from '@/components/Shared/SidebarDrawerForBooks'
import SidebarMainDrawer from '@/components/Shared/SidebarMainDrawer'
import { sideBarCategories } from '@/data/sidebar'
import { getFatwahFiltersData, getPage, getSettings } from '@/helper/actions'
import { formatFatwaBooksForSidebar } from '@/helper/formatFatwaBooksForSidebar'
import React from 'react'




export default async function page() {


  const settings = await getSettings()
  const homePage = await getPage("home-sections-heading-management")

  const books = await getFatwahFiltersData("books")
  const chapter = await getFatwahFiltersData("bookchapters")
  const section = await getFatwahFiltersData("booksections")


  const formatFatwaBooksForSidebarData = formatFatwaBooksForSidebar(books)

  const data_for_filter = { books, chapter, section }
   const requestData =  "Dictionary"

  return (
    <div>

      <div>
        <BannerInnerPage />
        <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Dictionary" />
      </div>


      <Container className='flex gap-6 my-6'>
        {/* sidebar */}
        <SidebarDrawerForBooks

          isSubmitRequest={true}
           books={books?.data}
      
          isFatwah_Dictionary_Filter={true}

          dataForContact={requestData}
        />

        {/* main content */}
        <div className=' w-full space-y-6'>
          {/* Header */}
          <InnerHeader title={"掲示板"} image={"/images/dictionary/arabic.svg"} />
          <div className=''>
            <div className='w-full py-2'>
              <DictionarySearchSection data_for_filter={data_for_filter} />
            </div>
          </div>
          <DictionaryPage />
        </div>
      </Container>

    </div>
  )
}
