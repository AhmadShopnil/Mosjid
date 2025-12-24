"use client"

import { useState } from "react"
import { Search, ChevronDown, MoreVertical, X } from "lucide-react"
import Image from "next/image"
import CustomSelectRounded from "@/components/UI/CustomSelectRounded"
import CustomSelectDictionary from "../UI/CustomSelectDictionary"
import { useFatwaFilters } from "@/context/FatwaFilterContext"


const languageRegex = {
  English: /^[A-Za-z\s]*$/,
  Japanese: /^[\u3040-\u30FF\u4E00-\u9FFF\s]*$/,
  Arabic: /^[\u0600-\u06FF\s]*$/,
};






export default function DictionarySearchSection({ data_for_filter }) {
  const [warning, setWarning] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [searchTerm, setSearchTerm] = useState("")
  //   const [selectedBook, setSelectedBook] = useState("Book")
  //   const [selectedChapter, setSelectedChapter] = useState("Chapter")
  //   const [selectedSection, setSelectedSection] = useState("Section")


  const [searchText, setSearchText] = useState()
  const {
    selectedMajhabs,
    setSelectedMajhabs,

    selectedBooks,
    setSelectedBooks,

    selectedChapter,
    setSelectedChapter,

    selectedSection,
    setSelectedSection,

    selectedSearchTerm,
    setSelectedSearchTerm,
  } = useFatwaFilters();




  const { books, chapter, section } = data_for_filter;


  // const languages = [
  //   {
  //     title: "English",
  //     icon: "/images/others/English.png",

  //   },
  //   {
  //     title: "Japanese",
  //     icon: "/images/others/Japan.png"
  //   },
  //   {
  //     title: "Arabic",
  //     icon: "/images/others/Arabic.png"
  //   },
  // ]

  const languages = [
    { title: "English", icon: "/images/others/eng.svg", code: "en" },
    { title: "Japanese", icon: "/images/others/jp.svg", code: "ja" },
    { title: "Arabic", icon: "/images/others/ar.svg", code: "ar" },
  ];




  return (
    <div
      id="dictionary"
      className="  ">
      <div className="bg-white rounded-[20px] gradient-border
      px-4 py-16  sm:p-10 relative shadow-md">





        {/* Language selection */}
        <div className="flex gap-2 mb-6">
          {languages?.map((language) => (
            <button
              key={language?.title}
              onClick={() => setSelectedLanguage(language?.title)}
              className={`px-4 flex  gap-1 py-2 rounded-full text-base font-bold  transition-colors ${selectedLanguage === language?.title ? "bg-[#00401A] text-white" :
                "bg-white text-[#00401A] hover:bg-gray-300 border border-[#00401a51]"
                }`}
            >

              <div className="hidden sm:flex my-auto">
                <Image
                  src={language?.icon}
                  alt='a1'
                  width={20}
                  height={10}
                />
              </div>
              <div className=" my-auto text-xs  sm:text-base">
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
              value={selectedSearchTerm}
              onChange={(e) => {
                const value = e.target.value;
                const allowed = languageRegex[selectedLanguage];

                if (allowed?.test(value)) {
                  setSelectedSearchTerm(value);
                  setWarning("");
                } else {
                  setWarning(`Your selected language is ${selectedLanguage} only ${selectedLanguage} characters are allowed`);
                  setTimeout(() => setWarning(""), 3500);
                }
              }}
              className="flex-1 bg-transparent text-white text-sm placeholder-[#B0C4B8] px-4 py-2 outline-none"
            />

            {warning && (
              <p className="text-[#F7BA2A] text-sm mt-1 mr-10">{warning}</p>
            )}



            {/* Clear button */}
            {searchTerm && (
              <button
                type="button"
                aria-label="clear"
                onClick={() => setSearchTerm("")} className="text-teal-200 hover:text-white p-1 mr-2">
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Language indicator and more options */}
            <div className="flex items-center gap-2 mr-2">
              <span className="text-[#B0C4B8] text-sm">{selectedLanguage}</span>
              <button

                type="button"
                aria-label="options"
                className="text-teal-200 hover:text-white">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>


          </div>
          <div className="my-auto w-[100%] sm:w-[5%]">
            {/* Search button */}
            <button
              type="button"
              aria-label="search"
              className="hidden sm:flex bg-[#00401A] cursor-pointer rounded-full p-4 transition-colors">
              <Search className="w-5 h-5 text-[#F7BA2A]" />
            </button>
            <button
              type="button"
              aria-label="find"
              className="sm:hidden flex gap-2 bg-[#00401A] w-full cursor-pointer
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
          <div className=" flex-1 min-w-[150px]">

            <CustomSelectDictionary

              lvl="Books"
              parrent_lvl={"Books"}
              selectedParrent={"Books"}
              options={books?.data}
              selected={selectedBooks}
              setSelected={setSelectedBooks}
            />


          </div>

          {/* Chapter dropdown */}

          <div className=" flex-1 min-w-[150px]">

            <CustomSelectDictionary
              lvl="Chapter"
              parrent_lvl={"Books"}
              selectedParrent={selectedBooks}
              options={selectedBooks?.chapters}
              selected={selectedChapter}
              setSelected={setSelectedChapter}
            />


          </div>


          {/* Section dropdown */}
          <div className=" flex-1 min-w-[150px]">

            <CustomSelectDictionary
              options={selectedChapter?.sections}
              lvl="Sections"
              parrent_lvl={"Chapters"}
              selectedParrent={selectedChapter}
              selected={selectedSection}
              setSelected={setSelectedSection}
            />


          </div>
        </div>


      </div>
    </div>
  )
}
