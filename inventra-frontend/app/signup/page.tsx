"use client"

import SignupForm from "@/components/signup-form"
import { motion } from "framer-motion"

export default function SignupPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950" />

      <motion.div
        className="fixed top-20 -left-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl"
        style={{ backgroundColor: "rgba(16, 185, 129, 0.3)" }}
        animate={{ x: [0, 50, 0], y: [0, 80, 0] }}
        transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed top-40 -right-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl"
        style={{ backgroundColor: "rgba(13, 148, 136, 0.3)" }}
        animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
        transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed -bottom-8 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl"
        style={{ backgroundColor: "rgba(16, 185, 129, 0.3)" }}
        animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
        transition={{ duration: 28, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, duration: 0.6 }}
        >
          <SignupForm />
        </motion.div>
      </div>
    </main>
  )
}
