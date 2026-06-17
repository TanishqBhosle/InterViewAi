"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { AlertTriangle, CheckCircle2, Clock, ChevronRight } from "lucide-react";

interface Mistake {
  id: string;
  problemId: string;
  coreMistake: string;
  patternMissed: string;
  rootCause: string;
  fixStrategy: string;
  revisitDate: string;
  confidence: number;
  resolved: boolean;
  problem: { title: string; slug: string; leetcodeId: number; difficulty: string };
  createdAt: string;
}

export default   function DSAMistakesPage() {
  const [mistakes, setMistakes] = useState<Mistake[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("unresolved");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = filter === "resolved" ? "?resolved=true" : filter === "unresolved" ? "?resolved=false" : "";
        const res = await apiClient<Mistake[]>(`/dsa/mistakes${params}`);
        if (res.success && res.data) setMistakes(res.data);
      } catch {} finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filter]);

  const handleResolve = async (id: string) => {
    try {
      const res = await apiClient(`/dsa/mistakes/${id}`, {
        method: "PUT",
        body: JSON.stringify({ resolved: true, confidence: 80 }),
      });
      if (res.success) {
        toast.success("Mistake marked as resolved!");
        setMistakes((prev) => prev.map((m) => m.id === id ? { ...m, resolved: true } : m));
      }
    } catch {
      toast.error("Failed to update");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mistake Log</h1>
        <p className="text-muted-foreground">Track and learn from your mistakes</p>
      </div>

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="unresolved">Unresolved</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
      </Tabs>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      ) : mistakes.length === 0 ? (
        <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-12 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No mistakes logged</h2>
            <p className="text-muted-foreground">
              {filter === "resolved" ? "No resolved mistakes yet." : "Great job! Keep it up."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {mistakes.map((mistake) => (
            <Card key={mistake.id} className="border-border/50 bg-background/80 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{mistake.problem.title}</h3>
                      <Badge variant={mistake.problem.difficulty === "EASY" ? "default" : mistake.problem.difficulty === "MEDIUM" ? "secondary" : "destructive"} className="text-xs">
                        {mistake.problem.difficulty}
                      </Badge>
                      {mistake.resolved && (
                        <Badge variant="default" className="text-xs bg-green-600">Resolved</Badge>
                      )}
                    </div>

                    {mistake.coreMistake && (
                      <div>
                        <p className="text-sm font-medium text-red-500">Core Mistake:</p>
                        <p className="text-sm text-muted-foreground">{mistake.coreMistake}</p>
                      </div>
                    )}

                    {mistake.rootCause && (
                      <div>
                        <p className="text-sm font-medium text-amber-500">Root Cause:</p>
                        <p className="text-sm text-muted-foreground">{mistake.rootCause}</p>
                      </div>
                    )}

                    {mistake.fixStrategy && (
                      <div>
                        <p className="text-sm font-medium text-green-500">Fix Strategy:</p>
                        <p className="text-sm text-muted-foreground">{mistake.fixStrategy}</p>
                      </div>
                    )}

                    {mistake.patternMissed && (
                      <Badge variant="outline" className="text-xs">
                        Pattern missed: {mistake.patternMissed}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    {!mistake.resolved && (
                      <Button variant="outline" size="sm" onClick={() => handleResolve(mistake.id)}>
                        <CheckCircle2 className="h-4 w-4 mr-1" /> Resolve
                      </Button>
                    )}
                    <Link href={`/dashboard/dsa/problems/${mistake.problemId}`}>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
