"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, LogOut } from "lucide-react"

interface DangerZoneProps {
  onSuccess: (message: string) => void
  onError: (message: string) => void
}

export function DangerZone({ onSuccess, onError }: DangerZoneProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirmed, setDeleteConfirmed] = useState(false)

  const handleLogout = () => {
    onSuccess("Logging out...")
    // Simulate logout
    setTimeout(() => {
      window.location.href = "/login"
    }, 1000)
  }

  const handleDeleteAccount = async () => {
    if (!deleteConfirmed) {
      onError("Please confirm you want to delete your account")
      return
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onSuccess("Account deleted. Redirecting...")
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="bg-slate-800/30 backdrop-blur-xl border border-red-500/20 rounded-lg p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-500/10 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-slate-100">Danger Zone</h2>
        </div>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors font-medium"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowDeleteModal(true)}
            className="w-full px-4 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg transition-colors font-medium"
          >
            Delete Account
          </motion.button>
        </div>
      </motion.div>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowDeleteModal(false)
              setDeleteConfirmed(false)
            }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 max-w-md w-full mx-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-100">Delete Account</h3>
              </div>

              <p className="text-slate-300 text-sm mb-4">
                This action cannot be undone. All your data will be permanently deleted from our servers.
              </p>

              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deleteConfirmed}
                    onChange={(e) => setDeleteConfirmed(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-xs text-red-400">I understand and want to delete my account permanently</span>
                </label>
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowDeleteModal(false)
                    setDeleteConfirmed(false)
                  }}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDeleteAccount}
                  disabled={!deleteConfirmed}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-slate-600 text-white rounded-lg transition-colors font-medium"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
