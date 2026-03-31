import { Header } from "@/components/header"
import { HeroBanner } from "@/components/hero-banner"
import { BenefitsBar } from "@/components/benefits-bar"
import { ProductsSection } from "@/components/products-section"
import { CategoriesSection } from "@/components/categories-section"
import { NewsSection } from "@/components/news-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroBanner />
        <BenefitsBar />
        <ProductsSection />
        <CategoriesSection />
        <NewsSection />
      </main>
      <Footer />
    </div>
  )
}
