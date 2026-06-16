"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { BookOpen, ArrowLeft, Lock, ExternalLink, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";

interface Resource {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  company: string | null;
  difficulty: string;
  isPremium: boolean;
  viewCount: number;
  tags: string[];
}

const categoryLabels: Record<string, string> = {
  "interview-questions": "Interview Questions",
  dsa: "DSA Guides",
  "system-design": "System Design",
  companies: "Company Guides",
};

const categoryMap: Record<string, string> = {
  "interview-questions": "interview_questions",
  dsa: "dsa",
  "system-design": "system_design",
  companies: "company_guides",
};

export default function LearningCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string[] | undefined;
  const categorySlug = slug?.[0] || "";
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const cat = categoryMap[categorySlug];
        const endpoint = cat ? `/learning/resources?category=${cat}` : "/learning/resources";
        const data = await apiClient<Resource[]>(endpoint);
        if (data.success && data.data) {
          setResources(data.data);
        }
      } catch {
        // No resources yet
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [categorySlug]);

  const filtered = resources.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  const label = categoryLabels[categorySlug] || "Resources";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard/learn")}>
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{label}</h1>
          <p className="text-muted-foreground">Browse study materials and guides</p>
        </div>
      </div>

      <div className="relative w-full sm:w-72">
        <input
          placeholder="Search resources..."
          className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-20 text-center">
            <BookOpen className="size-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-base font-medium">No resources found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {search ? "Try a different search term" : "No resources available in this category yet"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((r) => (
            <Card key={r.id} className="border-border/50">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{r.title}</span>
                    {r.isPremium && <Lock className="size-3 text-amber-500" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {r.company || r.category.replace("_", " ")} &middot; {r.difficulty.toLowerCase()}
                  </p>
                </div>
                <Badge variant={r.isPremium ? "secondary" : "outline"} className="text-xs">
                  {r.isPremium ? "Premium" : "Free"}
                </Badge>
                <Button variant="ghost" size="icon" className="size-8">
                  <ExternalLink className="size-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
