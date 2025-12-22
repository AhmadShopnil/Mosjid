
import DirectoryPageClient from '@/components/Directory/DirectorySinglePage'
import BannerInnerPageServerSide from '@/components/Shared/BannerInnerPageServerSide';
import { getCategories, getDirectoryByCat, getPage, getSettings } from '@/helper/actions'
import React from 'react'


export default async function page({ params }) {
  const { slug } = await params;
  const cat = await getCategories("directory_categories")
  const prefecture = await getCategories("prefecture")
  const city = await getCategories("city")
  const district = await getCategories("district")
  const settings = await getSettings()
  const homePage = await getPage("home-sections-heading-management")
  const locations = await getCategories("location_management")



  const filterData = { city, prefecture, district, cat }



  return (
    <div>
      <BannerInnerPageServerSide />
      <DirectoryPageClient settings={settings} homePage={homePage} slug={slug} filterData={filterData} locations={locations} />

    </div>
  )
}
