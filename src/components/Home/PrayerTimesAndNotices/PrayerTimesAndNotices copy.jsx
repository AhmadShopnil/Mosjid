// import Container from '@/components/Shared/Container'
// import React from 'react'
// import PrayerTimes from './PrayerTimes'
// import NoticeBoard from './NoticeBoard'
// import { getNotices, getPage, getSettings } from '@/helper/actions';

// export default async function PrayerTimesAndNotices() {

//   const notices = await getNotices();
//   const settings = await getSettings()
//   const homePage = await getPage("home-sections-heading-management")

//   return (

//     <div
//       id='prayer-times'
//     >
//       <Container className=" flex flex-col xl:flex-row w-full gap-6 py-14   ">
//         <div

//           className="w-full xl:w-[62%]">
//           <PrayerTimes />
//         </div>
//         <div className="w-full xl:w-[38%]">
//           <NoticeBoard notices={notices} settings={settings} homePage={homePage} />
//         </div>
//       </Container>
//     </div>

//   )
// }
