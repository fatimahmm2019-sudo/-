import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Header, TabId } from "./components/Header";
import { CurriculumExplorer } from "./components/CurriculumExplorer";
import { AITutorChat, ChatMessage } from "./components/AITutorChat";
import { FileExplainerLab } from "./components/FileExplainerLab";
import { StudyPlanner } from "./components/StudyPlanner";
import {
  AcademicSelectionIds,
  resolveAcademicSelection,
} from "./data/saudiCurriculum";
import { Language, UI_COPY } from "./i18n/translations";
import { translateChatItems } from "./services/midadApi";

const SELECTION_STORAGE_KEY = "midad_academic_selection_v3";
const LANGUAGE_STORAGE_KEY = "midad_language_v1";
const THEME_STORAGE_KEY = "midad_theme_v1";

export type ThemeMode = "light" | "dark";

const DEFAULT_SELECTION: AcademicSelectionIds = {
  isUniversity: true,
  universityId: "kfu",
  collegeId: "kfu-edu",
  majorId: "kfu-sport",
  generalStageId: "hs-general",
  courseId: "kfu-sp-201",
};

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === "en" || saved === "ar") return saved;
    } catch {
      // ignore storage errors
    }
    return "ar";
  });

  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === "light" || saved === "dark") return saved;
      if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    } catch {
      // ignore
    }
    return "light";
  });

  const [activeTab, setActiveTab] = useState<TabId>("curriculum");

  const [selection, setSelection] = useState<AcademicSelectionIds>(() => {
    try {
      const saved = localStorage.getItem(SELECTION_STORAGE_KEY);
      if (saved) {
        return {
          ...DEFAULT_SELECTION,
          ...(JSON.parse(saved) as Partial<AcademicSelectionIds>),
        };
      }
    } catch {
      // ignore storage errors
    }
    return DEFAULT_SELECTION;
  });

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.title = UI_COPY.appTitle[language];
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // ignore
    }
  }, [language]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(SELECTION_STORAGE_KEY, JSON.stringify(selection));
    } catch {
      // ignore
    }
  }, [selection]);

  const resolved = useMemo(
    () => resolveAcademicSelection(selection, language),
    [selection, language]
  );

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => [
    {
      id: "welcome",
      role: "model",
      isWelcome: true,
      text: UI_COPY.tutor.welcomeIntro(resolved.course.title[language], language),
    },
  ]);

  const [isTranslatingChat, setIsTranslatingChat] = useState(false);
  const [translationError, setTranslationError] = useState<string | null>(null);
  const messagesRef = useRef<ChatMessage[]>(chatMessages);
  messagesRef.current = chatMessages;
  const translationRequestSeq = useRef(0);

  const translatePendingMessages = useCallback(async (targetLang: Language) => {
    const current = messagesRef.current;
    const pending = current.filter(
      (msg) => !msg.isWelcome && !msg.translations?.[targetLang]
    );

    if (pending.length === 0) {
      setIsTranslatingChat(false);
      setTranslationError(null);
      return;
    }

    const reqId = ++translationRequestSeq.current;
    setIsTranslatingChat(true);
    setTranslationError(null);

    try {
      const itemsToTranslate = pending.map((msg) => ({
        id: msg.id,
        text: msg.text,
      }));
      const results = await translateChatItems(targetLang, itemsToTranslate);
      if (translationRequestSeq.current !== reqId) return;

      const translatedMap = new Map(
        results.map((r) => [r.id, r.translatedText])
      );

      setChatMessages((prev) =>
        prev.map((msg) => {
          const translated = translatedMap.get(msg.id);
          if (!translated) return msg;
          return {
            ...msg,
            translations: {
              ...(msg.translations || {}),
              [targetLang]: translated,
            },
          };
        })
      );
    } catch (err: unknown) {
      if (translationRequestSeq.current !== reqId) return;
      setTranslationError(
        err instanceof Error
          ? err.message
          : targetLang === "en"
            ? "Could not translate conversation messages."
            : "تعذر ترجمة رسائل المحادثة."
      );
    } finally {
      if (translationRequestSeq.current === reqId) {
        setIsTranslatingChat(false);
      }
    }
  }, []);

  const handleToggleLanguage = () => {
    const nextLang: Language = language === "ar" ? "en" : "ar";
    setLanguage(nextLang);
    void translatePendingMessages(nextLang);
  };

  const handleUpdateSelection = (updates: Partial<AcademicSelectionIds>) => {
    setSelection((prev) => ({ ...prev, ...updates }));
  };

  const handleStartStudying = (updates?: Partial<AcademicSelectionIds>) => {
    const nextSelection = updates
      ? { ...selection, ...updates }
      : selection;
    const nextResolved = resolveAcademicSelection(nextSelection, language);
    setChatMessages((prev) => {
      if (prev.length === 1 && prev[0].isWelcome) {
        return [
          {
            id: "welcome",
            role: "model",
            isWelcome: true,
            text: UI_COPY.tutor.welcomeActivated(
              nextResolved.course.title[language],
              language
            ),
          },
        ];
      }
      return prev;
    });
    setActiveTab("tutor");
  };

  const handleContinueInTutor = (fileName: string, analysisText: string) => {
    const arUserMsg = UI_COPY.tutor.continuedFromFile(fileName, "ar");
    const enUserMsg = UI_COPY.tutor.continuedFromFile(fileName, "en");
    const userMsgText = language === "en" ? enUserMsg : arUserMsg;

    setChatMessages((prev) => [
      ...prev,
      {
        id: `u-file-${Date.now()}`,
        role: "user",
        text: userMsgText,
        translations: { ar: arUserMsg, en: enUserMsg },
      },
      {
        id: `a-file-${Date.now() + 1}`,
        role: "model",
        text: analysisText,
        translations: { [language]: analysisText },
      },
    ]);
    setActiveTab("tutor");
  };

  return (
    <div className="min-h-screen bg-saudi-canvas text-saudi-ink saudi-nature-backdrop flex flex-col transition-colors">
      <Header
        language={language}
        onToggleLanguage={handleToggleLanguage}
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onStartStudying={() => handleStartStudying()}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === "curriculum" && (
          <CurriculumExplorer
            language={language}
            selection={selection}
            onUpdate={handleUpdateSelection}
            onStartStudying={handleStartStudying}
          />
        )}

        {activeTab === "tutor" && (
          <AITutorChat
            language={language}
            contextLabel={resolved.contextLabel}
            selectedCourseTitle={resolved.course.title[language]}
            messages={chatMessages}
            onMessagesChange={setChatMessages}
            isTranslating={isTranslatingChat}
            translationError={translationError}
            onRetryTranslation={() => void translatePendingMessages(language)}
            onChangeCourse={() => setActiveTab("curriculum")}
          />
        )}

        {activeTab === "files" && (
          <FileExplainerLab
            language={language}
            contextLabel={resolved.contextLabel}
            onContinueInTutor={handleContinueInTutor}
          />
        )}

        {activeTab === "planner" && (
          <StudyPlanner
            language={language}
            selectedCourseTitle={resolved.course.title[language]}
          />
        )}
      </main>

      <footer className="border-t border-saudi-border bg-saudi-surface/80 transition-colors mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-saudi-muted">
          <div className="space-y-1">
            <p className="font-bold text-saudi-palm-text text-sm">
              {UI_COPY.brand[language]}
            </p>
            <p>{UI_COPY.footer.tagline[language]}</p>
          </div>

          <nav
            aria-label={UI_COPY.footer.linksHeading[language]}
            className="flex flex-wrap items-center gap-4 font-medium"
          >
            {(
              [
                { id: "curriculum", label: UI_COPY.nav.curriculum[language] },
                { id: "tutor", label: UI_COPY.nav.tutor[language] },
                { id: "files", label: UI_COPY.nav.files[language] },
                { id: "planner", label: UI_COPY.nav.planner[language] },
              ] as const
            ).map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  setActiveTab(link.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`hover:text-saudi-palm-text transition-colors cursor-pointer ${
                  activeTab === link.id ? "text-saudi-palm-text font-semibold" : ""
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
