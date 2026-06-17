import { PrismaClient } from "@prisma/client";
import type { SubjectData } from "./types";

export async function seedSubject(prisma: PrismaClient, data: SubjectData) {
  const subject = await prisma.subject.upsert({
    where: { slug: data.slug },
    update: {
      title: data.title,
      description: data.description,
      icon: data.icon,
      color: data.color,
      order: data.order,
    },
    create: {
      slug: data.slug,
      title: data.title,
      description: data.description,
      icon: data.icon,
      color: data.color,
      order: data.order,
    },
  });

  for (const topicData of data.topics) {
    const topic = await prisma.topic.upsert({
      where: { subjectId_slug: { subjectId: subject.id, slug: topicData.slug } },
      update: {
        title: topicData.title,
        description: topicData.description,
        order: topicData.order,
      },
      create: {
        slug: topicData.slug,
        title: topicData.title,
        description: topicData.description,
        order: topicData.order,
        subjectId: subject.id,
      },
    });

    for (const subData of topicData.subtopics) {
      await prisma.subtopic.upsert({
        where: { topicId_slug: { topicId: topic.id, slug: subData.slug } },
        update: {
          title: subData.title,
          order: subData.order,
          content: subData.content as object,
          quiz: subData.quiz as object,
          faangQuestions: subData.faangQuestions as object,
          codingChallenges: subData.codingChallenges as object,
        },
        create: {
          slug: subData.slug,
          title: subData.title,
          order: subData.order,
          topicId: topic.id,
          content: subData.content as object,
          quiz: subData.quiz as object,
          faangQuestions: subData.faangQuestions as object,
          codingChallenges: subData.codingChallenges as object,
        },
      });
    }
  }

  return subject;
}
