"use client"
import { useEffect } from "react"
import { getSettings } from "@/lib/client-store"
import { isNative } from "@/lib/native"

/** Web/PWA only: registers the offline cache when "Offline mode" is on, removes it when off. Never runs inside the Android app. */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return
    const sync = () => {
      const on = getSettings().offline && process.env.NODE_ENV === "production" && !isNative()
      if (on) {
        navigator.serviceWorker.register("/sw.js").catch(() => {})
      } else {
        navigator.serviceWorker.getRegistrations().then((rs) => rs.forEach((r) => r.unregister())).catch(() => {})
        if ("caches" in window) caches.keys().then((ks) => ks.forEach((k) => caches.delete(k))).catch(() => {})
      }
    }
    sync()
    window.addEventListener("convertlab:settings", sync)
    return () => window.removeEventListener("convertlab:settings", sync)
  }, [])
  return null
}
