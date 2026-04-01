"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, SlidersHorizontal, X } from "lucide-react"
import { products } from "@/lib/products"
import Link from "next/link"
import { Suspense } from "react"

const categoryLabels: Record<string, string> = {
  badminton: "Cầu Lông",
  pickleball: "Pickleball",
  tennis: "Tennis",
}

const brands = ["Yonex", "Victor", "Joola", "Wilson", "ASICS", "Lining", "Babolat"]

function ProductListContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category") || "all"
  const searchParam = searchParams.get("search") || ""
  const saleParam = searchParams.get("sale") === "true"

  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<"all" | "under3m" | "3-6m" | "over6m">("all")
  const [sortBy, setSortBy] = useState("default")
  const [searchQuery, setSearchQuery] = useState(searchParam)

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    )
  }

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Category
    if (selectedCategory !== "all") {
      result = result.filter(p => p.category === selectedCategory)
    }

    // Sale
    if (saleParam) {
      result = result.filter(p => p.discount && p.discount > 0)
    }

    // Brand
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand))
    }

    // Price
    if (priceRange === "under3m") {
      result = result.filter(p => p.price < 3_000_000)
    } else if (priceRange === "3-6m") {
      result = result.filter(p => p.price >= 3_000_000 && p.price <= 6_000_000)
    } else if (priceRange === "over6m") {
      result = result.filter(p => p.price > 6_000_000)
    }

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      )
    }

    // Sort
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price)
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price)
    else if (sortBy === "discount") result.sort((a, b) => (b.discount || 0) - (a.discount || 0))
    else if (sortBy === "new") result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))

    return result
  }, [selectedCategory, selectedBrands, priceRange, sortBy, searchQuery, saleParam])

  const hasFilters = selectedCategory !== "all" || selectedBrands.length > 0 || priceRange !== "all" || searchQuery

  const clearFilters = () => {
    setSelectedCategory("all")
    setSelectedBrands([])
    setPriceRange("all")
    setSearchQuery("")
  }

  const tabs = [
    { id: "all", name: "Tất cả" },
    { id: "badminton", name: "Cầu Lông" },
    { id: "pickleball", name: "Pickleball" },
    { id: "tennis", name: "Tennis" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Trang chủ</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">
              {saleParam ? "Sale Off" : selectedCategory !== "all" ? categoryLabels[selectedCategory] : "Tất cả sản phẩm"}
            </span>
          </nav>

          <h1 className="text-2xl lg:text-3xl font-bold mb-6">
            {saleParam ? "Sale Off" : selectedCategory !== "all" ? categoryLabels[selectedCategory] : "Tất cả sản phẩm"}
          </h1>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className="hidden lg:block w-60 flex-shrink-0">
              <div className="space-y-6">
                {/* Category */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Danh mục
                  </h3>
                  <div className="space-y-2">
                    {tabs.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedCategory(tab.id)}
                        className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === tab.id
                            ? "bg-primary text-primary-foreground font-medium"
                            : "hover:bg-muted"
                        }`}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <h3 className="font-semibold mb-3">Thương hiệu</h3>
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="rounded border-border accent-primary"
                        />
                        <span className="text-sm group-hover:text-primary transition-colors">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h3 className="font-semibold mb-3">Mức giá</h3>
                  <div className="space-y-2">
                    {[
                      { value: "all", label: "Tất cả" },
                      { value: "under3m", label: "Dưới 3 triệu" },
                      { value: "3-6m", label: "3 - 6 triệu" },
                      { value: "over6m", label: "Trên 6 triệu" },
                    ].map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setPriceRange(opt.value as typeof priceRange)}
                        className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          priceRange === opt.value
                            ? "bg-primary text-primary-foreground font-medium"
                            : "hover:bg-muted"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {hasFilters && (
                  <Button variant="outline" size="sm" className="w-full gap-2" onClick={clearFilters}>
                    <X className="h-4 w-4" />
                    Xóa bộ lọc
                  </Button>
                )}
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Mobile category tabs */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2 lg:hidden">
                {tabs.map(tab => (
                  <Button
                    key={tab.id}
                    variant={selectedCategory === tab.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(tab.id)}
                    className="whitespace-nowrap"
                  >
                    {tab.name}
                  </Button>
                ))}
              </div>

              {/* Sort & Count */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{filteredProducts.length}</span> sản phẩm
                </p>
                <div className="flex items-center gap-3">
                  {selectedBrands.map(b => (
                    <Badge key={b} variant="secondary" className="gap-1 cursor-pointer" onClick={() => toggleBrand(b)}>
                      {b} <X className="h-3 w-3" />
                    </Badge>
                  ))}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-44 h-9">
                      <SelectValue placeholder="Sắp xếp" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Mặc định</SelectItem>
                      <SelectItem value="new">Mới nhất</SelectItem>
                      <SelectItem value="price-asc">Giá tăng dần</SelectItem>
                      <SelectItem value="price-desc">Giá giảm dần</SelectItem>
                      <SelectItem value="discount">Giảm giá nhiều nhất</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Product Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">Không tìm thấy sản phẩm phù hợp</p>
                  <Button variant="outline" className="mt-4" onClick={clearFilters}>
                    Xóa bộ lọc
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} {...product} />
                  ))}
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

export default function ProductListPage() {
  return (
    <Suspense>
      <ProductListContent />
    </Suspense>
  )
}
