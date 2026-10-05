"use client"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { exitApp, initNative, isNative, listenBackButton } from "@/lib/native"

/**
 * Renders nothing. Android-app behaviour only (no effect on the web):
 *  - status bar colour and splash screen
 *  - hardware back button: closes the menu or search first, then goes back, and exits on Home
 *  - keeps a tapped input visible above the keyboard
 */
export function NativeBridge() {
  const router = useRouter()
  const path = usePathname()
  const pathRef = useRef(path)
  pathRef.current = path

  useEffect(() => {
    if (!isNative()) return
    let off = () => {}
    let dead = false
    void initNative()
    void listenBackButton((canGoBack) => {
      if (document.documentElement.dataset.overlay) { window.dispatchEvent(new Event("convertlab:close-overlay")); return }
      if (pathRef.current === "/") { void exitApp(); return }
      if (canGoBack) router.back()
      else router.push("/")
    }).then((fn) => { if (dead) fn(); else off = fn })

    const onFocus = (e: FocusEvent) => {
      const el = e.target as HTMLElement | null
      if (el && /^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) {
        setTimeout(() => el.scrollIntoView({ block: "center", behavior: "smooth" }), 300)
      }
    }
    document.addEventListener("focusin", onFocus)
    return () => { dead = true; off(); document.removeEventListener("focusin", onFocus) }
  }, [router])

  return null
}
