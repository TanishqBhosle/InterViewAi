"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MotionDiv, StaggerContainer, StaggerItem } from "@/components/shared/motion-div";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api-client";
import { BookOpen, ChevronRight, Code2, BarChart3, Search, Network, Zap } from "lucide-react";

const phaseInfo: Record<string, { name: string; description: string; icon: any; color: string }> = {
  FOUNDATIONS: { name: "Phase 1: Foundations", description: "Arrays, Strings, Complexity, Math", icon: BookOpen, color: "text-blue-500" },
  LINEAR_PATTERNS: { name: "Phase 2: Linear Patterns", description: "Hashing, Prefix Sum, Two Pointers, Sliding Window", icon: Code2, color: "text-purple-500" },
  SEARCHING: { name: "Phase 3: Searching", description: "Binary Search, Sorting, Heap", icon: Search, color: "text-red-500" },
  HIERARCHICAL: { name: "Phase 4: Hierarchical", description: "Linked List, Stack, Queue, Tree, BST, DFS, BFS", icon: Network, color: "text-green-500" },
  ADVANCED: { name: "Phase 5: Advanced", description: "Graphs, Backtracking, Trie, Union Find, Topological Sort", icon: BarChart3, color: "text-amber-500" },
  OPTIMIZATION: { name: "Phase 6: Optimization", description: "Greedy, DP, Bit Manipulation, Segment Tree", icon: Zap, color: "text-cyan-500" },
};

const phaseOrder = ["FOUNDATIONS", "LINEAR_PATTERNS", "SEARCHING", "HIERARCHICAL", "ADVANCED", "OPTIMIZATION"];

interface Pattern {
  id: string;
  slug: string;
  name: string;
  description: string;
  phase: string;
  icon: string;
  color: string;
  _count: { problems: number };
}

export default function DSACurriculumPage() {
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient<Pattern[]>("/dsa/patterns");
        if (res.success && res.data) setPatterns(res.data);
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
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
    );
  }

  const groupedPatterns = phaseOrder.map((phase) => ({
    phase,
    info: phaseInfo[phase],
    patterns: patterns.filter((p) => p.phase === phase),
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">DSA Curriculum</h1>
        <p className="text-muted-foreground">
          Structured learning path from foundations to advanced optimization
        </p>
      </div>

      <div className="space-y-8">
        {groupedPatterns.map(({ phase, info, patterns: phasePatterns }) => {
          const Icon = info.icon;
          const totalProblems = phasePatterns.reduce((sum, p) => sum + p._count.problems, 0);

          return (
            <StaggerItem key={phase}>
              <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-muted ${info.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle>{info.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                    <Badge variant="secondary" className="ml-auto">
                      {totalProblems} problems
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {phasePatterns.map((pattern) => (
                      <Link key={pattern.id} href={`/dsa/patterns/${pattern.slug}`}>
                        <Card className="border-border/30 hover:border-primary/50 transition-all cursor-pointer group hover:shadow-lg hover:shadow-primary/5">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pattern.color }} />
                                <h3 className="font-medium group-hover:text-primary transition-colors">
                                  {pattern.name}
                                </h3>
                              </div>
                              <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                            </div>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                              {pattern.description}
                            </p>
                            <div className="mt-3 flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {pattern._count.problems} problems
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          );
        })}
      </div>
    </div>
  );
}
