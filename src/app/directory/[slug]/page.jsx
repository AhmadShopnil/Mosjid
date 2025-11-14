
import DirectoryPage from '@/components/Directory/Directorypage'
import DirectorySearchInnerPage from '@/components/Directory/DirectorySearchInnerPage'
import DirectoryPageClient from '@/components/Directory/DirectorySinglePage'
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import Sidebar from '@/components/Shared/Sidebar'
import SidebarMainDrawer from '@/components/Shared/SidebarMainDrawer'
import { useSelectedParrent } from '@/context/SelectedContextParrent'
import { sideBarCategories } from '@/data/sidebar'
import { getCategories, getDirectory, getDirectoryByCat, getPage, getSettings } from '@/helper/actions'
import { getImageUrl } from '@/helper/getImageUrl'
import { transformNoticeCategories } from '@/helper/transformNoticeCategories'
import React from 'react'





export default async function page({ params }) {
  const { slug } = await params;
  //  const { selected, setSelected, clearSelected } = useSelected();
    // const { selectedParrent, setSelectedParrent, clearSelectedParrent } = useSelectedParrent();

  const cat = await getCategories("directory_categories")
  const prefecture = await getCategories("prefecture")
  const city = await getCategories("city")
  const district = await getCategories("district")
  const settings = await getSettings()
  const homePage = await getPage("home-sections-heading-management")
 const directories = await getDirectoryByCat(slug)

  const formattedCategories = transformNoticeCategories(cat);
  const sections = homePage?.sections_on_api;
  const directory_extradata = sections.find((s) => s.title_slug === "directory");
  const arabic_image = getImageUrl(directory_extradata?.image_media);

  const filterData = { city, prefecture, district,cat }



  return (
    <div>

      <DirectoryPageClient  settings={settings} homePage={homePage} slug={slug} filterData={filterData} />

    </div>
  )
}
