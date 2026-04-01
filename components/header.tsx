"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, Heart, Phone, MapPin, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { CartSidebar } from "@/components/cart-sidebar"
import { products } from "@/lib/products"

const categories = [
  {
    name: "Cầu Lông",
    href: "/san-pham?category=badminton",
    subcategories: ["Vợt Cầu Lông", "Giày Cầu Lông", "Áo Cầu Lông", "Quần Cầu Lông", "Túi Vợt", "Balo", "Phụ Kiện"]
  },
  {
    name: "Pickleball",
    href: "/san-pham?category=pickleball",
    subcategories: ["Vợt Pickleball", "Giày Pickleball", "Áo Pickleball", "Quần Pickleball", "Bóng Pickleball", "Túi Pickleball"]
  },
  {
    name: "Tennis",
    href: "/san-pham?category=tennis",
    subcategories: ["Vợt Tennis", "Giày Tennis", "Áo Tennis", "Quần Tennis", "Balo Tennis", "Phụ Kiện"]
  },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const { totalCount, setCartOpen } = useCart()
  const { count: wishlistCount } = useWishlist()

  const searchResults = searchQuery.length > 1
    ? products.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5)
    : []

  // Close search dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("vi-VN").format(p) + "đ"

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* Top bar */}
        <div className="bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Phone className="h-4 w-4" />
                <span>Hotline: 1900 636 636</span>
              </div>

            </div>
            <div className="flex items-center gap-4">
              <Link href="/tra-cuu-don-hang" className="hover:underline">Tra cứu đơn hàng</Link>
              <Link href="/wishlist" className="hover:underline hidden sm:block">Yêu thích</Link>
              <Link href="/dang-nhap" className="hover:underline">Đăng nhập</Link>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-4 lg:gap-8">
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>

              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">HT</span>
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-xl font-bold text-primary">HTQB</span>
                    <span className="text-xl font-bold text-secondary">_SHOP</span>
                  </div>
                </div>
              </Link>

              {/* Search */}
              <div className="flex-1 max-w-2xl hidden sm:block" ref={searchRef}>
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="w-full pl-4 pr-12 py-2.5 rounded-full border-2 border-primary/20 focus:border-primary"
                    value={searchQuery}
                    onChange={e => { setSearchQuery(e.target.value); setSearchOpen(true) }}
                    onFocus={() => setSearchOpen(true)}
                  />
                  <Button
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-8 w-8"
                    asChild
                  >
                    <Link href={`/san-pham?search=${searchQuery}`}>
                      <Search className="h-4 w-4" />
                    </Link>
                  </Button>

                  {/* Search Dropdown */}
                  {searchOpen && searchResults.length > 0 && (
                    <div className="absolute top-full mt-2 left-0 right-0 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden">
                      {searchResults.map(product => (
                        <Link
                          key={product.id}
                          href={`/san-pham/${product.id}`}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                          onClick={() => { setSearchOpen(false); setSearchQuery("") }}
                        >
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            <Image src={product.image} alt={product.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                            <p className="text-xs text-primary font-bold">{formatPrice(product.price)}</p>
                          </div>
                        </Link>
                      ))}
                      <Link
                        href={`/san-pham?search=${searchQuery}`}
                        className="block px-4 py-3 text-sm text-center text-primary font-medium border-t border-border hover:bg-muted transition-colors"
                        onClick={() => setSearchOpen(false)}
                      >
                        Xem tất cả kết quả cho &quot;{searchQuery}&quot;
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 ml-auto">
                <Button variant="ghost" size="icon" className="sm:hidden">
                  <Search className="h-5 w-5" />
                </Button>

                {/* Wishlist */}
                <Link href="/wishlist" className="relative flex items-center justify-center w-10 h-10 hover:text-primary transition-colors">
                  <Heart className="h-6 w-6" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Cart */}
                <button
                  onClick={() => setCartOpen(true)}
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <div className="relative">
                    <ShoppingCart className="h-6 w-6" />
                    <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                      {totalCount}
                    </span>
                  </div>
                  <span className="hidden md:block font-medium">Giỏ hàng</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-card border-b border-border hidden lg:block">
          <div className="container mx-auto px-4">
            <ul className="flex items-center gap-1">
              {categories.map((category) => (
                <li
                  key={category.name}
                  className="relative group"
                  onMouseEnter={() => setActiveCategory(category.name)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  <Link
                    href={category.href}
                    className="flex items-center gap-1 px-4 py-3 font-medium hover:text-primary transition-colors"
                  >
                    {category.name}
                    <ChevronDown className="h-4 w-4" />
                  </Link>
                  {activeCategory === category.name && (
                    <div className="absolute top-full left-0 bg-card border border-border rounded-lg shadow-lg py-2 min-w-[200px] z-50">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub}
                          href={category.href}
                          className="block px-4 py-2 hover:bg-muted hover:text-primary transition-colors"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
              <li>
                <Link href="/san-pham?sale=true" className="px-4 py-3 font-medium hover:text-primary transition-colors block text-secondary">
                  Sale Off
                </Link>
              </li>
              <li>
                <Link href="/tin-tuc" className="px-4 py-3 font-medium hover:text-primary transition-colors block">
                  Tin Tức
                </Link>
              </li>
              <li>
                <Link href="/he-thong-cua-hang" className="px-4 py-3 font-medium hover:text-primary transition-colors block">
                  Hệ Thống Cửa Hàng
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-card border-b border-border">
            <div className="container mx-auto px-4 py-4">
              <div className="mb-4 sm:hidden">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="w-full pl-4 pr-12 py-2.5 rounded-full border-2 border-primary/20"
                  />
                  <Button
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-8 w-8"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      href={category.href}
                      className="block py-2 font-medium hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/san-pham?sale=true" className="block py-2 font-medium text-secondary" onClick={() => setMobileMenuOpen(false)}>Sale Off</Link>
                </li>
                <li>
                  <Link href="/tin-tuc" className="block py-2 font-medium hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Tin Tức</Link>
                </li>
                <li>
                  <Link href="/he-thong-cua-hang" className="block py-2 font-medium hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Hệ Thống Cửa Hàng</Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </header>

      <CartSidebar />
    </>
  )
}
