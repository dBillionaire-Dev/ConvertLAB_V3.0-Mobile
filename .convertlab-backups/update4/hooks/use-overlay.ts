"use client"
import { useEffect, useRef } from "react"

/** Marks an overlay (drawer, sheet) as open so the Android back button and Esc close it first. */
export function useOverlay(open: boolean, onClose: () => void) {
  const ref = useRef(onClose)
  ref.current = onClose
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    root.dataset.overlay = "1"
    const close = () => ref.current()
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") ref.current() }
    window.addEventListener("convertlab:close-overlay", close)
    window.addEventListener("keydown", key)
    return () => {
      delete root.dataset.overlay
      window.removeEventListener("convertlab:close-overlay", close)
      window.removeEventListener("keydown", key)
    }
  }, [open])
}
