"use client";

import type React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Brain,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  GraduationCap,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useState } from "react";

interface StoredUser {
  role: string;
  name: string;
  email: string;
}

const studentLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Mock Interviews", href: "/dashboard/interviews", icon: MessageSquare },
  { label: "Resume Analyzer", href: "/dashboard/resume", icon: FileText },
  { label: "AI Career Coach", href: "/dashboard/coach", icon: Brain },
  { label: "Learning Hub", href: "/dashboard/learn", icon: BookOpen },
  { label: "Progress & Reports", href: "/dashboard/reports", icon: BarChart3 },

  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const adminLinks = [
  { label: "Admin Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: GraduationCap },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },

  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user] = useState<StoredUser | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const u = localStorage.getItem("user");
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  });

  const isAdmin = user?.role === "SUPER_ADMIN" || user?.role === "ADMIN";
  const navLinks = isAdmin ? adminLinks : studentLinks;

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    toast.success("Logged out");
    router.push("/");
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border/50 bg-sidebar transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className={cn("flex h-14 items-center border-b border-border/50 px-4", collapsed && "justify-center")}>
          <Link href="/" className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600" />
            {!collapsed && (
              <span className="text-sm font-semibold tracking-tight">
                Interview<span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">AI</span>
              </span>
            )}
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-2">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground",
                  collapsed && "justify-center px-2"
                )}
              >
                <link.icon className="size-4 shrink-0" />
                {!collapsed && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User area */}
        <div className={cn("border-t border-border/50 p-3", collapsed && "text-center")}>
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <Avatar className="size-8">
                <AvatarFallback className="bg-primary/10 text-xs text-primary">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 truncate">
                <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email || ""}</p>
              </div>
              <Button variant="ghost" size="icon" className="size-8 shrink-0" onClick={handleLogout}>
                <LogOut className="size-4" />
              </Button>
            </div>
          ) : (
            <Avatar className="mx-auto size-8">
              <AvatarFallback className="bg-primary/10 text-xs text-primary">{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className={cn("flex flex-1 flex-col transition-all duration-300", collapsed ? "md:ml-16" : "md:ml-64")}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border/50 bg-background/80 backdrop-blur-xl px-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:inline-flex" onClick={() => setCollapsed(!collapsed)}>
            <ChevronLeft className={cn("size-4 transition-transform", collapsed && "rotate-180")} />
          </Button>
          <div className="flex-1" />

        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
