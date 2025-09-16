import React from "react";
import { PrayerTimesIcon } from "../Icons/QuickLinks";
import { Sun, Moon, Star } from "lucide-react";


const prayerData = [
  {
    name: "Fajar",
    jamaat: "04:15 am",
    start: "04:15 am",
    end: "05:28 am",
    icon: <Sun className="w-5 h-5 text-yellow-500" />,
  },
  {
    name: "Dhuhr",
    jamaat: "04:15 am",
    start: "04:15 am",
    end: "05:28 am",
    icon: <Sun className="w-5 h-5 text-yellow-500" />,
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
    icon: <Moon className="w-5 h-5 text-green-600" />,
  },
  {
    name: "Maghrib",
    jamaat: "04:15 am",
    start: "04:15 am",
    end: "05:28 am",
    icon: <Sun className="w-5 h-5 text-yellow-500" />,
  },
  {
    name: "Isha",
    jamaat: "04:15 am",
    start: "04:15 am",
    end: "05:28 am",
    icon: <Moon className="w-5 h-5 text-green-600" />,
  },
  {
    name: "Jummah",
    jamaat: "04:15 am",
    start: "04:15 am",
    end: "05:28 am",
    icon: <Sun className="w-5 h-5 text-yellow-500" />,
  },
  {
    name: "Eid Ul Fitar",
    jamaat: "04:15 am",
    start: "04:15 am",
    end: "05:28 am",
    icon: <Star className="w-5 h-5 text-yellow-500" />,
  },
  {
    name: "Eid Ul-Adha",
    jamaat: "04:15 am",
    start: "04:15 am",
    end: "05:28 am",
    icon: <Star className="w-5 h-5 text-yellow-500" />,
  },
];

export default function PrayerTimes() {
  return (
    <div className="  rounded-2xl p-5 h-full gradient-border">
      <p className="text-sm mb-2">Last Update: 17 Aug 2015 at 9:30pm</p>

      <div className="flex items-center gap-3 mb-4">
        <span>
          <PrayerTimesIcon w={30} h={34} />
        </span>
        <h2 className="text-2xl font-bold text-[#00401A]">
          <span className="text-[#F7BA2A]">Prayer</span> Times
        </h2>
      </div>

      <div className="bg-white rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#52B920] text-white text-left">
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
                  {prayer.icon}
                  <span className="font-medium text-[#00401A]">{prayer.name}</span>
                </td>
                <td className="p-3 text-[#56410F]">{prayer.jamaat}</td>
                <td className="p-3 text-[#3E8B18]">{prayer.start}</td>
                <td className="p-3 text-[#FF0000] ">{prayer.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-2 text-sm text-gray-500">
        Note: Prayer times are updated regularly.
      </p>
    </div>
  );
}
