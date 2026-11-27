import "dotenv/config";
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import {
  GoogleGenAI,
  Content,
  Part,
  Type,
  Modality,
  LiveServerMessage,
} from "@google/genai";
import { WebSocketServer, WebSocket } from "ws";
import JSZip from "jszip";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

type AppLanguage = "ar" | "en";
type TutorModelId = "gemini-4-hydrogen" | "gemini-3.1-flash-lite";
type TutorRoleId = "academic" | "socratic" | "exam" | "concise";

const ALLOWED_MODELS = new Set<TutorModelId>([
  "gemini-4-hydrogen",
  "gemini-3.1-flash-lite",
]);

const ALLOWED_ROLES = new Set<TutorRoleId>([
  "academic",
  "socratic",
  "exam",
  "concise",
]);

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    throw new Error("MISSING_API_KEY");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

function buildTutorSystemInstruction(
  lang: AppLanguage,
  contextInfo: string,
  role: TutorRoleId,
  isVoice = false
): string {
  const safeContext = contextInfo.slice(0, 240);

  if (lang === "en") {
    const roleGuideline = (() => {
      switch (role) {
        case "socratic":
          return "Adopt a Socratic mentoring style: guide the student step-by-step with thoughtful hints and 1–2 diagnostic check-in questions so they discover the reasoning themselves before giving full solutions.";
        case "exam":
          return "Adopt an Exam & Qiyas Coach style: highlight high-yield test concepts, common exam traps, timed problem-solving strategies, and conclude with targeted practice questions and answer keys.";
        case "concise":
          return "Adopt a Quick Reviewer style: keep explanations ultra-crisp using short bullet points, key formulas, definitions, and rapid-recall memory cues.";
        default:
          return "Adopt a structured Saudi Academic Tutor style: explain concepts thoroughly with clear headings, comparison tables when helpful, and practical university or classroom examples.";
      }
    })();

    const voiceRule = isVoice
      ? "Because this is a real-time spoken voice conversation, keep replies natural, warm, conversational, and concise (2–4 spoken sentences per turn) without raw Markdown symbols, bullet characters, or tables."
      : "Structure your response with clear headings, numbered lists, and Markdown comparison tables when summarizing or comparing concepts.";

    return [
      'You are "Midad AI", an intelligent academic tutor specializing in Saudi Arabian university curricula and K-12 education (including Sport Sciences & Physical Activity, Fine Arts, Computer Science, Health Sciences, Engineering, Business, and Qiyas/Tahsili prep).',
      `Active academic track for the student: ${safeContext}.`,
      roleGuideline,
      "1. Respond in clear, encouraging, scholarly English, optionally noting key Arabic academic terms when helpful for Saudi courses.",
      `2. ${voiceRule}`,
      "3. Connect explanations to practical classroom, laboratory, or field examples relevant to the selected course.",
    ].join("\n");
  }

  const roleGuidelineAr = (() => {
    switch (role) {
      case "socratic":
        return "اعتمد أسلوب المعلم السقراطي: وجّه الطالب خطوة بخطوة بتلميحات ذكية وسؤال أو سؤالين تحفيزيين ليساعداه على استنتاج الحل بنفسه قبل عرض الإجابة الكاملة.";
      case "exam":
        return "اعتمد أسلوب مدرب الاختبارات والقدرات والتحصيلي: ركّز على النقاط عالية الأهمية في الاختبارات، الأخطاء الشائعة، استراتيجيات الحل السريع، واختم بأسئلة تدريبية مع مفتاح الإجابة.";
      case "concise":
        return "اعتمد أسلوب المراجع السريع: قدّم شرحاً مركزاً ومختصراً جداً في نقاط سريعة وتعريفات وقوانين أساسية للمراجعة قبيل الاختبار.";
      default:
        return "اعتمد أسلوب المعلم الأكاديمي السعودي الشامل: اشرح المفاهيم بوضوح مع عناوين منظمة وجداول مقارنة عند الحاجة وأمثلة عملية من المقرر الجامعي أو المدرسي.";
    }
  })();

  const voiceRuleAr = isVoice
    ? "نظراً لأن هذه محادثة صوتية مباشرة، اجعل ردودك طبيعية وودودة وموجزة (جملتين إلى أربع جمل منطوقة في كل دور) دون رموز Markdown أو جداول."
    : "نظّم إجابتك بعناوين واضحة، نقاط مرقمة، وجداول مقارنة Markdown عند طلب التلخيص أو المقارنة.";

  return [
    'أنت "مِداد AI"، معلم ومساعد دراسي ذكي متخصص في المناهج السعودية والتعليم الجامعي بالمملكة العربية السعودية (بما في ذلك علوم الرياضة والنشاط البدني، الفنون، الحاسب، الطب، الهندسة، الإدارة، التعليم العام، والقدرات والتحصيلي).',
    `المسار الأكاديمي النشط للطالب حالياً: ${safeContext}.`,
    roleGuidelineAr,
    "1. تحدث واكتب باللغة العربية الفصحى الواضحة والمشجعة، مع توضيح المصطلحات الإنجليزية المهمة عند الحاجة.",
    `2. ${voiceRuleAr}`,
    "3. اربط الشرح بالتطبيق العملي والأمثلة المناسبة للمقرر المختار.",
  ].join("\n");
}

async function extractTextFromOfficeBuffer(buffer: Buffer, ext: string): Promise<string> {
  const zip = await JSZip.loadAsync(buffer);
  const extractedChunks: string[] = [];

  if (ext === "docx") {
    const docXml = zip.file("word/document.xml");
    if (docXml) {
      const xmlText = await docXml.async("string");
      const plain = xmlText
        .replace(/<\/w:p>/g, "\n")
        .replace(/<[^>]+>/g, " ")
        .replace(/[ \t]+/g, " ")
        .replace(/\n\s+/g, "\n")
        .trim();
      if (plain) extractedChunks.push(plain);
    }
  } else if (ext === "pptx") {
    const slideNames = Object.keys(zip.files)
      .filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || "0", 10);
        const numB = parseInt(b.match(/\d+/)?.[0] || "0", 10);
        return numA - numB;
      });

    for (const slideName of slideNames) {
      const slideFile = zip.file(slideName);
      if (slideFile) {
        const xmlText = await slideFile.async("string");
        const plain = xmlText
          .replace(/<\/a:p>/g, "\n")
          .replace(/<[^>]+>/g, " ")
          .replace(/[ \t]+/g, " ")
          .replace(/\n\s+/g, "\n")
          .trim();
        if (plain) {
          const slideNum = slideName.match(/\d+/)?.[0] || "";
          extractedChunks.push(`--- Slide ${slideNum} ---\n${plain}`);
        }
      }
    }
  }

  return extractedChunks.join("\n\n");
}

interface AttachmentPayload {
  name: string;
  mimeType: string;
  base64Data: string;
}

interface HistoryItem {
  role: "user" | "model";
  text: string;
}

interface AskRequestBody {
  prompt?: string;
  contextInfo?: string;
  language?: AppLanguage;
  history?: HistoryItem[];
  attachment?: AttachmentPayload | null;
  model?: TutorModelId;
  tutorRole?: TutorRoleId;
  useSearchGrounding?: boolean;
}

interface TranslateItem {
  id: string;
  text: string;
}

interface TranslateRequestBody {
  targetLanguage?: AppLanguage;
  items?: TranslateItem[];
}

interface GroundingSource {
  title: string;
  uri: string;
}

function getLocalizedError(
  lang: AppLanguage,
  key:
    | "empty"
    | "extract"
    | "unsupported"
    | "emptyResponse"
    | "missingKey"
    | "forbidden"
    | "rateLimit"
    | "generic",
  extra?: string
): string {
  if (lang === "en") {
    switch (key) {
      case "empty":
        return "Please enter a question or attach a file before sending.";
      case "extract":
        return `Could not extract text from (${extra}). Make sure the file is not password-protected or convert it to PDF.`;
      case "unsupported":
        return `File format (${extra}) is not supported directly. Supported formats: PDF, Images (PNG/JPG/WEBP), Word (.docx), PowerPoint (.pptx), and Text (.txt).`;
      case "emptyResponse":
        return "The model did not return a text response. Please try again.";
      case "missingKey":
        return "Gemini API key is not configured on the server. Please add it in Settings > Secrets.";
      case "forbidden":
        return "Could not verify the Gemini API key. Please check Settings > Secrets.";
      case "rateLimit":
        return "Rate limit reached. Please wait a moment and try again.";
      default:
        return "An error occurred while contacting the AI service. Please try again.";
    }
  }
  switch (key) {
    case "empty":
      return "يرجى كتابة سؤال أو إرفاق ملف قبل الإرسال.";
    case "extract":
      return `تعذر استخراج النص من الملف (${extra}). تأكد من أن الملف غير محمي بكلمة مرور أو قم بتحويله إلى PDF.`;
    case "unsupported":
      return `صيغة الملف (${extra}) غير مدعومة مباشرة. الصيغ المدعومة: PDF، الصور (PNG/JPG/WEBP)، Word (.docx)، PowerPoint (.pptx)، والنصوص (.txt).`;
    case "emptyResponse":
      return "لم يُرجع النموذج استجابة نصية. يرجى المحاولة مرة أخرى.";
    case "missingKey":
      return "مفتاح Gemini API غير مُعد على الخادم. يرجى إضافته من لوحة Settings > Secrets.";
    case "forbidden":
      return "تعذر التحقق من صلاحية مفتاح Gemini API. يرجى مراجعته في لوحة Settings > Secrets.";
    case "rateLimit":
      return "تم تجاوز الحد المسموح به للطلبات حالياً. يرجى الانتظار قليلاً ثم المحاولة مرة أخرى.";
    default:
      return "حدث خطأ أثناء الاتصال بخدمة الذكاء الاصطناعي. يرجى المحاولة مجدداً.";
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "25mb" }));

  const server = createServer(app);

  // Real-time bidirectional voice tutor via Gemini Live API (gemini-3.8-live)
  const wss = new WebSocketServer({ server, path: "/api/live" });

  wss.on("connection", async (clientWs: WebSocket, req) => {
    let lang: AppLanguage = "ar";
    let role: TutorRoleId = "academic";
    let course = "";

    try {
      const url = new URL(req.url || "/api/live", "http://localhost");
      lang = url.searchParams.get("lang") === "en" ? "en" : "ar";
      const requestedRole = url.searchParams.get("role") as TutorRoleId;
      role = ALLOWED_ROLES.has(requestedRole) ? requestedRole : "academic";
      course = (url.searchParams.get("course") || (lang === "en" ? "Saudi Curricula" : "المناهج السعودية")).slice(0, 200);
    } catch {
      // keep safe defaults
    }

    let liveSession: Awaited<ReturnType<GoogleGenAI["live"]["connect"]>> | null = null;
    let isClosed = false;

    const closeAll = () => {
      if (isClosed) return;
      isClosed = true;
      try {
        liveSession?.close();
      } catch {
        // ignore close errors
      }
      liveSession = null;
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.close();
      }
    };

    try {
      const ai = getGeminiClient();
      const systemInstruction = buildTutorSystemInstruction(lang, course, role, true);

      liveSession = await ai.live.connect({
        model: "gemini-3.8-live",
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: "Zephyr" },
            },
          },
          systemInstruction,
        },
        callbacks: {
          onopen: () => {
            if (clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(JSON.stringify({ type: "ready" }));
            }
          },
          onmessage: (message: LiveServerMessage) => {
            if (clientWs.readyState !== WebSocket.OPEN) return;
            const content = message.serverContent;

            if (content?.inputTranscription?.text) {
              clientWs.send(
                JSON.stringify({
                  type: "inputTranscript",
                  text: content.inputTranscription.text,
                })
              );
            }

            if (content?.outputTranscription?.text) {
              clientWs.send(
                JSON.stringify({
                  type: "outputTranscript",
                  text: content.outputTranscription.text,
                })
              );
            }

            for (const part of content?.modelTurn?.parts ?? []) {
              if (part.inlineData?.data) {
                clientWs.send(
                  JSON.stringify({
                    type: "audio",
                    data: part.inlineData.data,
                  })
                );
              }
            }

            if (content?.interrupted) {
              clientWs.send(JSON.stringify({ type: "interrupted" }));
            }

            if (content?.turnComplete) {
              clientWs.send(JSON.stringify({ type: "turnComplete" }));
            }
          },
          onerror: (err: unknown) => {
            console.error("Gemini Live error:", err);
            if (clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(
                JSON.stringify({
                  type: "error",
                  error: getLocalizedError(lang, "generic"),
                })
              );
            }
            closeAll();
          },
          onclose: () => {
            closeAll();
          },
        },
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("Failed to open Gemini Live session:", message);
      const localized =
        message === "MISSING_API_KEY"
          ? getLocalizedError(lang, "missingKey")
          : message.includes("403") || message.includes("PERMISSION_DENIED")
            ? getLocalizedError(lang, "forbidden")
            : getLocalizedError(lang, "generic");
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(JSON.stringify({ type: "error", error: localized }));
      }
      closeAll();
      return;
    }

    clientWs.on("message", (raw) => {
      if (!liveSession || isClosed) return;
      try {
        const text = raw.toString();
        if (text.length > 512 * 1024) return;
        const msg = JSON.parse(text) as { audio?: string; text?: string };

        if (typeof msg.audio === "string" && msg.audio.length > 0) {
          liveSession.sendRealtimeInput({
            audio: { data: msg.audio, mimeType: "audio/pcm;rate=16000" },
          });
        } else if (typeof msg.text === "string" && msg.text.trim().length > 0) {
          liveSession.sendRealtimeInput({
            text: msg.text.trim().slice(0, 2000),
          });
        }
      } catch {
        // ignore malformed incoming chunks
      }
    });

    clientWs.on("close", closeAll);
    clientWs.on("error", closeAll);
  });

  app.post("/api/ask", async (req, res) => {
    const body = req.body as AskRequestBody;
    const lang: AppLanguage = body.language === "en" ? "en" : "ar";

    try {
      const prompt = (body.prompt || "").trim();
      const contextInfo = (
        body.contextInfo || (lang === "en" ? "Saudi Curricula" : "المناهج السعودية")
      ).trim();
      const history = Array.isArray(body.history) ? body.history : [];
      const attachment = body.attachment || null;
      const useSearchGrounding = Boolean(body.useSearchGrounding);

      const requestedRole = body.tutorRole as TutorRoleId;
      const tutorRole: TutorRoleId = ALLOWED_ROLES.has(requestedRole)
        ? requestedRole
        : "academic";

      const requestedModel = body.model as TutorModelId;
      // Google Search grounding requires gemini-4-hydrogen
      const selectedModel: TutorModelId = useSearchGrounding
        ? "gemini-4-hydrogen"
        : ALLOWED_MODELS.has(requestedModel)
          ? requestedModel
          : "gemini-4-hydrogen";

      if (!prompt && !attachment) {
        res.status(400).json({
          error: getLocalizedError(lang, "empty"),
        });
        return;
      }

      const ai = getGeminiClient();
      const systemInstruction = buildTutorSystemInstruction(
        lang,
        contextInfo,
        tutorRole,
        false
      );

      const currentParts: Part[] = [];
      let userPromptText =
        prompt ||
        (lang === "en"
          ? "Explain this file and summarize its key points in an organized way."
          : "اشرح هذا الملف ولخص أهم نقاطه بشكل منظم.");

      if (attachment && attachment.base64Data) {
        const ext = attachment.name.split(".").pop()?.toLowerCase() || "";
        const supportedInlineMimeTypes = [
          "application/pdf",
          "image/png",
          "image/jpeg",
          "image/webp",
        ];

        if (supportedInlineMimeTypes.includes(attachment.mimeType)) {
          currentParts.push({
            inlineData: {
              mimeType: attachment.mimeType,
              data: attachment.base64Data,
            },
          });
        } else if (ext === "docx" || ext === "pptx") {
          const buffer = Buffer.from(attachment.base64Data, "base64");
          const extractedText = await extractTextFromOfficeBuffer(buffer, ext);
          if (extractedText) {
            userPromptText += `\n\n[Attached file content (${attachment.name})]:\n${extractedText.slice(0, 45000)}`;
          } else {
            res.status(400).json({
              error: getLocalizedError(lang, "extract", attachment.name),
            });
            return;
          }
        } else if (
          ext === "txt" ||
          ext === "md" ||
          ext === "csv" ||
          attachment.mimeType.startsWith("text/")
        ) {
          const decodedText = Buffer.from(attachment.base64Data, "base64").toString("utf-8");
          userPromptText += `\n\n[Attached text file (${attachment.name})]:\n${decodedText.slice(0, 45000)}`;
        } else {
          res.status(400).json({
            error: getLocalizedError(lang, "unsupported", ext || attachment.mimeType),
          });
          return;
        }
      }

      currentParts.push({ text: userPromptText });

      const contents: Content[] = [];
      for (const item of history.slice(-12)) {
        if (item.text && (item.role === "user" || item.role === "model")) {
          contents.push({
            role: item.role,
            parts: [{ text: item.text }],
          });
        }
      }
      contents.push({
        role: "user",
        parts: currentParts,
      });

      const response = await ai.models.generateContent({
        model: selectedModel,
        contents,
        config: {
          systemInstruction,
          ...(useSearchGrounding ? { tools: [{ googleSearch: {} }] } : {}),
        },
      });

      const answer = response.text?.trim();
      if (!answer) {
        res.status(502).json({
          error: getLocalizedError(lang, "emptyResponse"),
        });
        return;
      }

      const rawChunks =
        response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
      const seenUris = new Set<string>();
      const sources: GroundingSource[] = [];
      for (const chunk of rawChunks) {
        const uri = chunk.web?.uri;
        if (uri && /^https?:\/\//i.test(uri) && !seenUris.has(uri)) {
          seenUris.add(uri);
          sources.push({
            title: chunk.web?.title?.trim() || uri,
            uri,
          });
        }
      }

      res.json({
        text: answer,
        sources,
        model: selectedModel,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("Gemini API error:", message);

      if (message === "MISSING_API_KEY") {
        res.status(500).json({ error: getLocalizedError(lang, "missingKey") });
        return;
      }

      if (
        message.includes("403") ||
        message.includes("PERMISSION_DENIED") ||
        message.includes("API_KEY_INVALID")
      ) {
        res.status(403).json({ error: getLocalizedError(lang, "forbidden") });
        return;
      }

      if (message.includes("429") || message.includes("RESOURCE_EXHAUSTED")) {
        res.status(429).json({ error: getLocalizedError(lang, "rateLimit") });
        return;
      }

      res.status(500).json({ error: getLocalizedError(lang, "generic") });
    }
  });

  app.post("/api/translate", async (req, res) => {
    const body = req.body as TranslateRequestBody;
    const targetLanguage: AppLanguage = body.targetLanguage === "en" ? "en" : "ar";
    const items = Array.isArray(body.items) ? body.items : [];

    try {
      if (items.length === 0) {
        res.json({ translations: [] });
        return;
      }

      const cleanItems = items
        .filter(
          (it) =>
            it &&
            typeof it.id === "string" &&
            typeof it.text === "string" &&
            it.text.trim().length > 0
        )
        .slice(0, 30);

      if (cleanItems.length === 0) {
        res.json({ translations: [] });
        return;
      }

      const ai = getGeminiClient();
      const targetName = targetLanguage === "en" ? "English" : "Arabic";

      const response = await ai.models.generateContent({
        model: "gemini-4-hydrogen",
        contents: JSON.stringify(cleanItems),
        config: {
          systemInstruction: [
            `You are a precise academic translator translating educational chat messages into ${targetName}.`,
            "Preserve all Markdown formatting (headings, bold **text**, bullet lists, numbered lists, code blocks, and Markdown tables).",
            "Do not omit or summarize content; translate accurately and naturally for university and school students.",
            "Return a JSON array with exact matching 'id' values and 'translatedText' for every input item.",
          ].join("\n"),
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                translatedText: { type: Type.STRING },
              },
              required: ["id", "translatedText"],
            },
          },
        },
      });

      const raw = (response.text ?? "[]").trim();
      const parsed = JSON.parse(raw) as Array<{ id: string; translatedText: string }>;
      res.json({ translations: Array.isArray(parsed) ? parsed : [] });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("Translation API error:", message);
      if (message === "MISSING_API_KEY") {
        res.status(500).json({ error: getLocalizedError(targetLanguage, "missingKey") });
        return;
      }
      res.status(500).json({
        error:
          targetLanguage === "en"
            ? "Could not translate conversation messages right now."
            : "تعذر ترجمة رسائل المحادثة حالياً.",
      });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Midad AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
