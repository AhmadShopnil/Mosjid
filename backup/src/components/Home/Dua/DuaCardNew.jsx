// "use client";
// import { getMetaValueFromExtraFields } from "@/helper/metaHelpers";
// import Image from "next/image";
// import React from "react";

// const DuaCardNew = ({ dua }) => {

//   const header_left = getMetaValueFromExtraFields(dua, "header_left")
//   const header_right = getMetaValueFromExtraFields(dua, "header_right")
//   const dua_no = getMetaValueFromExtraFields(dua, "dua_no")
//   const dua_main = getMetaValueFromExtraFields(dua, "info_1")
//   const pronunciation = getMetaValueFromExtraFields(dua, "info_2")
//   const meaning = getMetaValueFromExtraFields(dua, "info_3")
//  const pronunciation_title = getMetaValueFromExtraFields(dua, "info_4")
//    const meaning_title = getMetaValueFromExtraFields(dua, "info_5")
//   const note = getMetaValueFromExtraFields(dua, "note")
//   const footer_info = getMetaValueFromExtraFields(dua, "footer_info")


//   return (
//     <div className="max-w-[520px] mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 relative">


//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//         <Image
//           src="/images/directory/bg2.png"
//           alt="img"
//           width={440}
//           height={525}
//           className="object-contain transition-all duration-300"
//         />
//       </div>

//       {/* Header */}
//       <div className="flex justify-between items-center bg-gradient-to-b from-[#EEF8E9] to-[#BAFF98] px-4 py-4 gradient-border-bottom">
//         <span className="text-[#00401A] font-bold text-xl sm:text-2xl">
//           {header_left}
//         </span>

//         <span className="bg-[#00401A] text-white text-sm sm:text-lg font-bold px-4 py-1 rounded-full">
//           Dua No: {dua_no}
//         </span>

//         <span className="text-[#00401A] font-bold text-xl sm:text-2xl">
//           {header_right}
//         </span>
//       </div>

//       {/* Inner Section */}
//       <div className="px-4 py-6 space-y-5 text-center">
//         {/* Dua Title */}
//         <div className="space-y-2">
//           <p className="text-[#333333] font-semibold text-2xl mb-4">
//             {dua?.name}  </p>
//           <p className="text-[#333333] font-semibold text-2xl border-t-1  border-[#F6C249] pt-5">
//             {dua?.sub_title}
//           </p>
//         </div>

      
//         <p className="text-[#333333] leading-8 text-base ">
//           {dua_main?.slice(0, 580)}
//         </p>
//         {/* <div
//           className="text-[#333333]  text-base sm:text-base"
//           dangerouslySetInnerHTML={{ __html: dua?.description }}
//         /> */}

//         {/* Japanese Pronunciation Section */}
//         <div className="space-y-10">
//           <div className="flex ">
//             <span className="w-30 text-[#333333] text-base">{pronunciation_title} ：</span>
//             <p className="text-[#333333] text-left">
//               {pronunciation?.slice(0, 50)}
//               {/* {pronunciation?.slice(0, 50)} */}
//             </p>
//           </div>

//           <div className="flex  ">
//             <span className="w-30 text-[#333333] text-base">{meaning_title} ：</span>
//             <p className="text-[#333333] text-left">
//               {meaning?.slice(0, 50)}
//             </p>
//           </div>
//         </div>

//         {/* Note */}
//         <div className=" border-gray-300 pt-3 text-base text-[#828282] ">
//           <span className="font-semibold text-[#00401A]">Note: </span >
//           <span>{note}</span>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="text-center bg-gradient-to-b from-[#EEF8E9] to-[#BAFF98] px-4 py-4">
//         <a
//           href="https://www.osakamasjid.com"
//           className="text-[#000000] text-xl sm:text-2xl font-medium hover:underline"
//         >
//           {footer_info}
//         </a>
//       </div>
//     </div>
//   );
// };

// export default DuaCardNew;
