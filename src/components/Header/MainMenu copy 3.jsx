// "use client";

// import Image from "next/image";
// import React, { useState } from "react";
// import Container from "../Shared/Container";
// import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
// import TopbarMobile from "./TopBarMobile";
// import Link from "next/link";
// import { getMediaLinkByMetaName } from "@/helper/metaHelpers";
// import { BASE_URL } from "@/helper/baseUrl";

// const menuItems = [
//   {
//     name: "Home",
//     link: "/",
//     icon: "/images/QuickLinks/white/home.png",
//     activeIcon: "/images/QuickLinks/hover/home-05.png",
//   },
//   {
//     name: "About",
//     link: "about",
//     icon: "/images/QuickLinks/white/about.png",
//     activeIcon: "/images/QuickLinks/normal2/7.png",
//   },
//   {
//     name: "Prayer Times",
//     link: "prayer-times",
//     icon: "/images/QuickLinks/white/prayerTime.png",
//     activeIcon: "/images/QuickLinks/normal2/2.png",
//   },
//   {
//     name: "Notice Board",
//     link: "notices",
//     icon: "/images/QuickLinks/white/notice2.png",
//     activeIcon: "/images/QuickLinks/normal2/3.png",
//   },
//   {
//     name: "Fatwah",
//     link: "fatwah",
//     icon: "/images/QuickLinks/white/fatwa.png",
//     icon: "/images/QuickLinks/white/fatwa.png",
//     // submenu: [
//     //   {
//     //     name: "Ask Fatwah",
//     //     link: "/fatwah/ask-question",
//     //     icon: "/images/QuickLinks/white/fatwa.png",
//     //   },
//     //   {
//     //     name: "View Fatwahs",
//     //     link: "/fatwah",
//     //     icon: "/images/QuickLinks/white/fatwa.png",
//     //   },
//     // ],
//   },
//   {
//     name: "Services",
//     link: "services",
//     icon: "/images/QuickLinks/white/service2.png",
//     activeIcon: "/images/QuickLinks/normal2/5.png",
//     submenu: [
//       {
//         name: "Offered Services",
//         link: "services",
//         icon: "/images/QuickLinks/offer-service.png",
//         activeIcon: "/images/QuickLinks/white/service2.png",
//         submenu: [
//           {
//             name: "Marriage",
//             link: "services",
//             icon: "/images/QuickLinks/normal2/marriage.png",
//             activeIcon: "/images/QuickLinks/normal2/marriage.png",
//           }

//         ],
//       },
//       {
//         name: "Dua",
//         link: "dua",
//         icon: "/images/QuickLinks/dua.png",
//         activeIcon: "/images/QuickLinks/dua.png",
//       },
//       {
//         name: "Gallery",
//         link: "gallery",
//         icon: "/images/QuickLinks/gallery.png",
//         activeIcon: "/images/QuickLinks/gallery.png",
//       },

//     ],
//   },
//   {
//     name: "Dictionary",
//     link: "dictionary/arabic",
//     icon: "/images/QuickLinks/white/dictionary.png",
//     activeIcon: "/images/QuickLinks/normal2/6.png",
//     submenu: [
//       {
//         name: "Arabic-English",
//         link: "/dictionary/arabic",
//         icon: "/images/QuickLinks/normal2/2.png",
//       },
//       {
//         name: "Islamic Terms",
//         link: "/dictionary/islamic",
//         icon: "/images/QuickLinks/normal2/5.png",
//       },
//     ],
//   },
//   {
//     name: "Directory",
//     link: "directory/19",
//     icon: "/images/QuickLinks/white/directory.png",
//     activeIcon: "/images/QuickLinks/normal2/7.png",
//     submenu: [
//       {
//         name: "Masjid",
//         link: "/directory/19",
//         icon: "/images/QuickLinks/normal2/2.png",
//       },
//       {
//         name: "Madrasha",
//         link: "/directory/19",
//         icon: "/images/QuickLinks/normal2/5.png",
//       },
//       {
//         name: "Quranic Center",
//         link: "/directory/19",
//         icon: "/images/QuickLinks/normal2/5.png",
//       },
//       {
//         name: "Islamic Center",
//         link: "/directory/19",
//         icon: "/images/QuickLinks/normal2/5.png",
//       },
//       {
//         name: "Others",
//         link: "/directory/19",
//         icon: "/images/QuickLinks/normal2/5.png",
//       },
//     ],
//   },
//   {
//     name: "Donation",
//     link: "donation",
//     icon: "/images/QuickLinks/white/donation.png",
//     activeIcon: "/images/QuickLinks/normal2/2.png",
//   },


//   {
//     name: "Books",
//     link: "books",
//     icon: "/images/QuickLinks/white/book.png",
//     activeIcon: "/images/QuickLinks/normal2/5.png",
//   },
//   {
//     name: "Blogs",
//     link: "blogs",
//     icon: "/images/QuickLinks/white/blog.png",
//     activeIcon: "/images/QuickLinks/normal2/6.png",

//   },

//   {
//     name: "Events",
//     link: "events",
//     icon: "/images/QuickLinks/white/events.png",
//     activeIcon: "/images/QuickLinks/normal2/6.png",

//   },
//   {
//     name: "Contact",
//     link: "contact",
//     icon: "/images/QuickLinks/white/phone.png",
//     activeIcon: "/images/QuickLinks/white/phone.png",
//   },
// ];


// export default function MainMenu({ settings }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [activeSubmenu, setActiveSubmenu] = useState(null);

//   const toggleDrawer = () => setIsOpen(!isOpen);
//   const logo_path = getMediaLinkByMetaName(settings, "footer_logo");
//   const logo_url = `${BASE_URL}${logo_path}`;

//   return (
//     <div className="relative bg-[#00401A] text-white py-2 xl:py-0">
//       <Container className="flex items-center justify-center relative px-4">
//         {/* Logo */}
//         <div className="absolute -top-8 left-4 sm:left-8 z-40">
//           <div className="hidden lg:flex bg-white shadow-xl rounded-xl w-[120px] h-[110px] items-center justify-center">
//             <Image src={logo_url} alt="Logo" width={80} height={100} className="object-cover" />
//           </div>
//           <div className="lg:hidden bg-white shadow-xl rounded-xl w-[90px] h-[100px] flex items-center justify-center">
//             <Image src={logo_url} alt="Logo" width={65} height={70} className="object-cover" />
//           </div>
//         </div>

//         {/* Desktop Navigation */}
//         <div className="hidden w-full xl:flex justify-center">
//           <nav className="flex flex-wrap justify-center gap-1.5 py-3 text-sm sm:text-base relative">
//             {menuItems.map((item, i) => (
//               <div
//                 key={i}
//                 className="relative group"
//                 onMouseEnter={() => setActiveDropdown(i)}
//                 onMouseLeave={() => setActiveDropdown(null)}
//               >
//                 {/* Main Link */}
//                 <Link
//                   href={`/${item.link}`}
//                   className="hover:text-yellow-400 px-1 py-1 transition-colors duration-200 flex justify-center items-center"
//                 >
//                   <div className="w-5 h-5 flex items-center justify-center mr-1">
//                     {/* <Image
//                       src={item.icon}
//                       alt={item.name}
//                       width={20}
//                       height={20}
//                       className="object-contain w-full h-full transition-all duration-300 brightness-0 invert group-hover:icon-yellow"
//                     /> */}
//                     <Image
//                       src={item.icon}
//                       alt={item.name}
//                       width={20}
//                       height={20}
//                       className="object-contain w-full h-full brightness-0 invert"
//                     />
//                   </div>
//                   <span className="text-sm font-semibold flex items-center gap-1">
//                     {item.name}
//                     {item.submenu && <ChevronDown className="w-3 h-3 mt-0.5" />}
//                   </span>
//                 </Link>

//                 {/* Level 1 Dropdown */}
//                 {item.submenu && (
//                   <div
//                     className={`absolute left-0 top-full bg-[#EEF8E9] text-[#00401A] shadow-xl rounded-[6px] 
//                       mt-3 min-w-[210px]
//                       z-50 transition-all duration-200 ease-in-out transform ${activeDropdown === i
//                         ? "opacity-100 visible translate-y-0"
//                         : "opacity-0 invisible -translate-y-2"
//                       }`}
//                   >
//                     {item.submenu.map((sub, j) => (
//                       <div
//                         key={j}
//                         className="relative group/submenu"
//                         onMouseEnter={() => setActiveSubmenu(j)}
//                         onMouseLeave={() => setActiveSubmenu(null)}
//                       >
//                         <Link
//                           href={`/${sub.link}`}
//                           className="flex items-center justify-between gap-2 px-4 py-2.5 font-bold
//                            hover:text-[#F7BA2A] text-xs"
//                         >
//                           <div className="flex items-center gap-2">
//                             <Image
//                               src={sub.icon}
//                               alt={sub.name}
//                               width={16}
//                               height={16}
//                               className="object-contain"
//                             />
//                             {sub.name}
//                           </div>
//                           {sub.submenu && <ChevronRight className="w-3 h-3" />}
//                         </Link>

//                         {/* Level 2 Dropdown (Nested) */}
//                         {sub.submenu && (
//                           <div
//                             className={`absolute left-full top-4 bg-[#EEF8E9] text-[#00401A] shadow-xl rounded-[6px] ml-1 min-w-[200px]
//                               transition-all duration-200 ease-in-out transform ${activeSubmenu === j
//                                 ? "opacity-100 visible translate-x-0"
//                                 : "opacity-0 invisible -translate-x-2"
//                               }`}
//                           >
//                             {sub.submenu.map((child, k) => (
//                               <Link
//                                 key={k}
//                                 href={`/${child.link}`}
//                                 className="flex items-center gap-2 px-4 py-2.5 font-bold hover:text-[#F7BA2A] text-xs"
//                               >
//                                 <Image
//                                   src={child.icon}
//                                   alt={child.name}
//                                   width={16}
//                                   height={16}
//                                   className="object-contain"
//                                 />
//                                 {child.name}
//                               </Link>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>
//         </div>

//         {/* Mobile Hamburger */}
//         <div className="xl:hidden ml-auto">
//           <button onClick={toggleDrawer} aria-label="Toggle Menu">
//             {isOpen ? <X className="w-7 h-7 text-white" /> : <Menu className="w-7 h-7 text-white" />}
//           </button>
//         </div>
//       </Container>

//       {/* Overlay */}
//       {isOpen && <div onClick={toggleDrawer} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />}

//       {/* Mobile Drawer (unchanged) */}
//     </div>
//   );
// }
