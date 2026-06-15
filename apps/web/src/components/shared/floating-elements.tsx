"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  xOffset?: number
  yOffset?: number
  style?: React.CSSProperties
}

export function FloatingElement({
  children,
  className,
  delay = 0,
  duration = 6,
  xOffset = 0,
  yOffset = 20,
  style,
}: FloatingElementProps) {
  return (
    <motion.div
      className={cn("will-change-transform", className)}
      style={style}
      animate={{
        y: [0, -yOffset, 0],
        x: [0, xOffset, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

export function FloatingOrb({
  className,
  size = 300,
  color = "from-violet-500/20 to-transparent",
  delay = 0,
}: {
  className?: string
  size?: number
  color?: string
  delay?: number
}) {
  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute rounded-full bg-gradient-to-br blur-3xl",
        color,
        className
      )}
      style={{ width: size, height: size }}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -40, 20, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  )
}
