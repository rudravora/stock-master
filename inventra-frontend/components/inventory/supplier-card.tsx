"use client"

import { motion } from "framer-motion"
import { Phone, Mail, Star, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Supplier {
  id: string
  name: string
  contact: string
  email: string
  lastOrderDate: string
  rating: number
}

interface SupplierCardProps {
  supplier: Supplier
}

export function SupplierCard({ supplier }: SupplierCardProps) {
  return (
    <Card className="bg-slate-900/40 backdrop-blur-xl border-slate-700/40 p-6 relative overflow-hidden group">
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        layoutId="supplierGlow"
      />

      <div className="relative z-10">
        <h3 className="font-serif text-lg font-bold text-white mb-4">{supplier.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(supplier.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-600"}`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-slate-400">{supplier.rating}</span>
        </div>

        {/* Contact Details */}
        <div className="space-y-3 mb-6">
          <motion.div whileHover={{ x: 4 }} className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
            <a
              href={`tel:${supplier.contact}`}
              className="text-sm text-slate-300 hover:text-teal-400 transition-colors truncate"
            >
              {supplier.contact}
            </a>
          </motion.div>
          <motion.div whileHover={{ x: 4 }} className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <a
              href={`mailto:${supplier.email}`}
              className="text-sm text-slate-300 hover:text-emerald-400 transition-colors truncate"
            >
              {supplier.email}
            </a>
          </motion.div>
        </div>

        {/* Last Order */}
        <div className="mb-6 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <p className="text-xs text-slate-400 mb-1">Last Order</p>
          <p className="text-sm font-medium text-slate-300">{new Date(supplier.lastOrderDate).toLocaleDateString()}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-slate-700/50 hover:bg-slate-800/50 text-xs bg-transparent"
          >
            Details
          </Button>
          <Button size="sm" className="flex-1 bg-teal-600 hover:bg-teal-700 text-xs">
            New Order
            <ArrowRight className="w-3 h-3 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
