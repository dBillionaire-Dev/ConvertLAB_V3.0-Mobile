import { describe, expect, it } from "vitest"
import { createOutbox, OUTBOX_CAP } from "./outbox"
import { BATCH_SIZE, flushEvents } from "./sync"
import { getAnonymousId } from "./client-id"
import type { CalculationEvent } from "./types"

function memory() {
  const m = new Map<string, string>()
  return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v) }
}
let n = 0
const ev = (over: Partial<CalculationEvent> = {}): CalculationEvent => ({
  id: `00000000-0000-4000-8000-${String(++n).padStart(12, "0")}`,
  anonymousId: "anon", calculatorId: "bmi", calculatorName: "BMI", category: "general",
  occurredAt: new Date(1_700_000_000_000 + n * 1000).toISOString(),
  appVersion: "3.0.0", wasOffline: false, source: "android", environment: "test", ...over,
})

describe("anonymous id", () => {
  it("is created once and then reused", () => {
    const s = memory()
    const a = getAnonymousId(s)
    expect(a).toMatch(/^[0-9a-f-]{36}$/)
    expect(getAnonymousId(s)).toBe(a)
  })
})

describe("outbox", () => {
  it("queues, de-duplicates by id and removes accepted events", () => {
    const box = createOutbox(memory())
    const a = ev(); const b = ev()
    box.add(a); box.add(a); box.add(b)
    expect(box.pending()).toHaveLength(2)
    box.remove([a.id])
    expect(box.pending().map((e) => e.id)).toEqual([b.id])
  })
  it("returns oldest first and survives corrupt storage", () => {
    const s = memory()
    s.setItem("convertlab:analytics-outbox:v1", "{not json")
    const box = createOutbox(s)
    expect(box.pending()).toEqual([])
    const late = ev({ occurredAt: "2030-01-01T00:00:00.000Z" }); const early = ev({ occurredAt: "2020-01-01T00:00:00.000Z" })
    box.add(late); box.add(early)
    expect(box.pending()[0].id).toBe(early.id)
  })
  it("drops the oldest events past the cap", () => {
    const box = createOutbox(memory(), "k", 3)
    const all = [ev(), ev(), ev(), ev(), ev()]
    all.forEach((e) => box.add(e))
    expect(box.pending().map((e) => e.id)).toEqual(all.slice(-3).map((e) => e.id))
    expect(OUTBOX_CAP).toBe(500)
  })
})

describe("flushEvents", () => {
  it("sends in batches of 100 and removes accepted ids", async () => {
    const box = createOutbox(memory(), "k", 1000)
    for (let i = 0; i < 250; i++) box.add(ev())
    const sizes: number[] = []
    const sent = await flushEvents({
      pending: box.pending, remove: box.remove,
      send: async (batch) => { sizes.push(batch.length); return batch.map((e) => e.id) },
    })
    expect(sizes).toEqual([BATCH_SIZE, BATCH_SIZE, 50])
    expect(sent).toBe(250)
    expect(box.pending()).toHaveLength(0)
  })
  it("keeps everything and stops when the server fails", async () => {
    const box = createOutbox(memory(), "k", 1000)
    for (let i = 0; i < 150; i++) box.add(ev())
    let calls = 0
    const sent = await flushEvents({ pending: box.pending, remove: box.remove, send: async () => { calls++; return null } })
    expect(sent).toBe(0)
    expect(calls).toBe(1)
    expect(box.pending()).toHaveLength(150)
  })
  it("only removes the ids the server accepted", async () => {
    const box = createOutbox(memory())
    const a = ev(); const b = ev()
    box.add(a); box.add(b)
    await flushEvents({ pending: box.pending, remove: box.remove, send: async () => [a.id] })
    expect(box.pending().map((e) => e.id)).toEqual([b.id])
  })
})
