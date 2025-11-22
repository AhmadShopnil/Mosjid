

import { Search } from "lucide-react"
import Image from "next/image"
import FatwaSearchForm from "./FatwaSearchForm"
import { getFatwahFiltersData } from "@/helper/actions"

export default async function FatwaFinder() {

const majhabs=await getFatwahFiltersData("majhabs")
const books=await getFatwahFiltersData("books")
const chapter=await getFatwahFiltersData("bookchapters")
const section=await getFatwahFiltersData("booksections")

const data_for_filter={majhabs,books,chapter,section}

// console.log({majhabs,books,chapter,section})


  return (
    <div className=" ">
      {/* Header */}
      <div className="bg-[#52B920] h-[85px] text-white px-6 py-4 rounded-lg mt-4 flex justify-between items-center shadow-md">
        <h1 className="text-4xl ">イスラム教のファトワ</h1>
          <Image
              src="/images/fatwah/fatwaharbic_white.png"
              alt="Logo"
              width={200}
              height={60}
              className='hidden sm:flex w-[223px] h-[60px]'
            />
      </div>

     

      {/* Main Content */}
      <div className="bg-white  mt-4 rounded-lg shadow-xl">
         {/* Title Section */}
      <div className="bg-[#E5F5DE] text-center py-4  ">
        <h2 className="text-3xl font-bold text-[#00401A]">Fatwa Finder</h2>
      </div>
        <div className="flex flex-col lg:flex-row gap-8 py-8">
          {/* Left Sidebar - Logo Section */}
          <div className="w-full lg:w-[30%] flex flex-col items-center justify-center">
            <Image
              src="/images/fatwah/fatwahHeader.png"
              alt="Logo"
              width={320}
              height={300}
              className=''
            />
          </div>

          {/* Right Section - Search Form */}
          <div className="w-full lg:w-[65%]">
            <div className="">
            <FatwaSearchForm data_for_filter={data_for_filter}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
