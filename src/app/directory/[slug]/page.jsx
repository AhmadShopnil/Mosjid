
import DirectoryPage from '@/components/Directory/Directorypage'
import SubmitRequest from '@/components/Fatwah/SubmitRequest'
import SearchSection from '@/components/Home/Directory_Donation/Directory/SearchSection'
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import Sidebar from '@/components/Shared/Sidebar'
import {  getPage, getSettings } from '@/helper/actions'

import React from 'react'


 const categories = [
    {
      id: "Mosque",
      icon: "/images/fatwah/pen.png",
      activeIcon: "/images/QuickLinks/hover/1.png",
      title: "Mosque",
      subtitle: "イバーダ",
      hasSubItems: true,
      subItems: ["Prayer", "Fasting", "Hajj"],
    },
    {
      id: "Madrasha",
      icon: "/images/fatwah/pen.png",
      activeIcon: "/images/QuickLinks/hover/Blog & event-1.png",
      title: "Madrasha",
      subtitle: "詳細",
      hasSubItems: true,
      subItems: ["Family", "Work", "Health"],
    },
    {
      id: "Islamic Center",
      icon: "/images/fatwah/pen.png",
      activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
      title: "Islamic Center",
      subtitle: "ハラール",
      hasSubItems: true,
      subItems: ["Halal", "Haram", "Makruh"],
    },
    {
      id: "Quranic Center",
      icon: "/images/fatwah/pen.png",
      activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
      title: "Quranic Center",
      subtitle: "イスラムの章",
      hasSubItems: false,
      isArrow: true,
    },
     {
      id: "Othersr",
      icon: "/images/fatwah/pen.png",
      activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
      title: "Others",
      subtitle: "イスラムの章",
      hasSubItems: false,
      isArrow: true,
    },
   
  ];



export default async function page() {


    const settings = await getSettings()
    const homePage = await getPage("home-sections-heading-management")


    return (
        <div>

            <div>
                <BannerInnerPage />
                <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Directory" />
            </div>


            <Container className='flex gap-6 my-6'>
                {/* sidebar */}
                <div className='w-[400px] space-y-6'>
                     <Sidebar categories={categories} />
                    <SubmitRequest />
                </div>
                {/* main content */}
                <div className=' w-full space-y-6'>
                    {/* Header */}
                    <InnerHeader title={"掲示板"} image={"/images/fatwah/fatwaharbic_white.png"} />
                   <div className=''>
                     <div className='w-full md:w-[90%] lg:w-[75%] xl:w-[60%] py-2'>
                        <SearchSection/>
                     </div>
                   </div>
                   <DirectoryPage/>
                </div>
            </Container>

        </div>
    )
}
