"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell } from "lucide-react"
import { SettingsToggle } from "./toggle"

interface NotificationsSectionProps {
  onSuccess: (message: string) => void
  onError: (message: string) => void
}

export function NotificationsSection({ onSuccess }: NotificationsSectionProps) {
  const [notifications, setNotifications] = useState({
    "low-stock": true,
    "out-of-stock": true,
    "delivery-updates": true,
    "reorder-updates": false,
    "system-notifications": true,
  })

  const notificationSettings = [
    { key: "low-stock", label: "Low Stock Alerts", description: "Get notified when items reach low stock levels" },
    { key: "out-of-stock", label: "Out of Stock Alerts", description: "Get notified when items are out of stock" },
    { key: "delivery-updates", label: "Delivery Updates", description: "Receive updates on incoming shipments" },
    { key: "reorder-updates", label: "Reorder Updates", description: "Get notified about reorder suggestions" },
    { key: "system-notifications", label: "System Notifications", description: "Receive general system updates" },
  ]

  const handleToggle = (key: string) => {
    const newState = { ...notifications, [key]: !notifications[key] }
    setNotifications(newState)
    onSuccess(`${notificationSettings.find((n) => n.key === key)?.label} updated`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/40 rounded-lg p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-500/10 rounded-lg">
          <Bell className="w-5 h-5 text-emerald-400" />
        </div>
        <h2 className="text-xl font-semibold text-slate-100">Notification Settings</h2>
      </div>

      <div className="space-y-4">
        {notificationSettings.map((setting) => (
          <motion.div
            key={setting.key}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start justify-between p-3 rounded-lg hover:bg-slate-700/20 transition-colors"
          >
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-200">{setting.label}</p>
              <p className="text-xs text-slate-400 mt-1">{setting.description}</p>
            </div>
            <SettingsToggle
              checked={notifications[setting.key as keyof typeof notifications]}
              onChange={() => handleToggle(setting.key)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
