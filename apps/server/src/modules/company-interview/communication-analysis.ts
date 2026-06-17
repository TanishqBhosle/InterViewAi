import { z } from "zod";
import { aiService } from "@/services/ai";

const FILLER_WORDS = [
  "um", "uh", "like", "actually", "basically", "you know", "i mean",
  "so", "well", "right", "okay", "sort of", "kind of", "literally",
  "honestly", "obviously", "clearly", "definitely", "absolutely",
];

const COMMUNICATION_ANALYSIS_PROMPT = `Analyze this interview answer for communication quality.

Question: {question}
Answer: {answer}
Speaking Duration: {duration} seconds
Word Count: {wordCount}

Analyze:
1. Grammar correctness
2. Vocabulary sophistication
3. Sentence structure
4. Professionalism
5. Clarity of expression
6. Speaking pace (words per minute)
7. Filler words used
8. Overall engagement

Provide analysis in JSON format:
{
  "grammarScore": number (0-100),
  "vocabularyScore": number (0-100),
  "clarityScore": number (0-100),
  "professionalismScore": number (0-100),
  "engagementScore": number (0-100),
  "overallScore": number (0-100),
  "speakingSpeed": number (words per minute),
  "fillerWords": [
    {
      "word": "string",
      "count": number,
      "timestamps": ["string - approximate positions"]
    }
  ],
  "grammarIssues": [
    {
      "issue": "string",
      "suggestion": "string"
    }
  ],
  "vocabularyHighlights": ["string - good word choices"],
  "sentenceStructure": {
    "avgSentenceLength": number,
    "complexity": "simple/moderate/complex",
    "variety": "low/moderate/high"
  },
  "suggestions": ["string array of improvement suggestions"],
  "professionalPhrases": ["string array of professional phrases used"],
  "informalPhrases": ["string array of informal phrases to avoid"]
}

Return ONLY valid JSON, no other text.`;

export const communicationAnalysisService = {
  async analyze(params: {
    question: string;
    answer: string;
    duration: number;
  }) {
    const wordCount = params.answer.split(/\s+/).length;
    const speakingSpeed = params.duration > 0 ? Math.round((wordCount / params.duration) * 60) : 0;

    const prompt = COMMUNICATION_ANALYSIS_PROMPT
      .replace("{question}", params.question)
      .replace("{answer}", params.answer)
      .replace("{duration}", String(params.duration))
      .replace("{wordCount}", String(wordCount));

    try {
      const response = await aiService.generateJSON(prompt);
      const analysis = typeof response === "string" ? JSON.parse(response) : response;

      // Detect filler words locally
      const detectedFillers = this.detectFillerWords(params.answer);

      return {
        ...analysis,
        speakingSpeed,
        wordCount,
        duration: params.duration,
        detectedFillers,
        communicationScore: analysis.overallScore || this.calculateOverallScore(analysis),
      };
    } catch (error) {
      console.error("Communication analysis failed:", error);
      // Fallback to local analysis
      return this.localAnalysis(params);
    }
  },

  detectFillerWords(text: string): Array<{ word: string; count: number; positions: number[] }> {
    const lowerText = text.toLowerCase();
    const results: Array<{ word: string; count: number; positions: number[] }> = [];

    for (const filler of FILLER_WORDS) {
      const regex = new RegExp(`\\b${filler}\\b`, "gi");
      const matches = [...lowerText.matchAll(regex)];
      if (matches.length > 0) {
        results.push({
          word: filler,
          count: matches.length,
          positions: matches.map((m) => m.index || 0),
        });
      }
    }

    return results;
  },

  calculateOverallScore(analysis: any): number {
    const weights = {
      grammar: 0.25,
      vocabulary: 0.15,
      clarity: 0.25,
      professionalism: 0.2,
      engagement: 0.15,
    };

    return Math.round(
      (analysis.grammarScore || 0) * weights.grammar +
      (analysis.vocabularyScore || 0) * weights.vocabulary +
      (analysis.clarityScore || 0) * weights.clarity +
      (analysis.professionalismScore || 0) * weights.professionalism +
      (analysis.engagementScore || 0) * weights.engagement
    );
  },

  localAnalysis(params: {
    question: string;
    answer: string;
    duration: number;
  }) {
    const wordCount = params.answer.split(/\s+/).length;
    const speakingSpeed = params.duration > 0 ? Math.round((wordCount / params.duration) * 60) : 0;
    const fillers = this.detectFillerWords(params.answer);

    // Simple local scoring
    let grammarScore = 70;
    let vocabularyScore = 60;
    let clarityScore = 65;
    let professionalismScore = 70;
    let engagementScore = 60;

    // Penalize for filler words
    const totalFillers = fillers.reduce((sum, f) => sum + f.count, 0);
    grammarScore -= totalFillers * 3;
    professionalismScore -= totalFillers * 2;

    // Penalize for very short answers
    if (wordCount < 20) {
      clarityScore -= 20;
      engagementScore -= 15;
    }

    // Penalize for very fast or slow speaking
    if (speakingSpeed > 180) {
      clarityScore -= 10;
    } else if (speakingSpeed < 80) {
      engagementScore -= 10;
    }

    // Bonus for longer, detailed answers
    if (wordCount > 100) {
      clarityScore += 10;
      engagementScore += 5;
    }

    const scores = {
      grammarScore: Math.max(0, Math.min(100, grammarScore)),
      vocabularyScore: Math.max(0, Math.min(100, vocabularyScore)),
      clarityScore: Math.max(0, Math.min(100, clarityScore)),
      professionalismScore: Math.max(0, Math.min(100, professionalismScore)),
      engagementScore: Math.max(0, Math.min(100, engagementScore)),
    };

    const overallScore = this.calculateOverallScore(scores);

    return {
      ...scores,
      overallScore,
      communicationScore: overallScore,
      speakingSpeed,
      wordCount,
      duration: params.duration,
      detectedFillers: fillers,
      fillerWordCount: totalFillers,
      suggestions: this.generateSuggestions(scores, fillers, speakingSpeed),
    };
  },

  generateSuggestions(scores: any, fillers: any[], speakingSpeed: number): string[] {
    const suggestions: string[] = [];

    if (scores.grammarScore < 70) {
      suggestions.push("Work on grammar - practice speaking in complete sentences.");
    }
    if (scores.vocabularyScore < 70) {
      suggestions.push("Use more professional and technical vocabulary.");
    }
    if (scores.clarityScore < 70) {
      suggestions.push("Structure your answers more clearly - use STAR format.");
    }
    if (fillers.length > 3) {
      suggestions.push(`Reduce filler words (${fillers.length} detected). Pause instead of saying "um" or "uh".`);
    }
    if (speakingSpeed > 180) {
      suggestions.push("Slow down your speaking pace for better clarity.");
    }
    if (speakingSpeed < 80 && speakingSpeed > 0) {
      suggestions.push("Increase your speaking pace slightly to show confidence.");
    }
    if (scores.professionalismScore < 70) {
      suggestions.push("Use more professional language and avoid informal expressions.");
    }

    return suggestions;
  },

  getSpeakingSpeedCategory(wpm: number): string {
    if (wpm < 100) return "Too Slow";
    if (wpm < 130) return "Slow";
    if (wpm <= 160) return "Ideal";
    if (wpm <= 180) return "Fast";
    return "Too Fast";
  },

  getGrammarTips(): string[] {
    return [
      "Use present tense when describing current skills",
      "Use past tense when describing past experiences",
      "Avoid double negatives",
      "Use active voice instead of passive voice",
      "Ensure subject-verb agreement",
      "Use proper articles (a, an, the)",
      "Avoid sentence fragments",
      "Use parallel structure in lists",
    ];
  },

  getProfessionalPhrases(): string[] {
    return [
      "In my experience...",
      "I've found that...",
      "One approach I've used is...",
      "The key insight was...",
      "I would approach this by...",
      "Based on my understanding...",
      "What I've learned is...",
      "The result was...",
    ];
  },
};
