"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Lock } from "lucide-react"

interface LoginModalProps {
  onClose: () => void
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"executive" | "analyst" | "official">("analyst")
  const [isLoading, setIsLoading] = useState(false)

  const sampleCredentials = {
    executive: { email: "mayor@example.com", password: "demo123" },
    analyst: { email: "analyst@example.com", password: "demo123" },
    official: { email: "barangay@example.com", password: "demo123" },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const validCreds = sampleCredentials[role]
    if (email === validCreds.email && password === validCreds.password) {
      // Store user session
      sessionStorage.setItem("userRole", role)
      sessionStorage.setItem("userEmail", email)

      // Redirect to dashboard after brief delay
      setTimeout(() => {
        router.push(`/dashboard?role=${role}`)
      }, 500)
    } else {
      alert(`Demo credentials for ${role}:\nEmail: ${validCreds.email}\nPassword: ${validCreds.password}`)
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-accent" />
              Secure Access
            </CardTitle>
            <CardDescription>Authorized DRRM personnel only</CardDescription>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition">
            <X className="w-5 h-5" />
          </button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="role">User Role</Label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as "executive" | "analyst" | "official")}
                className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
              >
                <option value="executive">LGU Executive (Mayor/Governor)</option>
                <option value="analyst">DRRM Analyst/Officer</option>
                <option value="official">Barangay Official</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Username / Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-border"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background border-border"
                required
              />
            </div>

            <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded">
              Demo Credentials: analyst@example.com / demo123 (or use role-specific emails: mayor@example.com,
              barangay@example.com)
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {isLoading ? "Authenticating..." : "Sign In"}
            </Button>

            <Button type="button" variant="outline" onClick={onClose} className="w-full bg-transparent">
              Cancel
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
