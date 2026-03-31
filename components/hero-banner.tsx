"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    title: "Vợt Cầu Lông Yonex",
    subtitle: "Chính hãng - Giá tốt nhất",
    description: "Bộ sưu tập vợt cầu lông Yonex mới nhất 2026",
    bgColor: "from-emerald-600 to-emerald-800",
    image: "🏸"
  },
  {
    id: 2,
    title: "Pickleball Collection",
    subtitle: "Xu hướng thể thao mới",
    description: "Trải nghiệm bộ môn Pickleball với trang thiết bị chất lượng",
    bgColor: "from-orange-500 to-orange-700",
    image: "🎾"
  },
  {
    id: 3,
    title: "Tennis Gear",
    subtitle: "Đẳng cấp sân tennis",
    description: "Vợt tennis, giày tennis từ các thương hiệu hàng đầu",
    bgColor: "from-emerald-500 to-teal-700",
    image: "🎾"
  },
]

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className={`h-full bg-gradient-to-r ${slide.bgColor}`}>
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
                  <div className="text-white space-y-4">
                    <p className="text-sm sm:text-base font-medium opacity-90">{slide.subtitle}</p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-balance">
                      {slide.title}
                    </h2>
                    <p className="text-base sm:text-lg opacity-90 max-w-md">
                      {slide.description}
                    </p>
                    <Button 
                      size="lg" 
                      className="bg-white text-foreground hover:bg-white/90 font-semibold"
                    >
                      Xem ngay
                    </Button>
                  </div>
                  <div className="hidden lg:flex justify-center items-center">
                    <span className="text-[150px]">{slide.image}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white h-10 w-10 rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white h-10 w-10 rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}
