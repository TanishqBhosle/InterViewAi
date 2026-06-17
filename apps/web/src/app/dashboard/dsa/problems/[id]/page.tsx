"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import {
  ArrowLeft, ExternalLink, CheckCircle2, Clock, AlertTriangle,
  Lightbulb, Code2, Target, RotateCcw, BookOpen, Building2
} from "lucide-react";

interface ProblemDetail {
  id: string;
  leetcodeId: number;
  title: string;
  slug: string;
  difficulty: string;
  tier: number;
  companies: string[];
  tags: string[];
  description: string;
  hints: string;
  bruteForce: string;
  optimalSolution: string;
  timeComplexity: string;
  spaceComplexity: string;
  dryRun: string;
  commonMistakes: string;
  followUps: string;
  productionUse: string;
  expectedTime: number;
  pattern: { slug: string; name: string; color: string } | null;
  userProgress: { status: string; attempts: number; bestTime: number; confidence: number; code?: string } | null;
  mistakes: Array<{ coreMistake: string; patternMissed: string; rootCause: string; fixStrategy: string }>;
}

export default function DSAProblemDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient<ProblemDetail>(`/dsa/problems/${id}`);
        if (res.success && res.data) {
          setProblem(res.data);
          if (res.data.userProgress?.code) setCode(res.data.userProgress.code);
        }
      } catch {} finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  const handleSubmit = async (status: string) => {
    if (!problem) return;
    setSubmitting(true);
    try {
      const res = await apiClient(`/dsa/problems/${problem.id}/submit`, {
        method: "POST",
        body: JSON.stringify({ status, code, language, confidence: 80 }),
      });
      if (res.success) {
        toast.success(status === "SOLVED" ? "Problem marked as solved!" : "Progress saved!");
        setProblem((prev) => prev ? { ...prev, userProgress: { ...prev.userProgress, status, attempts: (prev.userProgress?.attempts || 0) + 1 } as any } : prev);
      }
    } catch {
      toast.error("Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64" />
        <Skeleton className="h-48" />
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">Problem not found</h2>
        <Link href="/dsa/problems">
          <Button variant="link" className="mt-2">Back to Problems</Button>
        </Link>
      </div>
    );
  }

  const hints = JSON.parse(problem.hints || "[]");
  const mistakes = JSON.parse(problem.commonMistakes || "[]");
  const followUps = JSON.parse(problem.followUps || "[]");
  const dryRun = JSON.parse(problem.dryRun || "{}");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dsa/problems">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">#{problem.leetcodeId}</span>
            <h1 className="text-2xl font-bold tracking-tight">{problem.title}</h1>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={problem.difficulty === "EASY" ? "default" : problem.difficulty === "MEDIUM" ? "secondary" : "destructive"}>
              {problem.difficulty}
            </Badge>
            {problem.pattern && (
              <Badge variant="outline" style={{ borderColor: problem.pattern.color }}>
                {problem.pattern.name}
              </Badge>
            )}
            <span className="text-sm text-muted-foreground">{problem.expectedTime} min expected</span>
          </div>
        </div>
        <div className="flex gap-2">
          <a href={`https://leetcode.com/problems/${problem.slug}/`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="gap-2">
              LeetCode <ExternalLink className="h-3 w-3" />
            </Button>
          </a>
        </div>
      </div>

      {/* Status Bar */}
      <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              <Badge variant={problem.userProgress?.status === "SOLVED" ? "default" : "secondary"}>
                {problem.userProgress?.status || "NOT_STARTED"}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Attempts:</span>
              <span className="text-sm font-medium">{problem.userProgress?.attempts || 0}</span>
            </div>
            {problem.userProgress?.bestTime && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Best Time:</span>
                <span className="text-sm font-medium">{problem.userProgress.bestTime}s</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleSubmit("ATTEMPTED")} disabled={submitting}>
              <Clock className="h-4 w-4 mr-1" /> Mark Attempted
            </Button>
            <Button size="sm" onClick={() => handleSubmit("SOLVED")} disabled={submitting} className="bg-green-600 hover:bg-green-700">
              <CheckCircle2 className="h-4 w-4 mr-1" /> Mark Solved
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="solution" className="space-y-4">
            <TabsList>
              <TabsTrigger value="solution">Solution</TabsTrigger>
              <TabsTrigger value="brute">Brute Force</TabsTrigger>
              <TabsTrigger value="dryrun">Dry Run</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>

            <TabsContent value="solution">
              <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Optimal Solution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {problem.optimalSolution ? (
                    <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
                      {problem.optimalSolution}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      Solution not available yet. Try solving it yourself first!
                    </p>
                  )}
                  <div className="flex gap-4">
                    {problem.timeComplexity && (
                      <Badge variant="secondary">Time: {problem.timeComplexity}</Badge>
                    )}
                    {problem.spaceComplexity && (
                      <Badge variant="secondary">Space: {problem.spaceComplexity}</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="brute">
              <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RotateCcw className="h-5 w-5" />
                    Brute Force Approach
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {problem.bruteForce ? (
                    <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
                      {problem.bruteForce}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">Brute force approach not available.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dryrun">
              <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle>Step-by-Step Dry Run</CardTitle>
                </CardHeader>
                <CardContent>
                  {Object.keys(dryRun).length > 0 ? (
                    <div className="space-y-3">
                      {Object.entries(dryRun).map(([step, desc]) => (
                        <div key={step} className="p-3 rounded-lg bg-muted">
                          <p className="font-medium text-sm">{step}</p>
                          <p className="text-sm text-muted-foreground mt-1">{desc as string}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">Dry run not available.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="code">
              <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code2 className="h-5 w-5" />
                    Your Solution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Select value={language} onValueChange={(v) => v && setLanguage(v)}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea
                    placeholder="Write your solution here..."
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="min-h-[300px] font-mono text-sm"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Companies */}
          {problem.companies.length > 0 && (
            <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4" />
                  Asked At
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {problem.companies.map((company, i) => (
                    <Badge key={i} variant="secondary">{company}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tags */}
          {problem.tags.length > 0 && (
            <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <BookOpen className="h-4 w-4" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {problem.tags.map((tag, i) => (
                    <Badge key={i} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Hints */}
          {hints.length > 0 && (
            <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  Hints
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {hints.map((hint: string, i: number) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-amber-500">{i + 1}.</span>
                      {hint}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Common Mistakes */}
          {mistakes.length > 0 && (
            <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm text-red-500">
                  <AlertTriangle className="h-4 w-4" />
                  Common Mistakes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mistakes.map((mistake: string, i: number) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-red-500">-</span>
                      {mistake}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Follow Ups */}
          {followUps.length > 0 && (
            <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Target className="h-4 w-4" />
                  Interview Follow-ups
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {followUps.map((fu: string, i: number) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary">{i + 1}.</span>
                      {fu}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Production Use */}
          {problem.productionUse && (
            <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4" />
                  Production Relevance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{problem.productionUse}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
