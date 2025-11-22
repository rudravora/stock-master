"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function CornerRevealTransition() {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    // Trigger animation on mount
    setIsActive(true)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-40"
      style={{
        background: "linear-gradient(135deg, #10b981 0%, #0d9488 100%)",
      }}
      initial={{ clipPath: "circle(0% at 0% 0%)" }}
      animate={isActive ? { clipPath: "circle(150% at 0% 0%)" } : {}}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onAnimationComplete={() => {
        setIsActive(false)
      }}
    />
  )
}
