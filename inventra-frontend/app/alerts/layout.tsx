"use client"

import type React from "react"

import { createContext, useState } from "react"

export const AlertsSidebarContext = createContext<{
  sidebarExpanded: boolean
  setSidebarExpanded: (expanded: boolean) => void
} | null>(null)

export default function AlertsLayout({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return (
    <AlertsSidebarContext.Provider value={{ sidebarExpanded, setSidebarExpanded }}>
      {children}
    </AlertsSidebarContext.Provider>
  )
}
