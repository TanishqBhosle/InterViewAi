"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { Calendar, Clock, RotateCcw, Code2, ChevronRight, Play } from "lucide-react";

interface DailyPlan {
  id: string;
  date: string;
  duration: number;
  plan: Array<{
    type: string;
    problemId: string;
    title: string;
    duration: number;
  }>;
  completed: boolean;
}

export default   function DSAPracticePage() {
  const [plan, setPlan] = useState<DailyPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [duration, setDuration] = useState("60");
  const [focus, setFocus] = useState("balanced");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient<DailyPlan>("/dsa/daily-plan");
        if (res.success && res.data) setPlan(res.data);
      } catch {} finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const res = await apiClient<DailyPlan>("/dsa/daily-plan/generate", {
        method: "POST",
        body: JSON.stringify({ duration: Number(duration), focus }),
      });
      if (res.success && res.data) {
        setPlan(res.data);
        toast.success("Daily plan generated!");
      }
    } catch {
      toast.error("Failed to generate plan");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-48" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Daily Practice</h1>
        <p className="text-muted-foreground">Structured daily practice plans for consistent improvement</p>
      </div>

      <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Generate Today&apos;s Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Duration</label>
              <Select value={duration} onValueChange={(v) => v && setDuration(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  <SelectItem value="180">3 hours</SelectItem>
                  <SelectItem value="300">5 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Focus</label>
              <Select value={focus} onValueChange={(v) => v && setFocus(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy (Build Confidence)</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="hard">Hard (Challenge Yourself)</SelectItem>
                  <SelectItem value="weak">Focus on Weak Patterns</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleGenerate} disabled={generating} className="gap-2">
            <Play className="h-4 w-4" />
            {generating ? "Generating..." : "Generate Plan"}
          </Button>
        </CardContent>
      </Card>

      {plan && (
        <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Today&apos;s Plan ({plan.duration} minutes)
              </CardTitle>
              {plan.completed && (
                <Badge className="bg-green-600">Completed</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {plan.plan.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No items in today&apos;s plan. Generate a new plan above.
              </p>
            ) : (
              <div className="space-y-3">
                {plan.plan.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-border/30">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {item.type === "revision" ? (
                          <RotateCcw className="h-4 w-4 text-blue-500" />
                        ) : (
                          <Code2 className="h-4 w-4 text-purple-500" />
                        )}
                        <h3 className="font-medium">{item.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {item.type === "revision" ? "Revision" : "Practice"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{item.duration} min</span>
                      </div>
                    </div>
                    <Link href={`/dsa/problems/${item.problemId}`}>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-500">
              {plan?.plan.filter((p) => p.type === "revision").length || 0}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Revision Items</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-500">
              {plan?.plan.filter((p) => p.type === "practice").length || 0}
            </div>
            <p className="text-sm text-muted-foreground mt-1">New Problems</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-500">
              {plan?.plan.reduce((sum, p) => sum + p.duration, 0) || 0}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Total Minutes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
