"use client"

import { motion } from "framer-motion"
import { AlertCard } from "./alert-card"
import type { Alert } from "@/lib/mock-alerts"

interface AlertsListProps {
  alerts: Alert[]
  readAlerts: number[]
  onToggleRead: (id: number) => void
}

export function AlertsList({ alerts, readAlerts, onToggleRead }: AlertsListProps) {
  if (alerts.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
        <p className="text-slate-400">No alerts found</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="space-y-4"
    >
      {alerts.map((alert, index) => (
        <motion.div
          key={alert.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + index * 0.05 }}
        >
          <AlertCard alert={alert} isRead={readAlerts.includes(alert.id)} onToggleRead={() => onToggleRead(alert.id)} />
        </motion.div>
      ))}
    </motion.div>
  )
}
