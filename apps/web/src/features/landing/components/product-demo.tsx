"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, User, Sparkles, BarChart3, Mic, Brain, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { MotionDiv } from "@/components/shared/motion-div"
import { GlowCard } from "@/components/shared/glow-card"

const demoSteps = [
  {
    id: "question",
    label: "AI Asks Question",
    icon: Bot,
    content: (
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
            AI
          </div>
          <div className="rounded-xl bg-background/80 p-4 text-left text-sm border border-border/50">
            <p className="font-medium text-foreground">
              Describe a time you had to lead a team through a difficult situation. What was your approach?
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Behavioral Question · Medium Difficulty
            </p>
          </div>
        </div>
        <motion.div
          className="flex items-center gap-2 text-xs text-muted-foreground"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="size-1.5 rounded-full bg-primary" />
          AI is analyzing question relevance...
        </motion.div>
      </div>
    ),
  },
  {
    id: "answer",
    label: "Your Response",
    icon: User,
    content: (
      <div className="space-y-4">
        <div className="flex items-start justify-end gap-3">
          <div className="rounded-xl bg-primary/10 p-4 text-left text-sm border border-primary/20 max-w-[80%]">
            <p className="text-foreground">
              In my previous role as a tech lead, our team faced a critical production outage during a major release. I immediately organized a war room, delegated debugging tasks based on expertise, and maintained clear communication with stakeholders. We resolved the issue in 2 hours and implemented monitoring to prevent recurrence.
            </p>
          </div>
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold">
            You
          </div>
        </div>
        <motion.div
          className="flex items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-chart-2"
              initial={{ width: 0 }}
              animate={{ width: "85%" }}
              transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>
          <span className="text-xs font-medium text-chart-2">85%</span>
        </motion.div>
      </div>
    ),
  },
  {
    id: "evaluation",
    label: "AI Evaluation",
    icon: BarChart3,
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Technical", score: 92, color: "bg-chart-1" },
            { label: "Communication", score: 88, color: "bg-chart-2" },
            { label: "Confidence", score: 78, color: "bg-chart-3" },
          ].map((item) => (
            <div key={item.label} className="text-center rounded-lg bg-background/60 p-3">
              <AnimatePresence>
                <motion.span
                  key={item.score}
                  className="text-2xl font-bold text-foreground block"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {item.score}
                </motion.span>
              </AnimatePresence>
              <span className="text-xs text-muted-foreground">{item.label}</span>
              <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className={cn("h-full rounded-full", item.color)}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-background/60 p-3 text-sm">
          <p className="font-medium text-foreground mb-1">Improvement Suggestions</p>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-chart-1" />
              Use more quantifiable results (added +2 points)
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-chart-3" />
              Slow down speech pace for emphasis (added +5 points)
            </li>
          </ul>
        </div>
      </div>
    ),
  },
]

export function ProductDemo() {
  const [activeStep, setActiveStep] = React.useState(0)

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MotionDiv className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            className="inline-block text-sm font-medium text-primary mb-4 tracking-wider uppercase"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Interactive Demo
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Experience the{" "}
            <span className="gradient-text">Interview Flow</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See how AI transforms your interview practice with real-time feedback.
          </p>
        </MotionDiv>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Step selector */}
          <div className="space-y-2">
            {demoSteps.map((step, i) => (
              <motion.button
                key={step.id}
                onClick={() => setActiveStep(i)}
                className={cn(
                  "flex items-center gap-3 w-full rounded-xl p-4 text-left transition-all duration-300",
                  activeStep === i
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card border border-border/60 hover:border-border"
                )}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <step.icon className="size-5" />
                <span className="text-sm font-medium">{step.label}</span>
                {activeStep === i && (
                  <ChevronRight className="size-4 ml-auto" />
                )}
              </motion.button>
            ))}
          </div>

          {/* Demo display */}
          <div className="lg:col-span-2">
            <GlowCard className="p-6" glowColor="rgba(120, 80, 240, 0.1)">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {demoSteps[activeStep].content}
                </motion.div>
              </AnimatePresence>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  )
}
