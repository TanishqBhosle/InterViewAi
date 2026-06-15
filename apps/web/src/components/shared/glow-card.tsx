"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  as?: "div" | "button" | "a"
  href?: string
}

export function GlowCard({
  children,
  className,
  glowColor = "rgba(120, 80, 240, 0.15)",
  as: Component = "div",
  ...props
}: GlowCardProps & Record<string, unknown>) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setOpacity(1)
  }

  function handleMouseLeave() {
    setOpacity(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-xl border border-border/50 bg-card transition-colors duration-300",
        "hover:border-border/80",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -4 }}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)`,
          opacity,
          transition: "opacity 0.3s",
        }}
      />
      {children}
    </motion.div>
  )
}

interface BentoCardProps {
  children: React.ReactNode
  className?: string
  colSpan?: number
  rowSpan?: number
  glowColor?: string
}

export function BentoCard({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
  glowColor,
}: BentoCardProps) {
  return (
    <GlowCard
      glowColor={glowColor}
      className={cn(
        "p-6 sm:p-8",
        colSpan > 1 && `sm:col-span-${colSpan}`,
        rowSpan > 1 && `sm:row-span-${rowSpan}`,
        className
      )}
    >
      {children}
    </GlowCard>
  )
}
