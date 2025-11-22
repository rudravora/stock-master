"use client"

import { createContext, useState, type ReactNode } from "react"

export const OrdersSidebarContext = createContext<{
  sidebarExpanded: boolean
  setSidebarExpanded: (expanded: boolean) => void
} | null>(null)

export function OrdersLayout({ children }: { children: ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return (
    <OrdersSidebarContext.Provider value={{ sidebarExpanded, setSidebarExpanded }}>
      {children}
    </OrdersSidebarContext.Provider>
  )
}

export default OrdersLayout
