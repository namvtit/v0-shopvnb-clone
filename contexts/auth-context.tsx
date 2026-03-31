"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface User {
  id: number
  name: string
  email: string
  phone?: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>
  logout: () => void
  showAuthModal: boolean
  setShowAuthModal: (show: boolean) => void
  authMode: "login" | "register"
  setAuthMode: (mode: "login" | "register") => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated) {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user))
      } else {
        localStorage.removeItem("user")
      }
    }
  }, [user, isHydrated])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, call API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (email && password.length >= 6) {
      const mockUser: User = {
        id: 1,
        name: email.split("@")[0],
        email: email,
        phone: "0123456789"
      }
      setUser(mockUser)
      setShowAuthModal(false)
      return true
    }
    return false
  }

  const register = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    // Mock register - in real app, call API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (name && email && password.length >= 6) {
      const mockUser: User = {
        id: Date.now(),
        name,
        email,
        phone
      }
      setUser(mockUser)
      setShowAuthModal(false)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      login,
      register,
      logout,
      showAuthModal,
      setShowAuthModal,
      authMode,
      setAuthMode
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
