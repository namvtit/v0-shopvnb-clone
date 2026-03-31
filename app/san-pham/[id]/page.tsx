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

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = getProductById(parseInt(id))
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(product, 4)

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat("vi-VN").format(p) + "đ"
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta))
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
            <Link href="/" className="hover:text-primary capitalize">{product.category}</Link>
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
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
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
                <Button className="flex-1 gap-2" size="lg">
                  <ShoppingCart className="h-5 w-5" />
                  Thêm vào giỏ hàng
                </Button>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button variant="outline" className="gap-2">
                  <Heart className="h-5 w-5" />
                  Yêu thích
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-5 w-5" />
                  Chia sẻ
                </Button>
              </div>

              {/* Benefits */}
              <div className="border-t border-border pt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span>Cam kết chính hãng 100%</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck className="h-4 w-4 text-primary" />
                  </div>
                  <span>Giao hàng toàn quốc</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <span>Bảo hành chính hãng</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <RotateCcw className="h-4 w-4 text-primary" />
                  </div>
                  <span>Đổi trả trong 7 ngày</span>
                </div>
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
