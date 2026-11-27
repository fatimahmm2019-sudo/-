import React, { useMemo, useState } from "react";
import {
  BookOpen,
  Building2,
  CheckCircle2,
  GraduationCap,
  Layers,
  Search,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  AcademicSelectionIds,
  GENERAL_STAGES_DATA,
  getCatalogTotals,
  resolveAcademicSelection,
  UNIVERSITIES_PLANS,
} from "../data/saudiCurriculum";
import { Language, UI_COPY } from "../i18n/translations";

interface CurriculumExplorerProps {
  language: Language;
  selection: AcademicSelectionIds;
  onUpdate: (updates: Partial<AcademicSelectionIds>) => void;
  onStartStudying: (updates?: Partial<AcademicSelectionIds>) => void;
}

type DirectoryScope = "all" | "universities" | "schools";

export const CurriculumExplorer: React.FC<CurriculumExplorerProps> = ({
  language,
  selection,
  onUpdate,
  onStartStudying,
}) => {
  const [courseQuery, setCourseQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<number | "all">("all");
  const [catalogMode, setCatalogMode] = useState<"selected" | "all">("selected");
  const [directoryScope, setDirectoryScope] = useState<DirectoryScope>("all");
  const [allCatalogQuery, setAllCatalogQuery] = useState("");
  const [expandedUnis, setExpandedUnis] = useState<Record<string, boolean>>(() => ({
    [selection.universityId || "kfu"]: true,
  }));
  const [expandedColleges, setExpandedColleges] = useState<Record<string, boolean>>(() => ({
    [selection.collegeId || "kfu-edu"]: true,
  }));
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({
    "qiyas-qudurat": true,
    "qiyas-tahsili": true,
  });
  const [imgError, setImgError] = useState(false);

  const resolved = useMemo(
    () => resolveAcademicSelection(selection, language),
    [selection, language]
  );

  const catalogTotals = useMemo(() => getCatalogTotals(), []);

  const availableLevels = useMemo(() => {
    const list = selection.isUniversity
      ? resolved.major.courses
      : resolved.stage.courses;
    const set = new Set<number>();
    for (const c of list) {
      set.add(c.level);
    }
    return Array.from(set).sort((a, b) => a - b);
  }, [selection.isUniversity, resolved.major.courses, resolved.stage.courses]);

  const courses = useMemo(() => {
    const raw = selection.isUniversity
      ? resolved.major.courses
      : resolved.stage.courses;
    const q = courseQuery.trim().toLowerCase();
    return raw.filter((c) => {
      if (selectedLevel !== "all" && c.level !== selectedLevel) {
        return false;
      }
      if (!q) return true;
      return (
        c.title.ar.toLowerCase().includes(q) ||
        c.title.en.toLowerCase().includes(q) ||
        c.focus.ar.toLowerCase().includes(q) ||
        c.focus.en.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q)
      );
    });
  }, [selection.isUniversity, resolved, courseQuery, selectedLevel]);

  const activeSearchQuery = allCatalogQuery.trim().toLowerCase();
  const isSearchingDirectory = activeSearchQuery.length >= 2;

  const filteredUniversities = useMemo(() => {
    if (directoryScope === "schools") return [];
    if (!isSearchingDirectory) return UNIVERSITIES_PLANS;

    return UNIVERSITIES_PLANS.map((uni) => {
      const uniMatches =
        uni.name.ar.toLowerCase().includes(activeSearchQuery) ||
        uni.name.en.toLowerCase().includes(activeSearchQuery) ||
        uni.city.ar.toLowerCase().includes(activeSearchQuery) ||
        uni.city.en.toLowerCase().includes(activeSearchQuery);

      const matchedColleges = uni.colleges
        .map((col) => {
          const colMatches =
            col.name.ar.toLowerCase().includes(activeSearchQuery) ||
            col.name.en.toLowerCase().includes(activeSearchQuery);
          const matchedMajors = col.majors
            .map((maj) => {
              const majMatches =
                maj.name.ar.toLowerCase().includes(activeSearchQuery) ||
                maj.name.en.toLowerCase().includes(activeSearchQuery);
              const matchedCourses = maj.courses.filter(
                (c) =>
                  uniMatches ||
                  colMatches ||
                  majMatches ||
                  c.title.ar.toLowerCase().includes(activeSearchQuery) ||
                  c.title.en.toLowerCase().includes(activeSearchQuery) ||
                  c.focus.ar.toLowerCase().includes(activeSearchQuery) ||
                  c.focus.en.toLowerCase().includes(activeSearchQuery) ||
                  c.code.toLowerCase().includes(activeSearchQuery)
              );
              if (matchedCourses.length === 0) return null;
              return { ...maj, courses: matchedCourses };
            })
            .filter((m): m is NonNullable<typeof m> => m !== null);

          if (matchedMajors.length === 0) return null;
          return { ...col, majors: matchedMajors };
        })
        .filter((c): c is NonNullable<typeof c> => c !== null);

      if (matchedColleges.length === 0) return null;
      return { ...uni, colleges: matchedColleges };
    }).filter((u): u is NonNullable<typeof u> => u !== null);
  }, [directoryScope, isSearchingDirectory, activeSearchQuery]);

  const filteredStages = useMemo(() => {
    if (directoryScope === "universities") return [];
    if (!isSearchingDirectory) return GENERAL_STAGES_DATA;

    return GENERAL_STAGES_DATA.map((st) => {
      const stageMatches =
        st.name.ar.toLowerCase().includes(activeSearchQuery) ||
        st.name.en.toLowerCase().includes(activeSearchQuery);

      const matchedCourses = st.courses.filter(
        (c) =>
          stageMatches ||
          c.title.ar.toLowerCase().includes(activeSearchQuery) ||
          c.title.en.toLowerCase().includes(activeSearchQuery) ||
          c.focus.ar.toLowerCase().includes(activeSearchQuery) ||
          c.focus.en.toLowerCase().includes(activeSearchQuery) ||
          c.code.toLowerCase().includes(activeSearchQuery)
      );
      if (matchedCourses.length === 0) return null;
      return { ...st, courses: matchedCourses };
    }).filter((s): s is NonNullable<typeof s> => s !== null);
  }, [directoryScope, isSearchingDirectory, activeSearchQuery]);

  const ArrowIcon = language === "ar" ? ArrowLeft : ArrowRight;

  const toggleUniversityExpand = (uniId: string, firstCollegeId?: string) => {
    setExpandedUnis((prev) => {
      const nextOpen = !prev[uniId];
      if (nextOpen && firstCollegeId) {
        setExpandedColleges((cPrev) => ({
          ...cPrev,
          [firstCollegeId]: cPrev[firstCollegeId] ?? true,
        }));
      }
      return { ...prev, [uniId]: nextOpen };
    });
  };

  const toggleCollegeExpand = (colId: string) => {
    setExpandedColleges((prev) => ({ ...prev, [colId]: !prev[colId] }));
  };

  const toggleStageExpand = (stageId: string) => {
    setExpandedStages((prev) => ({ ...prev, [stageId]: !prev[stageId] }));
  };

  const levelUnitLabel = selection.isUniversity
    ? UI_COPY.curriculum.levelLabel[language]
    : UI_COPY.curriculum.sectionLabel[language];

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-saudi-border bg-[#131E19] min-h-[220px] sm:min-h-[250px] flex items-end">
        {!imgError ? (
          <img
            src="/src/assets/images/hero_saudi_academy_1795782694664.jpg"
            alt={UI_COPY.curriculum.heroAlt[language]}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-bl from-emerald-950 via-[#171d1a] to-[#0f1311]" />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0f1311]/90 via-[#0f1311]/55 to-[#0f1311]/20"
        />

        <div className="relative z-10 w-full p-6 sm:p-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <p className="text-xs sm:text-sm font-medium text-emerald-300">
              {resolved.breadcrumb}
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug [text-wrap:balance]">
              {UI_COPY.curriculum.heroTitle[language]}
            </h1>
            <p className="text-sm sm:text-base text-[#EAE5D9] leading-relaxed max-w-xl">
              {UI_COPY.curriculum.heroSubtitle[language]}
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => onStartStudying()}
              className="w-full sm:w-auto px-5 py-3 min-h-[44px] bg-saudi-palm hover:bg-saudi-palm-hover text-white text-sm font-semibold rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>
                {UI_COPY.curriculum.continueCourse[language]}: {resolved.course.title[language]}
              </span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Catalog View Switcher + Academic Path Selector */}
      <section
        aria-label={UI_COPY.curriculum.customizeHeading[language]}
        className="bg-saudi-surface rounded-2xl border border-saudi-border p-5 sm:p-6 space-y-5 transition-colors"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-saudi-ink">
              {UI_COPY.curriculum.customizeHeading[language]}
            </h2>
            <p className="text-xs sm:text-sm text-saudi-muted mt-0.5 tabular-nums">
              {UI_COPY.curriculum.catalogSummary(
                catalogTotals.universities,
                catalogTotals.colleges,
                catalogTotals.majors,
                catalogTotals.courses,
                catalogTotals.generalCourses,
                language
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Catalog Mode Switcher */}
            <div
              role="group"
              aria-label={UI_COPY.curriculum.viewAllPlansBtn[language]}
              className="inline-flex p-1 bg-saudi-subtle rounded-xl border border-saudi-border"
            >
              <button
                type="button"
                onClick={() => setCatalogMode("selected")}
                className={`px-3.5 py-2 min-h-[38px] rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  catalogMode === "selected"
                    ? "bg-saudi-surface text-saudi-palm-text shadow-sm font-semibold"
                    : "text-saudi-muted hover:text-saudi-ink"
                }`}
              >
                {UI_COPY.curriculum.viewTrackBtn[language]}
              </button>
              <button
                type="button"
                onClick={() => setCatalogMode("all")}
                className={`px-3.5 py-2 min-h-[38px] rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  catalogMode === "all"
                    ? "bg-saudi-surface text-saudi-palm-text shadow-sm font-semibold"
                    : "text-saudi-muted hover:text-saudi-ink"
                }`}
              >
                {UI_COPY.curriculum.viewAllPlansBtn[language]}
              </button>
            </div>

            {catalogMode === "selected" && (
              <div
                role="group"
                aria-label={UI_COPY.curriculum.educationTypeAria[language]}
                className="inline-flex p-1 bg-saudi-subtle rounded-xl border border-saudi-border"
              >
                <button
                  type="button"
                  onClick={() => {
                    const defaultUni = UNIVERSITIES_PLANS[0];
                    const defaultCollege = defaultUni.colleges[0];
                    const defaultMajor = defaultCollege.majors[0];
                    const defaultCourse = defaultMajor.courses[0];
                    onUpdate({
                      isUniversity: true,
                      universityId: defaultUni.id,
                      collegeId: defaultCollege.id,
                      majorId: defaultMajor.id,
                      courseId: defaultCourse.id,
                    });
                    setCourseQuery("");
                    setSelectedLevel("all");
                  }}
                  className={`px-3.5 py-2 min-h-[38px] rounded-lg text-xs sm:text-sm font-medium transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    selection.isUniversity
                      ? "bg-saudi-surface text-saudi-palm-text shadow-sm font-semibold"
                      : "text-saudi-muted hover:text-saudi-ink"
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>{UI_COPY.curriculum.universityTab[language]}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const defaultStage =
                      GENERAL_STAGES_DATA.find((s) => s.id === "hs-general") ||
                      GENERAL_STAGES_DATA[0];
                    const defaultCourse = defaultStage.courses[0];
                    onUpdate({
                      isUniversity: false,
                      generalStageId: defaultStage.id,
                      courseId: defaultCourse.id,
                    });
                    setCourseQuery("");
                    setSelectedLevel("all");
                  }}
                  className={`px-3.5 py-2 min-h-[38px] rounded-lg text-xs sm:text-sm font-medium transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    !selection.isUniversity
                      ? "bg-saudi-surface text-saudi-palm-text shadow-sm font-semibold"
                      : "text-saudi-muted hover:text-saudi-ink"
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{UI_COPY.curriculum.generalTab[language]}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {catalogMode === "selected" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selection.isUniversity ? (
              <>
                <div className="space-y-1.5">
                  <label
                    htmlFor="uni-select"
                    className="block text-xs font-semibold text-saudi-muted"
                  >
                    {UI_COPY.curriculum.universityLabel[language]}
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-saudi-palm absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      id="uni-select"
                      value={resolved.university.id}
                      onChange={(e) => {
                        const nextUni =
                          UNIVERSITIES_PLANS.find((u) => u.id === e.target.value) ||
                          UNIVERSITIES_PLANS[0];
                        const firstCollege = nextUni.colleges[0];
                        const firstMajor = firstCollege.majors[0];
                        const firstCourse = firstMajor.courses[0];
                        onUpdate({
                          universityId: nextUni.id,
                          collegeId: firstCollege.id,
                          majorId: firstMajor.id,
                          courseId: firstCourse.id,
                        });
                        setSelectedLevel("all");
                        setCourseQuery("");
                      }}
                      className="w-full min-h-[44px] ps-10 pe-4 py-2.5 bg-saudi-canvas border border-saudi-border rounded-xl text-sm font-medium text-saudi-ink focus:bg-saudi-surface focus:outline-none focus:ring-2 focus:ring-saudi-palm"
                    >
                      {UNIVERSITIES_PLANS.map((uni) => (
                        <option key={uni.id} value={uni.id}>
                          {uni.name[language]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="college-select"
                    className="block text-xs font-semibold text-saudi-muted"
                  >
                    {UI_COPY.curriculum.collegeLabel[language]}
                  </label>
                  <div className="relative">
                    <Layers className="w-4 h-4 text-saudi-palm absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      id="college-select"
                      value={resolved.college.id}
                      onChange={(e) => {
                        const nextCollege =
                          resolved.university.colleges.find((c) => c.id === e.target.value) ||
                          resolved.university.colleges[0];
                        const firstMajor = nextCollege.majors[0];
                        const firstCourse = firstMajor.courses[0];
                        onUpdate({
                          collegeId: nextCollege.id,
                          majorId: firstMajor.id,
                          courseId: firstCourse.id,
                        });
                        setSelectedLevel("all");
                        setCourseQuery("");
                      }}
                      className="w-full min-h-[44px] ps-10 pe-4 py-2.5 bg-saudi-canvas border border-saudi-border rounded-xl text-sm font-medium text-saudi-ink focus:bg-saudi-surface focus:outline-none focus:ring-2 focus:ring-saudi-palm"
                    >
                      {resolved.university.colleges.map((col) => (
                        <option key={col.id} value={col.id}>
                          {col.name[language]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="major-select"
                    className="block text-xs font-semibold text-saudi-muted"
                  >
                    {UI_COPY.curriculum.majorLabel[language]}
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-saudi-palm absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      id="major-select"
                      value={resolved.major.id}
                      onChange={(e) => {
                        const nextMajor =
                          resolved.college.majors.find((m) => m.id === e.target.value) ||
                          resolved.college.majors[0];
                        const firstCourse = nextMajor.courses[0];
                        onUpdate({
                          majorId: nextMajor.id,
                          courseId: firstCourse.id,
                        });
                        setSelectedLevel("all");
                        setCourseQuery("");
                      }}
                      className="w-full min-h-[44px] ps-10 pe-4 py-2.5 bg-saudi-canvas border border-saudi-border rounded-xl text-sm font-medium text-saudi-ink focus:bg-saudi-surface focus:outline-none focus:ring-2 focus:ring-saudi-palm"
                    >
                      {resolved.college.majors.map((maj) => (
                        <option key={maj.id} value={maj.id}>
                          {maj.name[language]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-1.5 md:col-span-3">
                <label
                  htmlFor="stage-select"
                  className="block text-xs font-semibold text-saudi-muted"
                >
                  {UI_COPY.curriculum.stageLabel[language]}
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-saudi-palm absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    id="stage-select"
                    value={resolved.stage.id}
                    onChange={(e) => {
                      const nextStage =
                        GENERAL_STAGES_DATA.find((s) => s.id === e.target.value) ||
                        GENERAL_STAGES_DATA[0];
                      const firstCourse = nextStage.courses[0];
                      onUpdate({
                        generalStageId: nextStage.id,
                        courseId: firstCourse.id,
                      });
                      setSelectedLevel("all");
                      setCourseQuery("");
                    }}
                    className="w-full min-h-[44px] ps-10 pe-4 py-2.5 bg-saudi-canvas border border-saudi-border rounded-xl text-sm font-medium text-saudi-ink focus:bg-saudi-surface focus:outline-none focus:ring-2 focus:ring-saudi-palm"
                  >
                    {GENERAL_STAGES_DATA.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name[language]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-saudi-muted absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={allCatalogQuery}
                onChange={(e) => setAllCatalogQuery(e.target.value)}
                placeholder={UI_COPY.curriculum.allCatalogSearchPlaceholder[language]}
                className="w-full min-h-[44px] ps-10 pe-4 py-2.5 bg-saudi-canvas border border-saudi-border rounded-xl text-sm text-saudi-ink placeholder:text-saudi-muted focus:bg-saudi-surface focus:outline-none focus:ring-2 focus:ring-saudi-palm"
              />
            </div>

            <div
              role="group"
              aria-label={UI_COPY.curriculum.educationTypeAria[language]}
              className="inline-flex p-1 bg-saudi-subtle rounded-xl border border-saudi-border shrink-0"
            >
              {(
                [
                  { id: "all", label: UI_COPY.curriculum.dirFilterAll[language] },
                  { id: "universities", label: UI_COPY.curriculum.dirFilterUnis[language] },
                  { id: "schools", label: UI_COPY.curriculum.dirFilterSchools[language] },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setDirectoryScope(tab.id)}
                  className={`px-3 py-2 min-h-[36px] rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    directoryScope === tab.id
                      ? "bg-saudi-surface text-saudi-palm-text shadow-sm font-semibold"
                      : "text-saudi-muted hover:text-saudi-ink"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Mode 1: Selected Track Courses */}
      {catalogMode === "selected" ? (
        <section aria-label={UI_COPY.curriculum.coursesHeading[language]} className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex flex-wrap items-baseline gap-2.5">
              <h2 className="text-lg font-bold text-saudi-ink">
                {UI_COPY.curriculum.coursesHeading[language]}
              </h2>
              <span className="text-xs text-saudi-muted tabular-nums">
                {courses.length} {UI_COPY.curriculum.courseCountSuffix[language]}
                {selection.isUniversity &&
                  ` · ${resolved.major.totalCredits} ${UI_COPY.curriculum.planHoursSuffix[language]}`}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              {availableLevels.length > 1 && (
                <select
                  aria-label={levelUnitLabel}
                  value={selectedLevel}
                  onChange={(e) => {
                    const v = e.target.value;
                    setSelectedLevel(v === "all" ? "all" : Number(v));
                  }}
                  className="min-h-[40px] px-3 py-2 bg-saudi-surface border border-saudi-border rounded-xl text-sm text-saudi-ink focus:outline-none focus:ring-2 focus:ring-saudi-palm"
                >
                  <option value="all">{UI_COPY.curriculum.allLevels[language]}</option>
                  {availableLevels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {levelUnitLabel} {lvl}
                    </option>
                  ))}
                </select>
              )}

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-saudi-muted absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={courseQuery}
                  onChange={(e) => setCourseQuery(e.target.value)}
                  placeholder={UI_COPY.curriculum.searchPlaceholder[language]}
                  className="w-full min-h-[40px] ps-10 pe-3.5 py-2 bg-saudi-surface border border-saudi-border rounded-xl text-sm text-saudi-ink placeholder:text-saudi-muted focus:outline-none focus:ring-2 focus:ring-saudi-palm"
                />
              </div>
            </div>
          </div>

          {courses.length === 0 ? (
            <div className="bg-saudi-surface rounded-2xl border border-saudi-border p-8 text-center text-sm text-saudi-muted">
              {UI_COPY.curriculum.noResultsPrefix[language]} "{courseQuery}".
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => {
                const isSelected = course.id === resolved.course.id;
                return (
                  <article
                    key={course.id}
                    className={`rounded-2xl border p-5 flex flex-col justify-between gap-4 transition-colors ${
                      isSelected
                        ? "bg-saudi-palm-soft border-saudi-palm"
                        : "bg-saudi-surface border-saudi-border hover:border-saudi-border-strong"
                    }`}
                  >
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-saudi-muted tabular-nums">
                        <span dir="ltr" className="font-mono font-semibold text-saudi-ink-secondary">
                          {course.code}
                        </span>
                        <span aria-hidden="true"> · </span>
                        <span>
                          {levelUnitLabel} {course.level}
                        </span>
                        <span aria-hidden="true"> · </span>
                        <span>
                          {course.credits} {UI_COPY.curriculum.creditsLabel[language]}
                        </span>
                      </p>

                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-bold text-saudi-ink leading-snug">
                          {course.title[language]}
                        </h3>
                        {isSelected && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-saudi-palm-text shrink-0 whitespace-nowrap">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{UI_COPY.curriculum.activeBadge[language]}</span>
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-saudi-ink-secondary leading-relaxed">
                        {course.focus[language]}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-saudi-border flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => onUpdate({ courseId: course.id })}
                        className="text-xs font-medium text-saudi-muted hover:text-saudi-ink min-h-[36px] px-2 cursor-pointer"
                      >
                        {isSelected
                          ? UI_COPY.curriculum.selectedCourseBtn[language]
                          : UI_COPY.curriculum.setActiveBtn[language]}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onUpdate({ courseId: course.id });
                          onStartStudying({ courseId: course.id });
                        }}
                        className="px-4 py-2 min-h-[40px] bg-saudi-palm hover:bg-saudi-palm-hover text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saudi-palm"
                      >
                        {UI_COPY.curriculum.studyNowBtn[language]}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      ) : (
        /* Mode 2: Full Directory of All 29 Saudi Universities + K-12 Schools + Qiyas (Qudurat & Tahsili) */
        <section
          aria-label={UI_COPY.curriculum.viewAllPlansBtn[language]}
          className="space-y-6"
        >
          {filteredUniversities.length === 0 && filteredStages.length === 0 ? (
            <div className="bg-saudi-surface rounded-2xl border border-saudi-border p-8 text-center text-sm text-saudi-muted">
              {UI_COPY.curriculum.noResultsPrefix[language]} "{allCatalogQuery}".
            </div>
          ) : (
            <>
              {/* K-12 Schools & Qiyas Section */}
              {filteredStages.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                    <BookOpen className="w-5 h-5 text-saudi-palm" />
                    <h2 className="text-base sm:text-lg font-bold text-saudi-ink">
                      {UI_COPY.curriculum.schoolsSectionHeading[language]}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {filteredStages.map((st, idx) => {
                      const isStageOpen =
                        (isSearchingDirectory && idx < 4) || expandedStages[st.id] === true;
                      return (
                        <div
                          key={st.id}
                          className="bg-saudi-surface rounded-2xl border border-saudi-border overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={() => toggleStageExpand(st.id)}
                            className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-start hover:bg-saudi-canvas/70 transition-colors cursor-pointer"
                          >
                            <div className="space-y-0.5">
                              <h3 className="text-sm sm:text-base font-bold text-saudi-ink">
                                {st.name[language]}
                              </h3>
                              <p className="text-xs text-saudi-muted tabular-nums">
                                {st.courses.length} {UI_COPY.curriculum.courseCountSuffix[language]}
                              </p>
                            </div>
                            {isStageOpen ? (
                              <ChevronUp className="w-5 h-5 text-saudi-muted shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-saudi-muted shrink-0" />
                            )}
                          </button>

                          {isStageOpen && (
                            <div className="border-t border-saudi-border p-5 sm:p-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {st.courses.map((course) => {
                                  const isActive =
                                    !selection.isUniversity &&
                                    selection.generalStageId === st.id &&
                                    selection.courseId === course.id;

                                  return (
                                    <div
                                      key={course.id}
                                      className={`rounded-xl border p-4 flex flex-col justify-between gap-3 ${
                                        isActive
                                          ? "bg-saudi-palm-soft border-saudi-palm"
                                          : "bg-saudi-canvas/60 border-saudi-border"
                                      }`}
                                    >
                                      <div className="space-y-1">
                                        <p className="text-[11px] font-medium text-saudi-muted tabular-nums">
                                          <span dir="ltr" className="font-mono font-semibold text-saudi-ink-secondary">
                                            {course.code}
                                          </span>
                                          <span aria-hidden="true"> · </span>
                                          <span>
                                            {course.credits} {UI_COPY.curriculum.creditsLabel[language]}
                                          </span>
                                        </p>
                                        <p className="text-sm font-bold text-saudi-ink">
                                          {course.title[language]}
                                        </p>
                                        <p className="text-xs text-saudi-ink-secondary leading-relaxed">
                                          {course.focus[language]}
                                        </p>
                                      </div>

                                      <div className="flex justify-end">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updates: Partial<AcademicSelectionIds> = {
                                              isUniversity: false,
                                              generalStageId: st.id,
                                              courseId: course.id,
                                            };
                                            onUpdate(updates);
                                            onStartStudying(updates);
                                          }}
                                          className="px-3.5 py-1.5 min-h-[36px] bg-saudi-palm hover:bg-saudi-palm-hover text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                                        >
                                          {UI_COPY.curriculum.studyNowBtn[language]}
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Saudi Universities Directory */}
              {filteredUniversities.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                    <GraduationCap className="w-5 h-5 text-saudi-palm" />
                    <h2 className="text-base sm:text-lg font-bold text-saudi-ink">
                      {UI_COPY.curriculum.dirFilterUnis[language]} ({filteredUniversities.length})
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {filteredUniversities.map((uni, uniIdx) => {
                      const isExpanded =
                        (isSearchingDirectory && uniIdx < 3) || expandedUnis[uni.id] === true;
                      const uniCourseCount = uni.colleges.reduce(
                        (acc, col) =>
                          acc + col.majors.reduce((mAcc, m) => mAcc + m.courses.length, 0),
                        0
                      );

                      return (
                        <div
                          key={uni.id}
                          className="bg-saudi-surface rounded-2xl border border-saudi-border overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              toggleUniversityExpand(uni.id, uni.colleges[0]?.id)
                            }
                            className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-start hover:bg-saudi-canvas/70 transition-colors cursor-pointer"
                          >
                            <div className="space-y-0.5">
                              <h3 className="text-base sm:text-lg font-bold text-saudi-ink">
                                {uni.name[language]}
                              </h3>
                              <p className="text-xs text-saudi-muted tabular-nums">
                                {uni.city[language]} · {uni.colleges.length}{" "}
                                {UI_COPY.curriculum.collegesSuffix[language]} · {uniCourseCount}{" "}
                                {UI_COPY.curriculum.courseCountSuffix[language]}
                              </p>
                            </div>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-saudi-muted shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-saudi-muted shrink-0" />
                            )}
                          </button>

                          {isExpanded && (
                            <div className="border-t border-saudi-border divide-y divide-saudi-border">
                              {uni.colleges.map((col, colIdx) => {
                                const isColOpen =
                                  (isSearchingDirectory && colIdx < 3) ||
                                  expandedColleges[col.id] === true;
                                const colCoursesCount = col.majors.reduce(
                                  (acc, m) => acc + m.courses.length,
                                  0
                                );

                                return (
                                  <div key={col.id}>
                                    <button
                                      type="button"
                                      onClick={() => toggleCollegeExpand(col.id)}
                                      className="w-full px-5 sm:px-6 py-3.5 flex items-center justify-between gap-3 text-start bg-saudi-canvas/60 hover:bg-saudi-subtle transition-colors cursor-pointer"
                                    >
                                      <div className="space-y-0.5">
                                        <h4 className="text-sm font-bold text-saudi-palm-text">
                                          {col.name[language]}
                                        </h4>
                                        <p className="text-[11px] text-saudi-muted tabular-nums">
                                          {col.majors.length}{" "}
                                          {UI_COPY.curriculum.majorsSuffix[language]} ·{" "}
                                          {colCoursesCount}{" "}
                                          {UI_COPY.curriculum.courseCountSuffix[language]}
                                        </p>
                                      </div>
                                      {isColOpen ? (
                                        <ChevronUp className="w-4 h-4 text-saudi-muted shrink-0" />
                                      ) : (
                                        <ChevronDown className="w-4 h-4 text-saudi-muted shrink-0" />
                                      )}
                                    </button>

                                    {isColOpen && (
                                      <div className="p-5 sm:p-6 space-y-6">
                                        {col.majors.map((maj) => (
                                          <div key={maj.id} className="space-y-3">
                                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                                              <h5 className="text-sm font-semibold text-saudi-ink">
                                                {maj.name[language]}
                                              </h5>
                                              <span className="text-xs text-saudi-muted tabular-nums">
                                                {maj.totalCredits}{" "}
                                                {UI_COPY.curriculum.planHoursSuffix[language]} ·{" "}
                                                {maj.courses.length}{" "}
                                                {UI_COPY.curriculum.courseCountSuffix[language]}
                                              </span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                              {maj.courses.map((course) => {
                                                const isActive =
                                                  selection.isUniversity &&
                                                  selection.universityId === uni.id &&
                                                  selection.courseId === course.id;

                                                return (
                                                  <div
                                                    key={course.id}
                                                    className={`rounded-xl border p-4 flex flex-col justify-between gap-3 ${
                                                      isActive
                                                        ? "bg-saudi-palm-soft border-saudi-palm"
                                                        : "bg-saudi-canvas/60 border-saudi-border"
                                                    }`}
                                                  >
                                                    <div className="space-y-1">
                                                      <p className="text-[11px] font-medium text-saudi-muted tabular-nums">
                                                        <span
                                                          dir="ltr"
                                                          className="font-mono font-semibold text-saudi-ink-secondary"
                                                        >
                                                          {course.code}
                                                        </span>
                                                        <span aria-hidden="true"> · </span>
                                                        <span>
                                                          {UI_COPY.curriculum.levelLabel[language]}{" "}
                                                          {course.level}
                                                        </span>
                                                        <span aria-hidden="true"> · </span>
                                                        <span>
                                                          {course.credits}{" "}
                                                          {UI_COPY.curriculum.creditsLabel[language]}
                                                        </span>
                                                      </p>
                                                      <p className="text-sm font-bold text-saudi-ink">
                                                        {course.title[language]}
                                                      </p>
                                                      <p className="text-xs text-saudi-ink-secondary leading-relaxed">
                                                        {course.focus[language]}
                                                      </p>
                                                    </div>

                                                    <div className="flex justify-end">
                                                      <button
                                                        type="button"
                                                        onClick={() => {
                                                          const updates: Partial<AcademicSelectionIds> =
                                                            {
                                                              isUniversity: true,
                                                              universityId: uni.id,
                                                              collegeId: col.id,
                                                              majorId: maj.id,
                                                              courseId: course.id,
                                                            };
                                                          onUpdate(updates);
                                                          onStartStudying(updates);
                                                        }}
                                                        className="px-3.5 py-1.5 min-h-[36px] bg-saudi-palm hover:bg-saudi-palm-hover text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                                                      >
                                                        {UI_COPY.curriculum.studyNowBtn[language]}
                                                      </button>
                                                    </div>
                                                  </div>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      )}
    </div>
  );
};
