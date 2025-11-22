"use client"

import { createContext, useState, type ReactNode } from "react"

export const SidebarContext = createContext<{
  sidebarExpanded: boolean
  setSidebarExpanded: (expanded: boolean) => void
} | null>(null)

export default function AddItemLayout({ children }: { children: ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return <SidebarContext.Provider value={{ sidebarExpanded, setSidebarExpanded }}>{children}</SidebarContext.Provider>
}
