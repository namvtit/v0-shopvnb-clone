"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight, Search, Package, Truck, CheckCircle, Clock, AlertCircle, MapPin, Phone } from "lucide-react"

// Mock order data for demo
const mockOrders: Record<string, {
  id: string
  date: string
  status: "pending" | "confirmed" | "shipping" | "delivered" | "cancelled"
  customer: string
  phone: string
  address: string
  items: { name: string; quantity: number; price: number; image: string }[]
  timeline: { time: string; status: string; note: string; done: boolean }[]
  shippingCode: string
  total: number
}> = {
  "HTQB240315001": {
    id: "HTQB240315001",
    date: "15/03/2024",
    status: "shipping",
    customer: "Nguyễn Văn An",
    phone: "0912 345 678",
    address: "123 Trần Hưng Đạo, P.1, Q.5, TP.HCM",
    shippingCode: "GHN1234567890",
    total: 4500000,
    items: [
      { name: "Vợt Cầu Lông Yonex Astrox 99 Pro", quantity: 1, price: 4500000, image: "/images/products/badminton-racket-1.jpg" },
    ],
    timeline: [
      { time: "15/03/2024 09:15", status: "Đặt hàng thành công", note: "Đơn hàng đã được tiếp nhận", done: true },
      { time: "15/03/2024 10:30", status: "Xác nhận đơn hàng", note: "Đơn hàng đã được xác nhận và chuẩn bị hàng", done: true },
      { time: "15/03/2024 14:00", status: "Đang giao hàng", note: "Giao hàng nhanh GHN - Shipper đang trên đường đến", done: true },
      { time: "", status: "Giao hàng thành công", note: "Khách hàng nhận hàng", done: false },
    ],
  },
  "HTQB240310002": {
    id: "HTQB240310002",
    date: "10/03/2024",
    status: "delivered",
    customer: "Trần Thị Bình",
    phone: "0987 654 321",
    address: "45 Lê Lợi, Hải Châu, Đà Nẵng",
    shippingCode: "GHTK9876543210",
    total: 9550000,
    items: [
      { name: "Vợt Tennis Wilson Pro Staff RF97", quantity: 1, price: 8500000, image: "/images/products/tennis-racket.jpg" },
      { name: "Túi Vợt Tennis Babolat Pure Aero", quantity: 1, price: 1850000, image: "/images/products/tennis-bag.jpg" },
    ],
    timeline: [
      { time: "10/03/2024 08:20", status: "Đặt hàng thành công", note: "Đơn hàng đã được tiếp nhận", done: true },
      { time: "10/03/2024 09:00", status: "Xác nhận đơn hàng", note: "Đơn hàng đã được xác nhận và chuẩn bị hàng", done: true },
      { time: "10/03/2024 15:30", status: "Đang giao hàng", note: "Đã bàn giao cho đơn vị vận chuyển", done: true },
      { time: "11/03/2024 10:45", status: "Giao hàng thành công", note: "Khách hàng đã nhận hàng", done: true },
    ],
  },
}

const statusConfig = {
  pending: { label: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: Clock },
  confirmed: { label: "Đã xác nhận", color: "bg-blue-100 text-blue-700 border-blue-200", icon: CheckCircle },
  shipping: { label: "Đang giao hàng", color: "bg-orange-100 text-orange-700 border-orange-200", icon: Truck },
  delivered: { label: "Đã giao hàng", color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle },
  cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-700 border-red-200", icon: AlertCircle },
}

const formatPrice = (p: number) => new Intl.NumberFormat("vi-VN").format(p) + "đ"

export default function OrderLookupPage() {
  const [orderId, setOrderId] = useState("")
  const [phone, setPhone] = useState("")
  const [result, setResult] = useState<typeof mockOrders[string] | null | "not-found">(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = () => {
    setLoading(true)
    setTimeout(() => {
      const order = mockOrders[orderId.trim().toUpperCase()]
      if (order && (!phone || order.phone.replace(/\s/g, "").includes(phone.replace(/\s/g, "")))) {
        setResult(order)
      } else {
        setResult("not-found")
      }
      setLoading(false)
    }, 800)
  }

  const order = result && result !== "not-found" ? result : null

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Trang chủ</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Tra cứu đơn hàng</span>
          </nav>

          <h1 className="text-2xl lg:text-3xl font-bold mb-2">Tra Cứu Đơn Hàng</h1>
          <p className="text-muted-foreground mb-8">Nhập mã đơn hàng để kiểm tra trạng thái giao hàng</p>

          {/* Search form */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-6">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="order-id">Mã đơn hàng *</Label>
                <Input
                  id="order-id"
                  placeholder="VD: HTQB240315001"
                  value={orderId}
                  onChange={e => setOrderId(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSearch()}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại (tùy chọn)</Label>
                <Input
                  id="phone"
                  placeholder="VD: 0912345678"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSearch()}
                />
              </div>
            </div>
            <Button className="w-full gap-2" onClick={handleSearch} disabled={!orderId.trim() || loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Đang tra cứu...
                </span>
              ) : (
                <><Search className="h-4 w-4" /> Tra cứu đơn hàng</>
              )}
            </Button>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Demo: thử mã <span className="font-mono font-semibold text-primary cursor-pointer" onClick={() => setOrderId("HTQB240315001")}>HTQB240315001</span> hoặc <span className="font-mono font-semibold text-primary cursor-pointer" onClick={() => setOrderId("HTQB240310002")}>HTQB240310002</span>
            </p>
          </div>

          {/* Not found */}
          {result === "not-found" && (
            <div className="bg-card border border-border rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-bold text-lg mb-2">Không tìm thấy đơn hàng</h3>
              <p className="text-muted-foreground text-sm mb-4">Vui lòng kiểm tra lại mã đơn hàng hoặc số điện thoại</p>
              <Button variant="outline" onClick={() => { setResult(null); setOrderId(""); setPhone("") }}>Thử lại</Button>
            </div>
          )}

          {/* Order result */}
          {order && (
            <div className="space-y-4">
              {/* Header card */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Mã đơn hàng</p>
                    <p className="font-bold text-lg font-mono">{order.id}</p>
                  </div>
                  <Badge className={`${statusConfig[order.status].color} border px-3 py-1 text-sm`}>
                    {statusConfig[order.status].label}
                  </Badge>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Package className="h-4 w-4" />
                      <span>Ngày đặt: <span className="text-foreground font-medium">{order.date}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Truck className="h-4 w-4" />
                      <span>Mã vận chuyển: <span className="text-foreground font-medium">{order.shippingCode}</span></span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>{order.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{order.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-bold mb-5">Trạng thái đơn hàng</h3>
                <div className="relative">
                  <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />
                  <div className="space-y-6">
                    {order.timeline.map((step, i) => (
                      <div key={i} className="flex gap-4 relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 ${
                          step.done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}>
                          {step.done ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                        </div>
                        <div className="flex-1 pt-1">
                          <p className={`font-medium text-sm ${!step.done && "text-muted-foreground"}`}>{step.status}</p>
                          <p className="text-xs text-muted-foreground">{step.note}</p>
                          {step.time && <p className="text-xs text-muted-foreground mt-1">{step.time}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-bold mb-4">Sản phẩm trong đơn</h3>
                <div className="space-y-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Số lượng: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-primary shrink-0">{formatPrice(item.price)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border mt-4 pt-4 flex justify-between items-center">
                  <span className="font-semibold">Tổng cộng</span>
                  <span className="text-xl font-bold text-primary">{formatPrice(order.total)}</span>
                </div>
              </div>

              {/* Support */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-sm">Cần hỗ trợ về đơn hàng?</p>
                  <p className="text-xs text-muted-foreground">Liên hệ hotline hoặc chat trực tiếp</p>
                </div>
                <Button size="sm" className="gap-2 shrink-0" asChild>
                  <a href="tel:1900636636"><Phone className="h-4 w-4" /> 1900 636 636</a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
