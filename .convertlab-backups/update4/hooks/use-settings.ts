"use client"
import { useCallback, useEffect, useState } from "react"
import { defaultSettings, getSettings, saveSettings, type AppSettings } from "@/lib/client-store"

export function useSettings(): [AppSettings, (patch: Partial<AppSettings>) => void] {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings)
  useEffect(() => {
    const sync = () => setSettings(getSettings())
    sync()
    window.addEventListener("convertlab:settings", sync)
    return () => window.removeEventListener("convertlab:settings", sync)
  }, [])
  const patch = useCallback((p: Partial<AppSettings>) => saveSettings({ ...getSettings(), ...p }), [])
  return [settings, patch]
}
