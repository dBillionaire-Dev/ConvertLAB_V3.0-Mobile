"use client"
import Link from "next/link"
import { ArrowLeftRight, Calculator, Clock3 } from "lucide-react"
import { useHistory } from "@/hooks/use-history"
import { timeAgo } from "@/lib/format"

export function RecentlyUsed() {
  const { items, ready } = useHistory()
  const recent = items.slice(0, 4)
  return (
    <section aria-labelledby="recent-h">
      <div className="flex items-center justify-between">
        <h2 id="recent-h" className="section-title">Recently used</h2>
        {recent.length > 0 && <Link href="/history" className="mt-4 flex min-h-9 items-center px-1 text-[11px] font-bold text-blue-600">See all</Link>}
      </div>
      {!ready ? <div className="card h-24" aria-hidden /> : recent.length === 0 ? (
        <div className="card flex items-center gap-3 p-4">
          <span className="iconbox bg-blue-50 text-blue-600"><Clock3 size={19} aria-hidden /></span>
          <div><div className="text-sm font-extrabold">Nothing here yet</div><div className="text-[11px] text-slate-500">Tools you calculate or convert with will appear here.</div></div>
        </div>
      ) : (
        <div className="card overflow-hidden">
          {recent.map((h) => (
            <Link key={h.id} href={h.href} className="press flex items-center gap-3 border-b border-slate-100 px-3 py-3 last:border-0">
              <span className="iconbox bg-blue-50 text-blue-600">{h.type === "conversion" ? <ArrowLeftRight size={18} aria-hidden /> : <Calculator size={18} aria-hidden />}</span>
              <span className="min-w-0 flex-1"><span className="block truncate text-sm font-extrabold">{h.name}</span><span className="block truncate text-[11px] text-slate-500">{h.result}</span></span>
              <span className="shrink-0 text-[10px] text-slate-400">{timeAgo(h.at)}</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
