"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api-client";
import { ArrowLeft, CheckCircle2, Clock, ChevronRight, ExternalLink, Trophy } from "lucide-react";

interface CompanyDetail {
  id: string;
  slug: string;
  name: string;
  description: string;
  problemCount: number;
  avgDifficulty: string;
  strategy: string;
  problems: Array<{
    id: string;
    leetcodeId: number;
    title: string;
    slug: string;
    difficulty: string;
    tier: number;
    order: number;
    frequency: number;
    userStatus: string;
    pattern: { slug: string; name: string; color: string } | null;
  }>;
}

export default   function DSACompanyDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [track, setTrack] = useState<CompanyDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient<CompanyDetail>(`/dsa/companies/${slug}`);
        if (res.success && res.data) setTrack(res.data);
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
      </div>
    );
  }

  if (!track) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">Track not found</h2>
        <Link href="/dsa/companies">
          <Button variant="link" className="mt-2">Back to Companies</Button>
        </Link>
      </div>
    );
  }

  const solvedCount = track.problems.filter((p) => p.userStatus === "SOLVED" || p.userStatus === "MASTERED").length;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/dsa/companies">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{track.name}</h1>
          <p className="text-muted-foreground">{track.description}</p>
        </div>
      </div>

      <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">{solvedCount}/{track.problems.length} solved</span>
          </div>
          <Progress value={track.problems.length > 0 ? (solvedCount / track.problems.length) * 100 : 0} className="h-2" />
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Interview Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{track.strategy}</p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4">Problems ({track.problems.length})</h2>
        <div className="space-y-3">
          {track.problems.map((problem) => (
            <Link key={problem.id} href={`/dsa/problems/${problem.id}`}>
              <Card className="border-border/30 hover:border-primary/50 transition-all cursor-pointer group">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 text-center">
                    <span className="text-sm font-medium text-muted-foreground">#{problem.order + 1}</span>
                  </div>
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
                      {problem.pattern && (
                        <Badge variant="outline" className="text-xs" style={{ borderColor: problem.pattern.color }}>
                          {problem.pattern.name}
                        </Badge>
                      )}
                      {problem.frequency > 0 && (
                        <span className="text-xs text-muted-foreground">Asked {problem.frequency} times</span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
