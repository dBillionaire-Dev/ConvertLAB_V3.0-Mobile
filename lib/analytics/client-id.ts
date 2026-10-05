const STORAGE_KEY = "convertlab:anonymous-id"

/** A random ID created on first use and kept on the device. It identifies an installation, never a person. */
export function getAnonymousId(storage: Pick<Storage, "getItem" | "setItem"> = localStorage): string {
  let id = storage.getItem(STORAGE_KEY)
  if (!id) {
    id = crypto.randomUUID()
    storage.setItem(STORAGE_KEY, id)
  }
  return id
}
