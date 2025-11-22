"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Lock } from "lucide-react"
import { SettingsToggle } from "./toggle"

interface SecuritySectionProps {
  onSuccess: (message: string) => void
  onError: (message: string) => void
}

export function SecuritySection({ onSuccess, onError }: SecuritySectionProps) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [twoFAEnabled, setTwoFAEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showTwoFASetup, setShowTwoFASetup] = useState(false)

  const passwordRequirements = [
    { label: "At least 8 characters", met: newPassword.length >= 8 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(newPassword) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(newPassword) },
    { label: "Contains number", met: /[0-9]/.test(newPassword) },
  ]

  const handlePasswordUpdate = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      onError("Please fill all password fields")
      return
    }
    if (newPassword !== confirmPassword) {
      onError("Passwords do not match")
      return
    }
    if (!passwordRequirements.every((req) => req.met)) {
      onError("Password does not meet requirements")
      return
    }

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    onSuccess("Password updated successfully")
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/40 rounded-lg p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-500/10 rounded-lg">
          <Lock className="w-5 h-5 text-emerald-400" />
        </div>
        <h2 className="text-xl font-semibold text-slate-100">Password & Security</h2>
      </div>

      <div className="space-y-6">
        {/* Password Update */}
        <div className="space-y-4 pb-6 border-b border-slate-700/40">
          <h3 className="text-sm font-medium text-slate-200">Change Password</h3>

          <div>
            <label className="text-sm text-slate-400 mb-2 block">Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700/30 border border-slate-600/50 rounded-lg text-slate-300 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-sm text-slate-400 mb-2 block">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700/30 border border-slate-600/50 rounded-lg text-slate-300 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-sm text-slate-400 mb-2 block">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700/30 border border-slate-600/50 rounded-lg text-slate-300 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Requirements */}
          <div className="space-y-2 bg-slate-900/50 p-3 rounded-lg">
            <p className="text-xs text-slate-400">Password Requirements:</p>
            {passwordRequirements.map((req, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full transition-colors ${req.met ? "bg-emerald-500" : "bg-slate-700"}`}
                />
                <span className={`text-xs ${req.met ? "text-emerald-400" : "text-slate-400"}`}>{req.label}</span>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            onClick={handlePasswordUpdate}
            className="w-full px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-600 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </motion.button>
        </div>

        {/* Two-Factor Authentication */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-200">Two-Factor Authentication</h3>
              <p className="text-xs text-slate-400 mt-1">Add an extra layer of security to your account</p>
            </div>
            <SettingsToggle
              checked={twoFAEnabled}
              onChange={(checked) => {
                setTwoFAEnabled(checked)
                if (checked) {
                  setShowTwoFASetup(true)
                  onSuccess("2FA setup initiated")
                } else {
                  setShowTwoFASetup(false)
                  onSuccess("2FA disabled")
                }
              }}
            />
          </div>

          {showTwoFASetup && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 p-4 rounded-lg space-y-3"
            >
              <p className="text-xs text-slate-300">Scan this QR code with your authenticator app:</p>
              <div className="w-32 h-32 bg-slate-700 rounded-lg flex items-center justify-center text-xs text-slate-400">
                QR Code
              </div>
              <p className="text-xs text-slate-400">Recovery codes (save in safe place):</p>
              <div className="font-mono text-xs text-slate-300 space-y-1">
                <div>XXXX-XXXX-XXXX</div>
                <div>XXXX-XXXX-XXXX</div>
                <div>XXXX-XXXX-XXXX</div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
