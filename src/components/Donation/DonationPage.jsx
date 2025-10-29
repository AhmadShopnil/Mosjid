import React from 'react'
import MakeDonationInner from './MakeDonationInner'
import { getDonationsMethods, getPage } from '@/helper/actions';
import { getImageUrl } from '@/helper/getImageUrl';

export default async function DonationPage() {

 const donationMethods = await getDonationsMethods();

  const homePage = await getPage("home-sections-heading-management")

  const sections = homePage.sections_on_api;
  const make_your_donation = sections.find((s) => s.title_slug === "make-your-doantion"); 
   const image_arabic = getImageUrl(make_your_donation?.image_media);


    return (
        <div>
            <MakeDonationInner donationMethods={donationMethods} make_your_donation={make_your_donation} />

        </div>
    )
}
