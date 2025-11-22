"use client"

import { motion } from "framer-motion"
import type { Alert } from "@/lib/mock-alerts"

interface AlertsSummaryProps {
  alerts: Alert[]
  totalAlerts: number
}

export function AlertsSummary({ alerts, totalAlerts }: AlertsSummaryProps) {
  const lowStockCount = alerts.filter((a) => a.type === "low-stock").length
  const outOfStockCount = alerts.filter((a) => a.type === "out-of-stock").length
  const pendingDeliveryCount = alerts.filter((a) => a.type === "pending-delivery").length

  const statCards = [
    { label: "Total Alerts", value: totalAlerts, color: "text-slate-400" },
    { label: "Low Stock", value: lowStockCount, color: "text-yellow-400" },
    { label: "Out of Stock", value: outOfStockCount, color: "text-red-400" },
    { label: "Pending Deliveries", value: pendingDeliveryCount, color: "text-blue-400" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 + index * 0.05 }}
          className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/40 rounded-lg p-4 hover:border-slate-700/60 transition-colors"
        >
          <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
          <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
