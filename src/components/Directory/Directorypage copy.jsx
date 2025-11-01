// "use client"

// import Image from "next/image";
// import DirectoryRow from "./DirectoryRow";
// import { useState } from "react";
// import DirectoryDetailsSection from "./DirectoryDetailsSection";

// export default function DirectoryPage({directories}) {
// const [selectedDirectory,setSelectedDirectory]=useState(null)




//     return (
//         <div className="  space-y-4">
//             {/* First Section - Table */}
//             <div className="  gradient-border rounded-2xl p-8 bg-white">
//                 {/* Table Header */}
//                 <div className="bg-[#52B920] h-[50px] text-white  flex items-center justify-center rounded-t-[10px] ">
//                     <h2 className=" text-center text-xl font-bold">Table for selected category</h2>
//                 </div>

//                 <table className="w-full border-collapse table-fixed font-normal">
//                     <thead>
//                         <tr className="bg-[#D9E2DD] h-[28px] font-normal">
//                             <th className="border border-[#B0C4B8] py-1 text-base text-center text-[#000000] font-normal w-[14.28%]">SL.No</th>
//                             <th className="border border-[#B0C4B8] py-1 text-base text-center text-[#000000] font-normal w-[14.28%]">Name</th>
//                             <th className="border border-[#B0C4B8] py-1 text-base text-center text-[#000000] font-normal w-[14.28%]">Phone</th>
//                             <th className="border border-[#B0C4B8] py-1 text-base text-center text-[#000000] font-normal w-[14.28%]">Juma Time</th>
//                             <th className="border border-[#B0C4B8] py-1 text-base text-center text-[#000000] font-normal w-[14.28%]">Address</th>
//                             <th className="border border-[#B0C4B8] py-1 text-base text-center text-[#000000] font-normal w-[14.28%]">View in Detail</th>

//                         </tr>
//                     </thead>
//                     <tbody>
//                         {directories?.map((directory, i) => (
//                             <DirectoryRow key={i} directory={directory} i={i} setSelectedDirectory={setSelectedDirectory}/>
                       
//                         ))}
//                     </tbody>
//                 </table>



//                 {/* Website URL */}
//                 <div className="text-center mt-6 text-[#000000] text-2xl">www.osakamasjid.com</div>
//             </div>

//             {/* Social Icons */}
//             <div className="py-4 flex justify-end items-center">
//                 <div className="  flex items-center gap-4 text-[#D9E2DD]">
//                     <div className="border-r-2 border-gray-300 pr-3">
//                         <Image
//                             src="/images/notice/twiter.png"
//                             alt='a1'
//                             width={23}
//                             height={23}
//                         />
//                     </div>
//                     <div className="border-r-2 border-gray-300 pr-3">
//                         <Image
//                             src="/images/notice/fb.png"
//                             alt='a1'
//                             width={15}
//                             height={15}
//                         />
//                     </div>
//                     <div className="border-r-2 border-gray-300 pr-3">
//                         <Image
//                             src="/images/notice/whatsapp.png"
//                             alt='a1'
//                             width={20}
//                             height={20}
//                         />
//                     </div>
//                     <div className="border-r-2 border-gray-300 pr-3">
//                         <Image
//                             src="/images/notice/printer.png"
//                             alt='a1'
//                             width={22}
//                             height={22}
//                         />
//                     </div>
//                     <div>
//                         <Image
//                             src="/images/notice/download.png"
//                             alt='a1'
//                             width={22}
//                             height={22}
//                         />
//                     </div>


//                 </div>
//             </div>

//            {selectedDirectory && <DirectoryDetailsSection directory={selectedDirectory}/>}
//         </div>
//     )
// }
