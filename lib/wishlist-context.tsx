"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { Product } from "@/lib/products"

interface WishlistContextValue {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  toggleItem: (product: Product) => void
  isWishlisted: (productId: number) => boolean
  count: number
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([])

  const addItem = useCallback((product: Product) => {
    setItems(prev =>
      prev.find(p => p.id === product.id) ? prev : [...prev, product]
    )
  }, [])

  const removeItem = useCallback((productId: number) => {
    setItems(prev => prev.filter(p => p.id !== productId))
  }, [])

  const toggleItem = useCallback((product: Product) => {
    setItems(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    )
  }, [])

  const isWishlisted = useCallback(
    (productId: number) => items.some(p => p.id === productId),
    [items]
  )

  return (
    <WishlistContext.Provider
      value={{ items, addItem, removeItem, toggleItem, isWishlisted, count: items.length }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider")
  return ctx
}
