import React from "react";
import {
  BookOpen,
  MessageSquareText,
  FileUp,
  Timer,
  Languages,
  Sun,
  Moon,
  Sprout,
} from "lucide-react";
import { Language, UI_COPY } from "../i18n/translations";
import type { ThemeMode } from "../App";

export type TabId = "curriculum" | "tutor" | "files" | "planner";

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  onStartStudying: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  theme,
  onToggleTheme,
  activeTab,
  onSelectTab,
  onStartStudying,
}) => {
  const navItems: Array<{
    id: TabId;
    label: string;
    mobileLabel: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    {
      id: "curriculum",
      label: UI_COPY.nav.curriculum[language],
      mobileLabel: UI_COPY.nav.curriculumMobile[language],
      icon: BookOpen,
    },
    {
      id: "tutor",
      label: UI_COPY.nav.tutor[language],
      mobileLabel: UI_COPY.nav.tutorMobile[language],
      icon: MessageSquareText,
    },
    {
      id: "files",
      label: UI_COPY.nav.files[language],
      mobileLabel: UI_COPY.nav.filesMobile[language],
      icon: FileUp,
    },
    {
      id: "planner",
      label: UI_COPY.nav.planner[language],
      mobileLabel: UI_COPY.nav.plannerMobile[language],
      icon: Timer,
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-saudi-surface/95 backdrop-blur-md border-b border-saudi-border transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-6">
          <button
            type="button"
            onClick={() => onSelectTab("curriculum")}
            className="inline-flex items-center gap-2 text-xl font-extrabold tracking-tight text-saudi-palm-text whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saudi-palm rounded-md px-1"
          >
            <Sprout className="w-5 h-5 text-saudi-palm shrink-0" />
            <span>{UI_COPY.brand[language]}</span>
          </button>

          <nav
            aria-label={UI_COPY.nav.primaryNavAria[language]}
            className="hidden md:flex items-center gap-7 text-sm font-medium"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  className={`py-1.5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saudi-palm ${
                    isActive
                      ? "border-saudi-palm text-saudi-palm-text font-semibold"
                      : "border-transparent text-saudi-muted hover:text-saudi-ink hover:border-saudi-border-strong"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={
                theme === "dark"
                  ? UI_COPY.nav.themeToLightAria[language]
                  : UI_COPY.nav.themeToDarkAria[language]
              }
              title={
                theme === "dark"
                  ? UI_COPY.nav.themeToLightAria[language]
                  : UI_COPY.nav.themeToDarkAria[language]
              }
              className="min-h-[40px] min-w-[40px] px-2.5 py-2 text-xs sm:text-sm font-semibold text-saudi-ink-secondary bg-saudi-subtle hover:bg-saudi-hover border border-saudi-border rounded-lg transition-colors inline-flex items-center justify-center shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saudi-palm"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-saudi-sand-text" />
              ) : (
                <Moon className="w-4 h-4 text-saudi-sand-text" />
              )}
            </button>

            <button
              type="button"
              onClick={onToggleLanguage}
              aria-label={UI_COPY.nav.toggleLanguageAria[language]}
              title={UI_COPY.nav.toggleLanguageAria[language]}
              className="px-3 py-2 min-h-[40px] text-xs sm:text-sm font-semibold text-saudi-ink-secondary bg-saudi-subtle hover:bg-saudi-hover border border-saudi-border rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saudi-palm"
            >
              <Languages className="w-4 h-4 text-saudi-palm" />
              <span>{UI_COPY.nav.toggleLanguageLabel[language]}</span>
            </button>

            <button
              type="button"
              onClick={onStartStudying}
              className="px-4 py-2 min-h-[40px] text-xs sm:text-sm font-semibold text-white bg-saudi-palm hover:bg-saudi-palm-hover rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-saudi-palm"
            >
              {UI_COPY.nav.startStudying[language]}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Top Website Navigation Strip */}
      <nav
        aria-label={UI_COPY.nav.bottomNavAria[language]}
        className="md:hidden border-t border-saudi-border bg-saudi-surface/95"
      >
        <div className="max-w-6xl mx-auto px-4 py-1.5 flex items-center justify-between gap-2 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`min-h-[40px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saudi-palm ${
                  isActive
                    ? "bg-saudi-palm-soft text-saudi-palm-text font-semibold"
                    : "text-saudi-muted hover:text-saudi-ink"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.mobileLabel}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
