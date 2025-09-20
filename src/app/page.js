
import FatwaHeadline from "@/components/Home/FatwaHeadline/FatwaHeadline";
import HeroSection from "@/components/Home/HeroSection";
import QuickLinks from "@/components/Home/QuickLinks";
import IslamicBlogEvents from "@/components/Home/Blog_Events/IslamicBlogEvents";
import DictionarySection from "@/components/Home/Dictionary/DictionarySection";
import DuaSection from "@/components/Home/Dua/DuaSection";
import DirecToryDonation from "@/components/Home/Directory_Donation/DirecToryDonation";
import ImageGallery from "@/components/Home/Gallery/Gallery";
import IslamicBooks from "@/components/Home/IslamicBooks/IslamicBooks";
import Fatwah from "@/components/Home/Fatwah/Fatwah";
import PrayerTimesAndNotices from "@/components/Home/PrayerTimesAndNotices/PrayerTimesAndNotices";

export default function Home() {
  return (
   <main className="bg-gray-50  mb-10 ">
  
      <HeroSection />
      
     <div className="">
      <FatwaHeadline/>
       <QuickLinks />
     </div>

   <PrayerTimesAndNotices/>

      <Fatwah/>
       <DictionarySection/>
      <DirecToryDonation/>
      <DuaSection/>
      <ImageGallery/>
      <IslamicBooks/>
      <IslamicBlogEvents/>
    </main>
  );
}
