// import { getDay_Month_Year } from '@/helper/formateDate'
// import { getMetaValueFromExtra_Fields } from '@/helper/metaHelpers';
// import Image from 'next/image'
// import React from 'react'
// import SocialShare from '../Shared/SocialShare';

// export default function SingleEventDetailsCard({ event }) {

//     // console.log("from even card", event)

//     const day = getMetaValueFromExtra_Fields(event, "day");
//     const month = getMetaValueFromExtra_Fields(event, "month");
//     const time = getMetaValueFromExtra_Fields(event, "time");
//     const year = getMetaValueFromExtra_Fields(event, "year");
//     const location = getMetaValueFromExtra_Fields(event, "location");
//     // console.log("day",day)


//     return (

//         <div>
//             <div className="grid grid-cols-1 lg:grid-cols-6 gap-3 p-7 bg-white rounded-xl shadow-sm overflow-hidden
//              border border-gray-200">

//                 <div className="col-span-1 flex flex-col ">
//                     <h4 className='text-xl md:text-2xl font-semibold text-[#000000]'>
//                         Event Time <br />
//                         イベント時間
//                     </h4>

//                     <div className='bg-[#F2F2F2] rounded-md text-[#000000] w-[150px] h-[100px] p-4 mt-7 space-y-2'>
//                         <div className='space-x-1'>
//                             <span className='text-[#00401A] font-semibold text-2xl md:text-3xl'>{day}</span>
//                             <span className='text-[#00401A] text-sm'>{month}</span>
//                         </div>
//                         <p className='text-[#00401A] text-sm'>{time}</p>

//                     </div>
//                 </div>


//                 <div className="lg:col-span-3 flex flex-col ">
//                     <h4 className='text-xl md:text-2xl font-semibold text-[#000000]'>Event Name <br />
//                         イベント名</h4>
//                     <div className='mt-7'>
//                         <h4 className='text-xl text-[#52B920] font-semibold gradient-border_b pb-2 mb-3'>{event?.name}</h4>
//                         <div
//                             className="text-[#333333]  text-xs sm:text-sm "
//                             dangerouslySetInnerHTML={{ __html: event?.description }}
//                         />
//                         {/* <div className='flex items-center justify-start mt-6 gap-2'>
//                             <span className='text-[#001609] font-semibold text-sm'>Join This Event </span>
//                             <Image
//                                 src="/images/others/arrow-r.png"
//                                 alt='a1'
//                                 width={16}
//                                 height={10}
//                                 className='w-[15px] h-[10px]'
//                             />
//                         </div> */}
//                     </div>
//                 </div>

//                 <div className="lg:col-span-2  rounded-[20px] flex flex-col gap-2  min-h-[300px]">
//                     <div className='h-[20%]'>

//                     </div>
//                     {/* Image Container */}
//                     <div className=" rounded-[10px] w-full lg:w-[400px] h-[80%] overflow-hidden">
//                         <Image
//                             src={event?.featured_image}
//                             alt="a1"
//                             width={400}
//                             height={400}
//                             className=" rounded-xl h-[full]"
//                         />

//                     </div>


//                 </div>



//             </div>


//            <div className='mt-5'>
//              <SocialShare />
//            </div>
//         </div>

//     )
// }
