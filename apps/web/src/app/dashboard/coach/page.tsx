"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  "How should I prepare for a Google SDE interview?",
  "Help me improve my resume for product management roles",
  "What salary should I expect for 3 years experience?",
  "Create a 30-day interview preparation plan",
  "How do I answer 'Tell me about yourself'?",
  "What are the top skills for data science in 2026?",
];

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm your AI Career Coach. I can help you with interview preparation, resume advice, career guidance, salary negotiation, and more. What would you like to work on?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getMockResponse(userMsg.content),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);
    }, 1500);
  }

  function handleSuggested(q: string) {
    setInput(q);
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Career Coach</h1>
          <p className="text-muted-foreground">Your personal AI assistant for career guidance</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setMessages([messages[0]])}>
          <Plus className="size-4" />
          New Chat
        </Button>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Main Chat */}
        <Card className="flex flex-1 flex-col border-border/50 bg-card/50">
          <ScrollArea ref={scrollRef} className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-3",
                    msg.role === "user" ? "flex-row-reverse" : ""
                  )}
                >
                  <div
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-lg",
                      msg.role === "assistant"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-foreground"
                    )}
                  >
                    {msg.role === "assistant" ? (
                      <Bot className="size-4" />
                    ) : (
                      <User className="size-4" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-4 py-2.5 text-sm",
                      msg.role === "assistant"
                        ? "bg-muted/50 text-foreground"
                        : "bg-primary text-primary-foreground"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                    <Bot className="size-4 text-primary" />
                  </div>
                  <div className="rounded-lg bg-muted/50 px-4 py-2.5">
                    <div className="flex gap-1">
                      <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50" />
                      <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0.1s]" />
                      <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0.2s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t border-border/50 p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                placeholder="Ask me anything about your career..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </Card>

        {/* Sidebar - Suggestions */}
        <Card className="hidden w-72 shrink-0 border-border/50 bg-card/50 lg:block">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Sparkles className="size-4 text-primary" />
              Suggested Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSuggested(q)}
                className="w-full rounded-lg border border-border/50 p-2.5 text-left text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {q}
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function getMockResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("google") || q.includes("sde")) {
    return "For Google SDE interviews, focus on:\n\n**1. Data Structures & Algorithms** (arrays, strings, trees, graphs, DP)\n**2. System Design** (distributed systems, scalability)\n**3. Behavioral Questions** (leadership, collaboration)\n\nI recommend practicing 2-3 LeetCode problems daily, focusing on medium/hard difficulty. Google values problem-solving approach over just getting the right answer. Would you like me to create a detailed study plan?";
  }
  if (q.includes("resume")) {
    return "Here are quick resume optimization tips:\n\n- Use strong action verbs (Led, Built, Optimized, Designed)\n- Quantify achievements with metrics (\"Increased efficiency by 30%\")\n- Include relevant keywords from job descriptions\n- Keep it to 1 page for < 10 years experience\n- Add a skills section with technical & soft skills\n\nWant me to review specific sections of your resume?";
  }
  if (q.includes("salary") || q.includes("negotiation")) {
    return "Great question! For salary negotiation:\n\n1. Research market rates on Glassdoor, AmbitionBox, LinkedIn\n2. Never give your expected salary first - ask for their range\n3. Focus on total compensation (base + bonus + stocks + benefits)\n4. Practice your negotiation script beforehand\n5. For Indian market: be transparent about your current CTC\n\nWould you like to practice a negotiation conversation?";
  }
  if (q.includes("plan") || q.includes("roadmap")) {
    return "Here's a 30-day interview preparation plan:\n\n**Week 1:** Data Structures fundamentals (arrays, strings, hash maps)\n**Week 2:** Advanced DS (trees, graphs, dynamic programming)\n**Week 3:** System Design basics + company-specific research\n**Week 4:** Mock interviews + behavioral prep + weak areas\n\nShall I customize this for your specific target role?";
  }
  if (q.includes("tell me about yourself")) {
    return 'Great question! The "Tell me about yourself" answer should follow this structure:\n\n1. **Present:** Your current role and key responsibilities\n2. **Past:** How your experience led you here (2-3 key achievements)\n3. **Future:** Why you\'re excited about this opportunity\n\nExample: "I\'m a full-stack developer with 4 years of experience building scalable web applications. At my current role, I led a microservices migration that reduced latency by 40%. I\'m excited about this role because it aligns with my passion for building performant systems."\n\nWant to practice your answer?';
  }
  return "That's an excellent question! Let me provide you with a comprehensive response.\n\n**Key Points to Consider:**\n\n1. Focus on your unique strengths and experiences\n2. Prepare specific examples from your background\n3. Practice your responses out loud\n4. Record yourself and analyze your delivery\n\nWould you like me to dive deeper into any specific aspect? I can also help you practice with a mock conversation.";
}
