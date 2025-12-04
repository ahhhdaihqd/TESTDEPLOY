import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, MapPin, TrendingUp } from "lucide-react"

export default function ExecutiveDashboard() {
  const stats = [
    { icon: MapPin, label: "High Risk Areas", value: "12", color: "text-red-400" },
    { icon: Users, label: "Vulnerable Population", value: "54.2K", color: "text-yellow-400" },
    { icon: TrendingUp, label: "Alert Threshold Met", value: "8", color: "text-orange-400" },
    { icon: BarChart3, label: "Resource Allocated", value: "89%", color: "text-green-400" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Executive Overview</h2>
        <p className="text-muted-foreground">High-level insights for LGU leadership decision-making</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="bg-background border-border">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Resource Allocation */}
        <Card className="md:col-span-2 bg-background border-border">
          <CardHeader>
            <CardTitle>Resource Pre-Positioning Strategy</CardTitle>
            <CardDescription>Recommended allocation across LGU areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { area: "Flood-Prone Districts", allocation: "40%", status: "Active" },
                { area: "Landslide Zones", allocation: "35%", status: "Active" },
                { area: "Storm Surge Areas", allocation: "25%", status: "Standby" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-card rounded-lg border border-border"
                >
                  <div>
                    <p className="font-medium">{item.area}</p>
                    <p className="text-sm text-muted-foreground">{item.allocation} of resources</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      item.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Critical Alerts */}
        <Card className="bg-background border-border">
          <CardHeader>
            <CardTitle>Critical Alerts</CardTitle>
            <CardDescription>Requiring immediate action</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: "Flood Risk", level: "Critical", color: "bg-red-500/20 text-red-400" },
                { title: "Storm Warning", level: "High", color: "bg-orange-500/20 text-orange-400" },
              ].map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg ${alert.color} border border-current/20`}>
                  <p className="font-medium text-sm">{alert.title}</p>
                  <p className="text-xs mt-1">Level: {alert.level}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
