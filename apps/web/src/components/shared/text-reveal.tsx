"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  once?: boolean
}

export function TextReveal({
  children,
  className,
  delay = 0,
  once = true,
}: TextRevealProps) {
  return (
    <span className={cn("inline-block overflow-hidden", className)}>
      <motion.span
        className="inline-block"
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once, margin: "-50px" }}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  )
}

interface WordRevealProps {
  text: string
  className?: string
  delay?: number
  once?: boolean
}

export function WordReveal({
  text,
  className,
  delay = 0,
  once = true,
}: WordRevealProps) {
  const words = text.split(" ")

  return (
    <span className={cn("inline", className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.04,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

interface CharRevealProps {
  text: string
  className?: string
  delay?: number
  once?: boolean
}

export function CharReveal({
  text,
  className,
  delay = 0,
  once = true,
}: CharRevealProps) {
  return (
    <span className={cn("inline", className)}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once, margin: "-50px" }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.02,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  )
}
