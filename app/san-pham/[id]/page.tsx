"use client"

import { useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, Minus, Plus, ShoppingCart, Heart, Share2, Check, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { getProductById, getRelatedProducts } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const categoryLabels: Record<string, string> = {
  badminton: "Cầu Lông",
  pickleball: "Pickleball",
  tennis: "Tennis",
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = getProductById(parseInt(id))

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const { addItem, setCartOpen } = useCart()
  const { toggleItem, isWishlisted } = useWishlist()

  if (!product) {
    notFound()
  }

  const wishlisted = isWishlisted(product.id)
  const relatedProducts = getRelatedProducts(product, 4)

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("vi-VN").format(p) + "đ"

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta))
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    toast.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng`, {
      description: product.name,
      action: {
        label: "Xem giỏ",
        onClick: () => setCartOpen(true),
      },
    })
  }

  const handleWishlist = () => {
    toggleItem(product)
    if (!wishlisted) {
      toast.success("Đã thêm vào danh sách yêu thích")
    } else {
      toast.info("Đã xóa khỏi danh sách yêu thích")
    }
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success("Đã sao chép đường dẫn")
    } catch {
      toast.info("Chia sẻ liên kết sản phẩm")
    }
  }

  const images = product.images || [product.image]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-6">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Trang chủ</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/san-pham?category=${product.category}`} className="hover:text-primary">
              {categoryLabels[product.category] ?? product.category}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground line-clamp-1">{product.name}</span>
          </nav>

          {/* Product Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.isNew && (
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">Mới</Badge>
                )}
                {product.discount && product.discount > 0 && (
                  <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
                    -{product.discount}%
                  </Badge>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === idx ? "border-primary" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">{product.brand}</p>
                <h1 className="text-2xl lg:text-3xl font-bold text-balance">{product.name}</h1>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discount && product.discount > 0 && product.originalPrice && (
                  <Badge className="bg-secondary text-secondary-foreground">
                    Tiết kiệm {formatPrice(product.originalPrice - product.price)}
                  </Badge>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              )}

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button className="flex-1 gap-2" size="lg" onClick={handleAddToCart}>
                  <ShoppingCart className="h-5 w-5" />
                  Thêm vào giỏ hàng
                </Button>
              </div>

              {/* Secondary Actions */}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className={cn("gap-2", wishlisted && "border-secondary text-secondary")}
                  onClick={handleWishlist}
                >
                  <Heart className={cn("h-5 w-5", wishlisted && "fill-current text-secondary")} />
                  {wishlisted ? "Đã yêu thích" : "Yêu thích"}
                </Button>
                <Button variant="outline" className="gap-2" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                  Chia sẻ
                </Button>
              </div>

              {/* Benefits */}
              <div className="border-t border-border pt-6 space-y-3">
                {[
                  { icon: Check, text: "Cam kết chính hãng 100%" },
                  { icon: Truck, text: "Giao hàng toàn quốc" },
                  { icon: Shield, text: "Bảo hành chính hãng" },
                  { icon: RotateCcw, text: "Đổi trả trong 7 ngày" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Specifications */}
          {product.specs && product.specs.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-bold mb-4">Thông số kỹ thuật</h2>
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {product.specs.map((spec, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-muted/50" : ""}>
                        <td className="px-4 py-3 font-medium w-1/3">{spec.label}</td>
                        <td className="px-4 py-3 text-muted-foreground">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-6">Sản phẩm liên quan</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} {...p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
