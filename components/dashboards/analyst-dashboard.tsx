"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Activity, Download, AlertTriangle, BarChart3, Map } from "lucide-react"
import AnalyticsChart from "@/components/analytics-chart"
import AlertsTable from "@/components/alerts-table"
import RiskMap from "@/components/risk-map"

export default function AnalystDashboard() {
  const [activeTab, setActiveTab] = useState("map") // map, analytics, alerts
  const [layers, setLayers] = useState({
    risk: true,
    exposure: true,
    vulnerability: false,
  })
  const [selectedBarangay, setSelectedBarangay] = useState<string | null>(null)
  const [resourceLgu, setResourceLgu] = useState("Metro Manila")

  // Mock data for barangays with Mindanao coordinates
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

  // Mock alert data
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

  // Mock real-time data feeds
  const dataFeeds = [
    { name: "PAGASA Rainfall", value: "45.2mm", status: "live", lastUpdate: "2 min ago" },
    { name: "River Gauge (Marikina)", value: "3.8m", status: "live", lastUpdate: "1 min ago" },
    { name: "Seismic Activity", value: "Stable", status: "ok", lastUpdate: "5 min ago" },
  ]

  // Mock resource needs
  const resourceNeeds = {
    "Metro Manila": { foodPacks: 2500, rescueVehicles: 12, shelters: 8, medicalTeams: 5 },
    "Quezon City": { foodPacks: 1800, rescueVehicles: 8, shelters: 6, medicalTeams: 3 },
    Pasig: { foodPacks: 1200, rescueVehicles: 6, shelters: 4, medicalTeams: 2 },
  }

  const getRiskColor = (score: number) => {
    if (score >= 70) return "text-red-500"
    if (score >= 50) return "text-yellow-500"
    return "text-green-500"
  }

  const getRiskBgColor = (score: number) => {
    if (score >= 70) return "bg-red-500/20"
    if (score >= 50) return "bg-yellow-500/20"
    return "bg-green-500/20"
  }

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Geospatial Analysis Control Center</h2>
        <p className="text-sm text-muted-foreground">Real-time disaster prediction and resource optimization</p>
      </div>

      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab("map")}
          className={`flex items-center gap-2 px-4 py-2 font-medium text-sm transition ${
            activeTab === "map" ? "border-b-2 border-accent text-accent" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Map className="w-4 h-4" />
          Risk Map
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex items-center gap-2 px-4 py-2 font-medium text-sm transition ${
            activeTab === "analytics"
              ? "border-b-2 border-accent text-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Analytics
        </button>
        <button
          onClick={() => setActiveTab("alerts")}
          className={`flex items-center gap-2 px-4 py-2 font-medium text-sm transition ${
            activeTab === "alerts"
              ? "border-b-2 border-accent text-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          Alerts
        </button>
      </div>

      {/* TAB: Risk Map with Layer Controls */}
      {activeTab === "map" && (
        <div className="flex-1 flex flex-col gap-4 min-h-0">
          <Card className="bg-background border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Layer Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {[
                  { key: "risk", label: "Risk Prediction (48h)", desc: "Green/Yellow/Red overlay" },
                  { key: "exposure", label: "Exposure Layer", desc: "Critical infrastructure" },
                  { key: "vulnerability", label: "Vulnerability", desc: "Population density" },
                ].map((layer) => (
                  <button
                    key={layer.key}
                    onClick={() => setLayers({ ...layers, [layer.key]: !layers[layer.key] })}
                    className={`flex items-center gap-2 px-3 py-2 bg-card hover:bg-muted rounded-lg border-2 transition ${
                      layers[layer.key as keyof typeof layers] ? "border-accent bg-accent/10" : "border-border"
                    }`}
                  >
                    {layers[layer.key as keyof typeof layers] ? (
                      <Eye className="w-4 h-4 text-accent" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    )}
                    <div className="text-left">
                      <p className="text-xs font-medium">{layer.label}</p>
                      <p className="text-xs text-muted-foreground">{layer.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex-1 flex gap-4 min-h-0">
            <div className="flex-1 flex flex-col gap-4">
              <RiskMap
                layers={layers}
                barangays={barangays}
                selectedBarangay={selectedBarangay}
                onSelectBarangay={setSelectedBarangay}
              />
            </div>

            {/* Right Sidebar - 20% */}
            <div className="w-80 flex flex-col gap-4 overflow-auto">
              {/* Active Alerts */}
              <Card className="bg-background border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    Active Critical Warnings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 max-h-48 overflow-y-auto">
                  {activeAlerts.map((alert) => (
                    <div key={alert.id} className="p-2 bg-red-500/10 border border-red-500/30 rounded text-xs">
                      <div className="font-bold text-red-500">{alert.type}</div>
                      <div className="text-muted-foreground">{alert.location}</div>
                      <div className="flex justify-between text-muted-foreground mt-1">
                        <span>{alert.time}</span>
                        <span className="text-red-400">{alert.leadTime}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Detail Panel */}
              {selectedBarangay && (
                <Card className="bg-background border-accent">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Barangay Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    {barangays
                      .filter((b) => b.id === selectedBarangay)
                      .map((b) => (
                        <div key={b.id}>
                          <div className="font-bold mb-3">{b.name}</div>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Risk Score:</span>
                              <span className={`font-bold ${getRiskColor(b.riskScore)}`}>{b.riskScore}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Flood Depth:</span>
                              <span>{b.floodDepth} meters</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Affected HH:</span>
                              <span>{b.households} households</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              )}

              {/* Real-Time Data Feeds */}
              <Card className="bg-background border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Activity className="w-4 h-4 text-accent" />
                    Live Data Feeds
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {dataFeeds.map((feed, idx) => (
                    <div key={idx} className="p-2 bg-card rounded border border-border text-xs">
                      <p className="font-medium text-accent">{feed.name}</p>
                      <div className="flex justify-between mt-1">
                        <span className="text-muted-foreground">{feed.value}</span>
                        <span className={`${feed.status === "live" ? "text-green-400" : "text-blue-400"}`}>
                          {feed.lastUpdate}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Resource Management */}
              <Card className="bg-background border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Resource Needs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
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
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* TAB: Analytics Dashboard */}
      {activeTab === "analytics" && <AnalyticsChart />}

      {/* TAB: Alerts Dashboard */}
      {activeTab === "alerts" && <AlertsTable activeAlerts={activeAlerts} />}
    </div>
  )
}
