"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mic,
  Square,
  Send,
  Clock,
  AlertCircle,
  ArrowLeft,
  Bot,
  Loader2,
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
  orderIndex: number
  difficulty: string
}

const typeLabels: Record<string, string> = {
  hr: "HR Interview",
  technical: "Technical Interview",
  behavioral: "Behavioral Interview",
  "system-design": "System Design Interview",
  product: "Product Management Interview",
}

export default function InterviewSessionPage() {
  const params = useParams()
  const router = useRouter()
  const type = params.type as string
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answer, setAnswer] = useState("")
  const [answers, setAnswers] = useState<string[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [interviewId, setInterviewId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    async function init() {
      try {
        const token = localStorage.getItem("accessToken")
        const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1"
        const role = type === "company" ? "General" : typeLabels[type] || "General"
        const res = await fetch(`${base}/interviews/start`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role, type, difficulty: "MEDIUM", count: 8 }),
        })
        const json = await res.json()
        if (json.success) {
          setInterviewId(json.interviewId)
          setQuestions(json.questions || [])
        } else {
          toast.error("Failed to start interview")
        }
      } catch {
        toast.error("Could not connect to server")
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [type])

  useEffect(() => {
    textareaRef.current?.focus()
  }, [currentQuestion, questions])

  async function handleSubmit() {
    if (!answer.trim()) {
      toast.error("Please provide an answer")
      return
    }

    setIsThinking(true)

    const question = questions[currentQuestion]
    if (interviewId && question) {
      try {
        const token = localStorage.getItem("accessToken")
        const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1"
        await fetch(`${base}/interviews/answer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ questionId: question.id, answerText: answer.trim() }),
        })
      } catch {
        // Answer saved locally even if API fails
      }
    }

    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer.trim()
    setAnswers(newAnswers)

    setIsThinking(false)

    if (currentQuestion < questions.length - 1) {
      setAnswer("")
      setCurrentQuestion((prev) => prev + 1)
    } else {
      if (interviewId) {
        try {
          const token = localStorage.getItem("accessToken")
        const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1"
        await fetch(`${base}/interviews/${interviewId}/end`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        } catch {
          // Report generation will retry
        }
      }
      setIsComplete(true)
      toast.success("Interview complete! Generating your report...")
    }
  }

  function handlePrevious() {
    if (currentQuestion > 0) {
      const prev = currentQuestion - 1
      setCurrentQuestion(prev)
      setAnswer(answers[prev] || "")
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const safeQuestions = questions.length > 0 ? questions : []
  const progress = safeQuestions.length > 0
    ? ((currentQuestion + 1) / safeQuestions.length) * 100
    : 0
  const currentQ = safeQuestions[currentQuestion]
  const difficulty = currentQ?.difficulty?.toLowerCase() || "medium"

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="mx-auto size-8 animate-spin text-primary" />
          <p className="mt-4 text-sm text-muted-foreground">Starting your interview...</p>
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
        transition={{ duration: 0.5 }}
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
          Your answers have been submitted for AI evaluation.
        </motion.p>
        <motion.div
          className="mt-6 flex gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button onClick={() => router.push("/dashboard/reports")} className="gap-2">
              View Report
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button variant="outline" onClick={() => router.push("/dashboard/interviews")}>
              Practice Again
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h1 className="text-xl font-bold">
            {typeLabels[type] || "Mock Interview"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {safeQuestions.length}
          </p>
        </div>
        <Badge variant="outline" className="ml-auto gap-1">
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
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="relative h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-brand"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <GlowCard className="p-6" glowColor="rgba(120, 80, 240, 0.08)">
            <div className="flex items-start gap-3">
              <motion.div
                className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary"
                whileHover={{ scale: 1.05 }}
              >
                <Bot className="size-4 text-primary-foreground" />
              </motion.div>
              <div>
                <p className="text-sm font-medium">{currentQ?.questionText || "Loading question..."}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Answer in your own words. Be specific and provide examples.
                </p>
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant={isRecording ? "destructive" : "outline"}
              size="sm"
              className="gap-1.5"
              onClick={() => {
                setIsRecording(!isRecording)
                toast(isRecording ? "Recording stopped" : "Recording started...")
              }}
            >
              <motion.div
                animate={isRecording ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Mic className="size-4" />
              </motion.div>
              {isRecording ? "Stop Recording" : "Record Answer"}
            </Button>
          </motion.div>
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
          {answer.length} characters &middot; Press Enter to submit
        </p>
      </motion.div>

      <motion.div
        className="flex justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          variant="outline"
          size="sm"
          disabled={currentQuestion === 0}
          onClick={handlePrevious}
        >
          Previous
        </Button>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleSubmit}
            className="gap-2"
            disabled={!answer.trim() || isThinking}
          >
            {isThinking ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Analyzing...
              </>
            ) : currentQuestion === safeQuestions.length - 1 ? (
              <>
                Finish Interview <Square className="size-4" />
              </>
            ) : (
              <>
                Submit & Next <Send className="size-4" />
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}