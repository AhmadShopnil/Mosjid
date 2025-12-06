import AskQuestionPage from '@/components/Fatwah/AskQuestionPage'
import AskQuestionSidebar from '@/components/Fatwah/AskQuestionSidebar'
import BannerInnerFatwa from '@/components/Fatwah/BannerInnerFatwa'
import SubmitRequest from '@/components/Fatwah/SubmitRequest'
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import Sidebar from '@/components/Shared/Sidebar'
import SidebarDrawerForBooks from '@/components/Shared/SidebarDrawerForBooks'
import { getFatwa, getFatwah, getFatwahFiltersData, getPage, getSettings } from '@/helper/actions'
import Image from 'next/image'
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

  const requestData = "ask question form"

  return (
    <div>

      <div>
         <BannerInnerFatwa  />
        <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Fatwah" />
      </div>
      {/* Header */}
      <Container className='mt-10'>

        <div className="bg-[#52B920] h-[85px] text-white px-6 py-4 rounded-lg mt-4 flex justify-between items-center shadow-md">
          <h1 className="text-4xl ">イスラム教のファトワ</h1>
          <Image
            src="/images/fatwah/fatwaharbic_white.png"
            alt="Logo"
            width={200}
            height={60}
            className='hidden sm:flex w-[223px] h-[60px]'
          />
        </div>
      </Container>

      <Container className='flex gap-6 my-6'>
        <SidebarDrawerForBooks
          books={books?.data}
          isAskQuestion={true}
          isFatwah_Dictionary_Filter={true}
          isNavigate={true}
          dataForContact={requestData} 
          data_for_filter={data_for_filter}
          />
        {/* main content */}
        <div className=' w-full'>
          <div>
            <AskQuestionPage />
          </div>
        </div>
      </Container>

    </div>
  )
}
