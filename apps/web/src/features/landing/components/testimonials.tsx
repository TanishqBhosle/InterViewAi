"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

import { MotionDiv, StaggerContainer, StaggerItem } from "@/components/shared/motion-div"
import { GlowCard } from "@/components/shared/glow-card"
import { InfiniteMarquee } from "@/components/shared/infinite-marquee"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "SDE-2 at Google",
    avatar: "PS",
    rating: 5,
    text: "InterviewAI completely transformed my interview preparation. The AI feedback on my communication skills was incredibly accurate. Landed my dream job at Google!",
  },
  {
    name: "Rahul Verma",
    role: "Product Manager at Amazon",
    avatar: "RV",
    rating: 5,
    text: "The company-specific preparation was a game-changer. The AI asked questions exactly matching Amazon's leadership principles. Highly recommend!",
  },
  {
    name: "Ananya Patel",
    role: "Data Scientist at Microsoft",
    avatar: "AP",
    rating: 5,
    text: "The confidence analysis and body language feedback helped me improve so much. I went from nervous to confident in just 2 weeks of practice.",
  },
  {
    name: "Vikram Singh",
    role: "Full Stack Dev at Flipkart",
    avatar: "VS",
    rating: 4,
    text: "Best interview prep platform I've used. The detailed reports showed me exactly where I needed to improve. Worth every rupee!",
  },
  {
    name: "Neha Gupta",
    role: "Consultant at McKinsey",
    avatar: "NG",
    rating: 5,
    text: "The case study interviews were incredibly realistic. The AI coach gave me feedback that I could immediately apply to improve.",
  },
  {
    name: "Arjun Nair",
    role: "Tech Lead at Zomato",
    avatar: "AN",
    rating: 5,
    text: "Practice, feedback, repeat. The structured approach helped me crack my system design interview on the first attempt!",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern-large opacity-20 dark:opacity-10" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MotionDiv className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            className="inline-block text-sm font-medium text-primary mb-4 tracking-wider uppercase"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Testimonials
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Loved by{" "}
            <span className="gradient-text">Thousands</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Hear from professionals who transformed their careers.
          </p>
        </MotionDiv>

        {/* Auto-scrolling carousel */}
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex gap-6 animate-marquee" style={{ animationDuration: "40s" }}>
            {[...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden mt-6 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div
            className="flex gap-6 animate-marquee-reverse"
            style={{ animationDuration: "45s" }}
          >
            {[...testimonials.reverse(), ...testimonials.reverse()].map(
              (t, i) => (
                <TestimonialCard key={i} {...t} />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({
  name,
  role,
  avatar,
  rating,
  text,
}: {
  name: string
  role: string
  avatar: string
  rating: number
  text: string
}) {
  return (
    <GlowCard className="min-w-[320px] max-w-[400px] p-6 shrink-0">
      <Quote className="size-6 text-primary/30 mb-3" />
      <p className="text-sm text-foreground/80 leading-relaxed mb-4">
        {text}
      </p>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`size-3.5 ${
              i < rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted"
            }`}
          />
        ))}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-brand text-xs font-bold text-primary-foreground shrink-0">
          {avatar}
        </div>
        <div>
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
    </GlowCard>
  )
}

export function CTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700" />
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
        }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Particle overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 grid-pattern" 
          style={{ filter: "invert(1)" }} />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <MotionDiv>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
            Join 50,000+ students and professionals who have transformed their
            interview skills. Start practicing free today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <a
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-indigo-600 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Free
                <ArrowRightIcon />
              </a>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                View Plans
              </a>
            </motion.div>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}

function ArrowRightIcon() {
  return (
    <svg
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}
