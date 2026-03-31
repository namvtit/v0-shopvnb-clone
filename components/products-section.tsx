"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { products } from "@/lib/products"

const tabs = [
  { id: "all", name: "Tất cả" },
  { id: "badminton", name: "Cầu Lông" },
  { id: "pickleball", name: "Pickleball" },
  { id: "tennis", name: "Tennis" },
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
