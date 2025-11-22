"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardNavbar } from "@/components/dashboard-navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, FileText, Calendar, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { ReportsLayout } from "./layout"

export default function ReportsPage() {
  const reports = [
    {
      id: 1,
      name: "Inventory Summary",
      description: "Complete overview of current inventory levels",
      date: "2025-01-15",
      icon: FileText,
      color: "text-emerald-500",
    },
    {
      id: 2,
      name: "Stock Movement",
      description: "Detailed stock movement history",
      date: "2025-01-14",
      icon: TrendingUp,
      color: "text-teal-500",
    },
    {
      id: 3,
      name: "Reorder Status",
      description: "Current reorder requests and statuses",
      date: "2025-01-13",
      icon: Calendar,
      color: "text-cyan-500",
    },
    {
      id: 4,
      name: "Supplier Performance",
      description: "Supplier delivery and quality metrics",
      date: "2025-01-12",
      icon: TrendingUp,
      color: "text-emerald-400",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <ReportsLayout>
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
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-100 mb-2">Reports</h1>
            <p className="text-slate-400">Generate and download inventory reports</p>
          </div>

          {/* Reports Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {reports.map((report) => {
              const Icon = report.icon
              return (
                <motion.div key={report.id} variants={itemVariants}>
                  <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl hover:border-emerald-500/30 transition-all group cursor-pointer h-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-transparent to-teal-500/0 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-all" />

                    <div className="relative p-6">
                      <div className="flex items-start justify-between mb-4">
                        <Icon className={`w-8 h-8 ${report.color}`} />
                        <Button
                          size="sm"
                          className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border-emerald-500/30"
                          variant="outline"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>

                      <h3 className="text-lg font-semibold text-slate-100 mb-1">{report.name}</h3>
                      <p className="text-sm text-slate-400 mb-4">{report.description}</p>

                      <div className="flex items-center text-xs text-slate-500">
                        <Calendar className="w-3 h-3 mr-2" />
                        {new Date(report.date).toLocaleDateString()}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Custom Report Builder */}
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl p-8">
            <h2 className="text-2xl font-semibold text-slate-100 mb-4">Create Custom Report</h2>
            <p className="text-slate-400 mb-6">Build a custom report tailored to your needs</p>
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
              Build Report
            </Button>
          </Card>
        </div>
      </main>
    </ReportsLayout>
  )
}
