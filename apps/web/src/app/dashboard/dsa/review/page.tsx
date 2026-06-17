"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { RotateCcw, CheckCircle2, XCircle, ChevronRight, Brain } from "lucide-react";

interface RevisionCard {
  id: string;
  problemId: string;
  nextReview: string;
  interval: number;
  ease: number;
  reviews: number;
  rating: number;
  problem: {
    title: string;
    slug: string;
    leetcodeId: number;
    difficulty: string;
    tags: string[];
  };
}

export default   function DSAReviewPage() {
  const [cards, setCards] = useState<RevisionCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewing, setReviewing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient<RevisionCard[]>("/dsa/revision/queue");
        if (res.success && res.data) setCards(res.data);
      } catch {} finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleReview = async (rating: number) => {
    if (!cards[currentIndex]) return;
    setReviewing(true);
    try {
      const res = await apiClient("/dsa/revision/review", {
        method: "POST",
        body: JSON.stringify({ problemId: cards[currentIndex].problemId, rating }),
      });
      if (res.success) {
        toast.success("Review recorded!");
        setCards((prev) => prev.filter((_, i) => i !== currentIndex));
        setCurrentIndex(0);
        setShowAnswer(false);
      }
    } catch {
      toast.error("Failed to record review");
    } finally {
      setReviewing(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Spaced Repetition Review</h1>
        <p className="text-muted-foreground">Review problems due for revision using SM-2 algorithm</p>
      </div>

      <div className="flex items-center gap-4">
        <Card className="border-border/50 bg-background/80 backdrop-blur-xl flex-1">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-full bg-blue-500/10">
              <RotateCcw className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{cards.length}</p>
              <p className="text-sm text-muted-foreground">Cards due for review</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-background/80 backdrop-blur-xl flex-1">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-full bg-purple-500/10">
              <Brain className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{currentIndex + 1}/{cards.length}</p>
              <p className="text-sm text-muted-foreground">Current position</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {cards.length === 0 ? (
        <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-12 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">All caught up!</h2>
            <p className="text-muted-foreground">No cards due for review. Come back later.</p>
          </CardContent>
        </Card>
      ) : currentCard ? (
        <Card className="border-border/50 bg-background/80 backdrop-blur-xl">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div>
                <span className="text-sm text-muted-foreground">#{currentCard.problem.leetcodeId}</span>
                <h2 className="text-2xl font-bold mt-1">{currentCard.problem.title}</h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Badge variant={currentCard.problem.difficulty === "EASY" ? "default" : currentCard.problem.difficulty === "MEDIUM" ? "secondary" : "destructive"}>
                    {currentCard.problem.difficulty}
                  </Badge>
                  <span className="text-sm text-muted-foreground">Reviewed {currentCard.reviews} times</span>
                </div>
              </div>

              {!showAnswer ? (
                <Button onClick={() => setShowAnswer(true)} size="lg" className="gap-2">
                  Show Answer
                </Button>
              ) : (
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-muted text-left">
                    <p className="text-sm font-medium mb-2">How well did you remember?</p>
                    <p className="text-xs text-muted-foreground">
                      Interval: {currentCard.interval} days | Ease: {currentCard.ease.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3">
                    <Button variant="destructive" onClick={() => handleReview(0)} disabled={reviewing} className="gap-2">
                      <XCircle className="h-4 w-4" /> Again (0)
                    </Button>
                    <Button variant="outline" onClick={() => handleReview(2)} disabled={reviewing} className="gap-2">
                      Hard (2)
                    </Button>
                    <Button variant="outline" onClick={() => handleReview(3)} disabled={reviewing} className="gap-2">
                      Good (3)
                    </Button>
                    <Button onClick={() => handleReview(5)} disabled={reviewing} className="gap-2 bg-green-600 hover:bg-green-700">
                      <CheckCircle2 className="h-4 w-4" /> Easy (5)
                    </Button>
                  </div>

                  <Link href={`/dsa/problems/${currentCard.problemId}`}>
                    <Button variant="link" className="gap-2">
                      View Problem <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
