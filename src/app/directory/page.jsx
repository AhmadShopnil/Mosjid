
import DirectoryPage from '@/components/Directory/Directorypage'
import DirectorySearchInnerPage from '@/components/Directory/DirectorySearchInnerPage'
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import BreadcrumbForNested from '@/components/Shared/BreadcrumbForNested'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import SidebarMainDrawer from '@/components/Shared/SidebarMainDrawer'
import { getCategories, getDirectory, getPage, getSettings } from '@/helper/actions'
import { getImageUrl } from '@/helper/getImageUrl'
import { transformNoticeCategories } from '@/helper/transformNoticeCategories'
import React from 'react'





export default async function page() {

  const prefecture = await getCategories("prefecture")
  const city = await getCategories("city")
  const district = await getCategories("district")
  const cat = await getCategories("directory_categories")
  const settings = await getSettings()
  const homePage = await getPage("home-sections-heading-management")

  const formattedCategories = transformNoticeCategories(cat);
  const directories = await getDirectory()



  const sections = homePage?.sections_on_api;
  const directory_extradata = sections.find((s) => s.title_slug === "directory");
  const arabic_image = getImageUrl(directory_extradata?.image_media)


  const filterData = { city, prefecture, district, cat }
  // console.log("directory",{slug,directories})

  return (
    <div>

      <div>
        <BannerInnerPage />
        {/* <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Directory" /> */}
        <BreadcrumbForNested
          items={[
            { label: "Home", link: "/" },
            { label: "Directory", link: "/directory/19" },
            // { label: selectedParrent?.name, link: null` },
            // { label: selected?.name, link: null },

          ]}
        />
      </div>


      <Container className='flex gap-6 my-6'>
        {/* sidebar */}

        <SidebarMainDrawer categories={formattedCategories} setSelectedCat={null} directoryNavigate={true} dataForContact={`directories`} />

        {/* main content */}
        <div className=' w-full space-y-6'>
          {/* Header */}
          <InnerHeader title={directory_extradata?.sub_title} image={arabic_image} />
          <div className='w-full'>
            <div className='w-full lg:w-[80%] py-3'>
              <DirectorySearchInnerPage filterData={filterData} />
            </div>
          </div>
          <DirectoryPage directories={directories} />
        </div>
      </Container>

    </div>
  )
}
