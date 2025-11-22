"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardNavbar } from "@/components/dashboard-navbar"
import { CornerRevealTransition } from "@/components/corner-reveal-transition"
import ReordersLayout from "./layout"
import { Plus, Search } from "lucide-react"

// Mock reorder data
const reorderItems = [
  {
    id: 1,
    itemName: "Widget A",
    sku: "WID-001",
    category: "Electronics",
    currentQty: 32,
    minLevel: 50,
    suggestedQty: 100,
    supplier: "Tech Supplies Inc",
    status: "pending",
    createdDate: "2025-11-20",
  },
  {
    id: 2,
    itemName: "Component X",
    sku: "COM-001",
    category: "Parts",
    currentQty: 0,
    minLevel: 25,
    suggestedQty: 50,
    supplier: "Tech Supplies Inc",
    status: "ordered",
    createdDate: "2025-11-18",
  },
  {
    id: 3,
    itemName: "Assembly Z",
    sku: "ASS-001",
    category: "Assemblies",
    currentQty: 8,
    minLevel: 15,
    suggestedQty: 30,
    supplier: "Premium Assembly Co",
    status: "received",
    createdDate: "2025-11-15",
  },
  {
    id: 4,
    itemName: "Component Y",
    sku: "COM-002",
    category: "Parts",
    currentQty: 156,
    minLevel: 40,
    suggestedQty: 80,
    supplier: "Quality Parts Ltd",
    status: "pending",
    createdDate: "2025-11-19",
  },
]

function ReordersContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterSupplier, setFilterSupplier] = useState("all")

  const filteredItems = reorderItems.filter((item) => {
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || item.status === filterStatus
    const matchesSupplier = filterSupplier === "all" || item.supplier === filterSupplier
    return matchesSearch && matchesStatus && matchesSupplier
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-400"
      case "ordered":
        return "bg-blue-500/10 text-blue-400"
      case "received":
        return "bg-emerald-500/10 text-emerald-400"
      default:
        return "bg-slate-500/10 text-slate-400"
    }
  }

  const statsData = [
    { label: "Total Items", value: reorderItems.length, color: "emerald" },
    { label: "Pending", value: reorderItems.filter((i) => i.status === "pending").length, color: "yellow" },
    { label: "Ordered", value: reorderItems.filter((i) => i.status === "ordered").length, color: "blue" },
    { label: "Received", value: reorderItems.filter((i) => i.status === "received").length, color: "emerald" },
  ]

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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Reorder Management
                </h1>
                <p className="text-slate-400 mt-2">Review and reorder low-stock items</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors w-full md:w-auto justify-center"
              >
                <Plus className="w-5 h-5" /> Create Reorder
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
          >
            {statsData.map((stat, i) => (
              <div key={i} className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/40 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
                <p className={`text-2xl font-bold text-${stat.color}-400`}>{stat.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="ordered">Ordered</option>
              <option value="received">Received</option>
            </select>
            <select
              value={filterSupplier}
              onChange={(e) => setFilterSupplier(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Suppliers</option>
              <option value="Tech Supplies Inc">Tech Supplies Inc</option>
              <option value="Quality Parts Ltd">Quality Parts Ltd</option>
              <option value="Premium Assembly Co">Premium Assembly Co</option>
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
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Category</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Current Qty</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Min Level</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Suggested Qty</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Supplier</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, idx) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 + idx * 0.02 }}
                      className="border-b border-slate-700/40 hover:bg-slate-800/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <Link href={`/inventory/${item.id}`}>
                          <div className="text-slate-200 font-medium hover:text-emerald-400 transition-colors cursor-pointer">
                            {item.itemName}
                          </div>
                          <div className="text-slate-500 text-sm">{item.sku}</div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{item.category}</td>
                      <td className="px-6 py-4 text-right font-medium text-slate-200">{item.currentQty}</td>
                      <td className="px-6 py-4 text-right text-slate-300">{item.minLevel}</td>
                      <td className="px-6 py-4 text-right font-semibold text-emerald-400">{item.suggestedQty}</td>
                      <td className="px-6 py-4 text-slate-300 text-sm">{item.supplier}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-emerald-400"
                        >
                          ⋯
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredItems.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-slate-400">No reorder items found</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  )
}

export default function ReordersPage() {
  return (
    <ReordersLayout>
      <ReordersContent />
    </ReordersLayout>
  )
}
