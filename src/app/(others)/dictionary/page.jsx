
import DictionaryPage from '@/components/Dictionary/DictionaryPage'
import DictionarySearchSection from '@/components/Dictionary/DictionarySearchSection'
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import BannerInnerPageServerSide from '@/components/Shared/BannerInnerPageServerSide'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import SidebarDrawerForBooks from '@/components/Shared/SidebarDrawerForBooks'
import SidebarMainDrawer from '@/components/Shared/SidebarMainDrawer'
import { sideBarCategories } from '@/data/sidebar'
import { getBooksData, getFatwahFiltersData, getPage, getSettings } from '@/helper/actions'
import { formatFatwaBooksForSidebar } from '@/helper/formatFatwaBooksForSidebar'
import { getImageUrl } from '@/helper/getImageUrl'
import React from 'react'


export default async function page() {

  const homePage = await getPage("home-sections-heading-management")

  const majhabs = await getFatwahFiltersData("majhabs")
  const books = await getBooksData(56)
  const chapter = await getFatwahFiltersData("bookchapters")
  const section = await getFatwahFiltersData("booksections")


  const sections = homePage?.sections_on_api;
  const dictionaryExtraData = sections.find(
    (s) => s.title_slug === "dictionary"
  );

  const icon = getImageUrl(dictionaryExtraData?.background_media);



  const data_for_filter = { majhabs, books, chapter, section }
  const requestData = "Dictionary"

  return (
    <div>

      <div>
        <BannerInnerPageServerSide />
        {/* <BannerInnerPage /> */}
        <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Dictionary" />
      </div>


      <Container className='flex gap-6 my-6'>
        {/* sidebar */}
        <SidebarDrawerForBooks
          isMajhabShow={false}
          isSubmitRequest={true}
          books={books}
          data_for_filter={data_for_filter}
          isFatwah_Dictionary_Filter={true}
          icon={icon}
          dataForContact={requestData}
          cntType="dictionaries_count"
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
