"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Edit2, Plus, RotateCcw, AlertCircle, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { StockControls } from "./stock-controls"
import { StockHistoryTable } from "./stock-history-table"
import { SupplierCard } from "./supplier-card"
import { RecentActivityFeed } from "./recent-activity-feed"

// Mock data
const mockItem = {
  id: "INV-001",
  name: "Industrial Bearing",
  sku: "BRNG-4500-Z",
  category: "Components",
  currentStock: 4250,
  minStock: 500,
  maxStock: 5000,
  reorderThreshold: 1000,
  unitCost: 45.5,
  lastUpdated: "2025-11-22T10:30:00",
  supplier: {
    id: "SUP-001",
    name: "Premium Supply Co.",
    contact: "+1-555-0123",
    email: "sales@premiumsupply.com",
    lastOrderDate: "2025-11-15",
    rating: 4.8,
  },
  warehouse: {
    name: "Main Warehouse",
    aisle: "C",
    shelf: "12",
    bin: "45",
  },
  stockHistory: [
    {
      date: "2025-11-22",
      change: 250,
      type: "Added",
      reason: "Incoming delivery",
      user: "John Doe",
      resultingQty: 4250,
    },
    {
      date: "2025-11-21",
      change: -500,
      type: "Removed",
      reason: "Order fulfillment",
      user: "Jane Smith",
      resultingQty: 4000,
    },
    { date: "2025-11-20", change: 1000, type: "Added", reason: "Purchase order", user: "System", resultingQty: 4500 },
    {
      date: "2025-11-19",
      change: -300,
      type: "Adjustment",
      reason: "Inventory count correction",
      user: "Mike Johnson",
      resultingQty: 3500,
    },
  ],
  recentActivity: [
    { id: 1, event: "Stock received", timestamp: "2 hours ago", icon: "inbox" },
    { id: 2, event: "Order placed with supplier", timestamp: "1 day ago", icon: "truck" },
    { id: 3, event: "Low stock alert triggered", timestamp: "3 days ago", icon: "alert" },
    { id: 4, event: "Item reordered", timestamp: "5 days ago", icon: "repeat" },
  ],
}

const sparklineData = [
  { day: 1, value: 4000 },
  { day: 2, value: 4100 },
  { day: 3, value: 3900 },
  { day: 4, value: 3800 },
  { day: 5, value: 4200 },
  { day: 6, value: 4300 },
  { day: 7, value: 4250 },
]

interface InventoryItemDetailProps {
  itemId: string
}

export function InventoryItemDetail({ itemId }: InventoryItemDetailProps) {
  const [showStockModal, setShowStockModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showReorderModal, setShowReorderModal] = useState(false)

  const totalValue = (mockItem.currentStock * mockItem.unitCost).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  }

  return (
    <>
      {/* Header Section */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-2">{mockItem.name}</h1>
            <p className="text-slate-400">
              SKU:{" "}
              <span className="font-mono text-emerald-400 cursor-pointer hover:bg-slate-800/50 px-2 py-1 rounded inline-block transition-colors">
                {mockItem.sku}
              </span>{" "}
              • Category: {mockItem.category}
            </p>
          </div>

          {/* Quick Actions */}
          <motion.div className="flex gap-3 flex-wrap md:flex-nowrap" variants={itemVariants}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEditModal(true)}
              className="border-slate-700/50 hover:bg-slate-800/50 hover:text-emerald-400"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button size="sm" onClick={() => setShowStockModal(true)} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Stock
            </Button>
            <Button size="sm" onClick={() => setShowReorderModal(true)} className="bg-teal-600 hover:bg-teal-700">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reorder
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Column - Primary Content (65%) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Stock Card */}
          <motion.div variants={itemVariants}>
            <Card className="bg-slate-900/40 backdrop-blur-xl border-slate-700/40 p-6 md:p-8">
              <div className="flex items-start justify-between mb-6">
                <h2 className="font-serif text-2xl font-bold text-white">Current Stock</h2>
                <motion.div whileHover={{ scale: 1.05 }} className="p-2 rounded-lg bg-emerald-500/10">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </motion.div>
              </div>

              {/* Stock Quantity - Big Display */}
              <motion.div
                className="mb-8"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-baseline gap-4">
                  <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    {mockItem.currentStock.toLocaleString()}
                  </div>
                  <span className="text-slate-400 text-lg">units</span>
                </div>
              </motion.div>

              {/* Stock Details Grid */}
              <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" variants={containerVariants}>
                {[
                  { label: "Min Stock", value: mockItem.minStock, color: "text-slate-400" },
                  { label: "Max Stock", value: mockItem.maxStock, color: "text-emerald-400" },
                  { label: "Reorder Point", value: mockItem.reorderThreshold, color: "text-teal-400" },
                  { label: "Unit Cost", value: `₹${mockItem.unitCost}`, color: "text-blue-400" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
                  >
                    <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                    <p className={`text-lg font-semibold ${stat.color}`}>
                      {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Total Value */}
              <motion.div
                variants={itemVariants}
                className="p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg border border-emerald-500/30"
              >
                <p className="text-slate-400 text-sm mb-1">Total Stock Value</p>
                <p className="text-3xl font-bold text-emerald-400">₹{totalValue}</p>
              </motion.div>

              {/* Mini Sparkline - Last 7 days trend */}
              <motion.div variants={itemVariants} className="mt-8 pt-6 border-t border-slate-700/40">
                <h3 className="text-sm font-medium text-slate-300 mb-4">Stock Trend (Last 7 Days)</h3>
                <div className="flex items-end justify-between h-16 gap-2">
                  {sparklineData.map((point, i) => {
                    const maxValue = Math.max(...sparklineData.map((p) => p.value))
                    const height = (point.value / maxValue) * 100
                    return (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                        className="flex-1 bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-md opacity-80 hover:opacity-100 transition-opacity"
                      />
                    )
                  })}
                </div>
              </motion.div>
            </Card>
          </motion.div>

          {/* Stock History */}
          <motion.div variants={itemVariants}>
            <Card className="bg-slate-900/40 backdrop-blur-xl border-slate-700/40 p-6 md:p-8">
              <h2 className="font-serif text-2xl font-bold text-white mb-6">Stock History</h2>
              <StockHistoryTable data={mockItem.stockHistory} />
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Secondary Content (35%) */}
        <div className="space-y-6">
          {/* Supplier Card */}
          <motion.div variants={itemVariants}>
            <SupplierCard supplier={mockItem.supplier} />
          </motion.div>

          {/* Location & Warehouse */}
          <motion.div variants={itemVariants}>
            <Card className="bg-slate-900/40 backdrop-blur-xl border-slate-700/40 p-6">
              <h3 className="font-serif text-lg font-bold text-white mb-4">Location</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-slate-400 text-sm">Warehouse</p>
                  <p className="text-white font-medium">{mockItem.warehouse.name}</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-slate-400 text-sm">Aisle</p>
                    <p className="text-emerald-400 font-mono font-bold text-lg">{mockItem.warehouse.aisle}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Shelf</p>
                    <p className="text-teal-400 font-mono font-bold text-lg">{mockItem.warehouse.shelf}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Bin</p>
                    <p className="text-blue-400 font-mono font-bold text-lg">{mockItem.warehouse.bin}</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions Card */}
          <motion.div variants={itemVariants}>
            <Card className="bg-slate-900/40 backdrop-blur-xl border-slate-700/40 p-6">
              <h3 className="font-serif text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-slate-700/50 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/50 bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Stock
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-slate-700/50 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/50 bg-transparent"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Remove Stock
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-slate-700/50 hover:bg-teal-500/10 hover:text-teal-400 hover:border-teal-500/50 bg-transparent"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Transfer
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div variants={itemVariants}>
            <RecentActivityFeed activities={mockItem.recentActivity} />
          </motion.div>
        </div>
      </motion.div>

      {/* Modals */}
      {showStockModal && (
        <StockControls isOpen={showStockModal} onClose={() => setShowStockModal(false)} itemName={mockItem.name} />
      )}
    </>
  )
}
