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






// // Geist Sans
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// // Geist Mono
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// // Merriweather
// const merriweather = Merriweather({
//   variable: "--font-merriweather",
//   subsets: ["latin"],
//   weight: ["300", "400", "700", "900"], // Include all weights you need
//   display: "swap",
// });

// export const metadata = {
//   title: "Osaka Masjid",
//   description: "Masjid",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} ${merriweather.variable} antialiased`}
//       >
//         <FatwaFilterProvider>
//           <RegionFilterProvider>
//             <SelectedParrentProvider>
//               <SelectedProvider>
//                 <DevelopmentBanner />
//                 <Header />
//                 {children}
//                 <Footer />
//                 <ScrollToTopButton />
//                 <Toaster position="top-right" />
//               </SelectedProvider>
//             </SelectedParrentProvider>
//           </RegionFilterProvider>
//         </FatwaFilterProvider>



//       </body>
//     </html>
//   );
// }
