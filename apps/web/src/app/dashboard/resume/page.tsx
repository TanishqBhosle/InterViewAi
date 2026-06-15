"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function ResumePage() {
  const [uploading, setUploading] = useState(false);

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
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      toast.success("Resume uploaded! Analysis in progress...");
    }, 2000);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Resume Analyzer</h1>
        <p className="mt-1 text-muted-foreground">
          Upload your resume for AI-powered ATS scoring and improvement suggestions
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upload Card */}
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
                {uploading ? "Uploading..." : "Choose File"}
              </Button>
              <input
                id="resume-upload"
                type="file"
                className="hidden"
                accept=".pdf,.docx"
                onChange={handleUpload}
              />
            </div>
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

        {/* Analysis Area */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="skills">Skills Matrix</TabsTrigger>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
              <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <Card className="border-border/50">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <FileText className="size-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-base font-medium">No resume uploaded yet</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Upload your resume to get started with the analysis
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills">
              <Card className="border-border/50">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <AlertCircle className="size-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-base font-medium">No analysis data</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Upload a resume to see your skills matrix
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="keywords">
              <Card className="border-border/50">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <AlertCircle className="size-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-base font-medium">No keyword analysis</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Upload a resume to see missing keywords
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="suggestions">
              <Card className="border-border/50">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <AlertCircle className="size-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-base font-medium">No suggestions yet</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Upload a resume to get improvement recommendations
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
