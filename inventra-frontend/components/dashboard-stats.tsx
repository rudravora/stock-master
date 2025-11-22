"use client"

import { Package, AlertCircle, ShoppingCart, Folder, TrendingUp } from "lucide-react"

const stats = [
  {
    label: "Items in Stock",
    value: "2,847",
    icon: Package,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Low Stock Alerts",
    value: "12",
    icon: AlertCircle,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-500/10",
  },
  {
    label: "Pending Orders",
    value: "34",
    icon: ShoppingCart,
    color: "from-sky-500 to-blue-600",
    bgColor: "bg-sky-500/10",
  },
  {
    label: "Categories",
    value: "18",
    icon: Folder,
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Total Inventory Value",
    value: "₹24,53,890",
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-500/10",
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 mt-8">
      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <div key={stat.label} className="group relative">
            <div
              className={`absolute inset-0 ${stat.bgColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur`}
            />
            <div className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-4 md:p-6 hover:border-slate-700/60 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-400 text-xs md:text-sm font-medium mb-2">{stat.label}</p>
                  <p className="text-xl md:text-3xl lg:text-4xl font-bold text-slate-100">{stat.value}</p>
                </div>
                <div className={`p-2 md:p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
