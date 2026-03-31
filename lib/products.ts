export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  brand: string
  isNew?: boolean
  discount?: number
  category: string
  description?: string
  specs?: { label: string; value: string }[]
  images?: string[]
}

export const products: Product[] = [
  {
    id: 1,
    name: "Vợt Cầu Lông Yonex Astrox 99 Pro",
    price: 4500000,
    originalPrice: 5200000,
    image: "/images/products/badminton-racket-1.jpg",
    images: [
      "/images/products/badminton-racket-1.jpg",
      "/images/products/badminton-racket-2.jpg",
    ],
    brand: "Yonex",
    isNew: true,
    discount: 13,
    category: "badminton",
    description: "Vợt cầu lông Yonex Astrox 99 Pro là dòng vợt cao cấp dành cho người chơi chuyên nghiệp. Với công nghệ ROTATIONAL GENERATOR SYSTEM và thiết kế nặng đầu, vợt mang đến những cú smash mạnh mẽ và chính xác. Thân vợt được làm từ chất liệu carbon cao cấp, đảm bảo độ bền và hiệu suất tối ưu.",
    specs: [
      { label: "Trọng lượng", value: "83g (4U)" },
      { label: "Độ cứng", value: "Cứng" },
      { label: "Điểm cân bằng", value: "Nặng đầu" },
      { label: "Độ căng tối đa", value: "28 lbs" },
      { label: "Chất liệu", value: "HM Graphite + Namd + Tungsten" },
      { label: "Xuất xứ", value: "Nhật Bản" },
    ]
  },
  {
    id: 2,
    name: "Vợt Cầu Lông Victor Thruster Ryuga II Pro",
    price: 3850000,
    originalPrice: 4200000,
    image: "/images/products/badminton-racket-2.jpg",
    images: [
      "/images/products/badminton-racket-2.jpg",
      "/images/products/badminton-racket-1.jpg",
    ],
    brand: "Victor",
    isNew: true,
    discount: 8,
    category: "badminton",
    description: "Victor Thruster Ryuga II Pro là vợt cầu lông được thiết kế cho những người chơi thích tấn công. Với công nghệ FREE CORE và HARD CORED TECHNOLOGY, vợt mang đến sự linh hoạt và sức mạnh trong mỗi cú đánh.",
    specs: [
      { label: "Trọng lượng", value: "85g (3U)" },
      { label: "Độ cứng", value: "Cứng" },
      { label: "Điểm cân bằng", value: "Nặng đầu" },
      { label: "Độ căng tối đa", value: "31 lbs" },
      { label: "Chất liệu", value: "High Resilient Modulus Graphite + Nano Resin" },
      { label: "Xuất xứ", value: "Đài Loan" },
    ]
  },
  {
    id: 3,
    name: "Vợt Pickleball Joola Ben Johns Hyperion CFS 16",
    price: 6200000,
    originalPrice: 7000000,
    image: "/images/products/pickleball-paddle.jpg",
    images: [
      "/images/products/pickleball-paddle.jpg",
    ],
    brand: "Joola",
    isNew: true,
    discount: 11,
    category: "pickleball",
    description: "Joola Ben Johns Hyperion CFS 16 là vợt pickleball chuyên nghiệp được thiết kế bởi tay vợt số 1 thế giới Ben Johns. Với bề mặt Carbon Friction Surface, vợt mang đến khả năng kiểm soát và spin tuyệt vời.",
    specs: [
      { label: "Trọng lượng", value: "220-240g" },
      { label: "Bề mặt", value: "Carbon Friction Surface" },
      { label: "Lõi", value: "Polymer Honeycomb" },
      { label: "Chiều dài", value: "16.5 inch" },
      { label: "Grip", value: "4.125 inch" },
      { label: "Xuất xứ", value: "Mỹ" },
    ]
  },
  {
    id: 4,
    name: "Giày Cầu Lông Yonex 65Z3",
    price: 2950000,
    originalPrice: 3400000,
    image: "/images/products/badminton-shoes.jpg",
    images: [
      "/images/products/badminton-shoes.jpg",
    ],
    brand: "Yonex",
    discount: 13,
    category: "badminton",
    description: "Giày cầu lông Yonex 65Z3 là dòng giày cao cấp với công nghệ POWER CUSHION+ mang đến sự êm ái và khả năng hấp thụ chấn động tuyệt vời. Thiết kế ôm chân, hỗ trợ di chuyển nhanh và linh hoạt trên sân.",
    specs: [
      { label: "Công nghệ", value: "Power Cushion+" },
      { label: "Đế", value: "Cao su không trượt" },
      { label: "Upper", value: "Double Raschel Mesh" },
      { label: "Trọng lượng", value: "310g (size 42)" },
      { label: "Màu sắc", value: "Trắng/Đỏ" },
      { label: "Xuất xứ", value: "Việt Nam" },
    ]
  },
  {
    id: 5,
    name: "Vợt Tennis Wilson Pro Staff RF97",
    price: 8500000,
    originalPrice: 9500000,
    image: "/images/products/tennis-racket.jpg",
    images: [
      "/images/products/tennis-racket.jpg",
    ],
    brand: "Wilson",
    isNew: true,
    discount: 10,
    category: "tennis",
    description: "Wilson Pro Staff RF97 là vợt tennis signature của Roger Federer. Với thiết kế cổ điển và công nghệ Braided Graphite, vợt mang đến cảm giác chạm bóng tuyệt vời và khả năng kiểm soát hoàn hảo.",
    specs: [
      { label: "Trọng lượng", value: "340g" },
      { label: "Mặt vợt", value: "97 sq in" },
      { label: "Cân bằng", value: "304mm" },
      { label: "Pattern", value: "16x19" },
      { label: "Độ cứng", value: "68" },
      { label: "Xuất xứ", value: "Trung Quốc" },
    ]
  },
  {
    id: 6,
    name: "Giày Pickleball ASICS Gel-Renma",
    price: 2400000,
    originalPrice: 2800000,
    image: "/images/products/pickleball-shoes.jpg",
    images: [
      "/images/products/pickleball-shoes.jpg",
    ],
    brand: "ASICS",
    discount: 14,
    category: "pickleball",
    description: "ASICS Gel-Renma là giày pickleball chuyên dụng với công nghệ GEL mang đến sự êm ái tối ưu. Đế AHAR+ bền bỉ, phù hợp cho cả sân indoor và outdoor.",
    specs: [
      { label: "Công nghệ", value: "GEL Technology" },
      { label: "Đế", value: "AHAR+ Rubber" },
      { label: "Upper", value: "Synthetic Leather + Mesh" },
      { label: "Trọng lượng", value: "340g (size 42)" },
      { label: "Màu sắc", value: "Trắng/Xanh" },
      { label: "Xuất xứ", value: "Indonesia" },
    ]
  },
  {
    id: 7,
    name: "Vợt Cầu Lông Lining Axforce 100",
    price: 3200000,
    originalPrice: 3800000,
    image: "/images/products/badminton-racket-3.jpg",
    images: [
      "/images/products/badminton-racket-3.jpg",
      "/images/products/badminton-racket-1.jpg",
    ],
    brand: "Lining",
    discount: 16,
    category: "badminton",
    description: "Lining Axforce 100 là vợt cầu lông với công nghệ WING STABILIZER mang đến sự ổn định trong mỗi cú swing. Thiết kế Air Stream cho phép không khí lưu thông, giảm lực cản khi vung vợt.",
    specs: [
      { label: "Trọng lượng", value: "88g (W2)" },
      { label: "Độ cứng", value: "Trung bình" },
      { label: "Điểm cân bằng", value: "Cân bằng" },
      { label: "Độ căng tối đa", value: "30 lbs" },
      { label: "Chất liệu", value: "Military Grade Carbon Fiber" },
      { label: "Xuất xứ", value: "Trung Quốc" },
    ]
  },
  {
    id: 8,
    name: "Túi Vợt Tennis Babolat Pure Aero",
    price: 1850000,
    originalPrice: 2200000,
    image: "/images/products/tennis-bag.jpg",
    images: [
      "/images/products/tennis-bag.jpg",
    ],
    brand: "Babolat",
    discount: 16,
    category: "tennis",
    description: "Túi vợt Babolat Pure Aero có thể chứa đến 6 vợt tennis cùng các phụ kiện. Thiết kế nhiều ngăn tiện lợi, ngăn cách nhiệt bảo vệ vợt khỏi nhiệt độ cao.",
    specs: [
      { label: "Sức chứa", value: "6 vợt" },
      { label: "Kích thước", value: "73 x 33 x 25 cm" },
      { label: "Ngăn", value: "2 ngăn chính + 2 ngăn phụ" },
      { label: "Chất liệu", value: "Polyester" },
      { label: "Màu sắc", value: "Vàng/Đen" },
      { label: "Xuất xứ", value: "Trung Quốc" },
    ]
  },
]

export function getProductById(id: number): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products
  return products.filter(p => p.category === category)
}

export function getRelatedProducts(product: Product, limit: number = 4): Product[] {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit)
}
