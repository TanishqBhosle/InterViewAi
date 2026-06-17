"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ArrowLeft,
  Loader2,
  Lightbulb,
  GraduationCap,
  Eye,
  Code2,
  Briefcase,
  ClipboardList,
  FolderKanban,
  ExternalLink,
  StickyNote,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  RefreshCw,
  Trophy,
  XCircle,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { MotionDiv } from "@/components/shared/motion-div";

interface SubtopicContent {
  overview?: string;
  problemStatement?: string;
  intuitionFirst?: string;
  realLifeAnalogy?: string;
  visualExplanation?: string;
  howItWorks?: string;
  beginnerExample?: string;
  intermediateExample?: string;
  productionExample?: string;
  industryScenario?: string;
  interviewPerspective?: string;
  commonMistakes?: string;
  bestPractices?: string;
  performanceNotes?: string;
  securityNotes?: string;
  comparisonTable?: string;
  codingExamples?: string;
  visualFlow?: string;
  assignment?: string;
  miniProject?: string;
  realProject?: string;
  beginnerExplanation?: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

interface FaangQuestion {
  question: string;
  answer: string;
  difficulty: string;
  company?: string;
}

interface CodingChallenge {
  title: string;
  description: string;
  difficulty: string;
  starterCode?: string;
  solutionHint?: string;
}

interface NavigationItem {
  slug: string;
  title: string;
}

interface SubtopicData {
  id: string;
  slug: string;
  title: string;
  content: SubtopicContent;
  quiz: QuizQuestion[];
  faangQuestions: FaangQuestion[];
  codingChallenges: CodingChallenge[];
  userProgress: { status: string; score: number | null } | null;
  navigation: {
    prev: NavigationItem | null;
    next: NavigationItem | null;
  };
  topic: {
    slug: string;
    title: string;
    subject: { slug: string; title: string };
  };
}

interface UserNote {
  id?: string;
  content?: string;
}

// ============================================
// QUIZ COMPONENT
// ============================================
function QuizSection({
  quiz,
  subtopicId,
  onComplete,
}: {
  quiz: QuizQuestion[];
  subtopicId: string;
  onComplete: (score: number) => void;
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  interface QuizResult {
    correct: number;
    total: number;
    percentage: number;
    passed: boolean;
    results: { isCorrect: boolean; explanation: string; userAnswer: number; correctAnswer: number; questionIndex: number }[];
  }

  const handleSubmit = async () => {
    if (Object.keys(answers).length < quiz.length) {
      toast.error("Please answer all questions before submitting");
      return;
    }
    setSubmitting(true);
    try {
      const res = await apiClient<QuizResult>("/learning/quiz/submit", {
        method: "POST",
        body: JSON.stringify({ subtopicId, answers }),
      });
      if (res.success && res.data) {
        setResults(res.data);
        setSubmitted(true);
        onComplete(res.data.percentage);
      }
    } catch {
      toast.error("Failed to submit quiz");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted && results) {
    return (
      <div className="space-y-6">
        <Card className={results.passed ? "border-emerald-500/50" : "border-red-500/50"}>
          <CardContent className="flex flex-col items-center py-8 text-center">
            {results.passed ? (
              <Trophy className="size-12 text-emerald-500" />
            ) : (
              <XCircle className="size-12 text-red-500" />
            )}
            <h3 className="mt-4 text-xl font-bold">
              {results.passed ? "Congratulations!" : "Keep practicing!"}
            </h3>
            <p className="text-muted-foreground">
              You scored {results.correct}/{results.total} ({results.percentage}%)
            </p>
            {results.passed ? (
              <p className="text-sm text-emerald-500 mt-1">You passed! This topic is marked as completed.</p>
            ) : (
              <p className="text-sm text-muted-foreground mt-1">Review the answers below and try again.</p>
            )}
            <Button
              variant="outline"
              size="sm"
              className="mt-4 gap-1.5"
              onClick={() => { setSubmitted(false); setAnswers({}); setResults(null); }}
            >
              <RefreshCw className="size-3.5" /> Retry Quiz
            </Button>
          </CardContent>
        </Card>

        {results.results?.map((r: any, i: number) => (
          <Card key={i} className={r.isCorrect ? "border-emerald-500/30" : "border-red-500/30"}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {r.isCorrect ? (
                  <CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" />
                ) : (
                  <XCircle className="size-5 text-red-500 mt-0.5 shrink-0" />
                )}
                <div>
                  <p className="text-sm font-medium">{quiz[i]?.question}</p>
                  {!r.isCorrect && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Correct answer: {quiz[i]?.options[quiz[i]?.correctIndex]}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">{r.explanation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Answer all {quiz.length} questions to test your knowledge
        </p>
        <Badge variant="outline" className="text-xs">
          {Object.keys(answers).length}/{quiz.length} answered
        </Badge>
      </div>

      {quiz.map((q, idx) => (
        <Card key={q.id} className="border-border/50">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-start gap-2">
              <Badge variant="secondary" className="shrink-0 mt-0.5">
                Q{idx + 1}
              </Badge>
              <div>
                <p className="text-sm font-medium">{q.question}</p>
                <Badge variant="outline" className="text-[10px] mt-1">{q.difficulty}</Badge>
              </div>
            </div>
            <div className="space-y-2">
              {q.options.map((opt, optIdx) => {
                const selected = answers[idx] === optIdx;
                const isCorrect = submitted && optIdx === q.correctIndex;
                const isWrong = submitted && selected && !isCorrect;
                return (
                  <button
                    key={optIdx}
                    disabled={submitted}
                    onClick={() => setAnswers((a) => ({ ...a, [idx]: optIdx }))}
                    className={cn(
                      "w-full text-left rounded-lg border p-3 text-sm transition-all",
                      selected
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border/50 hover:border-border hover:bg-muted",
                      isCorrect && "border-emerald-500 bg-emerald-500/5 text-emerald-500",
                      isWrong && "border-red-500 bg-red-500/5 text-red-500"
                    )}
                  >
                    <span className="mr-2 text-muted-foreground">{String.fromCharCode(65 + optIdx)}.</span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        onClick={handleSubmit}
        disabled={submitting || Object.keys(answers).length < quiz.length}
        className="w-full gap-1.5"
      >
        {submitting ? <Loader2 className="size-4 animate-spin" /> : <ClipboardList className="size-4" />}
        Submit Quiz
      </Button>
    </div>
  );
}

// ============================================
// NOTES COMPONENT
// ============================================
function NotesSection({ subtopicId }: { subtopicId: string }) {
  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!subtopicId) return;
    async function load() {
      try {
        const res = await apiClient<UserNote>(`/learning/notes/${subtopicId}`);
        if (res.success && res.data?.content) {
          setNote(res.data.content);
          setSavedNote(res.data.content);
        }
      } catch { } finally {
        setLoading(false);
      }
    }
    load();
  }, [subtopicId]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiClient("/learning/notes", {
        method: "POST",
        body: JSON.stringify({ subtopicId, content: note }),
      });
      setSavedNote(note);
      toast.success("Note saved");
    } catch {
      toast.error("Failed to save note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center py-8"><Loader2 className="size-5 animate-spin" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {savedNote ? "Last saved: just now" : "Write your personal notes about this topic"}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          disabled={saving || note === savedNote}
          className="gap-1.5"
        >
          {saving ? <Loader2 className="size-3.5 animate-spin" /> : <StickyNote className="size-3.5" />}
          Save Notes
        </Button>
      </div>
      <Textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your notes here... What did you learn? What questions do you have?"
        className="min-h-[300px] resize-y"
      />
    </div>
  );
}

// ============================================
// MAIN SUBTOPIC DETAIL PAGE
// ============================================
export default function SubtopicDetailPage() {
  const params = useParams();
  const router = useRouter();
  const subtopicSlug = params?.subtopicSlug as string;
  const topicSlug = params?.topicSlug as string;
  const subjectSlug = params?.slug as string;

  const [data, setData] = useState<SubtopicData | null>(null);
  const [loading, setLoading] = useState(true);
  const [progressStatus, setProgressStatus] = useState<string>("not_started");
  const [progressScore, setProgressScore] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [aiMode, setAiMode] = useState<string | null>(null);

  const loadSubtopic = useCallback(async () => {
    if (!subtopicSlug || !topicSlug || !subjectSlug) return;
    setLoading(true);
    try {
      const subRes = await apiClient<SubtopicData>(`/learning/subtopics/by-slug/${subtopicSlug}?topicSlug=${topicSlug}&subjectSlug=${subjectSlug}`);
      if (subRes.success && subRes.data) {
        setData(subRes.data);
        setProgressStatus(subRes.data.userProgress?.status || "not_started");
        setProgressScore(subRes.data.userProgress?.score || null);
      }
    } catch { } finally {
      setLoading(false);
    }
  }, [subtopicSlug, topicSlug, subjectSlug]);

  useEffect(() => { loadSubtopic(); }, [loadSubtopic]);

  const markProgress = async (status: string) => {
    if (!data) return;
    try {
      await apiClient("/learning/progress", {
        method: "POST",
        body: JSON.stringify({ subtopicId: data.id, status }),
      });
      setProgressStatus(status);
      if (status === "in_progress") toast.success("Marked as in progress");
      if (status === "completed") toast.success("Marked as completed!");
    } catch {
      toast.error("Failed to update progress");
    }
  };

  const handleQuizComplete = (score: number) => {
    setProgressScore(score);
    if (score >= 80) setProgressStatus("completed");
    else setProgressStatus("in_progress");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={() => router.push(`/dashboard/learn/${subjectSlug}/${topicSlug}`)}>
          <ArrowLeft className="mr-1 size-4" /> Back
        </Button>
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center py-20 text-center">
            <BookOpen className="size-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-base font-medium">Subtopic not found</h3>
          </CardContent>
        </Card>
      </div>
    );
  }

  const c = data.content;
  const hasQuiz = data.quiz?.length > 0;
  const hasFAANG = data.faangQuestions?.length > 0;
  const hasChallenges = data.codingChallenges?.length > 0;

  const aiModes = [
    { key: "beginner", label: "Beginner" },
    { key: "intermediate", label: "Intermediate" },
    { key: "advanced", label: "Advanced" },
    { key: "expert", label: "Expert" },
    { key: "faang", label: "FAANG Interview" },
    { key: "kid10", label: "Teach like I'm 10" },
    { key: "kid5", label: "Teach like I'm 5" },
  ];

  const getAIExplanation = () => {
    if (!aiMode) return null;
    const modeLabels: Record<string, string> = {
      beginner: "Beginner-friendly explanation of this topic",
      intermediate: "Intermediate-level technical deep dive",
      advanced: "Advanced concepts and internal architecture",
      expert: "Expert-level systems thinking and trade-offs",
      faang: "FAANG interview-style explanation with focus on depth",
      kid10: "Explaining this topic as if teaching a 10-year-old",
      kid5: "Explaining this topic as if teaching a 5-year-old",
    };
    return modeLabels[aiMode] || null;
  };

  return (
    <div className="space-y-6">
      {/* Back nav */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => router.push(`/dashboard/learn/${subjectSlug}/${topicSlug}`)}>
          <ArrowLeft className="mr-1 size-4" /> {data.topic.title}
        </Button>

        <div className="flex items-center gap-2">
          {/* Progress actions */}
          {progressStatus === "not_started" && (
            <Button variant="outline" size="sm" onClick={() => markProgress("in_progress")} className="gap-1.5">
              <BookOpen className="size-3.5" /> Start Learning
            </Button>
          )}
          {progressStatus === "in_progress" && (
            <Button variant="outline" size="sm" onClick={() => markProgress("completed")} className="gap-1.5 text-emerald-500">
              <CheckCircle2 className="size-3.5" /> Mark Complete
            </Button>
          )}
          {progressStatus === "completed" && (
            <Badge variant="secondary" className="gap-1.5">
              <CheckCircle2 className="size-3.5" /> Completed {progressScore ? `(${progressScore}%)` : ""}
            </Badge>
          )}
        </div>
      </div>

      {/* Header */}
      <MotionDiv>
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <span>{data.topic.subject.title}</span>
            <ChevronDown className="size-3 -rotate-90" />
            <span>{data.topic.title}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{data.title}</h1>
        </div>
      </MotionDiv>

      {/* Navigation: Previous / Next Subtopic */}
      {data.navigation && (
        <div className="flex items-center justify-between gap-4">
          {data.navigation.prev ? (
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => router.push(`/dashboard/learn/${subjectSlug}/${topicSlug}/${data.navigation!.prev!.slug}`)}
            >
              <ChevronDown className="size-3.5 rotate-90" /> {data.navigation.prev.title}
            </Button>
          ) : <div />}
          {data.navigation.next ? (
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => router.push(`/dashboard/learn/${subjectSlug}/${topicSlug}/${data.navigation!.next!.slug}`)}
            >
              {data.navigation.next.title} <ChevronDown className="size-3.5 -rotate-90" />
            </Button>
          ) : <div />}
        </div>
      )}

      {/* AI Tutor Mode */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground mr-1 flex items-center gap-1">
          <Sparkles className="size-3.5 text-amber-500" /> Teach me as:
        </span>
        {aiModes.map((mode) => (
          <Button
            key={mode.key}
            variant={aiMode === mode.key ? "default" : "outline"}
            size="sm"
            className="text-xs h-7"
            onClick={() => setAiMode(aiMode === mode.key ? null : mode.key)}
          >
            {mode.label}
          </Button>
        ))}
      </div>

      {aiMode && (
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="size-5 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium">AI Tutor · {aiModes.find(m => m.key === aiMode)?.label} Mode</p>
                <p className="text-sm text-muted-foreground mt-1">{getAIExplanation()}</p>
                <p className="text-sm mt-2">
                  {c.beginnerExplanation || c.intuitionFirst || c.overview || "Content available after seeding."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress bar */}
      {progressStatus !== "not_started" && (
        <div className="flex items-center gap-3">
          <Progress
            value={progressStatus === "completed" ? 100 : 50}
            className="h-1.5 flex-1"
          />
          <span className="text-xs text-muted-foreground shrink-0">
            {progressStatus === "completed" ? "Completed" : "In Progress"}
          </span>
        </div>
      )}

      {/* 10 Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full overflow-x-auto flex-nowrap justify-start gap-0 bg-transparent p-0 h-auto">
          {[
            { id: "overview", label: "Overview", icon: BookOpen },
            { id: "theory", label: "Theory", icon: Lightbulb },
            { id: "visual", label: "Visual", icon: Eye },
            { id: "examples", label: "Examples", icon: Code2 },
            { id: "interview", label: "Interview", icon: Briefcase, badge: hasFAANG ? data.faangQuestions.length : undefined },
            { id: "quiz", label: "Quiz", icon: ClipboardList, badge: hasQuiz ? data.quiz.length : undefined },
            { id: "assignments", label: "Assignments", icon: GraduationCap },
            { id: "projects", label: "Projects", icon: FolderKanban },
            { id: "resources", label: "Resources", icon: ExternalLink },
            { id: "notes", label: "Notes", icon: StickyNote },
          ].map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="relative flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-none data-active:bg-transparent data-active:text-foreground data-active:after:opacity-100 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-foreground after:opacity-0"
            >
              <tab.icon className="size-3.5" />
              {tab.label}
              {tab.badge && (
                <Badge variant="secondary" className="text-[10px] px-1 h-4 ml-0.5">
                  {tab.badge}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* TAB 1: OVERVIEW */}
        <TabsContent value="overview" className="mt-6">
          <div className="space-y-6">
            {c.overview && (
              <Card className="border-border/50">
                <CardHeader><CardTitle className="text-lg">Overview</CardTitle></CardHeader>
                <CardContent><p className="text-sm leading-relaxed">{c.overview}</p></CardContent>
              </Card>
            )}
            {c.problemStatement && (
              <Card className="border-border/50">
                <CardHeader><CardTitle className="text-lg">Problem Statement</CardTitle></CardHeader>
                <CardContent><p className="text-sm leading-relaxed">{c.problemStatement}</p></CardContent>
              </Card>
            )}
            {c.intuitionFirst && (
              <Card className="border-border/50">
                <CardHeader><CardTitle className="text-lg">Intuition First</CardTitle></CardHeader>
                <CardContent><p className="text-sm leading-relaxed">{c.intuitionFirst}</p></CardContent>
              </Card>
            )}
            {c.realLifeAnalogy && (
              <Card className="border-amber-500/20 bg-amber-500/5">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="size-4 text-amber-500" />
                    <CardTitle className="text-sm">Real Life Analogy</CardTitle>
                  </div>
                </CardHeader>
                <CardContent><p className="text-sm leading-relaxed">{c.realLifeAnalogy}</p></CardContent>
              </Card>
            )}
            {c.industryScenario && (
              <Card className="border-border/50">
                <CardHeader><CardTitle className="text-lg">Industry Scenario</CardTitle></CardHeader>
                <CardContent><p className="text-sm leading-relaxed">{c.industryScenario}</p></CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* TAB 2: THEORY */}
        <TabsContent value="theory" className="mt-6">
          <div className="space-y-6">
            {c.howItWorks && (
              <Card className="border-border/50">
                <CardHeader><CardTitle className="text-lg">How It Works</CardTitle></CardHeader>
                <CardContent><p className="text-sm leading-relaxed">{c.howItWorks}</p></CardContent>
              </Card>
            )}
            {c.bestPractices && (
              <Card className="border-emerald-500/20 bg-emerald-500/5">
                <CardHeader><CardTitle className="text-lg">Best Practices</CardTitle></CardHeader>
                <CardContent><p className="text-sm leading-relaxed">{c.bestPractices}</p></CardContent>
              </Card>
            )}
            {c.commonMistakes && (
              <Card className="border-red-500/20 bg-red-500/5">
                <CardHeader><CardTitle className="text-lg">Common Mistakes</CardTitle></CardHeader>
                <CardContent><p className="text-sm leading-relaxed">{c.commonMistakes}</p></CardContent>
              </Card>
            )}
            {c.performanceNotes && (
              <Card className="border-border/50">
                <CardHeader><CardTitle className="text-lg">Performance Considerations</CardTitle></CardHeader>
                <CardContent><p className="text-sm leading-relaxed">{c.performanceNotes}</p></CardContent>
              </Card>
            )}
            {c.securityNotes && (
              <Card className="border-red-500/20 bg-red-500/5">
                <CardHeader><CardTitle className="text-lg">Security Considerations</CardTitle></CardHeader>
                <CardContent><p className="text-sm leading-relaxed">{c.securityNotes}</p></CardContent>
              </Card>
            )}
            {c.comparisonTable && (
              <Card className="border-border/50">
                <CardHeader><CardTitle className="text-lg">Comparison</CardTitle></CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <pre className="text-sm whitespace-pre-wrap font-sans">{c.comparisonTable}</pre>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* TAB 3: VISUAL */}
        <TabsContent value="visual" className="mt-6">
          <div className="space-y-6">
            {c.visualExplanation && (
              <Card className="border-border/50">
                <CardHeader><CardTitle className="text-lg">Visual Explanation</CardTitle></CardHeader>
                <CardContent><p className="text-sm leading-relaxed whitespace-pre-wrap font-mono bg-muted rounded-lg p-4">{c.visualExplanation}</p></CardContent>
              </Card>
            )}
            {c.visualFlow && (
              <Card className="border-border/50">
                <CardHeader><CardTitle className="text-lg">Visual Flow / Diagram</CardTitle></CardHeader>
                <CardContent><p className="text-sm leading-relaxed whitespace-pre-wrap font-mono bg-muted rounded-lg p-4">{c.visualFlow}</p></CardContent>
              </Card>
            )}
            {!c.visualExplanation && !c.visualFlow && (
              <Card className="border-border/50">
                <CardContent className="flex flex-col items-center py-12 text-center">
                  <Eye className="size-8 text-muted-foreground/50" />
                  <p className="mt-2 text-sm text-muted-foreground">Visual content coming soon</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* TAB 4: EXAMPLES */}
        <TabsContent value="examples" className="mt-6">
          <div className="space-y-6">
            {c.beginnerExample && (
              <Card className="border-border/50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Beginner</Badge>
                    <CardTitle className="text-lg">Simple Example</CardTitle>
                  </div>
                </CardHeader>
                <CardContent><pre className="text-sm whitespace-pre-wrap bg-muted rounded-lg p-4 overflow-x-auto">{c.beginnerExample}</pre></CardContent>
              </Card>
            )}
            {c.intermediateExample && (
              <Card className="border-border/50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Intermediate</Badge>
                    <CardTitle className="text-lg">Practical Example</CardTitle>
                  </div>
                </CardHeader>
                <CardContent><pre className="text-sm whitespace-pre-wrap bg-muted rounded-lg p-4 overflow-x-auto">{c.intermediateExample}</pre></CardContent>
              </Card>
            )}
            {c.productionExample && (
              <Card className="border-border/50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge>Production</Badge>
                    <CardTitle className="text-lg">Industry Example</CardTitle>
                  </div>
                </CardHeader>
                <CardContent><pre className="text-sm whitespace-pre-wrap bg-muted rounded-lg p-4 overflow-x-auto">{c.productionExample}</pre></CardContent>
              </Card>
            )}
            {c.codingExamples && (
              <Card className="border-border/50">
                <CardHeader><CardTitle className="text-lg">Code Examples</CardTitle></CardHeader>
                <CardContent><pre className="text-sm whitespace-pre-wrap bg-muted rounded-lg p-4 overflow-x-auto">{c.codingExamples}</pre></CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* TAB 5: INTERVIEW */}
        <TabsContent value="interview" className="mt-6">
          <div className="space-y-6">
            {c.interviewPerspective && (
              <Card className="border-border/50">
                <CardHeader><CardTitle className="text-lg">Interview Perspective</CardTitle></CardHeader>
                <CardContent><p className="text-sm leading-relaxed">{c.interviewPerspective}</p></CardContent>
              </Card>
            )}
            {hasFAANG ? (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">FAANG Interview Questions</h3>
                {data.faangQuestions.map((q, i) => (
                  <FAANGQuestionCard key={i} question={q} index={i} />
                ))}
              </div>
            ) : (
              <Card className="border-border/50">
                <CardContent className="flex flex-col items-center py-12 text-center">
                  <Briefcase className="size-8 text-muted-foreground/50" />
                  <p className="mt-2 text-sm text-muted-foreground">Interview questions coming soon</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* TAB 6: QUIZ */}
        <TabsContent value="quiz" className="mt-6">
          {hasQuiz ? (
            <QuizSection quiz={data.quiz} subtopicId={data.id} onComplete={handleQuizComplete} />
          ) : (
            <Card className="border-border/50">
              <CardContent className="flex flex-col items-center py-12 text-center">
                <ClipboardList className="size-8 text-muted-foreground/50" />
                <p className="mt-2 text-sm text-muted-foreground">Quiz questions coming soon</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* TAB 7: ASSIGNMENTS */}
        <TabsContent value="assignments" className="mt-6">
          <div className="space-y-6">
            {c.assignment && (
              <Card className="border-border/50">
                <CardHeader><CardTitle className="text-lg">Assignment</CardTitle></CardHeader>
                <CardContent><p className="text-sm leading-relaxed whitespace-pre-wrap">{c.assignment}</p></CardContent>
              </Card>
            )}
            {hasChallenges ? (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Coding Challenges</h3>
                {data.codingChallenges.map((ch, i) => (
                  <CodingChallengeCard key={i} challenge={ch} index={i} subtopicId={data.id} />
                ))}
              </div>
            ) : null}
            {!c.assignment && !hasChallenges && (
              <Card className="border-border/50">
                <CardContent className="flex flex-col items-center py-12 text-center">
                  <GraduationCap className="size-8 text-muted-foreground/50" />
                  <p className="mt-2 text-sm text-muted-foreground">Assignments coming soon</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* TAB 8: PROJECTS */}
        <TabsContent value="projects" className="mt-6">
          <div className="space-y-6">
            {c.miniProject && (
              <Card className="border-border/50">
                <CardHeader><CardTitle className="text-lg">Mini Project</CardTitle></CardHeader>
                <CardContent><p className="text-sm leading-relaxed whitespace-pre-wrap">{c.miniProject}</p></CardContent>
              </Card>
            )}
            {c.realProject && (
              <Card className="border-border/50">
                <CardHeader><CardTitle className="text-lg">Real Project</CardTitle></CardHeader>
                <CardContent><p className="text-sm leading-relaxed whitespace-pre-wrap">{c.realProject}</p></CardContent>
              </Card>
            )}
            {!c.miniProject && !c.realProject && (
              <Card className="border-border/50">
                <CardContent className="flex flex-col items-center py-12 text-center">
                  <FolderKanban className="size-8 text-muted-foreground/50" />
                  <p className="mt-2 text-sm text-muted-foreground">Projects coming soon</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* TAB 9: RESOURCES */}
        <TabsContent value="resources" className="mt-6">
          <div className="space-y-4">
            <Card className="border-border/50">
              <CardHeader><CardTitle className="text-lg">Related Concepts</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This topic is part of the <strong>{data.topic.title}</strong> section in <strong>{data.topic.subject.title}</strong>.
                  Make sure you understand the prerequisites before moving on, and practice with the coding challenges and quiz above.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardHeader><CardTitle className="text-lg">Advanced Concepts</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Once you master this topic, explore the next topics in this subject to build on your knowledge.
                  Use the AI Tutor mode above to get explanations at different levels of complexity.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* TAB 10: NOTES */}
        <TabsContent value="notes" className="mt-6">
          <NotesSection subtopicId={data.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ============================================
// CODING CHALLENGE CARD
// ============================================
function CodingChallengeCard({ challenge, index, subtopicId }: { challenge: CodingChallenge; index: number; subtopicId: string }) {
  const [code, setCode] = useState(challenge.starterCode || "");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast.error("Please write some code before submitting");
      return;
    }
    setSubmitting(true);
    try {
      const res = await apiClient("/learning/coding/submit", {
        method: "POST",
        body: JSON.stringify({
          subtopicId,
          challengeTitle: challenge.title,
          code,
          language: "javascript",
        }),
      });
      if (res.success && res.data) {
        setResult(res.data);
        toast.success("Solution evaluated!");
      }
    } catch {
      toast.error("Failed to evaluate solution");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="border-border/50">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="size-4 text-primary" />
            <h4 className="font-medium text-sm">{challenge.title}</h4>
          </div>
          <Badge variant="outline" className="text-xs">{challenge.difficulty}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{challenge.description}</p>

        {/* Code editor */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-muted-foreground">Your Solution</label>
            <span className="text-xs text-muted-foreground">{code.split("\n").length} lines</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full min-h-[150px] rounded-lg border border-border/60 bg-muted p-3 font-mono text-sm resize-y focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="// Write your solution here..."
            spellCheck={false}
          />
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={submitting || !code.trim()}
              className="gap-1.5"
            >
              {submitting ? <Loader2 className="size-3.5 animate-spin" /> : <Sparkles className="size-3.5" />}
              Evaluate Solution
            </Button>
            {challenge.starterCode && (
              <Button variant="ghost" size="sm" onClick={() => setCode(challenge.starterCode || "")}>
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Evaluation result */}
        {result && (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Evaluation Score</span>
              <Badge variant={result.score >= 70 ? "default" : "secondary"}>{result.score}/100</Badge>
            </div>
            {result.stats && (
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span>Lines: {result.stats.lines}</span>
                <span>Functions: {result.stats.hasFunctions ? "✓" : "✗"}</span>
                <span>Loops: {result.stats.hasLoops ? "✓" : "✗"}</span>
                <span>Conditionals: {result.stats.hasConditionals ? "✓" : "✗"}</span>
              </div>
            )}
            {result.feedback?.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Feedback:</p>
                {result.feedback.map((fb: string, i: number) => (
                  <p key={i} className="text-xs text-muted-foreground">• {fb}</p>
                ))}
              </div>
            )}
          </div>
        )}

        {challenge.solutionHint && !result && (
          <details className="group">
            <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">Solution hint</summary>
            <p className="text-xs text-muted-foreground mt-2">{challenge.solutionHint}</p>
          </details>
        )}
      </CardContent>
    </Card>
  );
}

// ============================================
// FAANG QUESTION CARD
// ============================================
function FAANGQuestionCard({ question, index }: { question: FaangQuestion; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Card className="border-border/50">
      <CardContent className="p-4">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-start justify-between text-left"
        >
          <div className="flex items-start gap-3 flex-1">
            <Badge variant="outline" className="shrink-0 mt-0.5">Q{index + 1}</Badge>
            <div className="flex-1">
              <p className="text-sm font-medium">{question.question}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-[10px]">{question.difficulty}</Badge>
                {question.company && (
                  <Badge variant="outline" className="text-[10px]">{question.company}</Badge>
                )}
              </div>
            </div>
          </div>
          {open ? <ChevronUp className="size-4 shrink-0 ml-2 text-muted-foreground" /> : <ChevronDown className="size-4 shrink-0 ml-2 text-muted-foreground" />}
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-border/50">
                <p className="text-sm text-muted-foreground leading-relaxed">{question.answer}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
