import React from "react";
import { PrayerTimesIcon } from "../../Icons/QuickLinks";
import { Sun, Moon, Star } from "lucide-react";
import Image from "next/image";
import { getPage, getProhibitedTime, getPryerTime, getSettings } from "@/helper/actions";
import { getMetaValueByMetaName } from "@/helper/metaHelpers";
import { splitBySpace } from "@/helper/splitBySpace";
import { getImageUrl } from "@/helper/getImageUrl";
import PrayerTimeTableRow from "./PrayerTimeTableRow";
import PrayerTimesMobile from "./PrayerTimesMobile";
import ProhibitedTimeTableRow from "./ProhibitedTimeTableRow";
import ProhibitedTimeMobile from "./ProhibitedTimeMobile";



export default async function PrayerTimes() {
  const settings = await getSettings()
  const view_more = getMetaValueByMetaName(settings, "view_more") || "";
  const prayerTimes = await getPryerTime();
  const ProhibitedTime = await getProhibitedTime();

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

  // console.log("prayer_times_title_2",prayer_time?.custom_information)
  // console.log("prayer times",prayer_times_title_2)


  return (
    <div className="px-3 sm:px-8 pt-5 sm:pt-8  pb-24 h-full gradient-bordernew relative overflow-hidden">
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

        <div className="flex justify-between items-center gap-2 gradient-border_b mb-4 sm:mb-0 pb-3  ">
          <Image
            src="/images/prayertimes/icon2.png"
            alt="Book Icon"
            width={55}
            height={55}
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

      <div className=" overflow-hidden space-y-6">
        {/* table-1 */}

        <div className="overflow-hidden rounded-[20px] border-b border-gray-200 ">
          <table className="w-full text-sm hidden sm:table ">
            <thead>
              <tr className="bg-[#52B920] text-white  text-bold text-lg">
                <th className="p-3 text-left flex flex-col "><span>
                  {name_of_salat?.value}
                </span>
                  <span className="text-[#C9E9BA]"> 名前</span>
                </th>
                <th className="p-3 "><span>
                  {jamat_start?.value}</span> <br />
                  <span className=" text-[#C9E9BA]">ジャマットスタート</span>
                </th>
                <th className="p-3">{wakt_start?.value} <br /> <span className="text-[#C9E9BA]">ワクトスタート </span></th>
                <th className="p-3">{wakt_end?.value} <br />
                  <span className="text-[#C9E9BA]" >ワクトエンド</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {prayerTimes.map((prayer, index) => (
                <PrayerTimeTableRow key={index} prayer={prayer} />
              ))}
            </tbody>
          </table>
        </div>


        {/* Table 2 */}

        <div className="overflow-hidden rounded-[20px] border-b border-gray-200 ">
          <table className="w-full text-sm hidden sm:table ">
            <thead>
              <tr className="bg-[#FED6D6] text-[#00401A]  text-bold text-lg">
                <th className="p-3 text-left flex flex-col "><span>
                  {name_of_salat?.value}
                </span>
                  <span className=""> 名前</span>
                </th>
                <th className="p-3">Prohibited Time Start
                  <br />
                  <span className=" ">禁止時間開始</span>
                </th>
                <th className="p-3">Prohibited Time End
                  <br />
                  <span className=" ">禁止時間終了</span>
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
        </div>




      </div>




      {/* Mobile Cards */}
      <PrayerTimesMobile prayerTimes={prayerTimes} prayer_time={prayer_time} />

      <h4 className="block sm:hidden text-2xl text-center mt-5">
        <span className="text-[#F7BA2A]">Prohibited </span>
        Time Start
        <br />
        <span className=" ">禁止時間開始</span>
      </h4>
      <ProhibitedTimeMobile prayerTimes={ProhibitedTime.slice(0, 4)} prayer_time={prayer_time} />
      {/* bottom note */}
      <p className="mt-4 text-sm  text-[#FF0000]">
        {prayer_time?.description}
      </p>
    </div>
  );
}
