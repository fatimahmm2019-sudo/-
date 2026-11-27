import { Language } from "../i18n/translations";

export type TutorModelId = "gemini-4-hydrogen" | "gemini-3.1-flash-lite";
export type TutorRoleId = "academic" | "socratic" | "exam" | "concise";

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface AttachmentPayload {
  name: string;
  mimeType: string;
  base64Data: string;
  sizeBytes: number;
}

export interface HistoryItem {
  role: "user" | "model";
  text: string;
}

export interface AskMidadParams {
  prompt: string;
  contextInfo: string;
  language: Language;
  history?: HistoryItem[];
  attachment?: AttachmentPayload | null;
  model?: TutorModelId;
  tutorRole?: TutorRoleId;
  useSearchGrounding?: boolean;
}

export interface AskMidadResult {
  text: string;
  sources: GroundingSource[];
  model: TutorModelId;
}

export async function fileToAttachmentPayload(file: File): Promise<AttachmentPayload> {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  const base64Data = btoa(binary);

  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  let mimeType = file.type;
  if (!mimeType) {
    if (ext === "pdf") mimeType = "application/pdf";
    else if (ext === "png") mimeType = "image/png";
    else if (ext === "jpg" || ext === "jpeg") mimeType = "image/jpeg";
    else if (ext === "webp") mimeType = "image/webp";
    else if (ext === "docx") {
      mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    } else if (ext === "pptx") {
      mimeType = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    } else {
      mimeType = "text/plain";
    }
  }

  return {
    name: file.name,
    mimeType,
    base64Data,
    sizeBytes: file.size,
  };
}

export async function askMidadTutor(params: AskMidadParams): Promise<AskMidadResult> {
  const response = await fetch("/api/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: params.prompt,
      contextInfo: params.contextInfo,
      language: params.language,
      history: params.history || [],
      model: params.model || "gemini-4-hydrogen",
      tutorRole: params.tutorRole || "academic",
      useSearchGrounding: Boolean(params.useSearchGrounding),
      attachment: params.attachment
        ? {
            name: params.attachment.name,
            mimeType: params.attachment.mimeType,
            base64Data: params.attachment.base64Data,
          }
        : null,
    }),
  });

  const data = (await response.json().catch(() => ({}))) as {
    text?: string;
    sources?: GroundingSource[];
    model?: TutorModelId;
    error?: string;
  };

  if (!response.ok) {
    throw new Error(
      data.error ||
        (params.language === "en"
          ? "Could not get a response from the server."
          : "تعذر الحصول على استجابة من الخادم.")
    );
  }

  if (!data.text) {
    throw new Error(
      params.language === "en"
        ? "No content was returned from the AI Tutor."
        : "لم يتم استلام محتوى من المعلم الذكي."
    );
  }

  return {
    text: data.text,
    sources: Array.isArray(data.sources) ? data.sources : [],
    model: data.model || params.model || "gemini-4-hydrogen",
  };
}

export async function askMidadAI(params: AskMidadParams): Promise<string> {
  const result = await askMidadTutor(params);
  return result.text;
}

export interface TranslationRequestItem {
  id: string;
  text: string;
}

export interface TranslationResultItem {
  id: string;
  translatedText: string;
}

export async function translateChatItems(
  targetLanguage: Language,
  items: TranslationRequestItem[]
): Promise<TranslationResultItem[]> {
  if (items.length === 0) return [];

  const response = await fetch("/api/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      targetLanguage,
      items,
    }),
  });

  const data = (await response.json().catch(() => ({}))) as {
    translations?: TranslationResultItem[];
    error?: string;
  };

  if (!response.ok) {
    throw new Error(
      data.error ||
        (targetLanguage === "en"
          ? "Could not translate conversation messages."
          : "تعذر ترجمة رسائل المحادثة.")
    );
  }

  return Array.isArray(data.translations) ? data.translations : [];
}
