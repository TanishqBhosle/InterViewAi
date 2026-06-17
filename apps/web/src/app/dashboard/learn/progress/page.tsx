"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart3,
  BookOpen,
  Trophy,
  TrendingUp,
  Target,
  Clock,
  CheckCircle2,
  Circle,
  Loader2,
  ArrowRight,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiClient } from "@/lib/api-client";
import { MotionDiv, StaggerContainer, StaggerItem } from "@/components/shared/motion-div";

interface SubjectStat {
  slug: string;
  title: string;
  completed: number;
  total: number;
  score: number;
}

interface StatsData {
  totalSubjects: number;
  totalSubtopics: number;
  completedSubtopics: number;
  overallProgress: number;
  subjects: Record<string, SubjectStat>;
  recentActivity: { subtopicTitle: string; subject: string; score: number | null; completedAt: string }[];
}

export default function LearningProgressPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await apiClient<StatsData>("/learning/stats");
        if (res.success && res.data) setStats(res.data);
      } catch { } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!stats) {
    return (
      <Card className="border-border/50">
        <CardContent className="flex flex-col items-center py-20 text-center">
          <BarChart3 className="size-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-base font-medium">No progress data yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">Start learning to see your progress here</p>
          <Link href="/dashboard/learn">
            <Button variant="outline" size="sm" className="mt-4 gap-1.5">
              <BookOpen className="size-3.5" /> Browse Subjects
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  const sortedSubjects = Object.values(stats.subjects).sort((a, b) => {
    const aPct = a.total > 0 ? a.completed / a.total : 0;
    const bPct = b.total > 0 ? b.completed / b.total : 0;
    return bPct - aPct;
  });

  const subjectList = Object.values(stats.subjects);

  return (
    <div className="space-y-8">
      {/* Header */}
      <MotionDiv>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
                Learning Progress
              </span>
            </h1>
            <p className="text-muted-foreground">Track your learning journey across all subjects</p>
          </div>
          <Link href="/dashboard/learn">
            <Button variant="outline" size="sm" className="gap-1.5">
              <BookOpen className="size-3.5" /> Back to Hub
            </Button>
          </Link>
        </div>
      </MotionDiv>

      {/* Overall stats */}
      <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Overall Progress", value: `${stats.overallProgress}%`, icon: TrendingUp, color: "from-violet-500 to-purple-500", sub: `${stats.completedSubtopics}/${stats.totalSubtopics} completed` },
          { label: "Subjects", value: stats.totalSubjects, icon: BookOpen, color: "from-blue-500 to-cyan-500", sub: "available to learn" },
          { label: "Completed", value: stats.completedSubtopics, icon: Trophy, color: "from-emerald-500 to-green-500", sub: "subtopics mastered" },
          { label: "Best Subject", value: sortedSubjects[0]?.title || "N/A", icon: Target, color: "from-amber-500 to-orange-500", sub: sortedSubjects[0] ? `${sortedSubjects[0].completed}/${sortedSubjects[0].total}` : "" },
        ].map((stat) => (
          <StaggerItem key={stat.label}>
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="size-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-lg font-bold truncate">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    {stat.sub && <p className="text-[11px] text-muted-foreground/70 mt-0.5">{stat.sub}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Overall progress bar */}
      <MotionDiv>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Total Learning Progress</h3>
              <span className="text-sm font-bold">{stats.overallProgress}%</span>
            </div>
            <Progress value={stats.overallProgress} className="h-3" />
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <span>{stats.completedSubtopics} subtopics completed</span>
              <span>{stats.totalSubtopics - stats.completedSubtopics} remaining</span>
            </div>
          </CardContent>
        </Card>
      </MotionDiv>

      {/* Per-subject breakdown */}
      <MotionDiv>
        <h2 className="text-lg font-semibold mb-4">Progress by Subject</h2>
        <StaggerContainer className="space-y-3">
          {subjectList.map((sub) => {
            const pct = sub.total > 0 ? Math.round((sub.completed / sub.total) * 100) : 0;
            return (
              <StaggerItem key={sub.slug}>
                <Link href={`/dashboard/learn/${sub.slug}`}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="group cursor-pointer rounded-xl border border-border/50 bg-card p-4 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                        pct === 100 ? "bg-emerald-500/20 text-emerald-500" : pct > 0 ? "bg-amber-500/20 text-amber-500" : "bg-muted text-muted-foreground"
                      }`}>
                        {pct === 100 ? <CheckCircle2 className="size-5" /> : <Circle className="size-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">{sub.title}</h3>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>{sub.completed}/{sub.total} completed</span>
                            <span>{pct}%</span>
                          </div>
                          <Progress value={pct} className="h-1.5" />
                        </div>
                      </div>
                      {sub.score > 0 && (
                        <Badge variant="secondary" className="shrink-0 text-xs">{sub.score}% avg</Badge>
                      )}
                      <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </MotionDiv>

      {/* Recent Activity */}
      {stats.recentActivity.length > 0 && (
        <MotionDiv>
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <Card className="border-border/50">
            <CardContent className="p-4 space-y-2">
              {stats.recentActivity.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg border border-border/30 p-3 text-sm"
                >
                  <div className="flex size-8 items-center justify-center rounded-full bg-emerald-500/10">
                    <CheckCircle2 className="size-4 text-emerald-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.subtopicTitle}</p>
                    <p className="text-xs text-muted-foreground">{activity.subject}</p>
                  </div>
                  {activity.score !== null && (
                    <Badge variant={activity.score >= 80 ? "default" : "secondary"} className="text-xs shrink-0">
                      {activity.score}%
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </MotionDiv>
      )}
    </div>
  );
}
