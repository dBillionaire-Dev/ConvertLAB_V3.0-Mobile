"use client"
import { useEffect } from "react"
import { sendPresenceHeartbeat, syncAnalytics } from "@/lib/analytics/track"

const HEARTBEAT_MS = 60_000

/** While the app is on screen: a presence heartbeat every minute and a flush of any queued usage events. */
export function AnalyticsSync() {
  useEffect(() => {
    const visible = () => document.visibilityState === "visible"
    const ping = () => { if (visible()) { void sendPresenceHeartbeat(); void syncAnalytics() } }

    ping()
    const timer = window.setInterval(ping, HEARTBEAT_MS)
    const onVisible = () => ping()
    const onOnline = () => ping()
    const onSettings = () => ping()
    document.addEventListener("visibilitychange", onVisible)
    window.addEventListener("online", onOnline)
    window.addEventListener("convertlab:settings", onSettings)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener("visibilitychange", onVisible)
      window.removeEventListener("online", onOnline)
      window.removeEventListener("convertlab:settings", onSettings)
    }
  }, [])
  return null
}
