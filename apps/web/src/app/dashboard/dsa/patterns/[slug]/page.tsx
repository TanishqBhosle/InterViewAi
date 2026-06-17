"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MotionDiv, StaggerContainer, StaggerItem } from "@/components/shared/motion-div";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api-client";
import {
  ArrowLeft, ExternalLink, CheckCircle2, Clock, AlertTriangle,
  Lightbulb, X, BookOpen, Code2, Target, ChevronRight
} from "lucide-react";

interface PatternDetail {
  id: string;
  slug: string;
  name: string;
  description: string;
  phase: string;
  icon: string;
  color: string;
  recognitionSignals: string;
  whenToUse: string;
  whenNotToUse: string;
  realLifeAnalogy: string;
  commonMistakes: string;
  codeTemplate: string;
  problems: Array<{
    id: string;
    leetcodeId: number;
    title: string;
    slug: string;
    difficulty: string;
    tier: number;
    companies: string[];
    tags: string[];
    expectedTime: number;
    userStatus: string;
    attempts: number;
  }>;
}

export default function DSAPatternDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [pattern, setPattern] = useState<PatternDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient<PatternDetail>(`/dsa/patterns/${slug}`);
        if (res.success && res.data) setPattern(res.data);
      } catch {} finally {
        setLoading(false);
      }
    };
    if (slug) fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64" />
        <Skeleton className="h-48" />
      </div>
    );
  }

  if (!pattern) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">Pattern not found</h2>
        <Link href="/dsa/curriculum">
          <Button variant="link" className="mt-2">Back to Curriculum</Button>
        </Link>
      </div>
    );
  }

  const signals = JSON.parse(pattern.recognitionSignals || "[]");
  const mistakes = JSON.parse(pattern.commonMistakes || "[]");
  const solvedCount = pattern.problems.filter((p) => p.userStatus === "SOLVED" || p.userStatus === "MASTERED").length;

  const tierLabels: Record<number, string> = { 1: "Must Solve", 2: "Pattern Building", 3: "Company Favorite", 4: "FAANG" };
  const tierColors: Record<number, string> = { 1: "bg-green-500/10 text-green-500", 2: "bg-blue-500/10 text-blue-500", 3: "bg-amber-500/10 text-amber-500", 4: "bg-red-500/10 text-red-500" };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/dsa/curriculum">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: pattern.color }} />
            <h1 className="text-3xl font-bold tracking-tight">{pattern.name}</h1>
          </div>
          <p className="text-muted-foreground">{pattern.description}</p>
        </div>
      </div>

      {/* Progress */}
      <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">{solvedCount}/{pattern.problems.length} solved</span>
          </div>
          <Progress value={pattern.problems.length > 0 ? (solvedCount / pattern.problems.length) * 100 : 0} className="h-2" />
        </CardContent>
      </Card>

      <Tabs defaultValue="problems" className="space-y-6">
        <TabsList>
          <TabsTrigger value="problems">Problems</TabsTrigger>
          <TabsTrigger value="learn">Learn</TabsTrigger>
          <TabsTrigger value="tips">Tips & Mistakes</TabsTrigger>
        </TabsList>

        <TabsContent value="problems" className="space-y-4">
          {[1, 2, 3, 4].map((tier) => {
            const tierProblems = pattern.problems.filter((p) => p.tier === tier);
            if (tierProblems.length === 0) return null;
            return (
              <div key={tier}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${tierColors[tier]}`}>
                    Tier {tier}: {tierLabels[tier]}
                  </span>
                  <span className="text-xs text-muted-foreground">{tierProblems.length} problems</span>
                </div>
                <StaggerContainer className="space-y-2">
                  {tierProblems.map((problem) => (
                    <StaggerItem key={problem.id}>
                      <Link href={`/dsa/problems/${problem.id}`}>
                        <Card className="border-border/30 hover:border-primary/50 transition-all cursor-pointer group">
                          <CardContent className="p-4 flex items-center gap-4">
                            <div className="flex-shrink-0">
                              {problem.userStatus === "SOLVED" || problem.userStatus === "MASTERED" ? (
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                              ) : problem.userStatus === "ATTEMPTED" ? (
                                <Clock className="h-5 w-5 text-yellow-500" />
                              ) : (
                                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">#{problem.leetcodeId}</span>
                                <h3 className="font-medium group-hover:text-primary transition-colors truncate">
                                  {problem.title}
                                </h3>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant={problem.difficulty === "EASY" ? "default" : problem.difficulty === "MEDIUM" ? "secondary" : "destructive"} className="text-xs">
                                  {problem.difficulty}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{problem.expectedTime} min</span>
                                {problem.companies.length > 0 && (
                                  <span className="text-xs text-muted-foreground">
                                    {problem.companies.slice(0, 3).join(", ")}
                                  </span>
                                )}
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                          </CardContent>
                        </Card>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            );
          })}
        </TabsContent>

        <TabsContent value="learn" className="space-y-6">
          <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Recognition Signals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {signals.map((signal: string, i: number) => (
                  <Badge key={i} variant="secondary">{signal}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-500">
                  <CheckCircle2 className="h-5 w-5" />
                  When To Use
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{pattern.whenToUse}</p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-500">
                  <X className="h-5 w-5" />
                  When Not To Use
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{pattern.whenNotToUse}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                Real Life Analogy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground italic">{pattern.realLifeAnalogy}</p>
            </CardContent>
          </Card>

          {pattern.codeTemplate && (
            <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  Code Template
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="p-4 rounded-lg bg-muted overflow-x-auto text-sm">
                  <code>{pattern.codeTemplate}</code>
                </pre>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-500">
                <AlertTriangle className="h-5 w-5" />
                Common Mistakes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {mistakes.map((mistake: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-red-500 mt-0.5">-</span>
                    <span className="text-muted-foreground">{mistake}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
