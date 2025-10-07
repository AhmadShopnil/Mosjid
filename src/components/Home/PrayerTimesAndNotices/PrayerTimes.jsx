import React from "react";
import { PrayerTimesIcon } from "../../Icons/QuickLinks";
import { Sun, Moon, Star } from "lucide-react";
import Image from "next/image";
import { getPage, getPryerTime, getSettings } from "@/helper/actions";
import { getMetaValueByMetaName } from "@/helper/metaHelpers";
import { splitBySpace } from "@/helper/splitBySpace";
import { getImageUrl } from "@/helper/getImageUrl";
import PrayerTimeTableRow from "./PrayerTimeTableRow";
import PrayerTimesMobile from "./PrayerTimesMobile";



export default async function PrayerTimes() {
  const settings = await getSettings()
  const view_more = getMetaValueByMetaName(settings, "view_more") || "";
  const prayerTimes = await getPryerTime();

  // get notice extra data from home page section management
  const homePage = await getPage("home-sections-heading-management")
  const sections = homePage?.sections_on_api;
  const prayer_time = sections.find((s) => s.title_slug === "prayer_time");
  const heading_part_1 = splitBySpace(prayer_time?.sub_title)[0]
  const heading_part_2 = splitBySpace(prayer_time?.sub_title)[1]
  const image = getImageUrl(prayer_time?.image_media)




  const jamat_start = prayer_time?.custom_information.find((item) => item.label === "jamat_start")
  const name_of_salat = prayer_time?.custom_information.find((item) => item.label === "name_of_salat")
  const wakt_start = prayer_time?.custom_information.find((item) => item.label === "wakt_start")
  const wakt_end = prayer_time?.custom_information.find((item) => item.label === "wakt_end")
    const prayer_times_title_2 = prayer_time?.custom_information.find((item) => item.label === "prayer_times_title_2")


// console.log("prayer times",prayer_times_title_2)


  return (
    <div className="   px-5 sm:px-8 pt-5 sm:pt-8  pb-24 h-full gradient-bordernew relative overflow-hidden">
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
      <p className="text-sm mb-2.5 text-center sm:text-start ml-1">{prayer_time?.short_description}</p>

      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <div className="flex justify-between  gap-2 gradient-border_b mb-4 sm:mb-0 pb-3  ">
      
           <Image
            src="/images/prayertimes/icon.png"
            alt="Book Icon"
            width={62}
            height={70}
            className=""
          />
       
         
           {/* <div
            className=""
            dangerouslySetInnerHTML={{
              __html: prayer_time?.sub_title,
            }}
          /> */}
         
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]">
            <p><span className="text-[#F7BA2A]">{heading_part_1}</span> {heading_part_2} </p>
            <p>{prayer_times_title_2?.value}</p>
             
          </div>
        </div>


        <div className="flex items-center gap-3 sm:gap-4">
          <Image
            src={image}
            alt="Arabic text"
            width={160}
            height={50}
            className="object-contain hidden sm:flex"
          />
          <Image
            src={image}
            alt="Arabic text"
            width={135}
            height={40}
            className="object-contain sm:hidden"
          />
        </div>


      </div>

      <div className="bg-white rounded-xl overflow-hidden">
        <table className="w-full text-sm hidden sm:table">
          <thead>
            <tr className="bg-[#52B920] text-white text-left text-bold text-xl">
              <th className="p-3 rounded-tl-xl">{name_of_salat?.value} </th>
              <th className="p-3">{jamat_start?.value}</th>
              <th className="p-3">{wakt_start?.value}</th>
              <th className="p-3 rounded-tr-xl">{wakt_end?.value}</th>
            </tr>
          </thead>
          <tbody className="">
            {prayerTimes.map((prayer, index) => (

              <PrayerTimeTableRow
                key={index}
                prayer={prayer} />

            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm  text-[#FF0000]">
        {prayer_time?.description}
      </p>
  {/* Mobile Cards */}
  <PrayerTimesMobile prayerTimes={prayerTimes} prayer_time={prayer_time} />
    </div>
  );
}
