// import { Geist, Geist_Mono, Merriweather } from "next/font/google";
// import "../../app/globals.css";
// import Footer from "@/components/Footer/Footer";
// import Header from "@/components/Header/Header";
// import ScrollToTopButton from "@/components/Shared/ScrollToTopButton";
// import { Toaster } from "react-hot-toast";
// import DevelopmentBanner from "@/components/Header/DevelopmentBanner";
// import { SelectedProvider } from "@/context/SelectedContext";
// import { SelectedParrentProvider } from "@/context/SelectedContextParrent";
// import { FatwaFilterProvider } from "@/context/FatwaFilterContext";
// import { RegionFilterProvider } from "@/context/RegionFilterContext ";


// import { getMenus } from "@/helper/actions";
// import { convertMenuToSidebar } from "@/helper/convertMenuToSidebar";
// import BannerInnerPage from "@/components/Shared/BannerInnerPage";
// import Breadcrumb from "@/components/Shared/Breadcrumb";
// import Container from "@/components/Shared/Container";
// import ServicesSidebarDrawer from "@/components/Services/Sidebar/ServicesSidebarDrawer";
// import { servicesSideBarCategories } from "@/data/sidebar";





// // Geist Sans
// const geistSans = Geist({
//     variable: "--font-geist-sans",
//     subsets: ["latin"],
// });

// // Geist Mono
// const geistMono = Geist_Mono({
//     variable: "--font-geist-mono",
//     subsets: ["latin"],
// });

// // Merriweather
// const merriweather = Merriweather({
//     variable: "--font-merriweather",
//     subsets: ["latin"],
//     weight: ["300", "400", "700", "900"], // Include all weights you need
//     display: "swap",
// });

// export const metadata = {
//     title: "Osaka Masjid- Services",
//     description: "Masjid Services",
// };


// export default async function ServicesLayout({ children }) {

//     const menus = await getMenus(6);
//     const sideBarCategories = convertMenuToSidebar(menus?.items);




//     return (
//         <html lang="en">
//             <body
//                 className={`${geistSans.variable} ${geistMono.variable} ${merriweather.variable} antialiased`}
//             >
//                 <FatwaFilterProvider>
//                     <RegionFilterProvider>
//                         <SelectedParrentProvider>
//                             <SelectedProvider>

//                                 {/* main  components start */}
//                                 <DevelopmentBanner />
//                                 <Header />
//                                 <BannerInnerPage />
//                                 <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Services" />
//                                 <Container className=" my-6">
//                                     <div className="flex justify-between gap-4">
//                                         <div className=" xl:w-[19%]">
                                           
//                                             <ServicesSidebarDrawer categories={servicesSideBarCategories} />
//                                         </div>
//                                         <div className="w-full xl:w-[80%]   space-y-6">

//                                             {children}
//                                         </div>
//                                     </div>

//                                 </Container>
//                                 <Footer />
//                                 <ScrollToTopButton />
//                                 <Toaster position="top-right" />
//                                 {/* main  components End */}


//                             </SelectedProvider>
//                         </SelectedParrentProvider>
//                     </RegionFilterProvider>
//                 </FatwaFilterProvider>



//             </body>
//         </html>
//     );
// }
