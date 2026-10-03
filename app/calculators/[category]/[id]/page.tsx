import { calculators } from "@/lib/calculators/registry"
import { CalculatorRunner } from "@/components/calculator-runner"
export function generateStaticParams(){return calculators.map(x=>({category:x.category,id:x.id}))}
export default async function CalculatorPage({params}:{params:Promise<{category:string;id:string}>}){const p=await params;return <CalculatorRunner id={p.id}/>} 
