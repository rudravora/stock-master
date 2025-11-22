"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardNavbar } from "@/components/dashboard-navbar"
import { CornerRevealTransition } from "@/components/corner-reveal-transition"
import SuppliersLayout from "./layout"
import { Search, Plus, Phone, Mail, Calendar, Box } from "lucide-react"

// Mock supplier data
const suppliers = [
  {
    id: 1,
    name: "Tech Supplies Inc",
    contact: "contact@techsupplies.com",
    phone: "+1-555-0101",
    lastDelivery: "2025-11-24",
    totalItems: 12,
    status: "active",
  },
  {
    id: 2,
    name: "Global Distributors",
    contact: "info@globaldist.com",
    phone: "+1-555-0102",
    lastDelivery: "2025-11-20",
    totalItems: 8,
    status: "active",
  },
  {
    id: 3,
    name: "Quality Parts Ltd",
    contact: "sales@qualityparts.com",
    phone: "+1-555-0103",
    lastDelivery: "2025-11-18",
    totalItems: 15,
    status: "active",
  },
  {
    id: 4,
    name: "Premium Assembly Co",
    contact: "contact@premiumassembly.com",
    phone: "+1-555-0104",
    lastDelivery: "2025-11-15",
    totalItems: 6,
    status: "inactive",
  },
]

function SuppliersContent() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSuppliers = suppliers.filter(
    (sup) =>
      sup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sup.contact.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
                  Suppliers
                </h1>
                <p className="text-slate-400 mt-2">Manage your supplier relationships</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors w-full md:w-auto justify-center"
              >
                <Plus className="w-5 h-5" /> Add Supplier
              </motion.button>
            </div>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-6"
          >
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </motion.div>

          {/* Suppliers Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredSuppliers.map((supplier, idx) => (
              <motion.div
                key={supplier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/40 rounded-lg p-6 hover:border-emerald-500/50 transition-all group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
                      {supplier.name}
                    </h3>
                    <div
                      className={`inline-flex px-2 py-1 rounded text-xs font-medium mt-2 ${supplier.status === "active" ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-500/10 text-slate-400"}`}
                    >
                      {supplier.status.charAt(0).toUpperCase() + supplier.status.slice(1)}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    ⋯
                  </motion.button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm">{supplier.contact}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm">{supplier.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm">Last delivery: {supplier.lastDelivery}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Box className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm">{supplier.totalItems} items supplied</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex-1 px-3 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded text-sm hover:bg-emerald-500/20 transition-colors"
                  >
                    View
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex-1 px-3 py-2 bg-slate-700/30 border border-slate-600/30 text-slate-300 rounded text-sm hover:bg-slate-700/50 transition-colors"
                  >
                    Edit
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  )
}

export default function SuppliersPage() {
  return (
    <SuppliersLayout>
      <SuppliersContent />
    </SuppliersLayout>
  )
}
