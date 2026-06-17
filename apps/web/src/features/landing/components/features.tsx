"use client"

import { motion } from "framer-motion"
import {
  Bot,
  FileSearch,
  BarChart3,
  Brain,
  Mic,
  Video,
  Target,
  GraduationCap,
  Library,
  ArrowRight,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { MotionDiv, StaggerContainer, StaggerItem } from "@/components/shared/motion-div"
import { GlowCard, BentoCard } from "@/components/shared/glow-card"
import { InfiniteMarquee } from "@/components/shared/infinite-marquee"

const features = [
  {
    icon: Bot,
    title: "AI Mock Interviews",
    description: "Practice with intelligent AI that adapts to your responses.",
    color: "from-violet-500/10 to-purple-500/10",
    borderColor: "border-violet-500/20",
  },
  {
    icon: FileSearch,
    title: "Resume Analysis",
    description: "Get ATS-friendly feedback and improvement suggestions.",
    color: "from-blue-500/10 to-cyan-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    icon: BarChart3,
    title: "Detailed Reports",
    description: "Comprehensive analytics on your interview performance.",
    color: "from-emerald-500/10 to-green-500/10",
    borderColor: "border-emerald-500/20",
  },
  {
    icon: Brain,
    title: "AI Career Coach",
    description: "Personalized career guidance and job search strategies.",
    color: "from-amber-500/10 to-orange-500/10",
    borderColor: "border-amber-500/20",
  },
  {
    icon: Mic,
    title: "Speech Analysis",
    description: "Evaluate tone, pace, clarity and filler words.",
    color: "from-rose-500/10 to-pink-500/10",
    borderColor: "border-rose-500/20",
  },
  {
    icon: Video,
    title: "Video Analysis",
    description: "AI-powered body language and facial expression feedback.",
    color: "from-indigo-500/10 to-violet-500/10",
    borderColor: "border-indigo-500/20",
  },
  {
    icon: GraduationCap,
    title: "Personalized Roadmaps",
    description: "Custom learning paths based on your target role.",
    color: "from-sky-500/10 to-blue-500/10",
    borderColor: "border-sky-500/20",
  },
  {
    icon: Library,
    title: "Learning Hub",
    description: "Curated resources including DSA guides and system design.",
    color: "from-purple-500/10 to-pink-500/10",
    borderColor: "border-purple-500/20",
  },
]

const companies = [
  "Google", "Amazon", "Microsoft", "Flipkart", "Zomato",
  "Swiggy", "TCS", "Infosys", "Wipro", "Razorpay",
  "PhonePe", "Paytm", "CRED", "Meesho", "Byju's",
]

const steps = [
  {
    number: "01",
    title: "Create Your Profile",
    description: "Set your target role, experience level, and preferred companies.",
    icon: GraduationCap,
  },
  {
    number: "02",
    title: "Practice with AI",
    description: "Engage in realistic mock interviews with real-time AI feedback.",
    icon: Bot,
  },
  {
    number: "03",
    title: "Get Feedback",
    description: "Receive detailed scores and actionable improvement suggestions.",
    icon: BarChart3,
  },
  {
    number: "04",
    title: "Land Dream Job",
    description: "Build confidence, improve skills, and ace your real interview.",
    icon: Target,
  },
]

export function SocialProof() {
  return (
    <section className="relative py-16 overflow-hidden">
      <MotionDiv className="text-center mb-8">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Trusted by Students & Professionals at
        </p>
      </MotionDiv>
      <InfiniteMarquee
        items={companies.map((company) => (
          <span
            key={company}
            className="text-lg font-semibold text-muted-foreground/60 px-8 select-none hover:text-foreground transition-colors duration-300"
          >
            {company}
          </span>
        ))}
        speed={35}
      />
    </section>
  )
}

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern-large opacity-20 dark:opacity-10" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MotionDiv className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            className="inline-block text-sm font-medium text-primary mb-4 tracking-wider uppercase"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Everything You Need
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Powerful Features for{" "}
            <span className="gradient-text">Interview Success</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From AI mock interviews to personalized coaching — master every
            aspect of your interview preparation.
          </p>
        </MotionDiv>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <StaggerItem key={feature.title}>
                <GlowCard className="p-6" glowColor="rgba(120, 80, 240, 0.08)">
                  <div
                    className={cn(
                      "inline-flex items-center justify-center size-10 rounded-lg bg-gradient-to-br mb-4 border",
                      feature.color,
                      feature.borderColor
                    )}
                  >
                    <Icon className="size-5 text-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </GlowCard>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MotionDiv className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            className="inline-block text-sm font-medium text-primary mb-4 tracking-wider uppercase"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Your Path to{" "}
            <span className="gradient-text">Interview Success</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Four simple steps to transform your interview preparation.
          </p>
        </MotionDiv>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <StaggerItem key={step.number} className="text-center">
                  <motion.div
                    className="inline-flex items-center justify-center size-12 rounded-2xl bg-gradient-to-br from-primary/10 to-brand/10 border border-primary/20 mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="size-6 text-primary" />
                  </motion.div>
                  <span className="block text-sm font-mono text-primary mb-2">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
