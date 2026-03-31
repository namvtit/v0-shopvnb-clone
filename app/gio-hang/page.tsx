"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/contexts/cart-context"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag } from "lucide-react"

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [couponApplied, setCouponApplied] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ"
  }

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "GIAMGIA10") {
      setDiscount(totalPrice * 0.1)
      setCouponApplied(true)
    } else if (couponCode.toUpperCase() === "GIAMGIA20") {
      setDiscount(totalPrice * 0.2)
      setCouponApplied(true)
    } else {
      alert("Mã giảm giá không hợp lệ!")
    }
  }

  const shippingFee = totalPrice >= 500000 ? 0 : 30000
  const finalTotal = totalPrice - discount + shippingFee

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-2xl font-bold mb-4">Giỏ hàng trống</h1>
            <p className="text-muted-foreground mb-8">
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </p>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Tiếp tục mua sắm
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
            <span className="text-foreground font-medium">Giỏ hàng</span>
          </nav>

          <h1 className="text-2xl md:text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl shadow-sm overflow-hidden">
                {/* Table Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium text-sm">
                  <div className="col-span-6">Sản phẩm</div>
                  <div className="col-span-2 text-center">Đơn giá</div>
                  <div className="col-span-2 text-center">Số lượng</div>
                  <div className="col-span-2 text-center">Thành tiền</div>
                </div>

                {/* Cart Items */}
                <div className="divide-y divide-border">
                  {items.map(item => (
                    <div key={item.id} className="p-4">
                      <div className="md:grid md:grid-cols-12 md:gap-4 md:items-center">
                        {/* Product Info */}
                        <div className="col-span-6 flex gap-4 mb-4 md:mb-0">
                          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/san-pham/${item.id}`}
                              className="font-medium text-sm hover:text-primary line-clamp-2"
                            >
                              {item.name}
                            </Link>
                            <p className="text-xs text-muted-foreground mt-1">
                              Thương hiệu: {item.brand}
                            </p>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="flex items-center gap-1 text-xs text-destructive hover:underline mt-2 md:hidden"
                            >
                              <Trash2 className="w-3 h-3" />
                              Xóa
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-2 text-center hidden md:block">
                          <p className="font-semibold text-primary">
                            {formatPrice(item.price)}
                          </p>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <p className="text-xs text-muted-foreground line-through">
                              {formatPrice(item.originalPrice)}
                            </p>
                          )}
                        </div>

                        {/* Quantity */}
                        <div className="col-span-2 flex items-center justify-between md:justify-center gap-2 mb-4 md:mb-0">
                          <span className="md:hidden text-sm text-muted-foreground">
                            Số lượng:
                          </span>
                          <div className="flex items-center border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-muted"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-10 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-muted"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="col-span-2 flex items-center justify-between md:justify-center">
                          <span className="md:hidden text-sm text-muted-foreground">
                            Thành tiền:
                          </span>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-secondary">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="hidden md:block p-1 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                <Link href="/">
                  <Button variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Tiếp tục mua sắm
                  </Button>
                </Link>
                <Button variant="outline" onClick={clearCart}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Xóa tất cả
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl shadow-sm p-6 sticky top-4">
                <h2 className="text-lg font-bold mb-6">Tóm tắt đơn hàng</h2>

                {/* Coupon */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">
                    Mã giảm giá
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Nhập mã giảm giá"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="pl-10"
                        disabled={couponApplied}
                      />
                    </div>
                    <Button
                      variant="outline"
                      onClick={applyCoupon}
                      disabled={couponApplied || !couponCode}
                    >
                      Áp dụng
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Thử: GIAMGIA10 hoặc GIAMGIA20
                  </p>
                </div>

                {/* Summary */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tạm tính</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-primary">
                      <span>Giảm giá</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phí vận chuyển</span>
                    <span>
                      {shippingFee === 0 ? (
                        <span className="text-primary">Miễn phí</span>
                      ) : (
                        formatPrice(shippingFee)
                      )}
                    </span>
                  </div>
                  {totalPrice < 500000 && (
                    <p className="text-xs text-muted-foreground">
                      Mua thêm {formatPrice(500000 - totalPrice)} để được miễn phí vận chuyển
                    </p>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Tổng cộng</span>
                      <span className="text-secondary">{formatPrice(finalTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link href="/thanh-toan" className="block mt-6">
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-lg py-6">
                    Tiến hành thanh toán
                  </Button>
                </Link>

                {/* Payment methods */}
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-muted-foreground mb-3">
                    Phương thức thanh toán
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="px-3 py-1.5 bg-muted rounded text-xs font-medium">
                      COD
                    </div>
                    <div className="px-3 py-1.5 bg-muted rounded text-xs font-medium">
                      Chuyển khoản
                    </div>
                    <div className="px-3 py-1.5 bg-muted rounded text-xs font-medium">
                      Momo
                    </div>
                    <div className="px-3 py-1.5 bg-muted rounded text-xs font-medium">
                      VNPay
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
