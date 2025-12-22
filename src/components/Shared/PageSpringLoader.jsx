"use client";

import { motion } from "framer-motion";

export default function PageSpringLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <motion.div
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 18,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="w-14 h-14 rounded-full border-4 border-yellow-400 border-t-transparent"
      />
    </div>
  );
}
