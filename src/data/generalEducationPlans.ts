import { LocalizedText } from "../i18n/translations";
import type { CourseItem } from "./universityPlans";

export interface GeneralStageItem {
  id: string;
  name: LocalizedText;
  courses: CourseItem[];
}

function g(
  id: string,
  code: string,
  level: number,
  credits: number,
  arTitle: string,
  enTitle: string,
  arFocus: string,
  enFocus: string
): CourseItem {
  return {
    id,
    code,
    level,
    credits,
    title: { ar: arTitle, en: enTitle },
    focus: { ar: arFocus, en: enFocus },
  };
}

export const GENERAL_STAGES_DATA: GeneralStageItem[] = [
  // 1. الابتدائية - الصفوف الأولية (1 - 3)
  {
    id: "primary-lower",
    name: {
      ar: "المرحلة الابتدائية — الصفوف الأولية (١ - ٣)",
      en: "Primary School — Lower Grades (1 - 3)",
    },
    courses: [
      g("pl-lughati", "ARAB 1-3", 1, 5, "لغتي (الصفوف الأولية)", "Arabic Language (Lughati 1-3)", "الهجاء والحروف، القراءة المنطلقة، الإملاء الأساسي، والخط", "Arabic alphabet, reading fluency, basic spelling, and handwriting"),
      g("pl-math", "MATH 1-3", 1, 4, "الرياضيات (١ - ٣ ابتدائي)", "Mathematics (Grades 1-3)", "العد، الجمع والطرح، جداول الضرب، الأشكال الهندسية، والقياس", "Counting, addition, subtraction, multiplication tables, and basic shapes"),
      g("pl-sci", "SCI 1-3", 1, 2, "العلوم (١ - ٣ ابتدائي)", "Science (Grades 1-3)", "الكائنات الحية، المواطن، حالات المادة، والطقس والفصول", "Living organisms, habitats, states of matter, and weather"),
      g("pl-islamic", "ISLM 1-3", 1, 3, "الدراسات الإسلامية والقرآن الكريم", "Islamic Studies & Holy Quran", "السور القصيرة، أركان الإسلام والإيمان، والآداب الإسلامية والوضوء والصلاة", "Short Surahs, pillars of Islam & Iman, manners, and prayer"),
      g("pl-eng", "ENG 1-3", 2, 2, "اللغة الإنجليزية (We Can)", "English Language (We Can 1-3)", "الحروف والأصوات، التحية، الأرقام، والمفردات اليومية البسيطة", "Phonics, greetings, numbers, and everyday vocabulary"),
      g("pl-life", "LIFE 1-3", 2, 1, "المهارات الحياتية والأسرية", "Life & Family Skills", "العادات الصحية، السلامة في المنزل والمدرسة، وإدارة الوقت البسيط", "Healthy habits, home/school safety, and daily routines"),
      g("pl-pe", "PE 1-3", 3, 2, "التربية البدنية والدفاع عن النفس", "Physical Education & Self-Defense", "المهارات الحركية الأساسية، التوازن، الألعاب الصغيرة، واللياقة الأولية", "Fundamental motor skills, balance, lead-up games, and movement"),
      g("pl-art", "ART 1-3", 3, 1, "التربية الفنية", "Art Education", "الألوان الأساسية والثانوية، الرسم الحر، والتشكيل بالورق والصلصال", "Primary/secondary colors, drawing, paper craft, and clay"),
    ],
  },

  // 2. الابتدائية - الصفوف العليا (4 - 6)
  {
    id: "primary-upper",
    name: {
      ar: "المرحلة الابتدائية — الصفوف العليا (٤ - ٦)",
      en: "Primary School — Upper Grades (4 - 6)",
    },
    courses: [
      g("pu-lughati", "ARAB 4-6", 4, 5, "لغتي الجميلة (٤ - ٦ ابتدائي)", "Arabic Language (Lughati 4-6)", "المبتدأ والخبر، الفاعل والمفعول، الأسماء الخمسة، التعبير الكتابي والإملاء", "Arabic syntax basics, sentence structure, essay writing, and dictation"),
      g("pu-math", "MATH 4-6", 4, 5, "الرياضيات (٤ - ٦ ابتدائي)", "Mathematics (Grades 4-6)", "الكسور الاعتيادية والعشرية، النسبة والتناسب، المساحات والحجوم، والإحصاء", "Fractions, decimals, ratios, area/volume geometry, and basic statistics"),
      g("pu-sci", "SCI 4-6", 4, 4, "العلوم (٤ - ٦ ابتدائي)", "Science (Grades 4-6)", "أجهزة جسم الإنسان، الخلايا، القوى والحركة، الكهرباء، والنظام الشمسي", "Human body systems, cells, forces, electricity, and the solar system"),
      g("pu-islamic", "ISLM 4-6", 5, 4, "الدراسات الإسلامية والقرآن وتجويده", "Islamic Studies & Quran Tajweed", "التوحيد، فقه العبادات، الحديث والسيرة النبوية، وأحكام التجويد المبسطة", "Tawheed, Fiqh of worship, Hadith, Seerah, and introductory Tajweed"),
      g("pu-social", "SOC 4-6", 5, 2, "الدراسات الاجتماعية والمواطنة", "Social Studies & Citizenship", "تاريخ الدولة السعودية، جغرافية المملكة والوطن العربي، والهوية الوطنية", "Saudi history, Kingdom & Arab geography, and civic citizenship"),
      g("pu-eng", "ENG 4-6", 5, 3, "اللغة الإنجليزية (Top Goal / We Can)", "English Language (Grades 4-6)", "الأزمنة البسيطة، تكوين الجمل، القراءة القصيرة، والمحادثة اليومية", "Simple tenses, sentence building, short reading, and everyday dialogue"),
      g("pu-digital", "DIGI 4-6", 6, 2, "المهارات الرقمية (٤ - ٦ ابتدائي)", "Digital Skills (Grades 4-6)", "معالجة النصوص، العروض التقديمية، البرمجة باللبنات (Scratch)، والسلامة الرقمية", "Word processing, presentations, Scratch block coding, and digital safety"),
      g("pu-pe-art", "PEAR 4-6", 6, 2, "التربية البدنية والفنية والأسرية", "PE, Art & Life Skills (4-6)", "أساسيات الألعاب الجماعية، الظل والنور والزخرفة، والمهارات الحياتية", "Team sport basics, shading & ornament art, and practical life skills"),
    ],
  },

  // 3. المرحلة المتوسطة (1 - 3 متوسط)
  {
    id: "intermediate",
    name: {
      ar: "المرحلة المتوسطة (الأول – الثالث متوسط)",
      en: "Intermediate School (Grades 7 - 9)",
    },
    courses: [
      g("mid-lughati", "ARAB 7-9", 1, 5, "لغتي الخالدة (١ - ٣ متوسط)", "Arabic Language (Lughati Al-Khalida)", "المعرب والمبني، المشتقات، الأساليب اللغوية، التحليل الأدبي والكتابة الوظيفية", "Inflection, morphology, stylistic analysis, and functional writing"),
      g("mid-math", "MATH 7-9", 1, 5, "الرياضيات (١ - ٣ متوسط)", "Mathematics (Grades 7-9)", "المعادلات الخطية والتربيعية، كثيرات الحدود، نظرية فيثاغورس، والدوال", "Linear & quadratic equations, polynomials, Pythagorean theorem, and functions"),
      g("mid-sci", "SCI 7-9", 1, 4, "العلوم (١ - ٣ متوسط)", "Science (Grades 7-9)", "بنية الذرة والجدول الدوري، قوانين نيوتن، الوراثة، والصفائح الأرضية", "Atomic structure, Newton's laws, genetics, and plate tectonics"),
      g("mid-islamic", "ISLM 7-9", 2, 4, "الدراسات الإسلامية والقرآن (متوسط)", "Islamic Studies & Quran (7-9)", "التفسير الميسر، الحديث النبوي، فقه المعاملات والعبادات، والعقيدة", "Quran Tafsir, Hadith studies, Fiqh of transactions, and Aqeedah"),
      g("mid-eng", "ENG 7-9", 2, 4, "اللغة الإنجليزية (Super Goal)", "English (Super Goal 1-3)", "الأزمنة المركبة، المقارنة، الاستماع والتحدث، وكتابة الفقرات المنظمة", "Intermediate grammar, reading comprehension, and structured paragraphs"),
      g("mid-social", "SOC 7-9", 2, 2, "الدراسات الاجتماعية (متوسط)", "Social Studies (Grades 7-9)", "التاريخ الإسلامي، الدولة السعودية الأولى والثانية والثالثة، ورؤية ٢٠٣٠", "Islamic & Saudi history, economic geography, and Vision 2030"),
      g("mid-digital", "DIGI 7-9", 3, 2, "المهارات الرقمية (متوسط)", "Digital Skills (Grades 7-9)", "البرمجة بلغة بايثون، جداول البيانات، تصميم المواقع HTML، والأمن السيبراني", "Python fundamentals, spreadsheets, HTML web design, and cybersecurity"),
      g("mid-critical", "CRIT 7-9", 3, 2, "التفكير الناقد والمهارات الحياتية", "Critical Thinking & Life Skills", "مهارات الاستدلال المنطقي، حل المشكلات، الحوار، والتوعية الصحية", "Logical reasoning, problem solving, constructive dialogue, and health"),
      g("mid-pe-art", "PEAR 7-9", 3, 2, "التربية البدنية والصحية والفنية", "PE, Health & Art Education", "مهارات كرة القدم والسلة والطائرة، اللياقة البدنية، والطباعة والخزف", "Team sports, physical conditioning, printmaking, and ceramics"),
    ],
  },

  // 4. الأول الثانوي - السنة المشتركة (نظام المسارات)
  {
    id: "hs-common",
    name: {
      ar: "الأول الثانوي — السنة المشتركة (نظام المسارات)",
      en: "High School — First Year Common Track",
    },
    courses: [
      g("hsc-math1", "MATH 1", 1, 5, "الرياضيات (١-١ / ١-٢ / ١-٣)", "Mathematics 1 (Algebra & Geometry)", "التبرير والبرهان، التوازي والتعامد، المثلثات المتطابقة والمتشابهة، والدائرة", "Geometric proofs, congruence, similarity, trigonometry basics, and circles"),
      g("hsc-phys1", "PHYS 1", 1, 4, "الفيزياء (١)", "Physics 1", "القياس، تمثيل الحركة، التسارع، القوة والحركة في بعدين، والجاذبية", "Measurement, kinematics, Newton's laws, 2D motion, and gravitation"),
      g("hsc-chem1", "CHEM 1", 1, 4, "الكيمياء (١)", "Chemistry 1", "المادة وتغيراتها، الذرة، التفاعلات والمعادلات الكيميائية، والمول", "Matter, atomic theory, chemical equations, and stoichiometry (the mole)"),
      g("hsc-bio1", "BIOL 1", 2, 4, "الأحياء (١)", "Biology 1", "تصنيف المخلوقات، البكتيريا والفيروسات، الطلائعيات، الفطريات، واللافقاريات", "Taxonomy, microbiology, protists, fungi, and invertebrates"),
      g("hsc-eco", "ECOL 1", 2, 3, "علم البيئة", "Ecology", "الأنظمة البيئية، السلاسل الغذائية، التنوع الحيوي، والمحافظة على البيئة", "Ecosystems, energy flow, biodiversity, and environmental conservation"),
      g("hsc-arab1", "ARAB 1-2", 2, 4, "الكفايات اللغوية (١ - ٢)", "Arabic Language Competencies (1-2)", "النحو الأساسي، القراءة التحليلية، الإملاء والترقيم، والكتابة الأدبية", "Core Arabic grammar, analytical reading, punctuation, and essay writing"),
      g("hsc-eng1", "ENG 1", 2, 4, "اللغة الإنجليزية (Mega Goal 1)", "English (Mega Goal 1)", "تنمية القراءة الأكاديمية، القواعد المتقدمة، والمحادثة والكتابة", "Academic reading, grammar synthesis, speaking, and writing"),
      g("hsc-tech1", "TECH 1", 3, 3, "التقنية الرقمية (١)", "Digital Technology 1", "أنظمة العد، أساسيات الشبكات، البرمجة ببايثون، والمستندات الرقمية", "Number systems, network basics, Python coding, and digital productivity"),
      g("hsc-fitness", "FIT 1", 3, 3, "اللياقة والثقافة الصحية", "Fitness & Health Culture", "مكونات اللياقة البدنية، التغذية السليمة، الوقاية من الأمراض، والإسعافات", "Fitness components, nutrition, disease prevention, and first aid"),
      g("hsc-crit-fin", "CFIN 1", 3, 2, "التفكير الناقد والمعرفة المالية والتربية المهنية", "Critical Thinking, Financial Literacy & Career Ed", "اتخاذ القرار، الميزانية الشخصية، والمهارات المهنية", "Decision making, personal budgeting, and career readiness"),
    ],
  },

  // 5. المرحلة الثانوية - المسار العام (٢ - ٣ ثانوي)
  {
    id: "hs-general",
    name: {
      ar: "المرحلة الثانوية — المسار العام (٢ - ٣ ثانوي)",
      en: "High School — General Track (Grades 11 - 12)",
    },
    courses: [
      g("hsg-math23", "MATH 2-3", 2, 5, "الرياضيات (٢ و ٣)", "Mathematics 2 & 3", "المصفوفات، كثيرات الحدود، الدوال، القطوع المخروطية، المتجهات، التفاضل والتكامل", "Matrices, functions, conic sections, vectors, and calculus"),
      g("hsg-phys23", "PHYS 2-3", 2, 4, "الفيزياء (٢ و ٣)", "Physics 2 & 3", "الحركة الدورانية، الزخم، الديناميكا الحرارية، الكهرباء، المغناطيسية، وفيزياء الكم", "Rotational motion, momentum, thermodynamics, electromagnetism, and quantum"),
      g("hsg-chem23", "CHEM 2-3", 2, 4, "الكيمياء (٢ و ٣)", "Chemistry 2 & 3", "الروابط الكيميائية، الغازات، المحاليل، الاتزان، الأحماض والقواعد، والعضوية", "Bonding, gas laws, solutions, equilibrium, acids/bases, and organic chemistry"),
      g("hsg-bio23", "BIOL 2-3", 2, 4, "الأحياء (٢ و ٣)", "Biology 2 & 3", "الفقاريات، أجهزة جسم الإنسان، الخلية والطاقة، الوراثة الجزيئية، والـ DNA", "Vertebrates, human physiology, cellular energy, and molecular genetics"),
      g("hsg-earth", "ERTH 1-2", 3, 3, "علم الأرض والفضاء", "Earth & Space Science", "الكون والنجوم، المعادن والصخور، الطقس والمناخ، والموارد الجيولوجية بالمملكة", "Cosmology, minerals & rocks, meteorology, and Saudi geology"),
      g("hsg-eng23", "ENG 2-3", 3, 4, "اللغة الإنجليزية (Mega Goal 2 - 3)", "English (Mega Goal 2-3)", "الكتابة الجدلية والتفسيرية، القواعد المتقدمة، واستراتيجيات القراءة", "Argumentative writing, advanced grammar, and reading strategies"),
      g("hsg-arab34", "ARAB 3-4", 3, 4, "الكفايات اللغوية والدراسات الأدبية والنقدية", "Arabic Linguistics & Literary Studies", "البلاغة، الأدب العربي والسعودي، النقد، والخطابة والإلقاء", "Rhetoric, Saudi/Arabic literature, criticism, and public speaking"),
      g("hsg-tech23", "TECH 2-3", 3, 3, "التقنية الرقمية (٢ و ٣)", "Digital Technology 2 & 3", "علم البيانات، الذكاء الاصطناعي، تصميم التطبيقات، وإدارة المشاريع الرقمية", "Data science, AI concepts, app design, and digital project management"),
      g("hsg-islm", "ISLM 2-3", 3, 3, "التوحيد والفقه (ثانوي)", "Tawheed & Fiqh (High School)", "العقيدة الإسلامية، فقه المعاملات والأسرة، ومقاصد الشريعة", "Islamic creed, family & commercial jurisprudence, and Maqasid"),
      g("hsg-capstone", "RES 3", 3, 2, "البحث ومصادر المعلومات ومشروع التخرج", "Research Methods & High School Capstone", "إعداد الأبحاث العلمية وتوثيق المصادر ومشروع التخرج", "Scientific research methodology and senior graduation project"),
    ],
  },

  // 6. الثانوية - مسار علوم الحاسب والهندسة
  {
    id: "hs-cs-eng",
    name: {
      ar: "الثانوية — مسار علوم الحاسب والهندسة",
      en: "High School — Computer Science & Engineering Pathway",
    },
    courses: [
      g("hsce-ds", "DATA 2", 2, 3, "علم البيانات (ثانوي)", "Data Science (High School)", "جمع البيانات وتنظيفها، التحليل الاستكشافي، والتمثيل المرئي في بايثون", "Data collection, cleaning, exploratory analysis, and visualization"),
      g("hsce-ai", "AI 3", 3, 3, "الذكاء الاصطناعي (ثانوي)", "Artificial Intelligence (High School)", "تعلم الآلة، الشبكات العصبية المبسطة، ومعالجة الصور واللغة", "Machine learning basics, neural networks, vision, and NLP"),
      g("hsce-cys", "CYBR 3", 3, 3, "الأمن السيبراني (ثانوي)", "Cybersecurity (High School)", "التشفير، أمن الشبكات والأنظمة، الهندسة الاجتماعية، وإدارة المخاطر", "Cryptography, network security, social engineering, and risk defense"),
      g("hsce-iot", "IOT 2", 2, 3, "إنترنت الأشياء", "Internet of Things (IoT)", "المستشعرات، المتحكمات الدقيقة، وبناء الأنظمة الذكية المتصلة", "Sensors, microcontrollers, and connected smart systems"),
      g("hsce-swe", "SWE 3", 3, 3, "هندسة البرمجيات (ثانوي)", "Software Engineering (High School)", "دورة حياة البرمجيات، التصميم، البرمجة الكائنية، واختبار التطبيقات", "SDLC, software modeling, OOP, and application testing"),
      g("hsce-eng", "ENGR 3", 3, 4, "الهندسة (التصميم الهندسي)", "Engineering & Design", "الرسم الهندسي CAD، الميكانيكا التطبيقية، والدوائر الكهربائية، والروبوتات", "CAD drafting, applied mechanics, circuits, and robotics"),
      g("hsce-stem", "STEM 2-3", 2, 5, "الرياضيات والفيزياء والكيمياء المتقدمة", "Advanced STEM Core (Math, Physics, Chem)", "حساب التفاضل والتكامل، الميكانيكا والكهرباء، والكيمياء التطبيقية", "Calculus, physics mechanics/electricity, and applied chemistry"),
    ],
  },

  // 7. الثانوية - مسار الصحة والحياة
  {
    id: "hs-health",
    name: {
      ar: "الثانوية — مسار الصحة والحياة",
      en: "High School — Health & Life Sciences Pathway",
    },
    courses: [
      g("hsh-hs", "HLTH 2", 2, 4, "مبادئ العلوم الصحية", "Principles of Health Sciences", "أنظمة الرعاية الصحية، المصطلحات الطبية، ومكافحة العدوى", "Healthcare systems, medical terminology, and infection control"),
      g("hsh-care", "CARE 3", 3, 4, "الرعاية الصحية", "Healthcare Delivery & Clinical Skills", "العلامات الحيوية، رعاية المرضى، السلامة الدوائية، والإسعافات المتقدمة", "Vital signs, patient care, medication safety, and emergency care"),
      g("hsh-medsys", "MSYS 3", 3, 3, "أنظمة جسم الإنسان (الأنظمة الطبية)", "Human Body & Medical Systems", "التشريح ووظائف الأعضاء للجهاز العصبي والقلبي والتنفسي والهضمي", "Anatomy and physiology of major human body systems"),
      g("hsh-stat", "BSTA 3", 3, 3, "الإحصاء والبحث الطبي", "Biostatistics & Health Research", "الاحتمالات والإحصاء التطبيقي في الدراسات الصحية والسريرية", "Probability and applied statistics in clinical studies"),
      g("hsh-bio-chem", "BIOC 2-3", 2, 5, "الأحياء والكيمياء المتقدمة والبيئة", "Advanced Biology, Chemistry & Ecology", "الكيمياء الحيوية، الوراثة الجزيئية، والتغذية العلاجية", "Biochemistry, molecular genetics, and therapeutic nutrition"),
    ],
  },

  // 8. الثانوية - مسار إدارة الأعمال
  {
    id: "hs-business",
    name: {
      ar: "الثانوية — مسار إدارة الأعمال",
      en: "High School — Business Administration Pathway",
    },
    courses: [
      g("hsb-mgt", "BMGT 2", 2, 3, "مبادئ الإدارة", "Principles of Management", "التخطيط، التنظيم، القيادة، الرقابة، وبناء الهياكل الإدارية", "Planning, organizing, leading, controlling, and org design"),
      g("hsb-acct", "ACCT 2", 2, 4, "المحاسبة المالية (ثانوي)", "Financial Accounting (High School)", "الدورة المحاسبية، القيود، دفتر الأستاذ، والقوائم المالية", "Accounting cycle, journal entries, ledgers, and statements"),
      g("hsb-econ", "ECON 3", 3, 3, "مبادئ الاقتصاد", "Principles of Economics", "العرض والطلب، الأسواق، التضخم، السياسة المالية والنقدية", "Supply & demand, market structures, inflation, and policy"),
      g("hsb-law", "BLAW 3", 3, 3, "مبادئ القانون التجاري", "Principles of Commercial Law", "العقود، الشركات التجارية، الملكية الفكرية، ونظام العمل السعودي", "Contracts, corporate law, IP, and Saudi labor regulations"),
      g("hsb-mkt", "BMKT 3", 3, 3, "التسويق وريادة الأعمال", "Marketing & Entrepreneurship", "أبحاث السوق، التسويق الرقمي، ودراسة الجدوى للمشاريع الناشئة", "Market research, digital marketing, and startup feasibility"),
      g("hsb-office", "OADM 3", 3, 2, "السكرتارية والإدارة المكتبية وصناعة القرار", "Office Admin & Decision Making", "إدارة المكاتب الحديثة، المراسلات، والتحليل الإحصائي للأعمال", "Modern office management, communications, and business stats"),
    ],
  },

  // 9. الثانوية - المسار الشرعي
  {
    id: "hs-sharia",
    name: {
      ar: "الثانوية — المسار الشرعي",
      en: "High School — Sharia & Islamic Law Pathway",
    },
    courses: [
      g("hss-usul", "USUL 2", 2, 3, "أصول الفقه (ثانوي)", "Principles of Jurisprudence (Usul)", "الأدلة الشرعية المتفق عليها والمختلف فيها، ودلالات الألفاظ والاجتهاد", "Primary & secondary Sharia sources and legal interpretation"),
      g("hss-faraid", "FRID 3", 3, 3, "الفرائض والمواريث", "Islamic Inheritance Law (Faraid)", "أصحاب الفروض، العصبات، الحجب، وحل مسائل المواريث الحسابية", "Heir shares, residuary heirs, exclusion rules, and distribution"),
      g("hss-hadith", "HADT 2", 2, 3, "الحديث ومصطلح الحديث", "Hadith & Hadith Sciences", "تصحيح وتضعيف الأحاديث، الجرح والتعديل، ودراسة الأسانيد", "Hadith authentication, narrator criticism, and isnad chains"),
      g("hss-quran", "QURN 2-3", 2, 4, "القراءات والتفسير وعلوم القرآن", "Quranic Recitations & Tafsir", "مناهج المفسرين، أسباب النزول، وأصول القراءات السبع", "Tafsir methodologies, revelation context, and Qira'at"),
      g("hss-law-rhet", "LRHT 3", 3, 4, "مبادئ القانون والدراسات البلاغية", "Principles of Law & Arabic Rhetoric", "الأنظمة القضائية السعودية، البيان والبديع والمعاني", "Saudi judicial principles and advanced Arabic rhetoric"),
    ],
  },

  // 10. اختبارات قياس — القدرات العامة (كمي ولفظي)
  {
    id: "qiyas-qudurat",
    name: {
      ar: "قياس — اختبار القدرات العامة (كمي ولفظي)",
      en: "Qiyas — General Aptitude Test (Qudurat GAT)",
    },
    courses: [
      g("gat-q-arith", "GAT-Q1", 1, 3, "القدرات الكمي: الحساب والنسب والتناسب", "GAT Quantitative: Arithmetic, Ratios & Percentages", "العمليات السريعة، الكسور، النسب المئوية، التناسب الطردي والعكسي، والزكاة والربح", "Fast calculation, fractions, percentages, direct/inverse proportion"),
      g("gat-q-alg", "GAT-Q2", 1, 3, "القدرات الكمي: الجبر والأسس والجذور", "GAT Quantitative: Algebra, Exponents & Roots", "حل المعادلات والمتباينات، المتتابعات، قوانين الأسس والجذور، والأعمار والحركة", "Equations, inequalities, sequences, exponents, roots, and word problems"),
      g("gat-q-geo", "GAT-Q3", 1, 3, "القدرات الكمي: الهندسة والمساحات والزوايا", "GAT Quantitative: Geometry, Areas & Angles", "المثلثات المشهورة، الدائرة، المضلعات، الحجوم، والمحيطات والأشكال المظللة", "Triangles, circles, polygons, volumes, and shaded-region problems"),
      g("gat-q-stat", "GAT-Q4", 1, 3, "القدرات الكمي: الإحصاء والاحتمالات والمقارنات", "GAT Quantitative: Statistics, Graphs & Comparisons", "المتوسط والوسيط، قراءة الأعمدة والقطاعات الدائرية، وأسئلة المقارنة (أ، ب، ج، د)", "Mean/median, chart interpretation, and quantitative comparison logic"),
      g("gat-v-analogy", "GAT-V1", 2, 3, "القدرات اللفظي: التناظر اللفظي", "GAT Verbal: Verbal Analogies", "العلاقات الدلالية (الترادف، التضاد، السببية، الجزء والكل، التدرج، والآلة)", "Semantic relationships: synonymy, antonymy, cause-effect, part-whole"),
      g("gat-v-comp", "GAT-V2", 2, 3, "القدرات اللفظي: إكمال الجمل", "GAT Verbal: Sentence Completion", "اختيار المفردات الدقيقة المتوافقة مع السياق المنطقي والبلاغي للجملة", "Contextual vocabulary selection and logical sentence flow"),
      g("gat-v-err", "GAT-V3", 2, 3, "القدرات اللفظي: الخطأ السياقي والمفردة الشاذة", "GAT Verbal: Contextual Error & Odd Word Out", "اكتشاف الكلمة المخالفة لمعنى الجملة العام والربط والتمييز بين المفردات", "Detecting context-breaking words and semantic outliers"),
      g("gat-v-read", "GAT-V4", 2, 3, "القدرات اللفظي: استيعاب المقروء", "GAT Verbal: Reading Comprehension", "استخراج الفكرة الرئيسة، العلاقات الضمنية، الضمائر العائدة، والعنوان الأنسب", "Main idea extraction, inference, pronoun reference, and title selection"),
      g("gat-mock", "GAT-SIM", 3, 3, "النماذج المحوسبة واختبارات السرعة المحاكية", "GAT Computerized Mock Tests & Pacing", "تدريبات التوقيت (دقيقة لكل سؤال)، بنوك النماذج الحديثة، وتحليل الأخطاء", "Timed 1-min/question drills, model banks, and error diagnostics"),
    ],
  },

  // 11. اختبارات قياس — الاختبار التحصيلي (العلمي والأدبي)
  {
    id: "qiyas-tahsili",
    name: {
      ar: "قياس — الاختبار التحصيلي (العلمي والأدبي)",
      en: "Qiyas — Achievement Test (Tahsili Science & Arts)",
    },
    courses: [
      g("tah-math", "TAH-MATH", 1, 4, "التحصيلي العلمي: الرياضيات (ثانوي ١-٣)", "Tahsili Science: Mathematics (Grades 10-12)", "المنطق والهندسة، الدوال والمصفوفات، المثلثات، القطوع، النهايات والاشتقاق والتكامل", "Proofs, functions, matrices, trig, conics, limits, and calculus"),
      g("tah-phys", "TAH-PHYS", 1, 4, "التحصيلي العلمي: الفيزياء (ثانوي ١-٣)", "Tahsili Science: Physics (Grades 10-12)", "الميكانيكا والطاقة، الموجات والضوء، الكهرباء الساكنة والتيارية، والمغناطيسية والذرة", "Mechanics, waves/optics, electrostatics, circuits, magnetism, and atomic"),
      g("tah-chem", "TAH-CHEM", 1, 4, "التحصيلي العلمي: الكيمياء (ثانوي ١-٣)", "Tahsili Science: Chemistry (Grades 10-12)", "الذرة والجدول الدوري، الحساب الكيميائي، المحاليل والاتزان، الأكسدة والاختزال والعضوية", "Periodicity, stoichiometry, equilibrium, electrochemistry, and organic"),
      g("tah-biol", "TAH-BIOL", 1, 4, "التحصيلي العلمي: الأحياء وعلم البيئة", "Tahsili Science: Biology & Ecology", "التصنيف، الخلية والأيض، الوراثة المندلية والجزيئية، أجهزة الإنسان، والبيئة", "Taxonomy, cellular metabolism, genetics, human physiology, and ecology"),
      g("tah-islm", "TAH-ISLM", 2, 3, "التحصيلي الأدبي: الدراسات الإسلامية", "Tahsili Arts: Islamic Studies", "التوحيد والعقيدة، الحديث ومصطلحه، الفقه وأصوله، والفرائض والتفسير", "Aqeedah, Hadith terminology, Fiqh, Usul, inheritance, and Tafsir"),
      g("tah-arab", "TAH-ARAB", 2, 3, "التحصيلي الأدبي: اللغة العربية والأدب والبلاغة", "Tahsili Arts: Arabic, Literature & Rhetoric", "النحو والصرف، علم البيان والبديع والمعاني، العصور الأدبية والنقد", "Syntax, morphology, Arabic rhetoric, literary eras, and criticism"),
      g("tah-soc", "TAH-SOC", 2, 3, "التحصيلي الأدبي: التاريخ والجغرافيا", "Tahsili Arts: History & Geography", "التاريخ الإسلامي والسعودي، الجغرافيا الطبيعية والبشرية، والخرائط", "Islamic & Saudi history, physical & human geography"),
      g("tah-mock", "TAH-SIM", 3, 3, "تجميعات التحصيلي والاختبارات التجريبية الشاملة", "Tahsili Mock Exams & Comprehensive Drills", "اختبارات محاكية شاملة مع توزيع الأوزان (٢٠٪ أول، ٣٠٪ ثاني، ٥٠٪ ثالث ثانوي)", "Full weighted mock exams (20% G10, 30% G11, 50% G12) & review"),
    ],
  },
];
