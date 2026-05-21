// import React from 'react';
// import GradientBorder from '@/components/GradientBorder/GradientBorder';
// import SectionTitleRow from '@/components/SectionTitleRow/SectionTitleRow';
// import Image from 'next/image';

// // 1. JSON Data from the photo
// const adhanData = [
//   { id: "01", title: "First Adhan", subtitle: "(Call to Prayer)", time: "12:45" },
//   { id: "02", title: "Bayan", subtitle: "(Religious Talk) in Japanese", time: "12:50" },
//   { id: "03", title: "Break for", subtitle: "Sunnah Prayers", time: "13:15" },
//   { id: "04", title: "Second Adhan", subtitle: "", time: "13:20" },
//   { id: "05", title: "Two Khutbahs", subtitle: "(Sermons) in Arabic", time: "13:25" },
//   { id: "06", title: "Iqamah for", subtitle: "Jumu'ah Salah", time: "13:30" },
// ];

// const JumahPrayer = () => {
//   return (
//     <div className='mt-16'>
//             <SectionTitleRow leftTitle={'Jumuʿah Prayer Sequence'} rightTitle={'金曜礼拝の順序'} />
//      <div className='pt-16'>
//       <GradientBorder innerClassName='pt-[70px] pb-[40px] pr-[40px] pl-[40px] '>

//        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 space-y-14 gap-8">
        
//         {adhanData?.map((item) => (
//           <div key={item.id} className="relative h-47 p-px rounded-[40px] bg-linear-to-b from-[#3198A0] to-[#51F909] shadow-lg">
            
//             {/* 2. The Inner Container (White Background) */}
//             <div className="relative w-full h-full bg-white rounded-[40px] flex flex-col items-center justify-center overflow-hidden">
              
//               {/* Subtle Inner Glow */}
//               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(49,152,160,0.15),transparent_60%)]" />

//               {/* Text Content - Exactly 20px as requested */}
//               <div className="z-10 text-center px-6">
//                 <h2 className="text-[#00401A] text-base font-bold">
//                   {item.title}
//                 </h2>
//                 {item.subtitle && (
//                   <p className="text-[#00401A] text-base font-bold mt-1">
//                     {item.subtitle}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* 3. Top Number Circle (Original Design) */}
//             <div className="absolute z-2 -top-10 left-1/2 -translate-x-1/2 w-20 h-20 p-px rounded-full bg-linear-to-b from-[#3198A0] to-[#51F909]">
//               <div className="w-full h-full bg-white rounded-full flex items-center justify-center relative">
//                 <span className="text-[#00401A] text-base  font-bold">{item.id}</span>
                
//                 {/* The Green Triangle Accent - Original Design */}
//                 <div 
//                   className="absolute -right-8 -z-8 top-5 w-10 h-10 bg-linear-to-br from-[#3198A0] to-[#51F909]" 
//                   style={{ clipPath: 'polygon(100% 50%, 0 0, 0 100%)', transform: 'rotate(0deg)' }}
//                 />
//               </div>
//             </div>

//             {/* 4. Bottom Time Capsule (Original Design) */}
//             <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-16 p-px rounded-full bg-linear-to-b from-[#3198A0] to-[#51F909] shadow-md">
//               <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
//                 <span className=" text-[#00401A] text-base font-bold">
//                   {item.time}
//                 </span>
//               </div>
//             </div>

//           </div>
//         ))}
        
//       </div>
//       </GradientBorder>
//            <div className='flex justify-end'>
//                       <div className="flex items-center justify-end space-x-4 p-4  w-fit">
            
//             {/* Twitter / X */}
//             <button className="flex items-center justify-center w-10 h-10 rounded-full  hover:opacity-90 transition-opacity">
//               <Image src="/images/offerServices/masjidActivities/twitter.svg" alt='twitter'  width="30" height="30" />
//             </button>
      
//             <div className="h-8 w-[1px] bg-[#BDBDBD]" />
      
//             {/* Facebook */}
//             <button className="flex items-center justify-center w-10 h-10">
//                <Image src="/images/offerServices/masjidActivities/facebook.svg" alt='facebook' width="30" height="30" />
//             </button>
      
//             <div className="h-8 w-[1px] bg-[#BDBDBD]" />
      
//             {/* WhatsApp */}
//             <button className="flex items-center justify-center w-10 h-10">
//              <Image src="/images/offerServices/masjidActivities/whatsapp.svg" alt='whatsapp' width="30" height="30" />
//             </button>
      
//             <div className="h-8 w-[1px] bg-[#BDBDBD]" />
      
//             {/* Print */}
//             <button className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800">
//              <Image src="/images/offerServices/masjidActivities/printer.svg" alt='printer' width="30" height="30" />
//             </button>
      
//             <div className="h-8 w-[1px] bg-[#BDBDBD]" />
      
//             {/* Download */}
//             <button className="flex items-center justify-center w-10 h-10 rounded-full transition-colors">
//                <Image src="/images/offerServices/masjidActivities/download.svg" alt='download'  width="30" height="30" />
//             </button>
      
//           </div>
//             </div>
//      </div>
//       {/* Responsive Container: 1 col on mobile, 2 on tablet, 3 on desktop */}
//     </div>
//   );
// };

// export default JumahPrayer;