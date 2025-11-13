// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import Container from "@/components/Shared/Container";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import { quickLinksAll } from "@/data/quickLinksData";

// const quickLinks = [
//   {
//     name: "Prayer Times",
//     jp: "祈りの時間",
//     targetId: "prayer-times",
//     icon: "/images/QuickLinks/prayer-times.png",
//     // icon: "/images/QuickLinks/normal/prayer times.png",
//     activeIcon: "/images/QuickLinks/hover/prayer times.png",
//   },
//   {
//     name: "Notice Board",
//     jp: "掲示板",
//     targetId: "prayer-times",
//     icon: "/images/QuickLinks/notice.png",
//     // icon: "/images/QuickLinks/normal/notice board.png",
//     activeIcon: "/images/QuickLinks/hover/notice board ES.png",
//   },
//   {
//     name: "Fatwa",
//     jp: "ファトワ",
//     targetId: "fatwah",
//     icon: "/images/QuickLinks/fatwa.png",
//     // icon: "/images/QuickLinks/normal/Fatwa 03.png",
//     activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
//   },
//   {
//     name: "Offered Services",
//     jp: "提供されるサービス",
//     targetId: "offered-services",
//     icon: "/images/QuickLinks/offer-service.png",
//     // icon: "/images/QuickLinks/normal/Blog & event.png",
//     activeIcon: "/images/QuickLinks/hover/Blog & event.png",
//   },
//   {
//     name: "Dictionary",
//     jp: "辞書",
//     targetId: "dictionary",
//     icon: "/images/QuickLinks/dictionary.png",
//     // icon: "/images/QuickLinks/normal/Dictionary.png",
//     activeIcon: "/images/QuickLinks/hover/Dictionary.png",
//   },
//   {
//     name: "Directory",
//     jp: "ディレクトリ",
//     targetId: "donation",
//     icon: "/images/QuickLinks/directory.png",
//     // icon: "/images/QuickLinks/normal/Directory.png",
//     activeIcon: "/images/QuickLinks/hover/Directory.png",
//   },
//   {
//     name: "Donation",
//     jp: "寄付",
//     targetId: "donation",
//     icon: "/images/QuickLinks/donation.png",
//     // icon: "/images/QuickLinks/normal/Donation.png",
//     activeIcon: "/images/QuickLinks/hover/Donation.png",
//   },
//   {
//     name: "Gallery",
//     jp: "ギャラリー",
//     targetId: "gallery",
//     icon: "/images/QuickLinks/gallery.png",
//     // icon: "/images/QuickLinks/normal/Gallery.png",
//     activeIcon: "/images/QuickLinks/hover/Gallery.png",
//   },
//   {
//     name: "Islamic Books",
//     jp: "イスラム教の本",
//     targetId: "books",
//     icon: "/images/QuickLinks/books.png",
//     // icon: "/images/QuickLinks/normal/Gallery.png",
//     activeIcon: "/images/QuickLinks/hover/Gallery.png",
//   },
// ];


// export default function QuickLinks() {
//   const [hoveredCard, setHoveredCard] = useState(null);

//   const handleScroll = (id) => {
//     const section = document.getElementById(id);
//     if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   return (
//     <section className="bg-[#E5F5DE] py-8 relative ">

//       <div
//         className="absolute right-0 bottom-0"
//       >
//         <Image
//           src="/images/QuickLinks/img1.png"
//           alt='img'
//           width={210}
//           height={100}
//           className="object-contain transition-all duration-300"
//         />
//       </div>
//       <Container>
//         {/* Custom Navigation Buttons */}
//         <div className="absolute left-18 top-1/2 z-10 transform -translate-y-1/2">
//           <button
//             className="swiper-button-prev-custom w-11 h-11 bg-white shadow-md rounded-full flex items-center justify-center
//              text-green-800 hover:text-amber-300 text-2xl  transition duration-150 cursor-pointer"
//             aria-label="Previous"
//           >
//             <span className="">‹</span>
//           </button>
//         </div>
//         <div className="absolute right-20 top-1/2 z-10 transform -translate-y-1/2">
//           <button
//             className="swiper-button-next-custom w-11 h-11 bg-white shadow-md rounded-full flex items-center justify-center
//               text-green-800 hover:text-amber-300 text-2xl transition duration-150 cursor-pointer"
//             aria-label="Next"
//           >
//             <span className="">›</span>
//           </button>
//         </div>

//         {/* Swiper Section */}
//         <Swiper
//           modules={[Navigation]}
//           navigation={{
//             prevEl: ".swiper-button-prev-custom",
//             nextEl: ".swiper-button-next-custom",
//           }}
//           spaceBetween={20}
//           slidesPerView={2}
//           breakpoints={{
//             640: { slidesPerView: 3 },
//             768: { slidesPerView: 4 },
//             1024: { slidesPerView: 5 },
//             1280: { slidesPerView: 6 },
//             1536: { slidesPerView: 7 },
//           }}
//           className="px-10"
//         >
//           {quickLinksAll.map((link, i) => {
//             const isHovered = hoveredCard === i;
//             return (
//               <SwiperSlide key={i} className="flex justify-center">
//                 <div
//                 className={`quicklinks  relative flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${isHovered ? "text-white" : "text-[#00401A]"
//                     }`}
//                   // className={`quicklinks  relative flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${isHovered ? "text-white" : "text-[#00401A]"
//                   //   }`}
//                   onMouseEnter={() => setHoveredCard(i)}
//                   onMouseLeave={() => setHoveredCard(null)}
//                   onClick={() => handleScroll(link.targetId)}
//                 >
//                   {/* Icon */}
//                   <div className="w-[116px] h-[90px] flex items-center justify-center">

//                     <Image
//                       src={link.icon}
//                       alt={link.name}
//                       width={60}
//                       height={60}
//                       // className="object-contain transition-all duration-300"
//                       className={`object-contain transition-all duration-100 group-hover:brightness-0 group-hover:invert 
//                          ${isHovered && "brightness-0 invert"}`}
//                     />
//                   </div>

//                   {/* Title */}
//                   <p className="text-lg font-bold">{link.name}</p>
//                   <p className="text-lg font-bold">{link.jp}</p>
//                 </div>
//               </SwiperSlide>
//             );
//           })}
//         </Swiper>
//       </Container>
//     </section>
//   );
// }
