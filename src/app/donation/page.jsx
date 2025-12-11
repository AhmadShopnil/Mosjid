
import React from 'react'
import DonationPage from '@/components/Donation/DonationPage';
import { getAllDonationsMethods, getCategories, getDonationsMethods, getFeaturedCategories, getPage, getSettings } from '@/helper/actions'
import { transformNoticeCategories } from '@/helper/transformNoticeCategories'




export default async function page() {
  const settings = await getSettings();
  const homePage = await getPage("home-sections-heading-management")
  // const categories = await getCategories("donation_categories")
  const categories = await getFeaturedCategories("donation_categories")


  const activeCategories = categories?.filter((cat) => cat?.is_status != "draft")
  const formattedCategories = transformNoticeCategories(activeCategories);
  
  const allDonationsList = await getAllDonationsMethods()


  //  console.log({formattedCategories})


  return (
    <div>

      <DonationPage
        settings={settings}
        homePage={homePage}
        formattedCategories={formattedCategories}
        allDonationsList={allDonationsList}
   
      />

    </div>
  )
}
