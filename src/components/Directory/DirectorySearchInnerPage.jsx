"use client";

import { Search, MapPin } from "lucide-react";
import CustomSelectRoundedWhite from "../UI/CustomSelectRoundedWhite";

export default function DirectorySearchInnerPage() {
  return (
  <div className="w-full flex flex-col md:flex-row items-center justify-start gap-4 flex-wrap">
  {/* Prefecture */}
  <div className="relative flex-1 max-w-xs">
    <CustomSelectRoundedWhite
      lvl="Prefecture"
      options={[
        { labelEn: "Osaka", labelJp: "大阪府" },
        { labelEn: "Tokyo", labelJp: "東京都" },
        { labelEn: "Hokkaido", labelJp: "北海道" },
        { labelEn: "Kyoto", labelJp: "京都府" },
      ]}
    />
  </div>

  {/* City */}
  <div className="relative flex-1 max-w-xs">
    <CustomSelectRoundedWhite
      lvl="City"
      options={[
        { labelEn: "Osaka-shi", labelJp: "大阪市" },
        { labelEn: "Sapporo-shi", labelJp: "札幌市" },
        { labelEn: "Kyoto-shi", labelJp: "京都市" },
        { labelEn: "Tokyo-shi", labelJp: "東京都市" },
      ]}
    />
  </div>

  {/* District */}
  <div className="relative flex-1 max-w-xs">
    <CustomSelectRoundedWhite
      lvl="District"
      options={[
        { labelEn: "Nishiyodogawa-ku", labelJp: "西淀川区" },
        { labelEn: "Kita-ku", labelJp: "北区" },
        { labelEn: "Chuo-ku", labelJp: "中央区" },
        { labelEn: "Minami-ku", labelJp: "南区" },
      ]}
    />
  </div>

  {/* Find Button */}
  <button
    className="h-[56px] bg-[#F7BA2A] hover:bg-[#f8c645] text-[#00401A] font-semibold px-10 py-3 rounded-full 
      shadow-md transition text-lg w-full sm:w-auto"
  >
    Find
  </button>
</div>

  );
}
