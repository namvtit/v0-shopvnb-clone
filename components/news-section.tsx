import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

const newsArticles = [
  {
    id: 1,
    title: "Khám phá Sân Cầu Lông D-Badminton Tân Phú chất lượng tại TP.HCM",
    excerpt: "Nếu bạn đang tìm kiếm một sân cầu lông tại TP.HCM vừa giá rẻ, vừa không gian rộng rãi, lại đảm bảo...",
    image: "/images/news/badminton-court.jpg",
    date: "28-03-2026"
  },
  {
    id: 2,
    title: "Review sân Maxping Pickleball tại Hà Nội và trải nghiệm thực tế",
    excerpt: "Tại khu vực Đống Đa có khá nhiều sân pickleball với những đặc điểm khác nhau về mặt sân và trải nghi...",
    image: "/images/news/pickleball-court.jpg",
    date: "28-03-2026"
  },
  {
    id: 3,
    title: "Top 10 mẫu vợt pickleball trẻ em chất lượng hiện nay",
    excerpt: "Pickleball là môn thể thao đang ngày càng phổ biến trong cộng đồng trẻ em nhờ tính linh hoạt và dễ c...",
    image: "/images/news/pickleball-kids.jpg",
    date: "09-02-2026"
  },
  {
    id: 4,
    title: "Hướng dẫn cách chọn vợt Pickleball Joola chi tiết nhất",
    excerpt: "Trong số các thương hiệu nổi bật, Joola là cái tên được nhiều vận động viên chuyên nghiệp lẫn người...",
    image: "/images/news/pickleball-guide.jpg",
    date: "09-02-2026"
  },
]

export function NewsSection() {
  return (
    <section className="py-8 lg:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold">Tin tức mới</h2>
          <Button variant="link" className="text-primary p-0 h-auto">
            Xem tất cả <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsArticles.map((article) => (
            <Link key={article.id} href="#" className="group">
              <article className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{article.date}</span>
                  </div>
                  <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
