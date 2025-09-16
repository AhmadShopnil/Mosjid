import Navbar from "@/components/Header/Navbar";
import Dictionary from "@/components/Home/Dictionary";
import FatwaHeadline from "@/components/Home/FatwaHeadline";
import HeroSection from "@/components/Home/HeroSection";
import MakeDonation from "@/components/Home/MakeDonation";

import NoticeBoard from "@/components/Home/NoticeBoard";
import PrayerTimes from "@/components/Home/PrayerTimes";
import QuickLinks from "@/components/Home/QuickLinks";
import Container from "@/components/Shared/Container";
import Image from "next/image";

export default function Home() {
  return (
   <main className="bg-gray-50  mb-10">
      <Navbar />
      <HeroSection />
      
     <div className="">
      <FatwaHeadline/>
       <QuickLinks />
     </div>

      <Container className=" flex w-full gap-6  py-10 ">
        <div className="w-[60%]">
          <PrayerTimes />
        </div>
      <div className="w-[40%]">
          <NoticeBoard />
      </div>
      </Container>

      <Container className="  flex w-full h-full gap-6">
         <div className="w-[50%]">
          <Dictionary/>
        </div>
         <div className="w-[50%] h-full">
          <MakeDonation/>
        </div>
        
        
      </Container>
    </main>
  );
}
