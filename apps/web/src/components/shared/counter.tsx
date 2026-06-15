"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface CounterProps {
  end?: number
  value?: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
  label?: string
}

export function Counter({
  end,
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className,
  label,
}: CounterProps) {
  const target = end ?? value ?? 0
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    let rafId: number

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * target))

      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      }
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [isInView, target, duration])

  return (
    <div ref={ref} className={cn("flex flex-col items-center", className)}>
      <span className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {prefix}
        {count}
        {suffix}
      </span>
      {label && (
        <span className="mt-1 text-sm text-muted-foreground">{label}</span>
      )}
    </div>
  )
}
