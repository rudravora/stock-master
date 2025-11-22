"use client"

import { motion } from "framer-motion"
import { Package, AlertTriangle, CheckCircle, MoreVertical } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "stock",
    title: "Stock Updated",
    desc: "Laptop inventory increased by 15",
    time: "2 hours ago",
    icon: Package,
  },
  {
    id: 2,
    type: "alert",
    title: "Low Stock Alert",
    desc: "Monitor stock falling below threshold",
    time: "4 hours ago",
    icon: AlertTriangle,
  },
  {
    id: 3,
    type: "complete",
    title: "Order Completed",
    desc: "Order #12345 has been fulfilled",
    time: "1 day ago",
    icon: CheckCircle,
  },
]

export function DashboardActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 }}
      className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold text-slate-100 mb-6">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon
          const colorMap = {
            stock: "bg-emerald-500/10 text-emerald-400",
            alert: "bg-amber-500/10 text-amber-400",
            complete: "bg-sky-500/10 text-sky-400",
          }

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + activity.id * 0.05 }}
              className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/20 hover:bg-slate-800/40 transition-colors"
            >
              <div className={`p-2 rounded-lg ${colorMap[activity.type as keyof typeof colorMap]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-100">{activity.title}</p>
                <p className="text-sm text-slate-400">{activity.desc}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">{activity.time}</span>
                <button className="p-1 hover:bg-slate-700/40 rounded transition-colors">
                  <MoreVertical className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
