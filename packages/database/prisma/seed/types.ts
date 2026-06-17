export interface SubtopicContent {
  overview?: string;
  problemStatement?: string;
  intuitionFirst?: string;
  realLifeAnalogy?: string;
  visualExplanation?: string;
  howItWorks?: string;
  beginnerExample?: string;
  intermediateExample?: string;
  productionExample?: string;
  industryScenario?: string;
  interviewPerspective?: string;
  commonMistakes?: string;
  bestPractices?: string;
  performanceNotes?: string;
  securityNotes?: string;
  comparisonTable?: string;
  codingExamples?: string;
  visualFlow?: string;
  assignment?: string;
  miniProject?: string;
  realProject?: string;
  beginnerExplanation?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface FaangQuestion {
  question: string;
  answer: string;
  difficulty: "easy" | "medium" | "hard" | "expert";
  company?: string;
}

export interface CodingChallenge {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  starterCode?: string;
  solutionHint?: string;
}

export interface SubtopicData {
  slug: string;
  title: string;
  order: number;
  content: SubtopicContent;
  quiz: QuizQuestion[];
  faangQuestions: FaangQuestion[];
  codingChallenges: CodingChallenge[];
}

export interface TopicData {
  slug: string;
  title: string;
  description: string;
  order: number;
  subtopics: SubtopicData[];
}

export interface SubjectData {
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  topics: TopicData[];
}
