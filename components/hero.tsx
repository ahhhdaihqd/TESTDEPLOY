"use client"

import { Button } from "@/components/ui/button"

interface HeroProps {
  onRequestPartnership: () => void
}

export default function Hero({ onRequestPartnership }: HeroProps) {
  return (
    <section id="home" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Stop Waiting. <span className="text-accent">Start Predicting.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance">
            The Philippines' first unified Big Data and AI platform transforming local Disaster Risk Reduction and
            Management (DRRM) from reactive response to predictive action.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onRequestPartnership}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg"
            >
              REQUEST PARTNERSHIP
            </Button>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg bg-transparent"
            >
              LEARN MORE
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
