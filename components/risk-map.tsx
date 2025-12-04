"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

interface RiskMapProps {
  layers: {
    risk: boolean
    exposure: boolean
    vulnerability: boolean
  }
  barangays: Array<{
    id: string
    name: string
    riskScore: number
    floodDepth: number
    households: number
    lat: number
    lng: number
  }>
  selectedBarangay: string | null
  onSelectBarangay: (id: string) => void
}

export default function RiskMap({ layers, barangays, selectedBarangay, onSelectBarangay }: RiskMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)

  useEffect(() => {
    if (mapContainer.current && !map.current) {
      // Dynamically load Leaflet CSS
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      document.head.appendChild(link)

      // Dynamically load Leaflet JS
      const script = document.createElement("script")
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"
      script.onload = () => {
        const L = (window as any).L

        // Create map centered on Mindanao
        map.current = L.map(mapContainer.current).setView([8.2, 124.5], 9)

        // Add base layer (OpenStreetMap)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 19,
        }).addTo(map.current)

        // Add barangay markers
        barangays.forEach((barangay) => {
          const riskColor = barangay.riskScore >= 70 ? "#ef4444" : barangay.riskScore >= 50 ? "#eab308" : "#22c55e"

          const circle = L.circleMarker([barangay.lat, barangay.lng], {
            radius: 15,
            fillColor: riskColor,
            color: riskColor,
            weight: 2,
            opacity: 0.8,
            fillOpacity: 0.6,
          })

          circle.bindPopup(
            `<div style="font-size: 12px;">
              <b>${barangay.name}</b><br/>
              Risk: ${barangay.riskScore}%<br/>
              Flood: ${barangay.floodDepth}m<br/>
              Households: ${barangay.households}
            </div>`,
          )

          circle.on("click", () => {
            onSelectBarangay(barangay.id)
          })

          circle.addTo(map.current)
        })
      }
      document.body.appendChild(script)
    }
  }, [barangays, onSelectBarangay])

  return (
    <Card className="flex-1 bg-background border-border overflow-hidden">
      <div ref={mapContainer} className="h-full w-full" style={{ minHeight: "500px" }} />
    </Card>
  )
}
