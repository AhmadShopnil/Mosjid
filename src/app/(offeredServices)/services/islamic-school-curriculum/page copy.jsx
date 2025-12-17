// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";
// import Container from "@/components/Shared/Container";

// export default function IslamicCurriculum() {
//   return (

//     <Container className=" px-1">

//       {/* Main Grid */}
//       <div className=" flex mt-10 border-2 border-[#FFCE4D] rounded-[40px] p-4 bg-[#F9FFF2]">


//         {/* Left Column */}
//         <div className="space-y-4 w-[40%] ">
        
//           {leftLevels.map((item) => (
//             <LevelCard key={item.no} {...item} align="left" />
//           ))}
//         </div>

//         {/* Center Logo */}
//         <div className="w-[25%] min-w-[240px]  inset-0 flex items-center justify-center pointer-events-none ">
//           <div className=" rounded-full ">
//             <Image
//               src="/images/offerServices/islamicSchoolIcon.svg"
//               alt="Islamic School"
//               width={240}
//               height={240}
//               className=" w-[240px] h-[240px] "
//             />
//           </div>
//         </div>


//         <div />

//         {/* Right Column */}
//         <div className="space-y-4 w-[40%] ">
//           {rightLevels.map((item) => (
//             <LevelCardReverse key={item.no} {...item} align="right" />
//           ))}
//         </div>

//       </div>


//       {/* Bottom Section */}
//       <div
//         className=" "
//       >

//       </div>

//     </Container>

//   );
// }

// function LevelCard({ no, title, align }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: align === "left" ? -30 : 30 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.4 }}
//       className="flex   items-center w-full"
//     >

//       <div className="flex items-center justify-end border-y border-l border-[#FFCE4D] rounded-l-[100px] p-3 w-full
//        h-[120px] bg-white">
//         <p className="text-[20px] w-[90%]  text-right font-bold text-[#B98C20]">{title}</p>
//       </div>

//       <div>
//         <div className="bg-white w-[140px] h-[140px] flex items-center justify-center rounded-[10px] border
//        border-[#FFCE4D] text-[#B98C20] font-bold text-[36px] ">
//           <span>{no}</span>
//         </div>
//       </div>

//     </motion.div>
//   );
// }


// function LevelCardReverse({ no, title, align }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: align === "left" ? -30 : 30 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.4 }}
//       className="flex   items-center w-full"
//     >

//       <div>
//         <div className="bg-white w-[140px] h-[140px] flex items-center justify-center rounded-[10px] border
//        border-[#FFCE4D] text-[#B98C20] font-bold text-[36px] ">
//           <span>{no}</span>
//         </div>
//       </div>
//       <div className="flex items-center justify-start border-y border-r border-[#FFCE4D] rounded-r-[100px] p-3 w-full
//        h-[120px] bg-white">
//         <p className="text-[20px] w-[90%]  text-left font-bold text-[#B98C20]">{title}</p>
//       </div>


//     </motion.div>
//   );
// }



// const leftLevels = [
//   { no: "01", title: "Maktab Foundation" },
//   { no: "02", title: "Primary School + Hifz Continuation" },
//   { no: "03", title: "Elementary + Full Time Hifz" },
//   { no: "04", title: "Middle School + Junior Aalim" },
// ];

// const rightLevels = [
//   { no: "05", title: "High School + Thanaviya Aamma" },
//   { no: "06", title: "Senior High / Pre-University + Thanaviya Khassa" },
//   { no: "07", title: "University + Aaliya (Advanced Level)" },
//   { no: "08", title: "Postgraduate + Aalimiyyah & Takhassus" },
// ];