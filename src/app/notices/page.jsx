import AskQuestionSidebar from '@/components/Fatwah/AskQuestionSidebar'
import Breadcrumb from '@/components/Fatwah/Breadcrumb'
import FatwaFinder from '@/components/Fatwah/FatwahFinder'
import FatwaListInner from '@/components/Fatwah/FatwaListInner'
import SubmitRequest from '@/components/Fatwah/SubmitRequest'
import ArchiveNotice from '@/components/Notice/ArchiveNotice'
import NoticeBoard from '@/components/Notice/NoticeBoard'
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import Sidebar from '@/components/Shared/Sidebar'
import { getFatwa, getNotices, getPage, getSettings } from '@/helper/actions'
import Image from 'next/image'
import React from 'react'

export default async function page() {

    const notices = await getNotices();
    const settings = await getSettings()
    const homePage = await getPage("home-sections-heading-management")


    return (
        <div>

            <div>
                <BannerInnerPage />
                <Breadcrumb />
            </div>


            <Container className='flex gap-6 my-6'>
                {/* sidebar */}
                <div className='w-[400px] space-y-6'>
                    <Sidebar />
                    {/* <AskQuestionSidebar /> */}
                    <SubmitRequest />
                </div>
                {/* main content */}
                <div className=' w-full space-y-6'>
                    {/* Header */}
                    <InnerHeader title={"掲示板"} image={"/images/fatwah/fatwaharbic_white.png"} />
                    <NoticeBoard homePage={homePage} notices={notices} settings={settings} />
                    <ArchiveNotice/>
                </div>
            </Container>

        </div>
    )
}
