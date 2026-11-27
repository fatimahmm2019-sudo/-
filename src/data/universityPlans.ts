import { LocalizedText } from "../i18n/translations";
import {
  buildMajorPlan,
  CourseTemplate,
  TPL_AGRI_VET,
  TPL_AI_DS,
  TPL_ALLIED_HEALTH,
  TPL_ARCH,
  TPL_ARTS_DES,
  TPL_BUS_MGT,
  TPL_CHE_PETE,
  TPL_CIV,
  TPL_CS,
  TPL_CYS,
  TPL_DENT,
  TPL_EDU_CURR,
  TPL_EE,
  TPL_FIN_ACCT,
  TPL_IE,
  TPL_IS_IT,
  TPL_LANG_MEDIA,
  TPL_ME,
  TPL_MED,
  TPL_NURS,
  TPL_PHARM,
  TPL_SCI_MATH,
  TPL_SHARIA_LAW,
  TPL_SWE,
} from "./disciplineTemplates";
import {
  createRegionalSportMajor,
  KFU_SPORT_SCIENCES_MAJOR,
  KKU_SPORT_MAJOR,
  KSU_SPORT_MAJORS,
  PNU_SPORT_MAJORS,
  QU_SPORT_MAJOR,
  TAIBAH_SPORT_MAJOR,
  UJ_SPORT_MAJORS,
  UQU_SPORT_MAJOR,
} from "./sportSciencePlans";

export interface CourseItem {
  id: string;
  code: string;
  level: number;
  credits: number;
  title: LocalizedText;
  focus: LocalizedText;
}

export interface MajorItem {
  id: string;
  totalCredits: number;
  name: LocalizedText;
  courses: CourseItem[];
}

export interface CollegeItem {
  id: string;
  name: LocalizedText;
  majors: MajorItem[];
}

export interface UniversityPlanData {
  id: string;
  city: LocalizedText;
  name: LocalizedText;
  colleges: CollegeItem[];
}

function m(
  uniId: string,
  majorId: string,
  arName: string,
  enName: string,
  totalCredits: number,
  tpl: CourseTemplate[],
  extras: CourseItem[] = []
): MajorItem {
  return buildMajorPlan(uniId, majorId, { ar: arName, en: enName }, totalCredits, tpl, extras);
}

function col(
  uniId: string,
  colId: string,
  arName: string,
  enName: string,
  majors: MajorItem[]
): CollegeItem {
  return {
    id: `${uniId}-${colId}`,
    name: { ar: arName, en: enName },
    majors,
  };
}

export const UNIVERSITIES_PLANS: UniversityPlanData[] = [
  // ==========================================================================
  // 1. جامعة الملك فيصل - الأحساء
  // ==========================================================================
  {
    id: "kfu",
    city: { ar: "الأحساء", en: "Al-Ahsa" },
    name: { ar: "جامعة الملك فيصل", en: "King Faisal University" },
    colleges: [
      {
        id: "kfu-edu",
        name: { ar: "كلية التربية", en: "College of Education" },
        majors: [
          KFU_SPORT_SCIENCES_MAJOR,
          m("kfu", "art", "الفنون الجميلة (التربية الفنية)", "Fine Arts (Art Education)", 128, TPL_ARTS_DES),
          m("kfu", "curr", "المناهج وطرق التدريس", "Curriculum & Instruction", 126, TPL_EDU_CURR),
          m("kfu", "sped", "التربية الخاصة ورياض الأطفال", "Special Education & Early Childhood", 128, TPL_EDU_CURR),
        ],
      },
      col("kfu", "cs", "كلية علوم الحاسب وتقنية المعلومات", "College of Computer Science & IT", [
        m("kfu", "cs-major", "علوم الحاسب", "Computer Science", 132, TPL_CS),
        m("kfu", "is-major", "نظم المعلومات", "Information Systems", 130, TPL_IS_IT),
        m("kfu", "cys-major", "الأمن السيبراني وشبكات الحاسب", "Cybersecurity & Computer Networks", 132, TPL_CYS),
        m("kfu", "ai-major", "الذكاء الاصطناعي وعلوم البيانات", "Artificial Intelligence & Data Science", 132, TPL_AI_DS),
      ]),
      col("kfu", "med", "كلية الطب والعلوم الطبية التطبيقية", "Colleges of Medicine & Applied Medical Sciences", [
        m("kfu", "med-major", "الطب والجراحة", "Medicine & Surgery (MBBS)", 190, TPL_MED),
        m("kfu", "ams-major", "التمريض والمختبرات السريرية والغذاء", "Nursing, Clinical Lab & Nutrition", 136, TPL_NURS),
      ]),
      col("kfu", "pharm-dent", "كلية الصيدلة الإكلينيكية وطب الأسنان", "Colleges of Clinical Pharmacy & Dentistry", [
        m("kfu", "pharm", "دكتور صيدلة (PharmD)", "Doctor of Pharmacy (PharmD)", 168, TPL_PHARM),
        m("kfu", "dent", "طب وجراحة الفم والأسنان", "Dental Medicine & Surgery", 182, TPL_DENT),
      ]),
      col("kfu", "eng", "كلية الهندسة", "College of Engineering", [
        m("kfu", "ee", "الهندسة الكهربائية", "Electrical Engineering", 136, TPL_EE),
        m("kfu", "me", "الهندسة الميكانيكية", "Mechanical Engineering", 136, TPL_ME),
        m("kfu", "civ", "الهندسة المدنية والبيئية", "Civil & Environmental Engineering", 136, TPL_CIV),
        m("kfu", "che", "الهندسة الكيميائية", "Chemical Engineering", 136, TPL_CHE_PETE),
      ]),
      col("kfu", "bus", "كلية إدارة الأعمال", "College of Business Administration", [
        m("kfu", "bus-mgt", "إدارة الأعمال والموارد البشرية", "Business Management & HR", 126, TPL_BUS_MGT),
        m("kfu", "bus-fin", "المالية والمحاسبة والاقتصاد", "Finance, Accounting & Economics", 126, TPL_FIN_ACCT),
        m("kfu", "bus-mis", "نظم المعلومات الإدارية", "Management Information Systems", 126, TPL_IS_IT),
      ]),
      col("kfu", "agri-vet", "كلية العلوم الزراعية والأغذية والطب البيطري", "Colleges of Agricultural Sciences & Veterinary Medicine", [
        m("kfu", "agri", "علوم الأغذية والتقنية الزراعية", "Food Science & Agricultural Engineering", 132, TPL_AGRI_VET),
        m("kfu", "vet", "الطب البيطري", "Veterinary Medicine", 168, TPL_AGRI_VET),
      ]),
      col("kfu", "sharia-arts", "كلية الشريعة والحقوق والآداب والعلوم", "Colleges of Sharia, Law, Arts & Sciences", [
        m("kfu", "law", "الأنظمة والدراسات الإسلامية", "Law & Islamic Studies", 130, TPL_SHARIA_LAW),
        m("kfu", "lang", "اللغة العربية والإنجليزية والاتصال", "Arabic, English & Media", 128, TPL_LANG_MEDIA),
        m("kfu", "sci", "الرياضيات والفيزياء والكيمياء والأحياء", "Mathematics, Physics, Chemistry & Biology", 130, TPL_SCI_MATH),
      ]),
    ],
  },

  // ==========================================================================
  // 2. جامعة الملك سعود - الرياض
  // ==========================================================================
  {
    id: "ksu",
    city: { ar: "الرياض", en: "Riyadh" },
    name: { ar: "جامعة الملك سعود", en: "King Saud University" },
    colleges: [
      {
        id: "ksu-sport",
        name: { ar: "كلية علوم الرياضة والنشاط البدني", en: "College of Sport Sciences & Physical Activity" },
        majors: KSU_SPORT_MAJORS,
      },
      col("ksu", "ccis", "كلية علوم الحاسب والمعلومات", "College of Computer & Information Sciences", [
        m("ksu", "cs", "علوم الحاسب", "Computer Science", 134, TPL_CS, [
          {
            id: "ksu-csc-111",
            code: "CSC 111",
            level: 2,
            credits: 4,
            title: { ar: "برمجة الحاسبات (١)", en: "Computer Programming I" },
            focus: { ar: "أساسيات لغة جافا والخوارزميات الأولية", en: "Java fundamentals and algorithmic thinking" },
          },
        ]),
        m("ksu", "swe", "هندسة البرمجيات", "Software Engineering", 135, TPL_SWE),
        m("ksu", "is", "نظم المعلومات", "Information Systems", 132, TPL_IS_IT),
        m("ksu", "ce", "هندسة الحاسب", "Computer Engineering", 136, TPL_EE),
        m("ksu", "ds-ai", "علم البيانات والذكاء الاصطناعي", "Data Science & AI", 134, TPL_AI_DS),
      ]),
      col("ksu", "eng", "كلية الهندسة", "College of Engineering", [
        m("ksu", "ee", "الهندسة الكهربائية", "Electrical Engineering", 138, TPL_EE),
        m("ksu", "me", "الهندسة الميكانيكية", "Mechanical Engineering", 138, TPL_ME),
        m("ksu", "civ", "الهندسة المدنية", "Civil Engineering", 138, TPL_CIV),
        m("ksu", "ie", "الهندسة الصناعية", "Industrial Engineering", 138, TPL_IE),
        m("ksu", "che-pete", "الهندسة الكيميائية وهندسة البترول والغاز", "Chemical & Petroleum Engineering", 138, TPL_CHE_PETE),
      ]),
      col("ksu", "arch", "كلية العمارة والتخطيط", "College of Architecture & Planning", [
        m("ksu", "arch", "العمارة وعلوم البناء", "Architecture & Building Sciences", 162, TPL_ARCH),
        m("ksu", "urban", "التخطيط العمراني", "Urban Planning", 158, TPL_ARCH),
      ]),
      col("ksu", "med", "كلية الطب وطب الأسنان والصيدلة", "Colleges of Medicine, Dentistry & Pharmacy", [
        m("ksu", "mbbs", "الطب والجراحة", "Medicine & Surgery (MBBS)", 192, TPL_MED),
        m("ksu", "dent", "طب الأسنان", "Dentistry (BDS)", 184, TPL_DENT),
        m("ksu", "pharm", "دكتور صيدلة", "Doctor of Pharmacy (PharmD)", 170, TPL_PHARM),
      ]),
      col("ksu", "ams-nurs", "كلية العلوم الطبية التطبيقية والتمريض", "Colleges of Applied Medical Sciences & Nursing", [
        m("ksu", "pt-cls", "العلاج الطبيعي والمختبرات الإكلينيكية والأشعة", "Physical Therapy, Clinical Lab & Radiology", 138, TPL_ALLIED_HEALTH),
        m("ksu", "nurs", "التمريض", "Nursing", 136, TPL_NURS),
      ]),
      col("ksu", "bus", "كلية إدارة الأعمال", "College of Business Administration", [
        m("ksu", "mgt-mkt", "الإدارة والتسويق ونظم المعلومات الإدارية", "Management, Marketing & MIS", 128, TPL_BUS_MGT),
        m("ksu", "fin-acct", "المالية والمحاسبة والاقتصاد", "Finance, Accounting & Economics", 128, TPL_FIN_ACCT),
      ]),
      col("ksu", "law-arts-sci", "كليات الحقوق والتربية والآداب والعلوم والزراعة", "Colleges of Law, Education, Arts, Science & Agriculture", [
        m("ksu", "law", "الحقوق والعلوم السياسية", "Law & Political Science", 132, TPL_SHARIA_LAW),
        m("ksu", "edu", "التربية والمناهج والتربية الخاصة والفنون", "Education, Special Ed & Fine Arts", 128, TPL_EDU_CURR),
        m("ksu", "lang-tr", "اللغات والترجمة والإعلام", "Languages, Translation & Media", 128, TPL_LANG_MEDIA),
        m("ksu", "sci", "العلوم الأساسية والإكتوارية", "Basic & Actuarial Sciences", 132, TPL_SCI_MATH),
        m("ksu", "agri", "علوم الأغذية والزراعة", "Food & Agricultural Sciences", 132, TPL_AGRI_VET),
      ]),
    ],
  },

  // ==========================================================================
  // 3. جامعة الملك عبدالعزيز - جدة
  // ==========================================================================
  {
    id: "kau",
    city: { ar: "جدة", en: "Jeddah" },
    name: { ar: "جامعة الملك عبدالعزيز", en: "King Abdulaziz University" },
    colleges: [
      col("kau", "eng", "كلية الهندسة", "College of Engineering", [
        m("kau", "ie-ae", "الهندسة الصناعية والطيران والفضاء", "Industrial & Aerospace Engineering", 136, TPL_IE),
        m("kau", "ee", "الهندسة الكهربائية وهندسة الحاسبات", "Electrical & Computer Engineering", 138, TPL_EE),
        m("kau", "me", "الهندسة الميكانيكية والنووية", "Mechanical & Nuclear Engineering", 138, TPL_ME),
        m("kau", "civ", "الهندسة المدنية والتعدين", "Civil & Mining Engineering", 138, TPL_CIV),
        m("kau", "che", "الهندسة الكيميائية وهندسة المواد", "Chemical & Materials Engineering", 138, TPL_CHE_PETE),
      ]),
      col("kau", "fcit", "كلية الحاسبات وتقنية المعلومات", "Faculty of Computing & IT", [
        m("kau", "cs", "علوم الحاسبات", "Computer Science", 132, TPL_CS),
        m("kau", "it", "تقنية المعلومات", "Information Technology", 132, TPL_IS_IT),
        m("kau", "is", "نظم المعلومات", "Information Systems", 132, TPL_IS_IT),
        m("kau", "cys", "الأمن السيبراني", "Cybersecurity", 132, TPL_CYS),
      ]),
      col("kau", "health", "الكليات الطبية والصحية (طب، أسنان، صيدلة، تمريض)", "Health Colleges (Medicine, Dentistry, Pharmacy, Nursing)", [
        m("kau", "med", "الطب والجراحة", "Medicine & Surgery", 190, TPL_MED),
        m("kau", "dent", "طب الأسنان", "Dentistry", 182, TPL_DENT),
        m("kau", "pharm", "الصيدلة", "Pharmacy (PharmD)", 168, TPL_PHARM),
        m("kau", "nurs-ams", "التمريض والعلوم الطبية التطبيقية", "Nursing & Applied Medical Sciences", 136, TPL_NURS),
      ]),
      col("kau", "econ", "كلية الاقتصاد والإدارة والحقوق", "Faculties of Economics, Administration & Law", [
        m("kau", "bus-mkt", "إدارة الأعمال والتسويق وإدارة الخدمات الصحية", "Business, Marketing & Healthcare Admin", 128, TPL_BUS_MGT),
        m("kau", "fin-acct", "التمويل والمحاسبة والاقتصاد", "Finance, Accounting & Economics", 128, TPL_FIN_ACCT),
        m("kau", "law", "القانون والأنظمة", "Law & Legal Studies", 130, TPL_SHARIA_LAW),
      ]),
      col("kau", "arch-des", "كلية العمارة والتخطيط والفنون والتصاميم", "Faculties of Architecture, Planning & Human Designs", [
        m("kau", "arch", "العمارة والتخطيط الحضري والإقليمي", "Architecture & Urban/Regional Planning", 160, TPL_ARCH),
        m("kau", "art-des", "الفنون البصرية والتصميم الداخلي والأزياء", "Visual Arts, Interior Design & Fashion", 128, TPL_ARTS_DES),
      ]),
      col("kau", "marine-sci", "كليات علوم البحار وعلوم الأرض والعلوم والآداب", "Marine, Earth, Basic Sciences & Humanities", [
        m("kau", "marine-geo", "علوم البحار والجيولوجيا والأرصاد", "Marine Sciences, Geology & Meteorology", 130, TPL_SCI_MATH),
        m("kau", "sci", "الرياضيات والإحصاء والفيزياء والكيمياء الحيوية", "Math, Statistics, Physics & Biochemistry", 130, TPL_SCI_MATH),
        m("kau", "arts", "اللغة العربية والإنجليزية والإعلام والتربية", "Arabic, English, Media & Education", 128, TPL_LANG_MEDIA),
      ]),
    ],
  },

  // ==========================================================================
  // 4. جامعة الملك فهد للبترول والمعادن - الظهران
  // ==========================================================================
  {
    id: "kfupm",
    city: { ar: "الظهران", en: "Dhahran" },
    name: { ar: "جامعة الملك فهد للبترول والمعادن", en: "King Fahd University of Petroleum & Minerals" },
    colleges: [
      col("kfupm", "cc", "كلية الحوسبة والرياضيات", "College of Computing & Mathematics", [
        m("kfupm", "cs", "علوم الحاسب", "Computer Science", 133, TPL_CS, [
          {
            id: "kfupm-ics-104",
            code: "ICS 104",
            level: 2,
            credits: 3,
            title: { ar: "مقدمة في البرمجة ببايثون و C", en: "Introduction to Programming in Python & C" },
            focus: { ar: "بناء الخوارزميات وحل المسائل الهندسية والحسابية", en: "Algorithmic thinking and computational problem solving" },
          },
        ]),
        m("kfupm", "swe", "هندسة البرمجيات", "Software Engineering", 133, TPL_SWE),
        m("kfupm", "coe", "هندسة الحاسب والشبكات", "Computer & Network Engineering", 134, TPL_EE),
        m("kfupm", "ai-ds", "علم البيانات والذكاء الاصطناعي", "Data Science & AI", 133, TPL_AI_DS),
        m("kfupm", "math", "الرياضيات والعلوم الإكتوارية", "Mathematics & Actuarial Science", 128, TPL_SCI_MATH),
      ]),
      col("kfupm", "pet", "كلية هندسة البترول وعلوم الأرض", "College of Petroleum Engineering & Geosciences", [
        m("kfupm", "pete", "هندسة البترول", "Petroleum Engineering", 134, TPL_CHE_PETE, [
          {
            id: "kfupm-pete-201",
            code: "PETE 201",
            level: 3,
            credits: 3,
            title: { ar: "مقدمة في هندسة البترول", en: "Introduction to Petroleum Engineering" },
            focus: { ar: "دورة الاستكشاف والحفر والإنتاج النفطي", en: "Exploration, drilling, and hydrocarbon production lifecycle" },
          },
        ]),
        m("kfupm", "geol", "الجيولوجيا والجيوفيزياء", "Geology & Geophysics", 130, TPL_SCI_MATH),
      ]),
      col("kfupm", "ep", "كليات الهندسة والفيزياء والكيمياء والمواد", "Colleges of Engineering, Physics, Chemicals & Materials", [
        m("kfupm", "ee", "الهندسة الكهربائية", "Electrical Engineering", 134, TPL_EE),
        m("kfupm", "me-ae", "الهندسة الميكانيكية وهندسة الطيران", "Mechanical & Aerospace Engineering", 134, TPL_ME),
        m("kfupm", "che", "الهندسة الكيميائية وهندسة المواد", "Chemical & Materials Engineering", 134, TPL_CHE_PETE),
        m("kfupm", "civ", "الهندسة المدنية والبيئية", "Civil & Environmental Engineering", 134, TPL_CIV),
        m("kfupm", "ise", "الهندسة الصناعية والنظم", "Industrial & Systems Engineering", 134, TPL_IE),
      ]),
      col("kfupm", "design-bs", "كلية التصاميم والبيئة العمرانية وكلية الأعمال", "Colleges of Design & Built Environment and Business School", [
        m("kfupm", "arch", "العمارة والهندسة المعمارية", "Architecture & Architectural Engineering", 158, TPL_ARCH),
        m("kfupm", "fin-acct", "المالية والمحاسبة", "Finance & Accounting", 127, TPL_FIN_ACCT),
        m("kfupm", "mis-mgt", "نظم المعلومات الإدارية والإدارة", "Management & MIS", 127, TPL_IS_IT),
      ]),
    ],
  },

  // ==========================================================================
  // 5. جامعة الإمام محمد بن سعود الإسلامية - الرياض
  // ==========================================================================
  {
    id: "imamu",
    city: { ar: "الرياض", en: "Riyadh" },
    name: { ar: "جامعة الإمام محمد بن سعود الإسلامية", en: "Imam Mohammad Ibn Saud Islamic University" },
    colleges: [
      col("imamu", "sharia", "كلية الشريعة وأصول الدين والأنظمة", "Colleges of Sharia, Usul al-Din & Law", [
        m("imamu", "sharia-major", "الشريعة والأنظمة", "Sharia & Law", 134, TPL_SHARIA_LAW),
        m("imamu", "usul", "أصول الدين والدراسات القرآنية والحديث", "Usul al-Din, Quran & Sunnah", 132, TPL_SHARIA_LAW),
      ]),
      col("imamu", "arabic-media", "كليات اللغة العربية واللغات والإعلام والعلوم الاجتماعية", "Arabic, Languages, Media & Social Sciences", [
        m("imamu", "ar-lit", "اللغة العربية وآدابها", "Arabic Language & Literature", 132, TPL_LANG_MEDIA),
        m("imamu", "media-tr", "الإعلام الرقمي واللغات والترجمة", "Digital Media, Languages & Translation", 130, TPL_LANG_MEDIA),
        m("imamu", "edu-psych", "التربية وعلم النفس والخدمة الاجتماعية", "Education, Psychology & Social Work", 128, TPL_EDU_CURR),
      ]),
      col("imamu", "cs", "كلية علوم الحاسب والمعلومات", "College of Computer & Information Sciences", [
        m("imamu", "cs-major", "علوم الحاسب", "Computer Science", 132, TPL_CS),
        m("imamu", "it-is", "تقنية ونظم المعلومات", "IT & Information Systems", 132, TPL_IS_IT),
      ]),
      col("imamu", "eng-med-bus", "كليات الهندسة والطب والاقتصاد والعلوم الإدارية", "Colleges of Engineering, Medicine, Economics & Business", [
        m("imamu", "eng", "الهندسة الكهربائية والميكانيكية والمدنية والكيميائية", "Electrical, Mechanical, Civil & Chemical Engineering", 138, TPL_EE),
        m("imamu", "med", "الطب والجراحة", "Medicine & Surgery", 190, TPL_MED),
        m("imamu", "econ-bus", "الاقتصاد والمالية الإسلامية والمحاسبة والإدارة", "Economics, Islamic Finance, Accounting & Management", 128, TPL_FIN_ACCT),
        m("imamu", "sci", "الرياضيات والفيزياء والكيمياء والأحياء", "Sciences (Math, Physics, Chemistry, Biology)", 130, TPL_SCI_MATH),
      ]),
    ],
  },

  // ==========================================================================
  // 6. جامعة أم القرى - مكة المكرمة
  // ==========================================================================
  {
    id: "uqu",
    city: { ar: "مكة المكرمة", en: "Makkah" },
    name: { ar: "جامعة أم القرى", en: "Umm Al-Qura University" },
    colleges: [
      {
        id: "uqu-edu-art",
        name: { ar: "كلية التربية والتصاميم والفنون", en: "Colleges of Education, Designs & Arts" },
        majors: [
          UQU_SPORT_MAJOR,
          m("uqu", "art-des", "التصميم الجرافيكي والفنون التشكيلية", "Graphic Design & Fine Arts", 128, TPL_ARTS_DES),
          m("uqu", "curr-sped", "المناهج وطرق التدريس والتربية الخاصة", "Curriculum, Instruction & Special Education", 128, TPL_EDU_CURR),
        ],
      },
      col("uqu", "sharia", "كلية الشريعة والدراسات الإسلامية والأنظمة", "Colleges of Sharia, Islamic Studies & Law", [
        m("uqu", "sharia-law", "الشريعة والدراسات القضائية والأنظمة", "Sharia, Judicial Studies & Law", 132, TPL_SHARIA_LAW),
        m("uqu", "quran-daawah", "القراءات والدعوة وأصول الدين", "Quranic Qira'at & Islamic Studies", 130, TPL_SHARIA_LAW),
      ]),
      col("uqu", "eng-arch", "كلية الهندسة والعمارة الإسلامية", "College of Engineering & Islamic Architecture", [
        m("uqu", "arch", "العمارة الإسلامية", "Islamic Architecture", 162, TPL_ARCH),
        m("uqu", "civ-ee-me", "الهندسة المدنية والكهربائية والميكانيكية والصناعية", "Civil, Electrical, Mechanical & Industrial Eng", 138, TPL_CIV),
      ]),
      col("uqu", "comp", "كلية الحاسبات", "College of Computing", [
        m("uqu", "cs", "علوم الحاسب", "Computer Science", 134, TPL_CS),
        m("uqu", "cys", "الأمن السيبراني", "Cybersecurity", 134, TPL_CYS),
        m("uqu", "ds-is", "علم البيانات ونظم المعلومات", "Data Science & Information Systems", 132, TPL_AI_DS),
      ]),
      col("uqu", "health-bus", "الكليات الطبية والعلوم الإدارية والآداب والعلوم", "Health, Business, Humanities & Applied Sciences", [
        m("uqu", "med-dent", "الطب والجراحة وطب الأسنان", "Medicine & Dentistry", 190, TPL_MED),
        m("uqu", "pharm-ams", "الصيدلة والتمريض والعلوم الطبية التطبيقية", "Pharmacy, Nursing & Applied Medical Sciences", 150, TPL_PHARM),
        m("uqu", "bus-hajj", "إدارة الأعمال والمالية وإدارة الحج والسياحة", "Business, Finance & Hajj/Tourism Management", 128, TPL_BUS_MGT),
        m("uqu", "lang-sci", "اللغة العربية والإنجليزية والعلوم التطبيقية", "Arabic, English & Applied Sciences", 128, TPL_LANG_MEDIA),
      ]),
    ],
  },

  // ==========================================================================
  // 7. جامعة الأميرة نورة بنت عبدالرحمن - الرياض
  // ==========================================================================
  {
    id: "pnu",
    city: { ar: "الرياض", en: "Riyadh" },
    name: { ar: "جامعة الأميرة نورة بنت عبدالرحمن", en: "Princess Nourah bint Abdulrahman University" },
    colleges: [
      {
        id: "pnu-sport",
        name: { ar: "كلية علوم الرياضة والنشاط البدني", en: "College of Sport Sciences & Physical Activity" },
        majors: PNU_SPORT_MAJORS,
      },
      col("pnu", "ccis", "كلية علوم الحاسب والمعلومات", "College of Computer & Information Sciences", [
        m("pnu", "cs", "علوم الحاسب", "Computer Science", 132, TPL_CS),
        m("pnu", "is", "نظم المعلومات", "Information Systems", 132, TPL_IS_IT),
        m("pnu", "cys-net", "الشبكات والأمن السيبراني", "Networks & Cybersecurity", 132, TPL_CYS),
        m("pnu", "ai", "الذكاء الاصطناعي وعلوم البيانات", "AI & Data Science", 132, TPL_AI_DS),
      ]),
      col("pnu", "eng-des", "كلية الهندسة وكلية التصاميم والفنون", "Colleges of Engineering and Art & Design", [
        m("pnu", "ee-ie", "الهندسة الكهربائية والصناعية والنظم", "Electrical & Industrial Systems Engineering", 136, TPL_IE),
        m("pnu", "art-des", "التصميم الجرافيكي والداخلي والأزياء والفنون", "Graphic, Interior, Fashion Design & Visual Arts", 130, TPL_ARTS_DES),
      ]),
      col("pnu", "health", "الكليات الصحية (طب، أسنان، صيدلة، تأهيل، تمريض)", "Health Colleges (Medicine, Dentistry, Pharmacy, Rehab, Nursing)", [
        m("pnu", "med", "الطب البشري وطب الأسنان", "Medicine & Dentistry", 190, TPL_MED),
        m("pnu", "pharm", "الصيدلة", "Pharmacy (PharmD)", 168, TPL_PHARM),
        m("pnu", "rehab-nurs", "علوم الصحة والتأهيل والتمريض", "Health & Rehabilitation Sciences and Nursing", 136, TPL_ALLIED_HEALTH),
      ]),
      col("pnu", "bus-law-edu", "كليات الإدارة والأعمال والقانون والتربية واللغات", "Business, Law, Education & Languages", [
        m("pnu", "bus", "إدارة الأعمال والمالية والمحاسبة والاقتصاد", "Business, Finance, Accounting & Economics", 128, TPL_FIN_ACCT),
        m("pnu", "law", "القانون والدراسات الإسلامية", "Law & Islamic Studies", 130, TPL_SHARIA_LAW),
        m("pnu", "edu", "الطفولة المبكرة والتربية الخاصة والمناهج", "Early Childhood, Special Ed & Curriculum", 128, TPL_EDU_CURR),
        m("pnu", "lang", "اللغات والترجمة والآداب", "Languages, Translation & Humanities", 128, TPL_LANG_MEDIA),
      ]),
    ],
  },

  // ==========================================================================
  // 8. جامعة الإمام عبدالرحمن بن فيصل - الدمام
  // ==========================================================================
  {
    id: "iau",
    city: { ar: "الدمام", en: "Dammam" },
    name: { ar: "جامعة الإمام عبدالرحمن بن فيصل", en: "Imam Abdulrahman bin Faisal University" },
    colleges: [
      col("iau", "arch-des", "كلية العمارة والتخطيط والتصاميم", "Colleges of Architecture, Planning & Design", [
        m("iau", "arch", "العمارة وهندسة المباني والتخطيط العمراني", "Architecture, Building Eng & Urban Planning", 162, TPL_ARCH),
        m("iau", "ides", "التصميم الداخلي والصناعي والجرافيكي", "Interior, Industrial & Graphic Design", 132, TPL_ARTS_DES),
      ]),
      col("iau", "med-health", "الكليات الطبية والصحية (طب، أسنان، صيدلة، تمريض، صحة عامة)", "Medical & Health Colleges", [
        m("iau", "med", "الطب والجراحة", "Medicine & Surgery", 192, TPL_MED),
        m("iau", "dent", "طب الأسنان", "Dentistry", 184, TPL_DENT),
        m("iau", "pharm", "الصيدلة الإكلينيكية", "Clinical Pharmacy", 168, TPL_PHARM),
        m("iau", "ams-ph", "التمريض والعلوم الطبية التطبيقية والصحة العامة", "Nursing, Applied Medical Sciences & Public Health", 138, TPL_ALLIED_HEALTH),
      ]),
      col("iau", "eng-cs", "كليات الهندسة وعلوم الحاسب وتقنية المعلومات", "Colleges of Engineering and CS & IT", [
        m("iau", "eng", "الهندسة الطبية الحيوية والبيئية والإنشائية والنقل", "Biomedical, Environmental, Construction & Transport Eng", 138, TPL_CIV),
        m("iau", "cs-cys", "علوم الحاسب ونظم المعلومات والأمن السيبراني", "CS, CIS, AI & Cybersecurity", 134, TPL_CYS),
      ]),
      col("iau", "bus-edu-sci", "كليات إدارة الأعمال والتربية والشريعة والعلوم", "Business, Education, Sharia & Sciences", [
        m("iau", "bus", "إدارة الأعمال والمالية والمحاسبة", "Business, Finance & Accounting", 128, TPL_FIN_ACCT),
        m("iau", "edu-sport", "التربية وعلوم النشاط البدني", "Education & Physical Activity Studies", 128, TPL_EDU_CURR),
        m("iau", "sci", "العلوم والآداب والشريعة والقانون", "Sciences, Humanities, Sharia & Law", 130, TPL_SCI_MATH),
      ]),
    ],
  },

  // ==========================================================================
  // 9. جامعة الملك خالد - أبها
  // ==========================================================================
  {
    id: "kku",
    city: { ar: "أبها", en: "Abha" },
    name: { ar: "جامعة الملك خالد", en: "King Khalid University" },
    colleges: [
      {
        id: "kku-edu",
        name: { ar: "كلية التربية", en: "College of Education" },
        majors: [
          KKU_SPORT_MAJOR,
          m("kku", "sped", "التربية الخاصة وصعوبات التعلم", "Special Education & Learning Disabilities", 128, TPL_EDU_CURR),
          m("kku", "curr-art", "المناهج وطرق التدريس والتربية الفنية", "Curriculum, Instruction & Art Education", 128, TPL_ARTS_DES),
        ],
      },
      col("kku", "cs", "كلية علوم الحاسب الآلي", "College of Computer Science", [
        m("kku", "cys", "الأمن السيبراني", "Cybersecurity", 134, TPL_CYS),
        m("kku", "cs", "علوم الحاسب", "Computer Science", 134, TPL_CS),
        m("kku", "is-ai", "نظم المعلومات والذكاء الاصطناعي", "Information Systems & AI", 134, TPL_AI_DS),
      ]),
      col("kku", "health", "الكليات الصحية (طب، أسنان، صيدلة، تمريض، علوم طبية)", "Health Colleges (Medicine, Dentistry, Pharmacy, Nursing, AMS)", [
        m("kku", "med", "الطب والجراحة", "Medicine & Surgery", 190, TPL_MED),
        m("kku", "dent-pharm", "طب الأسنان والصيدلة", "Dentistry & Pharmacy", 174, TPL_PHARM),
        m("kku", "ams-nurs", "العلوم الطبية التطبيقية والتمريض", "Applied Medical Sciences & Nursing", 138, TPL_ALLIED_HEALTH),
      ]),
      col("kku", "eng-bus-sharia", "كليات الهندسة والأعمال والشريعة والعلوم الإنسانية", "Engineering, Business, Sharia & Humanities", [
        m("kku", "eng", "الهندسة المدنية والكهربائية والميكانيكية والكيميائية والصناعية", "Civil, Electrical, Mechanical, Chemical & Industrial Eng", 138, TPL_ME),
        m("kku", "bus", "إدارة الأعمال والمحاسبة والمالية والتجارة الإلكترونية", "Business, Accounting, Finance & E-Commerce", 128, TPL_BUS_MGT),
        m("kku", "sharia-law", "الشريعة وأصول الدين والأنظمة", "Sharia, Islamic Studies & Law", 132, TPL_SHARIA_LAW),
        m("kku", "lang-sci", "اللغات والترجمة والعلوم", "Languages, Translation & Basic Sciences", 128, TPL_LANG_MEDIA),
      ]),
    ],
  },

  // ==========================================================================
  // 10. جامعة طيبة - المدينة المنورة
  // ==========================================================================
  {
    id: "taibahu",
    city: { ar: "المدينة المنورة", en: "Madinah" },
    name: { ar: "جامعة طيبة", en: "Taibah University" },
    colleges: [
      {
        id: "taibahu-edu",
        name: { ar: "كلية التربية والآداب والعلوم الإنسانية", en: "Colleges of Education & Humanities" },
        majors: [
          TAIBAH_SPORT_MAJOR,
          m("taibahu", "art-info", "التربية الفنية وعلم المعلومات", "Art Education & Information Science", 128, TPL_ARTS_DES),
          m("taibahu", "curr-sped", "المناهج وطرق التدريس والتربية الخاصة", "Curriculum, Teaching & Special Ed", 128, TPL_EDU_CURR),
        ],
      },
      col("taibahu", "ccse", "كلية علوم وهندسة الحاسب الآلي", "College of Computer Science & Engineering", [
        m("taibahu", "cs", "علوم الحاسب والذكاء الاصطناعي", "Computer Science & AI", 132, TPL_CS),
        m("taibahu", "is-cys", "نظم المعلومات والأمن السيبراني", "Information Systems & Cybersecurity", 132, TPL_CYS),
      ]),
      col("taibahu", "health", "الكليات الصحية والتأهيل الطبي", "Medical, Pharmacy, Nursing & Rehabilitation Colleges", [
        m("taibahu", "med-dent", "الطب والجراحة وطب الأسنان", "Medicine & Dentistry", 190, TPL_MED),
        m("taibahu", "pharm", "الصيدلة", "Pharmacy", 168, TPL_PHARM),
        m("taibahu", "pt-rehab", "العلاج الطبيعي والتأهيل الطبي والتمريض", "Physical Therapy, Medical Rehab & Nursing", 138, TPL_ALLIED_HEALTH),
      ]),
      col("taibahu", "eng-bus-law", "كليات الهندسة وإدارة الأعمال والحقوق والعلوم", "Engineering, Business, Law & Sciences", [
        m("taibahu", "eng", "الهندسة المدنية والكهربائية والميكانيكية والصناعية والكيميائية", "Civil, Electrical, Mechanical, Industrial & Chemical Eng", 138, TPL_EE),
        m("taibahu", "bus", "إدارة الأعمال والمالية والمحاسبة والتسويق", "Business, Finance, Accounting & Marketing", 128, TPL_BUS_MGT),
        m("taibahu", "law-sci", "الحقوق واللغات والعلوم", "Law, Languages & Basic Sciences", 130, TPL_SHARIA_LAW),
      ]),
    ],
  },

  // ==========================================================================
  // 11. جامعة القصيم - بريدة
  // ==========================================================================
  {
    id: "qu",
    city: { ar: "بريدة", en: "Buraidah" },
    name: { ar: "جامعة القصيم", en: "Qassim University" },
    colleges: [
      {
        id: "qu-edu-art",
        name: { ar: "كلية التربية والفنون والتصاميم", en: "Colleges of Education, Arts & Designs" },
        majors: [
          QU_SPORT_MAJOR,
          m("qu", "art-des", "التربية الفنية والتصميم الداخلي والجرافيكي", "Art Education, Interior & Graphic Design", 128, TPL_ARTS_DES),
          m("qu", "edu", "المناهج وطرق التدريس والتربية الخاصة", "Curriculum, Instruction & Special Ed", 128, TPL_EDU_CURR),
        ],
      },
      col("qu", "sharia", "كلية الشريعة والدراسات الإسلامية", "College of Sharia & Islamic Studies", [
        m("qu", "sharia-law", "الشريعة والأنظمة", "Sharia & Law", 134, TPL_SHARIA_LAW),
        m("qu", "usul", "القرآن والسنة والعقيدة", "Quran, Sunnah & Islamic Creed", 130, TPL_SHARIA_LAW),
      ]),
      col("qu", "coc", "كلية الحاسب الآلي والهندسة والعمارة", "Colleges of Computer, Engineering & Architecture", [
        m("qu", "cs-ce", "علوم وهندسة الحاسب وتقنية المعلومات", "Computer Science, Engineering & IT", 134, TPL_CS),
        m("qu", "eng", "الهندسة المدنية والكهربائية والميكانيكية", "Civil, Electrical & Mechanical Engineering", 138, TPL_EE),
        m("qu", "arch", "العمارة والتخطيط", "Architecture & Planning", 160, TPL_ARCH),
      ]),
      col("qu", "health-agri-bus", "الكليات الصحية والزراعة والطب البيطري والأعمال", "Health, Agriculture, Veterinary & Business Colleges", [
        m("qu", "med-dent", "الطب وطب الأسنان والصيدلة", "Medicine, Dentistry & Pharmacy", 188, TPL_MED),
        m("qu", "ams-nurs", "العلوم الطبية التطبيقية والتأهيل الطبي والتمريض", "Applied Medical Sciences, Rehab & Nursing", 138, TPL_ALLIED_HEALTH),
        m("qu", "food-vet", "علوم الأغذية والزراعة والطب البيطري", "Food Science, Agriculture & Veterinary Medicine", 136, TPL_AGRI_VET),
        m("qu", "bus", "الاقتصاد والإدارة والمحاسبة والتمويل", "Economics, Management, Accounting & Finance", 128, TPL_FIN_ACCT),
      ]),
    ],
  },

  // ==========================================================================
  // 12. جامعة جدة - جدة (تضم كلية علوم الرياضة)
  // ==========================================================================
  {
    id: "uj",
    city: { ar: "جدة", en: "Jeddah" },
    name: { ar: "جامعة جدة", en: "University of Jeddah" },
    colleges: [
      {
        id: "uj-sport",
        name: { ar: "كلية علوم الرياضة", en: "College of Sport Sciences" },
        majors: UJ_SPORT_MAJORS,
      },
      col("uj", "cs-eng", "كلية علوم وهندسة الحاسب وكلية الهندسة", "Colleges of Computer Science & Engineering", [
        m("uj", "ai-ds", "الذكاء الاصطناعي وعلوم البيانات وهندسة البرمجيات", "AI, Data Science & Software Engineering", 134, TPL_AI_DS),
        m("uj", "cys", "الأمن السيبراني وعلوم الحاسب", "Cybersecurity & Computer Science", 134, TPL_CYS),
        m("uj", "eng", "الهندسة الصناعية والكهربائية والميكانيكية والكيميائية", "Industrial, Electrical, Mechanical & Chemical Eng", 138, TPL_IE),
      ]),
      col("uj", "med-bus-law", "كليات الطب والأعمال والقانون والتصاميم والتربية", "Medicine, Business, Law, Design & Education", [
        m("uj", "med-ams", "الطب والجراحة والعلوم الطبية التطبيقية", "Medicine & Applied Medical Sciences", 188, TPL_MED),
        m("uj", "bus", "إدارة الأعمال واللوجستيات وسلاسل الإمداد والمالية", "Business, Logistics, Supply Chain & Finance", 128, TPL_BUS_MGT),
        m("uj", "law-edu", "القانون والتربية واللغات والتصميم", "Law, Education, Languages & Design", 128, TPL_ARTS_DES),
      ]),
    ],
  },

  // ==========================================================================
  // 13. الجامعة السعودية الإلكترونية - تعليم مدمج
  // ==========================================================================
  {
    id: "seu",
    city: { ar: "الرياض (تعليم مدمج)", en: "Riyadh (Blended Learning)" },
    name: { ar: "الجامعة السعودية الإلكترونية", en: "Saudi Electronic University" },
    colleges: [
      col("seu", "cci", "كلية الحوسبة والمعلوماتية", "College of Computing & Informatics", [
        m("seu", "it", "تقنية المعلومات", "Information Technology", 130, TPL_IS_IT),
        m("seu", "cs", "علوم الحاسب", "Computer Science", 130, TPL_CS),
        m("seu", "ds", "علوم البيانات", "Data Science", 130, TPL_AI_DS),
      ]),
      col("seu", "cafs", "كلية العلوم الإدارية والمالية", "College of Administrative & Financial Sciences", [
        m("seu", "ecom", "التجارة الإلكترونية والتسويق الرقمي", "E-Commerce & Digital Marketing", 130, TPL_BUS_MGT),
        m("seu", "fin-acct", "المالية والمحاسبة والإدارة", "Finance, Accounting & Management", 130, TPL_FIN_ACCT),
      ]),
      col("seu", "chs-lang", "كلية العلوم الصحية وكلية العلوم والدراسات النظرية", "Colleges of Health Sciences & Theoretical Studies", [
        m("seu", "hi-ph", "المعلوماتية الصحية والصحة العامة", "Health Informatics & Public Health", 134, TPL_ALLIED_HEALTH),
        m("seu", "law-eng", "القانون واللغة الإنجليزية والترجمة والإعلام الرقمي", "Law, English Translation & Digital Media", 128, TPL_LANG_MEDIA),
      ]),
    ],
  },

  // ==========================================================================
  // 14. جامعة الطائف - الطائف
  // ==========================================================================
  {
    id: "tu",
    city: { ar: "الطائف", en: "Taif" },
    name: { ar: "جامعة الطائف", en: "Taif University" },
    colleges: [
      col("tu", "edu", "كلية التربية والآداب", "Colleges of Education & Arts", [
        createRegionalSportMajor("tu"),
        m("tu", "edu", "المناهج وطرق التدريس والتربية الخاصة والطفولة", "Curriculum, Special Ed & Early Childhood", 128, TPL_EDU_CURR),
        m("tu", "lang", "اللغة العربية والإنجليزية والتاريخ والإعلام", "Arabic, English, History & Media", 128, TPL_LANG_MEDIA),
      ]),
      col("tu", "cit-eng", "كلية الحاسبات وتقنية المعلومات وكلية الهندسة", "Colleges of Computing & Engineering", [
        m("tu", "cs-it", "علوم الحاسب وتقنية المعلومات وهندسة الحاسب", "CS, IT & Computer Engineering", 134, TPL_CS),
        m("tu", "eng", "الهندسة المدنية والكهربائية والميكانيكية والصناعية", "Civil, Electrical, Mechanical & Industrial Eng", 138, TPL_ME),
      ]),
      col("tu", "health-bus-sharia", "الكليات الصحية وإدارة الأعمال والشريعة والتصاميم", "Health, Business, Sharia & Designs", [
        m("tu", "med-pharm", "الطب وطب الأسنان والصيدلة والتمريض", "Medicine, Dentistry, Pharmacy & Nursing", 180, TPL_MED),
        m("tu", "bus", "إدارة الأعمال والمحاسبة والتمويل والتسويق", "Business, Accounting, Finance & Marketing", 128, TPL_BUS_MGT),
        m("tu", "sharia-des", "الشريعة والأنظمة والتصميم الجرافيكي والفنون", "Sharia, Law, Graphic Design & Fine Arts", 130, TPL_SHARIA_LAW),
      ]),
    ],
  },

  // ==========================================================================
  // 15. جامعة حائل - حائل
  // ==========================================================================
  {
    id: "uoh",
    city: { ar: "حائل", en: "Hail" },
    name: { ar: "جامعة حائل", en: "University of Hail" },
    colleges: [
      col("uoh", "edu", "كلية التربية", "College of Education", [
        createRegionalSportMajor("uoh"),
        m("uoh", "art-sped", "التربية الفنية والتربية الخاصة والمناهج", "Art Education, Special Ed & Curriculum", 128, TPL_EDU_CURR),
      ]),
      col("uoh", "cse-eng", "كلية علوم وهندسة الحاسب وكلية الهندسة", "Colleges of Computer Science & Engineering", [
        m("uoh", "cs-swe", "علوم الحاسب وهندسة البرمجيات والأمن السيبراني", "CS, Software Engineering & Cybersecurity", 134, TPL_SWE),
        m("uoh", "eng", "الهندسة المدنية والكهربائية والميكانيكية والكيميائية", "Civil, Electrical, Mechanical & Chemical Eng", 138, TPL_CIV),
      ]),
      col("uoh", "health-bus", "الكليات الصحية وإدارة الأعمال والشريعة والعلوم", "Health, Business, Sharia & Sciences", [
        m("uoh", "med-pharm", "الطب وطب الأسنان والصيدلة والتمريض والصحة العامة", "Medicine, Dentistry, Pharmacy, Nursing & Public Health", 176, TPL_MED),
        m("uoh", "bus-law", "إدارة الأعمال والمحاسبة والقانون والشريعة", "Business, Accounting, Law & Sharia", 128, TPL_BUS_MGT),
        m("uoh", "sci", "العلوم الأساسية والآداب", "Basic Sciences & Humanities", 130, TPL_SCI_MATH),
      ]),
    ],
  },

  // ==========================================================================
  // 16. جامعة جازان - جازان
  // ==========================================================================
  {
    id: "jazanu",
    city: { ar: "جازان", en: "Jazan" },
    name: { ar: "جامعة جازان", en: "Jazan University" },
    colleges: [
      col("jazanu", "edu", "كلية التربية والآداب", "Colleges of Education & Arts", [
        createRegionalSportMajor("jazanu"),
        m("jazanu", "edu", "التربية الخاصة والطفولة المبكرة والمناهج", "Special Ed, Early Childhood & Curriculum", 128, TPL_EDU_CURR),
        m("jazanu", "lang-media", "اللغة العربية والإنجليزية والصحافة والإعلام", "Arabic, English & Journalism/Media", 128, TPL_LANG_MEDIA),
      ]),
      col("jazanu", "eng-arch-cs", "كليات الهندسة والعمارة وعلوم الحاسب", "Colleges of Engineering, Architecture & Computer Science", [
        m("jazanu", "eng", "الهندسة المدنية والكهربائية والميكانيكية والصناعية والكيميائية", "Civil, Electrical, Mechanical, Industrial & Chem Eng", 138, TPL_EE),
        m("jazanu", "arch", "العمارة", "Architecture", 160, TPL_ARCH),
        m("jazanu", "cs-cys", "علوم الحاسب وتقنية المعلومات والأمن السيبراني", "CS, IT & Cybersecurity", 134, TPL_CS),
      ]),
      col("jazanu", "health-bus", "الكليات الطبية وإدارة الأعمال والشريعة والعلوم", "Health, Business, Sharia & Sciences", [
        m("jazanu", "med", "الطب وطب الأسنان والصيدلة والتمريض والعلوم الطبية التطبيقية", "Medicine, Dentistry, Pharmacy, Nursing & AMS", 180, TPL_MED),
        m("jazanu", "bus-law", "إدارة الأعمال والمحاسبة والتمويل والشريعة والقانون", "Business, Accounting, Finance, Sharia & Law", 128, TPL_FIN_ACCT),
        m("jazanu", "sci", "العلوم والأحياء البحرية", "Sciences & Marine Biology", 130, TPL_SCI_MATH),
      ]),
    ],
  },

  // ==========================================================================
  // 17. جامعة تبوك - تبوك
  // ==========================================================================
  {
    id: "ut",
    city: { ar: "تبوك", en: "Tabuk" },
    name: { ar: "جامعة تبوك", en: "University of Tabuk" },
    colleges: [
      col("ut", "edu", "كلية التربية والآداب", "Colleges of Education & Arts", [
        createRegionalSportMajor("ut"),
        m("ut", "edu-lang", "التربية الخاصة والمناهج واللغات", "Special Ed, Curriculum & Languages", 128, TPL_EDU_CURR),
      ]),
      col("ut", "fcit-eng", "كلية الحاسبات وتقنية المعلومات وكلية الهندسة", "Colleges of Computing & Engineering", [
        m("ut", "cs-it", "علوم الحاسب وتقنية المعلومات والذكاء الاصطناعي", "CS, IT & Artificial Intelligence", 134, TPL_AI_DS),
        m("ut", "eng", "الهندسة المدنية والكهربائية والميكانيكية والصناعية", "Civil, Electrical, Mechanical & Industrial Eng", 138, TPL_ME),
      ]),
      col("ut", "health-bus-des", "الكليات الصحية وإدارة الأعمال والتصاميم والفنون والعلوم", "Health, Business, Design & Sciences", [
        m("ut", "med-ams", "الطب والصيدلة والتمريض والعلاج الطبيعي والمختبرات", "Medicine, Pharmacy, Nursing & Applied Medical Sciences", 176, TPL_MED),
        m("ut", "bus-law", "إدارة الأعمال والمحاسبة والتمويل والأنظمة", "Business, Accounting, Finance & Law", 128, TPL_BUS_MGT),
        m("ut", "des-sci", "التصميم الداخلي والأزياء والعلوم الأساسية", "Interior Design, Fashion & Basic Sciences", 130, TPL_ARTS_DES),
      ]),
    ],
  },

  // ==========================================================================
  // 18. جامعة الجوف - سكاكا
  // ==========================================================================
  {
    id: "ju",
    city: { ar: "سكاكا", en: "Sakaka" },
    name: { ar: "جامعة الجوف", en: "Jouf University" },
    colleges: [
      col("ju", "edu", "كلية التربية والآداب", "Colleges of Education & Arts", [
        createRegionalSportMajor("ju"),
        m("ju", "edu-lang", "التربية الخاصة والطفولة واللغات", "Special Ed, Early Childhood & Languages", 128, TPL_EDU_CURR),
      ]),
      col("ju", "cs-eng", "كليات علوم الحاسب والمعلومات والهندسة", "Colleges of Computer & Information Sciences and Engineering", [
        m("ju", "cs-is", "علوم الحاسب ونظم المعلومات وهندسة الشبكات", "CS, IS & Network Engineering", 134, TPL_CS),
        m("ju", "eng", "الهندسة المدنية والكهربائية والميكانيكية والزراعية", "Civil, Electrical & Mechanical Engineering", 138, TPL_CIV),
      ]),
      col("ju", "health-sharia-bus", "الكليات الصحية والشريعة وإدارة الأعمال والعلوم", "Health, Sharia, Business & Sciences", [
        m("ju", "med-dent-pharm", "الطب وطب الأسنان والصيدلة والعلوم الطبية التطبيقية", "Medicine, Dentistry, Pharmacy & AMS", 180, TPL_MED),
        m("ju", "sharia-bus", "الشريعة والقانون وإدارة الأعمال والمحاسبة", "Sharia, Law, Business & Accounting", 128, TPL_SHARIA_LAW),
        m("ju", "sci-agri", "العلوم وتقنية الأغذية والزراعة الزيتونية", "Sciences & Agricultural Food Technology", 130, TPL_AGRI_VET),
      ]),
    ],
  },

  // ==========================================================================
  // 19. جامعة نجران - نجران
  // ==========================================================================
  {
    id: "nu",
    city: { ar: "نجران", en: "Najran" },
    name: { ar: "جامعة نجران", en: "Najran University" },
    colleges: [
      col("nu", "edu", "كلية التربية واللغات والترجمة", "Colleges of Education & Languages", [
        createRegionalSportMajor("nu"),
        m("nu", "edu-lang", "التربية الخاصة والمناهج واللغة الإنجليزية والترجمة", "Special Ed, Curriculum & English Translation", 128, TPL_EDU_CURR),
      ]),
      col("nu", "cs-eng", "كليات علوم الحاسب ونظم المعلومات والهندسة", "Colleges of Computer Science & Engineering", [
        m("nu", "cs-is", "علوم الحاسب ونظم المعلومات والشبكات", "CS, IS & Networks", 134, TPL_CS),
        m("nu", "eng", "الهندسة المدنية والكهربائية والميكانيكية والمعمارية", "Civil, Electrical, Mechanical & Architectural Eng", 138, TPL_EE),
      ]),
      col("nu", "health-bus-sharia", "الكليات الصحية والإدارة والشريعة والعلوم", "Health, Business, Sharia & Sciences", [
        m("nu", "med-dent-pharm", "الطب وطب الأسنان والصيدلة والتمريض والمختبرات", "Medicine, Dentistry, Pharmacy, Nursing & Lab", 178, TPL_MED),
        m("nu", "bus-sharia", "العلوم الإدارية والشريعة وأصول الدين والعلوم", "Administrative Sciences, Sharia & Basic Sciences", 128, TPL_BUS_MGT),
      ]),
    ],
  },

  // ==========================================================================
  // 20. جامعة الباحة - الباحة
  // ==========================================================================
  {
    id: "bu",
    city: { ar: "الباحة", en: "Al-Baha" },
    name: { ar: "جامعة الباحة", en: "Al-Baha University" },
    colleges: [
      col("bu", "edu", "كلية التربية والآداب والعلوم الإنسانية", "Colleges of Education & Humanities", [
        createRegionalSportMajor("bu"),
        m("bu", "edu-art", "المناهج والتربية الفنية والخاصة واللغات", "Curriculum, Art Ed, Special Ed & Languages", 128, TPL_EDU_CURR),
      ]),
      col("bu", "cs-eng", "كليات الحاسبات وتقنية المعلومات والهندسة", "Colleges of Computing & Engineering", [
        m("bu", "cs-it", "علوم الحاسب وتقنية المعلومات", "Computer Science & IT", 134, TPL_IS_IT),
        m("bu", "eng", "الهندسة المدنية والكهربائية والميكانيكية والمعمارية", "Civil, Electrical, Mechanical & Architecture", 138, TPL_CIV),
      ]),
      col("bu", "health-bus", "الكليات الصحية وإدارة الأعمال والعلوم", "Health, Business & Sciences", [
        m("bu", "med-ams", "الطب والصيدلة والعلوم الطبية التطبيقية", "Medicine, Pharmacy & Applied Medical Sciences", 176, TPL_MED),
        m("bu", "bus-sci", "إدارة الأعمال والمحاسبة والعلوم الأساسية", "Business, Accounting & Basic Sciences", 128, TPL_BUS_MGT),
      ]),
    ],
  },

  // ==========================================================================
  // 21. جامعة الحدود الشمالية - عرعر
  // ==========================================================================
  {
    id: "nbu",
    city: { ar: "عرعر", en: "Arar" },
    name: { ar: "جامعة الحدود الشمالية", en: "Northern Border University" },
    colleges: [
      col("nbu", "cs-eng", "كليات الحوسبة وتقنية المعلومات والهندسة", "Colleges of Computing & Engineering", [
        m("nbu", "cs-it", "علوم الحاسب وتقنية المعلومات والأمن السيبراني", "CS, IT & Cybersecurity", 134, TPL_CYS),
        m("nbu", "eng", "الهندسة الكهربائية والميكانيكية والمدنية والكيميائية والصناعية", "Electrical, Mechanical, Civil, Chemical & Industrial Eng", 138, TPL_ME),
      ]),
      col("nbu", "health-bus-edu", "الكليات الطبية وإدارة الأعمال والتربية والعلوم", "Medical, Business, Education & Sciences", [
        m("nbu", "med-pharm", "الطب والصيدلة والتمريض والعلوم الطبية التطبيقية", "Medicine, Pharmacy, Nursing & Applied Medical Sciences", 178, TPL_MED),
        m("nbu", "bus", "إدارة الأعمال والمحاسبة والتمويل والتسويق والقانون", "Business, Accounting, Finance, Marketing & Law", 128, TPL_BUS_MGT),
        m("nbu", "edu-sci", "التربية والآداب والعلوم الأساسية", "Education, Humanities & Basic Sciences", 128, TPL_EDU_CURR),
      ]),
    ],
  },

  // ==========================================================================
  // 22. جامعة المجمعة - المجمعة
  // ==========================================================================
  {
    id: "mu",
    city: { ar: "المجمعة", en: "Al-Majmaah" },
    name: { ar: "جامعة المجمعة", en: "Majmaah University" },
    colleges: [
      col("mu", "edu", "كلية التربية", "College of Education", [
        createRegionalSportMajor("mu"),
        m("mu", "edu-lang", "التربية الخاصة والطفولة المبكرة واللغات", "Special Ed, Early Childhood & Languages", 128, TPL_EDU_CURR),
      ]),
      col("mu", "cs-eng", "كلية علوم الحاسب والمعلومات وكلية الهندسة", "Colleges of Computer Science & Engineering", [
        m("mu", "cs-it", "علوم الحاسب وتقنية المعلومات والأمن السيبراني", "CS, IT & Cybersecurity", 134, TPL_CYS),
        m("mu", "eng", "الهندسة المدنية والكهربائية والميكانيكية والمعمارية", "Civil, Electrical, Mechanical & Architectural Eng", 138, TPL_EE),
      ]),
      col("mu", "health-bus", "الكليات الصحية وإدارة الأعمال والعلوم", "Health, Business & Sciences", [
        m("mu", "med-dent-ams", "الطب وطب الأسنان والعلاج الطبيعي والمختبرات والتمريض", "Medicine, Dentistry, PT, Clinical Lab & Nursing", 178, TPL_ALLIED_HEALTH),
        m("mu", "bus-law", "إدارة الأعمال والمحاسبة والمالية والقانون", "Business, Accounting, Finance & Law", 128, TPL_FIN_ACCT),
      ]),
    ],
  },

  // ==========================================================================
  // 23. جامعة الأمير سطام بن عبدالعزيز - الخرج
  // ==========================================================================
  {
    id: "psau",
    city: { ar: "الخرج", en: "Al-Kharj" },
    name: { ar: "جامعة الأمير سطام بن عبدالعزيز", en: "Prince Sattam bin Abdulaziz University" },
    colleges: [
      col("psau", "edu", "كلية التربية", "College of Education", [
        createRegionalSportMajor("psau"),
        m("psau", "edu-lang", "التربية الخاصة وعلم النفس واللغات", "Special Ed, Psychology & Languages", 128, TPL_EDU_CURR),
      ]),
      col("psau", "ce-eng", "كلية هندسة وعلوم الحاسب وكلية الهندسة", "Colleges of Computer Engineering & Engineering", [
        m("psau", "cs-swe", "علوم الحاسب وهندسة البرمجيات وهندسة الحاسب", "CS, Software & Computer Engineering", 134, TPL_SWE),
        m("psau", "eng", "الهندسة الكهربائية والميكانيكية والمدنية والصناعية", "Electrical, Mechanical, Civil & Industrial Eng", 138, TPL_ME),
      ]),
      col("psau", "health-bus", "الكليات الصحية وإدارة الأعمال والعلوم", "Health, Business & Sciences", [
        m("psau", "med-dent-pharm", "الطب وطب الأسنان والصيدلة والعلوم الطبية التطبيقية", "Medicine, Dentistry, Pharmacy & AMS", 180, TPL_MED),
        m("psau", "bus-law", "إدارة الأعمال والمحاسبة والمالية والأنظمة", "Business, Accounting, Finance & Law", 128, TPL_BUS_MGT),
      ]),
    ],
  },

  // ==========================================================================
  // 24. جامعة شقراء - شقراء
  // ==========================================================================
  {
    id: "su",
    city: { ar: "شقراء", en: "Shaqra" },
    name: { ar: "جامعة شقراء", en: "Shaqra University" },
    colleges: [
      col("su", "edu", "كلية التربية", "College of Education", [
        createRegionalSportMajor("su"),
        m("su", "edu-art", "التربية الخاصة والطفولة المبكرة والتربية الفنية", "Special Ed, Early Childhood & Art Ed", 128, TPL_EDU_CURR),
      ]),
      col("su", "cit-eng", "كلية الحاسب الآلي وتقنية المعلومات وكلية الهندسة", "Colleges of Computing & Engineering", [
        m("su", "cs-it", "علوم الحاسب وتقنية المعلومات وهندسة الشبكات", "CS, IT & Network Engineering", 134, TPL_CS),
        m("su", "eng", "الهندسة المدنية والكهربائية والميكانيكية", "Civil, Electrical & Mechanical Engineering", 138, TPL_CIV),
      ]),
      col("su", "health-bus", "الكليات الصحية وإدارة الأعمال والعلوم", "Health, Business & Sciences", [
        m("su", "med-pharm", "الطب والصيدلة والعلوم الطبية التطبيقية والتمريض", "Medicine, Pharmacy, AMS & Nursing", 174, TPL_MED),
        m("su", "bus-law", "إدارة الأعمال والمحاسبة والقانون والعلوم", "Business, Accounting, Law & Sciences", 128, TPL_BUS_MGT),
      ]),
    ],
  },

  // ==========================================================================
  // 25. جامعة بيشة - بيشة
  // ==========================================================================
  {
    id: "ub",
    city: { ar: "بيشة", en: "Bisha" },
    name: { ar: "جامعة بيشة", en: "University of Bisha" },
    colleges: [
      col("ub", "edu", "كلية التربية والآداب", "Colleges of Education & Arts", [
        createRegionalSportMajor("ub"),
        m("ub", "edu-lang", "المناهج والتربية الخاصة واللغات", "Curriculum, Special Ed & Languages", 128, TPL_EDU_CURR),
      ]),
      col("ub", "cs-eng", "كلية الحاسبات وتقنية المعلومات وكلية الهندسة", "Colleges of Computing & Engineering", [
        m("ub", "cs-ai", "علوم الحاسب والذكاء الاصطناعي والأمن السيبراني", "CS, AI & Cybersecurity", 134, TPL_AI_DS),
        m("ub", "eng", "الهندسة المدنية والكهربائية والميكانيكية", "Civil, Electrical & Mechanical Engineering", 138, TPL_EE),
      ]),
      col("ub", "health-bus", "الكليات الطبية وإدارة الأعمال والعلوم", "Medical, Business & Sciences", [
        m("ub", "med-ams", "الطب والعلوم الطبية التطبيقية والتمريض", "Medicine, Applied Medical Sciences & Nursing", 174, TPL_MED),
        m("ub", "bus-sci", "الأعمال والمحاسبة والعلوم", "Business, Accounting & Sciences", 128, TPL_BUS_MGT),
      ]),
    ],
  },

  // ==========================================================================
  // 26. جامعة حفر الباطن - حفر الباطن
  // ==========================================================================
  {
    id: "uhb",
    city: { ar: "حفر الباطن", en: "Hafr Al-Batin" },
    name: { ar: "جامعة حفر الباطن", en: "University of Hafr Al-Batin" },
    colleges: [
      col("uhb", "edu", "كلية التربية", "College of Education", [
        createRegionalSportMajor("uhb"),
        m("uhb", "edu-lang", "التربية الخاصة والطفولة المبكرة واللغات", "Special Ed, Early Childhood & Languages", 128, TPL_EDU_CURR),
      ]),
      col("uhb", "ccse-eng", "كلية علوم وهندسة الحاسب وكلية الهندسة", "Colleges of Computer Science & Engineering", [
        m("uhb", "cs-swe", "علوم الحاسب وهندسة البرمجيات والأمن السيبراني", "CS, Software Engineering & Cybersecurity", 134, TPL_SWE),
        m("uhb", "eng", "الهندسة الكهربائية والميكانيكية والمدنية والكيميائية", "Electrical, Mechanical, Civil & Chemical Eng", 138, TPL_ME),
      ]),
      col("uhb", "health-bus", "الكليات الصحية وإدارة الأعمال والعلوم", "Health, Business & Sciences", [
        m("uhb", "ams-nurs", "التمريض والمختبرات الإكلينيكية والعلوم الصحية", "Nursing, Clinical Lab & Health Sciences", 136, TPL_ALLIED_HEALTH),
        m("uhb", "bus-sci", "إدارة الأعمال والمالية والمحاسبة والعلوم", "Business, Finance, Accounting & Sciences", 128, TPL_FIN_ACCT),
      ]),
    ],
  },

  // ==========================================================================
  // 27. الجامعة الإسلامية بالمدينة المنورة
  // ==========================================================================
  {
    id: "iu",
    city: { ar: "المدينة المنورة", en: "Madinah" },
    name: { ar: "الجامعة الإسلامية بالمدينة المنورة", en: "Islamic University of Madinah" },
    colleges: [
      col("iu", "sharia-quran", "كليات الشريعة والقرآن والحديث والدعوة والأنظمة", "Colleges of Sharia, Quran, Hadith, Dawah & Law", [
        m("iu", "sharia", "الشريعة والقضاء والأنظمة", "Sharia, Judiciary & Law", 136, TPL_SHARIA_LAW),
        m("iu", "quran-hadith", "القرآن الكريم والدراسات الإسلامية والحديث الشريف", "Holy Quran, Hadith & Islamic Studies", 134, TPL_SHARIA_LAW),
      ]),
      col("iu", "arabic", "كلية اللغة العربية", "College of Arabic Language", [
        m("iu", "ar-lit", "اللغة العربية وآدابها واللغويات", "Arabic Language, Literature & Linguistics", 132, TPL_LANG_MEDIA),
      ]),
      col("iu", "cis-eng-sci", "كليات الحاسب الآلي والهندسة والعلوم", "Colleges of Computer, Engineering & Sciences", [
        m("iu", "cs-it", "علوم الحاسب وتقنية المعلومات ونظم المعلومات", "CS, IT & Information Systems", 134, TPL_CS),
        m("iu", "eng", "الهندسة الكهربائية والمدنية والميكانيكية والكيميائية", "Electrical, Civil, Mechanical & Chemical Eng", 138, TPL_EE),
        m("iu", "sci", "الرياضيات والفيزياء والكيمياء", "Mathematics, Physics & Chemistry", 130, TPL_SCI_MATH),
      ]),
    ],
  },

  // ==========================================================================
  // 28. جامعة الملك سعود بن عبدالعزيز للعلوم الصحية (KSAU-HS)
  // ==========================================================================
  {
    id: "ksauhs",
    city: { ar: "الرياض / جدة / الأحساء", en: "Riyadh / Jeddah / Al-Ahsa" },
    name: { ar: "جامعة الملك سعود بن عبدالعزيز للعلوم الصحية", en: "King Saud bin Abdulaziz University for Health Sciences" },
    colleges: [
      col("ksauhs", "med-dent", "كليتا الطب وطب الأسنان", "Colleges of Medicine & Dentistry", [
        m("ksauhs", "med", "الطب والجراحة", "Medicine & Surgery", 196, TPL_MED),
        m("ksauhs", "dent", "طب الأسنان", "Dentistry", 184, TPL_DENT),
      ]),
      col("ksauhs", "pharm-nurs", "كليتا الصيدلة والتمريض", "Colleges of Pharmacy & Nursing", [
        m("ksauhs", "pharm", "دكتور صيدلة (PharmD)", "Doctor of Pharmacy (PharmD)", 170, TPL_PHARM),
        m("ksauhs", "nurs", "التمريض", "Nursing", 136, TPL_NURS),
      ]),
      col("ksauhs", "ams-ph", "كليتا العلوم الطبية التطبيقية والصحة العامة والمعلوماتية الصحية", "Colleges of Applied Medical Sciences & Public Health/Health Informatics", [
        m("ksauhs", "ems-resp", "الرعاية التنفسية والخدمات الطبية الطارئة والتخدير", "Respiratory Therapy, EMS & Anesthesia Tech", 138, TPL_ALLIED_HEALTH),
        m("ksauhs", "cls-rad", "المختبرات الإكلينيكية والأشعة والعلاج الوظيفي", "Clinical Lab, Radiological Sciences & OT", 138, TPL_ALLIED_HEALTH),
        m("ksauhs", "hi", "المعلوماتية الصحية والوبائيات", "Health Informatics & Epidemiology", 134, TPL_IS_IT),
      ]),
    ],
  },

  // ==========================================================================
  // 29. جامعة الملك عبدالله للعلوم والتقنية (KAUST) - الدراسات العليا والأبحاث
  // ==========================================================================
  {
    id: "kaust",
    city: { ar: "ثول", en: "Thuwal" },
    name: { ar: "جامعة الملك عبدالله للعلوم والتقنية (كاوست)", en: "King Abdullah University of Science & Technology (KAUST)" },
    colleges: [
      col("kaust", "cemse", "قسم العلوم والهندسة الحاسوبية والكهربائية والرياضية", "Computer, Electrical & Mathematical Science & Engineering (CEMSE)", [
        m("kaust", "ai-cs", "علوم الحاسب والذكاء الاصطناعي والأمن السيبراني", "Computer Science, AI & Cybersecurity", 132, TPL_AI_DS),
        m("kaust", "ee-stat", "الهندسة الكهربائية والإحصاء والرياضيات التطبيقية", "Electrical Engineering & Applied Mathematics", 132, TPL_EE),
      ]),
      col("kaust", "pse-bese", "أقسام العلوم والهندسة الفيزيائية والبيولوجية والبيئية", "Physical & Biological/Environmental Science & Engineering", [
        m("kaust", "che-me", "الهندسة الكيميائية والميكانيكية والطاقة المتجددة", "Chemical, Mechanical & Energy Engineering", 132, TPL_CHE_PETE),
        m("kaust", "bio-mar", "العلوم البيولوجية وعلوم البحار والهندسة الحيوية", "Bioscience, Marine Science & Bioengineering", 132, TPL_SCI_MATH),
      ]),
    ],
  },
];
