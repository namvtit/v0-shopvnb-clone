"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { 
  ArrowLeft, 
  CreditCard, 
  Truck, 
  Wallet,
  CheckCircle2,
  ShoppingBag
} from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const { user, isLoggedIn, setShowAuthModal, setAuthMode } = useAuth()
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState("")

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    district: "",
    ward: "",
    note: ""
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ"
  }

  const shippingFee = totalPrice >= 500000 ? 0 : 30000
  const finalTotal = totalPrice + shippingFee

  const paymentMethods = [
    { id: "cod", name: "Thanh toán khi nhận hàng (COD)", icon: Truck },
    { id: "bank", name: "Chuyển khoản ngân hàng", icon: CreditCard },
    { id: "momo", name: "Ví MoMo", icon: Wallet },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.phone || !formData.address || !formData.city) {
      alert("Vui lòng điền đầy đủ thông tin giao hàng!")
      return
    }

    setIsSubmitting(true)
    
    // Mock order submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const newOrderId = "HTQB" + Date.now().toString().slice(-8)
    setOrderId(newOrderId)
    setOrderComplete(true)
    clearCart()
    setIsSubmitting(false)
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-2xl font-bold mb-4">Giỏ hàng trống</h1>
            <p className="text-muted-foreground mb-8">
              Bạn cần thêm sản phẩm vào giỏ hàng trước khi thanh toán
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

  if (orderComplete) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Đặt hàng thành công!</h1>
            <p className="text-muted-foreground mb-4">
              Cảm ơn bạn đã mua hàng tại HTQB_SHOP
            </p>
            <div className="bg-muted p-4 rounded-lg mb-6">
              <p className="text-sm text-muted-foreground">Mã đơn hàng</p>
              <p className="text-xl font-bold text-primary">{orderId}</p>
            </div>
            <p className="text-sm text-muted-foreground mb-8">
              Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận đơn hàng.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button variant="outline">
                  Tiếp tục mua sắm
                </Button>
              </Link>
              <Link href="/don-hang">
                <Button className="bg-primary hover:bg-primary/90">
                  Xem đơn hàng
                </Button>
              </Link>
            </div>
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
            <Link href="/gio-hang" className="text-muted-foreground hover:text-primary">
              Giỏ hàng
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">Thanh toán</span>
          </nav>

          <h1 className="text-2xl md:text-3xl font-bold mb-8">Thanh toán</h1>

          {!isLoggedIn && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
              <p className="text-sm">
                Bạn đã có tài khoản?{" "}
                <button
                  onClick={() => {
                    setAuthMode("login")
                    setShowAuthModal(true)
                  }}
                  className="text-primary font-semibold hover:underline"
                >
                  Đăng nhập
                </button>
                {" "}để thanh toán nhanh hơn.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Shipping Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Customer Info */}
                <div className="bg-card rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-bold mb-6">Thông tin khách hàng</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Họ và tên *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nguyễn Văn A"
                        className="mt-1.5"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="0901234567"
                        className="mt-1.5"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-card rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-bold mb-6">Địa chỉ giao hàng</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <Label htmlFor="address">Địa chỉ *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Số nhà, tên đường"
                        className="mt-1.5"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Tỉnh/Thành phố *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="TP. Hồ Chí Minh"
                        className="mt-1.5"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="district">Quận/Huyện</Label>
                      <Input
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        placeholder="Quận 1"
                        className="mt-1.5"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="note">Ghi chú</Label>
                      <Textarea
                        id="note"
                        name="note"
                        value={formData.note}
                        onChange={handleInputChange}
                        placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                        className="mt-1.5"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-card rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-bold mb-6">Phương thức thanh toán</h2>
                  <div className="space-y-3">
                    {paymentMethods.map(method => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === method.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id)}
                          className="w-4 h-4 text-primary"
                        />
                        <method.icon className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">{method.name}</span>
                      </label>
                    ))}
                  </div>

                  {paymentMethod === "bank" && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-2">Thông tin chuyển khoản:</p>
                      <p className="text-sm text-muted-foreground">
                        Ngân hàng: <span className="font-medium text-foreground">Vietcombank</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Số tài khoản: <span className="font-medium text-foreground">1234567890</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Chủ tài khoản: <span className="font-medium text-foreground">HTQB SHOP</span>
                      </p>
                    </div>
                  )}

                  {paymentMethod === "momo" && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-2">Ví MoMo:</p>
                      <p className="text-sm text-muted-foreground">
                        Số điện thoại: <span className="font-medium text-foreground">0901234567</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Tên: <span className="font-medium text-foreground">HTQB SHOP</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-xl shadow-sm p-6 sticky top-4">
                  <h2 className="text-lg font-bold mb-6">Đơn hàng của bạn</h2>

                  {/* Products */}
                  <div className="space-y-4 max-h-80 overflow-y-auto mb-6">
                    {items.map(item => (
                      <div key={item.id} className="flex gap-3">
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-2">
                            {item.name}
                          </p>
                          <p className="text-sm text-secondary font-semibold mt-1">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="space-y-3 text-sm border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tạm tính</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
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
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Tổng cộng</span>
                        <span className="text-secondary">{formatPrice(finalTotal)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-secondary hover:bg-secondary/90 text-lg py-6 mt-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Đang xử lý..." : "Đặt hàng"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Bằng việc đặt hàng, bạn đồng ý với{" "}
                    <Link href="#" className="text-primary hover:underline">
                      Điều khoản dịch vụ
                    </Link>
                    {" "}của chúng tôi.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
