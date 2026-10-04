import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { toneStyle } from "@/lib/ui-meta"
import { FavoriteButton } from "@/components/favorite-button"

export function ItemRow({ href, title, sub, Icon, tone = "blue", favId }: {
  href: string; title: string; sub?: string; Icon: LucideIcon; tone?: string; favId?: string
}) {
  const t = toneStyle[tone] ?? toneStyle.blue
  return (
    <div className="flex items-center border-b border-slate-100 last:border-0">
      <Link href={href} className="press flex min-w-0 flex-1 items-center gap-3 px-3 py-3.5">
        <span className="iconbox" style={{ background: t.bg, color: t.fg }}><Icon size={19} aria-hidden /></span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-extrabold text-slate-800">{title}</span>
          {sub && <span className="mt-0.5 block truncate text-[11px] text-slate-500">{sub}</span>}
        </span>
      </Link>
      {favId && <FavoriteButton id={favId} />}
    </div>
  )
}
