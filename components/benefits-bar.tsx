import { Truck, Shield, CreditCard, RefreshCw } from "lucide-react"

const benefits = [
  {
    icon: Truck,
    title: "Vận chuyển TOÀN QUỐC",
    description: "Thanh toán khi nhận hàng"
  },
  {
    icon: Shield,
    title: "Bảo đảm chất lượng",
    description: "Sản phẩm chính hãng 100%"
  },
  {
    icon: CreditCard,
    title: "Thanh toán đa dạng",
    description: "Nhiều phương thức thanh toán"
  },
  {
    icon: RefreshCw,
    title: "Đổi trả dễ dàng",
    description: "Đổi sản phẩm mới nếu lỗi"
  },
]

export function BenefitsBar() {
  return (
    <section className="bg-card border-y border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm lg:text-base">{benefit.title}</h3>
                <p className="text-muted-foreground text-xs lg:text-sm">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
