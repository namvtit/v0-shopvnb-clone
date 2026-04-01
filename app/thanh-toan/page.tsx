"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { CheckCircle, ChevronRight, CreditCard, Truck, Wallet, MapPin, Package } from "lucide-react"
import { toast } from "sonner"

type Step = "info" | "shipping" | "payment" | "success"

const shippingMethods = [
  { id: "standard", name: "Giao hàng tiêu chuẩn", desc: "3-5 ngày làm việc", price: 30000 },
  { id: "express", name: "Giao hàng nhanh", desc: "1-2 ngày làm việc", price: 50000 },
  { id: "same-day", name: "Giao hàng trong ngày", desc: "Nội thành TP.HCM & Hà Nội", price: 80000 },
]

const paymentMethods = [
  { id: "cod", name: "Thanh toán khi nhận hàng (COD)", icon: Wallet },
  { id: "bank", name: "Chuyển khoản ngân hàng", icon: CreditCard },
  { id: "momo", name: "Ví MoMo", icon: Wallet },
]

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const [step, setStep] = useState<Step>("info")
  const [selectedShipping, setSelectedShipping] = useState("standard")
  const [selectedPayment, setSelectedPayment] = useState("cod")
  const [orderNum] = useState(() => Math.floor(Math.random() * 90000) + 10000)
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    note: "",
  })

  const shippingFee = shippingMethods.find(m => m.id === selectedShipping)?.price ?? 30000
  const total = totalPrice + shippingFee

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("vi-VN").format(p) + "đ"

  const handleField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.address || !form.city) {
      toast.error("Vui lòng điền đầy đủ thông tin")
      return
    }
    setStep("shipping")
  }

  const handleSubmitOrder = () => {
    setStep("success")
    clearCart()
    toast.success("Đặt hàng thành công!")
  }

  if (items.length === 0 && step !== "success") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
          <Package className="h-20 w-20 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Giỏ hàng của bạn đang trống</h2>
          <p className="text-muted-foreground">Hãy thêm sản phẩm trước khi thanh toán</p>
          <Button asChild>
            <Link href="/san-pham">Mua sắm ngay</Link>
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  if (step === "success") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center gap-6 py-20">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="h-14 w-14 text-primary" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Đặt hàng thành công!</h2>
            <p className="text-muted-foreground">
              Cảm ơn bạn đã mua hàng. Chúng tôi sẽ liên hệ xác nhận đơn hàng sớm nhất.
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-sm text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mã đơn hàng</span>
              <span className="font-bold">#HTQ{orderNum}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Người nhận</span>
              <span className="font-medium">{form.name || "Khách hàng"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phương thức</span>
              <span>{paymentMethods.find(p => p.id === selectedPayment)?.name}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-primary">
              <span>Tổng tiền</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link href="/">Về trang chủ</Link>
            </Button>
            <Button asChild>
              <Link href="/san-pham">Tiếp tục mua sắm</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const steps = [
    { id: "info", label: "Thông tin" },
    { id: "shipping", label: "Vận chuyển" },
    { id: "payment", label: "Thanh toán" },
  ]
  const currentStepIdx = steps.findIndex(s => s.id === step)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Trang chủ</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Thanh toán</span>
          </nav>

          {/* Steps */}
          <div className="flex items-center gap-2 mb-8 justify-center">
            {steps.map((s, idx) => (
              <div key={s.id} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 ${idx <= currentStepIdx ? "text-primary" : "text-muted-foreground"}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                    idx < currentStepIdx
                      ? "bg-primary border-primary text-primary-foreground"
                      : idx === currentStepIdx
                        ? "border-primary text-primary"
                        : "border-border"
                  }`}>
                    {idx < currentStepIdx ? <CheckCircle className="h-4 w-4" /> : idx + 1}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">{s.label}</span>
                </div>
                {idx < steps.length - 1 && (
                  <ChevronRight className={`h-4 w-4 mx-1 ${idx < currentStepIdx ? "text-primary" : "text-border"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Form */}
            <div className="lg:col-span-2">

              {/* Step 1 - Info */}
              {step === "info" && (
                <form onSubmit={handleSubmitInfo} className="space-y-6">
                  <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      Thông tin giao hàng
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Họ và tên *</Label>
                        <Input
                          id="name"
                          placeholder="Nguyễn Văn A"
                          className="mt-1"
                          value={form.name}
                          onChange={e => handleField("name", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Số điện thoại *</Label>
                        <Input
                          id="phone"
                          placeholder="0912 345 678"
                          className="mt-1"
                          value={form.phone}
                          onChange={e => handleField("phone", e.target.value)}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="example@email.com"
                          className="mt-1"
                          value={form.email}
                          onChange={e => handleField("email", e.target.value)}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="address">Địa chỉ *</Label>
                        <Input
                          id="address"
                          placeholder="Số nhà, đường, phường/xã"
                          className="mt-1"
                          value={form.address}
                          onChange={e => handleField("address", e.target.value)}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="city">Tỉnh / Thành phố *</Label>
                        <Input
                          id="city"
                          placeholder="TP. Hồ Chí Minh"
                          className="mt-1"
                          value={form.city}
                          onChange={e => handleField("city", e.target.value)}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="note">Ghi chú đơn hàng</Label>
                        <Textarea
                          id="note"
                          placeholder="Ghi chú cho người giao hàng..."
                          className="mt-1"
                          rows={3}
                          value={form.note}
                          onChange={e => handleField("note", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="w-full gap-2">
                    Tiếp tục <ChevronRight className="h-4 w-4" />
                  </Button>
                </form>
              )}

              {/* Step 2 - Shipping */}
              {step === "shipping" && (
                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <Truck className="h-5 w-5 text-primary" />
                      Phương thức vận chuyển
                    </h2>
                    <RadioGroup value={selectedShipping} onValueChange={setSelectedShipping} className="space-y-3">
                      {shippingMethods.map(method => (
                        <label
                          key={method.id}
                          htmlFor={method.id}
                          className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${
                            selectedShipping === method.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <RadioGroupItem value={method.id} id={method.id} />
                          <div className="flex-1">
                            <p className="font-medium">{method.name}</p>
                            <p className="text-sm text-muted-foreground">{method.desc}</p>
                          </div>
                          <span className="font-bold text-primary">{formatPrice(method.price)}</span>
                        </label>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="bg-muted/40 border border-border rounded-xl p-4 text-sm space-y-1">
                    <p className="font-medium text-muted-foreground uppercase text-xs tracking-wide mb-2">Giao đến</p>
                    <p className="font-semibold">{form.name} &mdash; {form.phone}</p>
                    <p className="text-muted-foreground">{form.address}, {form.city}</p>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep("info")} className="flex-1">
                      Quay lại
                    </Button>
                    <Button onClick={() => setStep("payment")} className="flex-1 gap-2" size="lg">
                      Tiếp tục <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3 - Payment */}
              {step === "payment" && (
                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      Phương thức thanh toán
                    </h2>
                    <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="space-y-3">
                      {paymentMethods.map(method => {
                        const Icon = method.icon
                        return (
                          <label
                            key={method.id}
                            htmlFor={`pay-${method.id}`}
                            className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${
                              selectedPayment === method.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <RadioGroupItem value={method.id} id={`pay-${method.id}`} />
                            <Icon className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">{method.name}</span>
                          </label>
                        )
                      })}
                    </RadioGroup>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep("shipping")} className="flex-1">
                      Quay lại
                    </Button>
                    <Button onClick={handleSubmitOrder} className="flex-1" size="lg">
                      Xác nhận đặt hàng
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Right - Order Summary */}
            <div>
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                <h2 className="text-lg font-bold mb-4">Đơn hàng của bạn</h2>
                <div className="space-y-4 max-h-72 overflow-y-auto">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-3">
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                        <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-secondary text-secondary-foreground">
                          {quantity}
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">{product.name}</p>
                        <p className="text-primary font-bold text-sm">
                          {formatPrice(product.price * quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tạm tính</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phí vận chuyển</span>
                    <span>{formatPrice(shippingFee)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-base">
                    <span>Tổng cộng</span>
                    <span className="text-primary">{formatPrice(total)}</span>
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
