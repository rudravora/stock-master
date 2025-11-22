"use client"

import LoginForm from "@/components/login-form"

export default function LoginPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950" />

      {/* Animated orbs using CSS animations instead of framer-motion */}
      <div className="fixed top-20 -left-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 bg-emerald-500 animate-pulse" />
      <div
        className="fixed top-40 -right-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 bg-teal-500 animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="fixed -bottom-8 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 bg-emerald-500 animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="animate-fade-in">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
