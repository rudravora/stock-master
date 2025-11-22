"use client"

import type React from "react"
import { createContext, useState } from "react"

export const StockHistorySidebarContext = createContext<any>(null)

export default function StockHistoryLayout({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return (
    <StockHistorySidebarContext.Provider value={{ sidebarExpanded, setSidebarExpanded }}>
      {children}
    </StockHistorySidebarContext.Provider>
  )
}
