export interface Alert {
  id: number
  title: string
  description: string
  type: "low-stock" | "out-of-stock" | "pending-delivery" | "reorder-pending" | "order-received" | "system"
  severity: "low" | "medium" | "high"
  category: string
  timestamp: string
  itemId?: number
  itemName?: string
}

export const MOCK_ALERTS: Alert[] = [
  {
    id: 1,
    title: "Low Stock: Widget A",
    description: "Only 2 units remaining, below threshold of 10",
    type: "low-stock",
    severity: "high",
    category: "electronics",
    timestamp: "3 hours ago",
    itemName: "Widget A",
    itemId: 1,
  },
  {
    id: 2,
    title: "Out of Stock: Component X",
    description: "No units available. Last reorder placed 5 days ago.",
    type: "out-of-stock",
    severity: "high",
    category: "parts",
    timestamp: "2 days ago",
    itemName: "Component X",
    itemId: 3,
  },
  {
    id: 3,
    title: "Pending Delivery",
    description: "Order #ORD-2024-1523 from Global Distributors arrives tomorrow",
    type: "pending-delivery",
    severity: "medium",
    category: "assemblies",
    timestamp: "1 day ago",
  },
  {
    id: 4,
    title: "Reorder Pending: Widget B",
    description: "Stock level at 32 units. Reorder quantity: 100 units",
    type: "reorder-pending",
    severity: "medium",
    category: "electronics",
    timestamp: "5 hours ago",
    itemName: "Widget B",
    itemId: 2,
  },
  {
    id: 5,
    title: "Order Received",
    description: "Shipment #SHP-2024-5891 from Tech Supplies Inc received and verified",
    type: "order-received",
    severity: "low",
    category: "parts",
    timestamp: "8 hours ago",
  },
  {
    id: 6,
    title: "System Notification",
    description: "Inventory database backup completed successfully",
    type: "system",
    severity: "low",
    category: "electronics",
    timestamp: "6 hours ago",
  },
  {
    id: 7,
    title: "Low Stock: Assembly Z",
    description: "Only 8 units remaining, below threshold of 15",
    type: "low-stock",
    severity: "medium",
    category: "assemblies",
    timestamp: "12 hours ago",
    itemName: "Assembly Z",
    itemId: 5,
  },
]
