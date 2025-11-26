// "use client"

// import { useState } from "react"
// import { Search, ChevronDown, MoreVertical, X } from "lucide-react"
// import Image from "next/image"
// import CustomSelectRounded from "@/components/UI/CustomSelectRounded"


// const languageRegex = {
//   English: /^[A-Za-z\s]*$/,
//   Japanese: /^[\u3040-\u30FF\u4E00-\u9FFF\s]*$/,
//   Arabic: /^[\u0600-\u06FF\s]*$/,
// };






// export default function DictionarySection() {
//   const [warning, setWarning] = useState("");

//   const [selectedLanguage, setSelectedLanguage] = useState("English")
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedBook, setSelectedBook] = useState("Book")
//   const [selectedChapter, setSelectedChapter] = useState("Chapter")
//   const [selectedSection, setSelectedSection] = useState("Section")

//   const languages = [
//     {
//       title: "English",
//       icon: "/images/others/English.png",

//     },
//     {
//       title: "Japanese",
//       icon: "/images/others/Japan.png"
//     },
//     {
//       title: "Arabic",
//       icon: "/images/others/Arabic.png"
//     },
//   ]




//   const books = ["Book", "Quran", "Hadith", "Tafsir"]
//   const chapters = ["Chapter", "Al-Fatiha", "Al-Baqarah", "Al-Imran"]
//   const sections = ["Section", "Verse 1-10", "Verse 11-20", "Verse 21-30"]

//   return (
//     <div
//       id="dictionary"
//       className="max-w-7xl mx-auto px-4 pt-12  ">
//       <div className="bg-white rounded-[20px] gradient-border
//       px-4 py-16  sm:p-14 relative">

//         <div className="absolute top-[1px] right-[0px]">
//           <Image
//             src="/images/dictionary/topImage.png"
//             alt="Decorative floral pattern"
//             width={60}
//             height={60}
//             className="opacity-80"
//           />
//         </div>

//         {/* heading */}
//         <div className='flex justify-between mb-2  items-center'>

//           <div className="flex justify-between  gap-2 gradient-border_b mb-4 sm:mb-0 pb-3  ">

//             <Image
//               src="/images/dictionary/icon2.png"
//               alt="Book Icon"
//               width={60}
//               height={50}
//               className=""
//             />




//             <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]">
//               <p> Dictionary </p>
//               <p>辞書</p>

//             </div>
//           </div>


//           {/* arabic text */}
//           <div>
//             <Image
//               src="/images/directory/a1.png"
//               alt='a1'
//               width={500}
//               height={70}
//               className="hidden sm:flex"
//             />
//             <Image
//               src="/images/directory/a1.png"
//               alt='a1'
//               width={200}
//               height={40}
//               className="flex sm:hidden"
//             />
//           </div>
//         </div>

//         {/* Language selection */}
//         <div className="flex gap-2 my-6">
//           {languages.map((language) => (
//             <button
//               key={language?.title}
//               onClick={() => setSelectedLanguage(language?.title)}
//               className={`px-4 flex gap-1 py-2 rounded-full text-base font-bold  transition-colors ${selectedLanguage === language?.title ? "bg-[#00401A] text-white" :
//                 "bg-white text-[#00401A] hover:bg-gray-300 border border-[#00401a51]"
//                 }`}
//             >

//               <div className=" my-auto">
//                 <Image
//                   src={language?.icon}
//                   alt='a1'
//                   width={20}
//                   height={10}
//                 />
//               </div>
//               <div className=" my-auto">
//                 {language?.title}
//               </div>
//             </button>
//           ))}
//         </div>

//         {/* Search bar */}
//         <div className="relative mb-6 flex flex-col sm:flex-row  gap-3">
//           <div className="bg-[#00401A] rounded-full p-1 flex  items-center w-[100%] sm:w-[95%]">
//             <input
//               type="text"
//               placeholder="Search Word..."
//               value={searchTerm}
//               onChange={(e) => {
//                 const value = e.target.value;
//                 const allowed = languageRegex[selectedLanguage];

//                 if (allowed.test(value)) {
//                   setSearchTerm(value);
//                   setWarning("");
//                 } else {
//                   setWarning(`Only ${selectedLanguage} characters are allowed`);
//                   setTimeout(() => setWarning(""), 3500);
//                 }
//               }}
//               className="flex-1 bg-transparent text-white text-sm placeholder-[#B0C4B8] px-4 py-2 outline-none"
//             />

//             {warning && (
//               <p className="text-[#F7BA2A] text-sm mt-1 mr-10">{warning}</p>
//             )}



//             {/* Clear button */}
//             {searchTerm && (
//               <button onClick={() => setSearchTerm("")} className="text-teal-200 hover:text-white p-1 mr-2">
//                 <X className="w-4 h-4" />
//               </button>
//             )}

//             {/* Language indicator and more options */}
//             <div className="flex items-center gap-2 mr-2">
//               <span className="text-[#B0C4B8] text-sm">{selectedLanguage}</span>
//               <button className="text-teal-200 hover:text-white">
//                 <MoreVertical className="w-4 h-4" />
//               </button>
//             </div>


//           </div>
//           <div className="my-auto w-[100%] sm:w-[5%]">
//             {/* Search button */}
//             <button className="hidden sm:flex bg-[#00401A] cursor-pointer rounded-full p-4 transition-colors">
//               <Search className="w-5 h-5 text-[#F7BA2A]" />
//             </button>
//             <button className="sm:hidden flex gap-2 bg-[#00401A] w-full cursor-pointer
//              rounded-xl p-3 items-center justify-center font-bold transition-colors">
//               {/* <Search className="w-5 h-5 text-[#F7BA2A]" />  */}
//               <span className="text-white text-sm">
//                 Search
//               </span>
//             </button>
//           </div>
//         </div>

//         {/* drop down selection */}
//         <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full xs:w-[50%]">
//           {/* Book dropdown */}
//           <div className=" flex-1 min-w-[150px]">

//             <CustomSelectRounded lvl="Books" options={[
//               { labelEn: "Books", labelJp: "マドラサ" },
//               { labelEn: "Quran", labelJp: "モスク" },
//               { labelEn: "Hadith", labelJp: "墓地" },
//               { labelEn: "Converted Muslim", labelJp: "改宗したイスラム教徒" },
//             ]} />


//           </div>

//           {/* Chapter dropdown */}

//           <div className=" flex-1 min-w-[150px]">

//             <CustomSelectRounded lvl="Chapter" options={[
//               { labelEn: "Al-Fatiha", labelJp: "マドラサ" },
//               { labelEn: "Al-Baqarah", labelJp: "モスク" },
//               { labelEn: "Al-Imran", labelJp: "墓地" },
//               { labelEn: "Converted Muslim", labelJp: "改宗したイスラム教徒" },
//             ]} />


//           </div>


//           {/* Section dropdown */}
//           <div className=" flex-1 min-w-[150px]">

//             <CustomSelectRounded options={[
//               { labelEn: "Verse 1-10", labelJp: "マドラサ" },
//               { labelEn: "Verse 11-20", labelJp: "モスク" },
//               { labelEn: "Cemetery", labelJp: "墓地" },
//               { labelEn: "Converted Muslim", labelJp: "改宗したイスラム教徒" },
//             ]} lvl="Sections" />


//           </div>
//         </div>


//       </div>
//     </div>
//   )
// }
