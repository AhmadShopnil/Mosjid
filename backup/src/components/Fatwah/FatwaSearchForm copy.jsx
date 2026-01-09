// "use client";

// import React, { useState } from "react";
// import { Search } from "lucide-react";
// import CustomSelect from "../UI/CustomSelect";
// import Link from "next/link";
// import CustomSelectForFatwaFinder from "../UI/CustomSelectForFatwaFinder";



// export default function FatwaSearchForm({ data_for_filter }) {
//   const [selectedMajhabs, setSelectedMajabs] = useState("Hanafi");
//   const [selectedBooks, setSelectedBooks] = useState(null);
//   const [selectedChapter, setSelectedChapter] = useState(null);
//   const [selectedSection, setSelectedSection] = useState(null);
//   const [selectedSearchTerm, setSelectedSearchTerm] = useState(null);

//   const { majhabs, books, chapter, section } = data_for_filter

//   // console.log({selectedMajhabs,selectedBooks,selectedChapter,selectedSection})

//   return (
//     <div className="w-full bg-[#F6FFF8] rounded-md p-4 md:p-6">
//       <div className=" flex flex-col md:flex-row gap-4">
//         {/* Left Section */}
//         <div className="w-full md:w-[50%] flex flex-col gap-3">
//           {majhabs.map((m) => (
//             <button
//               key={m?.name}
//               onClick={() => setSelectedMajabs(m?.name)}

//               className={`flex flex-col justify-center h-[56px] items-center py-3 rounded-md text-sm font-semibold transition-all duration-300
//               ${selectedMajhabs === m.name
//                   ? "gradient-bg-fatwah-finder text-white shadow"
//                   : "bg-[#D7EFD8] hover:bg-[#C9E8CA]"
//                 }`}

//             >
//               <span className="text-sm font-bold">{m?.name}</span>
//               <span className="text-sm font-bold">{m?.jp}</span>
//             </button>
//           ))}
//         </div>

//         {/* Right Section */}
//         <div className="md:w-[50%] flex flex-col gap-3  w-full">
//           {/* Books */}
//           <div className="flex gap-2 h-[56px]">
//             <div className="w-full">
//               <CustomSelectForFatwaFinder
//                 selected={selectedBooks}
//                 setSelected={setSelectedBooks}
//                 options={books}
//               />
//             </div>

//           </div>


//           {/* Chapter */}
//           <div className="flex gap-2 h-[56px]">
//             <div className="w-full">
//               <CustomSelectForFatwaFinder
//                 selected={selectedChapter}
//                 setSelected={setSelectedChapter}
//                 options={chapter} />
//             </div>

//           </div>

//           {/* Section*/}
//           <div className="flex gap-2 h-[56px]">
//             <div className="w-full">
//               <CustomSelectForFatwaFinder
//                 selected={selectedSection}
//                 setSelected={setSelectedSection}
//                 options={section} />
//             </div>

//           </div>
//           {/* search term */}
//           <input
//             type="text"
//             placeholder="Search By Word Or Fatah No..."
//             className="w-full h-[56px]  border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />

//         </div>


//       </div>
//       {/* Search Button */}
//       <div className="sm:col-span-2 lg:col-span-3 flex justify-center  h-[56px] full mt-4">
//         <Link
//           href="fatwah/fatwah-filtered"
//           type="submit"
//           className="w-full text-lg  flex items-center justify-center gap-2 bg-[#F7BA2A] hover:bg-[#f0aa00] text-[#00401A]  py-2 rounded-md transition"
//         >
//           <Search size={18} />
//           Search
//         </Link>
//       </div>
//     </div>
//   );
// }
