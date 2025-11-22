"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Package,
  Plus,
  AlertCircle,
  Settings,
  X,
  User,
  LogOut,
  FileText,
  ShoppingCart,
  RefreshCw,
  Truck,
  History,
  Building2,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Inventory", icon: Package, href: "/inventory" },
  { label: "Add Item", icon: Plus, href: "/inventory/add-item" },
  { label: "Reports", icon: FileText, href: "/reports" },
  { label: "Orders", icon: ShoppingCart, href: "/orders" },
  { label: "Reorders", icon: RefreshCw, href: "/reorders" },
  { label: "Deliveries", icon: Truck, href: "/deliveries" },
  { label: "Stock History", icon: History, href: "/stock-history" },
  { label: "Suppliers", icon: Building2, href: "/suppliers" },
  { label: "Alerts", icon: AlertCircle, href: "/alerts" },
  { label: "Settings", icon: Settings, href: "/settings" },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
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

  const activeContext =
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

  let sidebarExpanded = false
  let setSidebarExpanded = () => {}

  if (activeContext) {
    sidebarExpanded = activeContext.sidebarExpanded
    setSidebarExpanded = activeContext.setSidebarExpanded
  }

  return (
    <>
      {/* Desktop Sidebar - Hover to expand */}
      <motion.div
        className="hidden md:flex fixed left-0 top-0 h-screen bg-slate-900/40 backdrop-blur-xl border-r border-slate-700/40 flex-col p-6 select-none z-40 overflow-visible"
        initial={{ opacity: 0, x: -50 }}
        animate={{
          opacity: 1,
          x: 0,
          width: sidebarExpanded ? 256 : 80,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        {/* Logo */}
        <div className="mb-12">
          <motion.h1
            className="font-serif text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
            animate={{ opacity: sidebarExpanded ? 1 : 0, width: sidebarExpanded ? "auto" : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            Inventra
          </motion.h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + index * 0.05 }}
              >
                <motion.div whileHover={{ scale: 1.05, x: 4 }} transition={{ duration: 0.2 }}>
                  <Link
                    href={item.href}
                    className={`relative flex items-center ${sidebarExpanded ? "justify-start" : "justify-center"} gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-emerald-400 transition-all group w-full`}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-emerald-500/10 rounded-lg z-0"
                        layoutId="activeNav"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <motion.div
                      className="absolute inset-0 bg-emerald-500/5 rounded-lg opacity-0 group-hover:opacity-100 z-0"
                      transition={{ duration: 0.2 }}
                    />
                    <motion.div
                      className="w-6 h-6 relative z-10 flex-shrink-0 flex items-center justify-center"
                      whileHover={{ rotate: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                    <motion.span
                      className="relative z-10 font-medium whitespace-nowrap"
                      animate={{ opacity: sidebarExpanded ? 1 : 0, width: sidebarExpanded ? "auto" : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.div>
            )
          })}
        </nav>

        <motion.div
          className="pt-6 border-t border-slate-700/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="relative group">
            <button className="w-full flex items-center justify-center gap-3 px-3 py-3 rounded-lg text-slate-300 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex-shrink-0 mx-auto" />
              <motion.div
                className="flex-1 text-left min-w-0"
                animate={{ opacity: sidebarExpanded ? 1 : 0, width: sidebarExpanded ? "auto" : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <p className="text-sm font-medium text-slate-200 truncate">John Doe</p>
                <p className="text-xs text-slate-400 truncate">Manager</p>
              </motion.div>
            </button>

            {/* Options dropdown - visible on hover */}
            <motion.div
              className="absolute bottom-full left-0 mb-2 w-48 bg-slate-900/95 backdrop-blur-xl border border-slate-700/40 rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-50"
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
            >
              <button className="w-full px-4 py-2 text-left text-slate-200 hover:bg-emerald-500/10 hover:text-emerald-400 flex items-center gap-2 transition-colors text-sm">
                <User className="w-4 h-4" />
                Profile
              </button>
              <button className="w-full px-4 py-2 text-left text-slate-200 hover:bg-rose-500/10 hover:text-rose-400 flex items-center gap-2 transition-colors border-t border-slate-700/40 text-sm">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed md:hidden left-0 top-0 h-screen w-56 bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/40 flex flex-col p-6 select-none z-50"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Logo */}
            <div className="mb-12 mt-4">
              <h1 className="font-serif text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Inventra
              </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="relative flex items-center justify-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-emerald-400 transition-all group w-full"
                    >
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-emerald-500/10 rounded-lg z-0"
                          layoutId="mobileActiveNav"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      <motion.div className="w-6 h-6 relative z-10 flex-shrink-0 mx-auto">
                        <Icon className="w-6 h-6" />
                      </motion.div>
                      <span className="relative z-10 font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed md:hidden inset-0 bg-black/50 z-40"
        />
      )}
    </>
  )
}
