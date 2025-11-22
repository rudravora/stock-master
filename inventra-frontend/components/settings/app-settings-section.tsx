"use client"

import { motion } from "framer-motion"
import { Settings } from "lucide-react"

interface AppSettingsSectionProps {
  onSuccess: (message: string) => void
  onError: (message: string) => void
}

export function AppSettingsSection({ onSuccess }: AppSettingsSectionProps) {
  const handleDataExport = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onSuccess("Data export initiated. Check your email.")
  }

  const handleClearCache = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    onSuccess("Local cache cleared successfully")
  }

  const handleResetLayout = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    onSuccess("Dashboard layout reset to default")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/40 rounded-lg p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-500/10 rounded-lg">
          <Settings className="w-5 h-5 text-emerald-400" />
        </div>
        <h2 className="text-xl font-semibold text-slate-100">App Settings</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-slate-200">Export Data</p>
            <p className="text-xs text-slate-400 mt-1">Download all your inventory data as CSV</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDataExport}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded-lg transition-colors font-medium"
          >
            Export
          </motion.button>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-slate-200">Clear Cache</p>
            <p className="text-xs text-slate-400 mt-1">Remove cached data to free up space</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClearCache}
            className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white text-sm rounded-lg transition-colors font-medium"
          >
            Clear
          </motion.button>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-slate-200">Reset Dashboard Layout</p>
            <p className="text-xs text-slate-400 mt-1">Restore default dashboard layout</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleResetLayout}
            className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white text-sm rounded-lg transition-colors font-medium"
          >
            Reset
          </motion.button>
        </div>

        <div className="p-4 bg-slate-900/50 rounded-lg">
          <p className="text-xs text-slate-400">App Version</p>
          <p className="text-sm font-medium text-slate-200 mt-1">Inventra v2.1.0</p>
        </div>
      </div>
    </motion.div>
  )
}
