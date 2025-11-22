"use client"

import type React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"

export default function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [shake, setShake] = useState(false)

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        setSuccess(true)
        setIsLoading(false)
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      }
    }, 1500)
  }

  return (
    <div className="relative w-full max-w-md">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
        .animate-shake { animation: shake 0.4s ease-in-out; }
        .form-input-group { animation: fadeInUp 0.5s ease-out forwards; }
      `}</style>

      <div className="backdrop-blur-xl bg-slate-800/20 border border-slate-700/40 rounded-2xl p-8 shadow-2xl select-none animate-fade-in-up">
        {/* Header */}
        <div className="mb-8 select-none" style={{ animation: "fadeInUp 0.5s ease-out 0.1s forwards", opacity: 0 }}>
          <h1
            className="text-7xl font-bold text-slate-100 tracking-tight mb-2 select-none"
            style={{
              fontFamily: "'Mirador', serif",
              letterSpacing: "-0.02em",
            }}
          >
            Inventra
          </h1>
          <p className="text-gray-400 text-sm font-medium select-none">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Error Alert */}
          {error && (
            <div
              className={`flex items-center gap-3 bg-red-500/10 border border-red-500/50 text-red-400 text-sm px-4 py-3 rounded-lg ${shake ? "animate-shake" : ""}`}
            >
              {/* Simple SVG icon instead of lucide-react AlertCircle */}
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4v2m0 0a9 9 0 11-9-9m9 9a9 9 0 009-9m-9 9a9 9 0 01-9-9m9 9a9 9 0 01-9-9m9 9a9 9 0 01-9-9m9 9a9 9 0 019-9m-9 9a9 9 0 01-9-9"
                />
              </svg>
              <span className="flex-1">{error}</span>
              <button
                type="button"
                onClick={() => setError("")}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Email Field */}
          <div
            className="relative form-input-group"
            style={{ animation: "fadeInUp 0.5s ease-out 0.15s forwards", opacity: 0 }}
          >
            <label className="block text-gray-300 text-sm font-medium mb-2 select-none">Email Address</label>
            <div className="relative group">
              <svg
                className="absolute left-3 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-emerald-400 transition-colors duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
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
              {email && (
                <div className="absolute right-3 top-3.5 transition-all duration-200">
                  {isValidEmail(email) ? (
                    <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div
            className="relative form-input-group"
            style={{ animation: "fadeInUp 0.5s ease-out 0.2s forwards", opacity: 0 }}
          >
            <label className="block text-gray-300 text-sm font-medium mb-2 select-none">Password</label>
            <div className="relative group">
              <svg
                className="absolute left-3 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-emerald-400 transition-colors duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
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
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM19.5 13a8.25 8.25 0 11-16.5 0 8.25 8.25 0 0116.5 0z"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div
            className="flex items-center form-input-group"
            style={{ animation: "fadeInUp 0.5s ease-out 0.25s forwards", opacity: 0 }}
          >
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded bg-slate-700/30 border border-slate-600/50 text-white checked:bg-slate-600/50 cursor-pointer"
            />
            <label htmlFor="remember" className="ml-3 text-gray-400 text-sm cursor-pointer select-none">
              Remember me
            </label>
          </div>

          <div style={{ animation: "fadeInUp 0.5s ease-out 0.3s forwards", opacity: 0 }}>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg font-semibold h-11 bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg flex items-center justify-center gap-2 select-none"
            >
              {isLoading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 text-sm px-4 py-2 rounded-lg text-center animate-fade-in-up">
              Login successful! Redirecting...
            </div>
          )}
        </form>

        <div
          className="mt-6 text-center text-gray-400 text-sm select-none form-input-group"
          style={{ animation: "fadeInUp 0.5s ease-out 0.35s forwards", opacity: 0 }}
        >
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-gray-200 font-semibold hover:text-emerald-400 transition-colors duration-200 relative inline-block"
          >
            Sign up
            <div className="absolute bottom-0 left-0 h-0.5 bg-emerald-400 w-0 hover:w-full transition-all duration-300" />
          </Link>
        </div>
      </div>

      <div className="absolute -top-1 -left-1 w-20 h-20 bg-emerald-500/20 rounded-full blur-2xl opacity-50" />
      <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-teal-500/20 rounded-full blur-2xl opacity-50" />
    </div>
  )
}
