"use client"
import Link from "next/link"
import { ChevronRight, Search } from "lucide-react"
import { useMemo, useState } from "react"
import { calculatorCategories, calculators } from "@/lib/calculators/registry"
import { categoryMeta,toneStyle } from "@/lib/ui-meta"
import { ToolRow } from "@/components/tool-row"

export default function CalculatorsPage(){
 const [q,setQ]=useState("")
 const matches=useMemo(()=>{const s=q.trim().toLowerCase();return s?calculators.filter(x=>[x.name,x.description,...(x.keywords??[])].join(" ").toLowerCase().includes(s)).slice(0,30):[]},[q])
 return <div className="page"><div className="mb-4 flex items-end justify-between"><div><div className="text-xs font-bold text-slate-500">Clinical utilities</div><h1 className="text-2xl font-black">Calculators</h1></div><div className="text-xs font-bold text-slate-400">{calculators.length} tools</div></div>
  <div className="card mb-4 flex items-center gap-2 px-3"><Search size={18} className="text-slate-400"/><input className="w-full bg-transparent py-3.5 text-sm outline-none" placeholder="Search calculators" value={q} onChange={e=>setQ(e.target.value)}/></div>
  {q?<div className="card overflow-hidden">{matches.map(t=><ToolRow key={t.id} tool={t}/>) }{matches.length===0&&<div className="p-8 text-center text-sm text-slate-500">No calculators found.</div>}</div>:
  <div className="card overflow-hidden">{calculatorCategories.map(c=>{const meta=categoryMeta[c.id],tone=toneStyle[meta.tone];return <Link key={c.id} href={`/calculators/${c.id}`} className="flex items-center gap-3 border-b border-slate-100 px-3 py-3.5 last:border-0"><span className="iconbox text-lg font-black" style={{background:tone.bg,color:tone.fg}}>{meta.emoji}</span><span className="flex-1"><span className="block text-sm font-extrabold">{meta.short}</span><span className="text-[11px] text-slate-500">{c.count} tools</span></span><ChevronRight size={18} className="text-slate-400"/></Link>})}</div>}
 </div>
}
