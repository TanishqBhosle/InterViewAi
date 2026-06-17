"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Camera,
  Mic,
  Clock,
  FileText,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

const experienceLevels = [
  { value: "FRESHER", label: "Fresher (0-1 years)" },
  { value: "JUNIOR", label: "Junior (1-3 years)" },
  { value: "MID", label: "Mid-Level (3-5 years)" },
  { value: "SENIOR", label: "Senior (5-8 years)" },
  { value: "STAFF", label: "Staff (8+ years)" },
  { value: "PRINCIPAL", label: "Principal (10+ years)" },
]

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "ML Engineer",
  "AI Engineer",
  "Product Manager",
  "DevOps Engineer",
  "SDE",
  "Cyber Security Engineer",
]

export default function CompanyInterviewSetupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const companyName = searchParams.get("company") || ""

  const [role, setRole] = useState("")
  const [experienceLevel, setExperienceLevel] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [cameraEnabled, setCameraEnabled] = useState(false)
  const [microphoneEnabled, setMicrophoneEnabled] = useState(false)
  const [duration, setDuration] = useState("45")
  const [loading, setLoading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)

  async function handleStartInterview() {
    if (!role) {
      toast.error("Please select a role")
      return
    }
    if (!experienceLevel) {
      toast.error("Please select experience level")
      return
    }

    setLoading(true)
    setAnalyzing(true)

    try {
      const token = localStorage.getItem("accessToken")
      const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1"

      const res = await fetch(`${base}/company-interviews/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          companyName,
          role,
          experienceLevel,
          jobDescription: jobDescription || undefined,
          cameraEnabled,
          microphoneEnabled,
          interviewDuration: parseInt(duration),
        }),
      })

      const json = await res.json()

      if (json.success) {
        toast.success("Interview started! Analyzing company and generating questions...")
        router.push(`/dashboard/interview/company/session?id=${json.sessionId}`)
      } else {
        toast.error(json.message || "Failed to start interview")
      }
    } catch (error) {
      toast.error("Could not connect to server")
    } finally {
      setLoading(false)
      setAnalyzing(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Interview Setup</h1>
          <p className="text-muted-foreground">
            {companyName === "custom" ? "Custom Company" : companyName}
          </p>
        </div>
      </motion.div>

      {analyzing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-lg border border-primary/20 bg-primary/5 p-4"
        >
          <div className="flex items-center gap-3">
            <Loader2 className="size-5 animate-spin text-primary" />
            <div>
              <p className="font-medium">Analyzing company and generating questions...</p>
              <p className="text-sm text-muted-foreground">
                This may take a moment as we tailor questions for {companyName}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="size-5" />
              Role Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Target Role *</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Experience Level *</Label>
              <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Job Description (Optional)</Label>
              <Textarea
                placeholder="Paste the job description here for more tailored questions..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-24"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="size-5" />
              Interview Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Interview Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant={cameraEnabled ? "default" : "outline"}
                size="sm"
                className="gap-2"
                onClick={() => setCameraEnabled(!cameraEnabled)}
              >
                <Camera className="size-4" />
                Camera {cameraEnabled ? "ON" : "OFF"}
              </Button>
              <Button
                variant={microphoneEnabled ? "default" : "outline"}
                size="sm"
                className="gap-2"
                onClick={() => setMicrophoneEnabled(!microphoneEnabled)}
              >
                <Mic className="size-4" />
                Microphone {microphoneEnabled ? "ON" : "OFF"}
              </Button>
            </div>

            {(cameraEnabled || microphoneEnabled) && (
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-sm text-muted-foreground">
                  {cameraEnabled && "Camera will be used for body language analysis. "}
                  {microphoneEnabled && "Microphone will be used for speech analysis. "}
                  Make sure you're in a quiet environment with good lighting.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-end gap-3"
      >
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button
          onClick={handleStartInterview}
          disabled={loading || !role || !experienceLevel}
          className="gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Starting...
            </>
          ) : (
            <>
              Start Interview
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </motion.div>
    </div>
  )
}
