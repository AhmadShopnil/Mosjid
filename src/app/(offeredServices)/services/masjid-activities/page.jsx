import BenefitsOfEid from '@/components/Services/masjidActivities/BenefitsOfEid'
import BenefitsOfJumah from '@/components/Services/masjidActivities/BenefitsOfJumah'
import DailyActivities from '@/components/Services/masjidActivities/DailyActivities'
import EidPrayer from '@/components/Services/masjidActivities/EidPrayer'
import JumahPrayer from '@/components/Services/masjidActivities/JumahPrayer'
import ServiceInnerHeader from '@/components/Services/Shared/ServiceInnerHeader'
import { getPage } from '@/helper/actions'
import { getImageUrl } from '@/helper/getImageUrl'
import React from 'react'

const page = async () => {



  const masjid_activities_data = await getPage("masjid-activities");
  const sections = masjid_activities_data?.sections_on_api;

  const daily_activities = sections.find((s) => s.title_slug === "daily-activities");
  const jumuah_prayer_sequence = sections.find((s) => s.title_slug === "jumuah-prayer-sequence");
  const benefits_of_jumuah_prayer = sections.find((s) => s.title_slug === "benefits-of-jumuah-prayer");
  const eid_prayer_sequence = sections.find((s) => s.title_slug === "eid-prayer-sequence");
  const benefits_of_eid_prayer = sections.find((s) => s.title_slug === "benefits-of-eid-prayer");

  // const image = getImageUrl(madrasa_timeline?.image_media);


  return (
    <div>

      <div className='mb-6'>
        <ServiceInnerHeader
          title="結婚施設"
          title2="مرفق الزواج"
        />
      </div>

      <DailyActivities
        daily_activities={daily_activities}
      />

      <JumahPrayer
        jumuah_prayer_sequence={jumuah_prayer_sequence}
      />

      <EidPrayer
        eid_prayer_sequence={eid_prayer_sequence}
      />

      <BenefitsOfJumah
        benefits_of_jumuah_prayer={benefits_of_jumuah_prayer}
      />

      <BenefitsOfEid
        benefits_of_eid_prayer={benefits_of_eid_prayer}
      />

    </div>
  )
}

export default page