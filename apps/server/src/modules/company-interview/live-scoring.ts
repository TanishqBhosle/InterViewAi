import { z } from "zod";
import { prisma } from "@/config/database";

export interface LiveScore {
  questionId: string;
  technicalScore: number;
  communicationScore: number;
  confidenceScore: number;
  problemSolvingScore: number;
  behavioralScore: number;
  projectScore: number;
  overallScore: number;
  timestamp: number;
}

export interface RunningAverage {
  technical: number;
  communication: number;
  confidence: number;
  problemSolving: number;
  behavioral: number;
  project: number;
  overall: number;
  questionCount: number;
}

export const liveScoringEngine = {
  calculateQuestionScore(params: {
    evaluation: any;
    questionType: string;
    topicWeight: number;
    difficulty: string;
  }): LiveScore {
    const { evaluation, questionType, topicWeight, difficulty } = params;

    // Base scores from evaluation
    let technical = evaluation.technicalScore || 0;
    let communication = evaluation.communicationScore || 0;
    let confidence = evaluation.confidenceScore || 0;
    let problemSolving = evaluation.problemSolvingScore || 0;
    let behavioral = evaluation.behavioralScore || 0;
    let project = evaluation.projectScore || 0;

    // Apply difficulty multiplier
    const difficultyMultiplier = this.getDifficultyMultiplier(difficulty);
    technical *= difficultyMultiplier;
    communication *= difficultyMultiplier;
    confidence *= difficultyMultiplier;
    problemSolving *= difficultyMultiplier;
    behavioral *= difficultyMultiplier;
    project *= difficultyMultiplier;

    // Calculate overall score based on question type
    const overall = this.calculateOverallScore({
      technical,
      communication,
      confidence,
      problemSolving,
      behavioral,
      project,
      questionType,
      topicWeight,
    });

    return {
      questionId: "",
      technicalScore: Math.round(technical),
      communicationScore: Math.round(communication),
      confidenceScore: Math.round(confidence),
      problemSolvingScore: Math.round(problemSolving),
      behavioralScore: Math.round(behavioral),
      projectScore: Math.round(project),
      overallScore: Math.round(overall),
      timestamp: Date.now(),
    };
  },

  getDifficultyMultiplier(difficulty: string): number {
    const multipliers: Record<string, number> = {
      easy: 0.8,
      medium: 1.0,
      hard: 1.2,
      expert: 1.4,
    };
    return multipliers[difficulty.toLowerCase()] || 1.0;
  },

  calculateOverallScore(params: {
    technical: number;
    communication: number;
    confidence: number;
    problemSolving: number;
    behavioral: number;
    project: number;
    questionType: string;
    topicWeight: number;
  }): number {
    const weights = this.getScoreWeights(params.questionType);

    const weightedScore =
      params.technical * weights.technical +
      params.communication * weights.communication +
      params.confidence * weights.confidence +
      params.problemSolving * weights.problemSolving +
      params.behavioral * weights.behavioral +
      params.project * weights.project;

    // Apply topic weight
    const topicMultiplier = 0.7 + (params.topicWeight / 100) * 0.6;
    return weightedScore * topicMultiplier;
  },

  getScoreWeights(questionType: string): Record<string, number> {
    const weights: Record<string, Record<string, number>> = {
      technical: {
        technical: 0.5,
        communication: 0.15,
        confidence: 0.1,
        problemSolving: 0.2,
        behavioral: 0.05,
        project: 0,
      },
      behavioral: {
        technical: 0.05,
        communication: 0.3,
        confidence: 0.15,
        problemSolving: 0.1,
        behavioral: 0.4,
        project: 0,
      },
      system_design: {
        technical: 0.35,
        communication: 0.2,
        confidence: 0.1,
        problemSolving: 0.3,
        behavioral: 0.05,
        project: 0,
      },
      project_based: {
        technical: 0.25,
        communication: 0.15,
        confidence: 0.1,
        problemSolving: 0.15,
        behavioral: 0.05,
        project: 0.3,
      },
      aptitude: {
        technical: 0.4,
        communication: 0.1,
        confidence: 0.1,
        problemSolving: 0.35,
        behavioral: 0.05,
        project: 0,
      },
    };

    return weights[questionType] || weights.technical;
  },

  updateRunningAverage(
    current: RunningAverage,
    newScore: LiveScore
  ): RunningAverage {
    const count = current.questionCount + 1;

    return {
      technical: Math.round((current.technical * current.questionCount + newScore.technicalScore) / count),
      communication: Math.round((current.communication * current.questionCount + newScore.communicationScore) / count),
      confidence: Math.round((current.confidence * current.questionCount + newScore.confidenceScore) / count),
      problemSolving: Math.round((current.problemSolving * current.questionCount + newScore.problemSolvingScore) / count),
      behavioral: Math.round((current.behavioral * current.questionCount + newScore.behavioralScore) / count),
      project: Math.round((current.project * current.questionCount + newScore.projectScore) / count),
      overall: Math.round((current.overall * current.questionCount + newScore.overallScore) / count),
      questionCount: count,
    };
  },

  getInitialAverage(): RunningAverage {
    return {
      technical: 0,
      communication: 0,
      confidence: 0,
      problemSolving: 0,
      behavioral: 0,
      project: 0,
      overall: 0,
      questionCount: 0,
    };
  },

  getPerformanceTrend(scores: LiveScore[]): {
    trend: "improving" | "declining" | "stable";
    change: number;
    suggestion: string;
  } {
    if (scores.length < 3) {
      return { trend: "stable", change: 0, suggestion: "Need more data points to determine trend." };
    }

    const recent = scores.slice(-3);
    const older = scores.slice(0, 3);

    const recentAvg = recent.reduce((s, r) => s + r.overallScore, 0) / recent.length;
    const olderAvg = older.reduce((s, r) => s + r.overallScore, 0) / older.length;

    const change = recentAvg - olderAvg;

    if (change > 5) {
      return {
        trend: "improving",
        change: Math.round(change),
        suggestion: "Great progress! You're improving as the interview progresses.",
      };
    } else if (change < -5) {
      return {
        trend: "declining",
        change: Math.round(change),
        suggestion: "Take a moment to refocus. Your performance is declining slightly.",
      };
    }

    return {
      trend: "stable",
      change: Math.round(change),
      suggestion: "Consistent performance throughout the interview.",
    };
  },

  getScoreColor(score: number): string {
    if (score >= 80) return "#10B981"; // green
    if (score >= 60) return "#F59E0B"; // yellow
    if (score >= 40) return "#F97316"; // orange
    return "#EF4444"; // red
  },

  getScoreLabel(score: number): string {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    if (score >= 60) return "Average";
    if (score >= 50) return "Below Average";
    if (score >= 40) return "Poor";
    return "Very Poor";
  },

  getHiringRecommendation(overallScore: number): {
    recommendation: string;
    confidence: string;
    rationale: string;
  } {
    if (overallScore >= 85) {
      return {
        recommendation: "strong_hire",
        confidence: "high",
        rationale: "Exceptional performance across all dimensions. Strong technical skills and excellent communication.",
      };
    } else if (overallScore >= 75) {
      return {
        recommendation: "hire",
        confidence: "high",
        rationale: "Solid performance with good technical and communication skills. Ready for the role.",
      };
    } else if (overallScore >= 65) {
      return {
        recommendation: "lean_hire",
        confidence: "medium",
        rationale: "Good potential but some areas need improvement. Consider for the role with mentorship.",
      };
    } else if (overallScore >= 50) {
      return {
        recommendation: "lean_no_hire",
        confidence: "medium",
        rationale: "Below expectations in key areas. May need more experience before joining.",
      };
    } else {
      return {
        recommendation: "no_hire",
        confidence: "high",
        rationale: "Significant gaps in technical or communication skills. Not ready for this role.",
      };
    }
  },
};
