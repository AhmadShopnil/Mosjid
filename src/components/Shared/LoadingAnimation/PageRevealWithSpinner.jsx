"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import MultiSpinner from "./MultiSpinner"

export default function PageRevealWithSpinner({ children }) {
  const pathname = usePathname()
  const [showSpinner, setShowSpinner] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setShowSpinner(true)
    setShowContent(false)

    const spinnerTimer = setTimeout(() => setShowSpinner(false), 500)
    const contentTimer = setTimeout(() => setShowContent(true), 1200)

    return () => {
      clearTimeout(spinnerTimer)
      clearTimeout(contentTimer)
    }
  }, [pathname])

  return (
    <>
      {/* Spinner animation */}
      <AnimatePresence mode="wait">{showSpinner && <MultiSpinner key={`spinner-${pathname}`} />}</AnimatePresence>


      {/* only animates after spinner disappears */}

        {showContent && (
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
              ease: [0.12, 0.0, 0.39, 1.0],
            }}
            style={{
              transformOrigin: "center",
              willChange: "transform",
            }}
            className="w-full"
          >
            {children}
          </motion.div>
        )}
    
    </>
  )
}
