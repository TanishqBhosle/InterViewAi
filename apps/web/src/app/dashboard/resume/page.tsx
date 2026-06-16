"use client";

import { useState, useEffect } from "react";
import { Upload, FileText, CheckCircle, AlertCircle, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";

interface ResumeData {
  id: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  status: string;
  atsScore: number | null;
  skillsFound: string[];
  missingKeywords: string[];
  suggestions: string[];
  analysisReport: Record<string, unknown> | null;
  createdAt: string;
}

export default function ResumePage() {
  const [uploading, setUploading] = useState(false);
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await apiClient<ResumeData[]>("/resume");
        if (data.success && data.data?.length) {
          setResume(data.data[0]);
        }
      } catch {
        // No resume yet
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be under 10MB");
      return;
    }
    const allowed = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type)) {
      toast.error("Only PDF and DOCX files are supported");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resume/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const json = await res.json();
      if (json.success) {
        setResume(json.resume);
        toast.success("Resume analyzed successfully!");
      } else {
        toast.error(json.message || "Upload failed");
      }
    } catch {
      toast.error("Failed to upload resume");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete() {
    if (!resume) return;
    try {
      await apiClient(`/resume/${resume.id}`, { method: "DELETE" });
      setResume(null);
      toast.success("Resume deleted");
    } catch {
      toast.error("Failed to delete resume");
    }
  }

  const atsScore = resume?.atsScore ?? 0;
  const atsColor = atsScore >= 80 ? "text-emerald-500" : atsScore >= 60 ? "text-amber-500" : "text-rose-500";
  const skills = resume?.skillsFound || [];
  const keywords = resume?.missingKeywords || [];
  const suggestions = resume?.suggestions || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Resume Analyzer</h1>
        <p className="mt-1 text-muted-foreground">
          Upload your resume for AI-powered ATS scoring and improvement suggestions
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-dashed border-2 border-border/50 bg-card/50 lg:col-span-1">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
              <Upload className="size-6 text-primary" />
            </div>
            <h3 className="mt-4 text-base font-semibold">Upload Resume</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              PDF or DOCX, max 10MB
            </p>
            <div className="mt-6">
              <Button
                disabled={uploading}
                className="gap-2"
                onClick={() => document.getElementById("resume-upload")?.click()}
              >
                <Upload className="size-4" />
                {uploading ? "Uploading..." : resume ? "Replace File" : "Choose File"}
              </Button>
              <input
                id="resume-upload"
                type="file"
                className="hidden"
                accept=".pdf,.docx"
                onChange={handleUpload}
              />
            </div>
            {resume && (
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="gap-1 text-xs text-muted-foreground" onClick={handleDelete}>
                  <Trash2 className="size-3" />
                  Delete
                </Button>
              </div>
            )}
            <div className="mt-6 w-full space-y-2">
              {[
                "Parse resume and extract skills",
                "Calculate ATS compatibility score",
                "Identify missing keywords",
                "Generate improvement report",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle className="size-3 text-primary" />
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="skills">Skills Matrix</TabsTrigger>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
              <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              {resume ? (
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">{resume.fileName}</CardTitle>
                    <CardDescription>
                      Uploaded {new Date(resume.createdAt).toLocaleDateString()} &middot;{" "}
                      {(resume.fileSize / 1024).toFixed(1)} KB
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col items-center py-4">
                      <div className={`text-5xl font-bold ${atsColor}`}>{atsScore}</div>
                      <p className="text-sm text-muted-foreground mt-1">ATS Score</p>
                      <Progress value={atsScore} className="mt-3 h-2 w-48" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Skills Found</p>
                        <p className="font-semibold">{skills.length}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Missing Keywords</p>
                        <p className="font-semibold">{keywords.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-border/50">
                  <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                    <FileText className="size-12 text-muted-foreground/50" />
                    <h3 className="mt-4 text-base font-medium">No resume uploaded yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Upload your resume to get started with the analysis
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="skills">
              {resume && skills.length > 0 ? (
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Skills Found</CardTitle>
                    <CardDescription>Extracted from your resume</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((s: string) => (
                        <Badge key={s} variant="secondary">{s}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-border/50">
                  <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                    <AlertCircle className="size-12 text-muted-foreground/50" />
                    <h3 className="mt-4 text-base font-medium">No analysis data</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Upload a resume to see your skills matrix
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="keywords">
              {resume && keywords.length > 0 ? (
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Missing Keywords</CardTitle>
                    <CardDescription>Keywords to add for better ATS matching</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {keywords.map((k: string) => (
                        <Badge key={k} variant="outline" className="border-amber-500/30 text-amber-500">{k}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-border/50">
                  <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                    <AlertCircle className="size-12 text-muted-foreground/50" />
                    <h3 className="mt-4 text-base font-medium">No keyword analysis</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Upload a resume to see missing keywords
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="suggestions">
              {resume && suggestions.length > 0 ? (
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Improvement Suggestions</CardTitle>
                    <CardDescription>Actionable tips to improve your resume</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {suggestions.map((s: string, i: number) => (
                        <li key={i} className="flex gap-3 text-sm">
                          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                            {i + 1}
                          </span>
                          <span className="text-muted-foreground">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-border/50">
                  <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                    <AlertCircle className="size-12 text-muted-foreground/50" />
                    <h3 className="mt-4 text-base font-medium">No suggestions yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Upload a resume to get improvement recommendations
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}