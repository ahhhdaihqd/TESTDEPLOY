"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import AnalystDashboard from "@/components/dashboards/analyst-dashboard"

type UserRole = "executive" | "analyst" | "official"

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const roleParam = searchParams.get("role") as UserRole | null
  const [userRole, setUserRole] = useState<UserRole>("analyst")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const storedRole = sessionStorage.getItem("userRole") as UserRole | null
    if (storedRole || roleParam) {
      setUserRole(storedRole || roleParam || "analyst")
      setIsLoggedIn(true)
    }
  }, [roleParam])

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Please log in to access the dashboard</p>
        </div>
      </div>
    )
  }

  return (
    <DashboardLayout userRole={userRole} onLogout={() => setIsLoggedIn(false)}>
      <AnalystDashboard />
    </DashboardLayout>
  )
}
