import type { Metadata } from "next"
import { calculators } from "@/lib/calculators/registry"
import { CALCULATOR_CATEGORY_LABELS, type CalculatorGroup } from "@/lib/calculators/types"
import { ToolRow } from "@/components/tool-row"

export const metadata: Metadata = { title: "Estimators" }

export default function EstimatorsPage(){
 const estimators=calculators.filter(c=>c.isEstimator)
 const groups=(Object.keys(CALCULATOR_CATEGORY_LABELS) as CalculatorGroup[])
  .map(id=>({id,items:estimators.filter(c=>c.category===id)}))
  .filter(g=>g.items.length>0)

 return <div className="page">
  <div className="mb-4 flex items-end justify-between">
   <div><div className="text-xs font-bold text-slate-500">Estimated values</div><h1 className="text-2xl font-black">Estimators</h1></div>
   <div className="text-xs font-bold text-slate-400">{estimators.length} tools</div>
  </div>
  <p className="mb-2 text-sm leading-5 text-slate-600">Calculators that estimate a value from a formula or population equation (eGFR, body surface area, ideal weight, osmolality and similar). Results are estimates, not measurements.</p>
  {groups.map(g=><section key={g.id}>
   <h2 className="section-title">{CALCULATOR_CATEGORY_LABELS[g.id]}</h2>
   <div className="card overflow-hidden">{g.items.map(t=><ToolRow key={t.id} tool={t}/>)}</div>
  </section>)}
 </div>
}
