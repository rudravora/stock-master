"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardNavbar } from "@/components/dashboard-navbar"
import SettingsLayout from "./layout"
import { ProfileSection } from "@/components/settings/profile-section"
import { SecuritySection } from "@/components/settings/security-section"
import { NotificationsSection } from "@/components/settings/notifications-section"
import { AppearanceSection } from "@/components/settings/appearance-section"
import { AppSettingsSection } from "@/components/settings/app-settings-section"
import { DangerZone } from "@/components/settings/danger-zone"

function SettingsPageContent() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const showSuccess = (message: string) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(null), 3000)
  }

  const showError = (message: string) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 3000)
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

      {/* Vignette Overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)",
        }}
      />

      {/* Animated Blur Circles */}
      <div
        className="fixed top-20 -left-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        style={{ backgroundColor: "rgba(16, 185, 129, 0.3)" }}
      />
      <div
        className="fixed top-40 -right-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        style={{ backgroundColor: "rgba(13, 148, 136, 0.3)" }}
      />
      <div
        className="fixed -bottom-8 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        style={{ backgroundColor: "rgba(16, 185, 129, 0.2)" }}
      />

      {/* Sidebar */}
      <DashboardSidebar />

      {/* Navbar */}
      <DashboardNavbar />

      {/* Main Content */}
      <div className="relative z-10 pt-24 px-4 md:px-8 ml-0 md:ml-24 transition-all duration-300 pb-12">
        {/* Success Banner */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/50 rounded-lg text-emerald-400"
          >
            {successMessage}
          </motion.div>
        )}

        {/* Error Banner */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400"
          >
            {errorMessage}
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold font-serif bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-slate-400 mt-2">Manage your profile, preferences, and account</p>
        </motion.div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
          {/* Left Column */}
          <div className="space-y-8">
            <ProfileSection onSuccess={showSuccess} onError={showError} />
            <SecuritySection onSuccess={showSuccess} onError={showError} />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <NotificationsSection onSuccess={showSuccess} onError={showError} />
            <AppearanceSection onSuccess={showSuccess} onError={showError} />
          </div>
        </div>

        {/* Full Width Sections */}
        <div className="space-y-8 mt-8 max-w-6xl">
          <AppSettingsSection onSuccess={showSuccess} onError={showError} />
          <DangerZone onSuccess={showSuccess} onError={showError} />
        </div>
      </div>
    </main>
  )
}

export default function SettingsPage() {
  return (
    <SettingsLayout>
      <SettingsPageContent />
    </SettingsLayout>
  )
}
