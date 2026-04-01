"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronRight, MapPin, Phone, Clock, Search, Navigation } from "lucide-react"

const stores = [
  {
    id: 1,
    name: "HTQB Shop - Chi nhánh Hà Nội 1",
    address: "15 Trần Duy Hưng, Trung Hòa, Cầu Giấy, Hà Nội",
    phone: "024 3562 1234",
    hours: "08:00 - 21:00",
    city: "Hà Nội",
    status: "open",
    services: ["Bán lẻ", "Đặt vợt", "Sửa chữa"],
    mapUrl: "https://maps.google.com",
  },
  {
    id: 2,
    name: "HTQB Shop - Chi nhánh Hà Nội 2",
    address: "82 Lê Văn Lương, Nhân Chính, Thanh Xuân, Hà Nội",
    phone: "024 3897 5678",
    hours: "08:30 - 21:30",
    city: "Hà Nội",
    status: "open",
    services: ["Bán lẻ", "Đặt vợt"],
    mapUrl: "https://maps.google.com",
  },
  {
    id: 3,
    name: "HTQB Shop - Chi nhánh TP.HCM 1",
    address: "201 Nguyễn Trãi, Phường 2, Quận 5, TP. Hồ Chí Minh",
    phone: "028 3921 4321",
    hours: "08:00 - 22:00",
    city: "TP.HCM",
    status: "open",
    services: ["Bán lẻ", "Đặt vợt", "Sửa chữa", "Cho thuê sân"],
    mapUrl: "https://maps.google.com",
  },
  {
    id: 4,
    name: "HTQB Shop - Chi nhánh TP.HCM 2",
    address: "56 Đinh Tiên Hoàng, Phường 1, Bình Thạnh, TP. Hồ Chí Minh",
    phone: "028 3845 6789",
    hours: "09:00 - 21:00",
    city: "TP.HCM",
    status: "open",
    services: ["Bán lẻ", "Đặt vợt"],
    mapUrl: "https://maps.google.com",
  },
  {
    id: 5,
    name: "HTQB Shop - Chi nhánh Đà Nẵng",
    address: "34 Ngô Quyền, Phước Ninh, Hải Châu, Đà Nẵng",
    phone: "0236 3512 999",
    hours: "08:00 - 20:30",
    city: "Đà Nẵng",
    status: "open",
    services: ["Bán lẻ", "Đặt vợt", "Sửa chữa"],
    mapUrl: "https://maps.google.com",
  },
  {
    id: 6,
    name: "HTQB Shop - Chi nhánh Cần Thơ",
    address: "109 Nguyễn Văn Linh, An Khánh, Ninh Kiều, Cần Thơ",
    phone: "0292 3811 222",
    hours: "08:30 - 20:00",
    city: "Cần Thơ",
    status: "open",
    services: ["Bán lẻ"],
    mapUrl: "https://maps.google.com",
  },
]

const cities = ["Tất cả", "Hà Nội", "TP.HCM", "Đà Nẵng", "Cần Thơ"]

export default function StoreSystemPage() {
  const [selectedCity, setSelectedCity] = useState("Tất cả")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStore, setSelectedStore] = useState<number | null>(1)

  const filteredStores = stores.filter(store => {
    const matchCity = selectedCity === "Tất cả" || store.city === selectedCity
    const matchSearch = !searchQuery || store.name.toLowerCase().includes(searchQuery.toLowerCase()) || store.address.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCity && matchSearch
  })

  const activeStore = stores.find(s => s.id === selectedStore) || filteredStores[0]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">Hệ Thống Cửa Hàng</h1>
            <p className="text-primary-foreground/80 max-w-xl mx-auto">
              {stores.length} chi nhánh trên toàn quốc, sẵn sàng phục vụ bạn
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Trang chủ</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Hệ thống cửa hàng</span>
          </nav>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Chi nhánh", value: "6" },
              { label: "Tỉnh / Thành phố", value: "4" },
              { label: "Năm hoạt động", value: "10+" },
              { label: "Khách hàng", value: "50K+" },
            ].map(stat => (
              <div key={stat.label} className="bg-card border border-border rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Filter + Search */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex gap-2 flex-wrap">
              {cities.map(city => (
                <Button
                  key={city}
                  variant={selectedCity === city ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCity(city)}
                >
                  {city}
                </Button>
              ))}
            </div>
            <div className="relative sm:ml-auto sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm cửa hàng..."
                className="pl-9 h-9"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Main: list + map */}
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Store list */}
            <div className="lg:col-span-2 space-y-3">
              {filteredStores.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">Không tìm thấy cửa hàng.</div>
              ) : (
                filteredStores.map(store => (
                  <button
                    key={store.id}
                    onClick={() => setSelectedStore(store.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedStore === store.id
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-sm leading-snug">{store.name}</h3>
                      <Badge className="shrink-0 bg-green-100 text-green-700 border-green-200 text-xs">
                        Mở cửa
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-start gap-1.5 mb-1">
                      <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0 text-primary" />
                      {store.address}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{store.phone}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{store.hours}</span>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Map + Detail */}
            <div className="lg:col-span-3 space-y-4">
              {/* Fake Map */}
              <div className="relative h-72 lg:h-96 bg-muted rounded-xl overflow-hidden border border-border">
                <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 text-muted-foreground">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <p className="font-medium text-foreground">{activeStore?.name}</p>
                  <p className="text-sm text-center max-w-xs px-4">{activeStore?.address}</p>
                  <Button size="sm" className="gap-2 mt-2" asChild>
                    <a href={activeStore?.mapUrl} target="_blank" rel="noopener noreferrer">
                      <Navigation className="h-4 w-4" /> Xem trên Google Maps
                    </a>
                  </Button>
                </div>
                {/* Grid lines for map feel */}
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                  backgroundSize: "40px 40px"
                }} />
              </div>

              {/* Store Detail card */}
              {activeStore && (
                <div className="bg-card border border-border rounded-xl p-5">
                  <h2 className="font-bold text-lg mb-3">{activeStore.name}</h2>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{activeStore.address}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone className="h-4 w-4 text-primary shrink-0" />
                        <a href={`tel:${activeStore.phone}`} className="text-primary font-medium hover:underline">
                          {activeStore.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Clock className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-muted-foreground">Giờ mở cửa: <span className="text-foreground font-medium">{activeStore.hours}</span></span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Dịch vụ tại cửa hàng:</p>
                      <div className="flex flex-wrap gap-2">
                        {activeStore.services.map(s => (
                          <Badge key={s} variant="secondary">{s}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                    <Button className="flex-1 gap-2" asChild>
                      <a href={`tel:${activeStore.phone}`}><Phone className="h-4 w-4" /> Gọi ngay</a>
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2" asChild>
                      <a href={activeStore.mapUrl} target="_blank" rel="noopener noreferrer">
                        <Navigation className="h-4 w-4" /> Chỉ đường
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
