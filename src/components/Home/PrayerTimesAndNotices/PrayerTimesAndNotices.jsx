import Container from '@/components/Shared/Container'
import React from 'react'
import PrayerTimes from './PrayerTimes'
import NoticeBoard from './NoticeBoard'
import { getNotices, getPage, getProhibitedTime, getPryerTime, getSettings } from '@/helper/actions';
import PrayerTimesAndNoticesClient from './PrayerTimesAndNoticesClient';

export default async function PrayerTimesAndNotices() {

  const notices = await getNotices();
  const settings = await getSettings()
  const homePage = await getPage("home-sections-heading-management")
  const prayerTimes = await getPryerTime();
  const ProhibitedTime = await getProhibitedTime();

  return (

    <div
      id='prayer-times'
    >
      <PrayerTimesAndNoticesClient
        notices={notices}
        settings={settings}
        homePage={homePage}
        prayerTimes={prayerTimes}
        ProhibitedTime={ProhibitedTime} />
    </div>

  )
}
