import FacilitiesSection from '@/components/Services/masjidView/FacilitiesSection'
import FloorGuide from '@/components/Services/masjidView/FloorGuide'
import MasjidBenefits from '@/components/Services/masjidView/MasjidBenefits'
import MasjidEtiquttes from '@/components/Services/masjidView/MasjidEtiquttes'
import MasjidHistory from '@/components/Services/masjidView/MasjidHistory'
import ServiceInnerHeader from '@/components/Services/Shared/ServiceInnerHeader'
import React from 'react'

export default function page() {
  return (
    <div className='space-y-6 md:space-y-8'>
      <ServiceInnerHeader
        title="マスジドビュー"
        title2="منظر المسجد"
      />
      <MasjidHistory />
      <FloorGuide />
      <FacilitiesSection />
      <MasjidBenefits />
      <MasjidEtiquttes />
    </div>
  )
}
