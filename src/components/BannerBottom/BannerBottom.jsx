// components/BannerBottom.jsx
import { getBanners } from "@/helper/actions";
import BannerBottomSlider from "./BannerBottomSlider";

export default async function BannerBottom() {
  const banners = await getBanners();

  return (
    <div className="w-full my-4 md:my-7">
      <div className="w-full max-w-[1920px] mx-auto">
        <BannerBottomSlider banners={banners} />
      </div>
    </div>
  );
}