"use client";

import Link from "next/link";
import { ArrowRight, Play, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { value: "50K+", label: "Students Prepared" },
  { value: "95%", label: "Success Rate" },
  { value: "200+", label: "Companies Covered" },
  { value: "4.9/5", label: "User Rating" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40 dark:opacity-20" />

      {/* Gradient orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/20 via-brand/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-[300px] w-[400px] rounded-full bg-gradient-to-tl from-chart-2/15 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-24 sm:px-6 sm:pt-32 lg:px-8 lg:pt-40">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <Badge
            variant="outline"
            className="mb-6 gap-1.5 border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
          >
            <Sparkles className="size-3" />
            India&apos;s #1 AI Interview Platform
          </Badge>

          {/* Heading */}
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Ace Your Next Interview{" "}
            <span className="bg-gradient-to-r from-primary via-brand to-chart-2 bg-clip-text text-transparent">
              with AI
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Practice with AI-powered mock interviews, get instant feedback on
            your answers, analyze your resume, and receive personalized coaching
            to land your dream job at top companies.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href="/register">
              <Button size="lg" className="w-full gap-2 px-8 sm:w-auto">
                Start Practicing Free
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="w-full gap-2 px-8 sm:w-auto"
            >
              <Play className="size-4" />
              Watch Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex items-center gap-1 text-sm text-muted-foreground">
            <div className="flex -space-x-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="size-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="ml-2 font-medium">4.9/5</span>
            <span>from 10,000+ reviews</span>
          </div>

          {/* Stats */}
          <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Mock Interview Preview Card */}
          <div className="mt-16 w-full max-w-4xl">
            <div className="glass-card overflow-hidden p-1 shadow-2xl shadow-primary/5">
              <div className="rounded-lg bg-gradient-to-br from-muted/50 to-muted p-6 sm:p-8">
                {/* Mock browser bar */}
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="size-3 rounded-full bg-destructive/60" />
                    <div className="size-3 rounded-full bg-warning/60" />
                    <div className="size-3 rounded-full bg-success/60" />
                  </div>
                  <div className="ml-4 h-6 flex-1 rounded-md bg-background/60 px-3 text-xs leading-6 text-muted-foreground">
                    interviewai.in/interview/session
                  </div>
                </div>

                {/* Interview simulation */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
                      AI
                    </div>
                    <div className="rounded-lg bg-background/80 p-3 text-left text-sm">
                      <p className="font-medium text-foreground">
                        Tell me about a challenging project you worked on and how
                        you handled it.
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Behavioral Interview - Google SDE-2
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start justify-end gap-3">
                    <div className="rounded-lg bg-primary/10 p-3 text-left text-sm">
                      <p className="text-foreground">
                        In my last role, I led a microservices migration that
                        reduced latency by 40%...
                      </p>
                    </div>
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold">
                      You
                    </div>
                  </div>

                  {/* Score preview */}
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {[
                      { label: "Technical", score: 92, color: "bg-chart-1" },
                      { label: "Communication", score: 88, color: "bg-chart-2" },
                      { label: "Confidence", score: 95, color: "bg-chart-3" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-lg bg-background/80 p-3 text-center"
                      >
                        <div className="text-2xl font-bold text-foreground">
                          {item.score}
                        </div>
                        <div className="mt-0.5 text-xs text-muted-foreground">
                          {item.label}
                        </div>
                        <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full rounded-full ${item.color}`}
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
