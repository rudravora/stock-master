"use client"

import type React from "react"
import { createContext, useState } from "react"

export const SettingsSidebarContext = createContext<any>(null)

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return (
    <SettingsSidebarContext.Provider value={{ sidebarExpanded, setSidebarExpanded }}>
      {children}
    </SettingsSidebarContext.Provider>
  )
}
