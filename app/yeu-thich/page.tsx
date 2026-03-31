"use client"

import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react"

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ"
  }

  const handleAddToCart = (item: typeof items[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      brand: item.brand
    })
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <Heart className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-2xl font-bold mb-4">Chưa có sản phẩm yêu thích</h1>
            <p className="text-muted-foreground mb-8">
              Hãy thêm sản phẩm vào danh sách yêu thích của bạn
            </p>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Khám phá sản phẩm
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link href="/" className="text-muted-foreground hover:text-primary">
              Trang chủ
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">Yêu thích</span>
          </nav>

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">
              Sản phẩm yêu thích ({items.length})
            </h1>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {items.map(item => (
              <div key={item.id} className="bg-card rounded-xl shadow-sm overflow-hidden group">
                <div className="relative aspect-square bg-muted">
                  <Link href={`/san-pham/${item.id}`}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-destructive hover:text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">{item.brand}</p>
                  <Link href={`/san-pham/${item.id}`}>
                    <h3 className="font-medium text-sm line-clamp-2 mb-2 hover:text-primary">
                      {item.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-secondary">
                      {formatPrice(item.price)}
                    </span>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className="text-xs text-muted-foreground line-through">
                        {formatPrice(item.originalPrice)}
                      </span>
                    )}
                  </div>
                  <Button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-primary hover:bg-primary/90"
                    size="sm"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Thêm vào giỏ
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
