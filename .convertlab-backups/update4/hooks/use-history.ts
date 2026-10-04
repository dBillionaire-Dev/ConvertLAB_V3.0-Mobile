"use client"
import { useEffect, useState } from "react"
import { getHistory, type HistoryItem } from "@/lib/client-store"

export function useHistory(): { items: HistoryItem[]; ready: boolean } {
  const [items, setItems] = useState<HistoryItem[]>([])
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const sync = () => { setItems(getHistory()); setReady(true) }
    sync()
    window.addEventListener("convertlab:history", sync)
    window.addEventListener("storage", sync)
    return () => {
      window.removeEventListener("convertlab:history", sync)
      window.removeEventListener("storage", sync)
    }
  }, [])
  return { items, ready }
}
