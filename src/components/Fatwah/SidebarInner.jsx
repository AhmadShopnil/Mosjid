// import Link from "next/link";

// export default function SidebarInner({ items }) {
//   return (
//     <aside className="bg-white border rounded-lg p-4 shadow-sm">
//       <h2 className="text-green-700 font-semibold text-lg mb-2">Category / カテゴリ</h2>
//       <ul className="space-y-2">
//         {items.map((item, i) => (
//           <li key={i}>
//             <details className="border rounded">
//               <summary className="cursor-pointer px-3 py-2 font-medium bg-green-50 hover:bg-green-100">
//                 {item.title}
//               </summary>
//               <ul className="ml-4 mt-1 space-y-1">
//                 {item.submenu.map((sub, j) => (
//                   <li key={j}>
//                     <Link
//                       href={sub.link}
//                       className="block text-sm px-3 py-1 hover:text-green-700"
//                     >
//                       {sub.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </details>
//           </li>
//         ))}
//       </ul>

//       <div className="mt-6">
//         <button className="w-full bg-green-600 text-white rounded-md py-2 text-sm hover:bg-green-700">
//           Ask a Question / 質問する
//         </button>
//       </div>
//       <div className="mt-3">
//         <button className="w-full border border-green-600 text-green-700 rounded-md py-2 text-sm hover:bg-green-100">
//           Submit Your Request / リクエストを送信
//         </button>
//       </div>
//     </aside>
//   );
// }
