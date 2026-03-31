import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const categoryGroups = [
  {
    title: "Sản phẩm Cầu Lông",
    color: "bg-emerald-600",
    items: [
      { name: "Vợt Cầu Lông", image: "https://images.unsplash.com/photo-1617883861744-13b534e3b928?w=200&h=200&fit=crop" },
      { name: "Giày Cầu Lông", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop" },
      { name: "Áo Cầu Lông", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=200&fit=crop" },
      { name: "Túi Vợt", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop" },
    ]
  },
  {
    title: "Sản phẩm Pickleball",
    color: "bg-orange-500",
    items: [
      { name: "Vợt Pickleball", image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=200&h=200&fit=crop" },
      { name: "Giày Pickleball", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200&h=200&fit=crop" },
      { name: "Áo Pickleball", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=200&fit=crop" },
      { name: "Bóng Pickleball", image: "https://images.unsplash.com/photo-1558612896-dd8e780aa67e?w=200&h=200&fit=crop" },
    ]
  },
  {
    title: "Sản phẩm Tennis",
    color: "bg-teal-600",
    items: [
      { name: "Vợt Tennis", image: "https://images.unsplash.com/photo-1617083934555-ac7b4d0c8be9?w=200&h=200&fit=crop" },
      { name: "Giày Tennis", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop" },
      { name: "Áo Tennis", image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=200&h=200&fit=crop" },
      { name: "Balo Tennis", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop" },
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
