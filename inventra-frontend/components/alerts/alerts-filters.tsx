"use client"

import { motion } from "framer-motion"

interface AlertsFiltersProps {
  filterType: string
  setFilterType: (type: string) => void
  filterSeverity: string
  setFilterSeverity: (severity: string) => void
  filterCategory: string
  setFilterCategory: (category: string) => void
}

export function AlertsFilters({
  filterType,
  setFilterType,
  filterSeverity,
  setFilterSeverity,
  filterCategory,
  setFilterCategory,
}: AlertsFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4"
    >
      {/* Type Filter */}
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
      >
        <option value="all">All Types</option>
        <option value="low-stock">Low Stock</option>
        <option value="out-of-stock">Out of Stock</option>
        <option value="pending-delivery">Pending Delivery</option>
        <option value="reorder-pending">Reorder Pending</option>
        <option value="order-received">Order Received</option>
        <option value="system">System</option>
      </select>

      {/* Category Filter */}
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
      >
        <option value="all">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="parts">Parts</option>
        <option value="assemblies">Assemblies</option>
      </select>

      {/* Severity Filter */}
      <select
        value={filterSeverity}
        onChange={(e) => setFilterSeverity(e.target.value)}
        className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
      >
        <option value="all">All Severity</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* Placeholder for Date Range */}
      <div className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-500 text-sm flex items-center">
        Date Range
      </div>
    </motion.div>
  )
}
