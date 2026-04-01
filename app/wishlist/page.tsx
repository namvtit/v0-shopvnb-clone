"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/lib/wishlist-context"
import { Heart, ChevronRight } from "lucide-react"

export default function WishlistPage() {
  const { items } = useWishlist()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Trang chủ</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Danh sách yêu thích</span>
          </nav>

          <div className="flex items-center gap-3 mb-8">
            <Heart className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">Danh sách yêu thích</h1>
              <p className="text-muted-foreground text-sm">{items.length} sản phẩm</p>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                <Heart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Danh sách yêu thích trống</h2>
              <p className="text-muted-foreground mb-6">
                Hãy thêm sản phẩm yêu thích để xem lại sau
              </p>
              <Button asChild>
                <Link href="/san-pham">Khám phá sản phẩm</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5">
              {items.map(product => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
