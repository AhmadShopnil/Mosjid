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
import axiosInstance from '@/helper/axiosInstance'
import { useEffect, useState } from 'react'

export default function FatwahClientPage({ settings, homePage, books, data_for_filter }) {

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


  const [fatwahs, setFatwahs] = useState([]);
  const [topRatedFatwahs, setTopRated] = useState([]);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    const filteredData = fatwahs?.filter((item) => item?.is_featured == "Yes")
    setTopRated(filteredData)
  }, [fatwahs]);




  useEffect(() => {

    async function fetchFilteredFatwa() {
      setLoading(true);

      try {


        const apiUrl = `/fatwa?is_featured=Yes`;

        // console.log("apiUrl", apiUrl)
        const response = await axiosInstance.get(apiUrl)
        const data = response?.data?.data || []
        const meta = response?.data?.meta || {}
        // const res = await fetch(apiUrl);
        // const data = await res.json();
        // console.log("res data featured", data)

        setFatwahs(data?.data || []);

      } catch (error) {
        console.error("Error fetching filtered fatwa:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFilteredFatwa();



  }, [

  ]);








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
          data_for_filter={data_for_filter}
          dataForContact={requestData} />



        {/* main content */}
        <div className=' w-full'>
          <FatwahSlected settings={settings} homePage={homePage} />

          <div className='grid grid-cols-1 xl:grid-cols-2 gap-3 lxl:gap-6  mt-6'>
            <FatwaListInner title="New Fatwa" titleWidth="w-[350px]" fatwahs={fatwahs} settings={settings} homePage={homePage} />
            {/* <FatwaListInner title="Selected Fatwah " titleWidth="w-[220px]" fatwahs={fatwahs?.data} settings={settings} homePage={homePage} /> */}
            <FatwaListInner title="Top Rated Fatwa" titleWidth="w-[220px]" fatwahs={topRatedFatwahs} settings={settings} homePage={homePage} />
          </div>
        </div>
      </Container>

    </div>
  )
}
