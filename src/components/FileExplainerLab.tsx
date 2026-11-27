import React, { useRef, useState } from "react";
import {
  CloudUpload,
  BookOpen,
  Table2,
  HelpCircle,
  Copy,
  Check,
  X,
  AlertCircle,
  Send,
  MessageSquarePlus,
} from "lucide-react";
import {
  askMidadAI,
  AttachmentPayload,
  fileToAttachmentPayload,
} from "../services/midadApi";
import { Language, UI_COPY } from "../i18n/translations";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface FileExplainerLabProps {
  language: Language;
  contextLabel: string;
  onContinueInTutor: (fileName: string, analysisText: string) => void;
}

function formatBytes(bytes: number, lang: Language): string {
  if (bytes < 1024) return `${bytes} ${UI_COPY.files.bytes[lang]}`;
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} ${UI_COPY.files.kb[lang]}`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(2)} ${UI_COPY.files.mb[lang]}`;
}

export const FileExplainerLab: React.FC<FileExplainerLabProps> = ({
  language,
  contextLabel,
  onContinueInTutor,
}) => {
  const [filePayload, setFilePayload] = useState<AttachmentPayload | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [result, setResult] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectedFile = async (file: File) => {
    setErrorMsg(null);
    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg(UI_COPY.files.fileTooLarge[language]);
      return;
    }
    try {
      const payload = await fileToAttachmentPayload(file);
      setFilePayload(payload);
      setResult("");
    } catch {
      setErrorMsg(UI_COPY.files.fileReadError[language]);
    }
  };

  const runAnalysis = async (instruction: string) => {
    if (!filePayload || isAnalyzing) return;
    setErrorMsg(null);
    setIsAnalyzing(true);
    try {
      const promptPrefix =
        language === "en"
          ? `Request for attached file (${filePayload.name}):`
          : `المطلوب للملف المرفق (${filePayload.name}):`;
      const reply = await askMidadAI({
        prompt: `${promptPrefix} ${instruction}`,
        contextInfo: contextLabel,
        language,
        attachment: filePayload,
      });
      setResult(reply);
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : UI_COPY.files.analyzeError[language]
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-saudi-surface rounded-2xl border border-saudi-border p-6 space-y-5 transition-colors">
        <div>
          <h1 className="text-xl font-bold text-saudi-ink">
            {UI_COPY.files.heading[language]}
          </h1>
          <p className="text-sm text-saudi-muted mt-1">
            {UI_COPY.files.subtitle[language]}
          </p>
        </div>

        {/* Upload Dropzone */}
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.pptx,.txt,.png,.jpg,.jpeg,.webp"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleSelectedFile(file);
            e.target.value = "";
          }}
          className="hidden"
        />

        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) handleSelectedFile(file);
          }}
          className={`rounded-2xl border-2 border-dashed p-8 text-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saudi-palm ${
            isDragging
              ? "border-saudi-palm bg-saudi-palm-soft"
              : "border-saudi-border-strong bg-saudi-canvas/70 hover:border-saudi-palm hover:bg-saudi-palm-soft/50"
          }`}
        >
          <CloudUpload className="w-11 h-11 text-saudi-palm mx-auto mb-3" />
          <p className="text-base font-bold text-saudi-ink">
            {filePayload
              ? `${UI_COPY.files.dropzoneSelectedPrefix[language]} ${filePayload.name}`
              : UI_COPY.files.dropzoneEmpty[language]}
          </p>
          <p className="text-xs text-saudi-muted mt-1.5">
            {UI_COPY.files.supportedFormats[language]}
          </p>
        </div>

        {filePayload && (
          <div className="space-y-4 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-xl bg-saudi-canvas border border-saudi-border">
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-saudi-ink-secondary min-w-0">
                <span className="font-semibold text-saudi-ink truncate max-w-xs">
                  {filePayload.name}
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums text-saudi-muted">
                  {formatBytes(filePayload.sizeBytes, language)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFilePayload(null);
                  setResult("");
                  setErrorMsg(null);
                }}
                className="text-xs font-medium text-saudi-muted hover:text-red-600 dark:hover:text-red-400 inline-flex items-center gap-1 px-2 py-1 rounded cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>{UI_COPY.files.removeFile[language]}</span>
              </button>
            </div>

            {/* Preset Analysis Modes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                disabled={isAnalyzing}
                onClick={() => runAnalysis(UI_COPY.files.modeExplainPrompt[language])}
                className="min-h-[44px] px-4 py-2.5 bg-saudi-palm hover:bg-saudi-palm-hover disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>{UI_COPY.files.modeExplain[language]}</span>
              </button>

              <button
                type="button"
                disabled={isAnalyzing}
                onClick={() => runAnalysis(UI_COPY.files.modeSummaryPrompt[language])}
                className="min-h-[44px] px-4 py-2.5 bg-saudi-surface hover:bg-saudi-subtle border border-saudi-border disabled:opacity-50 text-saudi-ink text-sm font-semibold rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Table2 className="w-4 h-4 text-saudi-palm" />
                <span>{UI_COPY.files.modeSummary[language]}</span>
              </button>

              <button
                type="button"
                disabled={isAnalyzing}
                onClick={() => runAnalysis(UI_COPY.files.modeQuizPrompt[language])}
                className="min-h-[44px] px-4 py-2.5 bg-saudi-surface hover:bg-saudi-subtle border border-saudi-border disabled:opacity-50 text-saudi-ink text-sm font-semibold rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-saudi-sand-accent" />
                <span>{UI_COPY.files.modeQuiz[language]}</span>
              </button>
            </div>

            {/* Custom Question on File */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (customPrompt.trim()) {
                  runAnalysis(customPrompt.trim());
                }
              }}
              className="flex items-center gap-2.5"
            >
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder={UI_COPY.files.customPlaceholder[language]}
                className="flex-1 min-h-[44px] px-4 py-2 bg-saudi-canvas border border-saudi-border rounded-xl text-sm text-saudi-ink placeholder:text-saudi-muted focus:bg-saudi-surface focus:outline-none focus:ring-2 focus:ring-saudi-palm"
              />
              <button
                type="submit"
                disabled={isAnalyzing || !customPrompt.trim()}
                className="min-h-[44px] px-4 bg-saudi-volcanic hover:bg-saudi-volcanic-hover disabled:bg-saudi-subtle disabled:text-saudi-muted text-white text-sm font-semibold rounded-xl transition-colors inline-flex items-center gap-1.5 shrink-0 cursor-pointer disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span>{UI_COPY.files.analyzeBtn[language]}</span>
              </button>
            </form>
          </div>
        )}
      </div>

      {errorMsg && (
        <div
          role="alert"
          className="rounded-xl border border-red-300 dark:border-red-800/70 bg-red-50 dark:bg-red-950/40 px-4 py-3 flex items-start gap-2.5 text-sm text-red-800 dark:text-red-200"
        >
          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {isAnalyzing && (
        <div className="bg-saudi-surface rounded-2xl border border-saudi-border p-8 flex flex-col items-center justify-center gap-3 text-saudi-ink-secondary">
          <span className="w-7 h-7 border-2 border-saudi-palm border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium">{UI_COPY.files.analyzing[language]}</p>
        </div>
      )}

      {result && !isAnalyzing && (
        <article className="bg-saudi-surface rounded-2xl border border-saudi-border p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-saudi-border">
            <h2 className="text-base font-bold text-saudi-ink">
              {UI_COPY.files.resultHeading[language]}
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1.5 min-h-[36px] text-xs font-medium text-saudi-ink-secondary bg-saudi-canvas hover:bg-saudi-subtle border border-saudi-border rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-saudi-palm" />
                    <span className="text-saudi-palm-text">
                      {UI_COPY.files.copied[language]}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{UI_COPY.files.copyText[language]}</span>
                  </>
                )}
              </button>

              {filePayload && (
                <button
                  type="button"
                  onClick={() => onContinueInTutor(filePayload.name, result)}
                  className="px-3 py-1.5 min-h-[36px] text-xs font-semibold text-saudi-palm-text bg-saudi-palm-soft hover:bg-saudi-palm-border/40 border border-saudi-palm-border rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5" />
                  <span>{UI_COPY.files.discussInTutor[language]}</span>
                </button>
              )}
            </div>
          </div>

          <MarkdownRenderer content={result} />
        </article>
      )}
    </div>
  );
};
