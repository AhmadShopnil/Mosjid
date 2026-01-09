import AskQuestionPage from '@/components/Fatwah/AskQuestionPage'
import BannerInnerFatwa from '@/components/Fatwah/BannerInnerFatwa'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import SidebarDrawerForBooks from '@/components/Shared/SidebarDrawerForBooks'
import { getFatwahFiltersData, getPage } from '@/helper/actions'
import { getImageUrl } from '@/helper/getImageUrl'
import React from 'react'




export default async function page() {
  const homePage = await getPage("home-sections-heading-management")
  const askFatwaPage = await getPage("ask-question")
  const majhabs = await getFatwahFiltersData("majhabs")
  const books = await getFatwahFiltersData("books")
  const chapter = await getFatwahFiltersData("bookchapters")
  const section = await getFatwahFiltersData("booksections")
  const data_for_filter = { majhabs, books, chapter, section }



  const sections = homePage?.sections_on_api || [];
  const fatwahExtraData = sections.find(
    (s) => s.title_slug === "fatwah"
  );



  const image = getImageUrl(fatwahExtraData?.image_media)

  const fatwah_header_title = fatwahExtraData?.custom_information.find((item) => item.label === "fatwah_header_title")


  const requestData = "ask question form"

  return (
    <div>

      <div>
        <BannerInnerFatwa />
        <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Fatwah" />
      </div>
      {/* Header */}
      <Container className='mt-10'>

        {/* Header */}
        <InnerHeader
          title={fatwah_header_title?.value}
          image={image}
        />
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
            <AskQuestionPage askFatwaPage={askFatwaPage} />
          </div>
        </div>
      </Container>

    </div>
  )
}
