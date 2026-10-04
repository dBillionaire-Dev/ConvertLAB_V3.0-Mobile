export function toast(message: string) {
  if (typeof window === "undefined") return
  window.dispatchEvent(new CustomEvent("convertlab:toast", { detail: message }))
}
