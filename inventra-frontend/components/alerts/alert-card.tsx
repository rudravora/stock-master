"use client"

import { motion } from "framer-motion"
import { AlertTriangle, AlertOctagon, BellRing, Package, Truck, CheckCircle2 } from "lucide-react"
import type { Alert } from "@/lib/mock-alerts"

interface AlertCardProps {
  alert: Alert
  isRead: boolean
  onToggleRead: () => void
}

export function AlertCard({ alert, isRead, onToggleRead }: AlertCardProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "low-stock":
        return <AlertTriangle className="w-5 h-5" />
      case "out-of-stock":
        return <AlertOctagon className="w-5 h-5" />
      case "pending-delivery":
        return <Truck className="w-5 h-5" />
      case "reorder-pending":
        return <Package className="w-5 h-5" />
      case "order-received":
        return <CheckCircle2 className="w-5 h-5" />
      default:
        return <BellRing className="w-5 h-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "low-stock":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      case "out-of-stock":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      case "pending-delivery":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      case "reorder-pending":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20"
      case "order-received":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/20 text-red-300"
      case "medium":
        return "bg-yellow-500/20 text-yellow-300"
      case "low":
        return "bg-slate-500/20 text-slate-300"
      default:
        return "bg-slate-500/20 text-slate-300"
    }
  }

  return (
    <motion.div
      className={`relative group bg-slate-800/30 backdrop-blur-xl border border-slate-700/40 rounded-lg p-5 overflow-hidden transition-all ${
        isRead ? "opacity-60" : ""
      }`}
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Unread Indicator */}
      {!isRead && <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />}

      <div className="flex gap-4">
        {/* Icon */}
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(alert.type)}`}
        >
          {getIcon(alert.type)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-slate-100 font-semibold mb-1">{alert.title}</h3>
              <p className="text-slate-400 text-sm mb-3">{alert.description}</p>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-500">{alert.timestamp}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                  {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)} Severity
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onToggleRead}
                className="px-3 py-1 bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-sm rounded transition-colors"
              >
                {isRead ? "Unread" : "Mark Read"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-sm rounded transition-colors"
              >
                View Item
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
