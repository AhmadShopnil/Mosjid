import Navbar from "@/components/Header/Navbar";

import FatwaHeadline from "@/components/Home/FatwaHeadline/FatwaHeadline";
import HeroSection from "@/components/Home/HeroSection";
import MakeDonation from "@/components/Home/Directory_Donation/Donation/MakeDonation";

import NoticeBoard from "@/components/Home/NoticeBoard";
import PrayerTimes from "@/components/Home/PrayerTimes";
import QuickLinks from "@/components/Home/QuickLinks";
import Container from "@/components/Shared/Container";

import IslamicBlogEvents from "@/components/Home/Blog_Events/IslamicBlogEvents";
import DictionarySection from "@/components/Home/Dictionary/DictionarySection";
import DuaSection from "@/components/Home/Dua/DuaSection";
import Directory from "@/components/Home/Directory_Donation/Directory/Directory";
import DirecToryDonation from "@/components/Home/Directory_Donation/DirecToryDonation";
import ImageGallery from "@/components/Home/Gallery/Gallery";
import IslamicBooks from "@/components/Home/IslamicBooks/IslamicBooks";
import Fatwah from "@/components/Home/Fatwah/Fatwah";

export default function Home() {
  return (
   <main className="bg-gray-50  mb-10 space-y-10">
      <Navbar />
      <HeroSection />
      
     <div className="">
      <FatwaHeadline/>
       <QuickLinks />
     </div>

      <Container className=" flex w-full gap-6   ">
        <div className="w-[60%]">
          <PrayerTimes />
        </div>
      <div className="w-[40%]">
          <NoticeBoard />
      </div>
      </Container>
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
