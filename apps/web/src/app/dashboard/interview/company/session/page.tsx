"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Send,
  Clock,
  ArrowLeft,
  ArrowRight,
  Bot,
  Loader2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { GlowCard } from "@/components/shared/glow-card"

interface Question {
  id: string
  questionText: string
  questionType: string
  category?: string
  difficulty: string
  orderIndex: number
}

interface Evaluation {
  technicalScore: number
  communicationScore: number
  confidenceScore: number
  overallScore: number
  feedback: string
  strengths: string[]
  improvements: string[]
}

interface Trend {
  trend: "improving" | "declining" | "stable"
  change: number
  suggestion: string
}

export default function CompanyInterviewSessionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("id")

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answer, setAnswer] = useState("")
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [evaluations, setEvaluations] = useState<Record<string, Evaluation>>({})
  const [isComplete, setIsComplete] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [cameraEnabled, setCameraEnabled] = useState(false)
  const [microphoneEnabled, setMicrophoneEnabled] = useState(false)
  const [trend, setTrend] = useState<Trend | null>(null)
  const [followUp, setFollowUp] = useState<string | null>(null)
  const [sessionData, setSessionData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    if (sessionId) {
      fetchSession()
    }
  }, [sessionId])

  useEffect(() => {
    textareaRef.current?.focus()
  }, [currentQuestionIndex])

  useEffect(() => {
    return () => {
      // Cleanup camera stream on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  async function fetchSession() {
    try {
      const token = localStorage.getItem("accessToken")
      const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1"
      const res = await fetch(`${base}/company-interviews/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      if (json.success) {
        setSessionData(json.session)
        setQuestions(json.session.questions || [])
        setCameraEnabled(json.session.cameraEnabled)
        setMicrophoneEnabled(json.session.microphoneEnabled)

        if (json.session.cameraEnabled) {
          startCamera()
        }
      } else {
        toast.error("Failed to load interview session")
        router.push("/dashboard/interview/company")
      }
    } catch {
      toast.error("Could not connect to server")
    } finally {
      setLoading(false)
    }
  }

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch {
      toast.error("Could not access camera")
    }
  }

  async function handleSubmit() {
    if (!answer.trim()) {
      toast.error("Please provide an answer")
      return
    }

    setIsSubmitting(true)

    const question = questions[currentQuestionIndex]
    if (!question) return

    try {
      const token = localStorage.getItem("accessToken")
      const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1"

      const res = await fetch(`${base}/company-interviews/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          questionId: question.id,
          answerText: answer.trim(),
          duration: 60, // Default 60 seconds
        }),
      })

      const json = await res.json()

      if (json.success) {
        // Save answer and evaluation
        setAnswers((prev) => ({ ...prev, [question.id]: answer.trim() }))
        setEvaluations((prev) => ({ ...prev, [question.id]: json.evaluation }))
        setTrend(json.trend)

        // Show follow-up if available
        if (json.followUpSuggestion) {
          setFollowUp(json.followUpSuggestion)
        }

        // Move to next question
        if (currentQuestionIndex < questions.length - 1) {
          setAnswer("")
          setFollowUp(null)
          setCurrentQuestionIndex((prev) => prev + 1)
        } else {
          // End interview
          await endInterview()
        }
      } else {
        toast.error(json.message || "Failed to submit answer")
      }
    } catch {
      toast.error("Could not connect to server")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function endInterview() {
    try {
      const token = localStorage.getItem("accessToken")
      const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1"

      await fetch(`${base}/company-interviews/${sessionId}/end`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      setIsComplete(true)
      toast.success("Interview complete! Generating your report...")
    } catch {
      // Report generation will retry
      setIsComplete(true)
    }
  }

  function handlePrevious() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
      const prevQuestion = questions[currentQuestionIndex - 1]
      setAnswer(answers[prevQuestion?.id] || "")
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0
  const difficulty = currentQuestion?.difficulty?.toLowerCase() || "medium"
  const currentEvaluation = currentQuestion ? evaluations[currentQuestion.id] : null

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="mx-auto size-8 animate-spin text-primary" />
          <p className="mt-4 text-sm text-muted-foreground">Loading interview...</p>
        </div>
      </div>
    )
  }

  if (isComplete) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-20 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          className="flex size-16 items-center justify-center rounded-full bg-success/10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        >
          <AlertCircle className="size-6 text-success" />
        </motion.div>
        <motion.h2
          className="mt-4 text-xl font-bold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Interview Complete!
        </motion.h2>
        <motion.p
          className="mt-2 text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Your answers have been evaluated. Generating your comprehensive report...
        </motion.p>
        <motion.div
          className="mt-6 flex gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button onClick={() => router.push("/dashboard/reports")} className="gap-2">
            View Report
          </Button>
          <Button variant="outline" onClick={() => router.push("/dashboard/interview/company")}>
            Practice Again
          </Button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Camera Feed */}
      {cameraEnabled && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed right-4 top-4 z-50"
        >
          <Card className="overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="size-40 object-cover"
            />
          </Card>
        </motion.div>
      )}

      {/* Header */}
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="size-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold">{sessionData?.company?.name || "Company"} Interview</h1>
          <p className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {cameraEnabled && (
            <Badge variant="outline" className="gap-1">
              <Video className="size-3" />
              Camera ON
            </Badge>
          )}
          <Badge variant="outline" className="gap-1">
            <Clock className="size-3" />
            In Progress
          </Badge>
          <Badge
            variant="outline"
            className={
              difficulty === "easy"
                ? "border-emerald-500/30 text-emerald-500"
                : difficulty === "hard"
                ? "border-rose-500/30 text-rose-500"
                : "border-amber-500/30 text-amber-500"
            }
          >
            {difficulty}
          </Badge>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="relative h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-brand"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Trend Indicator */}
      {trend && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-2 rounded-lg p-3 ${
            trend.trend === "improving"
              ? "bg-emerald-500/10 text-emerald-500"
              : trend.trend === "declining"
              ? "bg-rose-500/10 text-rose-500"
              : "bg-muted"
          }`}
        >
          {trend.trend === "improving" ? (
            <TrendingUp className="size-4" />
          ) : trend.trend === "declining" ? (
            <TrendingDown className="size-4" />
          ) : (
            <Minus className="size-4" />
          )}
          <span className="text-sm">{trend.suggestion}</span>
        </motion.div>
      )}

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
        >
          <GlowCard className="p-6" glowColor="rgba(120, 80, 240, 0.08)">
            <div className="flex items-start gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary">
                <Bot className="size-4 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{currentQuestion?.questionText}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {currentQuestion?.questionType}
                  </Badge>
                  {currentQuestion?.category && (
                    <Badge variant="outline" className="text-xs">
                      {currentQuestion.category}
                    </Badge>
                  )}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Answer in your own words. Be specific and provide examples.
                </p>
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </AnimatePresence>

      {/* Follow-up Suggestion */}
      {followUp && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-primary/20 bg-primary/5 p-4"
        >
          <div className="flex items-start gap-2">
            <Sparkles className="size-4 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Follow-up Question:</p>
              <p className="text-sm text-muted-foreground">{followUp}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Previous Evaluation */}
      {currentEvaluation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border bg-muted/30 p-4"
        >
          <p className="text-sm font-medium mb-2">Previous Answer Feedback:</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{currentEvaluation.technicalScore}</p>
              <p className="text-xs text-muted-foreground">Technical</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{currentEvaluation.communicationScore}</p>
              <p className="text-xs text-muted-foreground">Communication</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{currentEvaluation.overallScore}</p>
              <p className="text-xs text-muted-foreground">Overall</p>
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{currentEvaluation.feedback}</p>
        </motion.div>
      )}

      {/* Answer Input */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Button
            variant={isRecording ? "destructive" : "outline"}
            size="sm"
            className="gap-1.5"
            onClick={() => {
              setIsRecording(!isRecording)
              toast(isRecording ? "Recording stopped" : "Recording started...")
            }}
          >
            {isRecording ? <MicOff className="size-4" /> : <Mic className="size-4" />}
            {isRecording ? "Stop Recording" : "Record Answer"}
          </Button>
          <span className="text-xs text-muted-foreground">or type your answer below</span>
        </div>

        <Textarea
          ref={textareaRef}
          placeholder="Type your answer here..."
          className="min-h-32 resize-none"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <p className="text-xs text-muted-foreground text-right">
          {answer.length} characters · Press Enter to submit
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          disabled={currentQuestionIndex === 0}
          onClick={handlePrevious}
        >
          <ArrowLeft className="size-4 mr-1" />
          Previous
        </Button>
        <Button
          onClick={handleSubmit}
          className="gap-2"
          disabled={!answer.trim() || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Analyzing...
            </>
          ) : currentQuestionIndex === questions.length - 1 ? (
            <>
              Finish Interview
            </>
          ) : (
            <>
              Submit & Next
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
