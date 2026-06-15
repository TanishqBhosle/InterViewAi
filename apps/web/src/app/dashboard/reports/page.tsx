"use client";

import { BarChart3, TrendingUp, Target, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const scoreData = [
  { label: "Technical", score: 0, color: "bg-chart-1" },
  { label: "Communication", score: 0, color: "bg-chart-2" },
  { label: "Confidence", score: 0, color: "bg-chart-3" },
  { label: "Problem Solving", score: 0, color: "bg-chart-4" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Progress & Reports</h1>
        <p className="text-muted-foreground">Track your interview performance and growth</p>
      </div>

      {/* Overall Score */}
      <Card className="border-border/50">
        <CardContent className="flex flex-col items-center py-16 text-center">
          <div className="relative mb-4">
            <div className="flex size-24 items-center justify-center rounded-full bg-muted">
              <span className="text-3xl font-bold text-muted-foreground/50">--</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold">Overall Score</h3>
          <p className="text-sm text-muted-foreground">
            Complete interviews to see your overall performance score
          </p>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {scoreData.map((item) => (
          <Card key={item.label} className="border-border/50">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{item.label}</p>
                <span className="text-xs text-muted-foreground">--/100</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-muted">
                <div className={`h-full rounded-full ${item.color}`} style={{ width: "0%" }} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Reports */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Recent Reports</CardTitle>
          <CardDescription>Your latest interview assessments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center py-12 text-center">
            <BarChart3 className="size-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-sm font-medium">No reports yet</h3>
            <p className="text-xs text-muted-foreground">
              Complete an interview to see your first report
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
