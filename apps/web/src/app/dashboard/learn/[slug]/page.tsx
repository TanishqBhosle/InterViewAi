"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  ArrowLeft,
  Loader2,
  ChevronRight,
  CheckCircle2,
  Circle,
  PlayCircle,
  FileText,
  Brain,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiClient } from "@/lib/api-client";
import { MotionDiv, StaggerContainer, StaggerItem } from "@/components/shared/motion-div";

interface Subject {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  topics: TopicItem[];
}

interface TopicItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  order: number;
  _count: { subtopics: number };
}

interface ProgressItem {
  subtopic: { id: string; topicId: string };
  status: string;
  score: number | null;
}

const iconMap: Record<string, typeof BookOpen> = { BookOpen, FileText, Brain, BarChart3 };

export default function SubjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [subject, setSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<ProgressItem[]>([]);

  useEffect(() => {
    if (!slug) return;
    async function load() {
      setLoading(true);
      try {
        const [subData, progData] = await Promise.all([
          apiClient<Subject>(`/learning/subjects/${slug}`),
          apiClient<ProgressItem[]>(`/learning/progress?subjectSlug=${slug}`),
        ]);
        if (subData.success && subData.data) setSubject(subData.data);
        if (progData.success && progData.data) setProgress(progData.data);
      } catch {
        // offline
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/learn")}>
          <ArrowLeft className="mr-1 size-4" /> Back
        </Button>
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center py-20 text-center">
            <BookOpen className="size-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-base font-medium">Subject not found</h3>
          </CardContent>
        </Card>
      </div>
    );
  }

  const completedSubtopics = progress.filter((p) => p.status === "completed").length;
  const totalSubtopics = subject.topics.reduce((a, t) => a + t._count.subtopics, 0);
  const overallProgress = totalSubtopics > 0 ? Math.round((completedSubtopics / totalSubtopics) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Back nav */}
      <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/learn")}>
        <ArrowLeft className="mr-1 size-4" /> All Subjects
      </Button>

      {/* Subject header */}
      <MotionDiv>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{subject.title}</h1>
            <p className="mt-1 text-muted-foreground">{subject.description}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Badge variant="secondary" className="gap-1.5 px-3 py-1.5">
              <BookOpen className="size-3.5" />
              {totalSubtopics} subtopics
            </Badge>
          </div>
        </div>
        {totalSubtopics > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Overall progress</span>
              <span>{completedSubtopics}/{totalSubtopics} completed ({overallProgress}%)</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        )}
      </MotionDiv>

      {/* Topics */}
      <StaggerContainer className="space-y-3">
        {subject.topics.map((topic) => {
          const topicProgress = progress.filter((p) => {
            const progTopic = p.subtopic.topicId === topic.id;
            return progTopic;
          });
          const topicCompleted = topicProgress.filter((p) => p.status === "completed").length;
          const topicPct = topic._count.subtopics > 0
            ? Math.round((topicCompleted / topic._count.subtopics) * 100)
            : 0;

          return (
            <StaggerItem key={topic.id}>
              <Link href={`/dashboard/learn/${subject.slug}/${topic.slug}`}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="group cursor-pointer rounded-xl border border-border/50 bg-card p-4 transition-all duration-300 hover:shadow-md hover:border-primary/20"
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                      topicCompleted === topic._count.subtopics && topic._count.subtopics > 0
                        ? "bg-emerald-500/20 text-emerald-500"
                        : topicCompleted > 0
                        ? "bg-amber-500/20 text-amber-500"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {topicCompleted === topic._count.subtopics && topic._count.subtopics > 0 ? (
                        <CheckCircle2 className="size-5" />
                      ) : topicCompleted > 0 ? (
                        <BarChart3 className="size-5" />
                      ) : (
                        <FileText className="size-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold group-hover:text-primary transition-colors">
                        {topic.title}
                      </h3>
                      {topic.description && (
                        <p className="mt-0.5 text-sm text-muted-foreground line-clamp-1">
                          {topic.description}
                        </p>
                      )}
                      {topicProgress.length > 0 && (
                        <div className="mt-2 max-w-xs">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>{topicCompleted}/{topic._count.subtopics} completed</span>
                            <span>{topicPct}%</span>
                          </div>
                          <Progress value={topicPct} className="h-1" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-muted-foreground">{topic._count.subtopics} topics</span>
                      <ChevronRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </div>
  );
}
