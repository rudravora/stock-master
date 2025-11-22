"use client"

import type React from "react"

import { createContext, useState } from "react"

export const DetailSidebarContext = createContext<{
  sidebarExpanded: boolean
  setSidebarExpanded: (expanded: boolean) => void
} | null>(null)

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return (
    <DetailSidebarContext.Provider value={{ sidebarExpanded, setSidebarExpanded }}>
      {children}
    </DetailSidebarContext.Provider>
  )
}
