import { getSettings, type AppSettings } from "@/lib/client-store"

const DARK_QUERY = "(prefers-color-scheme: dark)"

export function resolveDark(theme: AppSettings["theme"]): boolean {
  if (theme === "dark") return true
  if (theme === "light") return false
  return typeof window !== "undefined" && window.matchMedia(DARK_QUERY).matches
}

/** Applies theme (system/light/dark) and font size to <html>. */
export function applyAppearance(s: AppSettings = getSettings()) {
  const root = document.documentElement
  const dark = resolveDark(s.theme)
  root.classList.toggle("dark", dark)
  root.dataset.theme = s.theme
  root.style.colorScheme = dark ? "dark" : "light"
  root.style.fontSize = s.fontSize === "small" ? "15px" : s.fontSize === "large" ? "18px" : "16px"
}

/** Applies now, then re-applies when settings change or the OS theme flips. Returns a cleanup fn. */
export function watchAppearance() {
  const run = () => applyAppearance()
  run()
  const mq = window.matchMedia(DARK_QUERY)
  mq.addEventListener("change", run)
  window.addEventListener("convertlab:settings", run)
  window.addEventListener("storage", run)
  return () => {
    mq.removeEventListener("change", run)
    window.removeEventListener("convertlab:settings", run)
    window.removeEventListener("storage", run)
  }
}
