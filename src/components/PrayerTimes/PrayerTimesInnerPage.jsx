"use client"


import React, { useEffect, useState } from "react";
import Image from "next/image";
import { splitBySlash } from "@/helper/splitBySpace";
import { getImageUrl } from "@/helper/getImageUrl";
import PrayerTimeTableRow from "../Home/PrayerTimesAndNotices/PrayerTimeTableRow";
import PrayerTimesMobile from "../Home/PrayerTimesAndNotices/PrayerTimesMobile";
import ProhibitedTimeTableRow from "../Home/PrayerTimesAndNotices/ProhibitedTimeTableRow";
import ProhibitedTimeMobile from "../Home/PrayerTimesAndNotices/ProhibitedTimeMobile";
import { formatPrayerData, mergePrayerTimes } from "@/helper/formatPrayerData";
import axios from "axios";
import { extractTimeUpdatedAt, getMostRecentTime } from "@/helper/extractTimeUpdatedAt";
import { getMetaValueByMetaName } from "@/helper/metaHelpers";
import { getProhibitedTimes } from "@/helper/CalculateProhebitedTime";



export default function PrayerTimesInnerPage({ settings, homePage, prayerTimes, ProhibitedTime }) {
  const [loading, setLoading] = useState();


  let isProhabitedActive = "";
  if (settings) {
    isProhabitedActive =
      getMetaValueByMetaName(settings, "prohibited_time_active") || "";
  }

  const isDisabled = isProhabitedActive?.toLowerCase?.().trim() === "no";


  const [prayerTimesFromOutsideApi_Shafi, setPrayerTimesFromOusideApi_Shafi] = useState({});
  const [prayerTimesFromOutsideApi_Hanafi, setPrayerTimesFromOusideApi_Shafi_Hanafi] = useState([]);



  const sections = homePage?.sections_on_api;
  const prayer_time = sections.find((s) => s.title_slug === "prayer_time");
  const heading_part_1 = splitBySlash(prayer_time?.title)[0]
  const heading_part_2 = splitBySlash(prayer_time?.title)[1]

  const arabic = getImageUrl(prayer_time?.image_media)
  const icon = getImageUrl(prayer_time?.background_media)




  const name_of_salat = prayer_time?.custom_information.find((item) => item.label === "name_of_salat")
  const jamat_start = prayer_time?.custom_information.find((item) => item.label === "jamat_start")
  const wakt_start = prayer_time?.custom_information.find((item) => item.label === "wakt_start")
  const wakt_end = prayer_time?.custom_information.find((item) => item.label === "wakt_end")

  const name_of_salat_jp = prayer_time?.custom_information.find((item) => item.label === "name_of_salat_jp")
  const jamat_start_jp = prayer_time?.custom_information.find((item) => item.label === "jamat_start_jp")
  const wakt_start_jp = prayer_time?.custom_information.find((item) => item.label === "wakt_start_jp")
  const wakt_end_jp = prayer_time?.custom_information.find((item) => item.label === "wakt_end_jp")



  const prohibited_time_start = prayer_time?.custom_information.find((item) => item.label === "prohibited_time_start")
  const prohibited_time_end = prayer_time?.custom_information.find((item) => item.label === "prohibited_time_end")
  const prohibited_time_start_jp = prayer_time?.custom_information.find((item) => item.label === "prohibited_time_start_jp")
  const prohibited_time_end_jp = prayer_time?.custom_information.find((item) => item.label === "wakt_end_jp")


  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/prayer-times");
        const data = await res.json();

        if (data?.shafi?.data?.timings) {
          setPrayerTimesFromOusideApi_Shafi(data.shafi.data.timings);
        }

        if (data?.hanafi?.data?.timings) {
          setPrayerTimesFromOusideApi_Shafi_Hanafi(data.hanafi.data.timings);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching prayer times:", err);
        setError("Failed to load prayer times");
        setLoading(false);
      }
    }

    load();
  }, []);
  // useEffect(() => {
  //   const city = "Osaka";
  //   const country = "Japan";
  //   const method = 3;

  //   const fetchPrayerTimes = async (school) => {
  //     const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
  //       city
  //     )}&country=${encodeURIComponent(country)}&method=${method}&school=${school}`;

  //     try {
  //       const response = await axios.get(url);
  //       return response.data.data.timings;
  //     } catch (err) {
  //       console.error(`Error fetching ${school === 1 ? "Hanafi" : "Safi"} times:`, err);
  //       return null;
  //     }
  //   };

  //   const loadTimes = async () => {
  //     const safiTimes = await fetchPrayerTimes(0);   
  //     const hanafiTimes = await fetchPrayerTimes(1); 

  //     if (safiTimes) setPrayerTimesFromOusideApi_Shafi(safiTimes);
  //     if (hanafiTimes) setPrayerTimesFromOusideApi_Shafi_Hanafi(hanafiTimes);
  //   };

  //   loadTimes();
  // }, []);


  const prayerTimesDataFromOusideApi = [
    {
      prayer_name: "fajr",
      wakt_start_hanfi: prayerTimesFromOutsideApi_Hanafi.Fajr,
      wakt_end_hanfi: prayerTimesFromOutsideApi_Hanafi.Sunrise,
      wakt_start_safi: prayerTimesFromOutsideApi_Shafi.Fajr,
      wakt_end_safi: prayerTimesFromOutsideApi_Shafi.Sunrise,
    },
    {
      prayer_name: "dhuhr",
      wakt_start_hanfi: prayerTimesFromOutsideApi_Hanafi.Dhuhr,
      wakt_end_hanfi: prayerTimesFromOutsideApi_Hanafi.Asr,
      wakt_start_safi: prayerTimesFromOutsideApi_Shafi.Dhuhr,
      wakt_end_safi: prayerTimesFromOutsideApi_Shafi.Asr,
    },
    {
      prayer_name: "asr",
      wakt_start_hanfi: prayerTimesFromOutsideApi_Hanafi.Asr,
      wakt_end_hanfi: prayerTimesFromOutsideApi_Hanafi.Maghrib,
      wakt_start_safi: prayerTimesFromOutsideApi_Shafi.Asr,
      wakt_end_safi: prayerTimesFromOutsideApi_Shafi.Maghrib,
    },
    {
      prayer_name: "maghrib",
      wakt_start_hanfi: prayerTimesFromOutsideApi_Hanafi.Maghrib,
      wakt_end_hanfi: prayerTimesFromOutsideApi_Hanafi.Isha,
      wakt_start_safi: prayerTimesFromOutsideApi_Shafi.Maghrib,
      wakt_end_safi: prayerTimesFromOutsideApi_Shafi.Isha,
    },
    {
      prayer_name: "isha",
      wakt_start_hanfi: prayerTimesFromOutsideApi_Hanafi.Isha,
      wakt_end_hanfi: prayerTimesFromOutsideApi_Hanafi.Fajr,
      wakt_start_safi: prayerTimesFromOutsideApi_Shafi.Isha,
      wakt_end_safi: prayerTimesFromOutsideApi_Shafi.Fajr,
    },
  ];

  const formattedPrayerTimes = formatPrayerData(prayerTimes);
  const finalPrayerTimes = mergePrayerTimes(formattedPrayerTimes, prayerTimesDataFromOusideApi);


  const updatedAtArray = extractTimeUpdatedAt(prayerTimes);
  const updated_time = getMostRecentTime(updatedAtArray)

const calculatedProhibitedTimes = getProhibitedTimes(prayerTimesDataFromOusideApi);



  return (
    <div className="   px-5 sm:px-8 pt-5 sm:pt-8  pb-24  gradient-bordernew shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0">
        <Image
          src="/images/prayertimes/1.png"
          alt="Prayer times"
          width={65}
          height={65}
          className="opacity-80"
        />
      </div>
      <div className="absolute bottom-0.5 left-0.5 ">
        <Image
          src="/images/prayertimes/bottomImg.png"
          alt="Decorative floral pattern"
          width={400}
          height={80}
          className="opacity-80"
        />
      </div>
      {/* heading */}
      <p className="text-sm mb-2.5 text-center sm:text-start ml-1" suppressHydrationWarning>Last Update: {updated_time}</p>

      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">

        <div className="flex justify-between items-center gap-2 gradient-border_b mb-4 sm:mb-0 pb-3  ">
          <Image
            // src="/images/prayertimes/icon2.png"
            src={icon}
            alt="Icon"
            width={55}
            height={55}
            className=""
          />




          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]">
            <p><span className="text-[#F7BA2A]">{heading_part_1}</span> {heading_part_2} </p>
            <p>{prayer_time?.sub_title}</p>

          </div>
        </div>


        <div className="flex items-center gap-3 sm:gap-4">
          <Image
            src={arabic}
            alt="Arabic text"
            width={274}
            height={90}
            className="object-contain hidden sm:flex"
          />
          <Image
            src={arabic}
            alt="Arabic text"
            width={135}
            height={40}
            className="object-contain sm:hidden"
          />
        </div>


      </div>

      <div className=" overflow-hidden space-y-6">
        {/* table-1 */}

        <div className="overflow-hidden rounded-[20px] border-b border-gray-200 ">
          <table className="w-full text-sm hidden sm:table ">
            <thead>
              <tr className="bg-[#52B920] text-white  text-bold text-lg">
                <th className="p-3 text-left flex flex-col "><span>
                  {name_of_salat?.value}
                </span>
                  <span className="text-[#C9E9BA]"> {name_of_salat_jp?.value}</span>
                </th>
                <th className="p-3 text-left "><span>
                  {jamat_start?.value}</span> <br />
                  <span className=" text-[#C9E9BA]"> {jamat_start_jp?.value}</span>
                </th>
                <th className="p-3 text-left">{wakt_start?.value} <br /> <span className="text-[#C9E9BA]">{wakt_start_jp?.value} </span></th>
                <th className="p-3 text-left">{wakt_end?.value} <br />
                  <span className="text-[#C9E9BA]" >{wakt_end_jp?.value}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {finalPrayerTimes?.map((prayer, index) => (
                <PrayerTimeTableRow key={index} prayer={prayer} />
              ))}
            </tbody>
          </table>
        </div>


        {/* Table 2 */}
        <div
          className={`overflow-hidden rounded-[20px] border-b border-gray-200 
          ${isDisabled ? "opacity-40 pointer-events-none grayscale" : ""}`}
        >
          <table className="w-full text-sm hidden sm:table ">
            <thead>
              <tr className="bg-[#FED6D6] text-[#00401A] text-bold text-lg">
                <th className="p-3 text-left flex flex-col">
                  <span>{name_of_salat?.value}</span>
                  <span>{name_of_salat_jp?.value}</span>
                </th>

                <th className="p-3">
                  <span>{prohibited_time_start?.value}</span>
                  <br />
                  <span>{prohibited_time_start_jp?.value}</span>
                </th>

                <th className="p-3">
                  <span>{prohibited_time_end?.value}</span>
                  <br />
                  <span>{prohibited_time_end_jp?.value}</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {calculatedProhibitedTimes && ProhibitedTime.map((prayer, index) => (
                <ProhibitedTimeTableRow key={index} prayer={prayer} settings={settings} calculatedProhibitedTimes={calculatedProhibitedTimes} />
              ))}
            </tbody>
          </table>
        </div>


        {/* <div className="overflow-hidden rounded-[20px] border-b border-gray-200 ">
          <table className="w-full text-sm hidden sm:table ">
            <thead>
              <tr className="bg-[#FED6D6] text-[#00401A]  text-bold text-lg">
                <th className="p-3 text-left flex flex-col ">
                  <span>{name_of_salat?.value}</span>
                  <span>{name_of_salat_jp?.value}</span>
                </th>

                <th className="p-3">
                  <span> {prohibited_time_start?.value}</span>
                  <br />
                  <span>{prohibited_time_start_jp?.value}</span>
                </th>
                <th className="p-3">
                  <span> {prohibited_time_end?.value}</span>
                  <br />
                  <span>   {prohibited_time_end_jp?.value}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {ProhibitedTime.map((prayer, index) => (

                <ProhibitedTimeTableRow
                  key={index}
                  prayer={prayer} />

              ))}
            </tbody>
          </table>
        </div> */}


      </div>



      {/* Mobile Cards */}
      <PrayerTimesMobile prayerTimes={finalPrayerTimes} prayer_time={prayer_time} calculatedProhibitedTimes={calculatedProhibitedTimes}/>

      <h4 className=" block sm:hidden text-2xl text-center mt-5">
        <span className="text-[#F7BA2A]">Prohibited </span>
        Time Start
        <br />
        <span className=" ">禁止時間開始</span>
      </h4>

      { calculatedProhibitedTimes&&  <ProhibitedTimeMobile
       prayerTimes={ProhibitedTime.slice(0, 4)}
       prayer_time={prayer_time} 
       isDisabled={isDisabled} 
       calculatedProhibitedTimes={calculatedProhibitedTimes}
       />}
      {/* bottom note */}
      <p className="mt-4 text-sm  text-[#FF0000]">
        {prayer_time?.description}
      </p>
    </div>
  );
}
