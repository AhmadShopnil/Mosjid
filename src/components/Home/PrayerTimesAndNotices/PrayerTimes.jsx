import React from "react";
import { PrayerTimesIcon } from "../../Icons/QuickLinks";
import { Sun, Moon, Star } from "lucide-react";
import Image from "next/image";


const prayerData = [
  {
    name: "Fajar",
    jamaat: "04:15 am",
    start: "04:15 am",
    end: "05:28 am",
    icon: "/images/prayertimes/fajar.png",
  },
  {
    name: "Dhuhr",
    jamaat: "04:15 am",
    start: "04:15 am",
    end: "05:28 am",
    icon: "/images/prayertimes/jahur.png",
  },
  {
    name: "Asr",
    jamaat: "4:15 PM",
    start: (
      <div className="flex flex-col text-left">
        <span className="text-green-600">4:15 (Mislesunny)</span>
        <span className="text-green-600">4:15 (Mislewal)</span>
      </div>
    ),
    end: "05:28 PM",
    icon: "/images/prayertimes/asa.png",
  },
  {
    name: "Maghrib",
    jamaat: "04:15 am",
    start: "04:15 am",
    end: "05:28 am",
    icon: "/images/prayertimes/magrib.png",
  },
  {
    name: "Isha",
    jamaat: "04:15 am",
    start: "04:15 am",
    end: "05:28 am",
    icon: "/images/prayertimes/asa.png",
  },
  {
    name: "Jummah",
    jamaat: "04:15 am",
    start: "04:15 am",
    end: "05:28 am",
    icon: "/images/prayertimes/fajar.png",
  },
  {
    name: "Eid Ul Fitar", 
    jamaat: "04:15 am",
    start: "04:15 am",
    end: "05:28 am",
    icon: "/images/prayertimes/eid.png",
  },
  {
    name: "Eid Ul-Adha",
    jamaat: "04:15 am",
    start: "04:15 am",
    end: "05:28 am",
    icon: "/images/prayertimes/eid.png",
  },
];

export default function PrayerTimes() {
  return (
    <div className="  rounded-2xl p-5 h-full gradient-border">
     
      {/* heading */}
       <p className="text-sm mb-2 text-center sm:text-start">Last Update: 17 Aug 2015 at 9:30pm</p>

      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
       <div className="flex items-center gap-2 gradient-border_b mb-4 sm:mb-0 pb-3">
              <Image
                  src="/images/prayertimes/icon.png"
                  alt="Book Icon"
                  width={35}
                  height={24}
                />
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]">
          <span className="text-[#F7BA2A]">Prayer</span> Times
        </h2>
       </div>


        <div className="flex items-center gap-3 sm:gap-4">
                      <Image
                        src="/images/isamicBooks/arabic-islamicbooks.png"
                        alt="Arabic text"
                        width={160}
                        height={50}
                        className="object-contain hidden sm:flex"
                      />
                      <Image
                        src="/images/isamicBooks/arabic-islamicbooks.png"
                        alt="Arabic text"
                        width={135}
                        height={40}
                        className="object-contain sm:hidden"
                      />
                   
        </div>


      </div>

      <div className="bg-white rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#52B920] text-white text-left text-bold text-xl">
              <th className="p-3 rounded-tl-xl">Name</th>
              <th className="p-3">Jamat Start</th>
              <th className="p-3">Wakt Start</th>
              <th className="p-3 rounded-tr-xl">Wakt End</th>
            </tr>
          </thead>
          <tbody>
            {prayerData.map((prayer, index) => (
              <tr
                key={index}
                className="bg-[#F6FFF1] text-gray-800 border-y border-gray-200"
              >
                <td className="p-3 flex items-center gap-2">
                  {/* {prayer.icon} */}
                   <Image
                    src={prayer?.icon}
                    alt="gallery-icon"
                    width={40}
                    height={40}
                            />
                  <span className="font-bold text-base text-[#00401A]">{prayer.name}</span>
                </td>
                <td className="p-3 text-[#56410F] text-base">{prayer.jamaat}</td>
                <td className="p-3 text-[#3E8B18] text-base">{prayer.start}</td>
                <td className="p-3 text-[#FF0000] text-base">{prayer.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-2 text-sm font-bold text-[#FF0000]">
        Note :  <span className="text-[#FF3737] font-normal ">Friday services will be held at 1:30 PM starting August 1, 2025.</span>
      </p>
    </div>
  );
}
