"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, Moon, Sun, ArrowRight, X } from "lucide-react"

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

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Resources", href: "#resources" },
] as const

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
        <AnimatePresence mode="wait">
          {resolvedTheme === "dark" ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Moon className="size-4" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Sun className="size-4" />
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <span className="size-4" />
      )}
    </Button>
  )
}

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2 select-none">
      <motion.span
        aria-hidden
        className="inline-block size-2.5 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 shadow-[0_0_8px_rgba(124,58,237,0.5)]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="text-lg font-semibold tracking-tight">
        Interview
        <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
          AI
        </span>
      </span>
    </Link>
  )
}

function DesktopNav() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)

  return (
    <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
      {NAV_LINKS.map(({ label, href }, index) => (
        <a
          key={href}
          href={href}
          onClick={handleAnchorClick}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className={cn(
            "relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 rounded-md",
            "text-muted-foreground hover:text-foreground"
          )}
        >
          {hoveredIndex === index && (
            <motion.span
              layoutId="nav-hover"
              className="absolute inset-0 rounded-md bg-accent"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{label}</span>
        </a>
      ))}
    </nav>
  )
}

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
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </SheetTrigger>
      <SheetContent side="right" className="w-72 sm:w-80">
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
          {NAV_LINKS.map(({ label, href }, i) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <SheetClose
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
            </motion.div>
          ))}

          <div className="my-3 h-px bg-border/60" />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Login
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <SheetClose
              render={
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "mt-1 flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                />
              }
            >
              Get Started
              <ArrowRight className="size-3.5" />
            </SheetClose>
          </motion.div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export function Header() {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "sticky top-0 z-50 w-full",
        "bg-background/80 backdrop-blur-xl",
        "border-b transition-[border-color,box-shadow] duration-300",
        scrolled
          ? "border-border/50 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "border-transparent"
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />
        <DesktopNav />
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
          <MobileNav />
        </div>
      </div>
    </motion.header>
  )
}
