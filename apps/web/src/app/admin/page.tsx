"use client";

import { Users, DollarSign, TrendingUp, BarChart3, Activity, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "Total Users", value: "12,450", change: "+12%", icon: Users, color: "text-blue-500" },
  { label: "Revenue (MRR)", value: "₹3,72,500", change: "+8%", icon: DollarSign, color: "text-emerald-500" },
  { label: "Interviews Done", value: "45,200", change: "+23%", icon: Activity, color: "text-violet-500" },
  { label: "Conversion Rate", value: "18.5%", change: "+2.1%", icon: TrendingUp, color: "text-amber-500" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/50">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className={`flex size-10 items-center justify-center rounded-lg bg-muted`}>
                  <stat.icon className={`size-5 ${stat.color}`} />
                </div>
                <span className="text-xs font-medium text-emerald-500">{stat.change}</span>
              </div>
              <p className="mt-3 text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts placeholder */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Revenue Overview</CardTitle>
            <CardDescription>Monthly recurring revenue and growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center rounded-lg bg-muted/30">
              <BarChart3 className="size-8 text-muted-foreground/50" />
              <span className="ml-2 text-sm text-muted-foreground">Chart will render here</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Users */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Recent Users</CardTitle>
          <CardDescription>Latest signups on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center py-12 text-center">
            <Users className="size-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-sm font-medium">No recent user data</h3>
            <p className="text-xs text-muted-foreground">User list will appear as people sign up</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
