export type Language = "ar" | "en";

export interface LocalizedText {
  ar: string;
  en: string;
}

export function pickText(text: LocalizedText, lang: Language): string {
  return text[lang];
}

export const UI_COPY = {
  appTitle: {
    ar: "مِداد AI — رفيقك الذكي للتميّز الدراسي والجامعي",
    en: "Midad AI — Smart Saudi Academic & Study Companion",
  },
  brand: {
    ar: "مِداد AI",
    en: "Midad AI",
  },
  nav: {
    curriculum: { ar: "المناهج", en: "Curricula" },
    curriculumMobile: { ar: "المناهج", en: "Curricula" },
    tutor: { ar: "المعلم الذكي", en: "AI Tutor" },
    tutorMobile: { ar: "المعلم", en: "Tutor" },
    files: { ar: "مختبر الملفات", en: "File Lab" },
    filesMobile: { ar: "الملفات", en: "Files" },
    planner: { ar: "مخطط المذاكرة", en: "Planner" },
    plannerMobile: { ar: "مخططي", en: "Planner" },
    startStudying: { ar: "ابدأ المذاكرة", en: "Start Studying" },
    toggleLanguageLabel: { ar: "EN", en: "عربي" },
    toggleLanguageAria: {
      ar: "التبديل إلى اللغة الإنجليزية",
      en: "Switch to Arabic",
    },
    themeToDarkAria: {
      ar: "التبديل إلى الوضع الداكن",
      en: "Switch to Dark Mode",
    },
    themeToLightAria: {
      ar: "التبديل إلى الوضع الفاتح",
      en: "Switch to Light Mode",
    },
    primaryNavAria: { ar: "التنقل الرئيسي", en: "Primary Navigation" },
    bottomNavAria: { ar: "التنقل السفلي", en: "Bottom Navigation" },
  },
  curriculum: {
    heroAlt: {
      ar: "مكتبة جامعية سعودية حديثة بإضاءة طبيعية وزخارف هندسية",
      en: "Modern sunlit Saudi university library atrium with geometric latticework",
    },
    heroTitle: {
      ar: "رفيقك الذكي للتميّز الدراسي والجامعي في المملكة",
      en: "Your Smart Companion for Saudi Academic & University Excellence",
    },
    heroSubtitle: {
      ar: "اختر جامعتك وتخصصك الأكاديمي أو مرحلتك الدراسية، ثم ابدأ الشرح التفاعلي وتلخيص المحاضرات وإعداد الاختبارات التجريبية.",
      en: "Select your university and academic major or school stage, then launch interactive explanations, lecture summaries, and practice quizzes.",
    },
    continueCourse: { ar: "متابعة مقرر", en: "Continue" },
    generalEduLabel: { ar: "التعليم العام السعودي", en: "Saudi General Education" },
    customizeHeading: { ar: "تخصيص المسار الدراسي", en: "Customize Academic Track" },
    customizeSubtitle: {
      ar: "حدد التعليم الجامعي أو التعليم العام واختبارات قياس",
      en: "Choose between Higher Education or General Education & Qiyas",
    },
    educationTypeAria: { ar: "نوع التعليم", en: "Education Track" },
    universityTab: { ar: "التعليم الجامعي", en: "University" },
    generalTab: { ar: "التعليم العام وقياس", en: "K-12 & Qiyas" },
    universityLabel: { ar: "الجامعة السعودية", en: "Saudi University" },
    collegeLabel: { ar: "الكلية", en: "College" },
    majorLabel: { ar: "التخصص الأكاديمي", en: "Academic Major" },
    stageLabel: { ar: "المرحلة الدراسية", en: "Academic Stage" },
    coursesHeading: { ar: "المقررات والمواد المتاحة", en: "Available Courses & Subjects" },
    courseCountSuffix: { ar: "مقرر", en: "courses" },
    searchPlaceholder: { ar: "ابحث برمز أو اسم المقرر...", en: "Search by course code or title..." },
    noResultsPrefix: { ar: "لا توجد مقررات مطابقة للبحث", en: "No courses match" },
    activeBadge: { ar: "نشط", en: "Active" },
    selectedCourseBtn: { ar: "المقرر المختار", en: "Selected Course" },
    setActiveBtn: { ar: "تعيين كمقرر نشط", en: "Set as Active" },
    studyNowBtn: { ar: "ادرس الآن", en: "Study Now" },
    viewTrackBtn: { ar: "الخطة المحددة", en: "Selected Plan" },
    viewAllPlansBtn: { ar: "دليل الجامعات والمدارس وقياس", en: "Full Saudi Directory" },
    dirFilterAll: { ar: "الكل", en: "All" },
    dirFilterUnis: { ar: "الجامعات السعودية", en: "Universities" },
    dirFilterSchools: { ar: "المدارس وقياس", en: "K-12 & Qiyas" },
    schoolsSectionHeading: {
      ar: "التعليم العام السعودي واختبارات قياس (القدرات والتحصيلي)",
      en: "Saudi K-12 Schools & Qiyas (Qudurat & Tahsili)",
    },
    allLevels: { ar: "جميع المستويات", en: "All Levels" },
    levelLabel: { ar: "المستوى", en: "Level" },
    sectionLabel: { ar: "القسم", en: "Unit" },
    creditsLabel: { ar: "ساعات", en: "Cr" },
    planHoursSuffix: { ar: "ساعة معتمدة", en: "Credit Hours" },
    majorsSuffix: { ar: "تخصصات", en: "Majors" },
    collegesSuffix: { ar: "كليات", en: "Colleges" },
    allCatalogSearchPlaceholder: {
      ar: "ابحث في جميع الجامعات، الكليات، التخصصات، المدارس، القدرات والتحصيلي...",
      en: "Search all Saudi universities, colleges, majors, K-12, Qudurat & Tahsili...",
    },
    catalogSummary: (
      unis: number,
      colleges: number,
      majors: number,
      courses: number,
      generalCourses: number,
      lang: Language
    ) =>
      lang === "en"
        ? `${unis} Universities · ${colleges} Colleges · ${majors} Majors · ${courses + generalCourses} Courses (incl. K-12, Qudurat & Tahsili)`
        : `${unis} جامعة · ${colleges} كلية · ${majors} تخصصاً · ${courses + generalCourses} مقرراً (تشمل المدارس والقدرات والتحصيلي)`,
  },
  tutor: {
    activeTrackLabel: { ar: "المسار الأكاديمي النشط", en: "Active Academic Track" },
    coursePrefix: { ar: "مقرر", en: "Course" },
    subjectPrefix: { ar: "مادة", en: "Subject" },
    changeCourse: { ar: "تغيير المقرر", en: "Change Course" },
    newChat: { ar: "محادثة جديدة", en: "New Chat" },
    translatingNotice: {
      ar: "جارٍ ترجمة رسائل المحادثة إلى العربية...",
      en: "Translating conversation messages to English...",
    },
    loadingReply: {
      ar: "مِداد AI يجهّز الإجابة...",
      en: "Midad AI is preparing your answer...",
    },
    copy: { ar: "نسخ", en: "Copy" },
    copied: { ar: "تم النسخ", en: "Copied" },
    removeAttachment: { ar: "إزالة المرفق", en: "Remove attachment" },
    attachTitle: { ar: "إرفاق ملف أو صورة", en: "Attach file or image" },
    inputPlaceholderPrefix: {
      ar: "اسأل المعلم الذكي عن",
      en: "Ask the AI Tutor about",
    },
    send: { ar: "إرسال", en: "Send" },
    fileTooLarge: {
      ar: "حجم الملف يتجاوز الحد المسموح به (15 ميجابايت).",
      en: "File size exceeds the 15 MB limit.",
    },
    fileReadError: {
      ar: "تعذر قراءة الملف المرفق.",
      en: "Could not read the attached file.",
    },
    defaultFilePrompt: {
      ar: "اشرح هذا الملف ولخص أهم نقاطه.",
      en: "Explain this file and summarize its key points.",
    },
    unexpectedError: {
      ar: "حدث خطأ غير متوقع.",
      en: "An unexpected error occurred.",
    },
    quickPrompts: [
      {
        id: "concepts",
        ar: "اشرح لي أهم مفاهيم المقرر",
        en: "Explain the core concepts of this course",
      },
      {
        id: "summary",
        ar: "لخّص المقرر في نقاط للمراجعة",
        en: "Summarize this course into key review points",
      },
      {
        id: "quiz",
        ar: "اختبرني بـ 5 أسئلة اختيار من متعدد",
        en: "Quiz me with 5 multiple-choice questions",
      },
      {
        id: "plan",
        ar: "اقترح خطة مذاكرة سريعة للاختبار",
        en: "Suggest a quick exam study plan",
      },
    ],
    welcomeIntro: (courseTitle: string, lang: Language) =>
      lang === "en"
        ? `Welcome to **Midad AI**.\nI am ready to help you with **${courseTitle}**.\n\nAsk for a lesson explanation, chapter summary, or a practice quiz.`
        : `أهلاً بك في **مِداد AI**.\nأنا جاهز لمساعدتك في مقرر **${courseTitle}**.\n\nاطلب شرح درس، تلخيص فصل، أو إعداد أسئلة تدريبية.`,
    welcomeContext: (contextLabel: string, lang: Language) =>
      lang === "en"
        ? `Welcome to **Midad AI**.\nI am ready to help you with:\n**${contextLabel}**\n\nAsk for a lesson explanation, chapter summary, or a practice quiz.`
        : `أهلاً بك في **مِداد AI**.\nأنا جاهز لمساعدتك في:\n**${contextLabel}**\n\nاطلب شرح درس، تلخيص فصل، أو إنشاء اختبار تدريبي.`,
    welcomeActivated: (courseTitle: string, lang: Language) =>
      lang === "en"
        ? `Welcome to **Midad AI**.\nActive course set to **${courseTitle}**.\n\nPick a quick prompt above or type your question below.`
        : `أهلاً بك في **مِداد AI**.\nتم تفعيل مقرر **${courseTitle}**.\n\nاختر أحد الأوامر السريعة بالأعلى أو اكتب سؤالك مباشرة.`,
    continuedFromFile: (fileName: string, lang: Language) =>
      lang === "en"
        ? `I analyzed the file (${fileName}) in the File Lab and would like to discuss its details.`
        : `قمت بتحليل الملف (${fileName}) في مختبر الملفات وأرغب بمناقشة تفاصيله.`,
    modelLabel: { ar: "النموذج:", en: "Model:" },
    modelHydrogen: {
      ar: "Gemini 4 Hydrogen (الأساسي والبحث)",
      en: "Gemini 4 Hydrogen (General & Search)",
    },
    modelLite: {
      ar: "Gemini 3.1 Flash Lite (استجابة سريعة)",
      en: "Gemini 3.1 Flash Lite (Fast)",
    },
    roleLabel: { ar: "دور المعلم:", en: "Tutor Role:" },
    roleAcademic: { ar: "معلم أكاديمي شامل", en: "Academic Tutor" },
    roleSocratic: { ar: "موجه سقراطي (خطوة بخطوة)", en: "Socratic Mentor" },
    roleExam: { ar: "مدرب اختبارات وقياس", en: "Exam & Qiyas Coach" },
    roleConcise: { ar: "مراجع سريع ومكثف", en: "Quick Reviewer" },
    webSearchToggle: { ar: "بحث الويب الموثق", en: "Google Search" },
    webSearchActiveHint: {
      ar: "مفعّل: يتحقق المعلم من المصادر الحية على الويب عبر Gemini 4 Hydrogen.",
      en: "Active: grounding responses with live Google Search via Gemini 4 Hydrogen.",
    },
    sourcesHeading: { ar: "المصادر الموثقة:", en: "Verified Sources:" },
    voiceChatBtn: { ar: "محادثة صوتية مباشرة", en: "Live Voice" },
    voicePanelTitle: {
      ar: "المعلم الصوتي المباشر",
      en: "Live Voice Tutor",
    },
    voicePanelSubtitle: {
      ar: "تحدّث مباشرة مع مِداد AI بصوت حي وتفاعل فوري لمقررك المختار.",
      en: "Speak naturally in real time with Midad AI about your active course.",
    },
    voiceStart: { ar: "بدء التحدث المباشر", en: "Start Voice Chat" },
    voiceEnd: { ar: "إنهاء الجلسة", en: "End Session" },
    voiceMute: { ar: "كتم الميكروفون", en: "Mute Mic" },
    voiceUnmute: { ar: "إلغاء الكتم", en: "Unmute Mic" },
    voiceConnecting: { ar: "جارٍ الاتصال بالمعلم الصوتي...", en: "Connecting to Live Voice..." },
    voiceListening: { ar: "يستمع إليك الآن — تحدّث بحرية", en: "Listening — speak freely" },
    voiceMutedState: { ar: "الميكروفون مكتوم مؤقتاً", en: "Microphone muted" },
    voiceMicDenied: {
      ar: "يرجى السماح بصلاحية الميكروفون في المتصفح لبدء المحادثة الصوتية.",
      en: "Please allow microphone permission in your browser to start Live Voice.",
    },
    voiceConnectionError: {
      ar: "تعذر الاتصال بجلسة الصوت المباشر. حاول مرة أخرى.",
      en: "Could not connect to the Live Voice session. Please try again.",
    },
    voiceUserLabel: { ar: "أنت", en: "You" },
    voiceTutorLabel: { ar: "مِداد AI", en: "Midad AI" },
    voiceEmptyTranscript: {
      ar: "سيظهر نص الحوار الصوتي هنا مباشرة أثناء التحدث.",
      en: "Live conversation transcripts will appear here as you speak.",
    },
    voiceClose: { ar: "إغلاق", en: "Close" },
  },
  files: {
    heading: {
      ar: "مختبر الملفات والشروحات الذكية",
      en: "Smart File Explainer Lab",
    },
    subtitle: {
      ar: "ارفع محاضرة PDF، شرائح PowerPoint، مستند Word، أو صورة صفحة كتاب للحصول على شرح وتلخيص وأسئلة مراجعة.",
      en: "Upload a PDF lecture, PowerPoint slides, Word document, or textbook page image for structured explanations, summaries, and quizzes.",
    },
    dropzoneEmpty: {
      ar: "اضغط أو اسحب الملف هنا لرفعه",
      en: "Click or drag & drop a file here to upload",
    },
    dropzoneSelectedPrefix: {
      ar: "تم اختيار الملف:",
      en: "Selected file:",
    },
    supportedFormats: {
      ar: "يدعم: PDF · Word (.docx) · PowerPoint (.pptx) · الصور (PNG/JPG) · النصوص (.txt)",
      en: "Supports: PDF · Word (.docx) · PowerPoint (.pptx) · Images (PNG/JPG) · Text (.txt)",
    },
    removeFile: { ar: "إزالة الملف", en: "Remove file" },
    modeExplain: { ar: "شرح مبسط ومفصل", en: "Detailed Explanation" },
    modeExplainPrompt: {
      ar: "اشرح محتوى هذا الملف شرحاً مبسطاً ومفصلاً خطوة بخطوة مع أمثلة واضحة.",
      en: "Explain the contents of this file clearly step by step with practical examples.",
    },
    modeSummary: { ar: "تلخيص وجداول مقارنة", en: "Summary & Tables" },
    modeSummaryPrompt: {
      ar: "لخّص محتوى الملف في نقاط مركزة وجداول مقارنة للمراجعة النهائية.",
      en: "Summarize this file into concise bullet points and Markdown comparison tables for final review.",
    },
    modeQuiz: { ar: "أسئلة مراجعة من الملف", en: "Practice Quiz" },
    modeQuizPrompt: {
      ar: "أنشئ 5 أسئلة اختبارية متنوعة من محتوى الملف مع الإجابات الصحيحة والشرح المختصر.",
      en: "Generate 5 varied practice quiz questions from this file with an answer key and brief explanations.",
    },
    customPlaceholder: {
      ar: "أو اكتب طلباً محدداً حول الملف (مثال: استخرج القوانين والتعاريف فقط)...",
      en: "Or enter a custom request (e.g., extract key definitions and formulas only)...",
    },
    analyzeBtn: { ar: "تحليل", en: "Analyze" },
    analyzing: {
      ar: "جارٍ قراءة الملف وتحليل محتواه بواسطة مِداد AI...",
      en: "Reading file and analyzing content with Midad AI...",
    },
    resultHeading: { ar: "نتيجة التحليل والشرح", en: "Analysis & Explanation" },
    copyText: { ar: "نسخ النص", en: "Copy Text" },
    copied: { ar: "تم النسخ", en: "Copied" },
    discussInTutor: { ar: "مناقشة في المعلم الذكي", en: "Discuss in AI Tutor" },
    fileTooLarge: {
      ar: "حجم الملف يتجاوز الحد المسموح به (15 ميجابايت).",
      en: "File size exceeds the 15 MB limit.",
    },
    fileReadError: {
      ar: "تعذر قراءة الملف المختار.",
      en: "Could not read the selected file.",
    },
    analyzeError: {
      ar: "تعذر تحليل الملف حالياً.",
      en: "Could not analyze the file right now.",
    },
    bytes: { ar: "بايت", en: "B" },
    kb: { ar: "كيلوبايت", en: "KB" },
    mb: { ar: "ميجابايت", en: "MB" },
  },
  planner: {
    timerTitle: { ar: "غابة التركيز بنباتات المملكة", en: "Saudi Flora Focus Forest" },
    completedSessions: { ar: "أشجار مزروعة:", en: "Planted trees:" },
    modeFocus: { ar: "جلسة زراعة (تركيز)", en: "Plant Focus" },
    modeShortBreak: { ar: "استراحة قصيرة (5 د)", en: "Short Break (5m)" },
    modeLongBreak: { ar: "استراحة طويلة (15 د)", en: "Long Break (15m)" },
    focusDurationLabel: { ar: "مدة التركيز:", en: "Focus duration:" },
    minutesSuffix: { ar: "د", en: "m" },
    selectPlantLabel: { ar: "اختر نبتتك السعودية للزراعة:", en: "Choose a Saudi native plant:" },
    plantLockedHint: {
      ar: "نبتتك تنمو الآن مع تركيزك؛ التراجع المبكر يؤدي لذبولها.",
      en: "Your plant is growing with your focus; abandoning early will wilt it.",
    },
    stageSeed: { ar: "بادرة صحراوية", en: "Desert Sprout" },
    stageSapling: { ar: "شتلة نامية", en: "Young Sapling" },
    stageGrowing: { ar: "شجيرة يافعة", en: "Growing Strong" },
    stageMature: { ar: "مكتملة النمو", en: "Full Bloom" },
    stageWilted: { ar: "نبتة ذابلة", en: "Wilted Plant" },
    studyTime: { ar: "وقت التركيز والنمو", en: "Focus & Growth" },
    breakTime: { ar: "استراحة الواحة", en: "Oasis Break" },
    pause: { ar: "إيقاف مؤقت", en: "Pause" },
    startOver: { ar: "ازرع مجدداً", en: "Plant Again" },
    startSession: { ar: "ابدأ الزراعة والمذاكرة", en: "Plant & Focus" },
    giveUpBtn: { ar: "إنهاء مبكر", en: "Give Up" },
    reset: { ar: "إعادة ضبط", en: "Reset" },
    justPlantedBanner: {
      ar: "أحسنت! اكتملت جلستك ونمت نبتتك السعودية في واحتك بنجاح.",
      en: "Well done! Your focus session finished and your Saudi plant thrived in your oasis.",
    },
    justWiltedBanner: {
      ar: "توقفت الجلسة قبل اكتمالها فذبلت النبتة؛ ابدأ جلسة جديدة لتعويضها.",
      en: "Session ended early and the plant wilted. Start a new session to grow another!",
    },
    gardenTitle: { ar: "واحتك السعودية المزروعة", en: "Your Saudi Oasis Sanctuary" },
    gardenEmpty: {
      ar: "لم تزرع أي نبتة بعد — اختر نبتة من نباتات المملكة وابدأ أول جلسة تركيز!",
      en: "Your oasis is waiting — pick a native Saudi plant and complete a focus session!",
    },
    thrivingCountLabel: { ar: "نباتات نامية", en: "Thriving" },
    wiltedCountLabel: { ar: "ذابلة", en: "Wilted" },
    totalMinutesLabel: { ar: "دقيقة تركيز", en: "Focus mins" },
    clearGardenBtn: { ar: "تصفير الواحة", en: "Reset Oasis" },
    tasksTitle: { ar: "قائمة مهام المذاكرة اليومية", en: "Daily Study Tasks" },
    tasksProgress: (done: number, total: number, lang: Language) =>
      lang === "en"
        ? `Completed ${done} of ${total} tasks`
        : `أُنجز ${done} من أصل ${total} مهام`,
    filterAll: { ar: "الكل", en: "All" },
    filterPending: { ar: "قيد الإنجاز", en: "Pending" },
    filterDone: { ar: "المكتملة", en: "Completed" },
    newTaskPlaceholder: { ar: "أضف مهمة مذاكرة جديدة...", en: "Add a new study task..." },
    reviewCoursePrefix: { ar: "مراجعة مقرر:", en: "Review:" },
    addBtn: { ar: "إضافة", en: "Add" },
    emptyTasks: {
      ar: "لا توجد مهام في هذه القائمة حالياً.",
      en: "No study tasks in this list yet.",
    },
    deleteTaskAria: { ar: "حذف مهمة", en: "Delete task" },
    defaultTasks: {
      t1: {
        ar: "مراجعة محاضرة مبادئ علم الحركة",
        en: "Review Principles of Kinesiology lecture",
      },
      t2: {
        ar: "تلخيص فصل الفنون التشكيلية والمجتمع",
        en: "Summarize Visual Arts & Society chapter",
      },
    },
    rewards: {
      heading: {
        ar: "نمو نباتاتك السعودية عبر الجلسات",
        en: "Cumulative Saudi Flora Growth Rewards",
      },
      subtitle: {
        ar: "كل جلسة بومودورو مكتملة تُنمّي نبتتك المختارة من بادرة صحراوية حتى تبلغ تمام إثمارها.",
        en: "Every completed Pomodoro session evolves your chosen Saudi plant from a sprout to full bloom.",
      },
      panoramaTitle: {
        ar: "مشهد الواحة التفاعلي",
        en: "Interactive Oasis Panorama",
      },
      panoramaEmpty: {
        ar: "أكمل جلسة واحدة لتزهر أول نبتة سعودية على كثبان واحتك.",
        en: "Complete your first focus session to bloom your first Saudi plant on the dunes.",
      },
      speciesTab: { ar: "نمو الأنواع", en: "Flora Growth" },
      historyTab: { ar: "سجل الجلسات", en: "Session Log" },
      unplantedLabel: { ar: "بذرة جاهزة للزراعة", en: "Ready to plant" },
      sessionsCompletedUnit: { ar: "جلسات", en: "sessions" },
      sessionSingleUnit: { ar: "جلسة", en: "session" },
      levelLabels: [
        { ar: "بذرة · 0 جلسات", en: "Seed · 0 sessions" },
        { ar: "بادرة · جلسة 1", en: "Sprout · Lv.1" },
        { ar: "شتلة · جلستان", en: "Sapling · Lv.2" },
        { ar: "يافعة · 3–4 جلسات", en: "Growing · Lv.3" },
        { ar: "مكتملة مثمرة · 5+ جلسات", en: "Full Bloom · Lv.4" },
      ],
      maxStageReached: { ar: "مكتملة الإثمار", en: "Peak Bloom" },
      nextEvolution: (remaining: number, lang: Language) =>
        lang === "en"
          ? `${remaining} more to evolve`
          : `باقي ${remaining} للتطور التالي`,
      ranks: {
        starter: { ar: "مبتدئ التشجير", en: "Oasis Starter" },
        sprouter: { ar: "غارس البوادر", en: "First Sprouter" },
        rawdah: { ar: "راعي الروضة", en: "Rawdah Keeper" },
        oasis: { ar: "باني الواحة", en: "Oasis Builder" },
        guardian: { ar: "حارس الغطاء النباتي", en: "Saudi Flora Guardian" },
      },
      nextRankProgress: (current: number, target: number, rankName: string, lang: Language) =>
        lang === "en"
          ? `${current}/${target} sessions toward "${rankName}"`
          : `${current} من ${target} جلسات للوصول إلى رتبة «${rankName}»`,
      topRankReached: {
        ar: "بلغت أعلى وسام في واحة المملكة!",
        en: "Top Saudi Oasis rank achieved!",
      },
    },
  },
  footer: {
    tagline: {
      ar: "موقع مِداد AI — منصة تعليمية شاملة لمقررات الجامعات السعودية، التعليم العام، واختبارات قياس.",
      en: "Midad AI — A comprehensive Saudi web platform for university curricula, K-12 schools, and Qiyas exams.",
    },
    linksHeading: {
      ar: "أقسام الموقع",
      en: "Sections",
    },
  },
} as const;
