"use client"


import FatwaFinder from '@/components/Fatwah/FatwahFinder'
import FatwahSlected from '@/components/Fatwah/FatwahSlected'
import FatwaListInner from '@/components/Fatwah/FatwaListInner'

import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import BreadcrumbForNested from '@/components/Shared/BreadcrumbForNested'
import Container from '@/components/Shared/Container'
import SidebarDrawerForBooks from '@/components/Shared/SidebarDrawerForBooks'
import { useFatwaFilters } from '@/context/FatwaFilterContext'

export default function FatwahClientPage({fatwahs,settings,homePage,books,data_for_filter}) {

const {
    selectedMajhabs,
    setSelectedMajhabs,

    selectedBooks,
    setSelectedBooks,

    selectedChapter,
    setSelectedChapter,

    selectedSection,
    setSelectedSection,

    selectedSearchTerm,
    setSelectedSearchTerm,
  } = useFatwaFilters();




 const requestData = "Fatwa"
  return (
    <div>
    
          <div>
            <BannerInnerPage />
            {/* <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Fatwah" /> */}
            <BreadcrumbForNested
              items={[
                { label: "Home", link: "/" },
                { label: "Fatwah", link: "/fatwah" },
                { label: selectedBooks?.name_en, link: "/fatwah" },
                { label: selectedChapter?.name_en, link: null },
    
              ]}
            />
          </div>
          <Container className='mt-10'>
            <FatwaFinder data_for_filter={data_for_filter} />
          </Container>
    
          <Container className='flex gap-6 my-6'>
            {/* sidebar */}
    
            <SidebarDrawerForBooks
              books={books?.data}
              isAskQuestion={true}
              isFatwah_Dictionary_Filter={true}
    
              dataForContact={requestData} />
    
    
    
            {/* main content */}
            <div className=' w-full'>
                <FatwahSlected settings={settings} homePage={homePage} />
             
              <div className='grid grid-cols-1 xl:grid-cols-2 gap-3 lxl:gap-6  mt-6'>
               <FatwaListInner title="New Fatwa" titleWidth="w-[220px]" fatwahs={fatwahs?.data} settings={settings} homePage={homePage} />
                {/* <FatwaListInner title="Selected Fatwah " titleWidth="w-[220px]" fatwahs={fatwahs?.data} settings={settings} homePage={homePage} /> */}
                <FatwaListInner title="Top Rated Fatwa" titleWidth="w-[220px]" fatwahs={fatwahs?.data} settings={settings} homePage={homePage} />
              </div>
            </div>
          </Container>
    
        </div>
  )
}
