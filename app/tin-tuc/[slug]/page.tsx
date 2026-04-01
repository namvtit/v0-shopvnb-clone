"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, Clock, User, Tag, ArrowLeft, Share2, Facebook, Twitter } from "lucide-react"
import { getArticleBySlug, getRelatedArticles } from "@/lib/news"
import { toast } from "sonner"

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const article = getArticleBySlug(slug)

  if (!article) return notFound()

  const related = getRelatedArticles(article)

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Đã sao chép link bài viết!")
  }

  // Simple markdown-like renderer for content
  const renderContent = (content: string) => {
    const lines = content.trim().split("\n")
    return lines.map((line, i) => {
      if (line.startsWith("## ")) {
        return <h2 key={i} className="text-xl font-bold mt-8 mb-3 text-foreground">{line.replace("## ", "")}</h2>
      }
      if (line.startsWith("### ")) {
        return <h3 key={i} className="text-lg font-semibold mt-6 mb-2 text-foreground">{line.replace("### ", "")}</h3>
      }
      if (line.startsWith("**") && line.endsWith("**")) {
        return <p key={i} className="font-semibold mt-4 mb-1">{line.replace(/\*\*/g, "")}</p>
      }
      if (line.startsWith("- ")) {
        return <li key={i} className="ml-4 text-muted-foreground list-disc">{line.replace("- ", "")}</li>
      }
      if (line.trim() === "") return <br key={i} />
      return <p key={i} className="text-muted-foreground leading-relaxed mb-2">{line}</p>
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Trang chủ</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/tin-tuc" className="hover:text-primary">Tin tức</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground line-clamp-1 max-w-xs">{article.title}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Badge className="mb-4 bg-primary text-primary-foreground">{article.category}</Badge>
              <h1 className="text-2xl lg:text-3xl font-bold mb-4 leading-snug text-balance">{article.title}</h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
                <span className="flex items-center gap-1.5"><User className="h-4 w-4" />{article.author}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{article.readTime} phút đọc</span>
                <span>{article.date}</span>
                <Button variant="outline" size="sm" className="ml-auto gap-2" onClick={handleShare}>
                  <Share2 className="h-4 w-4" /> Chia sẻ
                </Button>
              </div>

              {/* Hero image */}
              <div className="relative h-64 lg:h-96 rounded-xl overflow-hidden mb-8">
                <Image src={article.image} alt={article.title} fill className="object-cover" />
              </div>

              {/* Content */}
              <article className="prose-sm max-w-none">
                {renderContent(article.content)}
              </article>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><Tag className="h-4 w-4" />Tags:</span>
                {article.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Share */}
              <div className="mt-6 p-4 bg-muted rounded-xl flex items-center justify-between">
                <p className="font-medium text-sm">Chia sẻ bài viết này</p>
                <div className="flex gap-2">
                  <Button size="sm" className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white">
                    <Facebook className="h-4 w-4" /> Facebook
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1.5" onClick={handleShare}>
                    <Share2 className="h-4 w-4" /> Sao chép link
                  </Button>
                </div>
              </div>

              <Button variant="outline" asChild className="mt-6 gap-2">
                <Link href="/tin-tuc"><ArrowLeft className="h-4 w-4" /> Quay lại tin tức</Link>
              </Button>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Related */}
              <div className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-bold text-base mb-4 pb-3 border-b border-border">Bài viết liên quan</h3>
                <div className="space-y-4">
                  {related.map(rel => (
                    <Link key={rel.id} href={`/tin-tuc/${rel.slug}`} className="group flex gap-3">
                      <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={rel.image} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors leading-snug">{rel.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{rel.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-bold text-base mb-4 pb-3 border-b border-border">Danh mục</h3>
                <div className="space-y-2">
                  {["Đánh giá sản phẩm", "Tin thể thao", "Hướng dẫn"].map(cat => (
                    <Link key={cat} href={`/tin-tuc?category=${cat}`}
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted hover:text-primary transition-colors text-sm">
                      <span>{cat}</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
