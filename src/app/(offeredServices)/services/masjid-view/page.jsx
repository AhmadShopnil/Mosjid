import FacilitiesSection from '@/components/Services/masjidView/FacilitiesSection'
import FloorGuide from '@/components/Services/masjidView/FloorGuide'
import MasjidBenefits from '@/components/Services/masjidView/MasjidBenefits'
import MasjidEtiquttes from '@/components/Services/masjidView/MasjidEtiquttes'
import MasjidHistory from '@/components/Services/masjidView/MasjidHistory'
import ServiceInnerHeader from '@/components/Services/Shared/ServiceInnerHeader'
import { getPage } from '@/helper/actions'
import React from 'react'

export default async function page() {



  // extract page content
  const masjid_view_data = await getPage("masjid-view");
  const sections = masjid_view_data?.sections_on_api;

  const masjid_facilities = sections?.find((s) => s.title_slug === "masjid-facilities");
  const masjid_etiquttes = sections?.find((s) => s.title_slug === "masjid-etiquttes");
  const masjid_benefits = sections?.find((s) => s.title_slug === "masjid-benefits");



  return (
    <div className='space-y-6 md:space-y-8'>
      <ServiceInnerHeader
        title="マスジドビュー"
        title2="منظر المسجد"
      />
      <MasjidHistory />
      <FloorGuide />
      <FacilitiesSection
        masjid_facilities={masjid_facilities}
      />
      <MasjidBenefits
        masjid_benefits={masjid_benefits}
      />
      <MasjidEtiquttes
        masjid_etiquttes={masjid_etiquttes}
      />
    </div>
  )
}
