import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, MapPin, Clock, Users } from "lucide-react"

export default function OfficialDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Barangay Risk Overview</h2>
        <p className="text-muted-foreground">Your barangay's current risk status and recommended actions</p>
      </div>

      {/* Current Risk Status */}
      <Card className="bg-background border-border border-2 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
            Current Risk Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4">
            <div>
              <p className="text-5xl font-bold text-yellow-400">MEDIUM</p>
              <p className="text-muted-foreground mt-2">Elevated risk conditions detected</p>
            </div>
            <div className="flex-1 text-right">
              <p className="text-sm text-muted-foreground mb-2">Risk Score: 0.62/1.00</p>
              <div className="w-full bg-card rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full" style={{ width: "62%" }} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { icon: Users, label: "Population at Risk", value: "3,240", color: "text-red-400" },
          { icon: MapPin, label: "High-Risk Zones", value: "2", color: "text-orange-400" },
          { icon: Clock, label: "Lead Time", value: "18 hours", color: "text-blue-400" },
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="bg-background border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Alerts & Recommendations */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-background border-border">
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
            <CardDescription>Warnings for your barangay</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { type: "Flood Risk", severity: "High", zone: "Barangay Center" },
              { type: "Strong Winds", severity: "Medium", zone: "Coastal Areas" },
            ].map((alert, index) => (
              <div key={index} className="p-3 bg-card rounded-lg border border-border">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">{alert.type}</p>
                    <p className="text-xs text-muted-foreground">{alert.zone}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      alert.severity === "High" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {alert.severity}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-background border-border">
          <CardHeader>
            <CardTitle>Recommended Actions</CardTitle>
            <CardDescription>Steps to prepare your community</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                "Activate evacuation centers",
                "Alert barangay officials and residents",
                "Pre-position relief goods in safe areas",
                "Prepare emergency response teams",
                "Monitor water levels and weather updates",
              ].map((action, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-accent font-bold flex-shrink-0">{index + 1}.</span>
                  <span className="text-sm">{action}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
