"use client"

import type React from "react"
import { createContext, useState } from "react"

export const SidebarContext = createContext()

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return <SidebarContext.Provider value={{ sidebarExpanded, setSidebarExpanded }}>{children}</SidebarContext.Provider>
}
