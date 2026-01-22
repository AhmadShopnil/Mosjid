import FacilitiesSection from '@/components/Services/masjidView/FacilitiesSection'
import FloorGuide from '@/components/Services/masjidView/FloorGuide'
import MasjidBenefits from '@/components/Services/masjidView/MasjidBenefits'
import MasjidEtiquttes from '@/components/Services/masjidView/MasjidEtiquttes'
import MasjidHistory from '@/components/Services/masjidView/MasjidHistory'
import React from 'react'

export default function page() {
  return (
    <div>
      <MasjidHistory />
      <FloorGuide />
      <FacilitiesSection />
      <MasjidBenefits />
      <MasjidEtiquttes />
    </div>
  )
}
