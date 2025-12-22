// "use client"

// import React, { useState } from 'react'
// import { getMetaValueByMetaName } from '@/helper/metaHelpers';
// import EventCard from './EventCard';
// import Pagination from '../Shared/Pagination';

// import EventCardSkeletonList from '../Shared/Skeleton/EventCardSkeletonList';



// export default function Events({ events, settings, homePage, loading, currentPage, setCurrentPage, totalPages, section_title }) {


//   // extra data extract using utils function
//   const sections = homePage?.sections_on_api;
//   const blog_events_ExtraData = sections.find((s) => s.title_slug === "islamic-blog-and-events");
//   const eventsSectionTitle = blog_events_ExtraData?.custom_information.find((item) => item.label === "upcoming_events")
 


//   // console.log("event ness",eventsSectionTitle)

//   return (
//     <div className='gradient-border rounded-3xl p-6 bg-[#F9FFF6] h-full shadow-md'>
//       {/* heading */}
//       <div className=' flex justify-between'>
//         <h4 className='text-[#00401A] font-bold text-xl sm:text-2xl md:text-3xl gradient-border_b pb-3 ' >
//           {section_title || eventsSectionTitle?.value}
//         </h4>

//       </div>
//       {/* Events */}

//       {loading ? (
//         <EventCardSkeletonList />
//       ) : events?.length === 0 ? (
//         <div className="mt-6 w-full flex justify-center">
//           <p className="text-gray-600 text-lg font-medium">
//             No events found
//           </p>
//         </div>
//       ) : (
//         <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-5">
//           {events.map((event, i) => (
//             <EventCard key={i} event={event} index={i} settings={settings} />
//           ))}
//         </div>
//       )}



//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={setCurrentPage}
//       />

//     </div>
//   )
// }
