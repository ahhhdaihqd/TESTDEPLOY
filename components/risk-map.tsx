"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"

interface EvacuationPoint {
  id: string
  name: string
  type: "shelter" | "medical" | "command"
  capacity: number
  current: number
  lat: number
  lng: number
}

interface RiskMapProps {
  layers: {
    risk: boolean
    exposure: boolean
    vulnerability: boolean
    evacuation: boolean
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
  const markers = useRef<any[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)

  const evacuationPoints: EvacuationPoint[] = [
    {
      id: "ep-001",
      name: "Rizal School Gymnasium",
      type: "shelter",
      capacity: 500,
      current: 150,
      lat: 8.25,
      lng: 124.5,
    },
    { id: "ep-002", name: "Barangay Health Center", type: "medical", capacity: 100, current: 25, lat: 8.2, lng: 124.6 },
    { id: "ep-003", name: "DRRM Command Post", type: "command", capacity: 50, current: 20, lat: 8.15, lng: 124.55 },
    {
      id: "ep-004",
      name: "Marikina Covered Court",
      type: "shelter",
      capacity: 800,
      current: 200,
      lat: 8.3,
      lng: 124.4,
    },
  ]

  useEffect(() => {
    if (mapContainer.current && !map.current) {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      document.head.appendChild(link)

      const script = document.createElement("script")
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"
      script.onload = () => {
        const L = (window as any).L

        // Create map centered on Mindanao, Philippines
        map.current = L.map(mapContainer.current).setView([8.5, 124.8], 8)

        // Add base layer (OpenStreetMap)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 19,
        }).addTo(map.current)

        // Add barangay markers
        barangays.forEach((barangay) => {
          const riskColor = barangay.riskScore >= 70 ? "#ef4444" : barangay.riskScore >= 50 ? "#eab308" : "#22c55e"

          const circle = L.circleMarker([barangay.lat, barangay.lng], {
            radius: 12,
            fillColor: riskColor,
            color: riskColor,
            weight: 2,
            opacity: 0.9,
            fillOpacity: 0.7,
          })

          circle.bindPopup(
            `<div style="font-size: 12px; font-family: sans-serif;">
              <b>${barangay.name}</b><br/>
              Risk: ${barangay.riskScore}%<br/>
              Flood: ${barangay.floodDepth}m<br/>
              Households: ${barangay.households}
            </div>`,
          )

          circle.on("click", () => {
            onSelectBarangay(barangay.id)
            map.current.setView([barangay.lat, barangay.lng], 10)
          })

          circle.addTo(map.current)
          markers.current.push(circle)
        })

        if (layers.evacuation) {
          evacuationPoints.forEach((point) => {
            const iconColor = point.type === "shelter" ? "#3b82f6" : point.type === "medical" ? "#ec4899" : "#8b5cf6"
            const occupancyPercentage = (point.current / point.capacity) * 100

            const circle = L.circleMarker([point.lat, point.lng], {
              radius: 10,
              fillColor: iconColor,
              color: "#ffffff",
              weight: 2,
              opacity: 1,
              fillOpacity: 0.8,
            })

            circle.bindPopup(
              `<div style="font-size: 12px; font-family: sans-serif;">
                <b>${point.name}</b><br/>
                Type: ${point.type.charAt(0).toUpperCase() + point.type.slice(1)}<br/>
                Capacity: ${point.current}/${point.capacity}<br/>
                Occupancy: ${occupancyPercentage.toFixed(1)}%
              </div>`,
            )

            circle.addTo(map.current)
            markers.current.push(circle)
          })
        }

        // Highlight selected barangay
        if (selectedBarangay) {
          const selected = barangays.find((b) => b.id === selectedBarangay)
          if (selected) {
            map.current.setView([selected.lat, selected.lng], 10)
          }
        }

        setMapLoaded(true)
      }
      document.body.appendChild(script)
    }

    // Clear evacuation markers when layer is toggled
    if (mapLoaded && map.current) {
      if (!layers.evacuation) {
        markers.current.forEach((marker) => {
          map.current.removeLayer(marker)
        })
        markers.current = []
      }
    }
  }, [barangays, onSelectBarangay, selectedBarangay, layers, mapLoaded])

  return (
    <Card className="flex-1 bg-background border-border overflow-hidden h-full">
      <div ref={mapContainer} className="h-full w-full" style={{ minHeight: "400px" }} />
    </Card>
  )
}
