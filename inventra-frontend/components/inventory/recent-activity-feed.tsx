"use client"

import { motion } from "framer-motion"
import { Inbox, Truck, AlertCircle, RotateCw } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Activity {
  id: number
  event: string
  timestamp: string
  icon: "inbox" | "truck" | "alert" | "repeat"
}

interface RecentActivityFeedProps {
  activities: Activity[]
}

export function RecentActivityFeed({ activities }: RecentActivityFeedProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "inbox":
        return <Inbox className="w-4 h-4" />
      case "truck":
        return <Truck className="w-4 h-4" />
      case "alert":
        return <AlertCircle className="w-4 h-4" />
      case "repeat":
        return <RotateCw className="w-4 h-4" />
      default:
        return null
    }
  }

  const getIconColor = (iconName: string) => {
    switch (iconName) {
      case "inbox":
        return "text-emerald-400 bg-emerald-500/10"
      case "truck":
        return "text-teal-400 bg-teal-500/10"
      case "alert":
        return "text-rose-400 bg-rose-500/10"
      case "repeat":
        return "text-blue-400 bg-blue-500/10"
      default:
        return "text-slate-400 bg-slate-500/10"
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  }

  return (
    <Card className="bg-slate-900/40 backdrop-blur-xl border-slate-700/40 p-6">
      <h3 className="font-serif text-lg font-bold text-white mb-4">Recent Activity</h3>
      <motion.div className="space-y-3" variants={containerVariants} initial="hidden" animate="visible">
        {activities.map((activity) => (
          <motion.div key={activity.id} variants={itemVariants} className="flex items-start gap-3">
            <div className={`p-2 rounded-lg flex-shrink-0 mt-1 ${getIconColor(activity.icon)}`}>
              {getIcon(activity.icon)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-300 font-medium">{activity.event}</p>
              <p className="text-xs text-slate-500">{activity.timestamp}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Card>
  )
}
