"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  MessageSquare,
  FileText,
  Brain,
  TrendingUp,
  ArrowRight,
  Star,
  Clock,
  Target,
  Zap,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { apiClient } from "@/lib/api-client"
import { MotionDiv, StaggerContainer, StaggerItem } from "@/components/shared/motion-div"
import { GlowCard } from "@/components/shared/glow-card"
import { Counter } from "@/components/shared/counter"

const quickActions = [
  {
    title: "Start Mock Interview",
    description: "Practice with AI-powered interviews",
    icon: MessageSquare,
    href: "/dashboard/interviews",
    gradient: "from-violet-500/20 to-purple-500/20",
    border: "border-violet-500/20",
  },
  {
    title: "Upload Resume",
    description: "Get ATS score & improvement suggestions",
    icon: FileText,
    href: "/dashboard/resume",
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/20",
  },
  {
    title: "AI Career Coach",
    description: "Chat with AI for career guidance",
    icon: Brain,
    href: "/dashboard/coach",
    gradient: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/20",
  },
  {
    title: "View Progress",
    description: "Track your interview scores & growth",
    icon: TrendingUp,
    href: "/dashboard/reports",
    gradient: "from-emerald-500/20 to-green-500/20",
    border: "border-emerald-500/20",
  },
]

const interviewTypes = [
  { id: "hr", label: "HR Interview", icon: "👔", description: "General HR questions" },
  { id: "technical", label: "Technical", icon: "💻", description: "Coding & DSA" },
  { id: "behavioral", label: "Behavioral", icon: "🧠", description: "STAR method" },
  { id: "system-design", label: "System Design", icon: "🏗️", description: "Architecture" },
]

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await apiClient("/analytics/stats")
        setStats(data.data)
      } catch {
        // Use defaults
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 12) return "Good morning"
    if (h < 17) return "Good afternoon"
    return "Good evening"
  })()

  const statCards = [
    { label: "Interviews Completed", value: stats?.totalInterviews ?? 0, icon: MessageSquare, color: "from-violet-500 to-purple-500", suffix: "" },
    { label: "Avg. Score", value: stats?.avgScore ?? 0, icon: Star, color: "from-amber-500 to-orange-500", suffix: "%" },
    { label: "ATS Score", value: stats?.atsScore ?? 0, icon: Target, color: "from-blue-500 to-cyan-500", suffix: "%" },
    { label: "Practice Hours", value: stats?.totalHours ?? 0, icon: Clock, color: "from-emerald-500 to-green-500", suffix: "h" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <MotionDiv>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {greeting},{" "}
              <span className="bg-gradient-to-r from-primary via-brand to-chart-2 bg-clip-text text-transparent">
                Rahul
              </span>
            </h1>
            <p className="text-muted-foreground">Here&apos;s your interview preparation overview</p>
          </div>
          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/dashboard/interviews">
                <Button size="sm" className="gap-1.5">
                  <Zap className="size-3.5" />
                  Start Interview
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </MotionDiv>

      {/* Quick Stats */}
      <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <StaggerItem key={stat.label}>
            <GlowCard className="p-4 sm:p-6" glowColor="rgba(120, 80, 240, 0.05)">
              <div className="flex items-center gap-4">
                <div className={cn("flex size-10 items-center justify-center rounded-lg bg-gradient-to-br", stat.color, "bg-opacity-10")}>
                  <stat.icon className="size-5 text-white" />
                </div>
                <div>
                  {loading ? (
                    <Skeleton className="h-7 w-12 mb-1" />
                  ) : (
                    <Counter end={stat.value} suffix={stat.suffix} className="text-2xl font-bold" />
                  )}
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </GlowCard>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Quick Actions */}
      <MotionDiv>
        <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <StaggerItem key={action.title}>
                <Link href={action.href}>
                  <motion.div
                    className={cn(
                      "group cursor-pointer rounded-xl border border-border/50 bg-card p-4 sm:p-6 transition-all duration-300",
                      "hover:shadow-lg hover:-translate-y-1"
                    )}
                    whileHover={{ y: -4 }}
                  >
                    <div className={cn("inline-flex size-10 items-center justify-center rounded-lg bg-gradient-to-br", action.gradient, action.border)}>
                      <Icon className="size-5 text-foreground" />
                    </div>
                    <h3 className="mt-3 text-sm font-semibold group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">{action.description}</p>
                  </motion.div>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </MotionDiv>

      {/* Interview Types */}
      <MotionDiv>
        <GlowCard className="p-6" glowColor="rgba(120, 80, 240, 0.05)">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Practice Interviews</h2>
              <p className="text-sm text-muted-foreground">Choose an interview type to start practicing</p>
            </div>
            <Link href="/dashboard/interviews">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View all <ArrowRight className="size-3" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {interviewTypes.map((type, i) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/dashboard/interviews?type=${type.id}`}
                  className="flex items-center gap-3 rounded-lg border border-border/50 p-3 transition-all duration-300 hover:bg-muted hover:border-primary/20"
                >
                  <span className="text-xl">{type.icon}</span>
                  <div>
                    <span className="text-sm font-medium block">{type.label}</span>
                    <span className="text-xs text-muted-foreground">{type.description}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </GlowCard>
      </MotionDiv>

      {/* Recent Activity */}
      <MotionDiv>
        <GlowCard className="p-6" glowColor="rgba(120, 80, 240, 0.05)">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <p className="text-sm text-muted-foreground">Your latest interview sessions and results</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <motion.div
              className="flex size-12 items-center justify-center rounded-full bg-muted"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <MessageSquare className="size-6 text-muted-foreground" />
            </motion.div>
            <h3 className="mt-4 text-sm font-medium">No interviews yet</h3>
            <p className="mt-1 text-xs text-muted-foreground max-w-sm">
              Start your first mock interview to see your progress here
            </p>
            <Link href="/dashboard/interviews" className="mt-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="sm" className="gap-1.5">
                  Start Interview <ArrowRight className="size-3" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </GlowCard>
      </MotionDiv>
    </div>
  )
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ")
}
