import type { CalculatorGroup } from "@/lib/calculators/types"
export const categoryMeta: Record<CalculatorGroup,{tone:string;emoji:string;short:string}> = {
  general:{tone:"blue",emoji:"▣",short:"General"}, renal:{tone:"indigo",emoji:"◉",short:"Renal & Electrolytes"},
  chemistry:{tone:"purple",emoji:"△",short:"Clinical Chemistry"}, hematology:{tone:"rose",emoji:"◌",short:"Hematology"},
  microbiology:{tone:"green",emoji:"◍",short:"Microbiology"}, "lab-solutions":{tone:"amber",emoji:"⌁",short:"Lab Solutions"},
  spectrophotometry:{tone:"cyan",emoji:"◈",short:"Spectrophotometry"}, dosing:{tone:"orange",emoji:"✚",short:"Drug Dosing"},
  oncology:{tone:"pink",emoji:"✦",short:"Oncology"}, cardiovascular:{tone:"red",emoji:"♥",short:"Cardiovascular"},
  "stem-cell-transplant":{tone:"teal",emoji:"✣",short:"Stem Cell & Transplant"}
}
export const toneStyle:Record<string,{bg:string;fg:string}>={
  blue:{bg:"#e8f2ff",fg:"#0875ff"},indigo:{bg:"#edf0ff",fg:"#5369e9"},purple:{bg:"#f2eaff",fg:"#8b4df0"},rose:{bg:"#ffe9ef",fg:"#f23d69"},
  green:{bg:"#e4f8f0",fg:"#0ca876"},amber:{bg:"#fff3db",fg:"#ee9800"},cyan:{bg:"#e4f7fb",fg:"#1297b7"},orange:{bg:"#fff0dd",fg:"#f08a00"},pink:{bg:"#ffe8f4",fg:"#d94698"},red:{bg:"#ffe9e9",fg:"#e63b3b"},teal:{bg:"#e4f7f4",fg:"#0e9f91"}
}
