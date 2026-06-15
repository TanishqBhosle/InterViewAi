"use client";

import { useState } from "react";
import { Check, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { pricingPlans } from "@/config/site";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function BillingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleSubscribe(plan: typeof pricingPlans[number]) {
    if (plan.id === "free") {
      toast.success("You're already on the Free plan!");
      return;
    }
    setLoading(plan.id);
    try {
      // Create Razorpay order
      const res = await fetch("http://localhost:4000/api/v1/subscriptions/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ plan: plan.id }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      // For now, simulate payment
      toast.success(`${plan.name} plan activated! Thank you for subscribing.`);
    } catch (err: any) {
      toast.error(err.message || "Payment failed");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="space-y-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-2xl font-bold tracking-tight">Subscription Plans</h1>
        <p className="mt-1 text-muted-foreground">
          Choose the plan that fits your preparation needs
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              "relative border-border/50 bg-card/50 transition-all",
              plan.popular && "border-primary shadow-xl shadow-primary/10 scale-[1.02]"
            )}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-4">
                Most Popular
              </Badge>
            )}
            <CardHeader>
              <CardTitle className="text-lg">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-baseline gap-1">
                {plan.price === 0 ? (
                  <span className="text-4xl font-bold">Free</span>
                ) : (
                  <>
                    <span className="text-2xl font-bold text-muted-foreground">&#8377;</span>
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </>
                )}
              </div>

              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={cn(
                  "w-full gap-2",
                  plan.popular ? "" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
                variant={plan.popular ? "default" : "secondary"}
                size="lg"
                disabled={loading === plan.id || plan.id === "free"}
                onClick={() => handleSubscribe(plan)}
              >
                {loading === plan.id ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Sparkles className="size-4" />
                )}
                {plan.id === "free" ? "Current Plan" : plan.cta}
                {plan.id !== "free" && <ArrowRight className="size-4" />}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
