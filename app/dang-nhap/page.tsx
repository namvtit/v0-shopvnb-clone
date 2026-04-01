"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

type Tab = "login" | "register"

export default function DangNhapPage() {
  const [tab, setTab] = useState<Tab>("login")

  // Login state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [showLoginPw, setShowLoginPw] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)

  // Register state
  const [regName, setRegName] = useState("")
  const [regPhone, setRegPhone] = useState("")
  const [regEmail, setRegEmail] = useState("")
  const [regPassword, setRegPassword] = useState("")
  const [regConfirm, setRegConfirm] = useState("")
  const [showRegPw, setShowRegPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [regLoading, setRegLoading] = useState(false)
  const [regDone, setRegDone] = useState(false)

  // Forgot password state
  const [forgotMode, setForgotMode] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")
  const [forgotSent, setForgotSent] = useState(false)

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!loginEmail || !loginPassword) {
      toast.error("Vui lòng nhập đầy đủ thông tin")
      return
    }
    setLoginLoading(true)
    setTimeout(() => {
      setLoginLoading(false)
      toast.success("Đăng nhập thành công! Chào mừng bạn trở lại.")
      window.location.href = "/"
    }, 1200)
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (!regName || !regPhone || !regEmail || !regPassword || !regConfirm) {
      toast.error("Vui lòng nhập đầy đủ thông tin")
      return
    }
    if (regPassword !== regConfirm) {
      toast.error("Mật khẩu xác nhận không khớp")
      return
    }
    if (regPassword.length < 6) {
      toast.error("Mật khẩu phải ít nhất 6 ký tự")
      return
    }
    setRegLoading(true)
    setTimeout(() => {
      setRegLoading(false)
      setRegDone(true)
    }, 1400)
  }

  function handleForgot(e: React.FormEvent) {
    e.preventDefault()
    if (!forgotEmail) {
      toast.error("Vui lòng nhập email")
      return
    }
    setTimeout(() => setForgotSent(true), 800)
  }

  const benefits = [
    "Tích điểm và nhận ưu đãi độc quyền",
    "Xem lịch sử đơn hàng dễ dàng",
    "Lưu địa chỉ giao hàng tiện lợi",
    "Nhận thông báo sale sớm nhất",
  ]

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl bg-card rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

        {/* Left panel */}
        <div className="md:w-5/12 bg-primary text-primary-foreground flex flex-col justify-between p-8 md:p-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-10">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">HT</span>
              </div>
              <div>
                <span className="text-xl font-bold">HTQB</span>
                <span className="text-xl font-bold opacity-80">_SHOP</span>
              </div>
            </Link>

            <h2 className="text-3xl font-bold leading-tight text-balance mb-4">
              {tab === "login" ? "Chào mừng bạn trở lại!" : "Tạo tài khoản ngay!"}
            </h2>
            <p className="opacity-80 leading-relaxed mb-8">
              {tab === "login"
                ? "Đăng nhập để mua sắm dễ dàng, theo dõi đơn hàng và nhận ưu đãi độc quyền từ HTQB_SHOP."
                : "Đăng ký miễn phí để tận hưởng đầy đủ tiện ích mua sắm tại HTQB_SHOP."}
            </p>

            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 opacity-90 flex-shrink-0" />
                  <span className="opacity-90">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 hidden md:block">
            <p className="text-sm opacity-70">
              &copy; {new Date().getFullYear()} HTQB_SHOP. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right panel */}
        <div className="md:w-7/12 flex flex-col justify-center p-8 md:p-12">

          {/* Tab switcher */}
          {!forgotMode && !regDone && (
            <div className="flex bg-muted rounded-xl p-1 mb-8">
              <button
                onClick={() => setTab("login")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === "login" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                Đăng nhập
              </button>
              <button
                onClick={() => setTab("register")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === "register" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                Đăng ký
              </button>
            </div>
          )}

          {/* --- FORGOT PASSWORD --- */}
          {forgotMode && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              {forgotSent ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Kiểm tra email của bạn</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    Chúng tôi đã gửi liên kết đặt lại mật khẩu tới <strong>{forgotEmail}</strong>. Vui lòng kiểm tra hộp thư đến.
                  </p>
                  <Button variant="outline" onClick={() => { setForgotMode(false); setForgotSent(false); setForgotEmail("") }} className="w-full">
                    Quay lại đăng nhập
                  </Button>
                </div>
              ) : (
                <>
                  <button onClick={() => setForgotMode(false)} className="text-sm text-muted-foreground hover:text-foreground mb-6 flex items-center gap-1">
                    &larr; Quay lại
                  </button>
                  <h3 className="text-2xl font-bold mb-2">Quên mật khẩu?</h3>
                  <p className="text-muted-foreground text-sm mb-6">Nhập email đăng ký, chúng tôi sẽ gửi liên kết đặt lại mật khẩu.</p>
                  <form onSubmit={handleForgot} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="forgot-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="forgot-email" type="email" placeholder="example@email.com" className="pl-10"
                          value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">Gửi liên kết đặt lại</Button>
                  </form>
                </>
              )}
            </div>
          )}

          {/* --- REGISTER DONE --- */}
          {!forgotMode && regDone && (
            <div className="text-center py-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Đăng ký thành công!</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Chào mừng <strong>{regName}</strong> đến với HTQB_SHOP. Tài khoản của bạn đã được tạo thành công.
              </p>
              <Button
                className="w-full"
                onClick={() => { setTab("login"); setRegDone(false); setLoginEmail(regEmail) }}
              >
                Đăng nhập ngay <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* --- LOGIN FORM --- */}
          {!forgotMode && !regDone && tab === "login" && (
            <form onSubmit={handleLogin} className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1.5">
                <Label htmlFor="login-email">Email hoặc số điện thoại</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="text"
                    placeholder="example@email.com"
                    className="pl-10"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-password">Mật khẩu</Label>
                  <button
                    type="button"
                    onClick={() => setForgotMode(true)}
                    className="text-xs text-primary hover:underline"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type={showLoginPw ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    className="pl-10 pr-10"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPw(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showLoginPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loginLoading}>
                {loginLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                    Đang đăng nhập...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Đăng nhập <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>

              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
                  hoặc đăng nhập với
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => toast.info("Tính năng đang phát triển")}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => toast.info("Tính năng đang phát triển")}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#1877F2] fill-current" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </Button>
              </div>
            </form>
          )}

          {/* --- REGISTER FORM --- */}
          {!forgotMode && !regDone && tab === "register" && (
            <form onSubmit={handleRegister} className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="reg-name">Họ và tên</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="reg-name" placeholder="Nguyễn Văn A" className="pl-10"
                      value={regName} onChange={e => setRegName(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="reg-phone">Số điện thoại</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="reg-phone" type="tel" placeholder="0901 234 567" className="pl-10"
                      value={regPhone} onChange={e => setRegPhone(e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="reg-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="reg-email" type="email" placeholder="example@email.com" className="pl-10"
                    value={regEmail} onChange={e => setRegEmail(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="reg-password">Mật khẩu</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="reg-password" type={showRegPw ? "text" : "password"} placeholder="Tối thiểu 6 ký tự" className="pl-10 pr-10"
                      value={regPassword} onChange={e => setRegPassword(e.target.value)} />
                    <button type="button" onClick={() => setShowRegPw(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showRegPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="reg-confirm">Xác nhận mật khẩu</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="reg-confirm" type={showConfirm ? "text" : "password"} placeholder="Nhập lại mật khẩu" className="pl-10 pr-10"
                      value={regConfirm} onChange={e => setRegConfirm(e.target.value)} />
                    <button type="button" onClick={() => setShowConfirm(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Password strength indicator */}
              {regPassword.length > 0 && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${
                        regPassword.length >= i * 3
                          ? i <= 1 ? "bg-destructive" : i <= 2 ? "bg-secondary" : i <= 3 ? "bg-yellow-500" : "bg-primary"
                          : "bg-muted"
                      }`} />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {regPassword.length < 4 ? "Quá yếu" : regPassword.length < 7 ? "Trung bình" : regPassword.length < 10 ? "Khá mạnh" : "Mạnh"}
                  </p>
                </div>
              )}

              <p className="text-xs text-muted-foreground leading-relaxed">
                Bằng cách đăng ký, bạn đồng ý với{" "}
                <Link href="#" className="text-primary hover:underline">Điều khoản dịch vụ</Link>{" "}
                và{" "}
                <Link href="#" className="text-primary hover:underline">Chính sách bảo mật</Link>{" "}
                của HTQB_SHOP.
              </p>

              <Button type="submit" className="w-full" disabled={regLoading}>
                {regLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                    Đang tạo tài khoản...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Tạo tài khoản <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
