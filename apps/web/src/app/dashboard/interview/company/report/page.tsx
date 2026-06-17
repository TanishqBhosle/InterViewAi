"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Download,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  BarChart3,
  Target,
  Calendar,
  Building2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"

interface Report {
  id: string
  overallScore: number
  technicalScore: number
  communicationScore: number
  confidenceScore: number
  behavioralScore?: number
  problemSolvingScore?: number
  leadershipScore?: number
  bodyLanguageScore?: number
  speechScore?: number
  strengths: string[]
  weaknesses: string[]
  criticalMistakes: any[]
  missedOpportunities: any[]
  recommendations: string[]
  detailedFeedback?: string
  hiringRecommendation?: string
  benchmarkPercentile?: number
  readinessScores: any
  improvementRoadmap: any
  questionReplay: any[]
  mistakeAnalysis: any
  session: {
    company: { name: string; industry: string }
    role: string
    experienceLevel: string
    createdAt: string
  }
}

export default function CompanyInterviewReportPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const reportId = searchParams.get("id")
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (reportId) {
      fetchReport()
    }
  }, [reportId])

  async function fetchReport() {
    try {
      const token = localStorage.getItem("accessToken")
      const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1"
      const res = await fetch(`${base}/company-interviews/report/${reportId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      if (json.success) {
        setReport(json.report)
      } else {
        toast.error("Failed to load report")
      }
    } catch {
      toast.error("Could not connect to server")
    } finally {
      setLoading(false)
    }
  }

  function getScoreColor(score: number): string {
    if (score >= 80) return "text-emerald-500"
    if (score >= 60) return "text-amber-500"
    return "text-rose-500"
  }

  function getRecommendationColor(rec: string): string {
    if (rec === "strong_hire") return "bg-emerald-500/20 text-emerald-500"
    if (rec === "hire") return "bg-emerald-500/10 text-emerald-500"
    if (rec === "lean_hire") return "bg-amber-500/10 text-amber-500"
    return "bg-rose-500/10 text-rose-500"
  }

  function formatRecommendation(rec: string): string {
    return rec?.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-sm text-muted-foreground">Loading report...</p>
        </div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Report not found</p>
        <Button className="mt-4" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Interview Report</h1>
            <p className="text-muted-foreground">
              {report.session.company.name} · {report.session.role}
            </p>
          </div>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="size-4" />
          Export Report
        </Button>
      </motion.div>

      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-brand/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Building2 className="size-5 text-primary" />
                  <Badge variant="outline">{report.session.company.industry}</Badge>
                </div>
                <h2 className="mt-2 text-3xl font-bold">{report.session.company.name}</h2>
                <p className="text-muted-foreground">
                  {report.session.role} · {report.session.experienceLevel}
                </p>
              </div>
              <div className="text-center">
                <div className={`text-6xl font-bold ${getScoreColor(report.overallScore)}`}>
                  {Math.round(report.overallScore)}
                </div>
                <p className="text-sm text-muted-foreground">Overall Score</p>
                {report.hiringRecommendation && (
                  <Badge className={`mt-2 ${getRecommendationColor(report.hiringRecommendation)}`}>
                    {formatRecommendation(report.hiringRecommendation)}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Score Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Technical", score: report.technicalScore, icon: Target },
            { label: "Communication", score: report.communicationScore, icon: BarChart3 },
            { label: "Confidence", score: report.confidenceScore, icon: TrendingUp },
            { label: "Problem Solving", score: report.problemSolvingScore || 0, icon: CheckCircle2 },
          ].map((item, i) => (
            <Card key={item.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <item.icon className="size-4 text-muted-foreground" />
                  <span className={`text-2xl font-bold ${getScoreColor(item.score)}`}>
                    {Math.round(item.score)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
                <Progress value={item.score} className="mt-2 h-1" />
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="mistakes">Mistakes</TabsTrigger>
          <TabsTrigger value="replay">Replay</TabsTrigger>
          <TabsTrigger value="roadmap">Improvement</TabsTrigger>
          <TabsTrigger value="benchmark">Benchmark</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Strengths & Weaknesses */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-500">
                  <CheckCircle2 className="size-5" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {(report.strengths || []).map((strength, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="size-4 text-emerald-500 mt-0.5 shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-rose-500">
                  <AlertTriangle className="size-5" />
                  Weaknesses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {(report.weaknesses || []).map((weakness, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <XCircle className="size-4 text-rose-500 mt-0.5 shrink-0" />
                      {weakness}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {(report.recommendations || []).map((rec, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="font-bold text-primary">{i + 1}.</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Detailed Feedback */}
          {report.detailedFeedback && (
            <Card>
              <CardHeader>
                <CardTitle>Detailed Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {report.detailedFeedback}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="mistakes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="size-5 text-amber-500" />
                Critical Mistakes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(report.criticalMistakes || []).length === 0 ? (
                <p className="text-sm text-muted-foreground">No critical mistakes identified.</p>
              ) : (
                <div className="space-y-4">
                  {(report.criticalMistakes || []).map((mistake: any, i: number) => (
                    <div key={i} className="rounded-lg border p-4">
                      <div className="flex items-center gap-2">
                        <Badge variant={mistake.severity === "critical" ? "destructive" : "outline"}>
                          {mistake.severity}
                        </Badge>
                        <span className="text-sm font-medium">{mistake.category}</span>
                      </div>
                      <p className="mt-2 text-sm">{mistake.mistake}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {mistake.interviewerPerception}
                      </p>
                      <div className="mt-3 rounded-md bg-muted/50 p-3">
                        <p className="text-xs font-medium text-primary">How to improve:</p>
                        <p className="text-xs text-muted-foreground">{mistake.howToImprove}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="replay" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Question Replay</CardTitle>
            </CardHeader>
            <CardContent>
              {(report.questionReplay || []).length === 0 ? (
                <p className="text-sm text-muted-foreground">No replay data available.</p>
              ) : (
                <div className="space-y-4">
                  {(report.questionReplay || []).map((item: any, i: number) => (
                    <div key={i} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{item.questionType}</Badge>
                        <span className={`font-bold ${getScoreColor(item.evaluation?.overallScore || 0)}`}>
                          {item.evaluation?.overallScore || "N/A"}/100
                        </span>
                      </div>
                      <p className="mt-2 font-medium">{item.question}</p>
                      <div className="mt-3 space-y-2">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Your Answer:</p>
                          <p className="text-sm">{item.userAnswer || "Not answered"}</p>
                        </div>
                        {item.idealAnswer && (
                          <div className="rounded-md bg-emerald-500/5 p-3">
                            <p className="text-xs font-medium text-emerald-500">Ideal Answer:</p>
                            <p className="text-sm text-muted-foreground">{item.idealAnswer}</p>
                          </div>
                        )}
                        {item.improvedAnswer && (
                          <div className="rounded-md bg-primary/5 p-3">
                            <p className="text-xs font-medium text-primary">Improved Answer:</p>
                            <p className="text-sm text-muted-foreground">{item.improvedAnswer}</p>
                          </div>
                        )}
                      </div>
                      {item.evaluation?.feedback && (
                        <p className="mt-2 text-xs text-muted-foreground">
                          Feedback: {item.evaluation.feedback}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="size-5" />
                Improvement Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              {report.improvementRoadmap ? (
                <div className="space-y-6">
                  {["day1", "day3", "day7", "day14", "day30"].map((day) => {
                    const plan = report.improvementRoadmap[day]
                    if (!plan) return null
                    return (
                      <div key={day} className="rounded-lg border p-4">
                        <h4 className="font-medium">{plan.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          Total Duration: {plan.totalDuration}
                        </p>
                        <ul className="mt-3 space-y-2">
                          {(plan.tasks || []).map((task: any, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                              <div>
                                <span className="font-medium">{task.task}</span>
                                <span className="text-muted-foreground"> ({task.duration})</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No roadmap available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benchmark" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Benchmark Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              {report.benchmarkPercentile ? (
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary">
                    {Math.round(report.benchmarkPercentile)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Percentile</p>
                  <p className="mt-2 text-sm">
                    You scored better than {Math.round(report.benchmarkPercentile)}% of candidates
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Benchmark data not available for this role/company.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Actions */}
      <motion.div
        className="flex justify-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button onClick={() => router.push("/dashboard/interview/company")}>
          Practice Again
        </Button>
        <Button variant="outline" onClick={() => router.push("/dashboard/reports")}>
          View All Reports
        </Button>
      </motion.div>
    </div>
  )
}
