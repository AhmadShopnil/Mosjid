// "use client";

// import Container from "@/components/Shared/Container";
// import { getMetaValueFromExtraFields } from "@/helper/metaHelpers";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// // Import Swiper
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";

// // Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// export default function HeroSectionSlider({ sliders }) {
//   return (
//     <section className="bg-green-50 h-[570px] relative">
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         navigation
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 5000, disableOnInteraction: false }}
//         loop
//         className="h-full w-full"
//       >
//         {sliders?.map((slide, index) => (
//           <SwiperSlide key={index}>
//             <div className="relative h-full w-full">
//               {/* Full-width Banner Image */}
//               <div className="absolute inset-0 w-full h-full">
//                 <Image
//                   src={getMetaValueFromExtraFields(slide, "banner_image") || "/images/banner/ban1.png"}
//                   alt={slide?.name || "Hero Banner"}
//                   fill
//                   priority
//                   className="object-cover object-center"
//                 />
//               </div>

//               {/* Content on top of the banner */}
//               <Container className="relative flex h-full">
//                 <div className="absolute top-1/4 w-[40%]">
//                   <h3 className="text-2xl 2xl:text-4xl text-[#00401A] font-bold leading-12">
//                     {slide?.name}
//                   </h3>
//                   <p className="text-lg 2xl:text-2xl text-[#00401A] font-bold leading-10 my-2">
//                     {slide?.sub_title}
//                   </p>
//                   <p className="text-base text-[#001609] mb-10">
//                     {getMetaValueFromExtraFields(slide, "short_description")}
//                   </p>
//                   <Link
//                     href="/"
//                     className="bg-[#F7BA2A] px-5 py-3 rounded-xl text-white text-lg hover:bg-[#d4a129]"
//                   >
//                     Read more
//                   </Link>
//                 </div>
//               </Container>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   );
// }
