"use client"

import type React from "react"
import { createContext, useState } from "react"

export const DeliveriesSidebarContext = createContext<any>(null)

export default function DeliveriesLayout({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return (
    <DeliveriesSidebarContext.Provider value={{ sidebarExpanded, setSidebarExpanded }}>
      {children}
    </DeliveriesSidebarContext.Provider>
  )
}
