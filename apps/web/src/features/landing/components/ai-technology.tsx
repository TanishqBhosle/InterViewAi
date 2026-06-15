"use client"

import { motion } from "framer-motion"
import { Mic, Eye, Brain, Cpu, ArrowDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { MotionDiv } from "@/components/shared/motion-div"
import { GlowCard } from "@/components/shared/glow-card"

const techLayers = [
  {
    icon: Mic,
    title: "Speech Analysis",
    description: "Advanced NLP models analyze tone, pace, clarity, filler words, and emotional inflection.",
    color: "from-violet-500/10 to-purple-500/10",
    borderColor: "border-violet-500/20",
  },
  {
    icon: Eye,
    title: "Vision Analysis",
    description: "Computer vision evaluates body language, facial expressions, eye contact, and posture.",
    color: "from-cyan-500/10 to-blue-500/10",
    borderColor: "border-cyan-500/20",
  },
  {
    icon: Brain,
    title: "LLM Evaluation",
    description: "Large language models assess content relevance, structure, depth, and problem-solving approach.",
    color: "from-emerald-500/10 to-green-500/10",
    borderColor: "border-emerald-500/20",
  },
  {
    icon: Cpu,
    title: "Recommendation Engine",
    description: "Personalized improvement plans based on performance patterns and target role requirements.",
    color: "from-amber-500/10 to-orange-500/10",
    borderColor: "border-amber-500/20",
  },
]

export function AITechnology() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern-large opacity-20 dark:opacity-10" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MotionDiv className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            className="inline-block text-sm font-medium text-primary mb-4 tracking-wider uppercase"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            AI Technology
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Powered by{" "}
            <span className="gradient-text">Advanced AI</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Multi-modal AI that understands speech, video, and content to deliver
            comprehensive feedback.
          </p>
        </MotionDiv>

        {/* Architecture flow */}
        <div className="relative mb-16">
          {/* Connection arrows */}
          <div className="hidden lg:flex absolute top-1/2 left-0 right-0 -translate-y-1/2 justify-between px-[10%] pointer-events-none">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="text-muted-foreground/30"
                animate={{ x: [0, 5, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
              >
                <ArrowDown className="size-5 -rotate-90" />
              </motion.div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techLayers.map((layer, i) => {
              const Icon = layer.icon
              return (
                <motion.div
                  key={layer.title}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                >
                  <GlowCard
                    className="p-6 text-center"
                    glowColor="rgba(120, 80, 240, 0.08)"
                  >
                    <motion.div
                      className={cn(
                        "inline-flex items-center justify-center size-14 rounded-2xl bg-gradient-to-br border mb-4",
                        layer.color,
                        layer.borderColor
                      )}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="size-7 text-foreground" />
                    </motion.div>
                    <h3 className="text-base font-semibold mb-2">{layer.title}</h3>
                    <p className="text-sm text-muted-foreground">{layer.description}</p>
                  </GlowCard>

                  {/* Step number */}
                  <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-lg">
                    {i + 1}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Architecture diagram - simplified */}
        <MotionDiv>
          <GlowCard className="p-8" glowColor="rgba(120, 80, 240, 0.08)">
            <h3 className="text-lg font-semibold text-center mb-8">How It All Connects</h3>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
              {/* Input nodes */}
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { label: "Audio Input", color: "bg-violet-500/20 border-violet-500/30" },
                  { label: "Video Input", color: "bg-cyan-500/20 border-cyan-500/30" },
                  { label: "Text Input", color: "bg-emerald-500/20 border-emerald-500/30" },
                ].map((node) => (
                  <motion.div
                    key={node.label}
                    className={cn(
                      "rounded-xl border px-4 py-2 text-sm font-medium",
                      node.color
                    )}
                    whileHover={{ scale: 1.05 }}
                  >
                    {node.label}
                  </motion.div>
                ))}
              </div>

              {/* Arrow */}
              <motion.div
                className="text-muted-foreground/50"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRightIcon className="size-6" />
              </motion.div>

              {/* AI Engine */}
              <motion.div
                className="rounded-2xl border border-primary/30 bg-primary/5 px-6 py-3 shadow-lg shadow-primary/5"
                whileHover={{ scale: 1.03 }}
              >
                <span className="text-sm font-bold gradient-text">AI Engine</span>
              </motion.div>

              {/* Arrow */}
              <motion.div
                className="text-muted-foreground/50"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              >
                <ArrowRightIcon className="size-6" />
              </motion.div>

              {/* Output */}
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { label: "Score Report", color: "bg-amber-500/20 border-amber-500/30" },
                  { label: "Improvements", color: "bg-rose-500/20 border-rose-500/30" },
                  { label: "Roadmap", color: "bg-indigo-500/20 border-indigo-500/30" },
                ].map((node) => (
                  <motion.div
                    key={node.label}
                    className={cn(
                      "rounded-xl border px-4 py-2 text-sm font-medium",
                      node.color
                    )}
                    whileHover={{ scale: 1.05 }}
                  >
                    {node.label}
                  </motion.div>
                ))}
              </div>
            </div>
          </GlowCard>
        </MotionDiv>
      </div>
    </section>
  )
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}


