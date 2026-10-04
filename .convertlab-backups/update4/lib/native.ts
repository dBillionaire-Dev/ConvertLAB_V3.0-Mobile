import { Capacitor } from "@capacitor/core"
import { getSettings } from "@/lib/client-store"

export function isNative(): boolean {
  return typeof window !== "undefined" && Capacitor.isNativePlatform()
}

/** Status bar styling + splash hide. No-op on the web. */
export async function initNative() {
  if (!isNative()) return
  try {
    const { StatusBar, Style } = await import("@capacitor/status-bar")
    await StatusBar.setStyle({ style: Style.Dark })
    await StatusBar.setBackgroundColor({ color: "#073a68" })
    await StatusBar.setOverlaysWebView({ overlay: false })
  } catch {}
  try {
    const { SplashScreen } = await import("@capacitor/splash-screen")
    await SplashScreen.hide()
  } catch {}
}

/** Android hardware back button. Returns an unsubscribe function. */
export async function listenBackButton(handler: (canGoBack: boolean) => void): Promise<() => void> {
  if (!isNative()) return () => {}
  const { App } = await import("@capacitor/app")
  const sub = await App.addListener("backButton", ({ canGoBack }) => handler(canGoBack))
  return () => { void sub.remove() }
}

export async function exitApp() {
  if (!isNative()) return
  const { App } = await import("@capacitor/app")
  await App.exitApp()
}

export async function haptic(kind: "light" | "success" = "light") {
  if (!isNative() || !getSettings().haptics) return
  try {
    const { Haptics, ImpactStyle, NotificationType } = await import("@capacitor/haptics")
    if (kind === "success") await Haptics.notification({ type: NotificationType.Success })
    else await Haptics.impact({ style: ImpactStyle.Light })
  } catch {}
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const el = document.createElement("textarea")
      el.value = text
      el.style.position = "fixed"
      el.style.opacity = "0"
      document.body.appendChild(el)
      el.select()
      const ok = document.execCommand("copy")
      el.remove()
      return ok
    } catch {
      return false
    }
  }
}

/** Native share sheet on Android, Web Share API where available, clipboard otherwise. */
export async function shareText(title: string, text: string): Promise<"shared" | "copied" | "cancelled" | "failed"> {
  try {
    if (isNative()) {
      const { Share } = await import("@capacitor/share")
      await Share.share({ title, text, dialogTitle: title })
      return "shared"
    }
    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share({ title, text })
      return "shared"
    }
    return (await copyText(text)) ? "copied" : "failed"
  } catch (err) {
    const msg = err instanceof Error ? `${err.name} ${err.message}` : ""
    return /abort|cancel/i.test(msg) ? "cancelled" : "failed"
  }
}

export async function openExternal(url: string) {
  if (isNative()) {
    const { Browser } = await import("@capacitor/browser")
    await Browser.open({ url })
  } else {
    window.open(url, "_blank", "noopener,noreferrer")
  }
}
