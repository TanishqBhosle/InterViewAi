"use client"

import { motion } from "framer-motion"
import {
  BarChart3,
  TrendingUp,
  Target,
  Star,
  ArrowUpRight,
  Award,
  Brain,
  Mic,
  Eye,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GlowCard } from "@/components/shared/glow-card"
import { MotionDiv, StaggerContainer, StaggerItem } from "@/components/shared/motion-div"
import { Counter } from "@/components/shared/counter"

const scoreData = [
  { label: "Technical", score: 0, color: "bg-chart-1", icon: Brain },
  { label: "Communication", score: 0, color: "bg-chart-2", icon: Mic },
  { label: "Confidence", score: 0, color: "bg-chart-3", icon: Eye },
  { label: "Problem Solving", score: 0, color: "bg-chart-4", icon: Target },
]

const improvementTips = [
  "Use more quantifiable results in your answers",
  "Structure responses using the STAR method",
  "Maintain consistent eye contact",
  "Reduce filler words like 'um' and 'like'",
]

const radarMetrics = [
  { label: "Technical", value: 0, fullMark: 100 },
  { label: "Communication", value: 0, fullMark: 100 },
  { label: "Confidence", value: 0, fullMark: 100 },
  { label: "Problem Solving", value: 0, fullMark: 100 },
  { label: "Leadership", value: 0, fullMark: 100 },
]

export default function ReportsPage() {
  const hasData = false

  return (
    <div className="space-y-8">
      {/* Header */}
      <MotionDiv>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Progress &{" "}
              <span className="bg-gradient-to-r from-primary via-brand to-chart-2 bg-clip-text text-transparent">
                Reports
              </span>
            </h1>
            <p className="text-muted-foreground">Track your interview performance and growth</p>
          </div>
          <Badge variant="outline" className="gap-1.5 px-3 py-1">
            <TrendingUp className="size-3.5 text-primary" />
            Level: Beginner
          </Badge>
        </div>
      </MotionDiv>

      {!hasData ? (
        /* Empty state */
        <EmptyState />
      ) : (
        /* Full analytics */
        <AnalyticsDashboard />
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <GlowCard className="p-8 sm:p-12" glowColor="rgba(120, 80, 240, 0.05)">
      <div className="flex flex-col items-center text-center max-w-md mx-auto">
        <motion.div
          className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-brand/10 border border-primary/20 mb-6"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <BarChart3 className="size-8 text-primary" />
        </motion.div>
        <h3 className="text-lg font-semibold mb-2">No Reports Yet</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Complete your first AI mock interview to unlock detailed analytics,
          score breakdowns, and personalized improvement recommendations.
        </p>
        <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
          {[
            { label: "Technical", color: "from-chart-1/20 to-chart-1/5" },
            { label: "Communication", color: "from-chart-2/20 to-chart-2/5" },
            { label: "Confidence", color: "from-chart-3/20 to-chart-3/5" },
            { label: "Problem Solving", color: "from-chart-4/20 to-chart-4/5" },
          ].map((item) => (
            <div
              key={item.label}
              className={cn(
                "rounded-xl border border-border/50 p-3 text-center bg-gradient-to-br",
                item.color
              )}
            >
              <div className="text-lg font-bold text-muted-foreground">--</div>
              <div className="text-xs text-muted-foreground mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </GlowCard>
  )
}

function AnalyticsDashboard() {
  return (
    <>
      {/* Overall Score */}
      <MotionDiv>
        <GlowCard className="p-6 sm:p-8" glowColor="rgba(120, 80, 240, 0.05)">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            {/* Score circle */}
            <div className="relative">
              <svg className="size-32 sm:size-40" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="currentColor"
                  className="text-muted"
                  strokeWidth="6"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="currentColor"
                  className="text-primary"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 42}
                  initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - 0) }}
                  transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-3xl sm:text-4xl font-bold">--</span>
                  <span className="text-sm text-muted-foreground block">/100</span>
                </div>
              </div>
            </div>

            {/* Score details */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-semibold">Overall Performance</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Based on all your interview sessions
              </p>
              <div className="grid grid-cols-2 gap-3">
                {scoreData.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className={cn("flex size-7 items-center justify-center rounded-lg", item.color.replace("bg-", "bg-").replace("chart", "chart/10"))}>
                        <Icon className="size-3.5 text-foreground" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-semibold">--</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Improvement */}
            <div className="hidden lg:block">
              <Badge variant="outline" className="gap-1 px-3 py-1.5 border-emerald-500/30 text-emerald-500">
                <ArrowUpRight className="size-3.5" />
                +0% this week
              </Badge>
            </div>
          </div>
        </GlowCard>
      </MotionDiv>

      {/* Radar Chart placeholder & Score Breakdown */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <MotionDiv>
          <GlowCard className="p-6" glowColor="rgba(120, 80, 240, 0.05)">
            <h3 className="text-lg font-semibold mb-4">Skill Radar</h3>
            <div className="flex items-center justify-center h-64">
              <div className="relative size-48">
                {/* Radar rings */}
                {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
                  <svg
                    key={i}
                    className="absolute inset-0"
                    viewBox="0 0 100 100"
                  >
                    <polygon
                      points={getRadarPoints(5, 50, 42 * scale)}
                      fill="none"
                      stroke="currentColor"
                      className="text-border"
                      strokeWidth="0.5"
                    />
                  </svg>
                ))}
                {/* Radar axes */}
                <svg className="absolute inset-0" viewBox="0 0 100 100">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2
                    const x = 50 + 42 * Math.cos(angle)
                    const y = 50 + 42 * Math.sin(angle)
                    return (
                      <line
                        key={i}
                        x1="50"
                        y1="50"
                        x2={x}
                        y2={y}
                        stroke="currentColor"
                        className="text-border"
                        strokeWidth="0.5"
                      />
                    )
                  })}
                </svg>
                {/* Labels */}
                {radarMetrics.map((metric, i) => {
                  const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2
                  const x = 50 + 50 * Math.cos(angle)
                  const y = 50 + 50 * Math.sin(angle)
                  return (
                    <span
                      key={metric.label}
                      className="absolute text-[8px] text-muted-foreground font-medium"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {metric.label}
                    </span>
                  )
                })}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-muted-foreground">--</span>
                </div>
              </div>
            </div>
          </GlowCard>
        </MotionDiv>

        {/* Score Breakdown */}
        <MotionDiv>
          <GlowCard className="p-6" glowColor="rgba(120, 80, 240, 0.05)">
            <h3 className="text-lg font-semibold mb-4">Score Breakdown</h3>
            <div className="space-y-4">
              {scoreData.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.label}
                    className="space-y-1.5"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Icon className="size-3.5 text-muted-foreground" />
                        <span>{item.label}</span>
                      </div>
                      <span className="font-medium text-muted-foreground">--</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className={cn("h-full rounded-full", item.color)}
                        initial={{ width: 0 }}
                        whileInView={{ width: "0%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </GlowCard>
        </MotionDiv>
      </div>

      {/* Improvement Plan */}
      <MotionDiv>
        <GlowCard className="p-6" glowColor="rgba(120, 80, 240, 0.05)">
          <h3 className="text-lg font-semibold mb-4">Improvement Plan</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {improvementTips.map((tip, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-border/50 p-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ x: 4 }}
              >
                <div className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary shrink-0">
                  {i + 1}
                </div>
                <p className="text-sm text-muted-foreground">{tip}</p>
              </motion.div>
            ))}
          </div>
        </GlowCard>
      </MotionDiv>
    </>
  )
}

function getRadarPoints(sides: number, center: number, radius: number): string {
  return Array.from({ length: sides })
    .map((_, i) => {
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 2
      const x = center + radius * Math.cos(angle)
      const y = center + radius * Math.sin(angle)
      return `${x},${y}`
    })
    .join(" ")
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ")
}
