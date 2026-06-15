import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "InterviewAI India - AI-Powered Interview Preparation",
    template: "%s | InterviewAI India",
  },
  description:
    "India's #1 AI-powered interview preparation platform. Practice HR, Technical, Behavioral interviews with AI feedback. Resume analysis, career coaching, and personalized roadmaps.",
  keywords: [
    "interview preparation",
    "AI interview",
    "resume analyzer",
    "career coaching",
    "placement preparation",
    "India jobs",
    "mock interview",
  ],
  authors: [{ name: "InterviewAI India" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "InterviewAI India",
    title: "InterviewAI India - AI-Powered Interview Preparation",
    description:
      "Practice interviews, analyze resumes, and get AI career coaching. Built for Indian professionals.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
