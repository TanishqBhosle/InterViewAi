"use client"

import { useEffect, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  life: number
  maxLife: number
}

interface ParticlesProps {
  className?: string
  count?: number
  color?: string
  speed?: number
  interactive?: boolean
  maxDistance?: number
}

export function Particles({
  className,
  count = 50,
  color = "var(--brand)",
  speed = 0.5,
  interactive = true,
  maxDistance = 120,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const frameRef = useRef<number>(0)

  const initParticle = useCallback(
    (canvas: HTMLCanvasElement): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
      life: 0,
      maxLife: Math.random() * 200 + 100,
    }),
    [speed]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener("resize", resize)

    particlesRef.current = Array.from({ length: count }, () =>
      initParticle(canvas)
    )

    function animate() {
      if (!canvas || !ctx) return
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      particlesRef.current.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        p.life++

        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        const dx = mouseRef.current.x - p.x
        const dy = mouseRef.current.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (interactive && dist < maxDistance) {
          const force = (maxDistance - dist) / maxDistance
          p.vx -= (dx / dist) * force * 0.02
          p.vy -= (dy / dist) * force * 0.02
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.globalAlpha = p.alpha * (1 - p.life / p.maxLife)
        ctx.fill()

        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j]
          const dx2 = p.x - p2.x
          const dy2 = p.y - p2.y
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)

          if (dist2 < maxDistance) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = color
            ctx.globalAlpha =
              p.alpha *
              (1 - dist2 / maxDistance) *
              0.2 *
              (1 - p.life / p.maxLife)
            ctx.stroke()
          }
        }

        ctx.globalAlpha = 1

        if (p.life > p.maxLife) {
          particlesRef.current[i] = initParticle(canvas)
        }
      })

      frameRef.current = requestAnimationFrame(animate)
    }

    animate()

    function onMouseMove(e: MouseEvent) {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }
    if (interactive) {
      window.addEventListener("mousemove", onMouseMove)
    }

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouseMove)
    }
  }, [count, color, speed, interactive, maxDistance, initParticle])

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    />
  )
}
