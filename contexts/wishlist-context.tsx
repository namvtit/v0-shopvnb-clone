"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface WishlistItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  brand: string
}

interface WishlistContextType {
  items: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: number) => void
  isInWishlist: (id: number) => boolean
  toggleWishlist: (item: WishlistItem) => void
  totalItems: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      setItems(JSON.parse(savedWishlist))
    }
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("wishlist", JSON.stringify(items))
    }
  }, [items, isHydrated])

  const addToWishlist = (item: WishlistItem) => {
    setItems(prevItems => {
      if (prevItems.find(i => i.id === item.id)) {
        return prevItems
      }
      return [...prevItems, item]
    })
  }

  const removeFromWishlist = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const isInWishlist = (id: number) => {
    return items.some(item => item.id === id)
  }

  const toggleWishlist = (item: WishlistItem) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id)
    } else {
      addToWishlist(item)
    }
  }

  const totalItems = items.length

  return (
    <WishlistContext.Provider value={{
      items,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      toggleWishlist,
      totalItems
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
