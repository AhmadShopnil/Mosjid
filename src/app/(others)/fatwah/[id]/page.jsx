
import FatwaDetailSection from '@/components/Fatwah/FatwaDetailSection'
import FatwaFinder from '@/components/Fatwah/FatwahFinder'
import FatwaListInner from '@/components/Fatwah/FatwaListInner'
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import SidebarDrawerForBooks from '@/components/Shared/SidebarDrawerForBooks'

import {  getBooksData, getFatwah, getFatwahFiltersData, getPage, getSettings, getSingleFatwah } from '@/helper/actions'

import React from 'react'







export default async function page({ params }) {
    const { id } = await params;
    const fatwahs = await getFatwah();
    const singleFatwah = await getSingleFatwah(id);
    const settings = await getSettings()
    const homePage = await getPage("home-sections-heading-management")
    const sections = homePage?.sections_on_api || [];
    const fatwahExtraData = sections.find(
        (s) => s.title_slug === "fatwah"
    );


    const majhabs = await getFatwahFiltersData("majhabs")
   const books = await getBooksData(57)
    const chapter = await getFatwahFiltersData("bookchapters")
    const section = await getFatwahFiltersData("booksections")
    const data_for_filter = { majhabs, books, chapter, section }



    const requestData = singleFatwah?.word_en ? `Fatwah of ${singleFatwah?.word_en} ` : "Fatwah"
    // console.log("singleFatwah",singleFatwah)

    return (
        <div>

            <div>
                <BannerInnerPage />
                <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Fatwah" />
            </div>
            <Container className='mt-10'>
                <FatwaFinder data_for_filter={data_for_filter} fatwahExtraData={fatwahExtraData}/>
            </Container>

            <Container className='flex gap-6 my-6'>
     

                <SidebarDrawerForBooks
                    books={books?.data}
                    isAskQuestion={true}
                    isFatwah_Dictionary_Filter={true}
                    data_for_filter={data_for_filter}
                    dataForContact={requestData}
                    isNavigate={true}

                />



                {/* main content */}
                <div className=' w-full'>
                    <div>
                        <FatwaDetailSection singleFatwah={singleFatwah} />
                    </div>
                    <div className='grid grid-cols-1  xl:grid-cols-2 gap-6  mt-6'>
                        <FatwaListInner title="Related Fatwah " titleWidth="w-[220px]" fatwahs={fatwahs?.data} settings={settings} homePage={homePage} />
                        <FatwaListInner title="Related Topics" titleWidth="w-[220px]" fatwahs={fatwahs?.data} settings={settings} homePage={homePage} />
                    </div>
                </div>
            </Container>

        </div>
    )
}
