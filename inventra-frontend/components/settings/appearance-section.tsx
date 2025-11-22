"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Palette } from "lucide-react"
import { SettingsToggle } from "./toggle"

interface AppearanceSectionProps {
  onSuccess: (message: string) => void
  onError: (message: string) => void
}

export function AppearanceSection({ onSuccess }: AppearanceSectionProps) {
  const [theme, setTheme] = useState("dark")
  const [reducedMotion, setReducedMotion] = useState(false)

  const themes = [
    { value: "dark", label: "Dark" },
    { value: "light", label: "Light" },
    { value: "emerald", label: "Emerald Mode" },
  ]

  const accentColors = [
    { value: "emerald", color: "#10b981" },
    { value: "teal", color: "#14b8a6" },
    { value: "blue", color: "#3b82f6" },
    { value: "purple", color: "#a855f7" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/40 rounded-lg p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-500/10 rounded-lg">
          <Palette className="w-5 h-5 text-emerald-400" />
        </div>
        <h2 className="text-xl font-semibold text-slate-100">Appearance</h2>
      </div>

      <div className="space-y-6">
        {/* Theme */}
        <div>
          <label className="text-sm font-medium text-slate-200 mb-3 block">Theme</label>
          <div className="grid grid-cols-3 gap-3">
            {themes.map((t) => (
              <motion.button
                key={t.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setTheme(t.value)
                  onSuccess(`Theme changed to ${t.label}`)
                }}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  theme === t.value
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50"
                }`}
              >
                {t.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Accent Color */}
        <div>
          <label className="text-sm font-medium text-slate-200 mb-3 block">Accent Color</label>
          <div className="flex gap-3">
            {accentColors.map((color) => (
              <motion.button
                key={color.value}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onSuccess(`Accent color changed to ${color.value}`)}
                className="w-8 h-8 rounded-full border-2 border-slate-600 hover:border-slate-400 transition-all"
                style={{ backgroundColor: color.color }}
              />
            ))}
          </div>
        </div>

        {/* Reduced Motion */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/40">
          <div>
            <p className="text-sm font-medium text-slate-200">Reduced Motion</p>
            <p className="text-xs text-slate-400 mt-1">Minimize animations and transitions</p>
          </div>
          <SettingsToggle
            checked={reducedMotion}
            onChange={(checked) => {
              setReducedMotion(checked)
              onSuccess(checked ? "Reduced motion enabled" : "Reduced motion disabled")
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
