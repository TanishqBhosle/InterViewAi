"use client";

import { useState, useEffect } from "react";
import { BookOpen, Code, Network, Building2, ExternalLink, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";

interface Resource {
  id: string;
  title: string;
  category: string;
  company: string | null;
  isPremium: boolean;
  viewCount: number;
}

const categories = [
  {
    title: "Interview Questions",
    description: "Curated questions by company and role",
    icon: BookOpen,
    count: "0+",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    href: "/dashboard/learn/interview-questions",
    cat: "interview_questions",
  },
  {
    title: "DSA Guides",
    description: "Data structures & algorithms mastery",
    icon: Code,
    count: "0+",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    href: "/dashboard/learn/dsa",
    cat: "dsa",
  },
  {
    title: "System Design",
    description: "Architecture & design patterns",
    icon: Network,
    count: "0+",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    href: "/dashboard/learn/system-design",
    cat: "system_design",
  },
  {
    title: "Company Guides",
    description: "Company-specific preparation guides",
    icon: Building2,
    count: "0+",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    href: "/dashboard/learn/companies",
    cat: "company_guides",
  },
];

export default function LearningPage() {
  const [popularResources, setPopularResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    async function load() {
      try {
        const data = await apiClient<Resource[]>("/learning/resources");
        if (data.success && data.data) {
          setPopularResources(data.data.slice(0, 6));
          const catCounts: Record<string, number> = {};
          for (const r of data.data) {
            catCounts[r.category] = (catCounts[r.category] || 0) + 1;
          }
          setCounts(catCounts);
        }
      } catch {
        // Use defaults
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Learning Hub</h1>
        <p className="text-muted-foreground">Access interview questions, guides, and resources</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <Link key={cat.title} href={cat.href}>
            <Card className="group cursor-pointer border-border/50 bg-card/50 transition-all hover:border-primary/20 hover:bg-card hover:shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className={`inline-flex size-10 items-center justify-center rounded-lg ${cat.bg}`}>
                  <cat.icon className={`size-5 ${cat.color}`} />
                </div>
                <h3 className="mt-3 text-sm font-semibold">{cat.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{cat.description}</p>
                <p className="mt-2 text-xs font-medium text-primary">
                  {loading ? "..." : `${counts[cat.cat] || 0}+`} resources
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Popular Resources</CardTitle>
          <CardDescription>Most accessed study materials</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="size-5 animate-spin text-muted-foreground" />
            </div>
          ) : popularResources.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-center">
              <BookOpen className="size-8 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">No resources available yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {popularResources.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center gap-3 rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{r.title}</span>
                      {r.isPremium && <Lock className="size-3 text-amber-500" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{r.company || r.category.replace("_", " ")}</p>
                  </div>
                  <Badge variant={r.isPremium ? "secondary" : "outline"} className="text-xs">
                    {r.isPremium ? "Premium" : "Free"}
                  </Badge>
                  <Button variant="ghost" size="icon" className="size-8">
                    <ExternalLink className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}