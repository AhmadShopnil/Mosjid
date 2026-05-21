import BenefitsOfEid from '@/components/Services/masjidActivities/BenefitsOfEid'
import BenefitsOfJumah from '@/components/Services/masjidActivities/BenefitsOfJumah'
import DailyActivities from '@/components/Services/masjidActivities/DailyActivities'
import EidPrayer from '@/components/Services/masjidActivities/EidPrayer'
import JumahPrayer from '@/components/Services/masjidActivities/JumahPrayer'
import ServiceInnerHeader from '@/components/Services/Shared/ServiceInnerHeader'
import React from 'react'

const page = () => {
  return (
    <div>
      
       <div className='mb-6'>
        <ServiceInnerHeader
              title="結婚施設"
              title2="مرفق الزواج"
        />
       </div>


        <DailyActivities />
        <JumahPrayer />
        <BenefitsOfJumah />
        <EidPrayer />
        <BenefitsOfEid />
    </div>
  )
}

export default page