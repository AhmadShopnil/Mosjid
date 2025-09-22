"use client"

import { useState } from "react"
import { Search, ChevronDown, MoreVertical, X } from "lucide-react"
import Image from "next/image"

export default function DictionarySection() {
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBook, setSelectedBook] = useState("Book")
  const [selectedChapter, setSelectedChapter] = useState("Chapter")
  const [selectedSection, setSelectedSection] = useState("Section")

  const languages = [
    {
    title:"English",
    icon:"/images/others/English.png"
  },
    {
    title:"Japanese",
    icon:"/images/others/Japan.png"
  },
    {
    title:"Arabic",
    icon:"/images/others/Arabic.png"
  },
   ]
  const books = ["Book", "Quran", "Hadith", "Tafsir"]
  const chapters = ["Chapter", "Al-Fatiha", "Al-Baqarah", "Al-Imran"]
  const sections = ["Section", "Verse 1-10", "Verse 11-20", "Verse 21-30"]

  return (
 <div className="max-w-6xl mx-auto px-4 pt-12  ">
     <div className="bg-white rounded-[20px] gradient-border
      px-4 py-16  sm:p-14 relative">
      {/* Decorative floral pattern */}
      <div className="absolute top-0 right-0">
        <Image
          src="/images/dictionary/topImage.png"
          alt="Decorative floral pattern"
          width={60}
          height={60}
          className="opacity-80"
        />
      </div>

           {/* heading */}
             <div className='flex justify-between mb-2  items-center'>
                 <div className='flex gap-1 sm:gap-2 items-center   gradient-border_b w-[60%] pb-2  '>
                     <Image
                     src="/images/dictionary/icon.png"
                     alt='a1'
                     width={40}
                     height={40}
                     />
                     <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]'>
                         Dictionary
                     </h3>
                 </div>
                 {/* arabic text */}
                 <div>
               <Image
               src="/images/directory/a1.png"
               alt='a1'
               width={300}
               height={60}
               className="hidden sm:flex"
               />
                  <Image
               src="/images/directory/a1.png"
               alt='a1'
               width={200}
               height={40}
               className="flex sm:hidden"
               />
                 </div>
             </div>

      {/* Language selection */}
      <div className="flex gap-2 my-6">
        {languages.map((language) => (
          <button
            key={language?.title}
            onClick={() => setSelectedLanguage(language?.title)}
            className={`px-4 flex gap-1 py-2 rounded-full text-base font-bold  transition-colors ${
              selectedLanguage === language?.title ? "bg-[#00401A] text-white" :
               "bg-white text-[#00401A] hover:bg-gray-300 border border-[#00401a51]"
            }`}
          >
           
         <div className=" my-auto">
              <Image
               src={language?.icon}
                alt='a1'
                width={20}
                height={10}
                     />
        </div>
          <div className=" my-auto">
              {language?.title}
          </div>
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div className="relative mb-6 flex flex-col sm:flex-row  gap-3">
        <div className="bg-[#00401A] rounded-full p-1 flex  items-center w-[100%] sm:w-[95%]">
          <input
            type="text"
            placeholder="Search Word..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-white text-sm placeholder-[#B0C4B8] px-4 py-2 outline-none"
          />

          {/* Clear button */}
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} className="text-teal-200 hover:text-white p-1 mr-2">
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Language indicator and more options */}
          <div className="flex items-center gap-2 mr-2">
            <span className="text-[#B0C4B8] text-sm">{selectedLanguage}</span>
            <button className="text-teal-200 hover:text-white">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

        
        </div>
         <div className="my-auto w-[100%] sm:w-[5%]">
            {/* Search button */}
          <button className="hidden sm:flex bg-[#00401A] cursor-pointer rounded-full p-4 transition-colors">
            <Search className="w-5 h-5 text-[#F7BA2A]" />
          </button>
            <button className="sm:hidden flex gap-2 bg-[#00401A] w-full cursor-pointer
             rounded-xl p-3 items-center justify-center font-bold transition-colors">
            {/* <Search className="w-5 h-5 text-[#F7BA2A]" />  */}
            <span className="text-white text-sm">
              Search
            </span>
          </button>
         </div>
      </div>
 {/* drop down selection */}
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full xs:w-[50%]">
      {/* Book dropdown */}
      <div className="relative flex-1 min-w-[150px]">
        <select
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
          className="w-full appearance-none bg-gray-100 border border-gray-300 rounded-3xl
                    px-4 py-3 lg:py-1.5 lg:text-sm 
                    pr-10 text-gray-700 focus:outline-none focus:ring-2 
                    focus:ring-teal-500 focus:border-transparent cursor-pointer transition-all duration-200"
        >
          {books.map((book) => (
            <option key={book} value={book}>
              {book}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      </div>

      {/* Chapter dropdown */}
      <div className="relative flex-1 min-w-[150px]">
        <select
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(e.target.value)}
          className="w-full appearance-none bg-gray-100 border border-gray-300 rounded-3xl
                    px-4 py-3 lg:py-1.5 lg:text-sm 
                    pr-10 text-gray-700 focus:outline-none focus:ring-2 
                    focus:ring-teal-500 focus:border-transparent cursor-pointer transition-all duration-200"
        >
          {chapters.map((chapter) => (
            <option key={chapter} value={chapter}>
              {chapter}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      </div>

      {/* Section dropdown */}
      <div className="relative flex-1 min-w-[150px]">
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="w-full appearance-none bg-gray-100 border border-gray-300 rounded-3xl
                    px-4 py-3 lg:py-1.5 lg:text-sm 
                    pr-10 text-gray-700 focus:outline-none focus:ring-2 
                    focus:ring-teal-500 focus:border-transparent cursor-pointer transition-all duration-200"
        >
          {sections.map((section) => (
            <option key={section} value={section}>
              {section}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      </div>
    </div>


    </div>
 </div>
  )
}
