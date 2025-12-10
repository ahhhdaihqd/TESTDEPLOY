"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Activity, Download, AlertTriangle, BarChart3, Map } from "lucide-react"
import AnalyticsChart from "@/components/analytics-chart"
import AlertsTable from "@/components/alerts-table"
import RiskMap from "@/components/risk-map"

export default function AnalystDashboard() {
  const [activeTab, setActiveTab] = useState("map")
  const [layers, setLayers] = useState({
    risk: true,
    exposure: true,
    vulnerability: false,
    evacuation: true,
  })
  const [selectedBarangay, setSelectedBarangay] = useState<string | null>(null)
  const [resourceLgu, setResourceLgu] = useState("Metro Manila")

  const barangays = [
    { id: "bg-001", name: "Brgy. Libis", riskScore: 78, floodDepth: 1.5, households: 324, lat: 8.2, lng: 124.5 },
    {
      id: "bg-002",
      name: "Brgy. Bagong Ilog",
      riskScore: 62,
      floodDepth: 0.8,
      households: 198,
      lat: 8.1,
      lng: 124.6,
    },
    { id: "bg-003", name: "Brgy. Ugong", riskScore: 85, floodDepth: 2.1, households: 456, lat: 8.3, lng: 124.4 },
    {
      id: "bg-004",
      name: "Brgy. Marikina Heights",
      riskScore: 45,
      floodDepth: 0.3,
      households: 287,
      lat: 8.15,
      lng: 124.55,
    },
  ]

  const activeAlerts = [
    { id: 1, type: "Flood", location: "Brgy. Ugong", time: "2:45 PM", leadTime: "12 hours", severity: "critical" },
    {
      id: 2,
      type: "Landslide",
      location: "Brgy. Marikina Heights",
      time: "1:30 PM",
      leadTime: "18 hours",
      severity: "high",
    },
    {
      id: 3,
      type: "Flash Flood",
      location: "Brgy. Libis",
      time: "12:15 PM",
      leadTime: "6 hours",
      severity: "critical",
    },
  ]

  const dataFeeds = [
    { name: "PAGASA Rainfall", value: "45.2mm", status: "live", lastUpdate: "2 min ago" },
    { name: "River Gauge (Marikina)", value: "3.8m", status: "live", lastUpdate: "1 min ago" },
    { name: "Seismic Activity", value: "Stable", status: "ok", lastUpdate: "5 min ago" },
  ]

  const resourceNeeds = {
    "Metro Manila": {
      foodPacks: 2500,
      rescueVehicles: 12,
      shelters: 8,
      medicalTeams: 5,
      evacuated: 1850,
    },
    "Quezon City": {
      foodPacks: 1800,
      rescueVehicles: 8,
      shelters: 6,
      medicalTeams: 3,
      evacuated: 1200,
    },
    Pasig: { foodPacks: 1200, rescueVehicles: 6, shelters: 4, medicalTeams: 2, evacuated: 650 },
  }

  const getRiskColor = (score: number) => {
    if (score >= 70) return "text-red-500"
    if (score >= 50) return "text-yellow-500"
    return "text-green-500"
  }

  return (
    <div className="space-y-3 md:space-y-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0">
        <h2 className="text-lg md:text-2xl font-bold">Geospatial Analysis Control Center</h2>
        <p className="text-xs md:text-sm text-muted-foreground">
          Real-time disaster prediction and resource optimization
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 md:gap-2 border-b border-border overflow-x-auto flex-shrink-0">
        {[
          { id: "map", label: "Risk Map", icon: Map },
          { id: "analytics", label: "Analytics", icon: BarChart3 },
          { id: "alerts", label: "Alerts", icon: AlertTriangle },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 font-medium text-xs md:text-sm transition whitespace-nowrap ${
              activeTab === id ? "border-b-2 border-accent text-accent" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* TAB: Risk Map */}
      {activeTab === "map" && (
        <div className="flex-1 flex flex-col gap-3 md:gap-4 min-h-0 overflow-hidden">
          {/* Layer Controls */}
          <Card className="bg-background border-border flex-shrink-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Layer Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { key: "risk", label: "Risk", desc: "Prediction" },
                  { key: "exposure", label: "Exposure", desc: "Infrastructure" },
                  { key: "vulnerability", label: "Vulnerability", desc: "Population" },
                  { key: "evacuation", label: "Evacuation", desc: "Points" },
                ].map((layer) => (
                  <button
                    key={layer.key}
                    onClick={() => setLayers({ ...layers, [layer.key]: !layers[layer.key] })}
                    className={`flex flex-col items-center gap-1 px-2 py-2 rounded border-2 transition text-center text-xs ${
                      layers[layer.key as keyof typeof layers]
                        ? "border-accent bg-accent/10"
                        : "border-border bg-card hover:bg-muted"
                    }`}
                  >
                    {layers[layer.key as keyof typeof layers] ? (
                      <Eye className="w-4 h-4 text-accent" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    )}
                    <p className="font-medium">{layer.label}</p>
                    <p className="text-xs text-muted-foreground">{layer.desc}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Map and Sidebar */}
          <div className="flex-1 flex flex-col lg:flex-row gap-3 md:gap-4 min-h-0 overflow-hidden">
            {/* Map */}
            <div className="flex-1 min-h-0 rounded-lg overflow-hidden">
              <RiskMap
                layers={layers}
                barangays={barangays}
                selectedBarangay={selectedBarangay}
                onSelectBarangay={setSelectedBarangay}
              />
            </div>

            {/* Right Sidebar */}
            <div className="w-full lg:w-96 flex flex-col gap-3 overflow-y-auto max-h-96 lg:max-h-none pb-2">
              {/* Active Alerts */}
              <Card className="bg-background border-border flex-shrink-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs md:text-sm flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    Critical Warnings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {activeAlerts.slice(0, 2).map((alert) => (
                    <div key={alert.id} className="p-2 bg-red-500/10 border border-red-500/30 rounded text-xs">
                      <div className="font-bold text-red-500">{alert.type}</div>
                      <div className="text-muted-foreground text-xs">{alert.location}</div>
                      <div className="flex justify-between text-muted-foreground mt-1 text-xs">
                        <span>{alert.time}</span>
                        <span className="text-red-400">{alert.leadTime}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Detail Panel */}
              {selectedBarangay && (
                <Card className="bg-background border-accent flex-shrink-0">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs md:text-sm">Barangay Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs">
                    {barangays
                      .filter((b) => b.id === selectedBarangay)
                      .map((b) => (
                        <div key={b.id}>
                          <div className="font-bold mb-2">{b.name}</div>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Risk Score:</span>
                              <span className={`font-bold ${getRiskColor(b.riskScore)}`}>{b.riskScore}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Flood Depth:</span>
                              <span>{b.floodDepth}m</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Affected HH:</span>
                              <span>{b.households}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              )}

              {/* Live Data Feeds */}
              <Card className="bg-background border-border flex-shrink-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs md:text-sm flex items-center gap-2">
                    <Activity className="w-4 h-4 text-accent" />
                    Live Feeds
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {dataFeeds.map((feed, idx) => (
                    <div key={idx} className="p-2 bg-card rounded border border-border text-xs">
                      <p className="font-medium text-accent">{feed.name}</p>
                      <div className="flex justify-between mt-1">
                        <span className="text-muted-foreground">{feed.value}</span>
                        <span className="text-green-400">{feed.lastUpdate}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Resource Management */}
              <Card className="bg-background border-border flex-shrink-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs md:text-sm">Resource Needs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <select
                    value={resourceLgu}
                    onChange={(e) => setResourceLgu(e.target.value)}
                    className="w-full px-2 py-1 bg-card border border-border rounded text-xs"
                  >
                    {Object.keys(resourceNeeds).map((lgu) => (
                      <option key={lgu} value={lgu}>
                        {lgu}
                      </option>
                    ))}
                  </select>
                  <div className="space-y-1 text-xs">
                    {Object.entries(resourceNeeds[resourceLgu as keyof typeof resourceNeeds]).map(([key, value]) => (
                      <div key={key} className="flex justify-between p-1 bg-card rounded">
                        <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                        <span className="font-bold text-accent">{value}</span>
                      </div>
                    ))}
                  </div>
                  <Button size="sm" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-xs h-8">
                    <Download className="w-3 h-3 mr-1" />
                    Export
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* TAB: Analytics */}
      {activeTab === "analytics" && <AnalyticsChart />}

      {/* TAB: Alerts */}
      {activeTab === "alerts" && <AlertsTable activeAlerts={activeAlerts} />}
    </div>
  )
}
