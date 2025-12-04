"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut, MapPin, BarChart3, AlertCircle, Home } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: "executive" | "analyst" | "official"
  onLogout: () => void
}

export default function DashboardLayout({ children, userRole, onLogout }: DashboardLayoutProps) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const getRoleLabel = () => {
    switch (userRole) {
      case "executive":
        return "LGU Executive"
      case "analyst":
        return "DRRM Analyst"
      case "official":
        return "Barangay Official"
      default:
        return "User"
    }
  }

  const menuItems = [
    { icon: MapPin, label: "Risk Map", href: "#map" },
    { icon: BarChart3, label: "Analytics", href: "#analytics" },
    { icon: AlertCircle, label: "Alerts", href: "#alerts" },
  ]

  const handleLogout = () => {
    sessionStorage.removeItem("userRole")
    sessionStorage.removeItem("userEmail")
    router.push("/")
    onLogout()
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          {sidebarOpen && (
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sidebar-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="font-bold text-sm">InsightHub</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-sidebar-foreground hover:text-sidebar-accent transition"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm">{item.label}</span>}
              </a>
            )
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border space-y-3">
          <div>
            {sidebarOpen && (
              <div className="bg-sidebar-accent/10 rounded-lg p-3 mb-4">
                <p className="text-xs text-sidebar-foreground font-semibold mb-1">Role</p>
                <p className="text-xs text-sidebar-accent">{getRoleLabel()}</p>
              </div>
            )}
          </div>
          <Button
            variant="outline"
            className="w-full border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/10 bg-transparent"
            size="sm"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && "Logout"}
          </Button>
          <Button
            variant="outline"
            className="w-full border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/10 bg-transparent"
            size="sm"
            onClick={() => router.push("/")}
          >
            <Home className="w-4 h-4" />
            {sidebarOpen && "Back to Home"}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">DRRM InsightHub</h1>
          <div className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleTimeString()}</div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-hidden p-6">{children}</main>
      </div>
    </div>
  )
}
