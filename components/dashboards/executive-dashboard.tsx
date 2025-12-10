import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MapPin, TrendingUp, AlertCircle, Zap } from "lucide-react"

export default function ExecutiveDashboard() {
  const stats = [
    { icon: MapPin, label: "High Risk Areas", value: "12", color: "text-red-400" },
    { icon: Users, label: "Vulnerable Pop.", value: "54.2K", color: "text-yellow-400" },
    { icon: AlertCircle, label: "Active Alerts", value: "8", color: "text-orange-400" },
    { icon: TrendingUp, label: "Resource Allocated", value: "89%", color: "text-green-400" },
  ]

  const evacuationStats = [
    { label: "Total Evacuated", value: "3,700", subtext: "from high-risk areas" },
    { label: "Shelter Capacity", value: "2,150/2,600", subtext: "82.7% occupied" },
    { label: "Medical Personnel", value: "10/12", subtext: "on standby" },
    { label: "Response Time Avg", value: "8 min", subtext: "to alert issuance" },
  ]

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">Executive Overview</h2>
        <p className="text-xs md:text-sm text-muted-foreground">
          High-level insights for LGU leadership decision-making
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="bg-background border-border">
              <CardHeader className="pb-2 md:pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                  <Icon className={`w-4 h-4 md:w-5 md:h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xl md:text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        {/* Resource Pre-Positioning */}
        <Card className="md:col-span-2 bg-background border-border">
          <CardHeader className="pb-2 md:pb-3">
            <CardTitle className="text-sm md:text-base">Resource Pre-Positioning Strategy</CardTitle>
            <CardDescription className="text-xs">Allocation across LGU areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 md:space-y-3">
              {[
                { area: "Flood-Prone Districts", allocation: "40%", status: "Active" },
                { area: "Landslide Zones", allocation: "35%", status: "Active" },
                { area: "Storm Surge Areas", allocation: "25%", status: "Standby" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 md:p-3 bg-card rounded-lg border border-border"
                >
                  <div>
                    <p className="text-sm md:text-base font-medium">{item.area}</p>
                    <p className="text-xs text-muted-foreground">{item.allocation} of resources</p>
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
          <CardHeader className="pb-2 md:pb-3">
            <CardTitle className="text-sm md:text-base">Critical Alerts</CardTitle>
            <CardDescription className="text-xs">Immediate action required</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { title: "Flood Risk", level: "Critical", color: "bg-red-500/20 text-red-400" },
                { title: "Storm Warning", level: "High", color: "bg-orange-500/20 text-orange-400" },
              ].map((alert, index) => (
                <div key={index} className={`p-2 md:p-3 rounded-lg ${alert.color} border border-current/20`}>
                  <p className="font-medium text-xs md:text-sm">{alert.title}</p>
                  <p className="text-xs mt-1">Level: {alert.level}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-background border-border">
        <CardHeader className="pb-2 md:pb-3">
          <CardTitle className="text-sm md:text-base flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
            Evacuation Status
          </CardTitle>
          <CardDescription className="text-xs">Real-time evacuation and shelter management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {evacuationStats.map((stat, index) => (
              <div key={index} className="p-3 md:p-4 bg-card rounded-lg border border-border">
                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-lg md:text-2xl font-bold text-accent">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.subtext}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
