import { z } from "zod";

export const bodyLanguageService = {
  async analyzeFrame(params: {
    frameData: any;
    timestamp: number;
  }) {
    // This would integrate with a computer vision API in production
    // For now, we'll provide a framework for body language analysis

    const analysis = {
      timestamp: params.timestamp,
      eyeContact: this.analyzeEyeContact(params.frameData),
      posture: this.analyzePosture(params.frameData),
      facialExpression: this.analyzeFacialExpression(params.frameData),
      handMovement: this.analyzeHandMovement(params.frameData),
      engagement: this.calculateEngagement(params.frameData),
    };

    return analysis;
  },

  async analyzeSession(frames: Array<{ data: any; timestamp: number }>) {
    if (frames.length === 0) {
      return this.getDefaultAnalysis();
    }

    const frameAnalyses = frames.map((frame) =>
      this.analyzeFrame({ frameData: frame.data, timestamp: frame.timestamp })
    );

    // Aggregate scores across all frames
    const aggregated = {
      eyeContactScore: this.aggregateScore(frameAnalyses, "eyeContact"),
      postureScore: this.aggregateScore(frameAnalyses, "posture"),
      smileScore: this.aggregateScore(frameAnalyses, "facialExpression", "smile"),
      engagementScore: this.aggregateScore(frameAnalyses, "engagement"),
      confidenceScore: this.calculateConfidence(frameAnalyses),
      distractionCount: this.countDistractions(frameAnalyses),
      handMovement: this.getHandMovementCategory(frameAnalyses),
      overallScore: 0,
      suggestions: [] as string[],
      frameData: frameAnalyses,
    };

    aggregated.overallScore = this.calculateOverallBodyScore(aggregated);
    aggregated.suggestions = this.generateSuggestions(aggregated);

    return aggregated;
  },

  analyzeEyeContact(frameData: any): number {
    // In production, this would use facial landmark detection
    // Returns a score from 0-100
    if (!frameData) return 70; // Default score

    // Simulated analysis based on face position
    const facePosition = frameData.facePosition || { x: 0.5, y: 0.5 };
    const gazeDirection = frameData.gazeDirection || { x: 0, y: 0 };

    // Good eye contact means face is centered and looking at camera
    const centerDistance = Math.sqrt(
      Math.pow(facePosition.x - 0.5, 2) + Math.pow(facePosition.y - 0.5, 2)
    );

    const score = Math.max(0, Math.min(100, 100 - centerDistance * 100));
    return Math.round(score);
  },

  analyzePosture(frameData: any): number {
    if (!frameData) return 70;

    // Simulated posture analysis
    const shoulderLevel = frameData.shoulderLevel || 0.5;
    const spineStraightness = frameData.spineStraightness || 0.7;

    const score = (shoulderLevel * 50 + spineStraightness * 50);
    return Math.round(Math.max(0, Math.min(100, score)));
  },

  analyzeFacialExpression(frameData: any): number {
    if (!frameData) return 60;

    // Simulated expression analysis
    const smileIntensity = frameData.smileIntensity || 0.3;
    const eyebrowPosition = frameData.eyebrowPosition || 0.5;

    const score = (smileIntensity * 60 + eyebrowPosition * 40);
    return Math.round(Math.max(0, Math.min(100, score)));
  },

  analyzeHandMovement(frameData: any): string {
    if (!frameData) return "appropriate";

    const movementFrequency = frameData.handMovementFrequency || 0.5;
    const gestureSize = frameData.gestureSize || 0.5;

    if (movementFrequency > 0.7 || gestureSize > 0.7) return "excessive";
    if (movementFrequency < 0.2 && gestureSize < 0.2) return "minimal";
    return "appropriate";
  },

  calculateEngagement(frameData: any): number {
    if (!frameData) return 65;

    const factors = [
      frameData.eyeContact || 70,
      frameData.facialExpression || 60,
      frameData.bodyMovement || 70,
      frameData.headNodding || 50,
    ];

    return Math.round(factors.reduce((a, b) => a + b, 0) / factors.length);
  },

  aggregateScore(analyses: any[], field: string, subField?: string): number {
    if (analyses.length === 0) return 70;

    const scores = analyses.map((a) => {
      if (subField) {
        return a[field]?.[subField] || 70;
      }
      return a[field] || 70;
    });

    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  },

  calculateConfidence(analyses: any[]): number {
    const factors = [
      this.aggregateScore(analyses, "eyeContact"),
      this.aggregateScore(analyses, "posture"),
      this.aggregateScore(analyses, "engagement"),
    ];

    return Math.round(factors.reduce((a, b) => a + b, 0) / factors.length);
  },

  countDistractions(analyses: any[]): number {
    return analyses.filter((a) => {
      const score = a.eyeContact + a.posture + a.engagement;
      return score / 3 < 50;
    }).length;
  },

  getHandMovementCategory(analyses: any[]): string {
    const movements = analyses.map((a) => a.handMovement);
    const excessive = movements.filter((m) => m === "excessive").length;
    const minimal = movements.filter((m) => m === "minimal").length;

    if (excessive > movements.length / 2) return "excessive";
    if (minimal > movements.length / 2) return "minimal";
    return "appropriate";
  },

  calculateOverallBodyScore(data: any): number {
    const weights = {
      eyeContact: 0.25,
      posture: 0.2,
      smile: 0.15,
      engagement: 0.25,
      confidence: 0.15,
    };

    return Math.round(
      data.eyeContactScore * weights.eyeContact +
      data.postureScore * weights.posture +
      data.smileScore * weights.smile +
      data.engagementScore * weights.engagement +
      data.confidenceScore * weights.confidence
    );
  },

  generateSuggestions(data: any): string[] {
    const suggestions: string[] = [];

    if (data.eyeContactScore < 60) {
      suggestions.push("Maintain better eye contact with the camera. Look at the camera lens, not the screen.");
    }
    if (data.postureScore < 60) {
      suggestions.push("Sit up straight and keep your shoulders relaxed. Avoid slouching.");
    }
    if (data.smileScore < 50) {
      suggestions.push("Smile more naturally. It shows confidence and makes you appear approachable.");
    }
    if (data.engagementScore < 60) {
      suggestions.push("Show more engagement through nodding and facial expressions.");
    }
    if (data.handMovement === "excessive") {
      suggestions.push("Reduce hand gestures. Keep movements controlled and purposeful.");
    }
    if (data.handMovement === "minimal") {
      suggestions.push("Use appropriate hand gestures to emphasize points.");
    }
    if (data.distractionCount > 3) {
      suggestions.push("Minimize distractions. Stay focused on the camera and questions.");
    }

    return suggestions;
  },

  getDefaultAnalysis() {
    return {
      eyeContactScore: 70,
      postureScore: 70,
      smileScore: 60,
      engagementScore: 65,
      confidenceScore: 65,
      distractionCount: 0,
      handMovement: "appropriate",
      overallScore: 65,
      suggestions: [
        "Enable camera for body language analysis",
        "Ensure good lighting for better analysis",
        "Position camera at eye level",
      ],
      frameData: [],
    };
  },

  getTipsForImprovement(): string[] {
    return [
      "Look directly at the camera lens, not the screen",
      "Sit up straight with shoulders back and relaxed",
      "Smile naturally at the beginning and when appropriate",
      "Use hand gestures to emphasize key points",
      "Nod to show active listening",
      "Avoid fidgeting or playing with objects",
      "Keep facial expressions engaged and responsive",
      "Position yourself in the center of the frame",
      "Ensure good lighting on your face",
      "Use a clean, professional background",
    ];
  },
};
