"use client"

import Image from "next/image"
import Link from "next/link"
import { X, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"

export function CartSidebar() {
  const { items, totalCount, totalPrice, removeItem, updateQuantity, cartOpen, setCartOpen } = useCart()

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("vi-VN").format(p) + "đ"

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="w-full max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Giỏ hàng
            {totalCount > 0 && (
              <span className="ml-auto text-sm font-normal text-muted-foreground">
                {totalCount} sản phẩm
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
              <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-center">
              Giỏ hàng của bạn đang trống
            </p>
            <Button onClick={() => setCartOpen(false)} asChild>
              <Link href="/san-pham">Mua sắm ngay</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/san-pham/${product.id}`}
                      className="text-sm font-medium line-clamp-2 hover:text-primary"
                      onClick={() => setCartOpen(false)}
                    >
                      {product.name}
                    </Link>
                    <p className="text-primary font-bold text-sm mt-1">
                      {formatPrice(product.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-border rounded-lg h-7">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive"
                        onClick={() => removeItem(product.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            {/* Footer */}
            <div className="px-6 py-4 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tạm tính</span>
                <span className="font-bold text-lg text-primary">{formatPrice(totalPrice)}</span>
              </div>
              <Button className="w-full" size="lg" asChild>
                <Link href="/thanh-toan" onClick={() => setCartOpen(false)}>
                  Tiến hành thanh toán
                </Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setCartOpen(false)}>
                Tiếp tục mua sắm
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
