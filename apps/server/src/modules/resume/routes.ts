import { Router } from "express";
import multer from "multer";
import { authenticate } from "@/middleware/auth";
import { requireOwnership } from "@/middleware/ownership";
import { prisma } from "@/config/database";
import { aiService } from "@/services/ai";

const router = Router();
router.use(authenticate);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and DOCX files are supported"));
    }
  },
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, message: "No file provided" });
    }

    let text = "";
    try {
      if (file.mimetype === "application/pdf") {
        const { PDFParse } = await import("pdf-parse");
        const pdf = new PDFParse({ data: file.buffer });
        const result = await pdf.getText();
        text = result.text;
      } else {
        const mammoth = await import("mammoth");
        const result = await mammoth.extractRawText({ buffer: file.buffer });
        text = result.value;
      }
    } catch {
      text = file.originalname;
    }

    const fileUrl = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
    const skillsFound: string[] = [];
    const missingKeywords: string[] = [];
    let atsScore = 75;
    let suggestions: string[] = [];

    if (text.length > 50) {
      try {
        const analysis = await aiService.evaluateAnswer(
          "Analyze this resume and provide ATS score (0-100), skills found, missing keywords, and suggestions. Return JSON with keys: atsScore (number), skills (string[]), missingKeywords (string[]), suggestions (string[]).",
          text.substring(0, 8000)
        );
        if (analysis.overallScore) atsScore = Math.round(analysis.overallScore);
        if (analysis.strengths?.length) skillsFound.push(...analysis.strengths);
        if (analysis.improvements?.length) suggestions.push(...analysis.improvements);
      } catch {
        // AI analysis failed, use defaults
      }
    }

    const resume = await prisma.resume.create({
      data: {
        userId: req.user!.userId,
        fileName: file.originalname,
        fileUrl,
        fileSize: file.size,
        mimeType: file.mimetype,
        status: "ANALYZED",
        atsScore,
        parsedData: { text: text.substring(0, 500) },
        skillsFound,
        missingKeywords,
        suggestions,
        analysisReport: { atsScore, skillsFound, missingKeywords, suggestions, totalWords: text.split(/\s+/).length },
      },
    });

    res.status(201).json({ success: true, resume, status: "analyzed" });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const resumes = await prisma.resume.findMany({ where: { userId: req.user!.userId }, orderBy: { createdAt: "desc" } });
    res.json({ success: true, resumes });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/:id", requireOwnership("resume"), async (req, res) => {
  try {
    const id = req.params.id as string;
    const resume = await prisma.resume.findUnique({ where: { id } });
    if (!resume) return res.status(404).json({ success: false, message: "Resume not found" });
    res.json({ success: true, resume });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete("/:id", requireOwnership("resume"), async (req, res) => {
  try {
    const id = req.params.id as string;
    await prisma.resume.delete({ where: { id } });
    res.json({ success: true, message: "Resume deleted" });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;