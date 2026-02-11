// components/BannerBottom.jsx (SERVER COMPONENT)
import { getBanners } from "@/helper/actions";
import BannerBottomSlider from "./BannerBottomSlider";

export default async function BannerBottom() {
  const banners = await getBanners();

  return <div>
    

    <BannerBottomSlider banners={banners} />
  </div>;
}
