import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Map, AlertCircle, BarChart3 } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Activity,
      title: "Multi-Hazard Predictive Modeling",
      description:
        "Our AI/ML engine continuously generates specific, quantifiable risks like Flood Risk Index and Landslide Probability for specific local areas.",
    },
    {
      icon: Map,
      title: "Real-Time Geospatial Visualization",
      description:
        "Access a dynamic, color-coded map dashboard that layers predicted risk with critical infrastructure and vulnerable population data.",
    },
    {
      icon: AlertCircle,
      title: "Automated, Targeted Alerting",
      description:
        "Immediate, threshold-based warnings sent directly to DRRMOs and Barangay Officials via app/SMS when dangerous risk levels are detected.",
    },
    {
      icon: BarChart3,
      title: "Resource Optimization Reports",
      description:
        "Calculate expected impact to advise LGU Executives precisely where and how to pre-position resources before a disaster.",
    },
  ]

  return (
    <section id="features" className="py-20 md:py-32 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transforming DRRM with advanced analytics and predictive capabilities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="bg-background border-border hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
