import { CapacitorHttp } from "@capacitor/core"
import { isNative } from "@/lib/native"
import { ANALYTICS_BASE_URL, ANALYTICS_ENDPOINTS } from "./config"
import type { CalculationEvent } from "./types"

const TIMEOUT_MS = 8000

/**
 * Uses Capacitor's NATIVE HTTP client, not fetch(): requests leave the phone directly, so the backend does not need
 * CORS rules for the app, and normal in-app page loading is untouched.
 */
async function post(url: string, data: unknown): Promise<{ status: number; data: unknown } | null> {
  try {
    const res = await CapacitorHttp.post({
      url,
      headers: { "Content-Type": "application/json" },
      data,
      connectTimeout: TIMEOUT_MS,
      readTimeout: TIMEOUT_MS,
    })
    return { status: res.status, data: res.data }
  } catch {
    return null
  }
}

export function analyticsAvailable(): boolean {
  return isNative() && ANALYTICS_BASE_URL.length > 0
}

export async function sendEvents(events: CalculationEvent[]): Promise<string[] | null> {
  const res = await post(ANALYTICS_ENDPOINTS.events, { events })
  if (!res || res.status < 200 || res.status >= 300) return null
  const body = typeof res.data === "string" ? safeParse(res.data) : res.data
  const accepted = (body as { accepted?: unknown } | null)?.accepted
  return Array.isArray(accepted) ? accepted.filter((x): x is string => typeof x === "string") : null
}

export async function sendPresence(payload: { anonymousId: string; source: string; environment: string; appVersion: string }): Promise<boolean> {
  const res = await post(ANALYTICS_ENDPOINTS.presence, payload)
  return !!res && res.status >= 200 && res.status < 300
}

function safeParse(text: string): unknown {
  try { return JSON.parse(text) } catch { return null }
}
