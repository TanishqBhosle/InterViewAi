"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { Target, Play, Clock, CheckCircle2, Trophy, ArrowRight } from "lucide-react";

interface MockInterview {
  id: string;
  title: string;
  duration: number;
  questionCount: number;
  difficulty: string;
  status: string;
  score: number | null;
  createdAt: string;
}

export default function DSAMockPage() {
  const [interviews, setInterviews] = useState<MockInterview[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [duration, setDuration] = useState("45");
  const [questionCount, setQuestionCount] = useState("5");
  const [difficulty, setDifficulty] = useState("MEDIUM");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient<MockInterview[]>("/dsa/mock");
        if (res.success && res.data) setInterviews(res.data);
      } catch {} finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStart = async () => {
    setCreating(true);
    try {
      const res = await apiClient<any>("/dsa/mock/start", {
        method: "POST",
        body: JSON.stringify({ duration: Number(duration), questionCount: Number(questionCount), difficulty }),
      });
      if (res.success && res.data) {
        toast.success("Mock interview created!");
        setInterviews((prev) => [res.data, ...prev]);
      }
    } catch {
      toast.error("Failed to create mock interview");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mock Interviews</h1>
        <p className="text-muted-foreground">Practice under timed conditions like real interviews</p>
      </div>

      {/* Start New */}
      <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Start New Mock Interview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Duration</label>
              <Select value={duration} onValueChange={(v) => v && setDuration(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Questions</label>
              <Select value={questionCount} onValueChange={(v) => v && setQuestionCount(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 questions</SelectItem>
                  <SelectItem value="5">5 questions</SelectItem>
                  <SelectItem value="7">7 questions</SelectItem>
                  <SelectItem value="10">10 questions</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Difficulty</label>
              <Select value={difficulty} onValueChange={(v) => v && setDifficulty(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EASY">Easy</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HARD">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleStart} disabled={creating} className="gap-2">
            <Target className="h-4 w-4" />
            {creating ? "Creating..." : "Start Interview"}
          </Button>
        </CardContent>
      </Card>

      {/* Previous Interviews */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Previous Interviews</h2>
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
        ) : interviews.length === 0 ? (
          <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
            <CardContent className="p-8 text-center text-muted-foreground">
              No mock interviews yet. Start your first one above!
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {interviews.map((interview) => (
              <Card key={interview.id} className="border-border/50 bg-background/80 backdrop-blur-xl">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`p-2 rounded-full ${interview.status === "completed" ? "bg-green-500/10" : "bg-yellow-500/10"}`}>
                    {interview.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{interview.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <span>{interview.duration} min</span>
                      <span>-</span>
                      <span>{interview.questionCount} questions</span>
                      <span>-</span>
                      <Badge variant={interview.difficulty === "EASY" ? "default" : interview.difficulty === "MEDIUM" ? "secondary" : "destructive"} className="text-xs">
                        {interview.difficulty}
                      </Badge>
                    </div>
                  </div>
                  {interview.score !== null && (
                    <div className="text-right">
                      <div className="text-2xl font-bold">{Math.round(interview.score)}%</div>
                      <p className="text-xs text-muted-foreground">Score</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
