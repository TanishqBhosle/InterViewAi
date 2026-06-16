"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Plus } from "lucide-react";
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
  const [sessionId, setSessionId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Create a new chat session on mount
  useEffect(() => {
    async function initSession() {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coach/sessions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ title: "Career Coach Chat", context: "general" }),
        });
        const json = await res.json();
        if (json.success) {
          setSessionId(json.session.id);
        }
      } catch {
        // Session creation failed — will use mock fallback
      }
    }
    initSession();
  }, []);

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

    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coach/sessions/${sessionId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ role: "user", content: userMsg.content }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      const assistantMsg: Message = {
        id: json.aiMessage.id,
        role: "assistant",
        content: json.aiMessage.content,
        timestamp: new Date(json.aiMessage.createdAt),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to get AI response");
    } finally {
      setIsLoading(false);
    }
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
        <Button variant="outline" size="sm" className="gap-1.5" onClick={async () => {
          setMessages([messages[0]]);
          try {
            const accessToken = localStorage.getItem("accessToken");
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coach/sessions`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify({ title: "Career Coach Chat", context: "general" }),
            });
            const json = await res.json();
            if (json.success) setSessionId(json.session.id);
          } catch {}
        }}>
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


