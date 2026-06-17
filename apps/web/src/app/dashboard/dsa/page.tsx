"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MotionDiv, StaggerContainer, StaggerItem } from "@/components/shared/motion-div";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api-client";
import {
  Code2, BookOpen, Target, Flame, AlertTriangle, RotateCcw,
  TrendingUp, CheckCircle2, Clock, ChevronRight, Zap, Brain,
  Trophy, Calendar, ArrowRight
} from "lucide-react";

interface DSADashboard {
  totalProblems: number;
  solvedProblems: number;
  unsolvedProblems: number;
  overallMastery: number;
  totalMistakes: number;
  unresolvedMistakes: number;
  dueForRevision: number;
  streak: number;
  patternProgress: Array<{
    mastery: number;
    solved: number;
    total: number;
    pattern: { name: string; color: string; slug: string };
  }>;
  recentActivity: Array<{
    status: string;
    lastAttemptAt: string;
    problem: { title: string; slug: string; difficulty: string };
  }>;
}

export default function DSADashboardPage() {
  const [data, setData] = useState<DSADashboard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient<DSADashboard>("/dsa/dashboard");
        if (res.success && res.data) setData(res.data);
      } catch {} finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">DSA Mastery Hub</h1>
        <p className="text-muted-foreground">
          Master Data Structures & Algorithms for interview success
        </p>
      </div>

      {/* Stats Cards */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StaggerItem>
          <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Problems Solved</p>
                  <p className="text-3xl font-bold">{data?.solvedProblems || 0}</p>
                  <p className="text-xs text-muted-foreground">of {data?.totalProblems || 0} total</p>
                </div>
                <div className="p-3 rounded-full bg-green-500/10">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <Progress value={data?.overallMastery || 0} className="mt-3 h-2" />
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-3xl font-bold">{data?.streak || 0}</p>
                  <p className="text-xs text-muted-foreground">consecutive days</p>
                </div>
                <div className="p-3 rounded-full bg-orange-500/10">
                  <Flame className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Due for Revision</p>
                  <p className="text-3xl font-bold">{data?.dueForRevision || 0}</p>
                  <p className="text-xs text-muted-foreground">cards pending</p>
                </div>
                <div className="p-3 rounded-full bg-blue-500/10">
                  <RotateCcw className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unresolved Mistakes</p>
                  <p className="text-3xl font-bold">{data?.unresolvedMistakes || 0}</p>
                  <p className="text-xs text-muted-foreground">to review</p>
                </div>
                <div className="p-3 rounded-full bg-red-500/10">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerContainer>

      {/* Quick Actions */}
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StaggerItem>
          <Link href="/dsa/curriculum">
            <Card className="border-border/50 bg-background/80 backdrop-blur-xl hover:border-primary/50 transition-colors cursor-pointer group">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Curriculum</p>
                  <p className="text-xs text-muted-foreground">6 phases</p>
                </div>
                <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardContent>
            </Card>
          </Link>
        </StaggerItem>

        <StaggerItem>
          <Link href="/dsa/problems">
            <Card className="border-border/50 bg-background/80 backdrop-blur-xl hover:border-primary/50 transition-colors cursor-pointer group">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Code2 className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">Problems</p>
                  <p className="text-xs text-muted-foreground">Browse all</p>
                </div>
                <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardContent>
            </Card>
          </Link>
        </StaggerItem>

        <StaggerItem>
          <Link href="/dsa/mock">
            <Card className="border-border/50 bg-background/80 backdrop-blur-xl hover:border-primary/50 transition-colors cursor-pointer group">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Target className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">Mock Interview</p>
                  <p className="text-xs text-muted-foreground">Practice</p>
                </div>
                <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardContent>
            </Card>
          </Link>
        </StaggerItem>

        <StaggerItem>
          <Link href="/dsa/companies">
            <Card className="border-border/50 bg-background/80 backdrop-blur-xl hover:border-primary/50 transition-colors cursor-pointer group">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10">
                  <Trophy className="h-5 w-5 text-cyan-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">Company Tracks</p>
                  <p className="text-xs text-muted-foreground">10 companies</p>
                </div>
                <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardContent>
            </Card>
          </Link>
        </StaggerItem>
      </StaggerContainer>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pattern Mastery */}
        <Card className="lg:col-span-2 border-border/50 bg-background/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Pattern Mastery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(data?.patternProgress || []).slice(0, 8).map((pp) => (
                <div key={pp.pattern.slug} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pp.pattern.color }} />
                      <span className="text-sm font-medium">{pp.pattern.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {pp.solved}/{pp.total} ({Math.round(pp.mastery)}%)
                    </span>
                  </div>
                  <Progress value={pp.mastery} className="h-1.5" />
                </div>
              ))}
              {(!data?.patternProgress || data.patternProgress.length === 0) && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Start solving problems to track pattern mastery
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(data?.recentActivity || []).slice(0, 6).map((activity, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                  <div className={`p-1 rounded ${activity.status === "SOLVED" ? "bg-green-500/10" : "bg-yellow-500/10"}`}>
                    {activity.status === "SOLVED" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.problem.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.status === "SOLVED" ? "Solved" : "Attempted"}
                    </p>
                  </div>
                  <Badge variant={activity.problem.difficulty === "EASY" ? "default" : activity.problem.difficulty === "MEDIUM" ? "secondary" : "destructive"} className="text-xs">
                    {activity.problem.difficulty}
                  </Badge>
                </div>
              ))}
              {(!data?.recentActivity || data.recentActivity.length === 0) && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No recent activity
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interview Readiness */}
      <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Interview Readiness
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {data?.overallMastery ? Math.round(data.overallMastery) : 0}%
              </div>
              <p className="text-sm text-muted-foreground mt-1">Overall Mastery</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">
                {data?.solvedProblems || 0}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Problems Solved</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">
                {data?.streak || 0}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Day Streak</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500">
                {data?.patternProgress?.filter((p) => p.mastery >= 80).length || 0}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Patterns Mastered</p>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <Link href="/dsa/progress">
              <Button variant="outline" className="gap-2">
                View Detailed Progress
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
