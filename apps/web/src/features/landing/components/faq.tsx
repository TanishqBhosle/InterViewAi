"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { MotionDiv } from "@/components/shared/motion-div"

const faqs = [
  {
    question: "How does the AI mock interview work?",
    answer:
      "Our AI conducts realistic interviews by asking role-specific questions, analyzing your responses in real-time, and providing instant feedback on content, communication, and confidence. The AI adapts its questions based on your answers for a personalized experience.",
  },
  {
    question: "Is there a free plan available?",
    answer:
      "Yes! Our Free plan includes 3 AI mock interviews per month, basic resume analysis, HR interview practice, and community access. You can upgrade to Pro or Premium anytime for unlimited access and advanced features.",
  },
  {
    question: "How accurate is the AI feedback?",
    answer:
      "Our AI achieves over 92% accuracy in evaluating interview responses. It analyzes speech patterns, content relevance, confidence levels, and communication clarity using advanced LLM models trained on thousands of successful interviews.",
  },
  {
    question: "Can I practice for specific companies?",
    answer:
      "Absolutely! We offer company-specific preparation for Google, Amazon, Microsoft, Flipkart, Zomato, and 200+ other companies. The AI tailors questions based on each company's interview patterns and culture.",
  },
  {
    question: "How does the resume analysis work?",
    answer:
      "Upload your resume and our AI evaluates it against ATS (Applicant Tracking System) standards. You receive a detailed breakdown of strengths, weaknesses, keyword optimization suggestions, and actionable improvements to increase your chances of getting shortlisted.",
  },
  {
    question: "What types of interviews are covered?",
    answer:
      "We cover HR interviews, technical interviews, behavioral interviews, system design, product management, case studies, data science, and sales interviews. Each type has specialized question banks and evaluation criteria.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time. Your access continues until the end of the billing period. We believe in transparent pricing with no hidden fees or lock-in contracts.",
  },
  {
    question: "Is my data secure and private?",
    answer:
      "We take data security seriously. All interview recordings and personal data are encrypted at rest and in transit. We never share your data with third parties and comply with Indian data protection regulations.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="relative py-24 sm:py-32 overflow-hidden bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <MotionDiv className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            className="inline-block text-sm font-medium text-primary mb-4 tracking-wider uppercase"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            FAQ
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>
        </MotionDiv>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} {...faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string
  answer: string
  index: number
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        "rounded-xl border transition-all duration-300",
        open
          ? "border-primary/30 bg-card shadow-sm"
          : "border-border/60 bg-card/50 hover:border-border"
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-medium pr-4">{question}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="size-4 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
