

import PrayerTimesInnerPage from '@/components/PrayerTimes/PrayerTimesInnerPage'
import PrayerTimes from '@/components/PrayerTimes/PrayerTimesInnerPage'
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import SidebarMainDrawer from '@/components/Shared/SidebarMainDrawer'
import { sideBarCategories } from '@/data/sidebar'
import { getPage } from '@/helper/actions'
import { getImageUrl } from '@/helper/getImageUrl'
import { splitBySlash, splitBySpace } from '@/helper/splitBySpace'

import Image from 'next/image'
import React from 'react'

export default async function page() {
  const homePage = await getPage("home-sections-heading-management")
  const sections = homePage?.sections_on_api;
  const prayer_time = sections.find((s) => s.title_slug === "prayer_time");
  const heading_part_1 = splitBySlash(prayer_time?.title)[0]
  const heading_part_2 = splitBySlash(prayer_time?.title)[1]

  const arabic = getImageUrl(prayer_time?.image_media)
  const icon = getImageUrl(prayer_time?.background_media)


  return (
    <div>

      <div>
        <BannerInnerPage />
        <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Prayer Times" />

      </div>


      <Container className='flex gap-6 my-6'>
        {/* sidebar */}
        <SidebarMainDrawer categories={sideBarCategories} isNavigate={false} />

        {/* main content */}
        <div className=' w-full space-y-6'>
          <InnerHeader title={prayer_time?.sub_title} image={arabic} />

          <div>

            <PrayerTimesInnerPage />
          </div>

        </div>
      </Container>

    </div>
  )
}
