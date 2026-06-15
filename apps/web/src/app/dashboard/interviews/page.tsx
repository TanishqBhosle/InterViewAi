"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { interviewTypes, companies } from "@/config/site";

export default function InterviewsPage() {
  const [search, setSearch] = useState("");

  const filteredCompanies = companies.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

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

      {/* Company-Specific */}
      <section>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold">Company-Specific Prep</h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search companies..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCompanies.map((company) => (
            <Link key={company} href={`/dashboard/interview/company/${company.toLowerCase()}`}>
              <Card className="group cursor-pointer border-border/50 bg-card/50 transition-all hover:border-primary/20 hover:bg-card hover:shadow-lg">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                    <Building2 className="size-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{company}</h3>
                    <p className="text-xs text-muted-foreground">Company-specific questions</p>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
