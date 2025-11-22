"use client"

import { motion } from "framer-motion"

interface AlertsHeaderProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export function AlertsHeader({ searchTerm, setSearchTerm }: AlertsHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-100 mb-2">Alerts</h1>
          <p className="text-slate-400">Track important inventory and order notifications</p>
        </div>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-6"
      >
        <div className="relative max-w-md">
          <span className="absolute left-3 top-3 text-slate-500">🔍</span>
          <input
            type="text"
            placeholder="Search alerts…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
