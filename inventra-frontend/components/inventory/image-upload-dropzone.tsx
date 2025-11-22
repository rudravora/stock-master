"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Upload, X } from "lucide-react"

interface ImageUploadDropZoneProps {
  onImageUpload: (file: File | null, preview: string) => void
  preview: string
}

export default function ImageUploadDropZone({ onImageUpload, preview }: ImageUploadDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const previewUrl = e.target?.result as string
      onImageUpload(file, previewUrl)
    }
    reader.readAsDataURL(file)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleRemoveImage = () => {
    onImageUpload(null, "")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  if (preview) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative">
        <div className="relative w-full h-64 bg-slate-900/50 border border-slate-700 rounded-lg overflow-hidden">
          <motion.img
            src={preview}
            alt="Preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full object-cover"
          />
          <motion.button
            type="button"
            onClick={handleRemoveImage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-2 right-2 p-2 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-red-400" />
          </motion.button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      animate={{
        borderColor: isDragOver ? "rgba(16, 185, 129, 0.5)" : "rgba(55, 65, 81, 1)",
        backgroundColor: isDragOver ? "rgba(16, 185, 129, 0.05)" : "rgba(15, 23, 42, 0.5)",
      }}
      className="w-full px-6 py-8 border-2 border-dashed border-slate-700 rounded-lg bg-slate-900/50 transition-all duration-200 cursor-pointer"
      onClick={() => fileInputRef.current?.click()}
    >
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleInputChange} className="hidden" />

      <div className="flex flex-col items-center justify-center gap-3">
        <motion.div
          animate={{ scale: isDragOver ? 1.1 : 1 }}
          className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg"
        >
          <Upload className="w-6 h-6 text-emerald-400" />
        </motion.div>
        <div className="text-center">
          <p className="text-slate-200 font-medium">Drag and drop your image here</p>
          <p className="text-slate-400 text-sm">or click to browse</p>
        </div>
      </div>
    </motion.div>
  )
}
