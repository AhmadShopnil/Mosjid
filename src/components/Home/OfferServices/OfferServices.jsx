import React from 'react'
import OfferServicesSlider from './OfferServicesSlider'
import { getMenus, getPage, getServices } from '@/helper/actions';

export default async function OfferServices() {

  const services = await getServices();
  const offerServicesMenu = await getMenus(7)

  const homePage = await getPage("home-sections-heading-management")
  const sections = homePage?.sections_on_api;
  const offered_services_ExtraData = sections.find((s) => s.title_slug === "offered-services");

  return (
    <div id='offered-services'>
      <OfferServicesSlider services={services} offered_services_ExtraData={offered_services_ExtraData}
        offerServicesMenu={offerServicesMenu?.items} />
    </div>
  )
}
