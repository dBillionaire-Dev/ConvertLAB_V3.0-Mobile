"use client"

export type HistoryItem = {
  id: string
  type: "calculator" | "conversion"
  name: string
  subtitle: string
  result: string
  href: string
  at: number
}

const FAV_KEY = "convertlab:favorites:v3"
const HIST_KEY = "convertlab:history:v3"
const SETTINGS_KEY = "convertlab:settings:v3"

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try { return JSON.parse(localStorage.getItem(key) ?? "") as T } catch { return fallback }
}

export function getFavorites(): string[] { return read<string[]>(FAV_KEY, []) }
export function toggleFavorite(id: string): string[] {
  const current = getFavorites()
  const next = current.includes(id) ? current.filter(x => x !== id) : [...current, id]
  localStorage.setItem(FAV_KEY, JSON.stringify(next)); return next
}
export function addHistory(item: Omit<HistoryItem,"id"|"at">) {
  const current = read<HistoryItem[]>(HIST_KEY, [])
  const next = [{...item,id:crypto.randomUUID(),at:Date.now()}, ...current].slice(0,150)
  localStorage.setItem(HIST_KEY, JSON.stringify(next))
  window.dispatchEvent(new Event("convertlab:history"))
}
export function getHistory(): HistoryItem[] { return read<HistoryItem[]>(HIST_KEY, []) }
export function clearHistory(){ localStorage.removeItem(HIST_KEY); window.dispatchEvent(new Event("convertlab:history")) }

export type AppSettings = { theme:"system"|"light"|"dark"; fontSize:"small"|"medium"|"large"; offline:boolean; autoHistory:boolean }
export const defaultSettings: AppSettings = { theme:"system",fontSize:"medium",offline:true,autoHistory:true }
export function getSettings(): AppSettings { return {...defaultSettings,...read<Partial<AppSettings>>(SETTINGS_KEY,{})} }
export function saveSettings(s:AppSettings){ localStorage.setItem(SETTINGS_KEY,JSON.stringify(s)); window.dispatchEvent(new Event("convertlab:settings")) }
