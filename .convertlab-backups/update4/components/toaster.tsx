"use client"
import { useEffect, useState } from "react"

export function Toaster() {
  const [msg, setMsg] = useState("")
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    const on = (e: Event) => {
      setMsg(String((e as CustomEvent).detail))
      clearTimeout(timer)
      timer = setTimeout(() => setMsg(""), 2200)
    }
    window.addEventListener("convertlab:toast", on)
    return () => { window.removeEventListener("convertlab:toast", on); clearTimeout(timer) }
  }, [])
  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-[calc(88px+env(safe-area-inset-bottom))] z-[60] flex justify-center px-4 lg:bottom-6">
      {msg && <div className="reveal rounded-full border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-lg">{msg}</div>}
    </div>
  )
}
