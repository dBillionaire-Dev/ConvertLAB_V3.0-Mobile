"use client"
import { Heart } from "lucide-react"
import { useFavorites } from "@/hooks/use-favorites"
import { toggleFavorite } from "@/lib/client-store"
import { haptic } from "@/lib/native"

export function FavoriteButton({ id, bordered = false }: { id: string; bordered?: boolean }) {
  const fav = useFavorites().includes(id)
  return (
    <button
      type="button"
      aria-pressed={fav}
      aria-label={fav ? "Remove from favorites" : "Add to favorites"}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(id); void haptic("light") }}
      className={`press grid h-11 w-11 shrink-0 place-items-center rounded-xl ${bordered ? "border bg-white" : ""}`}
    >
      <Heart size={19} className={fav ? "fill-amber-400 text-amber-400" : "text-slate-400"} aria-hidden />
    </button>
  )
}
