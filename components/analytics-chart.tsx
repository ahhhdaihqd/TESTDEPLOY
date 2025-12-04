"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function AnalyticsChart() {
  const riskTrendData = [
    { time: "00:00", riskLevel: 42, alerts: 2 },
    { time: "06:00", riskLevel: 45, alerts: 3 },
    { time: "12:00", riskLevel: 58, alerts: 5 },
    { time: "18:00", riskLevel: 72, alerts: 8 },
    { time: "24:00", riskLevel: 68, alerts: 7 },
  ]

  const hazardDistribution = [
    { hazard: "Flood", count: 145, percentage: 45 },
    { hazard: "Landslide", count: 98, percentage: 30 },
    { hazard: "Storm", count: 82, percentage: 25 },
  ]

  const modelAccuracy = [
    { timeframe: "24h", accuracy: 92, coverage: 88 },
    { timeframe: "48h", accuracy: 87, coverage: 85 },
    { timeframe: "72h", accuracy: 79, coverage: 81 },
    { timeframe: "7d", accuracy: 71, coverage: 75 },
  ]

  return (
    <div className="space-y-6 flex-1 overflow-auto">
      {/* Risk Trend Over Time */}
      <Card className="bg-background border-border">
        <CardHeader>
          <CardTitle>Risk Level Trend (24h)</CardTitle>
          <CardDescription>Risk assessment progression and alert frequency</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={riskTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="riskLevel" stroke="#ef4444" name="Risk Level (%)" />
              <Line yAxisId="right" type="monotone" dataKey="alerts" stroke="#3b82f6" name="Active Alerts" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Hazard Type Distribution */}
      <Card className="bg-background border-border">
        <CardHeader>
          <CardTitle>Hazard Distribution</CardTitle>
          <CardDescription>Breakdown of detected hazards by type</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hazardDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hazard" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#10b981" name="Count" />
              <Bar dataKey="percentage" fill="#f59e0b" name="% of Total" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Model Performance Metrics */}
      <Card className="bg-background border-border">
        <CardHeader>
          <CardTitle>Predictive Model Performance</CardTitle>
          <CardDescription>Accuracy and coverage by forecast timeframe</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={modelAccuracy}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timeframe" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Line type="monotone" dataKey="accuracy" stroke="#8b5cf6" name="Accuracy (%)" strokeWidth={2} />
              <Line type="monotone" dataKey="coverage" stroke="#06b6d4" name="Coverage (%)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
