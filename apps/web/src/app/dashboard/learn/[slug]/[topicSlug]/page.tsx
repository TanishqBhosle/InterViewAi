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
  Lock,
  FileText,
  PlayCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { apiClient } from "@/lib/api-client";
import { MotionDiv, StaggerContainer, StaggerItem } from "@/components/shared/motion-div";

interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
  subject: { slug: string; title: string };
  subtopics: SubtopicItem[];
}

interface SubtopicItem {
  id: string;
  slug: string;
  title: string;
  order: number;
  quiz: any[];
  codingChallenges: any[];
}

interface ProgressItem {
  subtopicId: string;
  status: string;
  score: number | null;
}

export default function TopicDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.topicSlug as string;
  const subjectSlug = params?.slug as string;
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<ProgressItem[]>([]);

  useEffect(() => {
    if (!slug) return;
    async function load() {
      setLoading(true);
      try {
        const data = await apiClient<Topic>(`/learning/topics/${slug}?subjectSlug=${subjectSlug}`);
        if (data.success && data.data) {
          setTopic(data.data);
          // Fetch progress for all subtopics
          const subIds = data.data.subtopics.map((s) => s.id).join(",");
          if (subIds) {
            const progData = await apiClient<ProgressItem[]>(`/learning/progress?subjectSlug=${subjectSlug}`);
            if (progData.success && progData.data) setProgress(progData.data);
          }
        }
      } catch {
        // offline
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug, subjectSlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={() => router.push(`/dashboard/learn/${subjectSlug}`)}>
          <ArrowLeft className="mr-1 size-4" /> Back
        </Button>
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center py-20 text-center">
            <BookOpen className="size-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-base font-medium">Topic not found</h3>
          </CardContent>
        </Card>
      </div>
    );
  }

  const completedSubtopics = progress.filter((p) => p.status === "completed").length;
  const totalSubtopics = topic.subtopics.length;

  return (
    <div className="space-y-6">
      {/* Back nav */}
      <Button variant="ghost" size="sm" onClick={() => router.push(`/dashboard/learn/${subjectSlug}`)}>
        <ArrowLeft className="mr-1 size-4" /> {topic.subject.title}
      </Button>

      {/* Topic header */}
      <MotionDiv>
        <h1 className="text-2xl font-bold tracking-tight">{topic.title}</h1>
        {topic.description && (
          <p className="mt-1 text-muted-foreground">{topic.description}</p>
        )}
        {totalSubtopics > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>{completedSubtopics}/{totalSubtopics} completed</span>
              <span>{Math.round((completedSubtopics / totalSubtopics) * 100)}%</span>
            </div>
            <Progress value={(completedSubtopics / totalSubtopics) * 100} className="h-2" />
          </div>
        )}
      </MotionDiv>

      {/* Subtopics */}
      <StaggerContainer className="space-y-2">
        {topic.subtopics.map((subtopic, index) => {
          const prog = progress.find((p) => p.subtopicId === subtopic.id);
          const status = prog?.status || "not_started";
          const score = prog?.score;

          return (
            <StaggerItem key={subtopic.id}>
              <Link
                href={`/dashboard/learn/${subjectSlug}/${topic.slug}/${subtopic.slug}`}
              >
                <motion.div
                  whileHover={{ x: 4 }}
                  className="group cursor-pointer rounded-xl border border-border/50 bg-card p-4 transition-all duration-300 hover:shadow-md hover:border-primary/20"
                >
                  <div className="flex items-center gap-4">
                    {/* Status icon */}
                    <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                      status === "completed"
                        ? "bg-emerald-500/20 text-emerald-500"
                        : status === "in_progress"
                        ? "bg-amber-500/20 text-amber-500"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {status === "completed" ? (
                        <CheckCircle2 className="size-5" />
                      ) : status === "in_progress" ? (
                        <PlayCircle className="size-5" />
                      ) : (
                        <Circle className="size-5" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">#{index + 1}</span>
                        <h3 className="text-base font-semibold group-hover:text-primary transition-colors">
                          {subtopic.title}
                        </h3>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-3 shrink-0">
                      {subtopic.quiz.length > 0 && (
                        <Badge variant="outline" className="text-xs gap-1">
                          {subtopic.quiz.length} quiz
                        </Badge>
                      )}
                      {subtopic.codingChallenges.length > 0 && (
                        <Badge variant="outline" className="text-xs gap-1">
                          {subtopic.codingChallenges.length} challenges
                        </Badge>
                      )}
                      {score != null && (
                        <Badge variant={score >= 80 ? "default" : "secondary"} className="text-xs">
                          {score}%
                        </Badge>
                      )}
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
