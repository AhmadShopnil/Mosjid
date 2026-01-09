// import Image from 'next/image'
// import React from 'react'

// export default function DuaCard({ dua }) {
//   return (
//     <div
//       className="rounded-xl overflow-hidden shadow-md flex flex-col"
//     >
//       {/* Header */}
//       <div className="bg-[#52B920] text-white text-center text-base py-2 ">
//         {dua.title}
//       </div>

//       {/* Dua Card info */}
//       <div className="relative flex-1">
//         <Image
//           src="/images/others/dua.png"
//           alt="frame"
//           fill
//           className="object-fill"
//         />
//         <div className="relative z-10 p-16 text-center">
//           <Image
//             src="/images/others/Vector.png"
//             alt="mosque"
//             width={40}
//             height={40}
//             className="mx-auto mb-3"
//           />
//           {/* <p className="text-gray-700 text-sm mb-1 leading-5">{dua.title} :</p> */}
//           <p className="text-sm text-gray-600 mb-1 leading-5 ">
//             ドゥア名：ダミーテキストはここにあります...
//           </p>
//           <p className="text-green-800 font-semibold text-lg mb-2 leading-5">
//             {dua.arabic}
//           </p>
//           <p className="text-sm">
//             <span className="font-bold text-orange-500">発音:</span>{" "}
//             {dua.japanese}
//           </p>
//           <p className="text-sm">
//             <span className="font-bold text-orange-500">意味:</span>{" "}
//             {dua.meaning}
//           </p>
//           <div className=" mt-3 flex justify-center">
//             <button className=" flex gap-1.5 justify-center items-center  text-[#001609] font-sm font-semibold cursor-pointer">
//               Read More
//               <Image
//                 src="/images/others/arrowR.png"
//                 alt='a1'
//                 width={18}
//                 height={18}
//               />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="bg-[#52B920] text-white text-center py-2 font-semibold">
//         Footer Info
//       </div>
//     </div>
//   )
// }
