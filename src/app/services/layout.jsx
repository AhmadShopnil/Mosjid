// Services Layout
import BannerInnerPage from "@/components/Shared/BannerInnerPage";
import Breadcrumb from "@/components/Shared/Breadcrumb";
import Container from "@/components/Shared/Container";
import SidebarMainDrawer from "@/components/Shared/SidebarMainDrawer";
import { getMenus } from "@/helper/actions";
import { convertMenuToSidebar } from "@/helper/convertMenuToSidebar";



export default async function ServicesLayout({ children }) {


    const menus = await getMenus(6);
    const sideBarCategories = convertMenuToSidebar(menus?.items);

    return (
        <div>
            <BannerInnerPage />
            <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Services" />

            <Container className="flex gap-6 my-6">
                <SidebarMainDrawer isSubmitRequest={false} categories={sideBarCategories} />

                <div className="w-full space-y-6">
                    {children}
                </div>
            </Container>
        </div>
    );
}