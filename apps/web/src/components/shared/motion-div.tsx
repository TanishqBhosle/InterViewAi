"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"

type MotionDivProps = HTMLMotionProps<"div"> & {
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  duration?: number
  distance?: number
  once?: boolean
}

const directionVariants = {
  up: { y: 60 },
  down: { y: -60 },
  left: { x: 60 },
  right: { x: -60 },
  none: { y: 0 },
}

export function MotionDiv({
  children,
  delay = 0,
  direction = "up",
  duration = 0.6,
  distance = 60,
  once = true,
  className,
  ...props
}: MotionDivProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...directionVariants[direction],
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, ...directionVariants[direction] }
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({
  children,
  className,
  delay = 0,
  staggerDelay = 0.1,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  staggerDelay?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  direction = "up",
}: {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
          x: direction === "left" ? 30 : direction === "right" ? -30 : 0,
        },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
