"use client"

import { motion } from "framer-motion"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardNavbar } from "@/components/dashboard-navbar"
import { InventoryItemDetail } from "@/components/inventory/item-detail"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export default function InventoryDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <DashboardSidebar />
      <DashboardNavbar />

      {/* Main Content */}
      <motion.div
        className="ml-0 md:ml-24 transition-all duration-300 mt-20 p-6 md:p-8 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <Link href="/dashboard" className="text-slate-400 hover:text-emerald-400 transition-colors">
            Dashboard
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <Link href="/inventory" className="text-slate-400 hover:text-emerald-400 transition-colors">
            Inventory
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <span className="text-slate-300">Item Details</span>
        </div>

        {/* Page Content */}
        <InventoryItemDetail itemId={params.id} />
      </motion.div>
    </main>
  )
}
