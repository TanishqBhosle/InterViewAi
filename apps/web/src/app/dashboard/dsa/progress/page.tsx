"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api-client";
import { TrendingUp, Target, Brain, Flame, BarChart3, CheckCircle2 } from "lucide-react";

interface ProgressData {
  totalProblems: number;
  solvedProblems: number;
  overallMastery: number;
  patternProgress: Array<{
    mastery: number;
    solved: number;
    total: number;
    pattern: { name: string; color: string; slug: string };
  }>;
}

export default   function DSAProgressPage() {
  const [data, setData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient<ProgressData>("/dsa/progress");
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
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  const difficultyBreakdown = data?.patternProgress || [];
  const mastered = data?.patternProgress?.filter((p) => p.mastery >= 80).length || 0;
  const inProgress = data?.patternProgress?.filter((p) => p.mastery >= 20 && p.mastery < 80).length || 0;
  const notStarted = data?.patternProgress?.filter((p) => p.mastery < 20).length || 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Progress Analytics</h1>
        <p className="text-muted-foreground">Track your DSA learning journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-500/10">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{data?.solvedProblems || 0}</p>
                <p className="text-sm text-muted-foreground">Problems Solved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{Math.round(data?.overallMastery || 0)}%</p>
                <p className="text-sm text-muted-foreground">Overall Mastery</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-purple-500/10">
                <Brain className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mastered}</p>
                <p className="text-sm text-muted-foreground">Patterns Mastered</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-amber-500/10">
                <Target className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{data?.totalProblems || 0}</p>
                <p className="text-sm text-muted-foreground">Total Problems</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pattern Mastery */}
      <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Pattern Mastery Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(data?.patternProgress || [])
              .sort((a, b) => b.mastery - a.mastery)
              .map((pp) => (
                <div key={pp.pattern.slug} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pp.pattern.color }} />
                      <span className="text-sm font-medium">{pp.pattern.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {pp.solved}/{pp.total}
                      </span>
                      <Badge variant={pp.mastery >= 80 ? "default" : pp.mastery >= 40 ? "secondary" : "outline"} className="text-xs">
                        {Math.round(pp.mastery)}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={pp.mastery} className="h-2" />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-500">{mastered}</div>
            <p className="text-sm text-muted-foreground mt-1">Mastered (80%+)</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-amber-500">{inProgress}</div>
            <p className="text-sm text-muted-foreground mt-1">In Progress (20-80%)</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-red-500">{notStarted}</div>
            <p className="text-sm text-muted-foreground mt-1">Not Started (&lt;20%)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
