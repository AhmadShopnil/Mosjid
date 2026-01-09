"use client";

import { Search, MapPin } from "lucide-react";

import { convertDirectoryData } from "@/helper/convertDirectoryData";
import { useState } from "react";

import { transformNoticeCategories } from "@/helper/transformNoticeCategories";
import Link from "next/link";

import { useRegionFilters } from "@/context/RegionFilterContext ";
import CustomSelectForDirectory from "@/components/UI/CustomSelectRoundedWhite";

export default function DirectorySearchHome({ locations }) {


  const {
    selectedRegion,
    setSelectedRegion,

    selectedPrefecture,
    setSelectedPrefecture,

    selectedCity,
    setSelectedCity,

    selectedDistrict,
    setSelectedDistrict,
  } = useRegionFilters();


  const [regionList, setRegionList] = useState([])
  const [prefectureList, setPrefectureList] = useState([])
  const [cityList, setCityList] = useState([])
  const [districtList, setDistrictList] = useState([])

  // console.log("selectedRegion", selectedRegion)



  const handleRegion = (data) => {
    // console.log("test drectory", data)

    setSelectedRegion(data)


    setPrefectureList(data?.mainData?.child)
    setRegionList(data)
   

    setSelectedPrefecture(null)
    setSelectedCity(null)
    setSelectedDistrict(null)

  }


  const handlePrefectrue = (data) => {
    setSelectedPrefecture(data)

    setCityList(data?.mainData?.child)

    setSelectedCity(null)
    setSelectedDistrict(null)

  }
  const handleCity = (data) => {

    setDistrictList(data?.mainData?.child)
    setSelectedCity(data)
    setSelectedDistrict(null)

  }
  const handleDistrict = (data) => {
    setSelectedDistrict(data)

  }


  return (
    <div className="w-full  flex flex-col md:flex-row items-center justify-center  lg:justify-start gap-2 flex-wrap">

      {/* region */}
      <div className="relative flex-1  w-full">

        <CustomSelectForDirectory
          lvl="Region"
          parrent_lvl={""}
          selectedParrent={""}
          options={convertDirectoryData(locations)}
          selected={selectedRegion}
          setSelected={handleRegion}
        />

      </div>

      <div className="relative flex-1  w-full">

        <CustomSelectForDirectory
          lvl="Prefecture"
          parrent_lvl={"Region"}
          selectedParrent={selectedRegion}
          options={convertDirectoryData(prefectureList)}
          selected={selectedPrefecture}
          setSelected={handlePrefectrue}
        />

      </div>

      {/* City */}
      <div className="relative flex-1  w-full">
        <CustomSelectForDirectory
          lvl="City"
          parrent_lvl={"Prefecture"}
          selectedParrent={selectedPrefecture}
          options={convertDirectoryData(cityList)}
          selected={selectedCity}
          setSelected={handleCity}
        />
      </div>

      {/* District */}
      <div className="relative flex-1  w-full">
        <CustomSelectForDirectory
          lvl="District"
          parrent_lvl={"City"}
          selectedParrent={selectedCity}
          options={convertDirectoryData(districtList)}
          selected={selectedDistrict}
          setSelected={handleDistrict}
        />
      </div>


      {/* Find Button */}
      <Link
        href={`/directory`}
        className="h-[56px] py-3.5 bg-[#F7BA2A] hover:bg-[#f8c645] text-[#00401A] font-semibold px-6  rounded-full 
      shadow-md transition text-lg w-full sm:w-auto cursor-pointer"
      >
        Find
      </Link>
    </div>

  );
}
