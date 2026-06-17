import { prisma } from "@/config/database";

interface BenchmarkData {
  average: number;
  top25: number;
  top10: number;
  top1: number;
  totalCandidates: number;
}

interface ComparisonResult {
  percentile: number;
  rank: string;
  comparedTo: {
    average: { score: number; diff: number };
    top25: { score: number; diff: number };
    top10: { score: number; diff: number };
    top1: { score: number; diff: number };
  };
  insights: string[];
  recommendation: string;
}

export const benchmarkingService = {
  async compare(companyId: string, role: string, userScore: number): Promise<ComparisonResult> {
    // Get benchmark data for this company and role
    const benchmark = await this.getBenchmarkData(companyId, role);

    // Calculate percentile
    const percentile = this.calculatePercentile(userScore, benchmark);

    // Generate comparison
    const comparison = {
      average: {
        score: benchmark.average,
        diff: Math.round(userScore - benchmark.average),
      },
      top25: {
        score: benchmark.top25,
        diff: Math.round(userScore - benchmark.top25),
      },
      top10: {
        score: benchmark.top10,
        diff: Math.round(userScore - benchmark.top10),
      },
      top1: {
        score: benchmark.top1,
        diff: Math.round(userScore - benchmark.top1),
      },
    };

    // Generate insights
    const insights = this.generateInsights(userScore, benchmark, percentile);

    // Get rank description
    const rank = this.getRankDescription(percentile);

    // Generate recommendation
    const recommendation = this.generateRecommendation(percentile, userScore);

    return {
      percentile,
      rank,
      comparedTo: comparison,
      insights,
      recommendation,
    };
  },

  async getBenchmarkData(companyId: string, role: string): Promise<BenchmarkData> {
    // Get historical scores for this company and role
    const sessions = await prisma.companyInterviewSession.findMany({
      where: {
        companyId,
        role: {
          contains: role,
          mode: "insensitive",
        },
        status: "completed",
      },
      include: {
        report: {
          select: {
            overallScore: true,
          },
        },
      },
    });

    const scores = sessions
      .map((s) => s.report?.overallScore)
      .filter((s): s is number => s !== null && s !== undefined);

    if (scores.length === 0) {
      // Return default benchmarks if no historical data
      return this.getDefaultBenchmarks(role);
    }

    // Sort scores for percentile calculations
    const sortedScores = [...scores].sort((a, b) => a - b);
    const total = sortedScores.length;

    return {
      average: Math.round(scores.reduce((a, b) => a + b, 0) / total),
      top25: sortedScores[Math.floor(total * 0.75)] || 75,
      top10: sortedScores[Math.floor(total * 0.9)] || 85,
      top1: sortedScores[Math.floor(total * 0.99)] || 95,
      totalCandidates: total,
    };
  },

  getDefaultBenchmarks(role: string): BenchmarkData {
    const baseBenchmarks: Record<string, BenchmarkData> = {
      frontend: { average: 62, top25: 72, top10: 82, top1: 92, totalCandidates: 1000 },
      backend: { average: 60, top25: 70, top10: 80, top1: 90, totalCandidates: 1000 },
      fullstack: { average: 63, top25: 73, top10: 83, top1: 93, totalCandidates: 1000 },
      data_science: { average: 58, top25: 68, top10: 78, top1: 88, totalCandidates: 500 },
      ml_engineer: { average: 55, top25: 65, top10: 75, top1: 85, totalCandidates: 300 },
      product: { average: 65, top25: 75, top10: 85, top1: 95, totalCandidates: 400 },
    };

    const roleLower = role.toLowerCase();
    for (const [key, value] of Object.entries(baseBenchmarks)) {
      if (roleLower.includes(key)) return value;
    }

    return { average: 60, top25: 70, top10: 80, top1: 90, totalCandidates: 1000 };
  },

  calculatePercentile(score: number, benchmark: BenchmarkData): number {
    if (score >= benchmark.top1) return 99;
    if (score >= benchmark.top10) return 90 + ((score - benchmark.top10) / (benchmark.top1 - benchmark.top10)) * 9;
    if (score >= benchmark.top25) return 75 + ((score - benchmark.top25) / (benchmark.top10 - benchmark.top25)) * 15;
    if (score >= benchmark.average) return 50 + ((score - benchmark.average) / (benchmark.top25 - benchmark.average)) * 25;
    return Math.max(1, Math.round((score / benchmark.average) * 50));
  },

  getRankDescription(percentile: number): string {
    if (percentile >= 95) return "Top 1%";
    if (percentile >= 90) return "Top 10%";
    if (percentile >= 75) return "Top 25%";
    if (percentile >= 50) return "Above Average";
    if (percentile >= 25) return "Average";
    if (percentile >= 10) return "Below Average";
    return "Needs Improvement";
  },

  generateInsights(userScore: number, benchmark: BenchmarkData, percentile: number): string[] {
    const insights: string[] = [];

    if (userScore >= benchmark.top10) {
      insights.push("Excellent performance! You're in the top 10% of candidates.");
      insights.push("Your score demonstrates strong readiness for this role.");
    } else if (userScore >= benchmark.top25) {
      insights.push("Good performance! You're in the top 25% of candidates.");
      insights.push("You have a solid foundation but can improve further.");
    } else if (userScore >= benchmark.average) {
      insights.push("You're performing at or above average level.");
      insights.push("Focus on specific weak areas to move into the top tier.");
    } else {
      insights.push("There's significant room for improvement.");
      insights.push("Consider additional preparation before your interview.");
    }

    if (userScore < benchmark.top25) {
      insights.push(`You need ${benchmark.top25 - userScore} more points to reach the top 25%.`);
    }

    insights.push(`Based on ${benchmark.totalCandidates} candidates who've practiced for similar roles.`);

    return insights;
  },

  generateRecommendation(percentile: number, score: number): string {
    if (percentile >= 90) {
      return "You are highly prepared. Focus on maintaining your performance and fine-tuning specific areas.";
    } else if (percentile >= 75) {
      return "You're well-prepared. Practice more mock interviews to solidify your performance.";
    } else if (percentile >= 50) {
      return "You have a good foundation. Focus on your weak areas and practice more questions.";
    } else if (percentile >= 25) {
      return "Additional preparation is recommended. Follow the improvement roadmap provided.";
    } else {
      return "Significant preparation needed. Consider delaying your interview and following the 30-day improvement plan.";
    }
  },

  async getCompanyBenchmarks(companyId: string) {
    const sessions = await prisma.companyInterviewSession.findMany({
      where: {
        companyId,
        status: "completed",
      },
      include: {
        report: {
          select: {
            overallScore: true,
            technicalScore: true,
            communicationScore: true,
          },
        },
      },
    });

    const scores = sessions
      .map((s) => s.report?.overallScore)
      .filter((s): s is number => s !== null && s !== undefined);

    if (scores.length === 0) {
      return null;
    }

    const sortedScores = [...scores].sort((a, b) => a - b);
    const total = sortedScores.length;

    return {
      totalCandidates: total,
      average: Math.round(scores.reduce((a, b) => a + b, 0) / total),
      median: sortedScores[Math.floor(total / 2)],
      min: sortedScores[0],
      max: sortedScores[total - 1],
      distribution: this.calculateDistribution(scores),
    };
  },

  calculateDistribution(scores: number[]) {
    const ranges = [
      { label: "0-20", min: 0, max: 20 },
      { label: "21-40", min: 21, max: 40 },
      { label: "41-60", min: 41, max: 60 },
      { label: "61-80", min: 61, max: 80 },
      { label: "81-100", min: 81, max: 100 },
    ];

    return ranges.map((range) => ({
      range: range.label,
      count: scores.filter((s) => s >= range.min && s <= range.max).length,
      percentage: Math.round(
        (scores.filter((s) => s >= range.min && s <= range.max).length / scores.length) * 100
      ),
    }));
  },

  async getRoleBenchmarks(role: string) {
    const sessions = await prisma.companyInterviewSession.findMany({
      where: {
        role: {
          contains: role,
          mode: "insensitive",
        },
        status: "completed",
      },
      include: {
        report: {
          select: {
            overallScore: true,
          },
        },
      },
    });

    const scores = sessions
      .map((s) => s.report?.overallScore)
      .filter((s): s is number => s !== null && s !== undefined);

    if (scores.length === 0) {
      return this.getDefaultBenchmarks(role);
    }

    const sortedScores = [...scores].sort((a, b) => a - b);
    const total = sortedScores.length;

    return {
      average: Math.round(scores.reduce((a, b) => a + b, 0) / total),
      top25: sortedScores[Math.floor(total * 0.75)],
      top10: sortedScores[Math.floor(total * 0.9)],
      top1: sortedScores[Math.floor(total * 0.99)],
      totalCandidates: total,
    };
  },
};
