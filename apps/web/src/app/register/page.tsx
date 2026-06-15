import type { Metadata } from "next";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Sign up for InterviewAI India and start your interview preparation",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
