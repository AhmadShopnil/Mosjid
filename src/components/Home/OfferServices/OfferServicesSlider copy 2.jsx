// "use client";

// import React, { useRef, useState, useEffect } from "react";
// import Image from "next/image";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { splitBySlash } from "@/helper/splitBySpace";
// import { getImageUrl } from "@/helper/getImageUrl";
// import { motion } from "framer-motion";

// export default function OfferServicesSlider({
//   services,
//   offered_services_ExtraData,
// }) {
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const scrollRef = useRef(null);
//   const intervalRef = useRef(null);

//   // Duplicate services for infinite loop
//   const loopServices = [...services, ...services];

//   const heading_part_1 = splitBySlash(offered_services_ExtraData?.title)[0];
//   const heading_part_2 = splitBySlash(offered_services_ExtraData?.title)[1];
//   const image = getImageUrl(offered_services_ExtraData?.image_media);
//   const icon = getImageUrl(offered_services_ExtraData?.background_media);

//   // Manual scroll buttons
//   const scroll = (direction) => {
//     if (!scrollRef.current) return;
//     const { scrollLeft, clientWidth } = scrollRef.current;
//     const scrollAmount = clientWidth * 0.7;

//     scrollRef.current.scrollTo({
//       left:
//         direction === "left"
//           ? scrollLeft - scrollAmount
//           : scrollLeft + scrollAmount,
//       behavior: "smooth",
//     });
//   };

//   // Auto infinite scroll
//   const startAutoScroll = () => {
//     if (!scrollRef.current) return;

//     intervalRef.current = setInterval(() => {
//       scrollRef.current.scrollLeft += 1.2;

//       // Reset smoothly when half reached
//       if (
//         scrollRef.current.scrollLeft >=
//         scrollRef.current.scrollWidth / 2
//       ) {
//         scrollRef.current.scrollLeft = 0;
//       }
//     }, 16); // ~60fps
//   };

//   const stopAutoScroll = () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }
//   };

//   useEffect(() => {
//     startAutoScroll();
//     return () => stopAutoScroll();
//   }, []);

//   return (
//     <div className="relative px-4 py-10">
//       <div className="max-w-7xl mx-auto">
//         {/* Top Section */}
//         <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
//           <div className="flex justify-between gap-2.5 gradient-border_b mb-4 sm:mb-0 pb-3 items-center">
//             <Image src={icon} alt="Icon" width={60} height={64} />
//             <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]">
//               <p>
//                 <span className="text-[#F7BA2A]">{heading_part_1}</span>{" "}
//                 {heading_part_2}
//               </p>
//               <p>{offered_services_ExtraData?.sub_title}</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 sm:gap-4">
//             <Image
//               src={image}
//               alt="Arabic text"
//               width={252}
//               height={70}
//               className="object-contain hidden sm:flex"
//             />
//             <Image
//               src={image}
//               alt="Arabic text"
//               width={160}
//               height={50}
//               className="object-contain sm:hidden"
//             />
//           </div>
//         </div>

//         {/* Slider */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, ease: "easeOut" }}
//           viewport={{ once: true }}
//           className="relative"
//         >
//           {/* Scroll Container */}
//           <div
//             ref={scrollRef}
//             onMouseEnter={stopAutoScroll}
//             onMouseLeave={startAutoScroll}
//             className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-10"
//           >
//             {loopServices.map((service, index) => (
//               <motion.div
//                 key={`${service.id}-${index}`}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{
//                   duration: 0.6,
//                   delay: index * 0.05,
//                 }}
//                 viewport={{ once: true }}
//               >
//                 <div
//                   className="flex-shrink-0 w-[150px] h-[250px] sm:w-[180px] sm:h-[300px] md:w-[195px] md:h-[360px]
//                   flex flex-col items-center justify-between text-center rounded-full shadow-xl bg-white mx-auto cursor-pointer
//                   group islamicBookHome p-2 sm:p-3"
//                   onMouseEnter={() => setHoveredCard(service.id)}
//                   onMouseLeave={() => setHoveredCard(null)}
//                 >
//                   <div className="p-4 sm:p-5 rounded-full mt-2 sm:mt-4 bg-[#F8F8F8] w-[100px] h-[100px] flex justify-center items-center">
//                     <Image
//                       src={service?.featured_image}
//                       alt={service?.name}
//                       width={60}
//                       height={60}
//                       className="object-contain"
//                     />
//                   </div>

//                   <div className="flex flex-col items-center mt-2 px-3">
//                     <p className="text-lg md:text-xl font-bold text-[#333333] leading-6 md:leading-8">
//                       {service?.name}
//                     </p>
//                   </div>

//                   <div className="pb-4">
//                     <Image
//                       src={
//                         hoveredCard === service.id
//                           ? "/images/offerServices/hover.png"
//                           : "/images/offerServices/1.png"
//                       }
//                       alt="Details Button"
//                       width={45}
//                       height={45}
//                     />
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Left Arrow */}
//           <button
//             onClick={() => scroll("left")}
//             className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-green-50"
//           >
//             <ChevronLeft className="w-5 h-5 text-gray-700" />
//           </button>

//           {/* Right Arrow */}
//           <button
//             onClick={() => scroll("right")}
//             className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-green-50"
//           >
//             <ChevronRight className="w-5 h-5 text-gray-700" />
//           </button>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
