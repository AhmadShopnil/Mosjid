// /app/contact/page.js
import ContactClient from "@/components/Contact/ContactPageClient";
import BannerInnerPage from "@/components/Shared/BannerInnerPage";
import Breadcrumb from "@/components/Shared/Breadcrumb";
import Container from "@/components/Shared/Container";
import InnerHeader from "@/components/Shared/InnerHeader";
import SidebarMainDrawer from "@/components/Shared/SidebarMainDrawer";
import { getMenus, getPage } from "@/helper/actions";
import { convertMenuToSidebar } from "@/helper/convertMenuToSidebar";
import { Suspense } from "react";


export default async function Page() {

const contactPage = await getPage("contact-us")


  const menus = await getMenus(6)
  const sideBarCategories = convertMenuToSidebar(menus?.items);




  return (
    <div>
      <BannerInnerPage />
      <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Contact" />

      <Container className="flex gap-6 my-6">
        {/* Sidebar */}
        <SidebarMainDrawer isSubmitRequest={false} categories={sideBarCategories} />

        {/* Main content */}
        <div className="w-full space-y-6">
          <InnerHeader title={contactPage?.sub_title} image={contactPage?.featured_image} />
          <Suspense fallback={<div>Loading...</div>}>
            <ContactClient /> 
          </Suspense>


        </div>
      </Container>
    </div>
  );
}
