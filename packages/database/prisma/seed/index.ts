import { PrismaClient } from "@prisma/client";
import { seedSubject } from "./helpers";
import { htmlSubject } from "./html";
import { cssSubject } from "./css";
import { reactSubject } from "./react";
import { backendSubject } from "./backend";
import { golangSubject } from "./golang";
import { pythonSubject } from "./python";
import { mlSubject } from "./ml";
import { systemDesignSubject } from "./system-design";
import { hldSubject } from "./hld";
import { lldSubject } from "./lld";

import { genaiSubject } from "./genai";

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
    ...(genaiSubject ? [genaiSubject] : []),
    systemDesignSubject,
    hldSubject,
    lldSubject,
  ];

  for (const subject of subjects) {
    console.log(`  Creating subject: ${subject.title}`);
    try {
      await seedSubject(prisma, subject);
    } catch (err: any) {
      console.error(`  ERROR seeding ${subject.title}: ${err.message}`);
    }
  }

  console.log("Learning Hub seeded successfully!");
}
