"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardNavbar } from "@/components/dashboard-navbar"
import { CornerRevealTransition } from "@/components/corner-reveal-transition"
import DeliveriesLayout from "./layout"
import { Search, Truck, Calendar } from "lucide-react"

// Mock delivery data
const deliveryItems = [
  {
    id: 1,
    supplier: "Tech Supplies Inc",
    item: "Widget A",
    orderedQty: 100,
    receivedQty: 100,
    expectedDate: "2025-11-25",
    actualDate: "2025-11-24",
    status: "delivered",
  },
  {
    id: 2,
    supplier: "Global Distributors",
    item: "Widget B",
    orderedQty: 50,
    receivedQty: 0,
    expectedDate: "2025-11-28",
    actualDate: null,
    status: "in-transit",
  },
  {
    id: 3,
    supplier: "Tech Supplies Inc",
    item: "Component X",
    orderedQty: 50,
    receivedQty: 0,
    expectedDate: "2025-11-20",
    actualDate: null,
    status: "delayed",
  },
  {
    id: 4,
    supplier: "Quality Parts Ltd",
    item: "Component Y",
    orderedQty: 80,
    receivedQty: 80,
    expectedDate: "2025-11-22",
    actualDate: "2025-11-22",
    status: "delivered",
  },
]

function DeliveriesContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredItems = deliveryItems.filter((item) => {
    const matchesSearch =
      item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || item.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-500/10 text-emerald-400"
      case "in-transit":
        return "bg-blue-500/10 text-blue-400"
      case "delayed":
        return "bg-red-500/10 text-red-400"
      default:
        return "bg-slate-500/10 text-slate-400"
    }
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <CornerRevealTransition />
      <DashboardSidebar />
      <DashboardNavbar />

      <div className="pt-24 md:ml-24 transition-all duration-300">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Deliveries
            </h1>
            <p className="text-slate-400 mt-2">Track incoming stock and delivery statuses</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
          >
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/40 rounded-lg p-4">
              <Truck className="w-6 h-6 text-emerald-400 mb-2" />
              <p className="text-slate-400 text-sm mb-2">Delivered</p>
              <p className="text-2xl font-bold text-emerald-400">
                {deliveryItems.filter((i) => i.status === "delivered").length}
              </p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/40 rounded-lg p-4">
              <Truck className="w-6 h-6 text-blue-400 mb-2" />
              <p className="text-slate-400 text-sm mb-2">In Transit</p>
              <p className="text-2xl font-bold text-blue-400">
                {deliveryItems.filter((i) => i.status === "in-transit").length}
              </p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/40 rounded-lg p-4">
              <Truck className="w-6 h-6 text-red-400 mb-2" />
              <p className="text-slate-400 text-sm mb-2">Delayed</p>
              <p className="text-2xl font-bold text-red-400">
                {deliveryItems.filter((i) => i.status === "delayed").length}
              </p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/40 rounded-lg p-4">
              <Calendar className="w-6 h-6 text-teal-400 mb-2" />
              <p className="text-slate-400 text-sm mb-2">Total</p>
              <p className="text-2xl font-bold text-teal-400">{deliveryItems.length}</p>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mb-6 flex flex-col md:flex-row gap-4"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search deliveries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Status</option>
              <option value="delivered">Delivered</option>
              <option value="in-transit">In Transit</option>
              <option value="delayed">Delayed</option>
            </select>
          </motion.div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/40 rounded-lg overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/40 bg-slate-900/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Supplier</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Item</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Ordered Qty</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Received Qty</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Expected</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actual</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, idx) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-slate-700/40 hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-slate-200 font-medium">{item.supplier}</td>
                      <td className="px-6 py-4 text-slate-300">{item.item}</td>
                      <td className="px-6 py-4 text-right text-slate-300">{item.orderedQty}</td>
                      <td className="px-6 py-4 text-right font-semibold text-emerald-400">{item.receivedQty}</td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{item.expectedDate}</td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{item.actualDate || "—"}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1).replace("-", " ")}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

export default function DeliveriesPage() {
  return (
    <DeliveriesLayout>
      <DeliveriesContent />
    </DeliveriesLayout>
  )
}
