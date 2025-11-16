
import DirectoryPageClient from '@/components/Directory/DirectorySinglePage'
import { getCategories,  getDirectoryByCat, getPage, getSettings } from '@/helper/actions'
import { getImageUrl } from '@/helper/getImageUrl'
import { transformNoticeCategories } from '@/helper/transformNoticeCategories'
import React from 'react'





export default async function page({ params }) {
  const { slug } = await params;
  const cat = await getCategories("directory_categories")
  const prefecture = await getCategories("prefecture")
  const city = await getCategories("city")
  const district = await getCategories("district")
  const settings = await getSettings()
  const homePage = await getPage("home-sections-heading-management")




  const filterData = { city, prefecture, district,cat }



  return (
    <div>

      <DirectoryPageClient  settings={settings} homePage={homePage} slug={slug} filterData={filterData} />

    </div>
  )
}
