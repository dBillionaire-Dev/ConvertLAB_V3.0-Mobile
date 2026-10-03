import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getCalculatorsByCategory } from "@/lib/calculators/registry"
import {
  CALCULATOR_CATEGORY_LABELS,
  CALCULATOR_SUBCATEGORY_LABELS,
  type CalculatorDefinition,
  type CalculatorGroup,
} from "@/lib/calculators/types"
import { ToolRow } from "@/components/tool-row"

export function generateStaticParams(){ return Object.keys(CALCULATOR_CATEGORY_LABELS).map(category=>({category})) }

export default async function CategoryPage({params}:{params:Promise<{category:string}>}){
 const {category}=await params
 const key=category as CalculatorGroup
 const tools=getCalculatorsByCategory(key)
 const labels:Record<string,string>=CALCULATOR_SUBCATEGORY_LABELS[key]??{}

 const groups:{id:string;label:string;items:CalculatorDefinition[]}[]=Object.keys(labels)
  .map(id=>({id,label:labels[id],items:tools.filter(t=>t.subcategory===id)}))
  .filter(g=>g.items.length>0)
 const ungrouped=tools.filter(t=>!t.subcategory||!(t.subcategory in labels))
 if(groups.length>0&&ungrouped.length>0)groups.push({id:"other",label:"Other",items:ungrouped})

 return <div className="page">
  <Link href="/calculators" className="mb-4 inline-flex items-center gap-2 text-xs font-bold text-slate-500"><ArrowLeft size={16}/> Calculators</Link>
  <h1 className="text-2xl font-black">{CALCULATOR_CATEGORY_LABELS[key]??category}</h1>
  <p className="mb-3 mt-1 text-xs text-slate-500">{tools.length} calculators{groups.length>1?` · ${groups.length} groups`:""}</p>

  {groups.length>1&&<div className="group-tabs sticky z-30 -mx-4 mb-1 border-b px-4 py-2.5 md:-mx-6 md:px-6">
   <div className="flex gap-2 overflow-x-auto">{groups.map(g=><a key={g.id} href={`#${g.id}`} className="pill">{g.label} · {g.items.length}</a>)}</div>
  </div>}

  {groups.length===0
   ? <div className="card overflow-hidden">{tools.map(t=><ToolRow key={t.id} tool={t}/>)}</div>
   : groups.map(g=><section key={g.id} id={g.id} className="scroll-mt-[calc(8rem+env(safe-area-inset-top))]">
      <h2 className="section-title">{g.label} <span className="font-semibold text-slate-400">· {g.items.length}</span></h2>
      <div className="card overflow-hidden">{g.items.map(t=><ToolRow key={t.id} tool={t}/>)}</div>
     </section>)}
 </div>
}
