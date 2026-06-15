"use client";

import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { pricingPlans } from "@/config/site";

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, transparent{" "}
            <span className="bg-gradient-to-r from-primary to-brand bg-clip-text text-transparent">
              pricing
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free, upgrade when you&apos;re ready. No hidden charges. Cancel
            anytime.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-2xl border p-8 transition-all duration-300",
                plan.popular
                  ? "border-primary bg-card shadow-xl shadow-primary/10 scale-[1.02]"
                  : "border-border/50 bg-card/50 hover:border-border hover:shadow-lg"
              )}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 text-xs">
                  Most Popular
                </Badge>
              )}

              <div>
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <div className="mt-6 flex items-baseline gap-1">
                {plan.price === 0 ? (
                  <span className="text-4xl font-bold tracking-tight">Free</span>
                ) : (
                  <>
                    <span className="text-sm text-muted-foreground">&#8377;</span>
                    <span className="text-4xl font-bold tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      /{plan.period}
                    </span>
                  </>
                )}
              </div>

              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/register" className="mt-8 block">
                <Button
                  className={cn(
                    "w-full gap-2",
                    plan.popular
                      ? ""
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                  variant={plan.popular ? "default" : "secondary"}
                  size="lg"
                >
                  {plan.cta}
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-12 rounded-2xl border border-border/50 bg-muted/30 p-8 text-center sm:p-12">
          <h3 className="text-xl font-semibold">
            Need a plan for your college or organization?
          </h3>
          <p className="mt-2 text-muted-foreground">
            Custom pricing for placement cells, training institutes, and
            enterprises with bulk access, analytics dashboard, and dedicated
            support.
          </p>
          <Link href="/contact" className="mt-6 inline-block">
            <Button variant="outline" size="lg" className="gap-2">
              Contact Sales
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
