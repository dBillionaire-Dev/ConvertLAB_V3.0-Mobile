"use client"
import { useEffect, useState } from "react"
import { getFavorites } from "@/lib/client-store"

export function useFavorites(): string[] {
  const [ids, setIds] = useState<string[]>([])
  useEffect(() => {
    const sync = () => setIds(getFavorites())
    sync()
    window.addEventListener("convertlab:favorites", sync)
    window.addEventListener("storage", sync)
    return () => {
      window.removeEventListener("convertlab:favorites", sync)
      window.removeEventListener("storage", sync)
    }
  }, [])
  return ids
}
