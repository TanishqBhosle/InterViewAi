import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create colleges
  const iit = await prisma.college.upsert({
    where: { code: "IITB" },
    update: {},
    create: { name: "Indian Institute of Technology Bombay", code: "IITB", location: "Mumbai" },
  });

  const nit = await prisma.college.upsert({
    where: { code: "NITK" },
    update: {},
    create: { name: "National Institute of Technology Karnataka", code: "NITK", location: "Surathkal" },
  });

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@interviewai.in" },
    update: {},
    create: {
      name: "Super Admin",
      email: "admin@interviewai.in",
      role: "SUPER_ADMIN",
    },
  });

  // Create learning resources
  const resources = [
    {
      title: "Top 100 DSA Problems for Interviews",
      category: "dsa",
      subcategory: "arrays",
      content: "Detailed guide to solving the top 100 DSA problems...",
      difficulty: "MEDIUM" as const,
      tags: ["arrays", "strings", "trees", "graphs", "dp"],
    },
    {
      title: "System Design: Design WhatsApp",
      category: "system_design",
      subcategory: "messaging",
      content: "Complete system design of a messaging platform like WhatsApp...",
      difficulty: "HARD" as const,
      tags: ["distributed-systems", "scalability", "real-time"],
    },
    {
      title: "Google SDE Interview Preparation Guide",
      category: "company_guides",
      subcategory: "google",
      content: "Comprehensive guide for Google SDE interviews including tips, topics, and practice questions...",
      difficulty: "HARD" as const,
      tags: ["google", "sde", "interview"],
      company: "Google",
      isPremium: true,
    },
    {
      title: "Amazon Leadership Principles Explained",
      category: "company_guides",
      subcategory: "amazon",
      content: "Deep dive into Amazon's 16 leadership principles with example responses...",
      difficulty: "MEDIUM" as const,
      tags: ["amazon", "behavioral", "leadership-principles"],
      company: "Amazon",
    },
    {
      title: "HR Interview Questions & Answers",
      category: "interview_questions",
      subcategory: "hr",
      content: "Collection of common HR interview questions with sample answers...",
      difficulty: "EASY" as const,
      tags: ["hr", "common-questions", "behavioral"],
    },
    {
      title: "REST vs GraphQL: Complete Guide",
      category: "notes",
      subcategory: "api-design",
      content: "Comprehensive comparison of REST and GraphQL with examples...",
      difficulty: "MEDIUM" as const,
      tags: ["rest", "graphql", "api", "backend"],
    },
  ];

  for (const res of resources) {
    await prisma.learningResource.create({ data: res });
  }

  // Create coupons
  await prisma.coupon.create({
    data: {
      code: "WELCOME50",
      discountType: "percentage",
      discountValue: 50,
      maxUses: 1000,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.coupon.create({
    data: {
      code: "PRO299",
      discountType: "fixed",
      discountValue: 299,
      maxUses: 500,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
    },
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
