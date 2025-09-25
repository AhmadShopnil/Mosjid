
import FatwaHeadline from "@/components/Home/FatwaHeadline/FatwaHeadline";
import HeroSection from "@/components/Home/HeroSections/HeroSection";
import QuickLinks from "@/components/Home/QuickLinks/QuickLinks";
import IslamicBlogEvents from "@/components/Home/Blog_Events/IslamicBlogEvents";
import DictionarySection from "@/components/Home/Dictionary/DictionarySection";
import DuaSection from "@/components/Home/Dua/DuaSection";
import DirecToryDonation from "@/components/Home/Directory_Donation/DirecToryDonation";
import ImageGallery from "@/components/Home/Gallery/Gallery";
import IslamicBooks from "@/components/Home/IslamicBooks/IslamicBooks";
import Fatwah from "@/components/Home/Fatwah/Fatwah";
import PrayerTimesAndNotices from "@/components/Home/PrayerTimesAndNotices/PrayerTimesAndNotices";
import OfferServices from "@/components/Home/OfferServices/OfferServices";
import { getFatwa } from "@/helper/actions";

export default async function Home() {

  const fatwahs = await getFatwa();

  return (
   <main className="bg-gray-50  mb-10 ">
  
      <HeroSection />
      
     <div className="">
      <FatwaHeadline fatwahs={fatwahs}/>
       <QuickLinks />
     </div>

   <PrayerTimesAndNotices/>

      <Fatwah/>
      <OfferServices/>
       <DictionarySection/>
      <DirecToryDonation/>
      <DuaSection/>
      <ImageGallery/>
      <IslamicBooks/>
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
