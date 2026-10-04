import { calculators } from "@/lib/calculators/registry"
import { labTools } from "@/lib/lab-tools"
import { ItemRow } from "@/components/item-row"

export const metadata = { title: "Lab Tools" }

export default function LabTools() {
  return (
    <div className="page">
      <div className="mb-4">
        <div className="text-xs font-bold text-slate-500">Bench and clinical utilities</div>
        <h1 className="text-2xl font-black">Lab Tools</h1>
      </div>
      <div className="card overflow-hidden">
        {labTools.map((t) => {
          const count = t.category ? calculators.filter((c) => c.category === t.category).length : 0
          return <ItemRow key={t.href} href={t.href} title={t.title} sub={`${t.sub}${count ? ` · ${count} tools` : ""}`} Icon={t.Icon} tone="blue" />
        })}
      </div>
      <p className="mt-4 rounded-xl bg-slate-100 p-3 text-[10px] leading-4 text-slate-500">Always follow your laboratory&apos;s validated SOPs, reagent manufacturer&apos;s instructions, and applicable safety procedures.</p>
    </div>
  )
}
