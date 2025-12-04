
import React from 'react'
import DonationPage from '@/components/Donation/DonationPage';
import { getCategories, getDonationsMethods, getPage, getSettings } from '@/helper/actions'
import { transformNoticeCategories } from '@/helper/transformNoticeCategories'




export default async function page() {
  const settings = await getSettings();
  const homePage = await getPage("home-sections-heading-management")
  const cat = await getCategories("donation_categories")

  const formattedCategories = transformNoticeCategories(cat);
 const allDonationsList = await getDonationsMethods()
 


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
