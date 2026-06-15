"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Play, Sparkles, Star, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Particles } from "@/components/shared/particles"
import { FloatingElement } from "@/components/shared/floating-elements"
import { Counter } from "@/components/shared/counter"

const stats = [
  { value: 50000, suffix: "+", label: "Students Prepared" },
  { value: 95, suffix: "%", label: "Success Rate" },
  { value: 200, suffix: "+", label: "Companies Covered" },
  { value: 4.9, suffix: "/5", label: "User Rating" },
]

const floatingCards = [
  {
    text: "Score: 92%",
    subtext: "Technical",
    color: "from-violet-500/10 to-indigo-500/10",
    x: -180,
    y: -60,
    delay: 0,
  },
  {
    text: "Score: 88%",
    subtext: "Communication",
    color: "from-cyan-500/10 to-blue-500/10",
    x: 200,
    y: -80,
    delay: 1,
  },
  {
    text: "Score: 95%",
    subtext: "Confidence",
    color: "from-emerald-500/10 to-green-500/10",
    x: -160,
    y: 120,
    delay: 2,
  },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-3.5rem)] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern-large opacity-30 dark:opacity-15" />

      {/* Gradient orbs */}
      <motion.div
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-500/15 via-indigo-500/10 to-transparent blur-3xl"
        animate={{ scale: [1, 1.05, 1], rotate: [0, 3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-20 right-0 h-[400px] w-[500px] rounded-full bg-gradient-to-tl from-cyan-500/10 to-transparent blur-3xl"
        animate={{ scale: [1, 1.1, 1], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute top-1/3 -left-20 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-indigo-500/10 to-transparent blur-3xl"
        animate={{ scale: [1, 1.15, 1], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Particles */}
      <Particles
        count={40}
        color="var(--brand)"
        speed={0.3}
        className="z-0"
      />

      {/* Floating stats cards */}
      {floatingCards.map((card, i) => (
        <FloatingElement
          key={i}
          delay={card.delay}
          yOffset={15}
          duration={5 + i}
          className="hidden lg:block absolute z-10"
          style={{ left: `calc(50% + ${card.x}px)`, top: `calc(50% + ${card.y}px)` }}
        >
          <motion.div
            className={cn(
              "rounded-xl border border-border/50 bg-background/80 backdrop-blur-xl p-3 shadow-xl",
              "bg-gradient-to-br",
              card.color
            )}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 + i * 0.3, duration: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success" />
              <span className="text-sm font-semibold">{card.text}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{card.subtext}</p>
          </motion.div>
        </FloatingElement>
      ))}

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pt-32 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Badge
              variant="outline"
              className="mb-6 gap-1.5 border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
            >
              <Sparkles className="size-3" />
              India&apos;s #1 AI Interview Platform
            </Badge>
          </motion.div>

          {/* Heading with char reveal */}
          <motion.h1
            className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.02, delayChildren: 0.3 },
              },
            }}
          >
            {"Crack Interviews With".split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, y: 30, rotateX: -90 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
                  },
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <br />
            <span className="gradient-text-hero inline-block">
              {"AI-Powered Coaching".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  variants={{
                    hidden: { opacity: 0, y: 30, rotateX: -90 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
                    },
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Practice interviews, improve communication, analyze confidence,
            and get hired faster with personalized AI feedback.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Link href="/register">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button size="lg" className="w-full gap-2 px-8 sm:w-auto relative overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                    Start Free
                    <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
            </Link>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                size="lg"
                className="w-full gap-2 px-8 sm:w-auto"
              >
                <Play className="size-4" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="mt-8 flex items-center gap-1 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="flex -space-x-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + i * 0.1, type: "spring" }}
                >
                  <Star className="size-4 fill-yellow-400 text-yellow-400" />
                </motion.div>
              ))}
            </div>
            <span className="ml-2 font-medium">4.9/5</span>
            <span>from 10,000+ reviews</span>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15, delayChildren: 0.3 },
              },
            }}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Counter {...stat} />
              </motion.div>
            ))}
          </motion.div>

          {/* Mock Interview Preview Card */}
          <motion.div
            className="mt-16 w-full max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="glass-card overflow-hidden p-1 shadow-2xl shadow-primary/5">
              <div className="rounded-lg bg-gradient-to-br from-muted/50 to-muted p-6 sm:p-8">
                {/* Mock browser bar */}
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <motion.div
                      className="size-3 rounded-full bg-destructive/60"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="size-3 rounded-full bg-warning/60"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
                    />
                    <motion.div
                      className="size-3 rounded-full bg-success/60"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
                    />
                  </div>
                  <div className="ml-4 h-6 flex-1 rounded-md bg-background/60 px-3 text-xs leading-6 text-muted-foreground">
                    interviewai.in/interview/session
                  </div>
                </div>

                {/* Interview simulation */}
                <div className="space-y-4">
                  {/* AI Question */}
                  <motion.div
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <motion.div
                      className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      AI
                    </motion.div>
                    <div className="rounded-lg bg-background/80 p-3 text-left text-sm">
                      <p className="font-medium text-foreground">
                        Tell me about a challenging project you worked on and how
                        you handled it.
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Behavioral Interview - Google SDE-2
                      </p>
                    </div>
                  </motion.div>

                  {/* User Answer */}
                  <motion.div
                    className="flex items-start justify-end gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <div className="rounded-lg bg-primary/10 p-3 text-left text-sm">
                      <p className="text-foreground">
                        In my last role, I led a microservices migration that
                        reduced latency by 40%...
                      </p>
                    </div>
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold">
                      You
                    </div>
                  </motion.div>

                  {/* Score preview */}
                  <motion.div
                    className="mt-4 grid grid-cols-3 gap-3"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: {},
                      visible: {
                        transition: { staggerChildren: 0.15, delayChildren: 1 },
                      },
                    }}
                  >
                    {[
                      { label: "Technical", score: 92, color: "bg-chart-1" },
                      { label: "Communication", score: 88, color: "bg-chart-2" },
                      { label: "Confidence", score: 95, color: "bg-chart-3" },
                    ].map((item) => (
                      <motion.div
                        key={item.label}
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        className="rounded-lg bg-background/80 p-3 text-center"
                      >
                        <motion.span
                          className="text-2xl font-bold text-foreground"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 1.5 }}
                        >
                          {item.score}
                        </motion.span>
                        <div className="mt-0.5 text-xs text-muted-foreground">
                          {item.label}
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                          <motion.div
                            className={`h-full rounded-full ${item.color}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.score}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              delay: 1.8,
                              ease: [0.25, 0.1, 0.25, 1],
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span className="text-xs">Scroll to explore</span>
        <ChevronDown className="size-4 scroll-indicator" />
      </motion.div>
    </section>
  )
}


