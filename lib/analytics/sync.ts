import type { CalculationEvent } from "./types"

export const BATCH_SIZE = 100

export interface SyncDeps {
  pending: () => CalculationEvent[]
  remove: (ids: string[]) => void
  /** Posts a batch; resolves with the ids the server accepted, or null on any failure. */
  send: (events: CalculationEvent[]) => Promise<string[] | null>
}

/** Sends queued events in batches of 100. Stops at the first failure and keeps what was not accepted. */
export async function flushEvents({ pending, remove, send }: SyncDeps): Promise<number> {
  const events = pending()
  let sent = 0
  for (let i = 0; i < events.length; i += BATCH_SIZE) {
    const accepted = await send(events.slice(i, i + BATCH_SIZE))
    if (!accepted) break
    remove(accepted)
    sent += accepted.length
  }
  return sent
}
