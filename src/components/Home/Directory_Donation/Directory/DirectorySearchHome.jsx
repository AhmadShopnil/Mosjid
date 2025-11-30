"use client";

import { Search, MapPin } from "lucide-react";

import { convertDirectoryData } from "@/helper/convertDirectoryData";
import { useState } from "react";

import { transformNoticeCategories } from "@/helper/transformNoticeCategories";
import Link from "next/link";
import CustomSelectForDirectory from "@/components/UI/CustomSelectRoundedWhite";

export default function DirectorySearchHome({ filterData }) {
   const [selected, setSelected] = useState(null);
  const [selectedPrefecture, setSelectedPrefecture] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

    const formattedCategories = transformNoticeCategories(filterData?.cat);
  // console.log("selected", selected)


  const handlePrefectrue = (data) => {
    setSelectedPrefecture(data)
    setSelected(data)


    setSelectedCity(null)
    setSelectedDistrict(null)


  }
  const handleCity = (data) => {

    setSelectedCity(data)
    setSelected(data)



    setSelectedPrefecture(null)
    setSelectedDistrict(null)

  }
  const handleDistrict = (data) => {
    setSelectedDistrict(data)
    setSelected(data)

    setSelectedCity(null)
    setSelectedPrefecture(null)


  }



  return (
    <div className="w-full  flex flex-col md:flex-row items-center justify-center  lg:justify-start gap-4 flex-wrap">
      {/* Prefecture */}
      <div className="relative flex-1  w-full">
        <CustomSelectForDirectory
          lvl="Prefecture"

          options={convertDirectoryData(filterData?.prefecture)}
          selected={selectedPrefecture}
          setSelected={handlePrefectrue}
        />
      </div>

      {/* City */}
      <div className="relative flex-1  w-full">
        <CustomSelectForDirectory
          lvl="City"
          options={convertDirectoryData(filterData?.city)}
          selected={selectedCity}
          setSelected={handleCity}
        />
      </div>

      {/* District */}
      <div className="relative flex-1  w-full">
        <CustomSelectForDirectory
          lvl="District"
          options={convertDirectoryData(filterData?.district)}
          selected={selectedDistrict}
          setSelected={handleDistrict}
        />
      </div>


      {/* Find Button */}
      <Link
      href={`/directory/${selected?.id}`}
        className="h-[56px] py-3.5 bg-[#F7BA2A] hover:bg-[#f8c645] text-[#00401A] font-semibold px-10  rounded-full 
      shadow-md transition text-lg w-full sm:w-auto cursor-pointer"
      >
      Find
      </Link>
    </div>

  );
}
