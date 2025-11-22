import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardNavbar } from "@/components/dashboard-navbar"

export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <DashboardSidebar />
      <DashboardNavbar />
      <div className="md:ml-24 pt-24 px-4 md:px-8">
        <div className="space-y-4">
          <div className="h-8 bg-slate-800 rounded animate-pulse w-1/3" />
          <div className="h-4 bg-slate-800 rounded animate-pulse w-1/4" />
        </div>
      </div>
    </main>
  )
}
