import type { CalculationEvent } from "./types"

type KV = Pick<Storage, "getItem" | "setItem">

export const OUTBOX_KEY = "convertlab:analytics-outbox:v1"
export const OUTBOX_CAP = 500

/** Small persistent queue so events survive being offline or the app closing. Oldest are dropped past the cap. */
export function createOutbox(storage: KV, key = OUTBOX_KEY, cap = OUTBOX_CAP) {
  function read(): CalculationEvent[] {
    try {
      const raw = storage.getItem(key)
      const parsed: unknown = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? (parsed as CalculationEvent[]) : []
    } catch {
      return []
    }
  }
  function write(events: CalculationEvent[]) {
    try { storage.setItem(key, JSON.stringify(events.slice(-cap))) } catch {}
  }
  return {
    add(event: CalculationEvent) {
      const events = read()
      if (!events.some((e) => e.id === event.id)) write([...events, event])
    },
    pending(): CalculationEvent[] {
      return read().sort((a, b) => a.occurredAt.localeCompare(b.occurredAt))
    },
    remove(ids: string[]) {
      if (!ids.length) return
      const gone = new Set(ids)
      write(read().filter((e) => !gone.has(e.id)))
    },
    clear() { write([]) },
  }
}
