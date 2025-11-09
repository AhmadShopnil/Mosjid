
import DirectoryPage from '@/components/Directory/Directorypage'
import DirectorySearchInnerPage from '@/components/Directory/DirectorySearchInnerPage'
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import Sidebar from '@/components/Shared/Sidebar'
import SidebarMainDrawer from '@/components/Shared/SidebarMainDrawer'
import { sideBarCategories } from '@/data/sidebar'
import { getCategories, getDirectory, getDirectoryByCat, getPage, getSettings } from '@/helper/actions'
import { transformNoticeCategories } from '@/helper/transformNoticeCategories'

import React from 'react'





export default async function page({ params }) {
  const { slug } = await params;

  const cat = await getCategories("directory_categories")
  const settings = await getSettings()
  const homePage = await getPage("home-sections-heading-management")
  const formattedCategories = transformNoticeCategories(cat);
  const directories = await getDirectoryByCat(slug)

  const sections = homePage?.sections_on_api;
  const directory_extradata = sections.find((s) => s.title_slug === "directory");
  const arabic_image = getImageUrl(directory_extradata?.image_media)
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
   
        {/* main content */}
        <div className=' w-full space-y-6'>
          {/* Header */}
          <InnerHeader title={directory_extradata?.sub_title} image={arabic_image} />
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
