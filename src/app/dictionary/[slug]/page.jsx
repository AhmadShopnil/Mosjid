
import DictionaryPage from '@/components/Dictionary/DictionaryPage'
import DictionarySearchSection from '@/components/Directory/DirectorySearchInnerPage'
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import SidebarMainDrawer from '@/components/Shared/SidebarMainDrawer'
import { sideBarCategories } from '@/data/sidebar'
import {  getPage, getSettings } from '@/helper/actions'
import React from 'react'




export default async function page() {


    const settings = await getSettings()
    const homePage = await getPage("home-sections-heading-management")


    return (
        <div>

            <div>
                <BannerInnerPage />
                <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Dictionary" />
            </div>


            <Container className='flex gap-6 my-6'>
                {/* sidebar */}
                <SidebarMainDrawer isSubmitRequest={false} categories={sideBarCategories} />
                {/* <div className='w-[400px] space-y-6'>
                     <Sidebar categories={categories} />
                    <SubmitRequest />
                </div> */}
                {/* main content */}
                <div className=' w-full space-y-6'>
                    {/* Header */}
                    <InnerHeader title={"掲示板"} image={"/images/fatwah/fatwaharbic_white.png"} />
                   <div className=''>
                     <div className='w-full py-2'>
                        <DictionarySearchSection/>
                     </div>
                   </div>
                   <DictionaryPage/>
                </div>
            </Container>

        </div>
    )
}
