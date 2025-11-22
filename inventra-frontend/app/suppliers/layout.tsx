"use client"

import type React from "react"
import { createContext, useState } from "react"

export const SuppliersSidebarContext = createContext<any>(null)

export default function SuppliersLayout({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return (
    <SuppliersSidebarContext.Provider value={{ sidebarExpanded, setSidebarExpanded }}>
      {children}
    </SuppliersSidebarContext.Provider>
  )
}
