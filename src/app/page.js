
import FatwaHeadline from "@/components/Home/FatwaHeadline/FatwaHeadline";

import QuickLinks from "@/components/Home/QuickLinks/QuickLinks";
import IslamicBlogEvents from "@/components/Home/Blog_Events/IslamicBlogEvents";
import DictionarySection from "@/components/Home/Dictionary/DictionarySection";
import DuaSection from "@/components/Home/Dua/DuaSection";
import DirecToryDonation from "@/components/Home/Directory_Donation/DirecToryDonation";

import IslamicBooks from "@/components/Home/IslamicBooks/IslamicBooks";
import Fatwah from "@/components/Home/Fatwah/Fatwah";
import PrayerTimesAndNotices from "@/components/Home/PrayerTimesAndNotices/PrayerTimesAndNotices";
import OfferServices from "@/components/Home/OfferServices/OfferServices";
import { getFatwa } from "@/helper/actions";
import HeroMain from "@/components/Home/HeroSections/HeroMain";
import QuickLinksMobile from "@/components/Home/QuickLinks/QuickLinksMobile";

import GallerySection from "@/components/Home/Gallery/GallerySection";

export default async function Home() {

  const fatwahs = await getFatwa();

  return (
   <main className=" mb-10 ">
  
      <HeroMain/>
     <div className="">
      <FatwaHeadline fatwahs={fatwahs}/>
      
        <div className="hidden lg:block">
         <QuickLinks />
       </div>
       <div className="lg:hidden">
        <QuickLinksMobile/>
       </div>
     </div>


     

   <PrayerTimesAndNotices/>




     <div
     className="hidden lg:block"
     >
       <Fatwah/>
      <OfferServices/>
       <DictionarySection/>
      <DirecToryDonation/>
      <DuaSection/>
      <GallerySection/>
      <IslamicBooks/>
     </div>
      
      <IslamicBlogEvents/>
{/* 
    <div>
      <button>
        Up
      </button>
    </div> */}
    </main>
  );
}
