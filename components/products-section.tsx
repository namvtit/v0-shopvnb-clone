"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

const tabs = [
  { id: "all", name: "Tất cả" },
  { id: "badminton", name: "Cầu Lông" },
  { id: "pickleball", name: "Pickleball" },
  { id: "tennis", name: "Tennis" },
]

const products = [
  {
    id: 1,
    name: "Vợt Cầu Lông Yonex Astrox 99 Pro",
    price: 4500000,
    originalPrice: 5200000,
    image: "https://images.unsplash.com/photo-1617883861744-13b534e3b928?w=400&h=400&fit=crop",
    brand: "Yonex",
    isNew: true,
    discount: 13,
    category: "badminton"
  },
  {
    id: 2,
    name: "Vợt Cầu Lông Victor Thruster Ryuga II Pro",
    price: 3850000,
    originalPrice: 4200000,
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=400&fit=crop",
    brand: "Victor",
    isNew: true,
    discount: 8,
    category: "badminton"
  },
  {
    id: 3,
    name: "Vợt Pickleball Joola Ben Johns Hyperion CFS 16",
    price: 6200000,
    originalPrice: 7000000,
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=400&fit=crop",
    brand: "Joola",
    isNew: true,
    discount: 11,
    category: "pickleball"
  },
  {
    id: 4,
    name: "Giày Cầu Lông Yonex 65Z3",
    price: 2950000,
    originalPrice: 3400000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    brand: "Yonex",
    discount: 13,
    category: "badminton"
  },
  {
    id: 5,
    name: "Vợt Tennis Wilson Pro Staff RF97",
    price: 8500000,
    originalPrice: 9500000,
    image: "https://images.unsplash.com/photo-1617083934555-ac7b4d0c8be9?w=400&h=400&fit=crop",
    brand: "Wilson",
    isNew: true,
    discount: 10,
    category: "tennis"
  },
  {
    id: 6,
    name: "Giày Pickleball ASICS Gel-Renma",
    price: 2400000,
    originalPrice: 2800000,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
    brand: "ASICS",
    discount: 14,
    category: "pickleball"
  },
  {
    id: 7,
    name: "Vợt Cầu Lông Lining Axforce 100",
    price: 3200000,
    originalPrice: 3800000,
    image: "https://images.unsplash.com/photo-1599058918144-1ffabb6ab9a0?w=400&h=400&fit=crop",
    brand: "Lining",
    discount: 16,
    category: "badminton"
  },
  {
    id: 8,
    name: "Túi Vợt Tennis Babolat Pure Aero",
    price: 1850000,
    originalPrice: 2200000,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    brand: "Babolat",
    discount: 16,
    category: "tennis"
  },
]

export function ProductsSection() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredProducts = activeTab === "all" 
    ? products 
    : products.filter(p => p.category === activeTab)

  return (
    <section className="py-8 lg:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold">Sản phẩm mới</h2>
          <Button variant="link" className="text-primary p-0 h-auto self-start sm:self-auto">
            Xem tất cả <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="whitespace-nowrap"
            >
              {tab.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  )
}
