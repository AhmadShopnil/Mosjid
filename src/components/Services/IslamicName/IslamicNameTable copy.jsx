// import React from 'react'
// import IslamicNameTableRow from './IslamicNameTableRow'

// const islamicNames = [
//   {
//     sl: 1,
//     arabic: "محمد",
//     japanese: "ムハンマド",
//     english: "Muhammad",
//     meaning: "The praised one"
//   },
//   {
//     sl: 2,
//     arabic: "أحمد",
//     japanese: "アフマド",
//     english: "Ahmad",
//     meaning: "Most commendable"
//   },
//   {
//     sl: 3,
//     arabic: "علي",
//     japanese: "アリ",
//     english: "Ali",
//     meaning: "High, exalted"
//   },
//   {
//     sl: 4,
//     arabic: "عبدالله",
//     japanese: "アブドゥッラー",
//     english: "Abdullah",
//     meaning: "Servant of Allah"
//   },
//   {
//     sl: 5,
//     arabic: "يوسف",
//     japanese: "ユースフ",
//     english: "Yusuf",
//     meaning: "Allah increases"
//   }
// ]

// export default function IslamicNameTable() {
//   return (
//     <div>
//       <div className="overflow-hidden rounded-[20px] border-b border-gray-200">
//         <table className="w-full text-sm hidden sm:table">
//           <thead>
//             <tr className="bg-[#52B920] text-white text-bold text-lg">
//               <th className="p-3 text-center ">
//                 SL No.
//               </th>
//                 <th className="p-3 text-center">Arabic Name</th>
//               <th className="p-3 text-center">Japanese</th>
//               <th className="p-3 text-center">
//                 <span className="text-[#C9E9BA]">English</span>
//               </th>
//               <th className="p-3 text-center">
//                 <span className="text-[#C9E9BA]">Meaning</span>
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {islamicNames.map((name, index) => (
//               <IslamicNameTableRow
//                 key={index}
//                 prayer={name}
//               />
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }
