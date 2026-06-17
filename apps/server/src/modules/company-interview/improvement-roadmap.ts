import { prisma } from "@/config/database";

export const improvementRoadmapService = {
  async generate(sessionId: string) {
    const session = await prisma.companyInterviewSession.findUnique({
      where: { id: sessionId },
      include: {
        company: true,
        blueprint: true,
        questions: {
          include: {
            answer: {
              include: {
                evaluation: true,
              },
            },
          },
        },
        bodyAnalysis: true,
        speechAnalysis: true,
      },
    });

    if (!session) {
      throw new Error("Session not found");
    }

    const evaluations = session.questions
      .map((q) => q.answer?.evaluation)
      .filter(Boolean);

    // Identify weak areas
    const weakAreas = this.identifyWeakAreas(session, evaluations);

    // Generate personalized roadmap
    return {
      day1: this.generateDay1Plan(weakAreas, session),
      day3: this.generateDay3Plan(weakAreas, session),
      day7: this.generateDay7Plan(weakAreas, session),
      day14: this.generateDay14Plan(weakAreas, session),
      day30: this.generateDay30Plan(weakAreas, session),
      weakAreas,
      focusTopics: this.getFocusTopics(weakAreas),
    };
  },

  identifyWeakAreas(session: any, evaluations: any[]) {
    const weakAreas: Array<{ area: string; score: number; priority: string; topics: string[] }> = [];

    if (evaluations.length > 0) {
      // Technical weaknesses
      const avgTechnical = evaluations.reduce((s: number, e: any) => s + e.technicalScore, 0) / evaluations.length;
      if (avgTechnical < 70) {
        weakAreas.push({
          area: "Technical Knowledge",
          score: Math.round(avgTechnical),
          priority: avgTechnical < 50 ? "high" : "medium",
          topics: this.getTechnicalTopics(session.role),
        });
      }

      // Communication weaknesses
      const avgComm = evaluations.reduce((s: number, e: any) => s + e.communicationScore, 0) / evaluations.length;
      if (avgComm < 70) {
        weakAreas.push({
          area: "Communication",
          score: Math.round(avgComm),
          priority: avgComm < 50 ? "high" : "medium",
          topics: ["STAR Format", "Clear Explanation", "Professional Language"],
        });
      }

      // Problem-solving weaknesses
      const avgProblemSolving = evaluations.reduce((s: number, e: any) => s + e.problemSolvingScore, 0) / evaluations.length;
      if (avgProblemSolving < 70) {
        weakAreas.push({
          area: "Problem Solving",
          score: Math.round(avgProblemSolving),
          priority: avgProblemSolving < 50 ? "high" : "medium",
          topics: ["Analytical Thinking", "Systematic Approach", "Trade-off Analysis"],
        });
      }

      // Confidence weaknesses
      const avgConf = evaluations.reduce((s: number, e: any) => s + e.confidenceScore, 0) / evaluations.length;
      if (avgConf < 70) {
        weakAreas.push({
          area: "Confidence",
          score: Math.round(avgConf),
          priority: "medium",
          topics: ["Mock Interviews", "Body Language", "Positive Self-talk"],
        });
      }
    }

    // Body language weaknesses
    if (session.bodyAnalysis && session.bodyAnalysis.overallScore < 70) {
      weakAreas.push({
        area: "Body Language",
        score: session.bodyAnalysis.overallScore,
        priority: "medium",
        topics: ["Eye Contact", "Posture", "Facial Expressions"],
      });
    }

    // Speech weaknesses
    if (session.speechAnalysis && session.speechAnalysis.overallScore < 70) {
      weakAreas.push({
        area: "Speech",
        score: session.speechAnalysis.overallScore,
        priority: "medium",
        topics: ["Speaking Pace", "Filler Words", "Clarity"],
      });
    }

    return weakAreas.sort((a, b) => {
      const priorityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };
      return (priorityOrder[a.priority] || 2) - (priorityOrder[b.priority] || 2);
    });
  },

  getTechnicalTopics(role: string): string[] {
    const topics: Record<string, string[]> = {
      frontend: ["React Fundamentals", "JavaScript ES6+", "CSS Layout", "Performance Optimization"],
      backend: ["API Design", "Database Optimization", "System Design", "Security"],
      fullstack: ["Frontend + Backend Integration", "Database Design", "System Architecture"],
      data_science: ["Machine Learning", "Statistics", "SQL", "Python"],
      ml_engineer: ["Deep Learning", "MLOps", "Model Optimization", "LLMs"],
      product: ["Product Strategy", "Analytics", "User Research", "Prioritization"],
      default: ["Core Technical Skills", "Problem Solving", "System Design"],
    };

    const roleLower = role.toLowerCase();
    for (const [key, value] of Object.entries(topics)) {
      if (roleLower.includes(key)) return value;
    }
    return topics.default;
  },

  generateDay1Plan(weakAreas: any[], session: any) {
    const tasks: Array<{ task: string; duration: string; resource: string }> = [];

    // Focus on highest priority weak area
    const primaryWeakness = weakAreas[0];
    if (primaryWeakness) {
      tasks.push({
        task: `Review ${primaryWeakness.area} fundamentals`,
        duration: "2 hours",
        resource: `Focus on: ${primaryWeakness.topics.slice(0, 2).join(", ")}`,
      });
    }

    tasks.push(
      {
        task: "Practice 3 STAR-format behavioral questions",
        duration: "30 minutes",
        resource: "Write down Situion, Task, Action, Result for each",
      },
      {
        task: "Research company recent news and achievements",
        duration: "30 minutes",
        resource: `Focus on ${session.company.name}'s latest products and initiatives`,
      },
      {
        task: "Practice mock interview with a friend or AI",
        duration: "45 minutes",
        resource: "Record yourself and review for filler words and pacing",
      }
    );

    return {
      title: "Day 1: Quick Wins",
      totalDuration: "3.5 hours",
      tasks,
      focus: primaryWeakness?.area || "General Preparation",
    };
  },

  generateDay3Plan(weakAreas: any[], session: any) {
    const tasks: Array<{ task: string; duration: string; resource: string }> = [];

    // Day 3: Build on day 1, add more depth
    weakAreas.slice(0, 2).forEach((weakness) => {
      tasks.push({
        task: `Deep dive into ${weakness.area}`,
        duration: "1.5 hours",
        resource: `Study: ${weakness.topics.join(", ")}`,
      });
    });

    tasks.push(
      {
        task: "Practice 5 technical questions relevant to the role",
        duration: "1 hour",
        resource: "Focus on scenario-based and architecture questions",
      },
      {
        task: "Record and review a 5-minute self-introduction",
        duration: "30 minutes",
        resource: "Practice making it concise, confident, and relevant",
      },
      {
        task: "Study company's tech stack and culture",
        duration: "45 minutes",
        resource: `Research ${session.company.name}'s engineering blog and values`,
      }
    );

    return {
      title: "Day 3: Deep Dive",
      totalDuration: "5 hours",
      tasks,
      focus: weakAreas.slice(0, 2).map((w) => w.area).join(" & "),
    };
  },

  generateDay7Plan(weakAreas: any[], session: any) {
    const tasks: Array<{ task: string; duration: string; resource: string }> = [];

    tasks.push(
      {
        task: "Complete a full-length mock interview",
        duration: "1 hour",
        resource: "Simulate real interview conditions with timer",
      },
      {
        task: "Review and practice all weak area topics",
        duration: "2 hours",
        resource: `Focus areas: ${weakAreas.map((w) => w.area).join(", ")}`,
      },
      {
        task: "Practice system design questions (if applicable)",
        duration: "1 hour",
        resource: "Focus on scalability, trade-offs, and clear communication",
      },
      {
        task: "Work on body language and speech",
        duration: "30 minutes",
        resource: "Practice with camera on, focus on eye contact and posture",
      },
      {
        task: "Prepare questions to ask the interviewer",
        duration: "30 minutes",
        resource: `Prepare 3-5 thoughtful questions about ${session.company.name}`,
      }
    );

    return {
      title: "Day 7: Comprehensive Practice",
      totalDuration: "5 hours",
      tasks,
      focus: "Full Interview Preparation",
    };
  },

  generateDay14Plan(weakAreas: any[], session: any) {
    const tasks: Array<{ task: string; duration: string; resource: string }> = [];

    tasks.push(
      {
        task: "Daily mock interview practice",
        duration: "1 hour daily",
        resource: "Alternate between technical, behavioral, and mixed formats",
      },
      {
        task: "Strengthen weak areas through targeted practice",
        duration: "1.5 hours daily",
        resource: `Continue focusing on: ${weakAreas.map((w) => w.area).join(", ")}`,
      },
      {
        task: "Build and review a project portfolio",
        duration: "1 hour",
        resource: "Prepare to discuss 2-3 projects in detail",
      },
      {
        task: "Practice under pressure",
        duration: "30 minutes daily",
        resource: "Time yourself, practice thinking aloud",
      },
      {
        task: "Review and refine answers",
        duration: "30 minutes daily",
        resource: "Write improved versions of previous answers",
      }
    );

    return {
      title: "Day 14: Intensive Preparation",
      totalDuration: "2 weeks of daily practice",
      tasks,
      focus: "Sustained Improvement",
    };
  },

  generateDay30Plan(weakAreas: any[], session: any) {
    const tasks: Array<{ task: string; duration: string; resource: string }> = [];

    tasks.push(
      {
        task: "Maintain consistent daily practice",
        duration: "1-2 hours daily",
        resource: "Mix of technical problems, mock interviews, and behavioral practice",
      },
      {
        task: "Build real projects to demonstrate skills",
        duration: "3-4 hours weekly",
        resource: `Projects relevant to ${session.role} at ${session.company.name}`,
      },
      {
        task: "Network and get feedback",
        duration: "1 hour weekly",
        resource: "Connect with professionals in similar roles",
      },
      {
        task: "Stay updated with industry trends",
        duration: "30 minutes daily",
        resource: "Read tech blogs, follow company updates",
      },
      {
        task: "Final interview simulation",
        duration: "1 hour before interview",
        resource: "Complete mock interview with scoring and feedback",
      }
    );

    return {
      title: "Day 30: Long-term Excellence",
      totalDuration: "1 month of consistent practice",
      tasks,
      focus: "Mastery and Confidence",
    };
  },

  getFocusTopics(weakAreas: any[]): string[] {
    const topics: string[] = [];
    weakAreas.forEach((area) => {
      topics.push(...area.topics);
    });
    return [...new Set(topics)].slice(0, 10);
  },
};
