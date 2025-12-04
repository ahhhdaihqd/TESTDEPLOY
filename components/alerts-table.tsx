"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, Clock, MapPin } from "lucide-react"

interface Alert {
  id: number
  type: string
  location: string
  time: string
  leadTime: string
  severity: string
}

interface AlertsTableProps {
  activeAlerts: Alert[]
}

export default function AlertsTable({ activeAlerts }: AlertsTableProps) {
  const expandedAlerts = [
    ...activeAlerts,
    {
      id: 4,
      type: "Heavy Rain",
      location: "Northern Zone",
      time: "11:00 AM",
      leadTime: "24 hours",
      severity: "medium",
    },
    { id: 5, type: "Storm Surge", location: "Coastal Areas", time: "9:30 AM", leadTime: "36 hours", severity: "high" },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
      case "high":
        return <AlertTriangle className="w-5 h-5" />
      case "medium":
        return <Clock className="w-5 h-5" />
      default:
        return <CheckCircle className="w-5 h-5" />
    }
  }

  return (
    <div className="space-y-6 flex-1 overflow-auto">
      {/* Active Alerts Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-background border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Total Active</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-accent">{expandedAlerts.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-background border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Critical</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-500">
              {expandedAlerts.filter((a) => a.severity === "critical").length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-background border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Avg Lead Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-400">18h</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Alerts List */}
      <Card className="bg-background border-border">
        <CardHeader>
          <CardTitle>All Active Alerts</CardTitle>
          <CardDescription>Comprehensive list of current warnings and recommended actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {expandedAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border-2 transition ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    {getSeverityIcon(alert.severity)}
                    <div className="flex-1">
                      <div className="font-bold text-lg mb-1">{alert.type}</div>
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{alert.location}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Issued: {alert.time}</span>
                        <span className="font-semibold">Lead Time: {alert.leadTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold capitalize ${getSeverityColor(alert.severity)}`}
                    >
                      {alert.severity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alert Statistics */}
      <Card className="bg-background border-border">
        <CardHeader>
          <CardTitle>Alert Statistics</CardTitle>
          <CardDescription>Performance metrics for the alert system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-card rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-2">False Alarm Rate</p>
              <p className="text-2xl font-bold text-accent">8.2%</p>
              <p className="text-xs text-green-400 mt-1">↓ 2.1% from last week</p>
            </div>
            <div className="p-4 bg-card rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-2">Avg Response Time</p>
              <p className="text-2xl font-bold text-accent">4.3m</p>
              <p className="text-xs text-green-400 mt-1">↓ 1.2m from average</p>
            </div>
            <div className="p-4 bg-card rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-2">Coverage Area</p>
              <p className="text-2xl font-bold text-accent">94.7%</p>
              <p className="text-xs text-green-400 mt-1">↑ 3.2% from last update</p>
            </div>
            <div className="p-4 bg-card rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-2">Alert Accuracy</p>
              <p className="text-2xl font-bold text-accent">91.8%</p>
              <p className="text-xs text-green-400 mt-1">↑ 2.5% from last month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
