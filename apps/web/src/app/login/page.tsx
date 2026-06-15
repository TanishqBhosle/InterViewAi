import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to InterviewAI India",
};

export default function LoginPage() {
  return <LoginForm />;
}
