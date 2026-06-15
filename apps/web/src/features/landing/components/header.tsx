"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Menu, Moon, Sun, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#resources" },
] as const

// ---------------------------------------------------------------------------
// Smooth‑scroll helper (respects reduced‑motion)
// ---------------------------------------------------------------------------

function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute("href")
  if (!href?.startsWith("#")) return

  const target = document.querySelector(href)
  if (!target) return

  e.preventDefault()
  target.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  })
}

// ---------------------------------------------------------------------------
// Theme Toggle
// ---------------------------------------------------------------------------

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative size-8 rounded-full"
    >
      {mounted ? (
        <>
          <Sun className="size-4 rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-4 rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100" />
        </>
      ) : (
        /* Prevents hydration mismatch – render a neutral placeholder */
        <span className="size-4" />
      )}
    </Button>
  )
}

// ---------------------------------------------------------------------------
// Logo
// ---------------------------------------------------------------------------

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-1.5 select-none">
      {/* Gradient accent dot */}
      <span
        aria-hidden
        className="inline-block size-2 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 shadow-[0_0_6px_rgba(124,58,237,0.5)] transition-shadow duration-300 group-hover:shadow-[0_0_12px_rgba(124,58,237,0.7)]"
      />
      <span className="text-lg font-semibold tracking-tight text-foreground">
        Interview
        <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
          AI
        </span>
      </span>
    </Link>
  )
}

// ---------------------------------------------------------------------------
// Desktop Navigation
// ---------------------------------------------------------------------------

function DesktopNav() {
  return (
    <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
      {NAV_LINKS.map(({ label, href }) => (
        <a
          key={href}
          href={href}
          onClick={handleAnchorClick}
          className={cn(
            "relative px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200",
            "hover:text-foreground",
            // Subtle underline indicator on hover
            "after:absolute after:inset-x-3 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-foreground/60 after:transition-transform after:duration-200",
            "hover:after:scale-x-100"
          )}
        >
          {label}
        </a>
      ))}
    </nav>
  )
}

// ---------------------------------------------------------------------------
// Mobile Navigation (Sheet)
// ---------------------------------------------------------------------------

function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent side="right" className="w-72 sm:w-80">
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
          {NAV_LINKS.map(({ label, href }) => (
            <SheetClose
              key={href}
              render={
                <a
                  href={href}
                  onClick={(e) => {
                    handleAnchorClick(e)
                    setOpen(false)
                  }}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                />
              }
            >
              {label}
            </SheetClose>
          ))}

          {/* Divider */}
          <div className="my-3 h-px bg-border/60" />

          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Login
          </Link>

          <Link
            href="/register"
            onClick={() => setOpen(false)}
            className={cn(
              "mt-1 flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            Get Started
            <ArrowRight className="size-3.5" />
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

// ---------------------------------------------------------------------------
// Header (exported)
// ---------------------------------------------------------------------------

export function Header() {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll() // initial check
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        // Layout
        "sticky top-0 z-50 w-full",
        // Glass morphism
        "bg-background/80 backdrop-blur-xl",
        // Bottom border – visible only after scroll
        "border-b transition-[border-color,box-shadow] duration-300",
        scrolled
          ? "border-border/50 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "border-transparent",
        // Fade-in animation on mount
        "animate-in fade-in slide-in-from-top-2 duration-500 fill-mode-both"
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left – Logo */}
        <Logo />

        {/* Center – Desktop nav */}
        <DesktopNav />

        {/* Right – Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Link href="/login" className="hidden md:inline-flex">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Login
            </Button>
          </Link>

          <Link href="/register" className="hidden md:inline-flex">
            <Button size="sm" className="gap-1.5">
              Get Started
              <ArrowRight className="size-3.5" />
            </Button>
          </Link>

          {/* Mobile hamburger */}
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
