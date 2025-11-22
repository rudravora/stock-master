"use client"

import { motion } from "framer-motion"
import { RotateCcw, Eye } from "lucide-react"

interface StockHistoryEntry {
  date: string
  change: number
  type: "Added" | "Removed" | "Adjustment"
  reason: string
  user: string
  resultingQty: number
}

interface StockHistoryTableProps {
  data: StockHistoryEntry[]
}

export function StockHistoryTable({ data }: StockHistoryTableProps) {
  const getChangeColor = (type: string) => {
    switch (type) {
      case "Added":
        return "text-emerald-400"
      case "Removed":
        return "text-rose-400"
      case "Adjustment":
        return "text-blue-400"
      default:
        return "text-slate-400"
    }
  }

  const getChangeIcon = (change: number) => {
    return change > 0 ? "+" : ""
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  }

  return (
    <motion.div className="space-y-2" variants={containerVariants} initial="hidden" animate="visible">
      {/* Header */}
      <div className="grid grid-cols-6 md:grid-cols-7 gap-4 px-4 py-3 border-b border-slate-700/40 text-xs font-medium text-slate-400 uppercase">
        <div>Date</div>
        <div>Type</div>
        <div>Change</div>
        <div className="hidden md:block">Reason</div>
        <div className="hidden md:block">User</div>
        <div>Qty</div>
        <div>Action</div>
      </div>

      {/* Rows */}
      {data.map((entry, index) => (
        <motion.div
          key={index}
          variants={rowVariants}
          className="grid grid-cols-6 md:grid-cols-7 gap-4 px-4 py-3 bg-slate-800/20 hover:bg-slate-800/40 rounded-lg border border-slate-700/20 transition-colors items-center text-sm"
        >
          <div className="text-slate-300 font-mono text-xs">{new Date(entry.date).toLocaleDateString()}</div>
          <div>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                entry.type === "Added"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : entry.type === "Removed"
                    ? "bg-rose-500/20 text-rose-400"
                    : "bg-blue-500/20 text-blue-400"
              }`}
            >
              {entry.type}
            </span>
          </div>
          <div className={`font-semibold ${getChangeColor(entry.type)}`}>
            {getChangeIcon(entry.change)}
            {Math.abs(entry.change).toLocaleString()}
          </div>
          <div className="hidden md:block text-slate-400 truncate">{entry.reason}</div>
          <div className="hidden md:block text-slate-400 text-xs">{entry.user}</div>
          <div className="text-emerald-400 font-mono font-semibold">{entry.resultingQty.toLocaleString()}</div>
          <div className="flex gap-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-1 hover:bg-slate-700/50 rounded transition-colors"
              title="View details"
            >
              <Eye className="w-4 h-4 text-slate-400 hover:text-emerald-400" />
            </motion.button>
            {index === 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-1 hover:bg-slate-700/50 rounded transition-colors"
                title="Undo (within 5 mins)"
              >
                <RotateCcw className="w-4 h-4 text-slate-400 hover:text-teal-400" />
              </motion.button>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
