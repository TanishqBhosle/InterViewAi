"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  BarChart3,
  TrendingUp,
  Target,
  Star,
  ArrowUpRight,
  Brain,
  Mic,
  Eye,
  Loader2,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlowCard } from "@/components/shared/glow-card"
import { MotionDiv, StaggerContainer, StaggerItem } from "@/components/shared/motion-div"
import { Counter } from "@/components/shared/counter"
import { apiClient } from "@/lib/api-client"

interface ReportData {
  id: string
  overallScore: number
  technicalScore: number
  communicationScore: number
  confidenceScore: number
  problemSolvingScore: number
  feedback: string
  strengths: string[]
  improvements: string[]
  interview: {
    type: string
    role: string
    createdAt: string
  }
}

interface StatsData {
  totalInterviews: number
  completedInterviews: number
  avgScore: number
  atsScore: number
  totalHours: number
  technicalScore: number
  communicationScore: number
  confidenceScore: number
}

export default function ReportsPage() {
  const [hasData, setHasData] = useState(false)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<StatsData | null>(null)
  const [reports, setReports] = useState<ReportData[]>([])

  useEffect(() => {
    async function load() {
      try {
        const [statsRes, reportsRes] = await Promise.all([
          apiClient<StatsData>("/analytics/stats"),
          apiClient<ReportData[]>("/analytics/reports"),
        ])

        if (statsRes.success && statsRes.data) {
          setStats(statsRes.data)
          if (statsRes.data.completedInterviews > 0) {
            setHasData(true)
          }
        }
        if (reportsRes.success && reportsRes.data) {
          setReports(reportsRes.data)
        }
      } catch {
        // Use defaults
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
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
            Level: {stats?.completedInterviews && stats.completedInterviews > 5 ? "Advanced" : stats?.completedInterviews && stats.completedInterviews > 2 ? "Intermediate" : "Beginner"}
          </Badge>
        </div>
      </MotionDiv>

      {!hasData ? (
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
            <Link href="/dashboard/interviews">
              <Button className="gap-2">
                Start Interview <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </GlowCard>
      ) : (
        <>
          {/* Overall Score */}
          <MotionDiv>
            <GlowCard className="p-6 sm:p-8" glowColor="rgba(120, 80, 240, 0.05)">
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
                <div className="relative">
                  <svg className="size-32 sm:size-40" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" className="text-muted" strokeWidth="6" />
                    <motion.circle
                      cx="50" cy="50" r="42" fill="none" stroke="currentColor"
                      className="text-primary" strokeWidth="6" strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 42}
                      initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - (stats?.avgScore || 0) / 100) }}
                      transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                      style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Counter end={stats?.avgScore || 0} className="text-3xl sm:text-4xl font-bold" />
                      <span className="text-sm text-muted-foreground block">/100</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-semibold">Overall Performance</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Based on {stats?.completedInterviews || 0} completed interview(s)
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Technical", score: stats?.technicalScore || 0, icon: Brain, color: "bg-chart-1" },
                      { label: "Communication", score: stats?.communicationScore || 0, icon: Mic, color: "bg-chart-2" },
                      { label: "Confidence", score: stats?.confidenceScore || 0, icon: Eye, color: "bg-chart-3" },
                      { label: "Problem Solving", score: 0, icon: Target, color: "bg-chart-4" },
                    ].map((item) => {
                      const Icon = item.icon
                      return (
                        <div key={item.label} className="flex items-center gap-2">
                          <div className={`flex size-7 items-center justify-center rounded-lg ${item.color}/10`}>
                            <Icon className="size-3.5 text-foreground" />
                          </div>
                          <div className="text-left">
                            <p className="text-xs text-muted-foreground">{item.label}</p>
                            <p className="text-sm font-semibold">{item.score || "--"}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="hidden lg:block">
                  <Badge variant="outline" className="gap-1 px-3 py-1.5 border-emerald-500/30 text-emerald-500">
                    <ArrowUpRight className="size-3.5" />
                    {stats?.totalInterviews || 0} total interviews
                  </Badge>
                </div>
              </div>
            </GlowCard>
          </MotionDiv>

          {/* Score Breakdown */}
          <div className="grid lg:grid-cols-2 gap-6">
            <MotionDiv>
              <GlowCard className="p-6" glowColor="rgba(120, 80, 240, 0.05)">
                <h3 className="text-lg font-semibold mb-4">Score Breakdown</h3>
                <div className="space-y-4">
                  {[
                    { label: "Technical", score: stats?.technicalScore || 0, color: "bg-chart-1", icon: Brain },
                    { label: "Communication", score: stats?.communicationScore || 0, color: "bg-chart-2", icon: Mic },
                    { label: "Confidence", score: stats?.confidenceScore || 0, color: "bg-chart-3", icon: Eye },
                    { label: "Problem Solving", score: 0, color: "bg-chart-4", icon: Target },
                  ].map((item, i) => {
                    const Icon = item.icon
                    return (
                      <motion.div key={item.label} className="space-y-1.5"
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
                          <span className="font-medium">{item.score || "--"}</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${item.color}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.score}%` }}
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

            <MotionDiv>
              <GlowCard className="p-6" glowColor="rgba(120, 80, 240, 0.05)">
                <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
                <div className="space-y-2">
                  {reports.slice(0, 5).map((r) => (
                    <div key={r.id} className="flex items-center justify-between rounded-lg border border-border/50 p-3">
                      <div>
                        <p className="text-sm font-medium">{r.interview.role}</p>
                        <p className="text-xs text-muted-foreground">
                          {r.interview.type.replace("_", " ")} &middot; {new Date(r.interview.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={r.overallScore >= 70 ? "default" : "secondary"}>
                        {r.overallScore}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </GlowCard>
            </MotionDiv>
          </div>

          {/* Strengths & Improvements */}
          {reports.length > 0 && (() => {
            const latest = reports[0]
            return (
              <div className="grid sm:grid-cols-2 gap-6">
                {latest.strengths?.length > 0 && (
                  <MotionDiv>
                    <GlowCard className="p-6" glowColor="rgba(120, 80, 240, 0.05)">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Star className="size-4 text-emerald-500" /> Strengths
                      </h3>
                      <ul className="space-y-2">
                        {latest.strengths.map((s: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="mt-1 size-1.5 rounded-full bg-emerald-500 shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </GlowCard>
                  </MotionDiv>
                )}
                {latest.improvements?.length > 0 && (
                  <MotionDiv>
                    <GlowCard className="p-6" glowColor="rgba(120, 80, 240, 0.05)">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Target className="size-4 text-amber-500" /> Areas to Improve
                      </h3>
                      <ul className="space-y-2">
                        {latest.improvements.map((s: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="mt-1 size-1.5 rounded-full bg-amber-500 shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </GlowCard>
                  </MotionDiv>
                )}
              </div>
            )
          })()}
        </>
      )}
    </div>
  )
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ")
}