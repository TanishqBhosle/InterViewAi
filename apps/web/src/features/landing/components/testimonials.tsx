"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "SDE-2 at Google",
    content:
      "InterviewAI India helped me crack my Google interview. The AI mock interviews were incredibly realistic and the feedback was spot-on. Highly recommend!",
    rating: 5,
  },
  {
    name: "Rahul Patel",
    role: "Product Manager at Flipkart",
    content:
      "The company-specific preparation was a game changer. I practiced with Flipkart-specific questions and nailed every round. The career coach feature is brilliant.",
    rating: 5,
  },
  {
    name: "Ananya Gupta",
    role: "Data Scientist at Amazon",
    content:
      "From resume analysis to behavioral interview prep, this platform covers everything. My ATS score improved from 45 to 92 after following the suggestions.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="relative border-t border-border/50 bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Testimonials
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by{" "}
            <span className="bg-gradient-to-r from-primary to-brand bg-clip-text text-transparent">
              50,000+ professionals
            </span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-xl border border-border/50 bg-card/50 p-6 transition-all hover:bg-card hover:shadow-lg"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="mt-6 border-t border-border/50 pt-4">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Badge
          variant="outline"
          className="mb-6 border-primary/20 bg-primary/5 text-primary"
        >
          Get Started Today
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Ready to ace your next interview?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Join 50,000+ Indian professionals who are already preparing smarter
          with AI. Start for free — no credit card required.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/register">
            <Button size="lg" className="gap-2 px-8">
              Start Practicing Free
              <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Link href="#pricing">
            <Button variant="outline" size="lg" className="px-8">
              View Pricing
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
