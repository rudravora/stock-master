"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardNavbar } from "@/components/dashboard-navbar"
import { DashboardStats } from "@/components/dashboard-stats"
import { DashboardChart } from "@/components/dashboard-chart"
import { DashboardActivity } from "@/components/dashboard-activity"
import { CornerRevealTransition } from "@/components/corner-reveal-transition"
import { QuickActions } from "@/components/quick-actions"
import { DashboardLayout } from "./layout"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <main className="relative min-h-screen w-full overflow-hidden">
        {/* Corner Reveal Transition */}
        <CornerRevealTransition />

        {/* Background Gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950" />

        {/* Vignette Overlay for Depth */}
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
        <div className="relative z-10 mt-24 px-4 md:px-8 ml-0 md:ml-24 transition-all duration-300">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-100 mb-2">Dashboard</h1>
            <p className="text-slate-400 mb-6">Welcome back! Here's your inventory overview</p>
          </div>

          {/* Quick Actions Row */}
          <QuickActions />

          {/* Stats Grid */}
          <DashboardStats />

          {/* Chart and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2">
              <DashboardChart />
            </div>
            <div>
              <DashboardActivity />
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  )
}
