"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, LogOut, Home, ChevronLeft } from "lucide-react"

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

  const handleLogout = () => {
    sessionStorage.removeItem("userRole")
    sessionStorage.removeItem("userEmail")
    onLogout()
    router.push("/")
  }

  return (
    <div className="flex h-screen bg-background">
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out flex flex-col overflow-hidden z-40
        md:relative fixed md:w-64 md:translate-x-0 ${!sidebarOpen && "md:w-20"}
        max-md:${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between flex-shrink-0">
          {sidebarOpen && (
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-sidebar-accent rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="font-bold text-sm whitespace-nowrap">InsightHub</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-sidebar-foreground hover:text-sidebar-accent transition p-1 ml-auto flex-shrink-0"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Sidebar Content */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">{/* Navigation items are managed by the content */}</nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-sidebar-border space-y-2 flex-shrink-0">
          {sidebarOpen && (
            <div className="bg-sidebar-accent/10 rounded-lg p-2">
              <p className="text-xs text-sidebar-foreground font-semibold mb-1">Current Role</p>
              <p className="text-xs text-sidebar-accent truncate">{getRoleLabel()}</p>
            </div>
          )}
          <Button
            variant="ghost"
            className="w-full h-9 text-sidebar-foreground hover:bg-sidebar-accent/20 hover:text-sidebar-accent justify-start"
            size="sm"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="ml-2">Logout</span>}
          </Button>
          <Button
            variant="ghost"
            className="w-full h-9 text-sidebar-foreground hover:bg-sidebar-accent/20 hover:text-sidebar-accent justify-start"
            size="sm"
            onClick={() => router.push("/")}
          >
            <Home className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="ml-2">Home</span>}
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Top Bar - Responsive */}
        <header className="bg-card border-b border-border px-4 md:px-6 py-3 md:py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-lg md:text-2xl font-bold truncate">DRRM InsightHub</h1>
          </div>
          <div className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
            {new Date().toLocaleTimeString()}
          </div>
        </header>

        {/* Main Content - Responsive */}
        <main className="flex-1 overflow-auto p-3 md:p-6 w-full">{children}</main>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
