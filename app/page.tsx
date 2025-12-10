"use client"

import { useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Features from "@/components/features"
import TechnologyFlow from "@/components/technology-flow"
import Contact from "@/components/contact"
import LoginModal from "@/components/login-modal"

export default function Home() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header onLoginClick={() => setShowLogin(true)} />
      <main>
        <Hero onRequestPartnership={() => setShowLogin(true)} />
        <Features />
        <TechnologyFlow />
        <Contact />
      </main>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  )
}
