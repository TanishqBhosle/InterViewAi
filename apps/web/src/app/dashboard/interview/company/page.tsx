"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Building2,
  Search,
  ArrowRight,
  Star,
  TrendingUp,
  Users,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { GlowCard } from "@/components/shared/glow-card"

interface Company {
  id: string
  name: string
  industry: string
  description?: string
  techStack: string[]
  isFAANG: boolean
  size?: string
}

export default function CompanySelectionPage() {
  const router = useRouter()
  const [companies, setCompanies] = useState<Company[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

  useEffect(() => {
    fetchCompanies()
  }, [])

  async function fetchCompanies() {
    try {
      const token = localStorage.getItem("accessToken")
      const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1"
      const res = await fetch(`${base}/company-interviews/company/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      if (json.success) {
        setCompanies(json.companies || [])
      }
    } catch {
      // Use default companies if API fails
      setCompanies(getDefaultCompanies())
    } finally {
      setLoading(false)
    }
  }

  function getDefaultCompanies(): Company[] {
    return [
      { id: "1", name: "Google", industry: "Technology", techStack: ["Java", "Python", "Go", "React"], isFAANG: true, size: "10000+" },
      { id: "2", name: "Amazon", industry: "Technology", techStack: ["Java", "Python", "AWS", "React"], isFAANG: true, size: "10000+" },
      { id: "3", name: "Meta", industry: "Technology", techStack: ["React", "Python", "C++", "Hack"], isFAANG: true, size: "10000+" },
      { id: "4", name: "Microsoft", industry: "Technology", techStack: ["C#", ".NET", "TypeScript", "React"], isFAANG: true, size: "10000+" },
      { id: "5", name: "Apple", industry: "Technology", techStack: ["Swift", "Objective-C", "SwiftUI"], isFAANG: true, size: "10000+" },
      { id: "6", name: "Netflix", industry: "Technology", techStack: ["Java", "Python", "React", "AWS"], isFAANG: true, size: "10000+" },
      { id: "7", name: "Flipkart", industry: "E-Commerce", techStack: ["Java", "React", "Kotlin", "Spring"], isFAANG: false, size: "5000+" },
      { id: "8", name: "Razorpay", industry: "Fintech", techStack: ["Java", "React", "Go", "Node.js"], isFAANG: false, size: "1000+" },
      { id: "9", name: "Swiggy", industry: "Food Tech", techStack: ["Python", "React", "Go", "Kotlin"], isFAANG: false, size: "5000+" },
      { id: "10", name: "Zomato", industry: "Food Tech", techStack: ["Java", "React", "Kotlin", "Python"], isFAANG: false, size: "5000+" },
      { id: "11", name: "PhonePe", industry: "Fintech", techStack: ["Java", "React", "Go", "Kotlin"], isFAANG: false, size: "1000+" },
      { id: "12", name: "Atlassian", industry: "SaaS", techStack: ["Java", "React", "TypeScript", "Kotlin"], isFAANG: false, size: "1000+" },
    ]
  }

  const filteredCompanies = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const faangCompanies = filteredCompanies.filter((c) => c.isFAANG)
  const otherCompanies = filteredCompanies.filter((c) => !c.isFAANG)

  function handleSelectCompany(company: Company) {
    setSelectedCompany(company)
    router.push(`/dashboard/interview/company/setup?company=${encodeURIComponent(company.name)}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold">Company-Specific Interview</h1>
        <p className="mt-2 text-muted-foreground">
          Select a company to start a tailored mock interview
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search companies by name or industry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* FAANG Companies */}
      {faangCompanies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-4 flex items-center gap-2">
            <Star className="size-5 text-yellow-500" />
            <h2 className="text-xl font-bold">FAANG Companies</h2>
            <Badge variant="secondary">Premium</Badge>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {faangCompanies.map((company, i) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i }}
              >
                <GlowCard
                  className="cursor-pointer p-6 transition-all hover:scale-[1.02]"
                  glowColor="rgba(234, 179, 8, 0.15)"
                  onClick={() => handleSelectCompany(company)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
                      <Building2 className="size-6 text-yellow-500" />
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-500">FAANG</Badge>
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{company.name}</h3>
                  <p className="text-sm text-muted-foreground">{company.industry}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {company.techStack.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button className="mt-4 w-full gap-2" size="sm">
                    Start Interview <ArrowRight className="size-4" />
                  </Button>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Other Companies */}
      {otherCompanies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="size-5 text-primary" />
            <h2 className="text-xl font-bold">Top Companies</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherCompanies.map((company, i) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i }}
              >
                <Card
                  className="cursor-pointer p-6 transition-all hover:scale-[1.02] hover:border-primary/50"
                  onClick={() => handleSelectCompany(company)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                      <Building2 className="size-6 text-primary" />
                    </div>
                    <Badge variant="outline">{company.industry}</Badge>
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{company.name}</h3>
                  <p className="text-sm text-muted-foreground">{company.size} employees</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {company.techStack.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button className="mt-4 w-full gap-2" variant="outline" size="sm">
                    Start Interview <ArrowRight className="size-4" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Custom Company */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
              <Users className="size-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-bold">Don't see your company?</h3>
              <p className="text-sm text-muted-foreground">
                We can analyze any company and create a custom interview
              </p>
            </div>
          </div>
          <Button
            className="mt-4 gap-2"
            variant="outline"
            onClick={() => router.push("/dashboard/interview/company/setup?company=custom")}
          >
            Add Custom Company <ArrowRight className="size-4" />
          </Button>
        </Card>
      </motion.div>
    </div>
  )
}
