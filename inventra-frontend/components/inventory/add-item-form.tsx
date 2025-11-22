"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertCircle, CheckCircle } from "lucide-react"
import ImageUploadDropZone from "./image-upload-dropzone"

interface FormErrors {
  [key: string]: string
}

export default function AddItemForm() {
  const [formData, setFormData] = useState({
    itemName: "",
    sku: "",
    category: "",
    supplierName: "",
    unitPrice: "",
    quantity: "",
    minStock: "",
    maxStock: "",
    aisle: "",
    shelf: "",
    bin: "",
    description: "",
    autoReorder: false,
  })

  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const categories = ["Electronics", "Parts", "Assemblies", "Components", "Accessories", "Other"]

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!formData.itemName.trim()) newErrors.itemName = "Item name is required"
    if (!formData.sku.trim()) newErrors.sku = "SKU is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.supplierName.trim()) newErrors.supplierName = "Supplier name is required"
    if (!formData.unitPrice || Number.parseFloat(formData.unitPrice) <= 0)
      newErrors.unitPrice = "Unit price must be greater than 0"
    if (!formData.quantity || Number.parseFloat(formData.quantity) < 0)
      newErrors.quantity = "Quantity must be 0 or greater"
    if (!formData.minStock || Number.parseFloat(formData.minStock) < 0) newErrors.minStock = "Minimum stock is required"
    if (!formData.maxStock || Number.parseFloat(formData.maxStock) < 0) newErrors.maxStock = "Maximum stock is required"
    if (Number.parseFloat(formData.minStock) >= Number.parseFloat(formData.maxStock))
      newErrors.maxStock = "Maximum stock must be greater than minimum stock"
    if (!formData.aisle.trim()) newErrors.aisle = "Aisle is required"
    if (!formData.shelf.trim()) newErrors.shelf = "Shelf is required"
    if (!formData.bin.trim()) newErrors.bin = "Bin is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }))
    } else if (name === "sku") {
      setFormData((prev) => ({
        ...prev,
        [name]: value.toUpperCase(),
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleImageUpload = (file: File | null, preview: string) => {
    setImage(file)
    setImagePreview(preview)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      setErrorMessage("Please fix the errors above")
      return
    }

    setIsSubmitting(true)
    setErrorMessage("")
    setSuccessMessage("")

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock success
      setSuccessMessage("Item added successfully! Redirecting...")
      setFormData({
        itemName: "",
        sku: "",
        category: "",
        supplierName: "",
        unitPrice: "",
        quantity: "",
        minStock: "",
        maxStock: "",
        aisle: "",
        shelf: "",
        bin: "",
        description: "",
        autoReorder: false,
      })
      setImage(null)
      setImagePreview("")

      // Simulate redirect after delay
      setTimeout(() => {
        window.location.href = "/inventory"
      }, 1000)
    } catch (error) {
      setErrorMessage("Failed to add item. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="relative">
      {/* Success Banner */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center gap-3"
        >
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-emerald-300">{successMessage}</span>
        </motion.div>
      )}

      {/* Error Banner */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-400" />
          <span className="text-red-300">{errorMessage}</span>
        </motion.div>
      )}

      {/* Main Form Card */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-slate-800/40 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-8 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          {/* Row 1: Item Name & SKU */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Item Name"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              error={errors.itemName}
              placeholder="e.g., Industrial Widget A"
            />
            <FormField
              label="SKU / Product Code"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              error={errors.sku}
              placeholder="AUTO-UPPERCASE"
            />
          </motion.div>

          {/* Row 2: Category & Supplier */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg text-slate-200 focus:outline-none transition-all ${
                  errors.category
                    ? "border-red-500/50 focus:border-red-400 focus:ring-red-400/20"
                    : "border-slate-700 focus:border-emerald-500 focus:ring-emerald-400/20"
                } focus:ring-2`}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.category}
                </p>
              )}
            </div>
            <FormField
              label="Supplier Name"
              name="supplierName"
              value={formData.supplierName}
              onChange={handleChange}
              error={errors.supplierName}
              placeholder="e.g., Global Tech Supplies"
            />
          </motion.div>

          {/* Row 3: Unit Price & Quantity */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Unit Price"
              name="unitPrice"
              type="number"
              value={formData.unitPrice}
              onChange={handleChange}
              error={errors.unitPrice}
              placeholder="0.00"
              prefix="₹"
            />
            <FormField
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              error={errors.quantity}
              placeholder="0"
            />
          </motion.div>

          {/* Row 4: Min & Max Stock */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Minimum Stock Threshold"
              name="minStock"
              type="number"
              value={formData.minStock}
              onChange={handleChange}
              error={errors.minStock}
              placeholder="0"
            />
            <FormField
              label="Maximum Stock Level"
              name="maxStock"
              type="number"
              value={formData.maxStock}
              onChange={handleChange}
              error={errors.maxStock}
              placeholder="0"
            />
          </motion.div>

          {/* Row 5: Warehouse Location */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
            <FormField
              label="Aisle"
              name="aisle"
              value={formData.aisle}
              onChange={handleChange}
              error={errors.aisle}
              placeholder="A"
            />
            <FormField
              label="Shelf"
              name="shelf"
              value={formData.shelf}
              onChange={handleChange}
              error={errors.shelf}
              placeholder="1"
            />
            <FormField
              label="Bin"
              name="bin"
              value={formData.bin}
              onChange={handleChange}
              error={errors.bin}
              placeholder="1A"
            />
          </motion.div>

          {/* Row 6: Description */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description (Optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add any additional details about this item..."
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20 transition-all resize-none h-24"
            />
          </motion.div>

          {/* Row 7: Image Upload */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-slate-300 mb-2">Upload Image (Optional)</label>
            <ImageUploadDropZone onImageUpload={handleImageUpload} preview={imagePreview} />
          </motion.div>

          {/* Row 8: Auto-reorder Checkbox */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <input
              type="checkbox"
              id="autoReorder"
              name="autoReorder"
              checked={formData.autoReorder}
              onChange={handleChange}
              className="w-5 h-5 bg-slate-900/50 border border-slate-700 rounded accent-emerald-500 cursor-pointer"
            />
            <label htmlFor="autoReorder" className="text-sm text-slate-300 cursor-pointer">
              Auto-generate reorder suggestion when below minimum
            </label>
          </motion.div>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex gap-4 pt-4">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  Adding Item...
                </>
              ) : (
                "Add Item"
              )}
            </motion.button>
            <motion.button
              type="button"
              onClick={() => (window.location.href = "/inventory")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-slate-700/50 text-slate-200 font-medium rounded-lg hover:bg-slate-700 transition-colors"
            >
              Cancel
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.form>
    </div>
  )
}

interface FormFieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  placeholder?: string
  type?: string
  prefix?: string
}

function FormField({ label, name, value, onChange, error, placeholder, type = "text", prefix }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      <div className="relative">
        {prefix && <span className="absolute left-4 top-3 text-slate-400 font-medium">{prefix}</span>}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none transition-all ${
            prefix ? "pl-8" : ""
          } ${
            error
              ? "border-red-500/50 focus:border-red-400 focus:ring-red-400/20"
              : "border-slate-700 focus:border-emerald-500 focus:ring-emerald-400/20"
          } focus:ring-2`}
        />
      </div>
      {error && (
        <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  )
}
