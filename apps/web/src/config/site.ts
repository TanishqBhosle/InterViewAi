export const siteConfig = {
  name: "InterviewAI India",
  description: "AI-powered Interview Preparation & Career Coaching Platform",
  url: "https://interviewai.in",
  ogImage: "/og.png",
  links: {
    twitter: "https://twitter.com/interviewai_in",
    github: "https://github.com/interviewai-india",
  },
} as const;

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#resources" },
] as const;

export const interviewTypes = [
  { id: "hr", label: "HR Interview", icon: "Users" },
  { id: "technical", label: "Technical Interview", icon: "Code" },
  { id: "behavioral", label: "Behavioral Interview", icon: "Brain" },
  { id: "system-design", label: "System Design", icon: "Network" },
  { id: "product", label: "Product Management", icon: "LayoutDashboard" },
  { id: "case-study", label: "Case Study", icon: "FileSearch" },
  { id: "data-science", label: "Data Science", icon: "BarChart3" },
  { id: "sales", label: "Sales Interview", icon: "TrendingUp" },
] as const;

export const companies = [
  "Google", "Amazon", "Microsoft", "Flipkart", "Zomato",
  "Swiggy", "TCS", "Infosys", "Wipro", "Razorpay",
  "PhonePe", "Paytm", "CRED", "Meesho", "Byju's",
] as const;

export const pricingPlans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "forever",
    description: "Get started with basic interview practice",
    features: [
      "3 AI Mock Interviews/month",
      "Basic Resume Analysis",
      "HR Interview Practice",
      "Basic Feedback Reports",
      "Community Access",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 299,
    period: "month",
    description: "Perfect for active job seekers",
    features: [
      "Unlimited AI Mock Interviews",
      "Advanced Resume Analyzer",
      "All Interview Types",
      "AI Career Coach",
      "Detailed Score Reports",
      "Speech & Video Analysis",
      "Personalized Roadmaps",
      "Priority Support",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 999,
    period: "month",
    description: "For serious career growth",
    features: [
      "Everything in Pro",
      "Company-Specific Prep",
      "1-on-1 AI Coaching Sessions",
      "Advanced Analytics Dashboard",
      "Salary Negotiation Coach",
      "System Design Masterclass",
      "Resume Templates",
      "Certificate of Completion",
      "Dedicated Support",
    ],
    cta: "Go Premium",
    popular: false,
  },
] as const;
