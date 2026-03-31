import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const categoryGroups = [
  {
    title: "Sản phẩm Cầu Lông",
    color: "bg-emerald-600",
    items: [
      { name: "Vợt Cầu Lông", image: "/images/products/badminton-racket-1.jpg" },
      { name: "Giày Cầu Lông", image: "/images/products/badminton-shoes.jpg" },
      { name: "Áo Cầu Lông", image: "/images/categories/badminton-shirt.jpg" },
      { name: "Túi Vợt", image: "/images/categories/racket-bag.jpg" },
    ]
  },
  {
    title: "Sản phẩm Pickleball",
    color: "bg-orange-500",
    items: [
      { name: "Vợt Pickleball", image: "/images/products/pickleball-paddle.jpg" },
      { name: "Giày Pickleball", image: "/images/products/pickleball-shoes.jpg" },
      { name: "Áo Pickleball", image: "/images/categories/pickleball-shirt.jpg" },
      { name: "Bóng Pickleball", image: "/images/categories/pickleball-balls.jpg" },
    ]
  },
  {
    title: "Sản phẩm Tennis",
    color: "bg-teal-600",
    items: [
      { name: "Vợt Tennis", image: "/images/products/tennis-racket.jpg" },
      { name: "Giày Tennis", image: "/images/categories/tennis-shoes.jpg" },
      { name: "Áo Tennis", image: "/images/categories/tennis-shirt.jpg" },
      { name: "Balo Tennis", image: "/images/categories/tennis-backpack.jpg" },
    ]
  },
]

export function CategoriesSection() {
  return (
    <section className="py-8 lg:py-12 bg-muted/50">
      <div className="container mx-auto px-4 space-y-8 lg:space-y-12">
        {categoryGroups.map((group, index) => (
          <div key={index}>
            {/* Category Header */}
            <div className={`${group.color} text-white rounded-t-lg px-4 py-3 flex items-center justify-between`}>
              <h2 className="text-lg lg:text-xl font-bold">{group.title}</h2>
              <Link href="#" className="flex items-center text-sm hover:underline">
                Xem tất cả <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            {/* Category Items */}
            <div className="bg-card rounded-b-lg border border-t-0 border-border">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y divide-border">
                {group.items.map((item, itemIndex) => (
                  <Link 
                    key={itemIndex} 
                    href="#" 
                    className="p-4 lg:p-6 flex flex-col items-center gap-3 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="font-medium text-sm lg:text-base text-center group-hover:text-primary transition-colors">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
