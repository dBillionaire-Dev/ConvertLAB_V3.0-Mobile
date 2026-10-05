"use client"
import { getSettings } from "@/lib/client-store"
import { getAnonymousId } from "./client-id"
import { createOutbox } from "./outbox"
import { flushEvents } from "./sync"
import { analyticsAvailable, sendEvents, sendPresence } from "./http"
import { ANALYTICS_APP_VERSION, ANALYTICS_ENVIRONMENT, ANALYTICS_SOURCE } from "./config"

/** Analytics run only in the Android app, only when a backend URL was configured at build time, and only if the user has not opted out. */
export function analyticsEnabled(): boolean {
  return analyticsAvailable() && getSettings().analytics
}

const outbox = () => createOutbox(localStorage)
let inFlight: Promise<number> | null = null

export function syncAnalytics(): Promise<number> {
  if (!analyticsEnabled()) return Promise.resolve(0)
  if (inFlight) return inFlight
  const box = outbox()
  inFlight = flushEvents({ pending: box.pending, remove: box.remove, send: sendEvents }).finally(() => { inFlight = null })
  return inFlight
}

/** Records that a calculator or converter was used. Never includes inputs or results. Never throws. */
export async function trackCalculation(e: { calculatorId: string; calculatorName: string; category: string }) {
  try {
    if (!analyticsEnabled()) return
    outbox().add({
      id: crypto.randomUUID(),
      anonymousId: getAnonymousId(),
      calculatorId: e.calculatorId,
      calculatorName: e.calculatorName,
      category: e.category,
      occurredAt: new Date().toISOString(),
      appVersion: ANALYTICS_APP_VERSION,
      wasOffline: typeof navigator !== "undefined" ? !navigator.onLine : false,
      source: ANALYTICS_SOURCE,
      environment: ANALYTICS_ENVIRONMENT,
    })
    void syncAnalytics()
  } catch {
    // Analytics must never break a calculator.
  }
}

export async function sendPresenceHeartbeat(): Promise<void> {
  try {
    if (!analyticsEnabled()) return
    await sendPresence({ anonymousId: getAnonymousId(), source: ANALYTICS_SOURCE, environment: ANALYTICS_ENVIRONMENT, appVersion: ANALYTICS_APP_VERSION })
  } catch {}
}
