"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Phone, MapPin, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const categories = [
  {
    name: "Cầu Lông",
    href: "#",
    subcategories: ["Vợt Cầu Lông", "Giày Cầu Lông", "Áo Cầu Lông", "Quần Cầu Lông", "Túi Vợt", "Balo", "Phụ Kiện"]
  },
  {
    name: "Pickleball",
    href: "#",
    subcategories: ["Vợt Pickleball", "Giày Pickleball", "Áo Pickleball", "Quần Pickleball", "Bóng Pickleball", "Túi Pickleball"]
  },
  {
    name: "Tennis",
    href: "#",
    subcategories: ["Vợt Tennis", "Giày Tennis", "Áo Tennis", "Quần Tennis", "Balo Tennis", "Phụ Kiện"]
  },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Phone className="h-4 w-4" />
              <span>Hotline: 1900 636 636</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>Hệ thống 50+ cửa hàng toàn quốc</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:underline">Tra cứu đơn hàng</Link>
            <Link href="#" className="hover:underline hidden sm:block">Đăng ký</Link>
            <Link href="#" className="hover:underline">Đăng nhập</Link>
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
            <div className="flex-1 max-w-2xl hidden sm:block">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full pl-4 pr-12 py-2.5 rounded-full border-2 border-primary/20 focus:border-primary"
                />
                <Button
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-8 w-8"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Cart */}
            <div className="flex items-center gap-4 ml-auto">
              <Button variant="ghost" size="icon" className="sm:hidden">
                <Search className="h-5 w-5" />
              </Button>
              <Link href="#" className="flex items-center gap-2 hover:text-primary">
                <div className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    0
                  </span>
                </div>
                <span className="hidden md:block font-medium">Giỏ hàng</span>
              </Link>
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
                        href="#"
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
              <Link href="#" className="px-4 py-3 font-medium hover:text-primary transition-colors block">
                Sale Off
              </Link>
            </li>
            <li>
              <Link href="#" className="px-4 py-3 font-medium hover:text-primary transition-colors block">
                Tin Tức
              </Link>
            </li>
            <li>
              <Link href="#" className="px-4 py-3 font-medium hover:text-primary transition-colors block">
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
                <Link href="#" className="block py-2 font-medium hover:text-primary">Sale Off</Link>
              </li>
              <li>
                <Link href="#" className="block py-2 font-medium hover:text-primary">Tin Tức</Link>
              </li>
              <li>
                <Link href="#" className="block py-2 font-medium hover:text-primary">Hệ Thống Cửa Hàng</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}
