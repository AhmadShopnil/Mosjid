
import DirectoryPage from '@/components/Directory/Directorypage'
import DirectorySearchInnerPage from '@/components/Directory/DirectorySearchInnerPage'
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import Sidebar from '@/components/Shared/Sidebar'
import SidebarMainDrawer from '@/components/Shared/SidebarMainDrawer'
import { sideBarCategories } from '@/data/sidebar'
import { getCategories, getDirectory, getPage, getSettings } from '@/helper/actions'
import { transformNoticeCategories } from '@/helper/transformNoticeCategories'

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



export default async function page({ params }) {
  const { slug } = await params;

  const cat = await getCategories("directory_categories")
  const settings = await getSettings()
  const homePage = await getPage("home-sections-heading-management")
  const formattedCategories = transformNoticeCategories(cat);
  const directories = await getDirectory(slug)


  // console.log("directory",{slug,directories})

  return (
    <div>

      <div>
        <BannerInnerPage />
        <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Directory" />
      </div>


      <Container className='flex gap-6 my-6'>
        {/* sidebar */}

        <SidebarMainDrawer categories={formattedCategories} setSelectedCat={null} directoryNavigate={true} />
        {/* <div className='w-[400px] space-y-6'>
                     <Sidebar categories={categories} />
                    <SubmitRequest />
                </div> */}
        {/* main content */}
        <div className=' w-full space-y-6'>
          {/* Header */}
          <InnerHeader title={"掲示板"} image={"/images/fatwah/fatwaharbic_white.png"} />
          <div className='w-full'>
            <div className='w-[80%] py-3'>
              <DirectorySearchInnerPage />
            </div>
          </div>
          <DirectoryPage directories={directories} />
        </div>
      </Container>

    </div>
  )
}
