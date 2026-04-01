"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { Product } from "@/lib/products"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  brand: string
  isNew?: boolean
  discount?: number
  category: string
  description?: string
  specs?: { label: string; value: string }[]
  images?: string[]
}

export function ProductCard(props: ProductCardProps) {
  const { id, name, price, originalPrice, image, brand, isNew, discount } = props
  const { addItem, setCartOpen } = useCart()
  const { toggleItem, isWishlisted } = useWishlist()
  const wishlisted = isWishlisted(id)

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("vi-VN").format(p) + "đ"

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(props as Product)
    toast.success("Đã thêm vào giỏ hàng", {
      description: name,
      action: {
        label: "Xem giỏ",
        onClick: () => setCartOpen(true),
      },
    })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleItem(props as Product)
    if (!wishlisted) {
      toast.success("Đã thêm vào danh sách yêu thích")
    } else {
      toast.info("Đã xóa khỏi danh sách yêu thích")
    }
  }

  return (
    <Link href={`/san-pham/${id}`} className="group block">
      <div className="bg-card rounded-lg border border-border overflow-hidden transition-shadow hover:shadow-lg relative">
        {/* Image */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isNew && (
              <Badge className="bg-primary text-primary-foreground">Mới</Badge>
            )}
            {discount && discount > 0 && (
              <Badge className="bg-secondary text-secondary-foreground">-{discount}%</Badge>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className={cn(
              "absolute top-2 right-2 w-8 h-8 rounded-full bg-card/90 flex items-center justify-center shadow transition-all opacity-0 group-hover:opacity-100",
              wishlisted && "opacity-100 text-secondary"
            )}
            aria-label={wishlisted ? "Xóa yêu thích" : "Thêm yêu thích"}
          >
            <Heart className={cn("h-4 w-4", wishlisted && "fill-current text-secondary")} />
          </button>

          {/* Add to cart overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
            <Button
              className="w-full rounded-none gap-2 h-10"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              Thêm vào giỏ
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 lg:p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            {brand}
          </p>
          <h3 className="font-medium text-sm lg:text-base line-clamp-2 mb-2 group-hover:text-primary transition-colors min-h-[2.5rem] lg:min-h-[3rem]">
            {name}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-primary font-bold text-base lg:text-lg">
              {formatPrice(price)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-muted-foreground text-sm line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
