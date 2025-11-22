"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardNavbar } from "@/components/dashboard-navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { OrdersLayout } from "./layout"

export default function OrdersPage() {
  const orders = [
    {
      id: "ORD-001",
      items: 5,
      total: "$2,450.00",
      status: "completed",
      date: "2025-01-15",
      supplier: "Supplier A",
    },
    {
      id: "ORD-002",
      items: 3,
      total: "$1,200.00",
      status: "pending",
      date: "2025-01-14",
      supplier: "Supplier B",
    },
    {
      id: "ORD-003",
      items: 8,
      total: "$3,800.00",
      status: "processing",
      date: "2025-01-13",
      supplier: "Supplier C",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-emerald-500" />
      case "pending":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case "processing":
        return <Clock className="w-4 h-4 text-blue-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/20 text-emerald-400"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400"
      case "processing":
        return "bg-blue-500/20 text-blue-400"
      default:
        return "bg-slate-500/20 text-slate-400"
    }
  }

  return (
    <OrdersLayout>
      <main className="relative min-h-screen w-full overflow-hidden">
        {/* Background Gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950" />

        {/* Vignette Overlay */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)",
          }}
        />

        {/* Animated Blur Circles */}
        <div
          className="fixed top-20 -left-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl"
          style={{ backgroundColor: "rgba(16, 185, 129, 0.3)" }}
        />
        <div
          className="fixed top-40 -right-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl"
          style={{ backgroundColor: "rgba(13, 148, 136, 0.3)" }}
        />

        {/* Sidebar */}
        <DashboardSidebar />

        {/* Navbar */}
        <DashboardNavbar />

        {/* Main Content */}
        <div className="relative z-10 mt-24 px-4 md:px-8 ml-0 md:ml-24 transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-100 mb-2">Orders</h1>
              <p className="text-slate-400">Manage and track your purchase orders</p>
            </div>
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
              <Plus className="w-4 h-4 mr-2" />
              New Order
            </Button>
          </div>

          {/* Orders Table */}
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Supplier
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <motion.tr
                      key={order.id}
                      className="border-b border-slate-700/30 hover:bg-slate-800/20 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-100">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{order.supplier}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{order.items} items</td>
                      <td className="px-6 py-4 text-sm text-slate-100 font-medium">{order.total}</td>
                      <td className="px-6 py-4 text-sm">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-700/50 hover:bg-slate-800/50 bg-transparent"
                        >
                          View
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </OrdersLayout>
  )
}
