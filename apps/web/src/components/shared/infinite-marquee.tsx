"use client"

import { cn } from "@/lib/utils"

interface InfiniteMarqueeProps {
  items: React.ReactNode[]
  className?: string
  direction?: "left" | "right"
  speed?: number
  pauseOnHover?: boolean
}

export function InfiniteMarquee({
  items,
  className,
  direction = "left",
  speed = 30,
  pauseOnHover = true,
}: InfiniteMarqueeProps) {
  return (
    <div
      className={cn(
        "relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 gap-8 py-4",
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-center">
            {item}
          </div>
        ))}
      </div>
      <div
        className={cn(
          "flex shrink-0 gap-8 py-4",
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{ animationDuration: `${speed}s` }}
        aria-hidden="true"
      >
        {items.map((item, i) => (
          <div key={`dup-${i}`} className="flex items-center justify-center">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
