import { calculators } from "@/lib/calculators/registry"
import { CALCULATOR_CATEGORY_LABELS } from "@/lib/calculators/types"
import { conversionCategories } from "@/lib/conversions/registry"
import { labTools } from "@/lib/lab-tools"
import { chemistryReferenceRanges, hematologyReferenceRanges } from "@/lib/reference-ranges"
import { unitSummary } from "@/lib/ui-meta"

export const SEARCH_GROUPS = ["Calculators", "Conversions", "Lab Tools", "References"] as const
export type SearchGroup = (typeof SEARCH_GROUPS)[number]

export interface SearchItem {
  group: SearchGroup
  name: string
  sub: string
  href: string
  haystack: string
}

function item(group: SearchGroup, name: string, sub: string, href: string, extra: string[] = []): SearchItem {
  return { group, name, sub, href, haystack: [name, sub, ...extra].join(" ").toLowerCase() }
}

let cache: SearchItem[] | null = null

export function getSearchIndex(): SearchItem[] {
  if (cache) return cache
  const out: SearchItem[] = []
  for (const c of calculators) {
    out.push(item("Calculators", c.shortName ?? c.name, c.description, `/calculators/${c.category}/${c.id}`, [
      c.name, CALCULATOR_CATEGORY_LABELS[c.category], ...(c.keywords ?? []),
    ]))
  }
  for (const c of conversionCategories) {
    out.push(item("Conversions", `${c.name} converter`, unitSummary(c.units, 4), `/convert?category=${c.id}`, c.units.map((u) => `${u.name} ${u.symbol}`)))
  }
  for (const t of labTools) out.push(item("Lab Tools", t.title, t.sub, t.href))
  for (const g of [hematologyReferenceRanges, chemistryReferenceRanges]) {
    for (const r of g.ranges) out.push(item("References", r.analyte, `${r.range} ${r.unit} · ${g.title}`, "/references"))
  }
  cache = out
  return out
}

export type SearchResults = Record<SearchGroup, SearchItem[]>

export function runSearch(query: string, perGroup = 8): SearchResults {
  const empty: SearchResults = { Calculators: [], Conversions: [], "Lab Tools": [], References: [] }
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return empty
  const scored: { it: SearchItem; score: number }[] = []
  for (const it of getSearchIndex()) {
    if (!tokens.every((t) => it.haystack.includes(t))) continue
    const name = it.name.toLowerCase()
    const score = tokens.reduce((s, t) => s + (name.startsWith(t) ? 3 : name.includes(t) ? 2 : 0), 0)
    scored.push({ it, score })
  }
  scored.sort((a, b) => b.score - a.score || a.it.name.localeCompare(b.it.name))
  for (const { it } of scored) if (empty[it.group].length < perGroup) empty[it.group].push(it)
  return empty
}
