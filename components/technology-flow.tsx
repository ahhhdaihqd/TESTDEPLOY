import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export default function TechnologyFlow() {
  const steps = [
    {
      title: "Input",
      description: "Real-Time Feeds (PAGASA, Sensors) & Static Data (Census, GIS)",
    },
    {
      title: "Process",
      description: "AI/ML Fusion and Predictive Scoring",
    },
    {
      title: "Output",
      description: "Actionable Risk Scores and Automated Alerts",
    },
    {
      title: "Feedback Loop",
      description: "Post-Event Data Trains & Improves ML Model",
    },
  ]

  return (
    <section id="technology" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Continuous cycle of data ingestion, AI processing, and actionable intelligence
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="bg-background border-border">
                <CardHeader>
                  <CardTitle className="text-lg text-accent">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </CardContent>
              </Card>

              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
                  <ArrowRight className="w-6 h-6 text-accent" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-card border border-border rounded-lg">
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
            <p className="text-muted-foreground">
              Real-time data flows continuously through the system for up-to-48 hour advance warning capability
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
