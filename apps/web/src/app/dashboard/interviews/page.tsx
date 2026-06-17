"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { interviewTypes } from "@/config/site";

export default function InterviewsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Mock Interviews</h1>
        <p className="mt-1 text-muted-foreground">
          Practice with AI-powered interviews tailored to your needs
        </p>
      </div>

      {/* Interview Types */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Interview Type</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {interviewTypes.map((type) => (
            <Link key={type.id} href={`/dashboard/interview/${type.id}`}>
              <Card className="group cursor-pointer border-border/50 bg-card/50 transition-all hover:border-primary/20 hover:bg-card hover:shadow-lg">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                    <span className="text-lg font-bold text-primary">
                      {type.label.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">{type.label}</h3>
                    <p className="text-xs text-muted-foreground">AI-powered practice</p>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
