export default function OrdersLoading() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
        <p className="text-slate-400 mt-4">Loading orders...</p>
      </div>
    </div>
  )
}
