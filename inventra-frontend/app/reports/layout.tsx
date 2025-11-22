"use client"

import { createContext, useState, type ReactNode } from "react"

export const ReportsSidebarContext = createContext<{
  sidebarExpanded: boolean
  setSidebarExpanded: (expanded: boolean) => void
} | null>(null)

export function ReportsLayout({ children }: { children: ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return (
    <ReportsSidebarContext.Provider value={{ sidebarExpanded, setSidebarExpanded }}>
      {children}
    </ReportsSidebarContext.Provider>
  )
}

export default ReportsLayout
