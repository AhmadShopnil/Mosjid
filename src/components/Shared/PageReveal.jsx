"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageReveal({ children }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{
        scaleX: 0,
        opacity: 0.6,
      }}
      animate={{
        scaleX: 1,
        opacity: 1,
      }}
      exit={{
        scaleX: 0,
        opacity: 0,
      }}
      transition={{
        duration: 0.9,
        ease: [0.12, 0.0, 0.39, 1.0], // ✅ slow start → fast end
      }}
      style={{
        transformOrigin: "center",
        willChange: "transform",
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
