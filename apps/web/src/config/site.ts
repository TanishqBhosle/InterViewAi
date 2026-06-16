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


