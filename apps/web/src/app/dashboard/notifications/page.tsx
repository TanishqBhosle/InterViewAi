"use client";

import { useEffect, useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const mockNotifications = [
  { id: "1", title: "Interview Complete", message: "Your HR interview report is ready to view", time: "2 hours ago", read: false },
  { id: "2", title: "Resume Analyzed", message: "Your resume ATS score is 78. Check suggestions for improvement.", time: "1 day ago", read: false },
  { id: "3", title: "Subscription", message: "Your Pro plan will expire in 7 days. Renew to continue.", time: "3 days ago", read: true },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your activity</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5" onClick={markAllRead}>
          <CheckCheck className="size-4" />
          Mark all read
        </Button>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-0">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <Bell className="size-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-sm font-medium">No notifications</h3>
              <p className="text-xs text-muted-foreground">You&apos;re all caught up!</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={cn(
                  "flex items-start gap-4 border-b border-border/50 p-4 last:border-0",
                  !n.read && "bg-primary/5"
                )}
              >
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-lg",
                    n.read ? "bg-muted" : "bg-primary/10"
                  )}
                >
                  <Bell className={cn("size-5", n.read ? "text-muted-foreground" : "text-primary")} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.message}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{n.time}</p>
                </div>
                {!n.read && <span className="mt-1.5 size-2 rounded-full bg-primary" />}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
