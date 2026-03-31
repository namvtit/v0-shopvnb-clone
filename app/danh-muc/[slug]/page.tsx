"use client"

import { useState, useMemo, use } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/products"
import { 
  ChevronDown, 
  Grid3X3, 
  LayoutList,
  SlidersHorizontal,
  X
} from "lucide-react"

const categories: Record<string, { name: string; description: string }> = {
  "cau-long": {
    name: "Cầu Lông",
    description: "Khám phá bộ sưu tập vợt cầu lông, giày, quần áo và phụ kiện chất lượng cao"
  },
  "pickleball": {
    name: "Pickleball", 
    description: "Trang bị đầy đủ vợt, giày và phụ kiện pickleball từ các thương hiệu hàng đầu"
  },
  "tennis": {
    name: "Tennis",
    description: "Vợt tennis, giày và trang phục tennis chuyên nghiệp cho mọi cấp độ"
  },
  "giay": {
    name: "Giày Thể Thao",
    description: "Bộ sưu tập giày thể thao đa dạng cho cầu lông, pickleball và tennis"
  },
  "phu-kien": {
    name: "Phụ Kiện",
    description: "Túi vợt, balo, quấn cán, dây đan và các phụ kiện thể thao khác"
  }
}

const brands = ["Tất cả", "Yonex", "Victor", "Lining", "Wilson", "Babolat", "Joola", "ASICS"]
const priceRanges = [
  { label: "Tất cả", min: 0, max: Infinity },
  { label: "Dưới 1 triệu", min: 0, max: 1000000 },
  { label: "1 - 3 triệu", min: 1000000, max: 3000000 },
  { label: "3 - 5 triệu", min: 3000000, max: 5000000 },
  { label: "Trên 5 triệu", min: 5000000, max: Infinity },
]
const sortOptions = [
  { value: "newest", label: "Mới nhất" },
  { value: "price-asc", label: "Giá tăng dần" },
  { value: "price-desc", label: "Giá giảm dần" },
  { value: "name", label: "Tên A-Z" },
]

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const category = categories[slug]
  
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedBrand, setSelectedBrand] = useState("Tất cả")
  const [selectedPriceRange, setSelectedPriceRange] = useState(0)
  const [showFilters, setShowFilters] = useState(false)

  const categoryMapping: Record<string, string> = {
    "cau-long": "badminton",
    "pickleball": "pickleball",
    "tennis": "tennis",
  }

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filter by category
    const mappedCategory = categoryMapping[slug]
    if (mappedCategory) {
      result = result.filter(p => p.category === mappedCategory)
    }

    // Filter by type for special categories
    if (slug === "giay") {
      result = products.filter(p => p.name.toLowerCase().includes("giày"))
    } else if (slug === "phu-kien") {
      result = products.filter(p => 
        p.name.toLowerCase().includes("túi") || 
        p.name.toLowerCase().includes("balo")
      )
    }

    // Filter by brand
    if (selectedBrand !== "Tất cả") {
      result = result.filter(p => p.brand === selectedBrand)
    }

    // Filter by price range
    const range = priceRanges[selectedPriceRange]
    result = result.filter(p => p.price >= range.min && p.price <= range.max)

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        result.sort((a, b) => b.id - a.id)
    }

    return result
  }, [slug, selectedBrand, selectedPriceRange, sortBy])

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Danh mục không tồn tại</h1>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90">
                Về trang chủ
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
            <span className="text-foreground font-medium">{category.name}</span>
          </nav>

          {/* Category Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{category.name}</h1>
            <p className="text-muted-foreground">{category.description}</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-card rounded-xl shadow-sm p-6 sticky top-4">
                <h3 className="font-bold mb-4">Bộ lọc</h3>

                {/* Brand Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-sm">Thương hiệu</h4>
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="brand"
                          checked={selectedBrand === brand}
                          onChange={() => setSelectedBrand(brand)}
                          className="w-4 h-4 text-primary"
                        />
                        <span className="text-sm">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-sm">Khoảng giá</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range, index) => (
                      <label key={range.label} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="price"
                          checked={selectedPriceRange === index}
                          onChange={() => setSelectedPriceRange(index)}
                          className="w-4 h-4 text-primary"
                        />
                        <span className="text-sm">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Reset Filters */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedBrand("Tất cả")
                    setSelectedPriceRange(0)
                  }}
                >
                  Xóa bộ lọc
                </Button>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    className="lg:hidden"
                    onClick={() => setShowFilters(true)}
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Bộ lọc
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {filteredProducts.length} sản phẩm
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-card border rounded-lg px-4 py-2 pr-10 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>

                  {/* View Mode */}
                  <div className="hidden sm:flex items-center border rounded-lg">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                    >
                      <LayoutList className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                    : "space-y-4"
                }>
                  {filteredProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      originalPrice={product.originalPrice}
                      image={product.image}
                      brand={product.brand}
                      isNew={product.isNew}
                      discount={product.discount}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground mb-4">
                    Không tìm thấy sản phẩm phù hợp
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedBrand("Tất cả")
                      setSelectedPriceRange(0)
                    }}
                  >
                    Xóa bộ lọc
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-card p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg">Bộ lọc</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3 text-sm">Thương hiệu</h4>
              <div className="space-y-2">
                {brands.map(brand => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="brand-mobile"
                      checked={selectedBrand === brand}
                      onChange={() => setSelectedBrand(brand)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-sm">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3 text-sm">Khoảng giá</h4>
              <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <label key={range.label} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price-mobile"
                      checked={selectedPriceRange === index}
                      onChange={() => setSelectedPriceRange(index)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-sm">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setSelectedBrand("Tất cả")
                  setSelectedPriceRange(0)
                }}
              >
                Xóa bộ lọc
              </Button>
              <Button
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={() => setShowFilters(false)}
              >
                Áp dụng
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
