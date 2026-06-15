import Link from "next/link";
import { siteConfig } from "@/config/site";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Mock Interviews", href: "/interview" },
    { label: "Resume Analyzer", href: "/resume" },
    { label: "AI Career Coach", href: "/coach" },
    { label: "Learning Hub", href: "/learn" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Partners", href: "/partners" },
  ],
  Resources: [
    { label: "Interview Guides", href: "/learn/guides" },
    { label: "System Design", href: "/learn/system-design" },
    { label: "DSA Practice", href: "/learn/dsa" },
    { label: "Company Prep", href: "/learn/companies" },
    { label: "Salary Insights", href: "/learn/salary" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-1.5">
              <span
                aria-hidden
                className="inline-block size-2 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600"
              />
              <span className="text-lg font-semibold tracking-tight">
                Interview
                <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
                  AI
                </span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              India&apos;s #1 AI-powered interview preparation platform. Practice,
              analyze, and ace your interviews.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Made with care in India
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold">{category}</h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
