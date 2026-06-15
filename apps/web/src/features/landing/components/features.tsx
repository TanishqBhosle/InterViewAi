"use client";

import {
  FileSearch,
  MessageSquare,
  BarChart3,
  Brain,
  Target,
  BookOpen,
  Video,
  Mic,
  Zap,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "AI Mock Interviews",
    description:
      "Practice HR, Technical, Behavioral, System Design, and more with our AI interviewer that adapts to your level.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: FileSearch,
    title: "Resume Analyzer",
    description:
      "Upload your resume and get an instant ATS score, missing keywords, skill gaps, and improvement suggestions.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: BarChart3,
    title: "Detailed Reports",
    description:
      "Get comprehensive feedback on technical skills, communication, confidence, and problem-solving ability.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Brain,
    title: "AI Career Coach",
    description:
      "ChatGPT-style AI assistant for career guidance, salary negotiation, interview tips, and learning roadmaps.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Mic,
    title: "Speech Analysis",
    description:
      "Analyze your speech pace, pronunciation, fillers, grammar, and overall communication quality in real-time.",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    icon: Video,
    title: "Video Analysis",
    description:
      "AI analyzes your eye contact, posture, facial expressions, and body language to improve your presence.",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Target,
    title: "Company-Specific Prep",
    description:
      "Prepare for Google, Amazon, Microsoft, Flipkart, TCS, Infosys, and 200+ companies with targeted questions.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    icon: TrendingUp,
    title: "Personalized Roadmaps",
    description:
      "Get 7-day, 30-day, and 90-day customized preparation plans based on your profile and target role.",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    icon: BookOpen,
    title: "Learning Hub",
    description:
      "Access curated interview questions, notes, DSA guides, system design resources, and company-wise prep material.",
    color: "text-teal-500",
    bg: "bg-teal-500/10",
  },
];

const companyLogos = [
  "Google",
  "Amazon",
  "Microsoft",
  "Flipkart",
  "Zomato",
  "Swiggy",
  "TCS",
  "Infosys",
  "Wipro",
  "Razorpay",
  "PhonePe",
  "CRED",
];

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-primary to-brand bg-clip-text text-transparent">
              crack any interview
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From resume analysis to AI-powered mock interviews and personalized
            coaching, we&apos;ve got every aspect of your interview preparation
            covered.
          </p>
        </div>

        {/* Features grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-xl border border-border/50 bg-card/50 p-6 transition-all duration-300 hover:border-primary/20 hover:bg-card hover:shadow-lg hover:shadow-primary/5"
            >
              <div
                className={`inline-flex size-10 items-center justify-center rounded-lg ${feature.bg}`}
              >
                <feature.icon className={`size-5 ${feature.color}`} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Company logos marquee */}
        <div className="mt-24">
          <p className="text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Prepare for top companies
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {companyLogos.map((company) => (
              <div
                key={company}
                className="text-lg font-semibold text-muted-foreground/50 transition-colors hover:text-foreground"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: Users,
      title: "Create Your Profile",
      description:
        "Sign up, upload your resume, set your target role and companies. Our AI builds your personalized prep plan.",
    },
    {
      step: "02",
      icon: Zap,
      title: "Practice with AI",
      description:
        "Take AI-powered mock interviews via text, voice, or video. Our AI adapts questions based on your responses.",
    },
    {
      step: "03",
      icon: BarChart3,
      title: "Get Detailed Feedback",
      description:
        "Receive comprehensive reports with scores, strengths, weaknesses, and actionable improvement suggestions.",
    },
    {
      step: "04",
      icon: Shield,
      title: "Land Your Dream Job",
      description:
        "Follow your personalized roadmap, track progress, and enter your interviews with full confidence.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative border-t border-border/50 bg-muted/30 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            From zero to interview-ready{" "}
            <span className="bg-gradient-to-r from-primary to-brand bg-clip-text text-transparent">
              in 4 simple steps
            </span>
          </h2>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.step}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                  <step.icon className="size-6 text-primary" />
                </div>
                <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {step.step}
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
