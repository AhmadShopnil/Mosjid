
// import Container from "@/components/Shared/Container";
// import Image from "next/image";
// import DuaCard from "./DuaCard";
// import Link from "next/link";
// import { getDua, getPage, getSettings } from "@/helper/actions";
// import DuaCardNew from "./DuaCardNew";
// import { getImageUrl } from "@/helper/getImageUrl";
// import { splitBySlash } from "@/helper/splitBySpace";
// import { getMetaValueByMetaName } from "@/helper/metaHelpers";
// import { FaLongArrowAltRight } from "react-icons/fa";

// const duas = [
//   {
//     id: 1,
//     title: "اسم الدعاء",
//     arabic:
//       "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِينَ",
//     japanese: "主よ、私たちを不正を働く人々と一緒にしないでください。",
//     meaning: "主よ、私たちを不正を働く人々と一緒にしないでください。",
//   },
//   {
//     id: 2,
//     title: "اسم الدعاء",
//     arabic:
//       "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِينَ",
//     japanese: "主よ、私たちを不正を働く人々と一緒にしないでください。",
//     meaning: "主よ、私たちを不正を働く人々と一緒にしないでください。",
//   },
//   {
//     id: 3,
//     title: "اسم الدعاء",
//     arabic:
//       "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِينَ",
//     japanese: "主よ、私たちを不正を働く人々と一緒にしないでください。",
//     meaning: "主よ、私たちを不正を働く人々と一緒にしないでください。",
//   },
//   {
//     id: 4,
//     title: "اسم الدعاء",
//     arabic:
//       "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِينَ",
//     japanese: "主よ、私たちを不正を働く人々と一緒にしないでください。",
//     meaning: "主よ、私たちを不正を働く人々と一緒にしないでください。",
//   },
// ]



// export default async function DuaSection() {
//   const homePage = await getPage("home-sections-heading-management")
//   const settings = await getSettings()
//   const sections = homePage?.sections_on_api;

//   const duas = await getDua()
//   const dua_extraData = sections.find((s) => s.title_slug === "dua");


//   const heading_part_1 = splitBySlash(dua_extraData?.title)[0]
//   const heading_part_2 = splitBySlash(dua_extraData?.title)[1]

//   const arabic_image = getImageUrl(dua_extraData?.image_media)
//   const image_icon = getImageUrl(dua_extraData?.background_media)

//   const find_more_dua_button = dua_extraData?.custom_information.find((item) => item.label === "find_more_dua_button")
//   const read_more = getMetaValueByMetaName(settings, "read_more") || "";
//   // console.log("dua_extraData", heading_part_1)



//   return (
//     <div className="pt-18 pb-10 "
//       // style={{
//       //   background: "linear-gradient(to bottom, rgba(245, 255, 250, 1), rgba(206, 255, 227, 1))",
//       // }}
//       id="dua"
//     >
//       <Container className=" px-4">
//         {/* heading */}
//         <div className="flex flex-col sm:flex-row  justify-between items-center mb-8">

//           <div className="flex justify-between items-center gap-2 gradient-border_b mb-4 sm:mb-0 pb-3  ">
//             <Image
//               src={image_icon}
//               // src="/images/dua/icon.png"
//               alt="Book Icon"
//               width={65}
//               height={65}
//               className=""
//             />
//             <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]">
//               <p><span className="text-[#F7BA2A]">{heading_part_1}</span> {heading_part_2}</p>
//               <p>{dua_extraData?.sub_title}</p>

//             </div>
//           </div>

//           <div className="flex gap-4 items-center justify-center ">
//             <Image
//               // src="/images/others/duaarabic.png"
//               src={arabic_image}
//               alt="mosque"
//               width={150}
//               height={50}
//               className="mx-auto "
//             />
//             <div>
//               <Link
//                 href="/dua"
//                 className=" border rounded-[50px] font-bold text-[#00401A]  border-[#00401A] text-base py-3 px-5
//                  hover:bg-[#00401A] hover:text-white transition-colors duration-400"
//               >
//                 {find_more_dua_button?.value}
//               </Link>
//             </div>
//           </div>
//         </div>
//         {/* Dua list */}
//         <div className="grid grid-cols-1 md:grid-cols-2  gap-4 justify-center items-center">
//           {/* Dua Card  */}
//           {duas.map((dua, i) => (
//             <div
//               key={i}
//               className="flex justify-between items-center border  border-[#D9E2DD] p-1.5  rounded-[10px]
//                                       relative z-10 bg-white"
//             >
//               {/* Left Content */}
//               <div className="flex items-center gap-2 sm:gap-2">
//                 {/* icon */}
//                 <div
//                   className="bg-[#F2F2F2] border border-[#E6ECE8] w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-[10px] 
//                                               p-1.5 md:p-2 flex justify-center items-center "
//                 >
//                   <Image
//                     src="/images/dua/icon.png"
//                     alt="icon"
//                     width={40}
//                     height={38}
//                     className='hidden sm:flex'
//                   />
//                   <Image
//                     src="/images/dua/icon.png"
//                     alt="icon"
//                     width={24}
//                     height={34}
//                     className='flex sm:hidden'
//                   />
//                 </div>
//                 <div>
//                   <p className="sm:hidden text-[#00401A] font-semibold text-[12px] ">{dua?.sub_title.slice(0, 18)}</p>
//                   <p className="hidden sm:block text-[#00401A] font-semibold text-[15px]">{dua?.sub_title.slice(0, 130)}</p>
//                   <Link
//                    href={`/dua`}
//                     className="text-[#001609] font-semibold sm:font-bold text-xs md:text-sm
//                                                        hover:text-[#F7BA2A] flex gap-1 items-center mt-1 "
//                   >
//                     {read_more}
//                     <span className='mt-0.5'><FaLongArrowAltRight /></span>
//                   </Link>
//                 </div>
//               </div>

//             </div>

//           ))}
//         </div>
//       </Container>
//     </div>
//   );
// }
