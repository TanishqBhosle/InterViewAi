"use client";

import { BookOpen, Code, Network, Building2, ExternalLink, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const categories = [
  {
    title: "Interview Questions",
    description: "Curated questions by company and role",
    icon: BookOpen,
    count: "500+",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    href: "/dashboard/learn/interview-questions",
  },
  {
    title: "DSA Guides",
    description: "Data structures & algorithms mastery",
    icon: Code,
    count: "200+",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    href: "/dashboard/learn/dsa",
  },
  {
    title: "System Design",
    description: "Architecture & design patterns",
    icon: Network,
    count: "100+",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    href: "/dashboard/learn/system-design",
  },
  {
    title: "Company Guides",
    description: "Company-specific preparation guides",
    icon: Building2,
    count: "50+",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    href: "/dashboard/learn/companies",
  },
];

const popularResources = [
  { title: "Top 100 DSA Problems for Interviews", company: "General", premium: false },
  { title: "Google SDE Interview Preparation Guide", company: "Google", premium: true },
  { title: "System Design: Design WhatsApp", company: "System Design", premium: false },
  { title: "Amazon Leadership Principles Explained", company: "Amazon", premium: false },
  { title: "Flipkart Product Case Study Framework", company: "Flipkart", premium: true },
  { title: "TCS Ninja Interview Questions 2026", company: "TCS", premium: false },
];

export default function LearningPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Learning Hub</h1>
        <p className="text-muted-foreground">Access interview questions, guides, and resources</p>
      </div>

      {/* Categories */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <Link key={cat.title} href={cat.href}>
            <Card className="group cursor-pointer border-border/50 bg-card/50 transition-all hover:border-primary/20 hover:bg-card hover:shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className={`inline-flex size-10 items-center justify-center rounded-lg ${cat.bg}`}>
                  <cat.icon className={`size-5 ${cat.color}`} />
                </div>
                <h3 className="mt-3 text-sm font-semibold">{cat.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{cat.description}</p>
                <p className="mt-2 text-xs font-medium text-primary">{cat.count} resources</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Popular Resources */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Popular Resources</CardTitle>
          <CardDescription>Most accessed study materials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {popularResources.map((r) => (
              <div
                key={r.title}
                className="flex items-center gap-3 rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{r.title}</span>
                    {r.premium && <Lock className="size-3 text-amber-500" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{r.company}</p>
                </div>
                <Badge variant={r.premium ? "secondary" : "outline"} className="text-xs">
                  {r.premium ? "Premium" : "Free"}
                </Badge>
                <Button variant="ghost" size="icon" className="size-8">
                  <ExternalLink className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
