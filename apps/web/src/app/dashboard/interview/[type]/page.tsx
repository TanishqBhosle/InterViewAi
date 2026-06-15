"use client"

import { useState, useRef, useEffect } from "react"
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
  ChevronRight,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { GlowCard } from "@/components/shared/glow-card"

const questionBank: Record<string, string[]> = {
  hr: [
    "Tell me about yourself.",
    "Why do you want to work at our company?",
    "Where do you see yourself in 5 years?",
    "What are your strengths and weaknesses?",
    "Tell me about a time you faced a challenge and how you handled it.",
    "Why did you leave your previous job?",
    "How do you handle working under pressure?",
    "What makes you a good fit for this role?",
  ],
  technical: [
    "Explain the difference between REST and GraphQL.",
    "How does garbage collection work in JavaScript?",
    "Write a function to find the longest palindromic substring.",
    "Explain how you would design a URL shortening service.",
    "What is the Event Loop and how does it work?",
    "How would you optimize a slow database query?",
    "Explain microservices architecture.",
    "What is the difference between let, const, and var?",
  ],
  behavioral: [
    "Tell me about a time you led a team through a difficult project.",
    "Describe a situation where you had a conflict with a colleague.",
    "Tell me about a project that failed and what you learned.",
    "Describe a time you went above and beyond for a customer.",
    "How do you prioritize when you have multiple deadlines?",
    "Tell me about a time you had to learn a new technology quickly.",
    "Describe a situation where you influenced someone's opinion.",
    "Tell me about a time you made a mistake and how you handled it.",
  ],
}

const typeLabels: Record<string, string> = {
  hr: "HR Interview",
  technical: "Technical Interview",
  behavioral: "Behavioral Interview",
  "system-design": "System Design Interview",
  product: "Product Management Interview",
}

type Difficulty = "easy" | "medium" | "hard"

const questionDifficulty: Difficulty[] = [
  "easy", "easy", "medium", "medium", "medium", "hard", "hard", "hard",
]

export default function InterviewSessionPage() {
  const params = useParams()
  const router = useRouter()
  const type = params.type as string
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answer, setAnswer] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [answers] = useState<string[]>([])
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const questions = questionBank[type] || questionBank.hr

  useEffect(() => {
    textareaRef.current?.focus()
  }, [currentQuestion])

  async function handleSubmit() {
    if (!answer.trim()) {
      toast.error("Please provide an answer")
      return
    }

    setIsThinking(true)
    await new Promise((r) => setTimeout(r, 800))
    setIsThinking(false)

    if (currentQuestion < questions.length - 1) {
      setAnswer("")
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setIsComplete(true)
      toast.success("Interview complete! Generating your report...")
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const difficulty = questionDifficulty[currentQuestion]

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
            <Button
              variant="outline"
              onClick={() => {
                setCurrentQuestion(0)
                setAnswer("")
                setIsComplete(false)
              }}
            >
              Practice Again
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
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
            Question {currentQuestion + 1} of {questions.length}
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
              : difficulty === "medium"
              ? "border-amber-500/30 text-amber-500"
              : "border-rose-500/30 text-rose-500"
          }
        >
          {difficulty}
        </Badge>
      </motion.div>

      {/* Progress bar */}
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

      {/* Question */}
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
                <p className="text-sm font-medium">{questions[currentQuestion]}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Answer in your own words. Be specific and provide examples.
                </p>
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </AnimatePresence>

      {/* Answer Input */}
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
          {answer.length} characters · Press Enter to submit
        </p>
      </motion.div>

      {/* Actions */}
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
          onClick={() => {
            setCurrentQuestion((prev) => prev - 1)
            setAnswer(answers[currentQuestion - 1] || "")
          }}
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
            ) : currentQuestion === questions.length - 1 ? (
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
