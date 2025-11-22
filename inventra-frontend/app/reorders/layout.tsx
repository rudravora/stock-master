"use client"

import type React from "react"
import { createContext, useState } from "react"

export const ReordersSidebarContext = createContext<any>(null)

export default function ReordersLayout({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return (
    <ReordersSidebarContext.Provider value={{ sidebarExpanded, setSidebarExpanded }}>
      {children}
    </ReordersSidebarContext.Provider>
  )
}
