"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { MotionDiv, StaggerContainer, StaggerItem } from "@/components/shared/motion-div";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api-client";
import { useDebounce } from "@/hooks/use-debounce";
import { Search, Filter, CheckCircle2, Clock, ChevronRight, X } from "lucide-react";

interface Problem {
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
  pattern: { slug: string; name: string; color: string } | null;
}

export default function DSAProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [tier, setTier] = useState("all");
  const [status, setStatus] = useState("all");
  const debouncedSearch = useDebounce(search, 300);

  const fetchProblems = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (debouncedSearch) params.set("search", debouncedSearch);
      if (difficulty !== "all") params.set("difficulty", difficulty);
      if (tier !== "all") params.set("tier", tier);

      const res = await apiClient<Problem[]>(`/dsa/problems?${params.toString()}`);
      if (res.success && res.data) {
        let filtered = res.data;
        if (status !== "all") {
          filtered = filtered.filter((p) => p.userStatus === status);
        }
        setProblems(filtered);
      }
    } catch {} finally {
      setLoading(false);
    }
  }, [debouncedSearch, difficulty, tier, status]);

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  const tierLabels: Record<number, string> = { 1: "Must Solve", 2: "Pattern", 3: "Company", 4: "FAANG" };
  const tierColors: Record<number, string> = { 1: "bg-green-500/10 text-green-500", 2: "bg-blue-500/10 text-blue-500", 3: "bg-amber-500/10 text-amber-500", 4: "bg-red-500/10 text-red-500" };

  const stats = {
    total: problems.length,
    solved: problems.filter((p) => p.userStatus === "SOLVED" || p.userStatus === "MASTERED").length,
    attempted: problems.filter((p) => p.userStatus === "ATTEMPTED").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Problems</h1>
        <p className="text-muted-foreground">Browse and solve DSA problems</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search problems..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
          {search && (
            <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6" onClick={() => setSearch("")}>
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
        <Select value={difficulty} onValueChange={(v) => setDifficulty(v || "all")}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="EASY">Easy</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="HARD">Hard</SelectItem>
          </SelectContent>
        </Select>
        <Select value={tier} onValueChange={(v) => setTier(v || "all")}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Tier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tiers</SelectItem>
            <SelectItem value="1">Tier 1: Must Solve</SelectItem>
            <SelectItem value="2">Tier 2: Pattern</SelectItem>
            <SelectItem value="3">Tier 3: Company</SelectItem>
            <SelectItem value="4">Tier 4: FAANG</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={(v) => setStatus(v || "all")}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="NOT_STARTED">Not Started</SelectItem>
            <SelectItem value="ATTEMPTED">Attempted</SelectItem>
            <SelectItem value="SOLVED">Solved</SelectItem>
            <SelectItem value="MASTERED">Mastered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4 text-sm text-muted-foreground">
        <span>{stats.total} problems</span>
        <span className="text-green-500">{stats.solved} solved</span>
        <span className="text-yellow-500">{stats.attempted} attempted</span>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      ) : (
        <StaggerContainer className="space-y-3">
          {problems.map((problem) => (
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
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Badge variant={problem.difficulty === "EASY" ? "default" : problem.difficulty === "MEDIUM" ? "secondary" : "destructive"} className="text-xs">
                          {problem.difficulty}
                        </Badge>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${tierColors[problem.tier]}`}>
                          {tierLabels[problem.tier]}
                        </span>
                        {problem.pattern && (
                          <Badge variant="outline" className="text-xs" style={{ borderColor: problem.pattern.color }}>
                            {problem.pattern.name}
                          </Badge>
                        )}
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
          {problems.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No problems found matching your filters
            </div>
          )}
        </StaggerContainer>
      )}
    </div>
  );
}
