"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 450 },
  { name: "Apr", value: 380 },
  { name: "May", value: 520 },
  { name: "Jun", value: 610 },
]

export function DashboardChart() {
  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-4 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-slate-100 mb-6">Inventory Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(71, 85, 105, 0.2)" />
          <XAxis dataKey="name" stroke="rgba(148, 163, 184, 0.5)" />
          <YAxis stroke="rgba(148, 163, 184, 0.5)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              border: "1px solid rgba(71, 85, 105, 0.4)",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "rgba(226, 232, 240, 1)" }}
          />
          <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
