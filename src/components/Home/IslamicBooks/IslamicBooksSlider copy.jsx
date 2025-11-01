// "use client";
// import React, { useRef, useEffect } from "react";
// import Image from "next/image";
// import { ChevronLeft, ChevronRight, Download } from "lucide-react";
// import Container from "@/components/Shared/Container";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

// const books = [
//   { id: 1, name: "Book Name", writer: "Writer Name", selected: false },
//   { id: 2, name: "Book Name", writer: "Writer Name", selected: true },
//   { id: 3, name: "Book Name", writer: "Writer Name", selected: false },
//   { id: 4, name: "Book Name", writer: "Writer Name", selected: false },
//   { id: 5, name: "Book Name", writer: "Writer Name", selected: false },
// ];

// export default function IslamicBooksSlider({books}) {
//   const prevRef = useRef(null);
//   const nextRef = useRef(null);
//   const swiperRef = useRef(null);

//   useEffect(() => {
//     if (
//       swiperRef.current &&
//       prevRef.current &&
//       nextRef.current &&
//       swiperRef.current.params.navigation
//     ) {
//       swiperRef.current.params.navigation.prevEl = prevRef.current;
//       swiperRef.current.params.navigation.nextEl = nextRef.current;
//       swiperRef.current.navigation.init();
//       swiperRef.current.navigation.update();
//     }
//   }, []);

//   return (
//     <div className="w-full max-w-[1780px] mx-auto py-12 bg-white ">
//       <div className=" flex flex-col lg:flex-row items-center gap-10">
//         {/* LEFT IMAGE */}
//         <div className="w-full lg:w-[32%] flex  h-full ">
//           <Image
//             src="/images/isamicBooks/bookImage.png"
//             alt="Islamic Illustration"
//             width={600}
//             height={600}
//             className="object-contain "
//           />
//         </div>

//         {/* RIGHT CONTENT */}
//         <div className="w-full lg:w-[60%] ">
//           {/* Top Section */}
//           <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
//             <div>


//     <div className="flex justify-between items-center gap-2 gradient-border_b mb-4 sm:mb-0 pb-3  ">
//           <Image
//             src="/images/isamicBooks/bookIcon.png"
//             alt="Book Icon"
//             width={55}
//             height={55}
//             className=""
//           />

//           <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]">
//             <p><span className="text-[#F7BA2A]">Islamic</span> Books </p>
//             <p>イスラム教の書籍</p>

//           </div>
//         </div>

//               {/* <div className="flex items-center gap-2 sm:gap-3 gradient-border_b pb-3 mb-4 sm:mb-0">
//                 <Image
//                   src="/images/isamicBooks/bookIcon.png"
//                   alt="Book Icon"
//                   width={28}
//                   height={24}
//                 />
//                 <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
//                   <span className="text-[#F7BA2A]">Islamic</span>{" "}
//                   <span className="text-green-700">Books</span>
//                 </h2>
//               </div> */}
            
//             </div>

//             <div className="flex items-center gap-3 sm:gap-4 ">
//               <Image
//                 src="/images/isamicBooks/arabic-islamicbooks.png"
//                 alt="Arabic text"
//                 width={160}
//                 height={50}
//                 className="object-contain hidden sm:flex"
//               />
//                <Image
//                 src="/images/isamicBooks/arabic-islamicbooks.png"
//                 alt="Arabic text"
//                 width={135}
//                 height={40}
//                 className="object-contain sm:hidden"
//               />
//               <button className="border border-[#00401A] text-[#00401A]
//                font-bold rounded-full px-5 py-2.5 text-sm sm:text-base cursor-pointer hover:bg-[#00401A] hover:text-white transition-colors duration-400">
//                 Find More Books
//               </button>
//             </div>
//           </div>

//           {/* BOOK SLIDER */}
//           <div className="relative">
//             {/* Swiper Slider */}
//             <Swiper
//               modules={[Navigation]}
//               spaceBetween={20}
//               slidesPerView={4}
//               loop={true}
//               onSwiper={(swiper) => (swiperRef.current = swiper)}
//               breakpoints={{
//                 320: { slidesPerView: 1.5 },
//                 370: { slidesPerView: 2 },
//                 420: { slidesPerView: 2.5 },
//                  470: { slidesPerView: 3 },
//                  500: { slidesPerView: 3.3 },
//                 640: { slidesPerView: 2.8 },
//                 840: { slidesPerView: 3.8 },
//                 1024: { slidesPerView: 2.7 },
//                 1424: { slidesPerView: 3.4 },
//                 1524: { slidesPerView: 4 },
//               }}
//             >
//               {books.map((book) => (
//                 <SwiperSlide key={book.id}>
//                 <div
//                 className={`w-[150px] h-[250px] sm:w-[240px] sm:h-[380px] relative flex flex-col 
//                     items-center justify-between text-center rounded-full 
//                     shadow-md bg-white mx-auto cursor-pointer
//                     group hover:border hover:border-green-500
//                 `}
//                 >
//                 <div className="p-4 sm:p-9 rounded-full mt-2 sm:mt-4 bg-[#F8F8F8]">
//                     <Image
//                     src={book?.featured_image}
//                     // src="/images/isamicBooks/bookIcon.png"
//                     alt="Book"
//                     width={70}
//                     height={70}
//                     className=" flex sm:hidden"
//                     />
//                       <Image
//                     src={book?.featured_image}
//                     alt="Book"
//                     width={90}
//                     height={90}
//                     className="hidden sm:flex"
//                     />
//                 </div>

//                 <div className="flex flex-col items-center mt-4">
//                     <p className="text-lg sm:text-xl font-bold text-[#333333]">{book?.name}</p>
//                     <p className="text-xs sm:text-sm text-[#333333]">{book?.sub_title}</p>
//                 </div>

//                 <div className="pb-4">
//                     <button
//                     className={`cursor-pointer  p-2 rounded-full border border-gray-300 text-gray-300
//                         transition-colors duration-300
//                         group-hover:border-orange-400 group-hover:text-orange-400
//                     `}
//                     >
//                     <Download className="w-4 h-4" />
//                     </button>
//                 </div>
//                 </div>

//                 </SwiperSlide>
//               ))}
//             </Swiper>

//             {/* Left Arrow */}
//             <button
//               ref={prevRef}
//               className="cursor-pointer  absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-1 hover:bg-green-50"
//             >
//               <ChevronLeft className="w-5 h-5 text-gray-700" />
//             </button>

//             {/* Right Arrow */}
//             <button
//               ref={nextRef}
//               className="cursor-pointer absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-1 hover:bg-green-50"
//             >
//               <ChevronRight className="w-5 h-5 text-gray-700" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
