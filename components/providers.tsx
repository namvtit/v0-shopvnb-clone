"use client"

import { ReactNode } from "react"
import { CartProvider } from "@/contexts/cart-context"
import { WishlistProvider } from "@/contexts/wishlist-context"
import { AuthProvider } from "@/contexts/auth-context"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}
