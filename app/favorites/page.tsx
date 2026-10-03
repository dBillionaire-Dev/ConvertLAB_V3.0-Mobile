"use client"
import { useEffect,useState } from "react"
import { Heart } from "lucide-react"
import { calculators } from "@/lib/calculators/registry"
import { getFavorites } from "@/lib/client-store"
import { ToolRow } from "@/components/tool-row"
export default function Favorites(){const [ids,setIds]=useState<string[]>([]);useEffect(()=>setIds(getFavorites()),[]);const tools=calculators.filter(x=>ids.includes(x.id));return <div className="page"><div className="mb-4"><div className="text-xs font-bold text-slate-500">Pinned for quick access</div><h1 className="text-2xl font-black">Favorites</h1></div>{tools.length?<div className="card overflow-hidden">{tools.map(t=><ToolRow key={t.id} tool={t}/>)}</div>:<div className="card p-10 text-center"><Heart className="mx-auto text-slate-300"/><div className="mt-3 text-sm font-bold">No favorites yet</div><div className="mt-1 text-xs text-slate-500">Tap the heart on any calculator.</div></div>}</div>}
