"use client"

import { motion } from "framer-motion"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardNavbar } from "@/components/dashboard-navbar"
import AddItemForm from "@/components/inventory/add-item-form"
import AddItemLayout from "./layout"

function FloatingBlurs() {
  return (
    <>
      <motion.div
        className="absolute top-20 -left-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        style={{ backgroundColor: "rgba(16, 185, 129, 0.3)" }}
        animate={{ x: [0, 50, 0], y: [0, 80, 0] }}
        transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 -right-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        style={{ backgroundColor: "rgba(13, 148, 136, 0.3)" }}
        animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
        transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-8 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        style={{ backgroundColor: "rgba(16, 185, 129, 0.3)" }}
        animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
        transition={{ duration: 28, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </>
  )
}

function AddItemPageContent() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 overflow-hidden">
      <FloatingBlurs />

      <DashboardSidebar />
      <DashboardNavbar />

      <div className="relative z-10 mt-24 px-4 md:px-8 ml-0 md:ml-24 transition-all duration-300">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Add New Item</h1>
            <p className="text-slate-400">Create a new inventory item with details and specifications</p>
          </motion.div>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <AddItemForm />
          </motion.div>
        </div>
      </div>
    </main>
  )
}

export default function AddItemPage() {
  return (
    <AddItemLayout>
      <AddItemPageContent />
    </AddItemLayout>
  )
}
