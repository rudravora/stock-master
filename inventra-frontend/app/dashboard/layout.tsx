"use client"

import { createContext, useState } from "react"

export const SidebarContext = createContext()

export function DashboardLayout({ children }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return <SidebarContext.Provider value={{ sidebarExpanded, setSidebarExpanded }}>{children}</SidebarContext.Provider>
}

export default DashboardLayout
