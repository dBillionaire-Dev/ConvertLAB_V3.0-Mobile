"use client"
import Link from "next/link"
import { Clock3, Search as SearchIcon, X } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { addRecentSearch, clearRecentSearches, getRecentSearches } from "@/lib/client-store"
import { runSearch, SEARCH_GROUPS } from "@/lib/search-index"

const SUGGESTIONS = ["creatinine", "BMI", "anion gap", "temperature", "dilution", "artesunate"]

export default function SearchPage() {
  const [q, setQ] = useState("")
  const [recent, setRecent] = useState<string[]>([])
  useEffect(() => {
    const sync = () => setRecent(getRecentSearches())
    sync()
    window.addEventListener("convertlab:searches", sync)
    return () => window.removeEventListener("convertlab:searches", sync)
  }, [])

  const results = useMemo(() => runSearch(q), [q])
  const total = SEARCH_GROUPS.reduce((n, g) => n + results[g].length, 0)
  const searching = q.trim().length > 0

  return (
    <div className="page">
      <h1 className="sr-only">Search</h1>
      <div className="card sticky z-20 flex items-center gap-2 px-3" style={{ top: "calc(4rem + env(safe-area-inset-top) + 8px)" }}>
        <SearchIcon size={19} className="text-slate-400" aria-hidden />
        <input
          autoFocus type="search" enterKeyHint="search" value={q} onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") addRecentSearch(q) }}
          aria-label="Search calculators, conversions and tools"
          placeholder="Search calculators, conversions and tools"
          className="min-h-12 w-full bg-transparent text-sm outline-none"
        />
        {q && <button aria-label="Clear search" onClick={() => setQ("")} className="press grid h-10 w-10 place-items-center rounded-xl"><X size={18} /></button>}
      </div>

      {!searching && (
        <>
          {recent.length > 0 && (
            <section>
              <div className="flex items-center justify-between">
                <h2 className="section-title">Recent searches</h2>
                <button onClick={clearRecentSearches} className="mt-4 min-h-9 px-1 text-[11px] font-bold text-blue-600">Clear</button>
              </div>
              <div className="card divide-y overflow-hidden">
                {recent.map((r) => (
                  <button key={r} onClick={() => setQ(r)} className="press flex min-h-12 w-full items-center gap-3 px-3 text-left text-sm font-bold">
                    <Clock3 size={17} className="text-slate-400" aria-hidden />{r}
                  </button>
                ))}
              </div>
            </section>
          )}
          <h2 className="section-title">Try searching for</h2>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => <button key={s} className="pill min-h-10" onClick={() => setQ(s)}>{s}</button>)}
          </div>
        </>
      )}

      {searching && total === 0 && (
        <div className="card mt-4 p-10 text-center">
          <SearchIcon className="mx-auto text-slate-300" aria-hidden />
          <div className="mt-3 text-sm font-bold">No matches for &ldquo;{q.trim()}&rdquo;</div>
          <div className="mt-1 text-xs text-slate-500">Try a shorter word, a drug name, or an analyte.</div>
        </div>
      )}

      {searching && SEARCH_GROUPS.map((g) => results[g].length > 0 && (
        <section key={g}>
          <h2 className="section-title">{g} <span className="font-semibold text-slate-400">· {results[g].length}</span></h2>
          <div className="card divide-y overflow-hidden">
            {results[g].map((r) => (
              <Link key={r.group + r.href + r.name} href={r.href} onClick={() => addRecentSearch(q)} className="press block px-3 py-3">
                <span className="block text-sm font-extrabold text-slate-800">{r.name}</span>
                <span className="mt-0.5 block truncate text-[11px] text-slate-500">{r.sub}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
