"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Mic, Square, Send, Clock, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const questionBank: Record<string, string[]> = {
  hr: [
    "Tell me about yourself.",
    "Why do you want to work at our company?",
    "Where do you see yourself in 5 years?",
    "What are your strengths and weaknesses?",
    "Tell me about a time you faced a challenge and how you handled it.",
    "Why did you leave your previous job?",
    "How do you handle working under pressure?",
    "What makes you a good fit for this role?",
  ],
  technical: [
    "Explain the difference between REST and GraphQL.",
    "How does garbage collection work in JavaScript?",
    "Write a function to find the longest palindromic substring.",
    "Explain how you would design a URL shortening service.",
    "What is the Event Loop and how does it work?",
    "How would you optimize a slow database query?",
    "Explain microservices architecture.",
    "What is the difference between let, const, and var?",
  ],
  behavioral: [
    "Tell me about a time you led a team through a difficult project.",
    "Describe a situation where you had a conflict with a colleague.",
    "Tell me about a project that failed and what you learned.",
    "Describe a time you went above and beyond for a customer.",
    "How do you prioritize when you have multiple deadlines?",
    "Tell me about a time you had to learn a new technology quickly.",
    "Describe a situation where you influenced someone's opinion.",
    "Tell me about a time you made a mistake and how you handled it.",
  ],
};

export default function InterviewSessionPage() {
  const params = useParams();
  const router = useRouter();
  const type = params.type as string;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);

  const questions = questionBank[type] || questionBank.hr;

  async function handleSubmit() {
    if (!answer.trim()) {
      toast.error("Please provide an answer");
      return;
    }
    setAnswers((prev) => [...prev, answer]);
    setAnswer("");

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsComplete(true);
      toast.success("Interview complete! Generating your report...");
    }
  }

  const typeLabels: Record<string, string> = {
    hr: "HR Interview",
    technical: "Technical Interview",
    behavioral: "Behavioral Interview",
    "system-design": "System Design Interview",
    product: "Product Management Interview",
  };

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-success/10">
          <AlertCircle className="size-6 text-success" />
        </div>
        <h2 className="mt-4 text-xl font-bold">Interview Complete!</h2>
        <p className="mt-2 text-muted-foreground">
          Your answers have been submitted for AI evaluation.
        </p>
        <p className="text-sm text-muted-foreground">
          Your detailed report will be ready shortly.
        </p>
        <div className="mt-6 flex gap-3">
          <Button onClick={() => router.push("/dashboard/reports")} className="gap-2">
            View Report
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setCurrentQuestion(0);
              setAnswers([]);
              setIsComplete(false);
            }}
          >
            Practice Again
          </Button>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h1 className="text-xl font-bold">
            {typeLabels[type] || "Mock Interview"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>
        <Badge variant="outline" className="ml-auto">
          <Clock className="mr-1 size-3" />
          In Progress
        </Badge>
      </div>

      {/* Progress */}
      <Progress value={progress} className="h-1" />

      {/* Question */}
      <Card className="border-border/50 bg-card/50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <span className="text-xs font-bold text-primary">AI</span>
            </div>
            <div>
              <p className="text-sm font-medium">{questions[currentQuestion]}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Answer in your own words. Be specific and provide examples.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Answer Input */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Button
            variant={isRecording ? "destructive" : "outline"}
            size="sm"
            className="gap-1.5"
            onClick={() => {
              setIsRecording(!isRecording);
              toast(isRecording ? "Recording stopped" : "Recording started...");
            }}
          >
            <Mic className="size-4" />
            {isRecording ? "Stop Recording" : "Record Answer"}
          </Button>
          <span className="text-xs text-muted-foreground">or type your answer below</span>
        </div>

        <Textarea
          placeholder="Type your answer here..."
          className="min-h-32 resize-none"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion((prev) => prev - 1)}
        >
          Previous
        </Button>
        <Button onClick={handleSubmit} className="gap-2" disabled={!answer.trim()}>
          {currentQuestion === questions.length - 1 ? (
            <>Finish Interview <Square className="size-4" /></>
          ) : (
            <>Submit & Next <Send className="size-4" /></>
          )}
        </Button>
      </div>
    </div>
  );
}
