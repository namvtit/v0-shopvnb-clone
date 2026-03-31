import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  brand: string
  isNew?: boolean
  discount?: number
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  brand,
  isNew,
  discount,
}: ProductCardProps) {
  const formatPrice = (p: number) => {
    return new Intl.NumberFormat("vi-VN").format(p) + "đ"
  }

  return (
    <Link href={`/san-pham/${id}`} className="group block">
      <div className="bg-card rounded-lg border border-border overflow-hidden transition-shadow hover:shadow-lg">
        {/* Image */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isNew && (
              <Badge className="bg-primary text-primary-foreground">Mới</Badge>
            )}
            {discount && discount > 0 && (
              <Badge className="bg-secondary text-secondary-foreground">-{discount}%</Badge>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-3 lg:p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            {brand}
          </p>
          <h3 className="font-medium text-sm lg:text-base line-clamp-2 mb-2 group-hover:text-primary transition-colors min-h-[2.5rem] lg:min-h-[3rem]">
            {name}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-primary font-bold text-base lg:text-lg">
              {formatPrice(price)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-muted-foreground text-sm line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
