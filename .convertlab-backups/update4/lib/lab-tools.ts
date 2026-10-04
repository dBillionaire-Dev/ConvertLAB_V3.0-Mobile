import { Beaker, BookOpenText, Droplet, FlaskConical, Microscope, TestTube, Waves, type LucideIcon } from "lucide-react"

export interface LabTool {
  title: string
  sub: string
  href: string
  Icon: LucideIcon
  /** Calculator category whose tool count is shown next to the description. */
  category?: string
}

export const labTools: LabTool[] = [
  { title: "Hematology", sub: "RBC indices, corrected WBC, ANC, coagulation", href: "/calculators/hematology", Icon: Droplet, category: "hematology" },
  { title: "Clinical Chemistry", sub: "Anion gap, corrected calcium, lipids, osmolality", href: "/calculators/chemistry", Icon: FlaskConical, category: "chemistry" },
  { title: "Microbiology", sub: "CFU, dilution factors and culture calculations", href: "/calculators/microbiology", Icon: Microscope, category: "microbiology" },
  { title: "Spectrophotometry", sub: "Beer-Lambert, transmittance, regression and photometry", href: "/calculators/spectrophotometry", Icon: Waves, category: "spectrophotometry" },
  { title: "Laboratory Solutions", sub: "C1V1=C2V2, molarity, normality and reagent preparation", href: "/calculators/lab-solutions", Icon: TestTube, category: "lab-solutions" },
  { title: "Serial dilution", sub: "Concentration at each step of a dilution series", href: "/tools/serial-dilution", Icon: Beaker },
  { title: "Mass ↔ Volume", sub: "Density-based conversion by substance", href: "/tools/mass-volume", Icon: FlaskConical },
  { title: "Molar ↔ Mass concentration", sub: "mg/dL ↔ mmol/L by analyte", href: "/tools/molar-mass", Icon: FlaskConical },
  { title: "McFarland standards", sub: "Turbidity standards and approximate cell density", href: "/tools/mcfarland", Icon: Microscope },
  { title: "Reference ranges", sub: "Hematology and chemistry quick references", href: "/references", Icon: BookOpenText },
]
