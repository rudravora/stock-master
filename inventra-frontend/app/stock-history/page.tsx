"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardNavbar } from "@/components/dashboard-navbar"
import { CornerRevealTransition } from "@/components/corner-reveal-transition"
import StockHistoryLayout from "./layout"
import { Search, TrendingUp, TrendingDown } from "lucide-react"

// Mock global stock history
const stockHistory = [
  {
    id: 1,
    item: "Widget A",
    sku: "WID-001",
    change: 50,
    direction: "in",
    resultingQty: 245,
    reason: "Purchase Order",
    user: "John Doe",
    timestamp: "2025-11-22 14:30",
  },
  {
    id: 2,
    item: "Component X",
    sku: "COM-001",
    change: 25,
    direction: "out",
    resultingQty: 0,
    reason: "Sales Order",
    user: "Jane Smith",
    timestamp: "2025-11-22 10:15",
  },
  {
    id: 3,
    item: "Widget B",
    sku: "WID-002",
    change: 10,
    direction: "in",
    resultingQty: 32,
    reason: "Stock Adjustment",
    user: "Mike Johnson",
    timestamp: "2025-11-21 16:45",
  },
  {
    id: 4,
    item: "Assembly Z",
    sku: "ASS-001",
    change: 5,
    direction: "out",
    resultingQty: 8,
    reason: "Manual Adjustment",
    user: "Sarah Williams",
    timestamp: "2025-11-21 09:20",
  },
  {
    id: 5,
    item: "Component Y",
    sku: "COM-002",
    change: 40,
    direction: "in",
    resultingQty: 156,
    reason: "Purchase Order",
    user: "John Doe",
    timestamp: "2025-11-20 11:00",
  },
]

function StockHistoryContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const filteredItems = stockHistory.filter((item) => {
    const matchesSearch =
      item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || item.direction === filterType
    return matchesSearch && matchesType
  })

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
              Stock History
            </h1>
            <p className="text-slate-400 mt-2">Track all stock movements across your inventory</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6"
          >
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/40 rounded-lg p-4">
              <TrendingUp className="w-6 h-6 text-emerald-400 mb-2" />
              <p className="text-slate-400 text-sm mb-2">Total In</p>
              <p className="text-2xl font-bold text-emerald-400">
                {stockHistory.filter((i) => i.direction === "in").length}
              </p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/40 rounded-lg p-4">
              <TrendingDown className="w-6 h-6 text-red-400 mb-2" />
              <p className="text-slate-400 text-sm mb-2">Total Out</p>
              <p className="text-2xl font-bold text-red-400">
                {stockHistory.filter((i) => i.direction === "out").length}
              </p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/40 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-2">Records</p>
              <p className="text-2xl font-bold text-teal-400">{stockHistory.length}</p>
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
                placeholder="Search by item or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Types</option>
              <option value="in">Stock In</option>
              <option value="out">Stock Out</option>
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
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Item</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Qty Change</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Resulting Qty</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Reason</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">User</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Timestamp</th>
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
                      <td className="px-6 py-4">
                        <div className="text-slate-200 font-medium">{item.item}</div>
                        <div className="text-slate-500 text-sm">{item.sku}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div
                          className={`flex items-center justify-end gap-2 ${item.direction === "in" ? "text-emerald-400" : "text-red-400"}`}
                        >
                          {item.direction === "in" ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span className="font-semibold">
                            {item.direction === "in" ? "+" : "-"}
                            {item.change}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-slate-200">{item.resultingQty}</td>
                      <td className="px-6 py-4 text-slate-300 text-sm">{item.reason}</td>
                      <td className="px-6 py-4 text-slate-300 text-sm">{item.user}</td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{item.timestamp}</td>
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

export default function StockHistoryPage() {
  return (
    <StockHistoryLayout>
      <StockHistoryContent />
    </StockHistoryLayout>
  )
}
