// "use client"

// import { motion } from "framer-motion"

// export default function MultiSpinner() {
//   return (
//     <motion.div
//       className="fixed inset-0 flex items-center justify-center bg-background z-50"
//       exit={{
//         opacity: 0,
//       }}
//       transition={{
//         duration: 0.4,
//         ease: "easeOut",
//       }}
//     >
//       <div className="relative w-32 h-32">
//         {/* Circle 1 - Innermost - Blue */}
//         <motion.div
//           className="absolute inset-0 rounded-full"
//           animate={{
//             rotate: 360,
//           }}
//           transition={{
//             duration: 2.5,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: "linear",
//           }}
//           style={{
//             borderTop: "4px solid rgb(59, 130, 246)",
//             borderRight: "4px solid transparent",
//             borderBottom: "4px solid transparent",
//             borderLeft: "4px solid transparent",
//           }}
//         />

//         {/* Circle 2 - Middle - Purple */}
//         <motion.div
//           className="absolute inset-2 rounded-full"
//           animate={{
//             rotate: -360,
//           }}
//           transition={{
//             duration: 2,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: "linear",
//           }}
//           style={{
//             borderTop: "4px solid transparent",
//             borderRight: "4px solid rgb(168, 85, 247)",
//             borderBottom: "4px solid transparent",
//             borderLeft: "4px solid transparent",
//           }}
//         />

//         {/* Circle 3 - Outermost - Cyan */}
//         <motion.div
//           className="absolute -inset-2 rounded-full"
//           animate={{
//             rotate: 360,
//           }}
//           transition={{
//             duration: 1.8,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: "linear",
//           }}
//           style={{
//             borderTop: "4px solid transparent",
//             borderRight: "4px solid transparent",
//             borderBottom: "4px solid rgb(34, 211, 238)",
//             borderLeft: "4px solid transparent",
//           }}
//         />
//       </div>
//     </motion.div>
//   )
// }
