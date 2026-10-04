"use client"
import { useOverlay } from "@/hooks/use-overlay"

export function ConfirmSheet({ open, title, message, confirmLabel, onConfirm, onCancel }: {
  open: boolean; title: string; message: string; confirmLabel: string; onConfirm: () => void; onCancel: () => void
}) {
  useOverlay(open, onCancel)
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center lg:items-center">
      <button aria-label="Cancel" className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div role="alertdialog" aria-modal="true" aria-labelledby="confirm-title"
        className="sheet relative w-full max-w-md rounded-t-3xl bg-white p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl lg:rounded-3xl">
        <h2 id="confirm-title" className="text-base font-black">{title}</h2>
        <p className="mt-1 text-sm leading-5 text-slate-600">{message}</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button autoFocus onClick={onCancel} className="press min-h-12 rounded-xl border px-4 text-sm font-bold">Cancel</button>
          <button onClick={onConfirm} className="press min-h-12 rounded-xl bg-red-600 px-4 text-sm font-extrabold text-white">{confirmLabel}</button>
        </div>
      </div>
    </div>
  )
}
