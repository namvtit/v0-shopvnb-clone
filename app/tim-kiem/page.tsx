"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { products } from "@/lib/products"
import { Search, X } from "lucide-react"

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [activeQuery, setActiveQuery] = useState(initialQuery)

  const searchResults = useMemo(() => {
    if (!activeQuery.trim()) return []
    
    const query = activeQuery.toLowerCase().trim()
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query)
    )
  }, [activeQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setActiveQuery(searchQuery)
  }

  const popularSearches = [
    "Vợt Yonex",
    "Giày cầu lông",
    "Pickleball",
    "Tennis Wilson",
    "Túi vợt"
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 py-6 text-lg"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("")
                    setActiveQuery("")
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              )}
            </form>

            {/* Popular Searches */}
            {!activeQuery && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Tìm kiếm phổ biến:</p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map(term => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term)
                        setActiveQuery(term)
                      }}
                      className="px-3 py-1.5 bg-muted rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Results */}
          {activeQuery && (
            <>
              <div className="mb-6">
                <h1 className="text-xl font-bold">
                  Kết quả tìm kiếm cho &ldquo;{activeQuery}&rdquo;
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Tìm thấy {searchResults.length} sản phẩm
                </p>
              </div>

              {searchResults.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {searchResults.map(product => (
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
                  <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center mb-6">
                    <Search className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Không tìm thấy sản phẩm</h2>
                  <p className="text-muted-foreground mb-6">
                    Không có sản phẩm nào phù hợp với từ khóa &ldquo;{activeQuery}&rdquo;
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Gợi ý:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>Kiểm tra lỗi chính tả</li>
                      <li>Sử dụng từ khóa ngắn gọn hơn</li>
                      <li>Thử tìm kiếm với từ khóa khác</li>
                    </ul>
                  </div>
                  <Link href="/" className="inline-block mt-8">
                    <Button className="bg-primary hover:bg-primary/90">
                      Về trang chủ
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}

          {/* No Query */}
          {!activeQuery && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-bold mb-2">Tìm kiếm sản phẩm</h2>
              <p className="text-muted-foreground">
                Nhập từ khóa để tìm kiếm vợt, giày và phụ kiện thể thao
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
