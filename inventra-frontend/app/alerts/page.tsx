"use client"

import { useState, useMemo } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardNavbar } from "@/components/dashboard-navbar"
import AlertsLayout from "./layout"
import { AlertsHeader } from "@/components/alerts/alerts-header"
import { AlertsFilters } from "@/components/alerts/alerts-filters"
import { AlertsSummary } from "@/components/alerts/alerts-summary"
import { AlertsList } from "@/components/alerts/alerts-list"
import { MOCK_ALERTS } from "@/lib/mock-alerts"

function AlertsPageContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterSeverity, setFilterSeverity] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterDateRange, setFilterDateRange] = useState("all")
  const [readAlerts, setReadAlerts] = useState<number[]>([])

  const filteredAlerts = useMemo(() => {
    return MOCK_ALERTS.filter((alert) => {
      const matchesSearch =
        alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === "all" || alert.type === filterType
      const matchesSeverity = filterSeverity === "all" || alert.severity === filterSeverity
      const matchesCategory = filterCategory === "all" || alert.category === filterCategory
      return matchesSearch && matchesType && matchesSeverity && matchesCategory
    })
  }, [searchTerm, filterType, filterSeverity, filterCategory])

  const toggleReadAlert = (id: number) => {
    setReadAlerts((prev) => (prev.includes(id) ? prev.filter((aid) => aid !== id) : [...prev, id]))
  }

  return (
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
      <div
        className="fixed -bottom-8 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl"
        style={{ backgroundColor: "rgba(16, 185, 129, 0.3)" }}
      />

      {/* Sidebar */}
      <DashboardSidebar />

      {/* Navbar */}
      <DashboardNavbar />

      {/* Main Content */}
      <div className="relative z-10 mt-24 px-4 md:px-8 ml-0 md:ml-24 transition-all duration-300 pb-12">
        {/* Header */}
        <AlertsHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Summary Stats */}
        <AlertsSummary alerts={filteredAlerts} totalAlerts={MOCK_ALERTS.length} />

        {/* Filters */}
        <AlertsFilters
          filterType={filterType}
          setFilterType={setFilterType}
          filterSeverity={filterSeverity}
          setFilterSeverity={setFilterSeverity}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
        />

        {/* Alerts List */}
        <AlertsList alerts={filteredAlerts} readAlerts={readAlerts} onToggleRead={toggleReadAlert} />
      </div>
    </main>
  )
}

export default function AlertsPage() {
  return (
    <AlertsLayout>
      <AlertsPageContent />
    </AlertsLayout>
  )
}
