import AskQuestion from '@/components/Fatwah/AskQuestion'
import FatwaFinder from '@/components/Fatwah/FatwahFinder'
import FatwaListInner from '@/components/Fatwah/FatwaListInner'
import SubmitRequest from '@/components/Fatwah/SubmitRequest'
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Container from '@/components/Shared/Container'
import Sidebar from '@/components/Shared/Sidebar'
import { getFatwa, getPage, getSettings } from '@/helper/actions'
import React from 'react'

export default async function page() {

    const fatwahs = await getFatwa();
    const settings = await getSettings()
    const homePage = await getPage("home-sections-heading-management")
    return (
        <div>

            <div>
                <BannerInnerPage />
            </div>
            <Container className='mt-10'>
                <FatwaFinder />
            </Container>

            <Container className='flex gap-6 my-6'>
                {/* sidebar */}
                <div className='w-[400px] space-y-6'>
                    <Sidebar />
                    <AskQuestion />
                    <SubmitRequest />
                </div>
                {/* main content */}
                <div className=' w-full'>
                    <FatwaListInner title="New Fatawa" titleWidth="w-[420px]" fatwahs={fatwahs} settings={settings} homePage={homePage} />
                    <div className='grid grid-cols-2 gap-6  mt-6'>
                        <FatwaListInner title="Selected Fatawa " titleWidth="w-[220px]" fatwahs={fatwahs} settings={settings} homePage={homePage}/>
                        <FatwaListInner title="Top Rated Fatawa" titleWidth="w-[220px]" fatwahs={fatwahs} settings={settings} homePage={homePage} />
                    </div>
                </div>
            </Container>

        </div>
    )
}
