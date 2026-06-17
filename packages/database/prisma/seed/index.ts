import { PrismaClient } from "@prisma/client";
import { seedSubject } from "./helpers";
import { htmlSubject } from "./html";
import { cssSubject } from "./css";
import { reactSubject } from "./react";
import { backendSubject } from "./backend";
import { golangSubject } from "./golang";
import { pythonSubject } from "./python";
import { mlSubject } from "./ml";
import { genaiSubject } from "./genai";
import { systemDesignSubject } from "./system-design";
import { hldSubject } from "./hld";
import { lldSubject } from "./lld";

export async function seedLearningHub(prisma: PrismaClient) {
  console.log("Seeding Learning Hub...");

  const subjects = [
    htmlSubject,
    cssSubject,
    reactSubject,
    backendSubject,
    golangSubject,
    pythonSubject,
    mlSubject,
    genaiSubject,
    systemDesignSubject,
    hldSubject,
    lldSubject,
  ];

  for (const subject of subjects) {
    console.log(`  Creating subject: ${subject.title}`);
    await seedSubject(prisma, subject);
  }

  console.log("Learning Hub seeded successfully!");
}
