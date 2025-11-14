// "use client";

// import React from "react";
// import Container from "../Shared/Container";
// import Link from "next/link";



// export default function BreadcrumbForNested({
//   homeLabel = "Home",
//   currentPage,
//   homeLink = "/",
//   middle,
//   middleLink,
//   middle_second
// }) {
//   return (
//     <div className="w-full h-[50px] md:h-[60px] flex items-center gradient-bredcumb text-sm md:text-lg">
//       <Container className="w-full h-full">
//         <div className="flex h-full">
//           {/* Home Section */}
//           <Link
//             href={homeLink}
//             className="gradient-bredcumb-a  font-medium px-6 flex items-center justify-center  h-full w-[106px] text-[#00401A]"
//             style={{
//               backgroundColor: "#3198A0",
//               clipPath:
//                 "polygon(98.41% 50%, 75% 99.05%, 0.71% 99.05%, 17.77% 50%, 0% 0.95%, 75% 0.95%)",
//             }}
//           >
//             <span>  {homeLabel}</span>
//           </Link>
//           {
//             currentPage ?
//               <Link
//                 href={middleLink}
//                 className="gradient-bredcumb-a  -ml-4 font-medium px-6 flex items-center justify-center  h-full w-[140px] text-[#00401A]"
//                 style={{
//                   backgroundColor: "#3198A0",
//                   clipPath:
//                     "polygon(98.41% 50%, 75% 99.05%, 0.71% 99.05%, 17.77% 50%, 0% 0.95%, 75% 0.95%)",
//                 }}
//               >
//                 <span>  {middle}</span>
//               </Link>
//               :
//               <div
//                 className="text-[#52B920] flex items-center justify-center h-full w-[200px] -ml-5 overflow-hidden pr-4"
//                 style={{
//                   clipPath:
//                     "polygon(85.35% 50%, 75% 99.05%, 0.71% 99.05%, 12.71% 50%, 0% 0.95%, 75% 0.95%)",
//                   backgroundColor: "#ffffff",
//                 }}
//               >
//                 <span>{middle}</span>
//               </div>

//           }

//           {middle_second && <Link
//             href={middleLink}
//             className="gradient-bredcumb-a pr-4  -ml-6 font-medium  flex items-center justify-center  h-full w-[275px] text-[#00401A]"
//             style={{
//               backgroundColor: "#3198A0",
//               clipPath:
//                 "polygon(85.35% 50%, 75% 99.05%, 0.71% 99.05%, 12.71% 50%, 0% 0.95%, 75% 0.95%)",
//             }}
//           >
//             <span>  {middle_second}</span>
//           </Link>}


//           {/* Dynamic Section */}
//           {
//             currentPage && <div
//               className="text-[#52B920] flex items-center justify-center h-full w-[255px] -ml-13 overflow-hidden pr-4"
//               style={{
//                 clipPath:
//                   "polygon(85.35% 50%, 75% 99.05%, 0.71% 99.05%, 12.71% 50%, 0% 0.95%, 75% 0.95%)",
//                 backgroundColor: "#ffffff",
//               }}
//             >
//               <span>{currentPage}</span>
//             </div>
//           }

//         </div>
//       </Container>
//     </div>
//   );
// }
