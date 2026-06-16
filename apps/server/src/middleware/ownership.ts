import type { Request, Response, NextFunction } from "express";
import { prisma } from "@/config/database";

type ResourceType = "resume" | "interview" | "notification" | "chatSession";

const ownerField: Record<ResourceType, string> = {
  resume: "userId",
  interview: "userId",
  notification: "userId",
  chatSession: "userId",
};

const modelMap: Record<ResourceType, any> = {
  resume: prisma.resume,
  interview: prisma.interview,
  notification: prisma.notification,
  chatSession: prisma.chatSession,
};

export function requireOwnership(resource: ResourceType) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ success: false, message: "Resource ID required" });
    }

    try {
      const record = await (modelMap[resource] as any).findUnique({
        where: { id },
        select: { [ownerField[resource]]: true },
      });

      if (!record) {
        return res.status(404).json({ success: false, message: "Resource not found" });
      }

      if (record[ownerField[resource]] !== req.user!.userId) {
        return res.status(403).json({ success: false, message: "Forbidden" });
      }

      next();
    } catch {
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
}
