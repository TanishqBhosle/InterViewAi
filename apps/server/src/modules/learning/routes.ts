import { Router } from "express";
import { authenticate } from "@/middleware/auth";
import { prisma } from "@/config/database";

const router = Router();
router.use(authenticate);

// ============================================
// SUBJECTS
// ============================================

router.get("/subjects", async (_req, res) => {
  try {
    const subjects = await prisma.subject.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
      include: {
        _count: { select: { topics: true } },
      },
    });
    res.json({ success: true, data: subjects });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/subjects/:slug", async (req, res) => {
  try {
    const subject = await prisma.subject.findUnique({
      where: { slug: req.params.slug },
      include: {
        topics: {
          orderBy: { order: "asc" },
          include: {
            _count: { select: { subtopics: true } },
          },
        },
      },
    });
    if (!subject) return res.status(404).json({ success: false, message: "Subject not found" });
    res.json({ success: true, data: subject });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ============================================
// TOPICS
// ============================================

router.get("/topics/:slug", async (req, res) => {
  try {
    const { subjectSlug } = req.query;
    const where: any = { slug: req.params.slug };
    if (subjectSlug) {
      where.subject = { slug: subjectSlug as string };
    }
    const topic = await prisma.topic.findFirst({
      where,
      include: {
        subtopics: { orderBy: { order: "asc" } },
        subject: true,
      },
    });
    if (!topic) return res.status(404).json({ success: false, message: "Topic not found" });
    res.json({ success: true, data: topic });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ============================================
// SUBTOPICS (with full content)
// ============================================

router.get("/subtopics/:id", async (req, res) => {
  try {
    const subtopic = await prisma.subtopic.findUnique({
      where: { id: req.params.id },
      include: {
        topic: {
          include: { subject: true },
        },
      },
    });
    if (!subtopic) return res.status(404).json({ success: false, message: "Subtopic not found" });

    // Get user progress
    const progress = await prisma.userProgress.findUnique({
      where: {
        userId_subtopicId: {
          userId: req.user!.userId,
          subtopicId: subtopic.id,
        },
      },
    });

    res.json({ success: true, data: { ...subtopic, userProgress: progress } });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Get subtopic by slug with next/previous navigation
router.get("/subtopics/by-slug/:slug", async (req, res) => {
  try {
    const { topicSlug, subjectSlug } = req.query;

    // Find the topic and subject
    const subject = await prisma.subject.findUnique({ where: { slug: subjectSlug as string } });
    if (!subject) return res.status(404).json({ success: false, message: "Subject not found" });

    const topic = await prisma.topic.findFirst({
      where: { slug: topicSlug as string, subjectId: subject.id },
      include: {
        subtopics: { orderBy: { order: "asc" } },
      },
    });
    if (!topic) return res.status(404).json({ success: false, message: "Topic not found" });

    const subtopicIndex = topic.subtopics.findIndex((s) => s.slug === req.params.slug);
    if (subtopicIndex === -1) return res.status(404).json({ success: false, message: "Subtopic not found" });

    const subtopic = topic.subtopics[subtopicIndex];

    const prevSubtopic = subtopicIndex > 0 ? topic.subtopics[subtopicIndex - 1] : null;
    const nextSubtopic = subtopicIndex < topic.subtopics.length - 1 ? topic.subtopics[subtopicIndex + 1] : null;

    // Get user progress
    const progress = await prisma.userProgress.findUnique({
      where: {
        userId_subtopicId: {
          userId: req.user!.userId,
          subtopicId: subtopic.id,
        },
      },
    });

    res.json({
      success: true,
      data: {
        ...subtopic,
        userProgress: progress,
        topic: { slug: topic.slug, title: topic.title, subject: { slug: subject.slug, title: subject.title } },
        navigation: {
          prev: prevSubtopic ? { slug: prevSubtopic.slug, title: prevSubtopic.title } : null,
          next: nextSubtopic ? { slug: nextSubtopic.slug, title: nextSubtopic.title } : null,
        },
      },
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ============================================
// PROGRESS TRACKING
// ============================================

router.post("/progress", async (req, res) => {
  try {
    const { subtopicId, status, score } = req.body;
    const userId = req.user!.userId;

    const progress = await prisma.userProgress.upsert({
      where: {
        userId_subtopicId: { userId, subtopicId },
      },
      update: {
        status,
        ...(score !== undefined ? { score } : {}),
        ...(status === "completed" ? { completedAt: new Date() } : {}),
      },
      create: {
        userId,
        subtopicId,
        status: status || "in_progress",
        score: score || null,
      },
    });

    res.json({ success: true, data: progress });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/progress", async (req, res) => {
  try {
    const userId = req.user!.userId;
    const { subjectSlug } = req.query;

    let where: any = { userId };

    if (subjectSlug) {
      where.subtopic = {
        topic: {
          subject: { slug: subjectSlug as string },
        },
      };
    }

    const progress = await prisma.userProgress.findMany({
      where,
      include: {
        subtopic: {
          select: {
            id: true,
            slug: true,
            title: true,
            topicId: true,
            topic: {
              select: {
                id: true,
                slug: true,
                title: true,
                subjectId: true,
                subject: { select: { id: true, slug: true, title: true } },
              },
            },
          },
        },
      },
    });

    res.json({ success: true, data: progress });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ============================================
// NOTES
// ============================================

router.post("/notes", async (req, res) => {
  try {
    const { subtopicId, content } = req.body;
    const userId = req.user!.userId;

    const existing = await prisma.userNote.findFirst({
      where: { userId, subtopicId },
    });

    let note;
    if (existing) {
      note = await prisma.userNote.update({
        where: { id: existing.id },
        data: { content },
      });
    } else {
      note = await prisma.userNote.create({
        data: { userId, subtopicId, content },
      });
    }

    res.json({ success: true, data: note });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/notes/:subtopicId", async (req, res) => {
  try {
    const note = await prisma.userNote.findFirst({
      where: {
        userId: req.user!.userId,
        subtopicId: req.params.subtopicId,
      },
    });
    res.json({ success: true, data: note });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ============================================
// QUIZ
// ============================================

router.post("/quiz/submit", async (req, res) => {
  try {
    const { subtopicId, answers } = req.body;
    const userId = req.user!.userId;

    const subtopic = await prisma.subtopic.findUnique({
      where: { id: subtopicId },
      select: { quiz: true },
    });

    if (!subtopic) return res.status(404).json({ success: false, message: "Subtopic not found" });

    const quiz = subtopic.quiz as any[];
    let correct = 0;
    const results = quiz.map((q: any, i: number) => {
      const userAnswer = answers?.[i];
      const isCorrect = userAnswer === q.correctIndex;
      if (isCorrect) correct++;
      return {
        questionIndex: i,
        userAnswer,
        correctAnswer: q.correctIndex,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const total = quiz.length;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

    // Auto-mark subtopic as completed if score >= 80%
    if (percentage >= 80) {
      await prisma.userProgress.upsert({
        where: { userId_subtopicId: { userId, subtopicId } },
        update: { status: "completed", score: percentage, completedAt: new Date() },
        create: { userId, subtopicId, status: "completed", score: percentage, completedAt: new Date() },
      });
    } else {
      await prisma.userProgress.upsert({
        where: { userId_subtopicId: { userId, subtopicId } },
        update: { score: percentage },
        create: { userId, subtopicId, status: "in_progress", score: percentage },
      });
    }

    res.json({
      success: true,
      data: {
        correct,
        total,
        percentage,
        passed: percentage >= 80,
        results,
      },
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ============================================
// CODING CHALLENGE
// ============================================

router.post("/coding/submit", async (req, res) => {
  try {
    const { subtopicId, challengeTitle, code, language } = req.body;

    const subtopic = await prisma.subtopic.findUnique({
      where: { id: subtopicId },
      select: { codingChallenges: true },
    });

    if (!subtopic) return res.status(404).json({ success: false, message: "Subtopic not found" });

    const challenges = subtopic.codingChallenges as any[];
    const challenge = challenges.find((c: any) => c.title === challengeTitle);

    if (!challenge) return res.status(404).json({ success: false, message: "Challenge not found" });

    // Basic structural evaluation
    const lines = code.split("\n").filter((l: string) => l.trim());
    const hasComments = code.includes("//") || code.includes("/*");
    const hasFunctions = code.includes("function") || code.includes("=>") || code.includes("def ") || code.includes("func ");
    const hasLoops = code.includes("for") || code.includes("while");
    const hasConditionals = code.includes("if") || code.includes("switch");
    const codeLength = code.length;
    const lineCount = lines.length;

    const evaluation: {
      submittedAt: string;
      language: string;
      stats: Record<string, any>;
      feedback: string[];
      score: number;
    } = {
      submittedAt: new Date().toISOString(),
      language: language || "javascript",
      stats: {
        lines: lineCount,
        characters: codeLength,
        hasFunctions,
        hasLoops,
        hasConditionals,
        hasComments,
      },
      feedback: [],
      score: 0,
    };

    // Generate feedback
    if (!hasFunctions) evaluation.feedback.push("Consider structuring your solution with functions");
    if (!hasComments) evaluation.feedback.push("Add comments to explain your approach");
    if (lineCount > 50) evaluation.feedback.push("Solution is quite long - consider simplifying");
    if (lineCount < 5) evaluation.feedback.push("Solution might be too brief - ensure it handles edge cases");

    if (challenge.solutionHint) {
      const hintKeywords = challenge.solutionHint.toLowerCase().split(" ").filter((w: string) => w.length > 4);
      const matchedHints = hintKeywords.filter((kw: string) => code.toLowerCase().includes(kw));
      if (matchedHints.length > 0) {
        evaluation.feedback.push(`Good use of ${matchedHints.slice(0, 3).join(", ")}`);
      } else {
        evaluation.feedback.push(`Hint: ${challenge.solutionHint.substring(0, 100)}...`);
      }
    }

    // Score based on basic metrics
    let score = 50; // base score
    if (hasFunctions) score += 15;
    if (hasComments) score += 10;
    if (hasLoops) score += 10;
    if (hasConditionals) score += 10;
    if (lineCount >= 8 && lineCount <= 40) score += 5; // reasonable length
    evaluation.score = Math.min(score, 100);

    res.json({ success: true, data: evaluation });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ============================================
// GLOBAL SEARCH
// ============================================

router.get("/search", async (req, res) => {
  try {
    const q = (req.query.q as string) || "";
    if (!q || q.length < 2) {
      return res.json({ success: true, data: [] });
    }

    const searchTerm = q.trim();

    const [subjects, topics, subtopics] = await Promise.all([
      prisma.subject.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
          ],
          isPublished: true,
        },
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          icon: true,
          color: true,
        },
        take: 5,
      }),
      prisma.topic.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        include: {
          subject: { select: { slug: true, title: true } },
        },
        take: 10,
      }),
      prisma.subtopic.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        include: {
          topic: {
            select: {
              slug: true,
              title: true,
              subject: { select: { slug: true, title: true } },
            },
          },
        },
        take: 15,
      }),
    ]);

    res.json({
      success: true,
      data: {
        subjects: subjects.map((s) => ({ ...s, type: "subject" as const })),
        topics: topics.map((t) => ({ ...t, type: "topic" as const })),
        subtopics: subtopics.map((s) => ({ ...s, type: "subtopic" as const })),
      },
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ============================================
// LEARNING STATS / PROGRESS ANALYTICS
// ============================================

router.get("/stats", async (req, res) => {
  try {
    const userId = req.user!.userId;

    const [totalSubjects, totalProgress, completedProgress] = await Promise.all([
      prisma.subject.count({ where: { isPublished: true } }),
      prisma.userProgress.findMany({
        where: { userId },
        include: {
          subtopic: {
            select: {
              topicId: true,
              topic: {
                select: {
                  id: true,
                  title: true,
                  subjectId: true,
                  subject: { select: { slug: true, title: true } },
                },
              },
            },
          },
        },
      }),
      prisma.userProgress.count({ where: { userId, status: "completed" } }),
    ]);

    // Per-subject breakdown
    const subjectStats: Record<string, { slug: string; title: string; completed: number; total: number; score: number }> = {};

    const allSubjects = await prisma.subject.findMany({
      where: { isPublished: true },
      select: { id: true, slug: true, title: true },
    });

    for (const sub of allSubjects) {
      const topicIds = await prisma.topic.findMany({
        where: { subjectId: sub.id },
        select: { id: true },
      });

      const totalSubtopics = await prisma.subtopic.count({
        where: { topicId: { in: topicIds.map((t) => t.id) } },
      });

      const userProgForSubject = totalProgress.filter(
        (p) => p.subtopic.topic.subject.slug === sub.slug
      );

      const completed = userProgForSubject.filter((p) => p.status === "completed").length;
      const avgScore = userProgForSubject
        .filter((p) => p.score)
        .reduce((a, p) => a + (p.score || 0), 0) / Math.max(userProgForSubject.filter((p) => p.score).length, 1);

      subjectStats[sub.slug] = {
        slug: sub.slug,
        title: sub.title,
        completed,
        total: totalSubtopics,
        score: Math.round(avgScore),
      };
    }

    const totalSubtopicsAll = Object.values(subjectStats).reduce((a, s) => a + s.total, 0);
    const totalCompletedAll = Object.values(subjectStats).reduce((a, s) => a + s.completed, 0);

    res.json({
      success: true,
      data: {
        totalSubjects,
        totalSubtopics: totalSubtopicsAll,
        completedSubtopics: totalCompletedAll,
        overallProgress: totalSubtopicsAll > 0 ? Math.round((totalCompletedAll / totalSubtopicsAll) * 100) : 0,
        subjects: subjectStats,
        recentActivity: totalProgress
          .filter((p) => p.status === "completed")
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .slice(0, 10)
          .map((p) => ({
            subtopicTitle: (p.subtopic.topic as any)?.title || "",
            subject: (p.subtopic.topic as any)?.subject?.title || "",
            score: p.score,
            completedAt: p.completedAt,
          })),
      },
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ============================================
// LEGACY RESOURCES
// ============================================

router.get("/resources", async (req, res) => {
  try {
    const { category, company, difficulty } = req.query;
    const where: any = {};
    if (category) where.category = category;
    if (company) where.company = company;
    if (difficulty) where.difficulty = difficulty;
    const resources = await prisma.learningResource.findMany({ where, orderBy: { viewCount: "desc" } });
    res.json({ success: true, data: resources });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/resources/:id", async (req, res) => {
  try {
    const resource = await prisma.learningResource.findUnique({ where: { id: req.params.id } });
    if (!resource) return res.status(404).json({ success: false, message: "Resource not found" });
    await prisma.learningResource.update({ where: { id: req.params.id }, data: { viewCount: { increment: 1 } } });
    res.json({ success: true, data: resource });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
