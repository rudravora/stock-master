"use client"

import { motion } from "framer-motion"

interface SettingsToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

export function SettingsToggle({ checked, onChange }: SettingsToggleProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? "bg-emerald-500" : "bg-slate-700"
      }`}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className={`inline-block h-5 w-5 transform rounded-full bg-white ${checked ? "translate-x-5" : "translate-x-0.5"}`}
      />
    </motion.button>
  )
}
