"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  FileText,
  Brain,
  TrendingUp,
  ArrowRight,
  Star,
  Clock,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api-client";

const quickActions = [
  {
    title: "Start Mock Interview",
    description: "Practice with AI-powered interviews",
    icon: MessageSquare,
    href: "/dashboard/interviews",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    title: "Upload Resume",
    description: "Get ATS score & improvement suggestions",
    icon: FileText,
    href: "/dashboard/resume",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "AI Career Coach",
    description: "Chat with AI for career guidance",
    icon: Brain,
    href: "/dashboard/coach",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "View Progress",
    description: "Track your interview scores & growth",
    icon: TrendingUp,
    href: "/dashboard/reports",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

const interviewTypes = [
  { id: "hr", label: "HR", icon: "👔" },
  { id: "technical", label: "Technical", icon: "💻" },
  { id: "behavioral", label: "Behavioral", icon: "🧠" },
  { id: "system_design", label: "System Design", icon: "🏗️" },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await apiClient("/analytics/stats");
        setStats(data.data);
      } catch {
        // Use defaults
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  })();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {greeting}, <span className="bg-gradient-to-r from-primary to-brand bg-clip-text text-transparent">Rahul</span>
          </h1>
          <p className="text-muted-foreground">Here&apos;s your interview preparation overview</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Interviews Completed", value: "--", icon: MessageSquare, color: "text-violet-500" },
          { label: "Avg. Score", value: "--", icon: Star, color: "text-amber-500" },
          { label: "ATS Score", value: "--", icon: Target, color: "text-blue-500" },
          { label: "Practice Hours", value: "--", icon: Clock, color: "text-emerald-500" },
        ].map((stat) => (
          <Card key={stat.label} className="border-border/50 bg-card/50">
            <CardContent className="flex items-center gap-4 p-4 sm:p-6">
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                <stat.icon className={`size-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{loading ? <Skeleton className="h-7 w-12" /> : stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Card className="group cursor-pointer border-border/50 bg-card/50 transition-all hover:border-primary/20 hover:bg-card hover:shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <div className={`inline-flex size-10 items-center justify-center rounded-lg ${action.bg}`}>
                    <action.icon className={`size-5 ${action.color}`} />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold">{action.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{action.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Interview Types */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Practice Interviews</CardTitle>
            <CardDescription>Choose an interview type to start practicing</CardDescription>
          </div>
          <Link href="/dashboard/interviews">
            <Button variant="ghost" size="sm" className="gap-1 text-xs">
              View all <ArrowRight className="size-3" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {interviewTypes.map((type) => (
              <Link
                key={type.id}
                href={`/dashboard/interviews?type=${type.id}`}
                className="flex items-center gap-3 rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted"
              >
                <span className="text-xl">{type.icon}</span>
                <span className="text-sm font-medium">{type.label}</span>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
          <CardDescription>Your latest interview sessions and results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <MessageSquare className="size-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-sm font-medium">No interviews yet</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Start your first mock interview to see your progress here
            </p>
            <Link href="/dashboard/interviews" className="mt-4">
              <Button size="sm" className="gap-1.5">
                Start Interview <ArrowRight className="size-3" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
