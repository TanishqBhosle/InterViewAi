import { Router, Request, Response } from "express";
import { authenticate } from "@/middleware/auth";
import { prisma } from "@/config/database";

const router = Router();
router.use(authenticate);

// ============================================
// PATTERNS
// ============================================

router.get("/patterns", async (_req: Request, res: Response) => {
  try {
    const patterns = await prisma.dSAPattern.findMany({
      orderBy: { order: "asc" },
      include: {
        _count: { select: { problems: true } },
      },
    });
    res.json({ success: true, data: patterns });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/patterns/:slug", async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug as string;
    const pattern = await prisma.dSAPattern.findUnique({
      where: { slug },
      include: {
        problems: {
          orderBy: [{ tier: "asc" }, { leetcodeId: "asc" }],
        },
      },
    });
    if (!pattern) return res.status(404).json({ success: false, message: "Pattern not found" });

    const userId = req.user!.userId;
    const userProblems = await prisma.dSAUserProblem.findMany({
      where: { userId, problemId: { in: pattern.problems.map((p: any) => p.id) } },
    });
    const userProblemMap = new Map(userProblems.map((up) => [up.problemId, up]));

    const problemsWithStatus = pattern.problems.map((p: any) => ({
      ...p,
      userStatus: userProblemMap.get(p.id)?.status || "NOT_STARTED",
      attempts: userProblemMap.get(p.id)?.attempts || 0,
      bestTime: userProblemMap.get(p.id)?.bestTime || null,
    }));

    res.json({ success: true, data: { ...pattern, problems: problemsWithStatus } });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ============================================
// PROBLEMS
// ============================================

router.get("/problems", async (req: Request, res: Response) => {
  try {
    const { pattern, difficulty, tier, company, search } = req.query;
    const where: any = {};

    if (pattern && typeof pattern === "string") {
      const p = await prisma.dSAPattern.findUnique({ where: { slug: pattern } });
      if (p) where.patternId = p.id;
    }
    if (difficulty && typeof difficulty === "string") where.difficulty = difficulty;
    if (tier && typeof tier === "string") where.tier = Number(tier);
    if (company && typeof company === "string") where.companies = { path: [], array_contains: company };
    if (search && typeof search === "string") {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } },
      ];
    }

    const problems = await prisma.dSAProblem.findMany({
      where,
      orderBy: [{ tier: "asc" }, { leetcodeId: "asc" }],
      include: { pattern: { select: { slug: true, name: true, color: true } } },
    });

    const userId = req.user!.userId;
    const userProblems = await prisma.dSAUserProblem.findMany({
      where: { userId, problemId: { in: problems.map((p) => p.id) } },
    });
    const userProblemMap = new Map(userProblems.map((up) => [up.problemId, up]));

    const enriched = problems.map((p) => ({
      ...p,
      userStatus: userProblemMap.get(p.id)?.status || "NOT_STARTED",
      attempts: userProblemMap.get(p.id)?.attempts || 0,
    }));

    res.json({ success: true, data: enriched });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/problems/:id", async (req: Request, res: Response) => {
  try {
    const problem = await prisma.dSAProblem.findUnique({
      where: { id: req.params.id as string },
      include: { pattern: true },
    });
    if (!problem) return res.status(404).json({ success: false, message: "Problem not found" });

    const userId = req.user!.userId;
    const userProblem = await prisma.dSAUserProblem.findUnique({
      where: { userId_problemId: { userId, problemId: problem.id } },
    });

    const mistakes = await prisma.dSAMistakeLog.findMany({
      where: { userId, problemId: problem.id },
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      data: { ...problem, userProgress: userProblem, mistakes },
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post("/problems/:id/submit", async (req: Request, res: Response) => {
  try {
    const { status, time, code, language, confidence } = req.body;
    const userId = req.user!.userId;
    const problemId = req.params.id as string;

    const problem = await prisma.dSAProblem.findUnique({ where: { id: problemId } });
    if (!problem) return res.status(404).json({ success: false, message: "Problem not found" });

    const existing = await prisma.dSAUserProblem.findUnique({
      where: { userId_problemId: { userId, problemId } },
    });

    const data: any = {
      status: status || "ATTEMPTED",
      attempts: { increment: 1 },
      lastAttemptAt: new Date(),
      confidence: confidence || 0,
    };
    if (time && (!existing?.bestTime || time < existing.bestTime)) data.bestTime = time;
    if (status === "SOLVED") data.solvedAt = new Date();
    if (code) data.code = code;
    if (language) data.language = language;

    const userProblem = await prisma.dSAUserProblem.upsert({
      where: { userId_problemId: { userId, problemId } },
      update: data,
      create: {
        userId,
        problemId,
        status: status || "ATTEMPTED",
        bestTime: time || null,
        code: code || null,
        language: language || null,
        confidence: confidence || 0,
        solvedAt: status === "SOLVED" ? new Date() : null,
      },
    });

    // Update pattern progress
    if (problem.patternId) {
      const allPatternProblems = await prisma.dSAProblem.findMany({
        where: { patternId: problem.patternId },
      });
      const solvedCount = await prisma.dSAUserProblem.count({
        where: {
          userId,
          problemId: { in: allPatternProblems.map((p) => p.id) },
          status: { in: ["SOLVED", "MASTERED"] },
        },
      });

      await prisma.dSAPatternProgress.upsert({
        where: { userId_patternId: { userId, patternId: problem.patternId } },
        update: {
          solved: solvedCount,
          total: allPatternProblems.length,
          mastery: allPatternProblems.length > 0 ? (solvedCount / allPatternProblems.length) * 100 : 0,
          lastPracticed: new Date(),
        },
        create: {
          userId,
          patternId: problem.patternId,
          solved: solvedCount,
          total: allPatternProblems.length,
          mastery: allPatternProblems.length > 0 ? (solvedCount / allPatternProblems.length) * 100 : 0,
          lastPracticed: new Date(),
        },
      });
    }

    res.json({ success: true, data: userProblem });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ============================================
// PROGRESS
// ============================================

router.get("/progress", async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const [totalProblems, solvedProblems, attemptedProblems, patternProgress] = await Promise.all([
      prisma.dSAProblem.count(),
      prisma.dSAUserProblem.count({ where: { userId, status: { in: ["SOLVED", "MASTERED"] } } }),
      prisma.dSAUserProblem.count({ where: { userId } }),
      prisma.dSAPatternProgress.findMany({ where: { userId }, orderBy: { mastery: "desc" } }),
    ]);

    const patternsWithDetails = await Promise.all(
      patternProgress.map(async (pp) => {
        const pattern = await prisma.dSAPattern.findUnique({ where: { id: pp.patternId } });
        return { ...pp, pattern };
      })
    );

    res.json({
      success: true,
      data: {
        totalProblems,
        solvedProblems,
        attemptedProblems,
        unsolvedProblems: totalProblems - solvedProblems,
        overallMastery: totalProblems > 0 ? (solvedProblems / totalProblems) * 100 : 0,
        patternProgress: patternsWithDetails,
      },
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/progress/patterns", async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const progress = await prisma.dSAPatternProgress.findMany({
      where: { userId },
      include: { pattern: true },
      orderBy: { mastery: "desc" },
    });
    res.json({ success: true, data: progress });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ============================================
// MISTAKE LOG
// ============================================

router.get("/mistakes", async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { resolved } = req.query;
    const where: any = { userId };
    if (resolved !== undefined) where.resolved = resolved === "true";

    const mistakes = await prisma.dSAMistakeLog.findMany({
      where,
      include: { problem: { select: { title: true, slug: true, leetcodeId: true, difficulty: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, data: mistakes });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post("/mistakes", async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { problemId, coreMistake, patternMissed, rootCause, fixStrategy, revisitDate } = req.body;

    const mistake = await prisma.dSAMistakeLog.create({
      data: {
        userId,
        problemId,
        coreMistake,
        patternMissed,
        rootCause,
        fixStrategy,
        revisitDate: revisitDate ? new Date(revisitDate) : null,
      },
    });
    res.json({ success: true, data: mistake });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/mistakes/:id", async (req: Request, res: Response) => {
  try {
    const { resolved, confidence } = req.body;
    const mistake = await prisma.dSAMistakeLog.update({
      where: { id: req.params.id as string },
      data: { ...(resolved !== undefined && { resolved }), ...(confidence !== undefined && { confidence }) },
    });
    res.json({ success: true, data: mistake });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ============================================
// REVISION SYSTEM
// ============================================

router.get("/revision/queue", async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const now = new Date();

    const cards = await prisma.dSARevisionCard.findMany({
      where: { userId, nextReview: { lte: now } },
      include: { problem: { select: { title: true, slug: true, leetcodeId: true, difficulty: true, tags: true } } },
      orderBy: { nextReview: "asc" },
      take: 20,
    });
    res.json({ success: true, data: cards });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post("/revision/review", async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { problemId, rating } = req.body;

    const card = await prisma.dSARevisionCard.findUnique({
      where: { userId_problemId: { userId, problemId } },
    });

    if (!card) {
      // Create new card
      const newCard = await prisma.dSARevisionCard.create({
        data: {
          userId,
          problemId,
          rating,
          reviews: 1,
          lastReview: new Date(),
          interval: 1,
          nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });
      return res.json({ success: true, data: newCard });
    }

    // SM-2 algorithm
    let { ease, interval } = card;
    const q = rating; // 0-5

    if (q >= 3) {
      if (card.reviews === 0) interval = 1;
      else if (card.reviews === 1) interval = 6;
      else interval = Math.round(interval * ease);
      ease = ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    } else {
      interval = 1;
      ease = Math.max(1.3, ease - 0.2);
    }

    const updated = await prisma.dSARevisionCard.update({
      where: { id: card.id },
      data: {
        rating,
        reviews: { increment: 1 },
        lastReview: new Date(),
        interval,
        ease,
        nextReview: new Date(Date.now() + interval * 24 * 60 * 60 * 1000),
      },
    });

    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ============================================
// COMPANY TRACKS
// ============================================

router.get("/companies", async (_req: Request, res: Response) => {
  try {
    const tracks = await prisma.dSACompanyTrack.findMany({
      orderBy: { name: "asc" },
    });
    res.json({ success: true, data: tracks });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/companies/:slug", async (req: Request, res: Response) => {
  try {
    const track = await prisma.dSACompanyTrack.findUnique({
      where: { slug: req.params.slug as string },
      include: {
        problems: {
          include: { problem: { include: { pattern: { select: { slug: true, name: true, color: true } } } } },
          orderBy: { order: "asc" },
        },
      },
    });
    if (!track) return res.status(404).json({ success: false, message: "Track not found" });

    const userId = req.user!.userId;
    const problemIds = track.problems.map((cp) => cp.problemId);
    const userProblems = await prisma.dSAUserProblem.findMany({
      where: { userId, problemId: { in: problemIds } },
    });
    const userProblemMap = new Map(userProblems.map((up) => [up.problemId, up]));

    const enrichedProblems = track.problems.map((cp) => ({
      ...cp.problem,
      order: cp.order,
      frequency: cp.frequency,
      userStatus: userProblemMap.get(cp.problemId)?.status || "NOT_STARTED",
    }));

    res.json({ success: true, data: { ...track, problems: enrichedProblems } });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ============================================
// MOCK INTERVIEWS
// ============================================

router.get("/mock", async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const interviews = await prisma.dSAMockInterview.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    res.json({ success: true, data: interviews });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post("/mock/start", async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { duration, questionCount, difficulty, patterns } = req.body;

    // Get random problems matching criteria
    const where: any = {};
    if (difficulty) where.difficulty = difficulty;
    if (patterns && patterns.length > 0) {
      const patternRecords = await prisma.dSAPattern.findMany({
        where: { slug: { in: patterns } },
      });
      where.patternId = { in: patternRecords.map((p) => p.id) };
    }

    const problems = await prisma.dSAProblem.findMany({
      where,
      orderBy: { leetcodeId: "asc" },
      take: questionCount || 5,
    });

    // Shuffle
    for (let i = problems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [problems[i], problems[j]] = [problems[j], problems[i]];
    }

    const selectedProblems = problems.slice(0, questionCount || 5);

    const interview = await prisma.dSAMockInterview.create({
      data: {
        userId,
        title: `${difficulty || "Mixed"} Mock Interview`,
        duration: duration || 45,
        questionCount: selectedProblems.length,
        difficulty: difficulty || "MEDIUM",
        patterns: patterns || [],
        status: "created",
      },
    });

    for (let i = 0; i < selectedProblems.length; i++) {
      await prisma.dSAMockQuestion.create({
        data: {
          interviewId: interview.id,
          problemId: selectedProblems[i].id,
          orderIndex: i,
          timeLimit: Math.floor((duration || 45) * 60 / selectedProblems.length),
        },
      });
    }

    const fullInterview = await prisma.dSAMockInterview.findUnique({
      where: { id: interview.id },
      include: {
        questions: {
          include: { problem: true },
          orderBy: { orderIndex: "asc" },
        },
      },
    });

    res.json({ success: true, data: fullInterview });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post("/mock/:id/submit", async (req: Request, res: Response) => {
  try {
    const { answers } = req.body;
    const interview = await prisma.dSAMockInterview.findUnique({
      where: { id: req.params.id as string },
      include: { questions: true },
    });

    if (!interview) return res.status(404).json({ success: false, message: "Interview not found" });

    let totalScore = 0;
    for (const answer of answers || []) {
      const question = interview.questions.find((q) => q.id === answer.questionId);
      if (question) {
        await prisma.dSAMockQuestion.update({
          where: { id: question.id },
          data: {
            userAnswer: answer.code || answer.answer,
            userTime: answer.time,
            score: answer.score || 0,
            feedback: answer.feedback || null,
          },
        });
        totalScore += answer.score || 0;
      }
    }

    const avgScore = interview.questions.length > 0 ? totalScore / interview.questions.length : 0;

    await prisma.dSAMockInterview.update({
      where: { id: interview.id },
      data: {
        status: "completed",
        score: avgScore,
        completedAt: new Date(),
      },
    });

    res.json({ success: true, data: { score: avgScore, interviewId: interview.id } });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ============================================
// DAILY PLAN
// ============================================

router.get("/daily-plan", async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const plan = await prisma.dSADailyPlan.findUnique({
      where: { userId_date: { userId, date: today } },
    });
    res.json({ success: true, data: plan });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post("/daily-plan/generate", async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { duration, focus } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get weak patterns
    const weakPatterns = await prisma.dSAPatternProgress.findMany({
      where: { userId, mastery: { lt: 60 } },
      orderBy: { mastery: "asc" },
      take: 3,
    });

    // Get unsolved problems from weak patterns
    const patternIds = weakPatterns.map((wp) => wp.patternId);
    const problems = await prisma.dSAProblem.findMany({
      where: {
        patternId: { in: patternIds },
        difficulty: focus === "easy" ? "EASY" : focus === "hard" ? "HARD" : undefined,
      },
      take: Math.floor((duration || 60) / 15),
      orderBy: { tier: "asc" },
    });

    // Also get revision cards due
    const revisionCards = await prisma.dSARevisionCard.findMany({
      where: { userId, nextReview: { lte: today } },
      include: { problem: true },
      take: 3,
    });

    const planItems = [
      ...revisionCards.map((rc) => ({
        type: "revision",
        problemId: rc.problemId,
        title: rc.problem.title,
        duration: 10,
      })),
      ...problems.map((p) => ({
        type: "practice",
        problemId: p.id,
        title: p.title,
        duration: 15,
      })),
    ];

    const dailyPlan = await prisma.dSADailyPlan.upsert({
      where: { userId_date: { userId, date: today } },
      update: { plan: planItems, duration: duration || 60 },
      create: {
        userId,
        date: today,
        duration: duration || 60,
        plan: planItems,
      },
    });

    res.json({ success: true, data: dailyPlan });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ============================================
// DASHBOARD
// ============================================

router.get("/dashboard", async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const [totalProblems, solvedProblems, totalMistakes, unresolvedMistakes, revisionCards, patternProgress] =
      await Promise.all([
        prisma.dSAProblem.count(),
        prisma.dSAUserProblem.count({ where: { userId, status: { in: ["SOLVED", "MASTERED"] } } }),
        prisma.dSAMistakeLog.count({ where: { userId } }),
        prisma.dSAMistakeLog.count({ where: { userId, resolved: false } }),
        prisma.dSARevisionCard.count({ where: { userId, nextReview: { lte: new Date() } } }),
        prisma.dSAPatternProgress.findMany({
          where: { userId },
          include: { pattern: { select: { name: true, color: true, slug: true } } },
          orderBy: { mastery: "desc" },
        }),
      ]);

    const recentActivity = await prisma.dSAUserProblem.findMany({
      where: { userId, lastAttemptAt: { not: null } },
      include: { problem: { select: { title: true, slug: true, difficulty: true } } },
      orderBy: { lastAttemptAt: "desc" },
      take: 10,
    });

    const streak = await calculateStreak(userId);

    res.json({
      success: true,
      data: {
        totalProblems,
        solvedProblems,
        unsolvedProblems: totalProblems - solvedProblems,
        overallMastery: totalProblems > 0 ? (solvedProblems / totalProblems) * 100 : 0,
        totalMistakes,
        unresolvedMistakes,
        dueForRevision: revisionCards,
        streak,
        patternProgress,
        recentActivity,
      },
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

async function calculateStreak(userId: string): Promise<number> {
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    const hasActivity = await prisma.dSAUserProblem.findFirst({
      where: {
        userId,
        lastAttemptAt: { gte: date, lt: nextDate },
      },
    });

    if (hasActivity) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  return streak;
}

export default router;
