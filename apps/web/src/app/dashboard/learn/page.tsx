"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  FileCode,
  Palette,
  Atom,
  Server,
  Code2,
  Snail,
  Brain,
  Sparkles,
  Network,
  Layers,
  ArrowRight,
  Search,
  Loader2,
  GraduationCap,
  Trophy,
  Clock,
  CheckCircle2,
  BarChart3,
  X,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";
import { MotionDiv, StaggerContainer, StaggerItem } from "@/components/shared/motion-div";
import { useDebounce } from "@/hooks/use-debounce";

const iconMap: Record<string, typeof FileCode> = {
  FileCode,
  Palette,
  Atom,
  Server,
  Code2,
  Snail,
  Brain,
  Sparkles,
  Network,
  Layers,
  BookOpen,
};

const colorMap: Record<string, string> = {
  "text-orange-500": "from-orange-500/20 to-orange-600/10 border-orange-500/30",
  "text-blue-500": "from-blue-500/20 to-blue-600/10 border-blue-500/30",
  "text-cyan-500": "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30",
  "text-green-500": "from-green-500/20 to-green-600/10 border-green-500/30",
  "text-yellow-500": "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30",
  "text-purple-500": "from-purple-500/20 to-purple-600/10 border-purple-500/30",
  "text-pink-500": "from-pink-500/20 to-pink-600/10 border-pink-500/30",
  "text-red-500": "from-red-500/20 to-red-600/10 border-red-500/30",
  "text-teal-500": "from-teal-500/20 to-teal-600/10 border-teal-500/30",
  "text-indigo-500": "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30",
  "text-emerald-500": "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30",
};

interface Subject {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  _count: { topics: number };
}

interface ProgressItem {
  subtopic: {
    id: string;
    topicId: string;
    topic: { id: string; slug: string; title: string; subject: { id: string; slug: string } };
  };
  status: string;
}

interface SearchResult {
  subjects: ({ type: "subject" } & Subject)[];
  topics: ({ type: "topic"; subject: { slug: string; title: string } } & any)[];
  subtopics: ({ type: "subtopic"; topic: { slug: string; title: string; subject: { slug: string; title: string } } } & any)[];
}

export default function LearningHubPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [searching, setSearching] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    async function load() {
      try {
        const [subData, progData] = await Promise.all([
          apiClient<Subject[]>("/learning/subjects"),
          apiClient<ProgressItem[]>("/learning/progress"),
        ]);
        if (subData.success && subData.data) setSubjects(subData.data);
        if (progData.success && progData.data) setProgress(progData.data);
      } catch {
        // offline
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (!debouncedSearch || debouncedSearch.length < 2) {
      setSearchResults(null);
      return;
    }
    async function doSearch() {
      setSearching(true);
      try {
        const res = await apiClient<SearchResult>(`/learning/search?q=${encodeURIComponent(debouncedSearch)}`);
        if (res.success && res.data) setSearchResults(res.data);
      } catch { } finally {
        setSearching(false);
      }
    }
    doSearch();
  }, [debouncedSearch]);

  const filtered = subjects.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  const hasSearchResults = searchResults && (
    searchResults.subjects.length > 0 ||
    searchResults.topics.length > 0 ||
    searchResults.subtopics.length > 0
  );

  const completedCount = progress.filter((p) => p.status === "completed").length;
  const inProgressCount = progress.filter((p) => p.status === "in_progress").length;
  const totalSubtopics = subjects.reduce((acc, s) => acc + s._count.topics * 5, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <MotionDiv>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
                Learning Hub
              </span>
            </h1>
            <p className="text-muted-foreground">
              Master web development, backend, system design, ML, and more
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-xs">
              <GraduationCap className="size-3.5" />
              {completedCount} completed
            </Badge>
            <Badge variant="outline" className="gap-1.5 px-3 py-1.5 text-xs">
              <Clock className="size-3.5" />
              {inProgressCount} in progress
            </Badge>
          </div>
        </div>
      </MotionDiv>

      {/* Stats */}
      <StaggerContainer className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Subjects", value: subjects.length, icon: BookOpen, color: "from-violet-500 to-purple-500" },
          { label: "Topics", value: subjects.reduce((a, s) => a + s._count.topics, 0), icon: Layers, color: "from-blue-500 to-cyan-500" },
          { label: "Progress", value: `${Math.round((completedCount / Math.max(totalSubtopics, 1)) * 100)}%`, icon: Trophy, color: "from-amber-500 to-orange-500" },
        ].map((stat) => (
          <StaggerItem key={stat.label}>
            <Card className="border-border/50 bg-card/50">
              <CardContent className="flex items-center gap-4 p-4 sm:p-6">
                <div className={`flex size-10 items-center justify-center rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="size-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Search with global results */}
      <MotionDiv>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search subjects, topics, and more..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setShowSearch(true)}
              onBlur={() => setTimeout(() => setShowSearch(false), 200)}
            />
            {searching && (
              <Loader2 className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
            )}
            {search.length >= 2 && showSearch && (
              <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-80 overflow-y-auto rounded-xl border border-border/50 bg-background shadow-xl">
                {searching ? (
                  <div className="flex items-center justify-center py-6">
                    <Loader2 className="size-5 animate-spin text-muted-foreground" />
                  </div>
                ) : hasSearchResults ? (
                  <div className="p-2 space-y-1">
                    {searchResults!.subjects.length > 0 && (
                      <div>
                        <p className="px-2 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Subjects</p>
                        {searchResults!.subjects.map((s) => (
                          <Link key={s.slug} href={`/dashboard/learn/${s.slug}`}
                            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-muted transition-colors"
                          >
                            <BookOpen className="size-3.5 text-muted-foreground" />
                            <span>{s.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                    {searchResults!.topics.length > 0 && (
                      <div>
                        <p className="px-2 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mt-2">Topics</p>
                        {searchResults!.topics.map((t: any) => (
                          <Link key={t.id} href={`/dashboard/learn/${t.subject.slug}/${t.slug}`}
                            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-muted transition-colors"
                          >
                            <Layers className="size-3.5 text-muted-foreground" />
                            <span>{t.title}</span>
                            <span className="text-xs text-muted-foreground ml-auto">{t.subject.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                    {searchResults!.subtopics.length > 0 && (
                      <div>
                        <p className="px-2 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mt-2">Subtopics</p>
                        {searchResults!.subtopics.map((s: any) => (
                          <Link key={s.id} href={`/dashboard/learn/${s.topic.subject.slug}/${s.topic.slug}/${s.slug}`}
                            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-muted transition-colors"
                          >
                            <ChevronRight className="size-3.5 text-muted-foreground" />
                            <span>{s.title}</span>
                            <span className="text-xs text-muted-foreground ml-auto">{s.topic.subject.title} &middot; {s.topic.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-6 text-center">
                    <Search className="size-5 text-muted-foreground/50" />
                    <p className="mt-1 text-xs text-muted-foreground">No results found</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <Link href="/dashboard/learn/progress">
            <Button variant="outline" size="sm" className="gap-1.5 shrink-0">
              <BarChart3 className="size-3.5" /> Progress
            </Button>
          </Link>
        </div>
      </MotionDiv>

      {/* Subjects Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center py-20 text-center">
            <BookOpen className="size-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-base font-medium">No subjects found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {search ? "Try a different search term" : "No subjects available yet"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((subject) => {
            const Icon = iconMap[subject.icon] || BookOpen;
            const gradient = colorMap[subject.color] || "from-gray-500/20 to-gray-600/10 border-gray-500/30";
            const subjectProgress = progress.filter(
              (p) => p.subtopic.topic.subject.slug === subject.slug
            );
            const subCompleted = subjectProgress.filter((p) => p.status === "completed").length;
            const subTotal = Math.max(subjectProgress.length, 1);
            const progressPct = Math.round((subCompleted / subTotal) * 100);

            return (
              <StaggerItem key={subject.id}>
                <Link href={`/dashboard/learn/${subject.slug}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group cursor-pointer rounded-xl border border-border/50 bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/20"
                  >
                    <CardContent className="p-5">
                      <div className={`inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient}`}>
                        <Icon className={`size-6 ${subject.color}`} />
                      </div>
                      <h3 className="mt-4 text-base font-semibold group-hover:text-primary transition-colors">
                        {subject.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">
                        {subject.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {subject._count.topics} topics
                        </span>
                        <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                          Start learning <ArrowRight className="size-3" />
                        </span>
                      </div>
                      {subjectProgress.length > 0 && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                            <span>Progress</span>
                            <span>{progressPct}%</span>
                          </div>
                          <Progress value={progressPct} className="h-1.5" />
                        </div>
                      )}
                    </CardContent>
                  </motion.div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      )}
    </div>
  );
}
