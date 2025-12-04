"use client"

import { Button } from "@/components/ui/button"

interface HeaderProps {
  onLoginClick: () => void
}

export default function Header({ onLoginClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="font-bold text-lg">DRRM InsightHub</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-sm hover:text-accent transition">
            HOME
          </a>
          <a href="#features" className="text-sm hover:text-accent transition">
            FEATURES
          </a>
          <a href="#users" className="text-sm hover:text-accent transition">
            USERS
          </a>
          <a href="#technology" className="text-sm hover:text-accent transition">
            TECHNOLOGY
          </a>
          <a href="#contact" className="text-sm hover:text-accent transition">
            CONTACT
          </a>
        </nav>

        <Button onClick={onLoginClick} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          LOGIN
        </Button>
      </div>
    </header>
  )
}
