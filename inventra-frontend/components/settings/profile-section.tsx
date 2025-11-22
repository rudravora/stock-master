"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Upload } from "lucide-react"
import { EditProfileModal } from "./edit-profile-modal"

interface ProfileSectionProps {
  onSuccess: (message: string) => void
  onError: (message: string) => void
}

export function ProfileSection({ onSuccess, onError }: ProfileSectionProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/40 rounded-lg p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <User className="w-5 h-5 text-emerald-400" />
          </div>
          <h2 className="text-xl font-semibold text-slate-100">Profile Information</h2>
        </div>

        <div className="space-y-6">
          {/* Avatar */}
          <div className="flex items-end gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex-shrink-0" />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-lg text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-2 text-sm"
            >
              <Upload className="w-4 h-4" />
              Change Avatar
            </motion.button>
          </div>

          {/* User Info */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Full Name</label>
            <input
              type="text"
              value="John Doe"
              disabled
              className="w-full px-4 py-2 bg-slate-700/30 border border-slate-600/50 rounded-lg text-slate-300 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="text-sm text-slate-400 mb-2 block">Email Address</label>
            <input
              type="email"
              value="john.doe@inventra.com"
              disabled
              className="w-full px-4 py-2 bg-slate-700/30 border border-slate-600/50 rounded-lg text-slate-300 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="text-sm text-slate-400 mb-2 block">Role</label>
            <input
              type="text"
              value="Manager"
              disabled
              className="w-full px-4 py-2 bg-slate-700/30 border border-slate-600/50 rounded-lg text-slate-300 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="text-sm text-slate-400 mb-2 block">User ID</label>
            <div className="flex gap-2">
              <input
                type="text"
                value="USR-2024-001"
                disabled
                className="flex-1 px-4 py-2 bg-slate-700/30 border border-slate-600/50 rounded-lg text-slate-300 disabled:opacity-50 font-mono text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigator.clipboard.writeText("USR-2024-001")
                  onSuccess("User ID copied to clipboard")
                }}
                className="px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-lg text-slate-300 text-sm"
              >
                Copy
              </motion.button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsEditModalOpen(true)}
            className="w-full px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-medium"
          >
            Edit Profile
          </motion.button>
        </div>
      </motion.div>

      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSuccess={onSuccess} />
    </>
  )
}
