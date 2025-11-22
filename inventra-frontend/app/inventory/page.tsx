"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardNavbar } from "@/components/dashboard-navbar"
import InventoryLayout from "./layout"

// Mock inventory data
const inventoryItems = [
  {
    id: 1,
    name: "Widget A",
    sku: "WID-001",
    category: "Electronics",
    quantity: 245,
    reorderLevel: 50,
    unitPrice: 29.99,
    supplier: "Tech Supplies Inc",
    status: "in-stock",
  },
  {
    id: 2,
    name: "Widget B",
    sku: "WID-002",
    category: "Electronics",
    quantity: 32,
    reorderLevel: 50,
    unitPrice: 49.99,
    supplier: "Global Distributors",
    status: "low-stock",
  },
  {
    id: 3,
    name: "Component X",
    sku: "COM-001",
    category: "Parts",
    quantity: 0,
    reorderLevel: 25,
    unitPrice: 12.5,
    supplier: "Tech Supplies Inc",
    status: "out-of-stock",
  },
  {
    id: 4,
    name: "Component Y",
    sku: "COM-002",
    category: "Parts",
    quantity: 156,
    reorderLevel: 40,
    unitPrice: 15.99,
    supplier: "Quality Parts Ltd",
    status: "in-stock",
  },
  {
    id: 5,
    name: "Assembly Z",
    sku: "ASS-001",
    category: "Assemblies",
    quantity: 8,
    reorderLevel: 15,
    unitPrice: 199.99,
    supplier: "Premium Assembly Co",
    status: "low-stock",
  },
]

function InventoryPageContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || item.category === filterCategory
    const matchesStatus = filterStatus === "all" || item.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-stock":
        return "bg-emerald-500/10 text-emerald-400"
      case "low-stock":
        return "bg-yellow-500/10 text-yellow-400"
      case "out-of-stock":
        return "bg-red-500/10 text-red-400"
      default:
        return "bg-slate-500/10 text-slate-400"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "in-stock":
        return "In Stock"
      case "low-stock":
        return "Low Stock"
      case "out-of-stock":
        return "Out of Stock"
      default:
        return status
    }
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <DashboardSidebar />
      <DashboardNavbar />

      <div className="pt-24 md:ml-24">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Inventory
                </h1>
                <p className="text-slate-400 mt-2">Manage your inventory items and stock levels</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors w-full md:w-auto justify-center"
              >
                + Add Item
              </motion.button>
            </div>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className="relative md:col-span-2">
              <span className="absolute left-3 top-3 text-slate-500">🔍</span>
              <input
                type="text"
                placeholder="Search by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <option value="all">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Parts">Parts</option>
              <option value="Assemblies">Assemblies</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <option value="all">All Status</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </motion.div>

          {/* Actions */}
          <div className="mb-6 flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-700/50 transition-colors">
              ⚙️ More Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-700/50 transition-colors">
              ⬇️ Export
            </button>
          </div>

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
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">SKU</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Category</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Quantity</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Unit Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 + index * 0.02 }}
                      className="border-b border-slate-700/40 hover:bg-slate-800/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <Link href={`/inventory/${item.id}`}>
                          <div className="text-slate-200 font-medium hover:text-emerald-400 transition-colors cursor-pointer">
                            {item.name}
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{item.sku}</td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{item.category}</td>
                      <td className="px-6 py-4 text-right font-medium text-slate-200">{item.quantity}</td>
                      <td className="px-6 py-4 text-right text-slate-300">${item.unitPrice.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {getStatusLabel(item.status)}
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
                <p className="text-slate-400">No inventory items found</p>
              </div>
            )}
          </motion.div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/40 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-2">Total Items</p>
              <p className="text-2xl font-bold text-emerald-400">{inventoryItems.length}</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/40 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-2">Total Value</p>
              <p className="text-2xl font-bold text-teal-400">
                ${(inventoryItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) / 1000).toFixed(1)}k
              </p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/40 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-2">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-400">
                {inventoryItems.filter((i) => i.status === "low-stock").length}
              </p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/40 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-2">Out of Stock</p>
              <p className="text-2xl font-bold text-red-400">
                {inventoryItems.filter((i) => i.status === "out-of-stock").length}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

export default function InventoryPage() {
  return (
    <InventoryLayout>
      <InventoryPageContent />
    </InventoryLayout>
  )
}
