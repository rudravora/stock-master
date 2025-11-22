"use client"

import { motion } from "framer-motion"
import { Search, Bell, User, LogOut, Menu, X } from "lucide-react"
import { useState, useContext } from "react"
import { SidebarContext as DashboardSidebarContext } from "@/app/dashboard/layout"
import { SidebarContext as InventorySidebarContext } from "@/app/inventory/layout"
import { SidebarContext as AddItemSidebarContext } from "@/app/inventory/add-item/layout"
import { DetailSidebarContext } from "@/app/inventory/[id]/layout"
import { AlertsSidebarContext } from "@/app/alerts/layout"
import { SettingsSidebarContext } from "@/app/settings/layout"
import { ReordersSidebarContext } from "@/app/reorders/layout"
import { DeliveriesSidebarContext } from "@/app/deliveries/layout"
import { StockHistorySidebarContext } from "@/app/stock-history/layout"
import { SuppliersSidebarContext } from "@/app/suppliers/layout"
import { ReportsSidebarContext } from "@/app/reports/layout"
import { OrdersSidebarContext } from "@/app/orders/layout"

export function DashboardNavbar() {
  const [showDropdown, setShowDropdown] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const dashboardContext = useContext(DashboardSidebarContext)
  const inventoryContext = useContext(InventorySidebarContext)
  const addItemContext = useContext(AddItemSidebarContext)
  const detailContext = useContext(DetailSidebarContext)
  const alertsContext = useContext(AlertsSidebarContext)
  const settingsContext = useContext(SettingsSidebarContext)
  const reordersContext = useContext(ReordersSidebarContext)
  const deliveriesContext = useContext(DeliveriesSidebarContext)
  const stockHistoryContext = useContext(StockHistorySidebarContext)
  const suppliersContext = useContext(SuppliersSidebarContext)
  const reportsContext = useContext(ReportsSidebarContext)
  const ordersContext = useContext(OrdersSidebarContext)

  const context =
    dashboardContext ||
    inventoryContext ||
    addItemContext ||
    detailContext ||
    alertsContext ||
    settingsContext ||
    reordersContext ||
    deliveriesContext ||
    stockHistoryContext ||
    suppliersContext ||
    reportsContext ||
    ordersContext
  const sidebarExpanded = context ? context.sidebarExpanded : false

  return (
    <motion.div
      className={`fixed top-0 right-0 h-20 bg-slate-900/40 backdrop-blur-xl border-b border-slate-700/40 flex items-center justify-between px-8 select-none z-40 transition-all duration-300 ${
        sidebarExpanded ? "left-64" : "left-20 md:left-20"
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="hidden md:hidden p-2 text-slate-400 hover:text-emerald-400 transition-colors"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </motion.button>

      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search inventory..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6 ml-8">
        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
        </motion.button>

        {/* User Dropdown */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800/50 flex items-center gap-2 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600" />
            <User className="w-4 h-4 text-slate-400" />
          </motion.button>

          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-xl border border-slate-700/40 rounded-lg overflow-hidden"
            >
              <button className="w-full px-4 py-2 text-left text-slate-200 hover:bg-slate-800/50 flex items-center gap-2 transition-colors">
                <User className="w-4 h-4" />
                Profile
              </button>
              <button className="w-full px-4 py-2 text-left text-slate-200 hover:bg-slate-800/50 flex items-center gap-2 transition-colors border-t border-slate-700/40">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
