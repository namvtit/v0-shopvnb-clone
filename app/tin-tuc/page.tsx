"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronRight, Clock, User, Search } from "lucide-react"
import { newsArticles } from "@/lib/news"

const categories = ["Tất cả", "Đánh giá sản phẩm", "Tin thể thao", "Hướng dẫn"]

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("Tất cả")
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = newsArticles.filter(article => {
    const matchCat = activeCategory === "Tất cả" || article.category === activeCategory
    const matchSearch = !searchQuery || article.title.toLowerCase().includes(searchQuery.toLowerCase()) || article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">Tin Tức & Hướng Dẫn</h1>
            <p className="text-primary-foreground/80 max-w-xl mx-auto">
              Cập nhật tin tức thể thao, đánh giá sản phẩm và hướng dẫn kỹ thuật từ các chuyên gia
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
            <div className="relative sm:ml-auto sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm bài viết..."
                className="pl-9 h-9"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              Không tìm thấy bài viết nào.
            </div>
          ) : (
            <>
              {/* Featured article */}
              {featured && (
                <Link href={`/tin-tuc/${featured.slug}`} className="group block mb-10">
                  <div className="grid lg:grid-cols-2 gap-6 bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-colors shadow-sm">
                    <div className="relative h-64 lg:h-auto overflow-hidden">
                      <Image
                        src={featured.image}
                        alt={featured.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                        {featured.category}
                      </Badge>
                    </div>
                    <div className="p-6 lg:p-8 flex flex-col justify-center">
                      <Badge variant="secondary" className="w-fit mb-3">Bài nổi bật</Badge>
                      <h2 className="text-xl lg:text-2xl font-bold mb-3 group-hover:text-primary transition-colors leading-snug">
                        {featured.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 line-clamp-3">{featured.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-auto">
                        <span className="flex items-center gap-1.5"><User className="h-4 w-4" />{featured.author}</span>
                        <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{featured.readTime} phút đọc</span>
                        <span>{featured.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Rest articles grid */}
              {rest.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map(article => (
                    <Link key={article.id} href={`/tin-tuc/${article.slug}`} className="group block bg-card rounded-xl overflow-hidden border border-border hover:border-primary/40 transition-colors shadow-sm">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs">
                          {article.category}
                        </Badge>
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{article.excerpt}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{article.author}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{article.readTime} phút</span>
                          <span className="ml-auto">{article.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
