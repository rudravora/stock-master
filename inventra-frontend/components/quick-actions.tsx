"use client"

import { Plus, Package, FileText, ShoppingCart } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    label: "Add Item",
    icon: Plus,
    href: "/inventory/add-item",
    color: "from-emerald-500 to-teal-600",
  },
  {
    label: "View Inventory",
    icon: Package,
    href: "/inventory",
    color: "from-emerald-500 to-teal-600",
  },
  {
    label: "Generate Report",
    icon: FileText,
    href: "/reports",
    color: "from-emerald-500 to-teal-600",
  },
  {
    label: "Create Order",
    icon: ShoppingCart,
    href: "/orders",
    color: "from-emerald-500 to-teal-600",
  },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
      {actions.map((action) => {
        const Icon = action.icon

        return (
          <Link key={action.label} href={action.href}>
            <button
              className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-gradient-to-br ${action.color} text-white font-medium flex flex-col items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-500/20 transition-all hover:scale-105 group min-h-20 md:min-h-24 text-xs md:text-sm`}
            >
              <Icon className="w-5 h-5 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
              <span className="text-center leading-tight">{action.label}</span>
            </button>
          </Link>
        )
      })}
    </div>
  )
}
