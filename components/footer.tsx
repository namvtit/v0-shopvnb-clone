import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-10 lg:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">HT</span>
              </div>
              <div>
                <span className="text-xl font-bold text-primary">HTQB</span>
                <span className="text-xl font-bold text-secondary">_SHOP</span>
              </div>
            </div>
            <p className="text-background/80 text-sm mb-4">
              Hệ thống cửa hàng cầu lông, tennis, pickleball uy tín hàng đầu Việt Nam với hơn 50 chi nhánh trên toàn quốc.
            </p>
            <div className="flex gap-3">
              <Link href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-background/80 hover:text-primary transition-colors">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-primary transition-colors">
                  Chính sách bảo hành
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-primary transition-colors">
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-primary transition-colors">
                  Chính sách vận chuyển
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-primary transition-colors">
                  Hướng dẫn mua hàng
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4">Danh mục sản phẩm</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-background/80 hover:text-primary transition-colors">
                  Vợt Cầu Lông
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-primary transition-colors">
                  Vợt Pickleball
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-primary transition-colors">
                  Vợt Tennis
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-primary transition-colors">
                  Giày Thể Thao
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-primary transition-colors">
                  Phụ Kiện
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Hotline</p>
                  <p className="text-background/80">1900 636 636</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-background/80">support@htqb_shop.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Địa chỉ</p>
                  <p className="text-background/80">50+ cửa hàng toàn quốc</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/60">
            <p>© 2026 HTQB_SHOP. Tất cả quyền được bảo lưu.</p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-primary transition-colors">
                Điều khoản sử dụng
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Chính sách bảo mật
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
