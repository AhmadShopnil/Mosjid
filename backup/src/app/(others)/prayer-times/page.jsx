import PrayerTimesInnerPage from "@/components/PrayerTimes/PrayerTimesInnerPage";
import BannerInnerPage from "@/components/Shared/BannerInnerPage";
import BannerInnerPageServerSide from "@/components/Shared/BannerInnerPageServerSide";
import Breadcrumb from "@/components/Shared/Breadcrumb";
import Container from "@/components/Shared/Container";
import InnerHeader from "@/components/Shared/InnerHeader";
import SidebarMainDrawer from "@/components/Shared/SidebarMainDrawer";
import SocialShare from "@/components/Shared/SocialShare";

import {
  getMenus,
  getPage,
  getProhibitedTime,
  getPryerTime,
  getSettings,
} from "@/helper/actions";
import { convertMenuToSidebar } from "@/helper/convertMenuToSidebar";
import { getImageUrl } from "@/helper/getImageUrl";

import React from "react";

export default async function page() {
  const prayerTimes = await getPryerTime();
  const ProhibitedTime = await getProhibitedTime();
  const homePage = await getPage("home-sections-heading-management");
  const settings = await getSettings();
  const sections = homePage?.sections_on_api;
  const prayer_time = sections.find((s) => s.title_slug === "prayer_time");

  const arabic = getImageUrl(prayer_time?.image_media);
  const icon = getImageUrl(prayer_time?.background_media);

  const menus = await getMenus(6);
  const sideBarCategories = convertMenuToSidebar(menus?.items);

  return (
    <div>
      <div>
        <BannerInnerPageServerSide />
        {/* <BannerInnerPage /> */}
        <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Prayer Times" />
      </div>

      <Container className="flex gap-6 my-6">
        {/* sidebar */}
        <SidebarMainDrawer
          categories={sideBarCategories}
          isNavigate={false}
          dataForContact={`Prayer Times`}
        />

        {/* main content */}
        <div className=" w-full space-y-6">
          <InnerHeader title={prayer_time?.sub_title} image={arabic} />

          <div>
            <PrayerTimesInnerPage
              homePage={homePage}
              settings={settings}
              prayerTimes={prayerTimes}
              ProhibitedTime={ProhibitedTime}
            />

            <div className="mt-8">
              <SocialShare />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
