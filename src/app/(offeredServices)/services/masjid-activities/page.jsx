import BenefitsOfJumah from '@/components/Services/masjidActivities/BenefitsOfJumah'
import DailyActivities from '@/components/Services/masjidActivities/DailyActivities'
import EidPrayer from '@/components/Services/masjidActivities/EidPrayer'
import JumahPrayer from '@/components/Services/masjidActivities/JumahPrayer'
import React from 'react'

const page = () => {
  return (
    <div>
        <DailyActivities />
        <JumahPrayer />
        <BenefitsOfJumah />
        <EidPrayer />
    </div>
  )
}

export default page