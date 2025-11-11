// /app/contact/page.js
import ContactClient from "@/components/Contact/ContactPageClient";
import BannerInnerPage from "@/components/Shared/BannerInnerPage";
import Breadcrumb from "@/components/Shared/Breadcrumb";
import Container from "@/components/Shared/Container";
import InnerHeader from "@/components/Shared/InnerHeader";
import SidebarMainDrawer from "@/components/Shared/SidebarMainDrawer";
import { sideBarCategories } from "@/data/sidebar";
import { Suspense } from "react";


export default function Page() {
  return (
    <div>
      <BannerInnerPage />
      <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Contact" />

      <Container className="flex gap-6 my-6">
        {/* Sidebar */}
        <SidebarMainDrawer isSubmitRequest={false} categories={sideBarCategories} />

        {/* Main content */}
        <div className="w-full space-y-6">
          <InnerHeader title={"お問い合わせ"} image={"/images/contact/title.png"} />
          <Suspense fallback={<div>Loading...</div>}>
            <ContactClient /> 
          </Suspense>


        </div>
      </Container>
    </div>
  );
}
