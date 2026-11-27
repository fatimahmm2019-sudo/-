import React, { useEffect, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Trees,
  AlertTriangle,
  Sparkles,
  Award,
} from "lucide-react";
import { Language, UI_COPY } from "../i18n/translations";
import {
  getSaudiPlantById,
  SAUDI_PLANTS,
  SaudiPlantId,
} from "../data/saudiFlora";
import { getGrowthStage, SaudiPlantArt } from "./SaudiPlantArt";

interface StudyTask {
  id: string;
  title: string;
  done: boolean;
  defaultKey?: "t1" | "t2";
}

interface PlantedTreeRecord {
  id: string;
  plantId: SaudiPlantId;
  status: "thriving" | "wilted";
  minutes: number;
  courseTitle: string;
  createdAt: string;
}

interface StudyPlannerProps {
  language: Language;
  selectedCourseTitle: string;
}

type TimerMode = "focus" | "shortBreak" | "longBreak";

const FOCUS_PRESET_MINUTES = [15, 25, 45, 60] as const;

const TASKS_STORAGE_KEY = "midad_study_tasks_v1";
const SESSIONS_STORAGE_KEY = "midad_pomodoro_sessions_v1";
const FOREST_STORAGE_KEY = "midad_saudi_forest_v1";
const PLANT_CHOICE_STORAGE_KEY = "midad_saudi_plant_choice_v1";

const DEFAULT_TASKS: StudyTask[] = [
  {
    id: "t-1",
    title: UI_COPY.planner.defaultTasks.t1.ar,
    defaultKey: "t1",
    done: false,
  },
  {
    id: "t-2",
    title: UI_COPY.planner.defaultTasks.t2.ar,
    defaultKey: "t2",
    done: false,
  },
];

export const StudyPlanner: React.FC<StudyPlannerProps> = ({
  language,
  selectedCourseTitle,
}) => {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [focusMinutes, setFocusMinutes] = useState<number>(25);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const [selectedPlantId, setSelectedPlantId] = useState<SaudiPlantId>(() => {
    try {
      const saved = localStorage.getItem(PLANT_CHOICE_STORAGE_KEY);
      if (saved && SAUDI_PLANTS.some((p) => p.id === saved)) {
        return saved as SaudiPlantId;
      }
    } catch {
      // ignore
    }
    return "palm";
  });

  const [sessionOutcome, setSessionOutcome] = useState<
    "planted" | "wilted" | null
  >(null);

  const [completedSessions, setCompletedSessions] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(SESSIONS_STORAGE_KEY);
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  const [forest, setForest] = useState<PlantedTreeRecord[]>(() => {
    try {
      const saved = localStorage.getItem(FOREST_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as PlantedTreeRecord[];
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [tasks, setTasks] = useState<StudyTask[]>(() => {
    try {
      const saved = localStorage.getItem(TASKS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as StudyTask[];
        if (Array.isArray(parsed)) {
          return parsed.map((t) => {
            if (t.id === "t-1" && !t.defaultKey) return { ...t, defaultKey: "t1" };
            if (t.id === "t-2" && !t.defaultKey) return { ...t, defaultKey: "t2" };
            return t;
          });
        }
      }
    } catch {
      // ignore storage errors
    }
    return DEFAULT_TASKS;
  });

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [taskFilter, setTaskFilter] = useState<"all" | "pending" | "done">("all");
  const [sanctuaryTab, setSanctuaryTab] = useState<"species" | "history">("species");

  useEffect(() => {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // ignore
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem(SESSIONS_STORAGE_KEY, String(completedSessions));
    } catch {
      // ignore
    }
  }, [completedSessions]);

  useEffect(() => {
    try {
      localStorage.setItem(FOREST_STORAGE_KEY, JSON.stringify(forest));
    } catch {
      // ignore
    }
  }, [forest]);

  useEffect(() => {
    try {
      localStorage.setItem(PLANT_CHOICE_STORAGE_KEY, selectedPlantId);
    } catch {
      // ignore
    }
  }, [selectedPlantId]);

  const getModeDuration = (targetMode: TimerMode, mins: number = focusMinutes) => {
    if (targetMode === "focus") return mins * 60;
    if (targetMode === "shortBreak") return 5 * 60;
    return 15 * 60;
  };

  useEffect(() => {
    if (!isRunning) return;
    const interval = window.setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          setIsRunning(false);
          if (mode === "focus") {
            setCompletedSessions((c) => c + 1);
            setSessionOutcome("planted");
            setForest((prevForest) => [
              {
                id: `tree-${Date.now()}`,
                plantId: selectedPlantId,
                status: "thriving",
                minutes: focusMinutes,
                courseTitle: selectedCourseTitle,
                createdAt: new Date().toISOString(),
              },
              ...prevForest,
            ]);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning, mode, selectedPlantId, focusMinutes, selectedCourseTitle]);

  const totalSeconds = getModeDuration(mode);
  const isFocusInProgress =
    mode === "focus" && secondsRemaining < totalSeconds && secondsRemaining > 0;

  const switchMode = (nextMode: TimerMode) => {
    if (isFocusInProgress) return;
    setIsRunning(false);
    setSessionOutcome(null);
    setMode(nextMode);
    setSecondsRemaining(getModeDuration(nextMode));
  };

  const selectFocusMinutes = (mins: number) => {
    if (isFocusInProgress || isRunning) return;
    setSessionOutcome(null);
    setMode("focus");
    setFocusMinutes(mins);
    setSecondsRemaining(mins * 60);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSessionOutcome(null);
    setSecondsRemaining(totalSeconds);
  };

  const handleGiveUp = () => {
    if (!isFocusInProgress) {
      resetTimer();
      return;
    }
    const elapsedMins = Math.max(
      1,
      Math.round((totalSeconds - secondsRemaining) / 60)
    );
    setIsRunning(false);
    setSessionOutcome("wilted");
    setForest((prev) => [
      {
        id: `wilt-${Date.now()}`,
        plantId: selectedPlantId,
        status: "wilted",
        minutes: elapsedMins,
        courseTitle: selectedCourseTitle,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
    setSecondsRemaining(totalSeconds);
  };

  const addTask = (titleText: string) => {
    const clean = titleText.trim();
    if (!clean) return;
    setTasks((prev) => [
      { id: `t-${Date.now()}`, title: clean, done: false },
      ...prev,
    ]);
    setNewTaskTitle("");
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const modeLabels: Record<TimerMode, string> = {
    focus: UI_COPY.planner.modeFocus[language],
    shortBreak: UI_COPY.planner.modeShortBreak[language],
    longBreak: UI_COPY.planner.modeLongBreak[language],
  };

  const progress = Math.min(
    1,
    Math.max(0, (totalSeconds - secondsRemaining) / totalSeconds)
  );
  const radius = 92;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  const minutesStr = String(Math.floor(secondsRemaining / 60)).padStart(2, "0");
  const secondsStr = String(secondsRemaining % 60).padStart(2, "0");

  const activePlant = getSaudiPlantById(selectedPlantId);
  const growthStage = getGrowthStage(
    sessionOutcome === "planted" ? 1 : progress
  );
  const stageLabels = [
    UI_COPY.planner.stageSeed[language],
    UI_COPY.planner.stageSapling[language],
    UI_COPY.planner.stageGrowing[language],
    UI_COPY.planner.stageMature[language],
  ];

  const thrivingCount = forest.filter((t) => t.status === "thriving").length;
  const wiltedCount = forest.filter((t) => t.status === "wilted").length;
  const totalFocusMinutes = forest
    .filter((t) => t.status === "thriving")
    .reduce((acc, t) => acc + t.minutes, 0);

  // Per-species cumulative completed Pomodoro sessions
  const speciesSessionCounts = SAUDI_PLANTS.reduce<Record<SaudiPlantId, number>>(
    (acc, plant) => {
      acc[plant.id] = 0;
      return acc;
    },
    { palm: 0, ghada: 0, talh: 0, juniper: 0, sidr: 0, lavender: 0 }
  );
  for (const record of forest) {
    if (record.status === "thriving") {
      speciesSessionCounts[record.plantId] =
        (speciesSessionCounts[record.plantId] || 0) + 1;
    }
  }

  const getCumulativePlantState = (count: number) => {
    if (count <= 0) {
      return {
        unplanted: true,
        stageOverride: 0 as const,
        levelIndex: 0 as const,
        remainingToNext: 1,
        progressPct: 0,
      };
    }
    if (count === 1) {
      return {
        unplanted: false,
        stageOverride: 0 as const,
        levelIndex: 1 as const,
        remainingToNext: 1,
        progressPct: 25,
      };
    }
    if (count === 2) {
      return {
        unplanted: false,
        stageOverride: 1 as const,
        levelIndex: 2 as const,
        remainingToNext: 1,
        progressPct: 50,
      };
    }
    if (count <= 4) {
      return {
        unplanted: false,
        stageOverride: 2 as const,
        levelIndex: 3 as const,
        remainingToNext: 5 - count,
        progressPct: count === 3 ? 72 : 88,
      };
    }
    return {
      unplanted: false,
      stageOverride: 3 as const,
      levelIndex: 4 as const,
      remainingToNext: 0,
      progressPct: 100,
    };
  };

  const getOasisRankInfo = (total: number) => {
    const r = UI_COPY.planner.rewards.ranks;
    if (total >= 10) {
      return {
        currentRank: r.guardian[language],
        nextRank: null as string | null,
        nextTarget: 10,
        progressPct: 100,
      };
    }
    if (total >= 6) {
      return {
        currentRank: r.oasis[language],
        nextRank: r.guardian[language],
        nextTarget: 10,
        progressPct: Math.round((total / 10) * 100),
      };
    }
    if (total >= 3) {
      return {
        currentRank: r.rawdah[language],
        nextRank: r.oasis[language],
        nextTarget: 6,
        progressPct: Math.round((total / 6) * 100),
      };
    }
    if (total >= 1) {
      return {
        currentRank: r.sprouter[language],
        nextRank: r.rawdah[language],
        nextTarget: 3,
        progressPct: Math.round((total / 3) * 100),
      };
    }
    return {
      currentRank: r.starter[language],
      nextRank: r.sprouter[language],
      nextTarget: 1,
      progressPct: 0,
    };
  };

  const oasisRank = getOasisRankInfo(thrivingCount);

  const doneCount = tasks.filter((t) => t.done).length;
  const filteredTasks = tasks.filter((t) => {
    if (taskFilter === "pending") return !t.done;
    if (taskFilter === "done") return t.done;
    return true;
  });

  const getTaskDisplayTitle = (task: StudyTask) => {
    if (task.defaultKey) {
      return UI_COPY.planner.defaultTasks[task.defaultKey][language];
    }
    return task.title;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Saudi Flora Focus Forest Column */}
        <section
          aria-label={UI_COPY.planner.timerTitle[language]}
          className="lg:col-span-5 bg-saudi-surface rounded-2xl border border-saudi-border p-6 space-y-5 transition-colors"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Trees className="w-5 h-5 text-saudi-palm shrink-0" />
              <h1 className="text-lg font-bold text-saudi-ink">
                {UI_COPY.planner.timerTitle[language]}
              </h1>
            </div>
            <span className="text-xs font-semibold text-saudi-palm-text tabular-nums">
              {UI_COPY.planner.completedSessions[language]} {thrivingCount || completedSessions}
            </span>
          </div>

          {/* Mode Segmented Control */}
          <div
            role="group"
            aria-label={UI_COPY.planner.timerTitle[language]}
            className="grid grid-cols-3 gap-1 p-1 bg-saudi-subtle rounded-xl border border-saudi-border"
          >
            {(["focus", "shortBreak", "longBreak"] as TimerMode[]).map((m) => (
              <button
                key={m}
                type="button"
                disabled={isFocusInProgress}
                onClick={() => switchMode(m)}
                className={`px-2 py-2 min-h-[38px] rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                  mode === m
                    ? "bg-saudi-surface text-saudi-palm-text shadow-sm font-semibold"
                    : "text-saudi-muted hover:text-saudi-ink"
                }`}
              >
                {modeLabels[m]}
              </button>
            ))}
          </div>

          {/* Focus Duration Presets */}
          {mode === "focus" && (
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-saudi-muted">
                {UI_COPY.planner.focusDurationLabel[language]}
              </span>
              <div className="flex items-center gap-1.5">
                {FOCUS_PRESET_MINUTES.map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    disabled={isFocusInProgress || isRunning}
                    onClick={() => selectFocusMinutes(mins)}
                    className={`px-2.5 py-1 min-h-[32px] rounded-lg text-xs font-semibold tabular-nums border transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                      focusMinutes === mins
                        ? "bg-saudi-palm text-white border-saudi-palm"
                        : "bg-saudi-canvas text-saudi-ink-secondary border-saudi-border hover:border-saudi-palm"
                    }`}
                  >
                    {mins} {UI_COPY.planner.minutesSuffix[language]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Growth Ring + Live Saudi Plant */}
          <div className="flex flex-col items-center justify-center py-1">
            <div className="relative w-56 h-56 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 212 212">
                <circle
                  cx="106"
                  cy="106"
                  r={radius}
                  fill="none"
                  stroke="var(--saudi-ring-track)"
                  strokeWidth="8"
                />
                <circle
                  cx="106"
                  cy="106"
                  r={radius}
                  fill="none"
                  stroke={
                    sessionOutcome === "wilted" || mode !== "focus"
                      ? "var(--saudi-sand-accent)"
                      : "var(--saudi-palm)"
                  }
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-[stroke-dashoffset] duration-300"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
                {mode === "focus" ? (
                  <SaudiPlantArt
                    plantId={selectedPlantId}
                    progress={sessionOutcome === "planted" ? 1 : progress}
                    wilted={sessionOutcome === "wilted"}
                    className="w-24 h-24 -mb-1"
                  />
                ) : (
                  <SaudiPlantArt
                    plantId={selectedPlantId}
                    progress={1}
                    className="w-24 h-24 -mb-1 opacity-90"
                  />
                )}

                <span
                  dir="ltr"
                  className="text-3xl font-semibold font-mono tabular-nums text-saudi-ink tracking-tight"
                >
                  {minutesStr}:{secondsStr}
                </span>
                <span className="text-[11px] font-medium text-saudi-muted mt-0.5">
                  {mode === "focus"
                    ? sessionOutcome === "wilted"
                      ? UI_COPY.planner.stageWilted[language]
                      : `${activePlant.name[language]} · ${stageLabels[growthStage]}`
                    : UI_COPY.planner.breakTime[language]}
                </span>
              </div>
            </div>
          </div>

          {/* Outcome Banners */}
          {sessionOutcome === "planted" && (
            <div className="rounded-xl border border-saudi-palm-border bg-saudi-palm-soft px-3.5 py-2.5 flex items-start gap-2 text-xs text-saudi-palm-text">
              <Sparkles className="w-4 h-4 text-saudi-palm shrink-0 mt-0.5" />
              <span>{UI_COPY.planner.justPlantedBanner[language]}</span>
            </div>
          )}

          {sessionOutcome === "wilted" && (
            <div className="rounded-xl border border-saudi-sand-border bg-saudi-sand-soft px-3.5 py-2.5 flex items-start gap-2 text-xs text-saudi-sand-text">
              <AlertTriangle className="w-4 h-4 text-saudi-sand-accent shrink-0 mt-0.5" />
              <span>{UI_COPY.planner.justWiltedBanner[language]}</span>
            </div>
          )}

          {/* Native Saudi Plant Species Selector */}
          {mode === "focus" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs font-semibold text-saudi-ink-secondary">
                  {UI_COPY.planner.selectPlantLabel[language]}
                </label>
                <span className="text-[11px] text-saudi-sand-text">
                  {activePlant.region[language]}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {SAUDI_PLANTS.map((plant) => {
                  const isChosen = plant.id === selectedPlantId;
                  return (
                    <button
                      key={plant.id}
                      type="button"
                      disabled={isFocusInProgress || isRunning}
                      onClick={() => {
                        setSelectedPlantId(plant.id);
                        setSessionOutcome(null);
                      }}
                      className={`p-2 rounded-xl border text-center flex flex-col items-center gap-1 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                        isChosen
                          ? "bg-saudi-palm-soft border-saudi-palm"
                          : "bg-saudi-canvas/70 border-saudi-border hover:border-saudi-border-strong"
                      }`}
                    >
                      <SaudiPlantArt
                        plantId={plant.id}
                        progress={1}
                        className="w-10 h-10"
                      />
                      <span className="text-[11px] font-semibold text-saudi-ink leading-tight line-clamp-1">
                        {plant.name[language]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {isFocusInProgress && (
                <p className="text-[11px] text-saudi-sand-text text-center">
                  {UI_COPY.planner.plantLockedHint[language]}
                </p>
              )}
            </div>
          )}

          {/* Timer Controls */}
          <div className="flex items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                setSessionOutcome(null);
                if (secondsRemaining === 0) {
                  setSecondsRemaining(totalSeconds);
                }
                setIsRunning((r) => !r);
              }}
              className="flex-1 min-h-[44px] px-4 py-2.5 bg-saudi-palm hover:bg-saudi-palm-hover text-white text-sm font-semibold rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>{UI_COPY.planner.pause[language]}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>
                    {secondsRemaining === 0
                      ? UI_COPY.planner.startOver[language]
                      : UI_COPY.planner.startSession[language]}
                  </span>
                </>
              )}
            </button>

            {isFocusInProgress ? (
              <button
                type="button"
                onClick={handleGiveUp}
                className="min-h-[44px] px-4 py-2.5 bg-saudi-surface hover:bg-saudi-sand-soft border border-saudi-sand-border text-saudi-sand-text text-sm font-semibold rounded-xl transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>{UI_COPY.planner.giveUpBtn[language]}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={resetTimer}
                className="min-h-[44px] px-4 py-2.5 bg-saudi-surface hover:bg-saudi-subtle border border-saudi-border text-saudi-ink-secondary text-sm font-medium rounded-xl transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{UI_COPY.planner.reset[language]}</span>
              </button>
            )}
          </div>
        </section>

        {/* Right Column: Saudi Oasis Sanctuary + Study Tasks */}
        <div className="lg:col-span-7 space-y-6">
          {/* Saudi Oasis Sanctuary & Cumulative Flora Growth Rewards */}
          <section
            aria-label={UI_COPY.planner.rewards.heading[language]}
            className="bg-saudi-surface rounded-2xl border border-saudi-border p-6 space-y-5 transition-colors"
          >
            {/* Header + Rank Summary */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-saudi-sand-accent shrink-0" />
                  <h2 className="text-lg font-bold text-saudi-ink">
                    {UI_COPY.planner.rewards.heading[language]}
                  </h2>
                </div>
                <p className="text-xs text-saudi-muted">
                  {UI_COPY.planner.rewards.subtitle[language]}
                </p>
              </div>

              {forest.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setForest([]);
                    setSessionOutcome(null);
                  }}
                  className="text-xs font-medium text-saudi-muted hover:text-red-600 dark:hover:text-red-400 px-2.5 py-1.5 rounded-lg border border-saudi-border cursor-pointer shrink-0"
                >
                  {UI_COPY.planner.clearGardenBtn[language]}
                </button>
              )}
            </div>

            {/* Oasis Rank Progress Bar */}
            <div className="rounded-xl border border-saudi-border bg-saudi-canvas/70 p-4 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold text-saudi-palm-text">
                  {oasisRank.currentRank}
                </span>
                <span className="text-saudi-muted tabular-nums">
                  {thrivingCount} {UI_COPY.planner.thrivingCountLabel[language]} ·{" "}
                  {wiltedCount} {UI_COPY.planner.wiltedCountLabel[language]} ·{" "}
                  {totalFocusMinutes} {UI_COPY.planner.totalMinutesLabel[language]}
                </span>
              </div>

              <div className="w-full h-2.5 rounded-full bg-saudi-subtle overflow-hidden">
                <div
                  className="h-full rounded-full bg-saudi-palm transition-all duration-500"
                  style={{ width: `${oasisRank.progressPct}%` }}
                />
              </div>

              <p className="text-[11px] text-saudi-muted tabular-nums">
                {oasisRank.nextRank
                  ? UI_COPY.planner.rewards.nextRankProgress(
                      thrivingCount,
                      oasisRank.nextTarget,
                      oasisRank.nextRank,
                      language
                    )
                  : UI_COPY.planner.rewards.topRankReached[language]}
              </p>
            </div>

            {/* Interactive Saudi Oasis Panorama (Dunes + Volcanic Escarpment + Growing Plants) */}
            <div className="rounded-xl border border-saudi-border overflow-hidden bg-saudi-canvas/80">
              <div className="px-4 py-2.5 border-b border-saudi-border flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-saudi-ink-secondary">
                  {UI_COPY.planner.rewards.panoramaTitle[language]}
                </span>
                {thrivingCount === 0 && (
                  <span className="text-[11px] text-saudi-muted">
                    {UI_COPY.planner.rewards.panoramaEmpty[language]}
                  </span>
                )}
              </div>

              <div className="relative pt-4 pb-3 px-3 overflow-hidden">
                {/* Subtle Tuwaiq/Harrat Escarpment & Desert Dune Horizon SVG */}
                <svg
                  viewBox="0 0 600 130"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                >
                  {/* Distant volcanic / escarpment ridge */}
                  <path
                    d="M0 78 L95 48 L180 65 L290 36 L390 60 L495 42 L600 72 L600 130 L0 130 Z"
                    fill="var(--saudi-subtle)"
                    opacity="0.7"
                  />
                  {/* Sweeping sand dune */}
                  <path
                    d="M0 96 Q150 74 300 94 T600 90 L600 130 L0 130 Z"
                    fill="var(--saudi-sand-accent)"
                    opacity="0.14"
                  />
                  {/* Foreground oasis soil band */}
                  <path
                    d="M0 108 Q220 98 420 110 T600 104 L600 130 L0 130 Z"
                    fill="var(--saudi-palm)"
                    opacity="0.14"
                  />
                </svg>

                <div className="relative z-10 grid grid-cols-6 gap-1 sm:gap-2 items-end">
                  {SAUDI_PLANTS.map((plant) => {
                    const count = speciesSessionCounts[plant.id] || 0;
                    const state = getCumulativePlantState(count);
                    return (
                      <div
                        key={plant.id}
                        className="flex flex-col items-center text-center"
                        title={`${plant.name[language]} (${count})`}
                      >
                        <SaudiPlantArt
                          plantId={plant.id}
                          progress={1}
                          unplanted={state.unplanted}
                          stageOverride={state.stageOverride}
                          className="w-14 h-14 sm:w-16 sm:h-16 transition-transform duration-300"
                        />
                        <span className="text-[10px] font-semibold text-saudi-ink-secondary leading-tight line-clamp-1">
                          {plant.shortName[language]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Switcher: Cumulative Species Growth vs Session History */}
            <div className="flex items-center justify-between gap-3">
              <div
                role="group"
                aria-label={UI_COPY.planner.rewards.heading[language]}
                className="inline-flex p-1 bg-saudi-subtle rounded-lg border border-saudi-border"
              >
                <button
                  type="button"
                  onClick={() => setSanctuaryTab("species")}
                  className={`px-3 py-1.5 min-h-[34px] rounded-md text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    sanctuaryTab === "species"
                      ? "bg-saudi-surface text-saudi-palm-text shadow-sm font-semibold"
                      : "text-saudi-muted hover:text-saudi-ink"
                  }`}
                >
                  {UI_COPY.planner.rewards.speciesTab[language]}
                </button>
                <button
                  type="button"
                  onClick={() => setSanctuaryTab("history")}
                  className={`px-3 py-1.5 min-h-[34px] rounded-md text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    sanctuaryTab === "history"
                      ? "bg-saudi-surface text-saudi-palm-text shadow-sm font-semibold"
                      : "text-saudi-muted hover:text-saudi-ink"
                  }`}
                >
                  {UI_COPY.planner.rewards.historyTab[language]} ({forest.length})
                </button>
              </div>
            </div>

            {sanctuaryTab === "species" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {SAUDI_PLANTS.map((plant) => {
                  const count = speciesSessionCounts[plant.id] || 0;
                  const state = getCumulativePlantState(count);
                  const isActiveSpecies = selectedPlantId === plant.id;
                  const levelText =
                    UI_COPY.planner.rewards.levelLabels[state.levelIndex][language];

                  return (
                    <button
                      key={plant.id}
                      type="button"
                      disabled={isFocusInProgress || isRunning}
                      onClick={() => {
                        setSelectedPlantId(plant.id);
                        setSessionOutcome(null);
                      }}
                      className={`rounded-xl border p-3.5 text-start flex flex-col justify-between gap-2.5 transition-colors cursor-pointer disabled:cursor-default ${
                        isActiveSpecies
                          ? "bg-saudi-palm-soft border-saudi-palm"
                          : "bg-saudi-canvas/70 border-saudi-border hover:border-saudi-border-strong"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <SaudiPlantArt
                          plantId={plant.id}
                          progress={1}
                          unplanted={state.unplanted}
                          stageOverride={state.stageOverride}
                          className="w-14 h-14 shrink-0"
                        />
                        <div className="min-w-0 space-y-0.5">
                          <p className="text-xs font-bold text-saudi-ink truncate">
                            {plant.name[language]}
                          </p>
                          <p className="text-[11px] font-medium text-saudi-palm-text truncate">
                            {levelText}
                          </p>
                          <p className="text-[11px] text-saudi-muted truncate">
                            {plant.region[language]}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="w-full h-1.5 rounded-full bg-saudi-subtle overflow-hidden">
                          <div
                            className="h-full rounded-full bg-saudi-palm transition-all duration-500"
                            style={{ width: `${state.progressPct}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between gap-2 text-[10px] text-saudi-muted tabular-nums">
                          <span>
                            {count}{" "}
                            {count === 1
                              ? UI_COPY.planner.rewards.sessionSingleUnit[language]
                              : UI_COPY.planner.rewards.sessionsCompletedUnit[language]}
                          </span>
                          <span>
                            {state.remainingToNext === 0
                              ? UI_COPY.planner.rewards.maxStageReached[language]
                              : UI_COPY.planner.rewards.nextEvolution(
                                  state.remainingToNext,
                                  language
                                )}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : forest.length === 0 ? (
              <div className="py-8 px-4 text-center text-sm text-saudi-muted border border-dashed border-saudi-border-strong rounded-xl bg-saudi-canvas/60">
                {UI_COPY.planner.gardenEmpty[language]}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto pe-1">
                {forest.map((item) => {
                  const species = getSaudiPlantById(item.plantId);
                  const isWilted = item.status === "wilted";
                  return (
                    <div
                      key={item.id}
                      className={`rounded-xl border p-3 flex flex-col items-center text-center gap-1.5 ${
                        isWilted
                          ? "bg-saudi-sand-soft/70 border-saudi-sand-border"
                          : "bg-saudi-canvas/75 border-saudi-border"
                      }`}
                    >
                      <SaudiPlantArt
                        plantId={item.plantId}
                        progress={1}
                        wilted={isWilted}
                        className="w-14 h-14"
                      />
                      <p className="text-xs font-bold text-saudi-ink line-clamp-1">
                        {species.name[language]}
                      </p>
                      <p className="text-[11px] text-saudi-muted tabular-nums line-clamp-1">
                        {item.minutes} {UI_COPY.planner.minutesSuffix[language]} · {item.courseTitle}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Study Tasks Section */}
          <section
            aria-label={UI_COPY.planner.tasksTitle[language]}
            className="bg-saudi-surface rounded-2xl border border-saudi-border p-6 space-y-5 transition-colors"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-saudi-ink">
                  {UI_COPY.planner.tasksTitle[language]}
                </h2>
                <p className="text-xs text-saudi-muted mt-0.5 tabular-nums">
                  {UI_COPY.planner.tasksProgress(doneCount, tasks.length, language)}
                </p>
              </div>

              <div
                role="group"
                aria-label={UI_COPY.planner.tasksTitle[language]}
                className="inline-flex p-1 bg-saudi-subtle rounded-lg border border-saudi-border"
              >
                {(
                  [
                    { id: "all", label: UI_COPY.planner.filterAll[language] },
                    { id: "pending", label: UI_COPY.planner.filterPending[language] },
                    { id: "done", label: UI_COPY.planner.filterDone[language] },
                  ] as const
                ).map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setTaskFilter(f.id)}
                    className={`px-3 py-1 min-h-[32px] rounded-md text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                      taskFilter === f.id
                        ? "bg-saudi-surface text-saudi-ink shadow-sm font-semibold"
                        : "text-saudi-muted hover:text-saudi-ink"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Add Task Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addTask(newTaskTitle);
              }}
              className="flex flex-col sm:flex-row gap-2.5"
            >
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder={UI_COPY.planner.newTaskPlaceholder[language]}
                className="flex-1 min-h-[44px] px-4 py-2 bg-saudi-canvas border border-saudi-border rounded-xl text-sm text-saudi-ink placeholder:text-saudi-muted focus:bg-saudi-surface focus:outline-none focus:ring-2 focus:ring-saudi-palm"
              />
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    addTask(
                      `${UI_COPY.planner.reviewCoursePrefix[language]} ${selectedCourseTitle}`
                    )
                  }
                  className="min-h-[44px] px-3.5 py-2 bg-saudi-surface hover:bg-saudi-subtle border border-saudi-border text-saudi-ink-secondary text-xs font-medium rounded-xl whitespace-nowrap cursor-pointer max-w-[200px] truncate"
                >
                  + {selectedCourseTitle}
                </button>
                <button
                  type="submit"
                  disabled={!newTaskTitle.trim()}
                  aria-label={UI_COPY.planner.addBtn[language]}
                  className="min-h-[44px] px-4 py-2 bg-saudi-palm hover:bg-saudi-palm-hover disabled:bg-saudi-subtle disabled:text-saudi-muted text-white text-sm font-semibold rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                  <span>{UI_COPY.planner.addBtn[language]}</span>
                </button>
              </div>
            </form>

            {/* Tasks List */}
            {filteredTasks.length === 0 ? (
              <div className="py-10 text-center text-sm text-saudi-muted border border-dashed border-saudi-border-strong rounded-xl">
                {UI_COPY.planner.emptyTasks[language]}
              </div>
            ) : (
              <ul className="divide-y divide-saudi-border border border-saudi-border rounded-xl overflow-hidden">
                {filteredTasks.map((task) => {
                  const displayTitle = getTaskDisplayTitle(task);
                  return (
                    <li
                      key={task.id}
                      className="flex items-center justify-between gap-3 px-4 py-3 bg-saudi-surface hover:bg-saudi-canvas/70 transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleTask(task.id)}
                        className="flex-1 min-h-[40px] flex items-center gap-3 text-start cursor-pointer"
                      >
                        {task.done ? (
                          <CheckCircle2 className="w-5 h-5 text-saudi-palm shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-saudi-border-strong shrink-0" />
                        )}
                        <span
                          className={`text-sm leading-snug ${
                            task.done
                              ? "line-through text-saudi-muted"
                              : "text-saudi-ink font-medium"
                          }`}
                        >
                          {displayTitle}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteTask(task.id)}
                        aria-label={`${UI_COPY.planner.deleteTaskAria[language]} ${displayTitle}`}
                        className="min-h-[36px] min-w-[36px] flex items-center justify-center text-saudi-muted hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors shrink-0 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
