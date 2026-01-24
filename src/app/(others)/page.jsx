
import FatwaHeadline from "@/components/Home/FatwaHeadline/FatwaHeadline";

import QuickLinks from "@/components/Home/QuickLinks/QuickLinks";
import IslamicBlogEvents from "@/components/Home/Blog_Events/IslamicBlogEvents";
import DictionarySection from "@/components/Home/Dictionary/DictionarySection";

import DirecToryDonation from "@/components/Home/Directory_Donation/DirecToryDonation";

import IslamicBooks from "@/components/Home/IslamicBooks/IslamicBooks";
import Fatwah from "@/components/Home/Fatwah/Fatwah";
import PrayerTimesAndNotices from "@/components/Home/PrayerTimesAndNotices/PrayerTimesAndNotices";
import OfferServices from "@/components/Home/OfferServices/OfferServices";
import { getBooksData, getDua, getFatwa, getFatwahFiltersData, getMenus, getPage, getSettings, getUpdatesHeadline } from "@/helper/actions";
import HeroMain from "@/components/Home/HeroSections/HeroMain";
import QuickLinksMobile from "@/components/Home/QuickLinks/QuickLinksMobile";

import GallerySection from "@/components/Home/Gallery/GallerySection";
import DuaBox from "@/components/Home/Dua/DuaBox";

export default async function Home() {

  const updateHealines = await getUpdatesHeadline();
  const homePage = await getPage("home-sections-heading-management");
  const settings = await getSettings();
  const duas = await getDua();
  const books = await getBooksData(56)
  const chapter = await getFatwahFiltersData("bookchapters")
  const section = await getFatwahFiltersData("booksections")




  const data_for_filter = { books, chapter, section }


  const quickLinks = await getMenus(6)

  // console.log({quickLinks})

  return (
    <main className=" mb-10 ">

      <HeroMain />
      <div className="">
        <FatwaHeadline updateHealines={updateHealines} />

        <div className="hidden lg:block">
          <QuickLinks quickLinks={quickLinks} />
        </div>
        <div className="lg:hidden">
          <QuickLinksMobile quickLinks={quickLinks} />
        </div>
      </div>

      <PrayerTimesAndNotices />


      <div
        className="hidden lg:block"
      >
        <Fatwah />
        <OfferServices  />
        <DictionarySection data_for_filter={data_for_filter} homePage={homePage} />
        <DirecToryDonation />
        {/* <DuaSection/> */}
        <DuaBox homePage={homePage} settings={settings} duas={duas} />
        <GallerySection />
        <IslamicBooks />
      </div>
      <div className=" lg:hidden">
        <OfferServices />
      </div>

      <IslamicBlogEvents />

    </main>
  );
}
