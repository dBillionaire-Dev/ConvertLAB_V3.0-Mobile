"use client"
import { openExternal } from "@/lib/native"

export function ExternalAnchor({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}
      onClick={(e) => { e.preventDefault(); void openExternal(href) }}>
      {children}
    </a>
  )
}
