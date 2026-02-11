// components/BannerBottom.jsx (SERVER COMPONENT)
import { getBanners } from "@/helper/actions";
import BannerBottomSlider from "./BannerBottomSlider";

export default async function BannerBottom() {
  const banners = await getBanners();

  return <div className="w-full h-[70px] md:h-[220px] lg:h-[260px]  ">
    

    <BannerBottomSlider banners={banners} />
  </div>;
}
