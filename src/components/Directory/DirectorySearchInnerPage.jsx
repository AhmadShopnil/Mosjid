"use client";

import { Search, MapPin } from "lucide-react";

import { convertDirectoryData } from "@/helper/convertDirectoryData";
import { useState } from "react";
import CustomSelectForDirectory from "../UI/CustomSelectRoundedWhite";

export default function DirectorySearchInnerPage({ filterData, setSelected, selected,getData }) {
  const [selectedPrefecture, setSelectedPrefecture] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

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
      <button
      onClick={getData}
        className="h-[56px] bg-[#F7BA2A] hover:bg-[#f8c645] text-[#00401A] font-semibold px-10 py-3 rounded-full 
      shadow-md transition text-lg w-full sm:w-auto cursor-pointer"
      >
        Find
      </button>
    </div>

  );
}
