import React from 'react'
import OfferServicesSlider from './OfferServicesSlider'
import { getServices } from '@/helper/actions';

export default async function OfferServices() {
  const services = await getServices();


  // const service_heading = getMetaValueByMetaName(settings, "service_heading") || "";
  // const service_heading_sub_heading =
  //     getMetaDescriptionByMetaName(settings, "service_heading") || "";


  return (
    <div>
      <OfferServicesSlider services={services}/>
    </div>
  )
}
