// "use client";

// import { getDay_Month_Year } from "@/helper/formateDate";
// import {
//   getMetaValueByMetaName,
//   getMetaValueFromExtra_Fields,
// } from "@/helper/metaHelpers";
// import Image from "next/image";
// import React, { useState } from "react";

// export default function SingleBlogDetailsCard({ blog, settings }) {
//   const [language, setLanguage] = useState("jp");

//   const day = getDay_Month_Year(blog?.created_at, "day");
//   const month = getDay_Month_Year(blog?.created_at, "month");
//   const year = getDay_Month_Year(blog?.created_at, "year");

//   const blog_number = getMetaValueFromExtra_Fields(blog, "blog_number");
//   const engDescription = getMetaValueFromExtra_Fields(
//     blog,
//     "description_secondary"
//   );
//   const jpDescription = blog?.description;

//   const company_email =
//     getMetaValueByMetaName(settings, "company_email") || "";

//   const description =
//     language === "en" && engDescription ? engDescription : jpDescription;

//   return (
//     <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
//       {/* Header */}
//       <div className="flex justify-between items-start sm:items-center bg-gradient-to-b from-[#EEF8E9] to-[#BAFF98] px-4 py-4 gap-3">
//         <h4 className="text-lg sm:text-2xl font-semibold text-[#333333]">
//           {blog?.name}
//         </h4>

//         <div className="flex items-center gap-3">
//           {/* Language Switch */}
//           <div className="flex border rounded-full overflow-hidden">
//             <button
//               onClick={() => setLanguage("jp")}
//               className={`px-4 py-1 text-sm font-medium transition ${
//                 language === "jp"
//                   ? "bg-[#00401A] text-white"
//                   : "bg-white text-[#00401A]"
//               }`}
//             >
//               日本語
//             </button>
//             <button
//               onClick={() => setLanguage("en")}
//               className={`px-4 py-1 text-sm font-medium transition ${
//                 language === "en"
//                   ? "bg-[#00401A] text-white"
//                   : "bg-white text-[#00401A]"
//               }`}
//             >
//               English
//             </button>
//           </div>

//           <div className="bg-[#00401A] text-white h-[40px] sm:h-[56px] rounded-[50px] px-5 flex items-center text-sm sm:text-base">
//             Blog No {blog_number}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="bg-white flex flex-col sm:flex-row gap-4 md:gap-5 px-3 md:px-6 py-5 md:py-10">
//         {/* Image */}
//         <div className="relative rounded-[10px] w-full sm:w-[247px] h-[200px] sm:h-[215px] flex-shrink-0 overflow-hidden">
//           <Image
//             src={blog?.featured_image}
//             alt="blog-image"
//             fill
//             className="object-cover rounded-xl"
//           />
//         </div>

//         {/* Content */}
//         <div className="flex flex-col w-full">
//           <div className="px-1">
//             <div className="flex justify-between text-[#333333] text-xs sm:text-base mb-3 border-b pb-2 border-gray-200">
//               <p>{blog?.sub_title}</p>
//               <p>
//                 {month} {day}th, {year}
//               </p>
//             </div>

//             <div
//               className="text-[#333333] text-sm sm:text-base leading-relaxed"
//               dangerouslySetInnerHTML={{ __html: description }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-2 bg-gradient-to-b from-[#EEF8E9] to-[#BAFF98] px-4 py-4">
//         <p className="text-[#000000] text-sm sm:text-lg md:text-xl font-medium break-all">
//           Email: {company_email}
//         </p>
//         <a
//           href="https://www.osakamasjid.com"
//           className="text-[#000000] text-sm sm:text-lg md:text-xl font-medium hover:underline break-all"
//         >
//           www.osakamasjid.org
//         </a>
//       </div>
//     </div>
//   );
// }
