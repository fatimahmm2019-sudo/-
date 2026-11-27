import React, { useEffect, useRef, useState } from "react";
import {
  Paperclip,
  Send,
  X,
  Copy,
  Check,
  RotateCcw,
  Lightbulb,
  FileText,
  HelpCircle,
  CalendarCheck,
  AlertCircle,
  Languages,
  Globe,
  Mic,
  ExternalLink,
  Sparkles,
  UserCheck,
} from "lucide-react";
import {
  askMidadTutor,
  AttachmentPayload,
  fileToAttachmentPayload,
  GroundingSource,
  HistoryItem,
  TutorModelId,
  TutorRoleId,
} from "../services/midadApi";
import { Language, UI_COPY } from "../i18n/translations";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { LiveVoiceTutor } from "./LiveVoiceTutor";

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  translations?: Partial<Record<Language, string>>;
  attachmentName?: string;
  sources?: GroundingSource[];
  modelUsed?: TutorModelId;
  isWelcome?: boolean;
}

interface AITutorChatProps {
  language: Language;
  contextLabel: string;
  selectedCourseTitle: string;
  messages: ChatMessage[];
  onMessagesChange: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  isTranslating: boolean;
  translationError: string | null;
  onRetryTranslation: () => void;
  onChangeCourse: () => void;
}

const PROMPT_ICONS = {
  concepts: Lightbulb,
  summary: FileText,
  quiz: HelpCircle,
  plan: CalendarCheck,
} as const;

export const AITutorChat: React.FC<AITutorChatProps> = ({
  language,
  contextLabel,
  selectedCourseTitle,
  messages,
  onMessagesChange,
  isTranslating,
  translationError,
  onRetryTranslation,
  onChangeCourse,
}) => {
  const [input, setInput] = useState("");
  const [attachment, setAttachment] = useState<AttachmentPayload | null>(null);
  const [selectedModel, setSelectedModel] = useState<TutorModelId>("gemini-4-hydrogen");
  const [tutorRole, setTutorRole] = useState<TutorRoleId>("academic");
  const [useSearchGrounding, setUseSearchGrounding] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isTranslating]);

  const handleToggleSearch = () => {
    setUseSearchGrounding((prev) => {
      const next = !prev;
      if (next) {
        setSelectedModel("gemini-4-hydrogen");
      }
      return next;
    });
  };

  const handleFilePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMsg(null);
    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg(UI_COPY.tutor.fileTooLarge[language]);
      return;
    }
    try {
      const payload = await fileToAttachmentPayload(file);
      setAttachment(payload);
    } catch {
      setErrorMsg(UI_COPY.tutor.fileReadError[language]);
    }
    e.target.value = "";
  };

  const getDisplayText = (msg: ChatMessage): string => {
    if (msg.isWelcome) {
      return UI_COPY.tutor.welcomeIntro(selectedCourseTitle, language);
    }
    return msg.translations?.[language] || msg.text;
  };

  const handleSend = async (
    overridePrompt?: string,
    pairedTranslations?: Partial<Record<Language, string>>
  ) => {
    const promptText = (overridePrompt ?? input).trim();
    if (!promptText && !attachment) return;
    if (isLoading) return;

    setErrorMsg(null);
    const currentAttachment = attachment;
    const messageBody = promptText || UI_COPY.tutor.defaultFilePrompt[language];

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text: messageBody,
      translations: pairedTranslations || { [language]: messageBody },
      attachmentName: currentAttachment?.name,
    };

    const historyForApi: HistoryItem[] = messages
      .filter((m) => !m.isWelcome)
      .map((m) => ({ role: m.role, text: getDisplayText(m) }));

    onMessagesChange((prev) => [...prev, userMsg]);
    if (!overridePrompt) setInput("");
    setAttachment(null);
    setIsLoading(true);

    try {
      const result = await askMidadTutor({
        prompt: userMsg.text,
        contextInfo: contextLabel,
        language,
        history: historyForApi,
        attachment: currentAttachment,
        model: selectedModel,
        tutorRole,
        useSearchGrounding,
      });

      const aiMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "model",
        text: result.text,
        translations: { [language]: result.text },
        sources: result.sources,
        modelUsed: result.model,
      };
      onMessagesChange((prev) => [...prev, aiMsg]);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : UI_COPY.tutor.unexpectedError[language];
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Clipboard API unavailable
    }
  };

  const handleResetChat = () => {
    setErrorMsg(null);
    setAttachment(null);
    onMessagesChange([
      {
        id: "welcome",
        role: "model",
        isWelcome: true,
        text: UI_COPY.tutor.welcomeIntro(selectedCourseTitle, language),
      },
    ]);
  };

  return (
    <div className="bg-saudi-surface rounded-2xl border border-saudi-border flex flex-col h-[calc(100vh-11.5rem)] md:h-[calc(100vh-8.5rem)] min-h-[540px] overflow-hidden transition-colors">
      {/* Context Bar */}
      <div className="px-4 sm:px-6 py-3.5 border-b border-saudi-border bg-saudi-subtle/60 flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-saudi-palm-text">
            {UI_COPY.tutor.activeTrackLabel[language]}
          </p>
          <p className="text-sm font-medium text-saudi-ink truncate">
            {contextLabel}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsVoiceOpen((prev) => !prev)}
            className={`px-3 py-1.5 min-h-[38px] text-xs font-semibold rounded-lg border transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              isVoiceOpen
                ? "bg-saudi-palm text-white border-saudi-palm"
                : "bg-saudi-palm-soft text-saudi-palm-text border-saudi-palm-border hover:bg-saudi-palm hover:text-white"
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>{UI_COPY.tutor.voiceChatBtn[language]}</span>
          </button>

          <button
            type="button"
            onClick={onChangeCourse}
            className="px-3 py-1.5 min-h-[38px] text-xs font-medium text-saudi-ink-secondary bg-saudi-surface border border-saudi-border hover:bg-saudi-subtle rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            {UI_COPY.tutor.changeCourse[language]}
          </button>
          <button
            type="button"
            onClick={handleResetChat}
            className="px-3 py-1.5 min-h-[38px] text-xs font-medium text-saudi-ink-secondary bg-saudi-surface border border-saudi-border hover:bg-saudi-subtle rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{UI_COPY.tutor.newChat[language]}</span>
          </button>
        </div>
      </div>

      {/* Model, Tutor Role & Google Search Controls */}
      <div className="px-4 sm:px-6 py-2.5 border-b border-saudi-border bg-saudi-canvas/40 flex flex-wrap items-center gap-3 text-xs">
        <label className="flex items-center gap-1.5 min-w-0">
          <Sparkles className="w-3.5 h-3.5 text-saudi-palm shrink-0" />
          <span className="font-semibold text-saudi-ink-secondary whitespace-nowrap">
            {UI_COPY.tutor.modelLabel[language]}
          </span>
          <select
            value={useSearchGrounding ? "gemini-4-hydrogen" : selectedModel}
            disabled={useSearchGrounding}
            onChange={(e) => setSelectedModel(e.target.value as TutorModelId)}
            aria-label={UI_COPY.tutor.modelLabel[language]}
            className="min-h-[36px] px-2.5 py-1 rounded-lg border border-saudi-border bg-saudi-surface text-saudi-ink font-medium focus:outline-none focus:ring-2 focus:ring-saudi-palm disabled:opacity-75 cursor-pointer"
          >
            <option value="gemini-4-hydrogen">
              {UI_COPY.tutor.modelHydrogen[language]}
            </option>
            <option value="gemini-3.1-flash-lite">
              {UI_COPY.tutor.modelLite[language]}
            </option>
          </select>
        </label>

        <label className="flex items-center gap-1.5 min-w-0">
          <UserCheck className="w-3.5 h-3.5 text-saudi-sand-accent shrink-0" />
          <span className="font-semibold text-saudi-ink-secondary whitespace-nowrap">
            {UI_COPY.tutor.roleLabel[language]}
          </span>
          <select
            value={tutorRole}
            onChange={(e) => setTutorRole(e.target.value as TutorRoleId)}
            aria-label={UI_COPY.tutor.roleLabel[language]}
            className="min-h-[36px] px-2.5 py-1 rounded-lg border border-saudi-border bg-saudi-surface text-saudi-ink font-medium focus:outline-none focus:ring-2 focus:ring-saudi-palm cursor-pointer"
          >
            <option value="academic">{UI_COPY.tutor.roleAcademic[language]}</option>
            <option value="socratic">{UI_COPY.tutor.roleSocratic[language]}</option>
            <option value="exam">{UI_COPY.tutor.roleExam[language]}</option>
            <option value="concise">{UI_COPY.tutor.roleConcise[language]}</option>
          </select>
        </label>

        <button
          type="button"
          onClick={handleToggleSearch}
          aria-pressed={useSearchGrounding}
          className={`min-h-[36px] px-3 py-1 rounded-lg border font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
            useSearchGrounding
              ? "bg-saudi-palm text-white border-saudi-palm"
              : "bg-saudi-surface text-saudi-ink-secondary border-saudi-border hover:border-saudi-palm hover:text-saudi-palm-text"
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{UI_COPY.tutor.webSearchToggle[language]}</span>
        </button>

        {useSearchGrounding && (
          <span className="text-[11px] text-saudi-palm-text font-medium">
            {UI_COPY.tutor.webSearchActiveHint[language]}
          </span>
        )}
      </div>

      {/* Live Voice Tutor Drawer */}
      {isVoiceOpen && (
        <LiveVoiceTutor
          language={language}
          selectedCourseTitle={selectedCourseTitle}
          tutorRole={tutorRole}
          onClose={() => setIsVoiceOpen(false)}
        />
      )}

      {/* Quick Prompts */}
      <div className="px-4 sm:px-6 py-2.5 border-b border-saudi-border flex items-center gap-2 overflow-x-auto">
        {UI_COPY.tutor.quickPrompts.map((item) => {
          const Icon = PROMPT_ICONS[item.id];
          return (
            <button
              key={item.id}
              type="button"
              disabled={isLoading}
              onClick={() =>
                handleSend(item[language], { ar: item.ar, en: item.en })
              }
              className="px-3 py-1.5 min-h-[36px] rounded-lg border border-saudi-border bg-saudi-surface hover:border-saudi-palm hover:text-saudi-palm-text text-xs font-medium text-saudi-ink-secondary transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 disabled:opacity-50 cursor-pointer"
            >
              <Icon className="w-3.5 h-3.5 text-saudi-palm" />
              <span>{item[language]}</span>
            </button>
          );
        })}
      </div>

      {/* Translating Notice */}
      {isTranslating && (
        <div className="px-4 sm:px-6 py-2 bg-saudi-sand-soft border-b border-saudi-sand-border flex items-center gap-2 text-xs font-medium text-saudi-sand-text">
          <Languages className="w-4 h-4 text-saudi-sand-accent shrink-0 animate-pulse" />
          <span>{UI_COPY.tutor.translatingNotice[language]}</span>
        </div>
      )}

      {/* Translation Error */}
      {translationError && !isTranslating && (
        <div
          role="alert"
          className="px-4 sm:px-6 py-2 bg-saudi-sand-soft border-b border-saudi-sand-border flex items-center justify-between gap-3 text-xs text-saudi-sand-text"
        >
          <span>{translationError}</span>
          <button
            type="button"
            onClick={onRetryTranslation}
            className="font-semibold underline hover:no-underline shrink-0 cursor-pointer"
          >
            {language === "en" ? "Retry" : "إعادة المحاولة"}
          </button>
        </div>
      )}

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-4 bg-saudi-canvas/60">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          const displayText = getDisplayText(msg);
          return (
            <div
              key={msg.id}
              className={`flex ${isUser ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[88%] sm:max-w-[78%] rounded-2xl px-4 py-3.5 ${
                  isUser
                    ? "bg-saudi-palm text-white"
                    : "bg-saudi-surface border border-saudi-border text-saudi-ink"
                }`}
              >
                {msg.attachmentName && (
                  <div
                    className={`mb-2 pb-2 border-b text-xs flex items-center gap-1.5 ${
                      isUser
                        ? "border-white/30 text-white/90"
                        : "border-saudi-border text-saudi-muted"
                    }`}
                  >
                    <Paperclip className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{msg.attachmentName}</span>
                  </div>
                )}

                <MarkdownRenderer content={displayText} inverted={isUser} />

                {!isUser && msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-saudi-border space-y-1.5">
                    <p className="text-[11px] font-bold text-saudi-palm-text flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 shrink-0" />
                      <span>{UI_COPY.tutor.sourcesHeading[language]}</span>
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.sources.map((src) => (
                        <a
                          key={src.uri}
                          href={src.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-saudi-border bg-saudi-canvas hover:border-saudi-palm text-[11px] font-medium text-saudi-ink-secondary hover:text-saudi-palm-text transition-colors max-w-full"
                        >
                          <span className="truncate max-w-[220px]">{src.title}</span>
                          <ExternalLink className="w-3 h-3 shrink-0 opacity-75" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {!isUser && !msg.isWelcome && (
                  <div className="mt-2.5 pt-2 border-t border-saudi-border flex items-center justify-between gap-2">
                    <span className="text-[11px] text-saudi-muted">
                      {msg.modelUsed || ""}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(msg.id, displayText)}
                      className="text-xs text-saudi-muted hover:text-saudi-ink inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-saudi-subtle cursor-pointer"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-saudi-palm" />
                          <span className="text-saudi-palm-text">
                            {UI_COPY.tutor.copied[language]}
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{UI_COPY.tutor.copy[language]}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-end">
            <div className="bg-saudi-surface border border-saudi-border rounded-2xl px-4 py-3 flex items-center gap-2.5 text-sm text-saudi-ink-secondary">
              <span className="w-4 h-4 border-2 border-saudi-palm border-t-transparent rounded-full animate-spin" />
              <span>{UI_COPY.tutor.loadingReply[language]}</span>
            </div>
          </div>
        )}

        {errorMsg && (
          <div
            role="alert"
            className="rounded-xl border border-red-300 dark:border-red-800/70 bg-red-50 dark:bg-red-950/40 px-4 py-3 flex items-start gap-2.5 text-sm text-red-800 dark:text-red-200"
          >
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Attachment Preview */}
      {attachment && (
        <div className="px-4 sm:px-6 py-2 bg-saudi-sand-soft border-t border-saudi-sand-border flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-medium text-saudi-sand-text min-w-0">
            <Paperclip className="w-4 h-4 text-saudi-sand-accent shrink-0" />
            <span className="truncate">{attachment.name}</span>
          </div>
          <button
            type="button"
            onClick={() => setAttachment(null)}
            aria-label={UI_COPY.tutor.removeAttachment[language]}
            className="p-1 text-saudi-sand-text hover:bg-saudi-sand-border/30 rounded-md cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Input Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 sm:p-4 bg-saudi-surface border-t border-saudi-border flex items-center gap-2.5"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.webp,.docx,.pptx,.txt"
          onChange={handleFilePick}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          title={UI_COPY.tutor.attachTitle[language]}
          aria-label={UI_COPY.tutor.attachTitle[language]}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-saudi-border text-saudi-sand-text hover:bg-saudi-subtle transition-colors shrink-0 cursor-pointer"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`${UI_COPY.tutor.inputPlaceholderPrefix[language]} ${selectedCourseTitle}...`}
          className="flex-1 min-h-[44px] px-4 py-2 bg-saudi-canvas border border-saudi-border rounded-xl text-sm text-saudi-ink placeholder:text-saudi-muted focus:bg-saudi-surface focus:outline-none focus:ring-2 focus:ring-saudi-palm"
        />

        <button
          type="submit"
          disabled={isLoading || (!input.trim() && !attachment)}
          aria-label={UI_COPY.tutor.send[language]}
          className="min-h-[44px] px-4 sm:px-5 bg-saudi-palm hover:bg-saudi-palm-hover disabled:bg-saudi-subtle disabled:text-saudi-muted text-white font-semibold text-sm rounded-xl transition-colors inline-flex items-center gap-2 shrink-0 cursor-pointer disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">{UI_COPY.tutor.send[language]}</span>
        </button>
      </form>
    </div>
  );
};
