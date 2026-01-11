// import Image from 'next/image';
// import React from 'react'
// import SocialShare from '../Shared/SocialShare';



// const LabelBox = ({ label, value }) => (
//   <div className="flex flex-col items-start  border border-[#E0E0E0] rounded-[10px] min-h-[50px]
//      overflow-hidden">
//     <div className="w-full  min-h-[50px] px-3 py-2 bg-[#e0e0e06d] flex items-center justify-between text-base text-[#000000]">
//       <span>{label}</span>
//       {/* <span className="hidden sm:inline">:</span> */}
//     </div>
//     <div className="flex-1 w-full px-3 py-2 text-[#333] break-words">{value || "-"}</div>
//   </div>
// );


// export default function SelectedWordDetails({ selectedItem, }) {


  
//   return (
//     <div>   {/* Selected Item Details Section */}
//       <div className="gradient-border rounded-2xl p-4 sm:p-6 md:p-8 bg-white shadow-md relative">



//         <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//           <Image
//             src="/images/directory/bg2.png"
//             alt="img"
//             width={340}
//             height={425}
//             className="object-contain transition-all duration-300"
//           />
//         </div>




//         <div className="bg-[#E5F5DE] h-[50px] flex items-center justify-center rounded-[8px] mb-6">
//           <h2 className="text-center text-xl font-semibold text-[#00401A]">
//             {selectedItem ? selectedItem?.word_en : "Details"}
//           </h2>
//         </div>

//         {/* Details Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Left Side */}
//           <div className="space-y-4">
//             <LabelBox label="Japanese" value={selectedItem?.word_ja} />
//             <LabelBox label="Japanese Reading(kana)" value={selectedItem?.pronunciation_ja} />
//             <LabelBox label="Romaji" value={selectedItem?.pronunciation_en} />
//             <LabelBox label="Synonym" value={selectedItem?.pronunciation_ar} />



//             {/* <LabelBox label="Usage" value={selectedItem?.usage} /> */}
//           </div>

//           {/* Right Side */}
//           <div className="space-y-4">
//             <LabelBox label="Arabic" value={selectedItem?.word_ar} />
//             <LabelBox label="English" value={selectedItem?.word_en} />
//             <LabelBox label="Usage" value={selectedItem?.usage_ja} />
//             <LabelBox label="Antonym" value={selectedItem?.pronunciation_ar} />

//           </div>

//         </div>

//         <div className='mt-4'>
//           <LabelBox label="Explanation" value={selectedItem?.explanation_ja} />
//         </div>


//         <div className="text-center mt-6 text-[#000000] text-xl md:text-2xl">
//           www.osakamasjid.org
//         </div>
//       </div>

//       {/* Social icons bottom */}
//       <div className="py-4 flex justify-end items-center">
//         <SocialShare />
//       </div>
//     </div>
//   )
// }
