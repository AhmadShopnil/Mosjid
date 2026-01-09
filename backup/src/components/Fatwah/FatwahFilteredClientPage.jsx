
"use client"

import FatwaFinder from '@/components/Fatwah/FatwahFinder'
import FatwahSearchResult from '@/components/Fatwah/FatwahSearchResult'
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Container from '@/components/Shared/Container'
import SidebarDrawerForBooks from '@/components/Shared/SidebarDrawerForBooks'
import { useFatwaFilters } from '@/context/FatwaFilterContext';
import React from 'react'
import BreadcrumbForNested from '../Shared/BreadcrumbForNested';
import BannerInnerFatwa from './BannerInnerFatwa'

export default function FatwahFilteredClientPage({ fatwahs, settings, homePage, books, data_for_filter }) {
    const {
        selectedMajhabs,
        setSelectedMajhabs,

        selectedBooks,
        setSelectedBooks,

        selectedChapter,
        setSelectedChapter,

        selectedSection,
        setSelectedSection,


    } = useFatwaFilters();


    const requestData = "Fatwa"


    return (
        <div>

            <div>
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
                    dataForContact={requestData}
                    data_for_filter={data_for_filter}
                />

                {/* main content */}
                <div className=' w-full'>
                    <FatwahSearchResult title="Fatwa Finder Results" titleWidth="w-[420px]" settings={settings} homePage={homePage} />

                </div>
            </Container>

        </div>
    )
}
