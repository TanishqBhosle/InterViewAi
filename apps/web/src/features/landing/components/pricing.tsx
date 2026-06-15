"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { MotionDiv, StaggerContainer, StaggerItem } from "@/components/shared/motion-div"
import { pricingPlans } from "@/config/site"

export function Pricing() {
  const [annual, setAnnual] = React.useState(false)

  return (
    <section id="pricing" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute inset-0 grid-pattern-large opacity-20 dark:opacity-10" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MotionDiv className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            className="inline-block text-sm font-medium text-primary mb-4 tracking-wider uppercase"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Pricing
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Simple, Transparent{" "}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free and upgrade as you grow. No hidden fees.
          </p>
        </MotionDiv>

        {/* Toggle */}
        <MotionDiv className="flex items-center justify-center gap-4 mb-12">
          <span className={cn("text-sm font-medium", !annual && "text-foreground", annual && "text-muted-foreground")}>
            Monthly
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className="relative inline-flex h-7 w-12 items-center rounded-full transition-colors bg-muted-foreground/30"
            aria-label="Toggle annual pricing"
          >
            <motion.span
              className="inline-block size-5 rounded-full bg-primary shadow-sm"
              animate={{ x: annual ? 20 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={cn("text-sm font-medium", annual && "text-foreground", !annual && "text-muted-foreground")}>
            Annual
            <span className="ml-1.5 text-xs text-success font-semibold">Save 20%</span>
          </span>
        </MotionDiv>

        {/* Pricing cards */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, i) => {
            const monthlyPrice = plan.price
            const annualPrice = Math.round(monthlyPrice * 0.8)

            return (
              <StaggerItem key={plan.id}>
                <motion.div
                  className={cn(
                    "relative rounded-2xl border p-6 sm:p-8 transition-all duration-300",
                    plan.popular
                      ? "border-primary/40 bg-card shadow-xl shadow-primary/5 scale-105 md:scale-110 z-10"
                      : "border-border/60 bg-card hover:border-border"
                  )}
                  whileHover={{ y: -4 }}
                >
                  {plan.popular && (
                    <motion.div
                      className="absolute -top-3 left-1/2 -translate-x-1/2"
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary to-brand px-3 py-1 text-xs font-semibold text-primary-foreground shadow-lg">
                        <Sparkles className="size-3" />
                        Most Popular
                      </span>
                    </motion.div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={annual ? "annual" : "monthly"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {plan.price === 0 ? (
                          <span className="text-4xl font-bold">Free</span>
                        ) : (
                          <>
                            <span className="text-4xl font-bold">
                              ₹{annual ? annualPrice : monthlyPrice}
                            </span>
                            <span className="text-muted-foreground ml-1">
                              /{annual ? "mo" : "month"}
                            </span>
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <Link href="/register">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <button
                        className={cn(
                          "w-full rounded-xl py-2.5 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2",
                          plan.popular
                            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        )}
                      >
                        {plan.cta}
                        <ArrowRight className="size-4" />
                      </button>
                    </motion.div>
                  </Link>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="size-4 text-success mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        {/* Enterprise */}
        <MotionDiv className="text-center mt-16">
          <p className="text-muted-foreground">
            Need custom plans for your college or organization?{" "}
            <a
              href="#"
              className="text-primary hover:underline font-medium"
            >
              Contact us
            </a>
          </p>
        </MotionDiv>
      </div>
    </section>
  )
}
