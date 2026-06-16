"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink, MessageCircle, Link2, Video, Mail } from "lucide-react"

import { MotionDiv } from "@/components/shared/motion-div"

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Integrations", href: "#" },
    { label: "API", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Partners", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Community", href: "#" },
    { label: "Status", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },

    { label: "Cookie Policy", href: "#" },
  ],
}

const socialLinks = [
  { icon: ExternalLink, href: "#", label: "GitHub" },
  { icon: MessageCircle, href: "#", label: "Twitter" },
  { icon: Link2, href: "#", label: "LinkedIn" },
  { icon: Video, href: "#", label: "YouTube" },
]

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <MotionDiv className="col-span-2 md:col-span-1" direction="none">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="inline-block size-2.5 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 shadow-[0_0_8px_rgba(124,58,237,0.5)]" />
              <span className="text-lg font-semibold tracking-tight">
                Interview
                <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
                  AI
                </span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              India&apos;s #1 AI-powered interview preparation platform. 
              Practice, improve, and land your dream job.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="size-3.5" />
                </motion.a>
              ))}
            </div>
          </MotionDiv>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links], colIdx) => (
            <MotionDiv key={title} direction="none" delay={colIdx * 0.05}>
              <h4 className="text-sm font-semibold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </MotionDiv>
          ))}
        </div>


        {/* Bottom bar */}
        <MotionDiv
          className="mt-8 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4"
          direction="none"
        >
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} InterviewAI India. Made with care in India.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Support
            </a>
          </div>
        </MotionDiv>
      </div>
    </footer>
  )
}
