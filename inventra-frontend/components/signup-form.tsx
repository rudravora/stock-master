"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle, Loader2, X, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function SignupForm() {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [shake, setShake] = useState(false)
  const [revealActive, setRevealActive] = useState(false)

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const isPasswordMatch = password === confirmPassword && password.length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    console.log("[v0] Form submitted")

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address")
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    if (!isPasswordMatch) {
      setError("Passwords do not match")
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    setIsLoading(true)
    console.log("[v0] Loading started")

    // Simulate API call
    setTimeout(() => {
      console.log("[v0] Success state triggered")
      setSuccess(true)
      setIsLoading(false)
      setRevealActive(true)

      setTimeout(() => {
        console.log("[v0] About to redirect to /")
        router.push("/")
      }, 2000)
    }, 1500)
  }

  return (
    <div className="relative w-full max-w-md">
      {revealActive && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 pointer-events-none"
          initial={{ clipPath: "circle(0% at 0% 0%)" }}
          animate={{ clipPath: "circle(150% at 0% 0%)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      )}

      <motion.div
        className="backdrop-blur-xl bg-slate-800/20 border border-slate-700/40 rounded-2xl p-8 shadow-2xl select-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15, duration: 0.5 }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 select-none"
        >
          <h1
            className="text-7xl font-bold text-slate-100 tracking-tight mb-2 select-none"
            style={{
              fontFamily: "'Mirador', serif",
              letterSpacing: "-0.02em",
            }}
          >
            Inventra
          </h1>
          <p className="text-gray-400 text-sm font-medium select-none">Create your account</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatePresence>
            {error && (
              <motion.div
                animate={shake ? { x: [-10, 10, -10, 10, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                initial={{ opacity: 0, y: -10 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 bg-red-500/10 border border-red-500/50 text-red-400 text-sm px-4 py-3 rounded-lg"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1">{error}</span>
                <button
                  type="button"
                  onClick={() => setError("")}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Full Name Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative"
          >
            <label className="block text-gray-300 text-sm font-medium mb-2 select-none">Full Name</label>
            <div className="relative group">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-emerald-400 transition-colors duration-200" />
              <Input
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value)
                  setError("")
                }}
                className="pl-10 pr-10 bg-slate-700/20 border border-slate-600/30 text-white placeholder:text-gray-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/50 focus:bg-slate-700/40 transition-all duration-200 rounded-lg h-11 select-text"
              />
            </div>
          </motion.div>

          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <label className="block text-gray-300 text-sm font-medium mb-2 select-none">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-emerald-400 transition-colors duration-200" />
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError("")
                }}
                className="pl-10 pr-10 bg-slate-700/20 border border-slate-600/30 text-white placeholder:text-gray-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/50 focus:bg-slate-700/40 transition-all duration-200 rounded-lg h-11 select-text"
              />
              <AnimatePresence>
                {email && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-3 top-3.5"
                  >
                    {isValidEmail(email) ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-500" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="relative"
          >
            <label className="block text-gray-300 text-sm font-medium mb-2 select-none">Password</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-emerald-400 transition-colors duration-200" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError("")
                }}
                className="pl-10 pr-10 bg-slate-700/20 border border-slate-600/30 text-white placeholder:text-gray-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/50 focus:bg-slate-700/40 transition-all duration-200 rounded-lg h-11 select-text"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-300 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>

          {/* Confirm Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <label className="block text-gray-300 text-sm font-medium mb-2 select-none">Confirm Password</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-emerald-400 transition-colors duration-200" />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  setError("")
                }}
                className="pl-10 pr-10 bg-slate-700/20 border border-slate-600/30 text-white placeholder:text-gray-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/50 focus:bg-slate-700/40 transition-all duration-200 rounded-lg h-11 select-text"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-300 transition-colors duration-200"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              <AnimatePresence>
                {confirmPassword && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-10 top-3.5"
                  >
                    {isPasswordMatch ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-500" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg font-semibold h-11 bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg flex items-center justify-center gap-2 select-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </motion.div>

          {/* Success Message */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 text-sm px-4 py-2 rounded-lg text-center"
              >
                Account created! Redirecting...
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 text-center text-gray-400 text-sm select-none"
        >
          Already have an account?{" "}
          <Link href="/">
            <motion.a
              className="text-gray-200 font-semibold transition-colors duration-200 relative inline-block"
              whileHover={{ color: "#10b981" }}
            >
              Sign in
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-emerald-400"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </Link>
        </motion.div>
      </motion.div>

      <div className="absolute -top-1 -left-1 w-20 h-20 bg-emerald-500/20 rounded-full blur-2xl opacity-50" />
      <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-teal-500/20 rounded-full blur-2xl opacity-50" />
    </div>
  )
}
