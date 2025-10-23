

import SubmitRequest from '@/components/Fatwah/SubmitRequest'
import ArchiveNotice from '@/components/Notice/ArchiveNotice'
import NoticeBoard from '@/components/Notice/NoticeBoard'
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import Sidebar from '@/components/Shared/Sidebar'
import {  getNotices, getPage, getSettings } from '@/helper/actions'

import React from 'react'

export default async function page() {

    const notices = await getNotices();
    const settings = await getSettings()
    const homePage = await getPage("home-sections-heading-management")


    return (
        <div>

            <div>
                <BannerInnerPage />
               <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Notices Board" />
            </div>


            <Container className='flex  gap-6 my-6'>
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
