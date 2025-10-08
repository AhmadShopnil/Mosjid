import Container from '@/components/Shared/Container'
import React from 'react'
import PrayerTimes from './PrayerTimes'
import NoticeBoard from './NoticeBoard'

export default function PrayerTimesAndNotices() {
  return (
    
    <div
    id='prayer-times'
    >
    <Container className=" flex flex-col lg:flex-row w-full gap-6 py-14   ">
            <div 
            
            className="w-full lg:w-[62%]">
              <PrayerTimes />
            </div>
          <div className="w-full lg:w-[38%]">
              <NoticeBoard />
          </div>
          </Container>
    </div>
  
  )
}
