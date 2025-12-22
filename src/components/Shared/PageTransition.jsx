"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const variants = {
  initial: (direction) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.98,
  }),
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  }),
};

export default function PageTransition({
  children,
}) {
  const pathname = usePathname();

  // simple direction logic (can be improved later)
  const direction = pathname.length % 2 === 0 ? 1 : -1;

  return (
    <motion.div
      key={pathname}
      custom={direction}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
