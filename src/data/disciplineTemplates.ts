import { LocalizedText } from "../i18n/translations";
import type { CourseItem, MajorItem } from "./universityPlans";

export interface CourseTemplate {
  slug: string;
  code: string;
  level: number;
  credits: number;
  arTitle: string;
  enTitle: string;
  arFocus: string;
  enFocus: string;
}

function t(
  slug: string,
  code: string,
  level: number,
  credits: number,
  arTitle: string,
  enTitle: string,
  arFocus: string,
  enFocus: string
): CourseTemplate {
  return { slug, code, level, credits, arTitle, enTitle, arFocus, enFocus };
}

export function buildMajorPlan(
  uniId: string,
  majorId: string,
  name: LocalizedText,
  totalCredits: number,
  templates: CourseTemplate[],
  customCourses: CourseItem[] = []
): MajorItem {
  const existingSlugs = new Set(customCourses.map((c) => c.code.toLowerCase().replace(/\s+/g, "")));
  const generated: CourseItem[] = templates
    .filter((tpl) => !existingSlugs.has(tpl.code.toLowerCase().replace(/\s+/g, "")))
    .map((tpl) => ({
      id: `${uniId}-${majorId}-${tpl.slug}`,
      code: tpl.code,
      level: tpl.level,
      credits: tpl.credits,
      title: { ar: tpl.arTitle, en: tpl.enTitle },
      focus: { ar: tpl.arFocus, en: tpl.enFocus },
    }));

  const merged = [...customCourses, ...generated].sort(
    (a, b) => a.level - b.level || a.code.localeCompare(b.code)
  );

  return {
    id: `${uniId}-${majorId}`,
    totalCredits,
    name,
    courses: merged,
  };
}

// ============================================================================
// 1. الحوسبة والذكاء الاصطناعي والأمن السيبراني
// ============================================================================
export const TPL_CS: CourseTemplate[] = [
  t("cs101", "CS 101", 1, 4, "أساسيات البرمجة", "Programming Fundamentals", "الخوارزميات الأولية والتحكم بالتدفق والدوال", "Control flow, functions, and structured programming"),
  t("cs102", "MATH 101", 1, 3, "التفاضل والتكامل للعلوم", "Calculus for Computing", "النهايات والاشتقاق والتكامل وتطبيقاتها", "Limits, differentiation, integration, and applications"),
  t("cs201", "CS 201", 2, 3, "الرياضيات المتقطعة", "Discrete Mathematics", "المنطق الرياضي والمجموعات والعلاقات والمخططات", "Logic, sets, relations, combinatorics, and graphs"),
  t("cs202", "CS 202", 2, 4, "البرمجة الكائنية (OOP)", "Object-Oriented Programming", "التغليف والوراثة وتعدد الأشكال وتصميم الأصناف", "Encapsulation, inheritance, polymorphism, and class design"),
  t("cs301", "CS 301", 3, 3, "التصميم المنطقي الرقمي", "Digital Logic Design", "البوابات المنطقية والدوائر التتابعية والتجميعية", "Boolean algebra, combinational and sequential circuits"),
  t("cs302", "CS 302", 4, 4, "تراكيب البيانات والخوارزميات", "Data Structures & Algorithms", "الأشجار والمخططات والتجزئة وتحليل التعقيد الزمني", "Trees, graphs, hashing, and Big-O complexity analysis"),
  t("cs401", "CS 401", 4, 3, "معمارية وتنظيم الحاسب", "Computer Architecture & Organization", "تصميم المعالجات ولغة التجميع والذاكرة المخبئية", "CPU datapath, assembly language, and memory hierarchy"),
  t("cs501", "CS 501", 5, 3, "قواعد البيانات", "Database Systems", "النموذج العلائقي والتطبيع ولغة الاستعلام SQL", "Relational modeling, normalization, transactions, and SQL"),
  t("cs502", "CS 502", 5, 3, "نظم التشغيل", "Operating Systems", "إدارة العمليات والخيوط والذاكرة الافتراضية والملفات", "Processes, scheduling, deadlocks, and virtual memory"),
  t("cs601", "CS 601", 6, 3, "شبكات الحاسب", "Computer Networks", "طبقات TCP/IP والتوجيه وبروتوكولات الإنترنت", "TCP/IP stack, routing, switching, and network protocols"),
  t("cs602", "CS 602", 6, 3, "هندسة البرمجيات", "Software Engineering", "المنهجيات الرشيقة وهندسة المتطلبات والاختبار", "Agile SDLC, UML modeling, and quality assurance"),
  t("cs701", "CS 701", 7, 3, "الذكاء الاصطناعي وتعلم الآلة", "Artificial Intelligence & Machine Learning", "خوارزميات البحث والشبكات العصبية ونماذج التنبؤ", "Heuristic search, neural networks, and supervised learning"),
  t("cs702", "CS 702", 7, 3, "أمن الحاسب والتشفير", "Computer Security & Cryptography", "خوارزميات التشفير وحماية الأنظمة والتطبيقات", "Symmetric/asymmetric crypto and system hardening"),
  t("cs801", "CS 499", 8, 4, "مشروع التخرج في علوم الحاسب", "Computer Science Capstone Project", "تصميم وبناء ومناقشة نظام برمجي متكامل", "End-to-end software system engineering and defense"),
];

export const TPL_SWE: CourseTemplate[] = [
  ...TPL_CS.slice(0, 6),
  t("swe401", "SWE 301", 5, 3, "هندسة المتطلبات البرمجية", "Software Requirements Engineering", "توثيق متطلبات المستخدم ونمذجة حالات الاستخدام", "Requirements elicitation, SRS, and use-case modeling"),
  t("swe501", "SWE 321", 5, 3, "تصميم ومعمارية البرمجيات", "Software Architecture & Design Patterns", "أنماط التصميم المعمارية والخدمات المصغرة", "Design patterns, clean architecture, and microservices"),
  t("swe601", "SWE 340", 6, 3, "تطوير تطبيقات الويب والهواتف", "Web & Mobile Application Engineering", "بناء الواجهات الحديثة وربط قواعد البيانات السحابية", "Full-stack web/mobile frameworks and REST APIs"),
  t("swe602", "SWE 360", 6, 3, "تفاعل الإنسان والحاسب (HCI)", "Human-Computer Interaction", "تصميم تجربة المستخدم وإتاحة الواجهات وسهولة الاستخدام", "UX design principles, prototyping, and usability testing"),
  t("swe701", "SWE 434", 7, 3, "اختبار البرمجيات وضمان الجودة", "Software Testing & Quality Assurance", "اختبار الوحدات والتكامل والأتمتة المستمرة CI/CD", "Unit/integration testing, TDD, and CI/CD pipelines"),
  t("swe702", "SWE 450", 7, 3, "إدارة المشاريع البرمجية وDevOps", "Software Project Management & DevOps", "تقدير التكلفة وإدارة المخاطر والحاويات السحابية", "Agile estimation, risk control, and container orchestration"),
  t("swe801", "SWE 499", 8, 4, "مشروع التخرج والتدريب التعاوني", "Software Engineering Capstone & Co-op", "تطبيق هندسي ميداني وبناء منتج برمجي", "Industry co-op and production software capstone"),
];

export const TPL_CYS: CourseTemplate[] = [
  ...TPL_CS.slice(0, 6),
  t("cys401", "CYS 301", 5, 3, "أساسيات الأمن السيبراني", "Fundamentals of Cybersecurity", "مبادئ السرية والسلامة والتوافر وإدارة الثغرات", "CIA triad, threat modeling, and vulnerability defense"),
  t("cys501", "CYS 320", 5, 3, "التشفير التطبيقي", "Applied Cryptography", "التشفير المتماثل وغير المتماثل والتوقيع الرقمي", "AES, RSA, hashing, PKI, and digital signatures"),
  t("cys601", "CYS 340", 6, 3, "أمن الشبكات وجدران الحماية", "Network Security & Defense", "اكتشاف التسلل IDS وتأمين البنية التحتية", "Firewalls, IDS/IPS, VPNs, and traffic analysis"),
  t("cys602", "CYS 360", 6, 3, "الاختراق الأخلاقي واختبار الاختراق", "Ethical Hacking & Penetration Testing", "منهجيات فحص الثغرات وتأمين تطبيقات الويب", "Penetration testing lifecycle and OWASP defense"),
  t("cys701", "CYS 410", 7, 3, "التحقيق الجنائي الرقمي والاستجابة للحوادث", "Digital Forensics & Incident Response", "جمع الأدلة الرقمية وتحليل البرمجيات الخبيثة", "Forensic acquisition, memory analysis, and IR"),
  t("cys702", "CYS 430", 7, 3, "الحوكمة والمخاطر والالتزام (GRC / NCA)", "Cyber Governance, Risk & Compliance", "ضوابط الهيئة الوطنية للأمن السيبراني NCA ECC", "Saudi NCA ECC controls, ISO 27001, and risk audits"),
  t("cys801", "CYS 499", 8, 4, "مشروع التخرج في الأمن السيبراني", "Cybersecurity Capstone & Practicum", "تصميم منظومة دفاعية أو تحليل أمني متكامل", "Applied security operations capstone"),
];

export const TPL_AI_DS: CourseTemplate[] = [
  ...TPL_CS.slice(0, 6),
  t("ai401", "AI 301", 5, 3, "الإحصاء والاحتمالات لعلم البيانات", "Probability & Statistics for Data Science", "التوزيعات والاستدلال الإحصائي والانحدار", "Statistical inference, Bayesian methods, and regression"),
  t("ai501", "AI 320", 5, 3, "تعلم الآلة (Machine Learning)", "Machine Learning", "التعلم الخاضع وغير الخاضع للإشراف وأشجار القرار", "Supervised/unsupervised learning, SVM, and ensembles"),
  t("ai601", "AI 340", 6, 3, "التعلم العميق والشبكات العصبية", "Deep Learning & Neural Networks", "الشبكات الالتفافية CNN والمحولات Transformers", "CNNs, RNNs, attention mechanisms, and Transformers"),
  t("ai602", "AI 360", 6, 3, "تحليل البيانات الضخمة والتمثيل المرئي", "Big Data Analytics & Visualization", "معالجة البيانات الموزعة وبناء لوحات المعلومات", "Distributed data pipelines and visual storytelling"),
  t("ai701", "AI 410", 7, 3, "معالجة اللغة الطبيعية والرؤية الحاسوبية", "NLP & Computer Vision", "النماذج اللغوية الكبيرة وفهم النصوص العربية والصور", "Arabic NLP, LLMs, and image recognition"),
  t("ai801", "AI 499", 8, 4, "مشروع التخرج في الذكاء الاصطناعي", "AI & Data Science Capstone", "تدريب ونشر نموذج ذكاء اصطناعي لحل مشكلة واقعية", "End-to-end AI model training and deployment"),
];

export const TPL_IS_IT: CourseTemplate[] = [
  ...TPL_CS.slice(0, 5),
  t("is301", "IS 201", 4, 3, "تحليل وتصميم نظم المعلومات", "Systems Analysis & Design", "نمذجة العمليات التجارية ومخططات UML", "SDLC, BPMN, and object-oriented system analysis"),
  t("is401", "IS 301", 5, 3, "إدارة قواعد البيانات المؤسسية", "Enterprise Database Management", "إدارة البيانات والتخزين السحابي والاستعلام المتقدم", "Enterprise RDBMS, indexing, and cloud data"),
  t("is501", "IS 320", 5, 3, "نظم تخطيط موارد المؤسسات (ERP)", "Enterprise Resource Planning (ERP)", "تكامل العمليات المالية واللوجستية والموارد البشرية", "SAP/Oracle enterprise workflows and integration"),
  t("is601", "IS 340", 6, 3, "إدارة الشبكات والأنظمة والحوسبة السحابية", "Network, Linux Admin & Cloud Computing", "تشغيل الخوادم والخدمات السحابية والمحاكاة الافتراضية", "Linux sysadmin, cloud architecture, and virtualization"),
  t("is602", "IS 360", 6, 3, "أمن المعلومات واستمرارية الأعمال", "Information Security & Business Continuity", "حماية الأصول الرقمية وإدارة المخاطر المؤسسية", "InfoSec governance, disaster recovery, and audits"),
  t("is701", "IS 410", 7, 3, "ذكاء الأعمال وتحليلات البيانات", "Business Intelligence & Analytics", "مستودعات البيانات ولوحات اتخاذ القرار الإداري", "Data warehousing, ETL, and executive dashboards"),
  t("is801", "IS 499", 8, 4, "مشروع التخرج والتدريب الميداني", "IS/IT Capstone & Field Internship", "تطوير وتطبيق نظام معلومات لمؤسسة حقيقية", "Enterprise system capstone and co-op"),
];

// ============================================================================
// 2. الهندسة والعمارة
// ============================================================================
export const TPL_EE: CourseTemplate[] = [
  t("ee101", "MATH 101", 1, 4, "التفاضل والتكامل (١ و ٢)", "Engineering Calculus I & II", "النهايات والاشتقاق والتكامل المتعدد", "Limits, derivatives, integrals, and multivariable calculus"),
  t("ee102", "PHYS 101", 1, 4, "الفيزياء الهندسية (الكهرباء والمغناطيسية)", "Engineering Physics (Electromagnetism)", "المجال الكهربائي والمغناطيسي وقوانين ماكسويل الأولية", "Electric/magnetic fields, Gauss's and Faraday's laws"),
  t("ee201", "EE 201", 2, 3, "تحليل الدوائر الكهربائية (١ و ٢)", "Electric Circuit Analysis I & II", "قوانين كيرشوف والتيار المستمر والمتردد والطور", "Kirchhoff's laws, DC/AC circuits, and phasor analysis"),
  t("ee202", "EE 202", 3, 3, "التصميم المنطقي والأنظمة الرقمية", "Digital Logic & Systems", "البوابات المنطقية والدارات التوافقية والتتابعية", "Combinational/sequential logic and FPGA basics"),
  t("ee301", "EE 301", 4, 3, "الإلكترونيات التناظرية والرقمية", "Analog & Digital Electronics", "الدايودات والترانزستورات ومضخمات العمليات", "Diodes, BJTs, MOSFETs, and operational amplifiers"),
  t("ee302", "EE 302", 4, 3, "الإشارات والنظم", "Signals & Systems", "تحليل فورييه ولابلاس واستجابة الأنظمة الخطية", "Fourier/Laplace transforms and LTI system response"),
  t("ee401", "EE 310", 5, 3, "المجالات الكهرومغناطيسية", "Electromagnetics", "الموجات الكهرومغناطيسية وخطوط النقل والهوائيات", "EM waves, transmission lines, and antenna basics"),
  t("ee501", "EE 340", 5, 3, "الآلات الكهربائية وأنظمة القوى", "Electric Machines & Power Systems", "المحولات والمحركات وشبكات نقل وتوزيع الطاقة", "Transformers, AC/DC machines, and power grids"),
  t("ee601", "EE 360", 6, 3, "أنظمة التحكم الآلي", "Automatic Control Systems", "استقرار الأنظمة ومخطط بود والمحكمات PID", "Feedback stability, Bode plots, and PID controllers"),
  t("ee602", "EE 370", 6, 3, "مبادئ الاتصالات الكهربائية", "Communication Systems", "التضمين التناظري والرقمي وضوضاء القنوات", "AM/FM, digital modulation, and channel noise"),
  t("ee701", "EE 420", 7, 3, "إلكترونيات القوى والطاقة المتجددة", "Power Electronics & Renewable Energy", "المحولات الإلكترونية وأنظمة الطاقة الشمسية والرياح", "Converters, inverters, and solar/wind integration"),
  t("ee801", "EE 499", 8, 4, "مشروع التخرج في الهندسة الكهربائية", "Electrical Engineering Senior Design", "تصميم وبناء واختبار نموذج هندسي متكامل", "Senior hardware/system design capstone"),
];

export const TPL_ME: CourseTemplate[] = [
  t("me101", "MATH 101", 1, 4, "التفاضل والتكامل والمعادلات التفاضلية", "Engineering Calculus & Differential Equations", "التحليل الرياضي والمعادلات التفاضلية للأنظمة", "Calculus and ODE modeling for mechanical systems"),
  t("me102", "ME 102", 1, 3, "الرسم الهندسي والتصميم بالحاسب CAD", "Engineering Graphics & CAD", "الإسقاط الهندسي والنمذجة ثلاثية الأبعاد SolidWorks", "Orthographic projection and 3D SolidWorks modeling"),
  t("me201", "ME 201", 2, 3, "الاستاتيكا والديناميكا", "Statics & Dynamics", "توازن القوى والعزوم وحركة الأجسام الصلبة", "Equilibrium of forces, moments, and rigid body motion"),
  t("me202", "ME 202", 3, 3, "علم وهندسة المواد", "Materials Science & Engineering", "البنية البلورية للمعادن والسبائك والاختبارات الميكانيكية", "Crystal structure, alloys, and mechanical testing"),
  t("me301", "ME 204", 4, 3, "الديناميكا الحرارية (١ و ٢)", "Thermodynamics I & II", "قوانين الطاقة الحرارية ودورات كارنو ورانكن وبرايتون", "Laws of thermodynamics and power/refrigeration cycles"),
  t("me302", "ME 301", 4, 3, "مقاومة وميكانيكا المواد", "Mechanics of Materials", "الإجهاد والانفعال والالتواء وانحناء الكمرات", "Stress, strain, torsion, and beam bending"),
  t("me401", "ME 311", 5, 3, "ميكانيكا الموائع", "Fluid Mechanics", "هيدروستاتيكا الموائع ومعادلة برنولي والطبقة الحدية", "Fluid statics, Bernoulli equation, and pipe flow"),
  t("me501", "ME 315", 5, 3, "انتقال الحرارة والكتلة", "Heat & Mass Transfer", "التوصيل والحمل والإشعاع وتصميم المبادلات الحرارية", "Conduction, convection, radiation, and heat exchangers"),
  t("me601", "ME 322", 6, 3, "تصميم العناصر الآلية", "Machine Element Design", "تصميم التروس والأعمدة والمحامل والكلال الميكانيكي", "Shafts, gears, bearings, and fatigue failure analysis"),
  t("me602", "ME 350", 6, 3, "عمليات التصنيع والآلات", "Manufacturing Processes", "السباكة والتشكيل والتشغيل الآلي CNC واللحام", "Casting, forming, CNC machining, and welding"),
  t("me701", "ME 410", 7, 3, "الاهتزازات الميكانيكية والميكاترونكس", "Mechanical Vibrations & Mechatronics", "تحليل الاهتزاز وأنظمة الاستشعار والتحكم الآلي", "Vibration modeling, sensors, and mechatronic actuation"),
  t("me801", "ME 499", 8, 4, "مشروع التخرج في الهندسة الميكانيكية", "Mechanical Engineering Senior Design", "تصميم وتصنيع واختبار منظومة ميكانيكية", "Mechanical design, fabrication, and testing capstone"),
];

export const TPL_CIV: CourseTemplate[] = [
  t("civ101", "CE 101", 1, 3, "مدخل إلى الهندسة المدنية والرسم الهندسي", "Intro to Civil Engineering & AutoCAD", "المخططات الهندسية والتصميم بمساعدة الحاسب", "Engineering drafting, AutoCAD, and civil domains"),
  t("civ201", "CE 201", 2, 3, "الاستاتيكا وميكانيكا المواد", "Statics & Mechanics of Materials", "تحليل القوى والإجهاد والانفعال في المنشآت", "Force equilibrium, stress-strain, and deflection"),
  t("civ202", "CE 202", 3, 3, "المساحة الهندسية ونظم GIS", "Surveying & Geospatial Systems", "قياس المسافات والمناسيب والرفع المساحي الرقمي", "Leveling, traversing, and GIS mapping"),
  t("civ301", "CE 301", 4, 3, "التحليل الإنشائي", "Structural Analysis", "حساب العزوم والقص والانحراف في الهياكل", "Shear/moment diagrams, trusses, and indeterminate frames"),
  t("civ401", "CE 315", 5, 3, "مواد البناء والخرسانة المسلحة (١)", "Construction Materials & Reinforced Concrete I", "تصميم البلاطات والكمرات والأعمدة الخرسانية", "Concrete mix design, beams, slabs, and columns"),
  t("civ501", "CE 330", 5, 3, "ميكانيكا التربة وهندسة الأساسات", "Geotechnical Engineering & Foundations", "تصنيف التربة والهبوط وتصميم الأساسات السطحية والعميقة", "Soil classification, bearing capacity, and foundations"),
  t("civ601", "CE 350", 6, 3, "الهيدروليكا والهندسة البيئية والمياه", "Hydraulics & Environmental Engineering", "تصميم شبكات المياه والصرف ومعالجة المياه", "Pipe networks, open-channel flow, and water treatment"),
  t("civ602", "CE 370", 6, 3, "هندسة الطرق والمرور والنقل", "Transportation & Highway Engineering", "تصميم الطرق السريعة وتخطيط التقاطعات المرورية", "Highway geometric design and traffic flow modeling"),
  t("civ701", "CE 410", 7, 3, "تصميم المنشآت الفولاذية", "Steel Structure Design", "تصميم العناصر والوصلات الفولاذية وفق الكود السعودي", "Steel tension, compression, flexural members, and SBC"),
  t("civ702", "CE 430", 7, 3, "إدارة المشاريع الهندسية وحساب الكميات", "Construction Management & Cost Estimating", "جدولة المشاريع CPM/PERT والعقود والمواصفات", "CPM scheduling, quantity surveying, and contracts"),
  t("civ801", "CE 499", 8, 4, "مشروع التخرج في الهندسة المدنية", "Civil Engineering Senior Design", "تصميم مشروع إنشائي أو بنية تحتية متكامل", "Integrated structural or infrastructure design capstone"),
];

export const TPL_IE: CourseTemplate[] = [
  t("ie101", "IE 200", 2, 3, "مقدمة في التصميم والهندسة الصناعية", "Introduction to Industrial & Systems Design", "تحليل النظم الإنتاجية ومنهجية حل المشكلات", "Systems thinking and engineering design process"),
  t("ie201", "IE 201", 3, 3, "الاحتمالات والإحصاء الهندسي", "Engineering Probability & Statistics", "التوزيعات واختبار الفرضيات وتحليل التباين ANOVA", "Distributions, hypothesis tests, and ANOVA"),
  t("ie301", "IE 311", 4, 3, "بحوث العمليات (١ و ٢)", "Operations Research I & II", "البرمجة الخطية والشبكات ونماذج الصفوف والمحاكاة", "Linear programming, simplex, queuing, and simulation"),
  t("ie401", "IE 321", 5, 3, "دراسة العمل وهندسة العوامل البشرية", "Work Design & Ergonomics", "قياس الزمن والحركة والسلامة المهنية وبيئة العمل", "Time-motion study, human factors, and workplace safety"),
  t("ie501", "IE 341", 5, 3, "الاقتصاد الهندسي", "Engineering Economy", "تحليل التدفقات النقدية وتقييم البدائل الاستثمارية", "Time value of money, NPV, IRR, and replacement analysis"),
  t("ie601", "IE 361", 6, 3, "تخطيط وضبط الإنتاج والمخزون", "Production Planning & Inventory Control", "التنبؤ بالطلب وجدولة الإنتاج ونظام MRP", "Demand forecasting, scheduling, EOQ, and MRP"),
  t("ie701", "IE 422", 7, 3, "هندسة الجودة وسلاسل الإمداد (Six Sigma)", "Quality Engineering & Supply Chains", "خرائط الضبط الإحصائي وحيود ستة سيجما واللوجستيات", "SPC charts, Six Sigma DMAIC, and global logistics"),
  t("ie801", "IE 499", 8, 4, "مشروع التخرج في الهندسة الصناعية", "Industrial Engineering Senior Project", "تحسين منظومة تشغيلية أو صناعية حقيقية", "Applied industrial optimization capstone"),
];

export const TPL_CHE_PETE: CourseTemplate[] = [
  t("ch101", "CHEM 101", 1, 4, "الكيمياء العامة والعضوية", "General & Organic Chemistry", "الروابط الكيميائية والاتزان والمركبات الهيدروكربونية", "Stoichiometry, equilibrium, and hydrocarbon chemistry"),
  t("ch201", "CHE 201", 3, 3, "موازنة المادة والطاقة", "Material & Energy Balances", "حسابات العمليات الكيميائية والتفاعلات الصناعية", "Process stoichiometry and energy balance systems"),
  t("ch301", "CHE 301", 4, 3, "الديناميكا الحرارية للعمليات الكيميائية", "Chemical Engineering Thermodynamics", "توازن الأطوار والسلوك الحراري للموائع والغازات", "Phase equilibria and non-ideal fluid thermodynamics"),
  t("ch401", "CHE 311", 5, 3, "عمليات الفصل وانتقال المادة", "Separation Processes & Mass Transfer", "التقطير والامتصاص والاستخلاص وتصميم الأبراج", "Distillation, absorption, extraction, and column design"),
  t("ch501", "CHE 321", 5, 3, "هندسة التفاعلات الكيميائية", "Chemical Reaction Engineering", "حركية التفاعلات وتصميم المفاعلات الصناعية", "Reaction kinetics and CSTR/PFR reactor design"),
  t("ch601", "CHE 411", 6, 3, "تصميم العمليات والتحكم الآلي", "Process Design & Control", "ضبط المصانع الكيميائية ومحاكاة العمليات HYSYS", "Process dynamics, feedback control, and Aspen HYSYS"),
  t("ch701", "CHE 431", 7, 3, "هندسة البتروكيماويات والسلامة الصناعية", "Petrochemicals & Process Safety", "تكرير النفط وتقنيات السلامة وتقييم المخاطر HAZOP", "Refining processes and HAZOP industrial safety"),
  t("ch801", "CHE 499", 8, 4, "مشروع تصميم المصانع والتخرج", "Plant Design & Senior Capstone", "التصميم الهندسي والاقتصادي المتكامل لوحدة إنتاج", "Integrated chemical/petroleum plant design project"),
];

export const TPL_ARCH: CourseTemplate[] = [
  t("ar101", "ARCH 101", 1, 4, "التصميم الأساسي ومبادئ التكوين", "Basic Architectural Design Studio", "العلاقات الفراغية والكتلة والفراغ والظل والنور", "Spatial composition, form, light, and architectural sketching"),
  t("ar201", "ARCH 201", 2, 4, "تاريخ ونظريات العمارة الإسلامية والعالمية", "History of Islamic & World Architecture", "الطرز المعمارية والتراث العمراني السعودي (السلماني/النجدي)", "Islamic heritage, Saudi vernacular, and architectural theory"),
  t("ar301", "ARCH 210", 3, 4, "استوديو التصميم المعماري (١ و ٢)", "Architectural Design Studio I & II", "تصميم المباني السكنية والثقافية والتكامل البيئي", "Residential/cultural building design and site context"),
  t("ar401", "ARCH 301", 4, 3, "طرق وتقنيات البناء والتنفيذ", "Building Construction & Detailing", "تفاصيل المباني والمواد الإنشائية والواجهات", "Construction assemblies, envelopes, and detailing"),
  t("ar501", "ARCH 320", 5, 3, "التحكم البيئي والعمارة المستدامة", "Environmental Control & Sustainability", "الإضاءة الطبيعية والصوتيات والتبريد في المناخ الحار", "Daylighting, acoustics, and passive cooling in arid climates"),
  t("ar601", "ARCH 350", 6, 3, "نمذجة معلومات البناء (BIM / Revit)", "Building Information Modeling (BIM)", "التصميم المعماري الرقمي والتنسيق الهندسي ثلاثي الأبعاد", "Parametric BIM workflows and multidisciplinary coordination"),
  t("ar701", "ARCH 410", 7, 4, "التخطيط العمراني وتنسيق المواقع", "Urban Planning & Landscape Design", "تصميم الأحياء السكنية والمشاريع الحضرية وأنسنة المدن", "Neighborhood masterplanning and human-centered urbanism"),
  t("ar801", "ARCH 499", 8, 6, "مشروع التخرج المعماري", "Architectural Senior Thesis Studio", "إعداد وتطوير مشروع معماري شامل ومناقشته", "Comprehensive architectural thesis design and jury"),
];

// ============================================================================
// 3. الطب والعلوم الصحية والبيطرية
// ============================================================================
export const TPL_MED: CourseTemplate[] = [
  t("md101", "MED 101", 1, 4, "علم التشريح البشري والأجنة", "Human Anatomy & Embryology", "التشريح العياني للأطراف والصدر والبطن والرأس والعنق", "Gross anatomy of limbs, thorax, abdomen, and neuroanatomy"),
  t("md201", "MED 102", 2, 3, "علم الأنسجة وبيولوجيا الخلية", "Histology & Cell Biology", "التركيب المجهري للأنسجة الظهارية والضامة والعضلية", "Microscopic tissue architecture and cellular ultrastructure"),
  t("md202", "MED 201", 3, 4, "علم وظائف الأعضاء (الفسيولوجيا)", "Medical Physiology", "فسيولوجيا القلب والتنفس والكلى والغدد الصماء والأعصاب", "Cardiovascular, respiratory, renal, endocrine, and neurophysiology"),
  t("md301", "MED 202", 3, 3, "الكيمياء الحيوية الطبية والوراثة", "Medical Biochemistry & Genetics", "الأيض الخلوي والإنزيمات والأمراض الاستقلابية والوراثية", "Metabolic pathways, enzymology, and clinical genetics"),
  t("md401", "MED 301", 4, 4, "علم الأمراض (الباثولوجيا)", "General & Systemic Pathology", "آليات الالتهاب والأورام وأمراض الأجهزة الحيوية", "Cellular injury, inflammation, neoplasia, and organ pathology"),
  t("md402", "MED 302", 4, 4, "علم الأحياء الدقيقة والمناعة", "Medical Microbiology & Immunology", "البكتيريا والفيروسات والفطريات والاستجابة المناعية", "Clinical pathogens, antimicrobials, and immune mechanisms"),
  t("md501", "MED 305", 5, 4, "علم الأدوية السريري", "Clinical Pharmacology", "حركية الدواء وآليات العمل والآثار الجانبية", "Pharmacokinetics, pharmacodynamics, and therapeutics"),
  t("md601", "MED 401", 6, 6, "الطب الباطني السريري", "Internal Medicine Clerkship", "أمراض القلب والصدر والجهاز الهضمي والسكري", "Cardiology, pulmonology, GI, nephrology, and endocrinology"),
  t("md602", "MED 402", 6, 6, "الجراحة العامة والتخدير والطوارئ", "General Surgery & Emergency Medicine", "التقييم الجراحي وإصابات الحوادث والرعاية الحرجة", "Pre/post-op surgical care, trauma, and emergency stabilization"),
  t("md701", "MED 410", 7, 5, "طب الأطفال والنساء والتوليد", "Pediatrics & Obstetrics/Gynecology", "نمو الطفل وتطعيماته ورعاية الحمل والولادة", "Pediatric development, neonatology, and maternal health"),
  t("md702", "MED 420", 7, 4, "طب الأسرة والمجتمع والصحة النفسية", "Family Medicine & Psychiatry", "الرعاية الأولية والوبائيات والاضطرابات النفسية", "Primary care, preventive epidemiology, and mental health"),
  t("md801", "MED 499", 8, 8, "سنة الامتياز الطبي السريري", "Clinical Medical Internship", "الدوران السريري الشامل في المستشفيات الجامعية", "Supervised hospital rotations across core medical specialties"),
];

export const TPL_PHARM: CourseTemplate[] = [
  t("ph101", "PHAR 101", 1, 3, "التشريح والفسيولوجيا للصيادلة", "Anatomy & Physiology for Pharmacy", "أجهزة الجسم البشرية والوظائف الحيوية المرتبطة بالدواء", "Human organ systems relevant to drug action"),
  t("ph201", "PHAR 201", 2, 3, "الكيمياء العضوية والتحليلية الصيدلانية", "Pharmaceutical Organic & Analytical Chemistry", "تحليل المركبات الدوائية والتركيب الكيميائي", "Drug functional groups, spectroscopy, and assay methods"),
  t("ph301", "PHAR 205", 3, 3, "الصيدلانيات وصناعة الأشكال الدوائية", "Pharmaceutics & Dosage Forms", "تركيب الأقراص والكبسولات والمحاليل والمستحلبات", "Formulation science, stability, and drug delivery"),
  t("ph401", "PHAR 301", 4, 3, "الكيمياء الدوائية وعلم العقاقير", "Medicinal Chemistry & Pharmacognosy", "علاقة التركيب الكيميائي بالنشاط الدوائي والنباتات الطبية", "SAR drug design and natural medicinal products"),
  t("ph501", "PHAR 310", 5, 4, "علم الأدوية والسموم (الفارماكولوجي)", "Pharmacology & Toxicology", "تأثير الأدوية على المستقبلات وعلاج التسمم", "Receptor pharmacology and clinical toxicology"),
  t("ph601", "PHAR 330", 6, 3, "الحركية الدوائية السريرية", "Clinical Pharmacokinetics", "حساب الجرعات والتوافر الحيوي وتعديل جرعات الكلى والكبد", "Dosing regimens, bioavailability, and therapeutic monitoring"),
  t("ph602", "PHAR 350", 6, 4, "العلاجيات الدوائية المبنية على البراهين", "Pharmacotherapy I & II", "خطط العلاج الدوائي لأمراض القلب والسكري والعدوى", "Evidence-based pharmacotherapy for chronic and acute disease"),
  t("ph701", "PHAR 410", 7, 3, "صيدلة المستشفيات والرعاية الصيدلانية", "Hospital Pharmacy & Patient Counseling", "صرف الأدوية وتقليل التداخلات الدوائية وسلامة المرضى", "Medication reconciliation, IV compounding, and counseling"),
  t("ph801", "PHAR 499", 8, 8, "التدريب الصيدلي السريري (الامتياز)", "Advanced Pharmacy Practice Experience (APPE)", "التدريب الميداني في المستشفيات وصيدليات المجتمع", "Clinical hospital and community pharmacy rotations"),
];

export const TPL_NURS: CourseTemplate[] = [
  t("nu101", "NURS 101", 1, 3, "التشريح والفسيولوجيا للتمريض", "Anatomy & Physiology for Nursing", "بنية ووظائف أجهزة جسم الإنسان للرعاية السريرية", "Human systems structure and physiological monitoring"),
  t("nu201", "NURS 201", 2, 4, "أساسيات التمريض والتقييم الصحي", "Fundamentals of Nursing & Health Assessment", "قياس العلامات الحيوية والفحص السريري ومكافحة العدوى", "Vital signs, physical assessment, and infection control"),
  t("nu301", "NURS 210", 3, 3, "علم الأدوية والأحياء الدقيقة للتمريض", "Pharmacology & Microbiology for Nursing", "إعطاء الأدوية الآمن والوقاية من العدوى المكتسبة", "Safe medication administration and clinical microbiology"),
  t("nu401", "NURS 301", 4, 5, "تمريض البالغين (الباطني والجراحي)", "Adult Health (Medical-Surgical) Nursing", "رعاية مرضى الجراحة والأقسام الباطنية المزمنة", "Acute and chronic adult patient care management"),
  t("nu501", "NURS 315", 5, 4, "تمريض الأمومة والطفولة", "Maternal, Newborn & Pediatric Nursing", "رعاية الحامل والولادة وصحة الطفل المريض", "Obstetric, neonatal, and pediatric clinical nursing"),
  t("nu601", "NURS 340", 6, 3, "التمريض النفسي وصحة المجتمع", "Psychiatric & Community Health Nursing", "التواصل العلاجي وبرامج الرعاية الصحية الأولية", "Therapeutic communication and public health outreach"),
  t("nu701", "NURS 410", 7, 4, "تمريض العناية الحرجة والطوارئ والقيادة", "Critical Care, Emergency & Nursing Leadership", "رعاية العناية المركزة ICU وإدارة الفرق التمريضية", "ICU monitoring, triage, and clinical unit leadership"),
  t("nu801", "NURS 499", 8, 8, "سنة الامتياز في التمريض", "Nursing Clinical Internship", "الممارسة السريرية المتكاملة بأقسام المستشفيات", "Supervised hospital internship across nursing units"),
];

export const TPL_ALLIED_HEALTH: CourseTemplate[] = [
  t("ah101", "HSCI 101", 1, 3, "المصطلحات الطبية ومبادئ العلوم الصحية", "Medical Terminology & Health Foundations", "الجذور واللواحق الطبية وأخلاقيات المهن الصحية", "Medical prefixes/suffixes and healthcare ethics"),
  t("ah201", "HSCI 201", 2, 4, "التشريح البشري وعلم وظائف الأعضاء", "Human Anatomy & Physiology", "التشريح العصبي والعضلي والقلبي التنفسي", "Neuromuscular and cardiorespiratory systems"),
  t("ah301", "HSCI 220", 3, 3, "علم الأمراض والأحياء الدقيقة السريرية", "Pathology & Clinical Microbiology", "العمليات المرضية ومكافحة العدوى في المنشآت الصحية", "Disease mechanisms and clinical biosafety"),
  t("ah401", "HSCI 301", 4, 4, "التقييم السريري والتشخيص المخبري/الوظيفي", "Clinical Assessment & Diagnostic Procedures", "فحوصات الكفاءة الوظيفية والتحاليل التشخيصية", "Diagnostic evaluation, biomarkers, and functional tests"),
  t("ah501", "HSCI 320", 5, 4, "التطبيقات العلاجية والتأهيلية المتخصصة", "Specialized Clinical & Therapeutic Interventions", "تصميم الخطط العلاجية وإعادة التأهيل حسب التخصص", "Targeted clinical treatment and rehabilitation protocols"),
  t("ah601", "HSCI 350", 6, 3, "التقنيات والأجهزة الطبية الحديثة", "Medical Instrumentation & Digital Health", "تشغيل ومعايرة الأجهزة التشخيصية والعلاجية", "Biomedical instrumentation and EHR workflows"),
  t("ah701", "HSCI 410", 7, 3, "البحث العلمي السريري والممارسة المبنية على البراهين", "Clinical Research & Evidence-Based Practice", "الإحصاء الحيوي وتصميم الدراسات السريرية", "Biostatistics and clinical trial appraisal"),
  t("ah801", "HSCI 499", 8, 8, "سنة الامتياز السريري", "Allied Health Clinical Internship", "تدريب سريري تطبيقي في المستشفيات والمراكز التخصصية", "Full-year supervised hospital clinical internship"),
];

export const TPL_DENT: CourseTemplate[] = [
  ...TPL_ALLIED_HEALTH.slice(0, 3),
  t("dn301", "DENT 210", 3, 4, "تشريح الأسنان والإطباق", "Dental Anatomy & Occlusion", "تشريح الأسنان اللبنية والدائمة وعلاقات الإطباق", "Tooth morphology and functional occlusion"),
  t("dn401", "DENT 301", 4, 4, "المواد السنية والأشعة الفموية", "Dental Biomaterials & Oral Radiology", "خواص الحشوات والتيجان وتفسير أشعة الفم والأسنان", "Restorative materials and radiographic diagnosis"),
  t("dn501", "DENT 330", 5, 4, "العلاج التحفظي وعلاج الجذور", "Operative Dentistry & Endodontics", "إزالة التسوس والحشوات التجميلية وعلاج العصب", "Caries management, composites, and root canal therapy"),
  t("dn601", "DENT 401", 6, 4, "الاستعاضة السنية وأمراض اللثة", "Prosthodontics & Periodontics", "التيجان والجسور والتركيبات وعلاج الأنسجة المحيطة", "Fixed/removable prosthodontics and periodontal care"),
  t("dn701", "DENT 430", 7, 4, "جراحة الفم والوجه والفكين وطب أسنان الأطفال", "Oral Surgery & Pediatric Dentistry", "الخلع الجراحي ورعاية أسنان الأطفال والتقويم الوقائي", "Dentoalveolar surgery and pediatric dental care"),
  t("dn801", "DENT 499", 8, 8, "سنة الامتياز في طب الأسنان", "Dental Clinical Internship", "الممارسة السريرية الشاملة في عيادات الأسنان", "Comprehensive dental clinic internship rotations"),
];

// ============================================================================
// 4. إدارة الأعمال والمالية والمحاسبة والقانون والشريعة
// ============================================================================
export const TPL_BUS_MGT: CourseTemplate[] = [
  t("bm101", "MGT 101", 1, 3, "مبادئ الإدارة والأعمال", "Principles of Management", "التخطيط والتنظيم والقيادة والرقابة في المنظمات", "Planning, organizing, leading, and controlling"),
  t("bm201", "ACCT 101", 2, 3, "مبادئ المحاسبة المالية", "Principles of Financial Accounting", "الدورة المحاسبية والقوائم المالية وميزان المراجعة", "Accounting cycle, journal entries, and financial statements"),
  t("bm202", "ECON 101", 2, 3, "مبادئ الاقتصاد الجزئي والكلي", "Micro & Macroeconomics", "العرض والطلب ومرونة الأسواق والناتج المحلي والسياسة المالية", "Supply/demand, GDP, inflation, and monetary policy"),
  t("bm301", "MKT 201", 3, 3, "مبادئ التسويق وسلوك المستهلك", "Marketing & Consumer Behavior", "المزيج التسويقي وأبحاث السوق والتسويق الرقمي", "Marketing mix, segmentation, and digital strategy"),
  t("bm302", "STAT 201", 3, 3, "الإحصاء والأساليب الكمية للأعمال", "Business Statistics & Quantitative Methods", "تحليل البيانات واتخاذ القرار الكمي للأعمال", "Descriptive/inferential statistics for management"),
  t("bm401", "FIN 201", 4, 3, "مبادئ الإدارة المالية", "Corporate Finance", "القيمة الزمنية للنقود وتقييم الاستثمارات ورأس المال", "Time value of money, capital budgeting, and WACC"),
  t("bm501", "MGT 301", 5, 3, "السلوك التنظيمي وإدارة الموارد البشرية", "Organizational Behavior & HRM", "الاستقطاب وتطوير الكفاءات والأداء الوظيفي", "Talent acquisition, motivation, and HR systems"),
  t("bm601", "MGT 320", 6, 3, "إدارة العمليات وسلاسل الإمداد", "Operations & Supply Chain Management", "إدارة الجودة والمخزون وسلاسل الإمداد اللوجستية", "Process quality, logistics, and supply chain design"),
  t("bm602", "BLAW 301", 6, 3, "البيئة القانونية للأعمال والأنظمة السعودية", "Business Law & Saudi Regulations", "نظام الشركات والعقود والعمل وحوكمة الشركات", "Saudi corporate, labor, and commercial contract law"),
  t("bm701", "MGT 401", 7, 3, "الإدارة الاستراتيجية وريادة الأعمال", "Strategic Management & Entrepreneurship", "التحليل التنافسي وبناء نماذج الأعمال الابتكارية", "SWOT/Porter strategy and venture planning"),
  t("bm801", "MGT 499", 8, 6, "التدريب التعاوني ومشروع التخرج", "Business Co-op & Strategic Capstone", "ممارسة ميدانية في الشركات والبنوك والمؤسسات", "Corporate cooperative training and business capstone"),
];

export const TPL_FIN_ACCT: CourseTemplate[] = [
  ...TPL_BUS_MGT.slice(0, 6),
  t("fa401", "ACCT 202", 4, 3, "المحاسبة المتوسطة والتكاليف", "Intermediate & Cost Accounting", "الاعتراف بالإيرادات والأصول وتكاليف المنتجات", "Revenue recognition, asset valuation, and costing"),
  t("fa501", "ACCT 301", 5, 3, "المحاسبة الإدارية والزكاة والضرائب (ZATCA)", "Managerial Accounting, Zakat & Tax", "الموازنات التقديرية وأنظمة الزكاة وضريبة القيمة المضافة", "Budgeting, variance analysis, Zakat, and VAT in KSA"),
  t("fa601", "FIN 310", 6, 3, "الأسواق المالية وإدارة المحافظ الاستثمارية", "Financial Markets & Portfolio Management", "تسعير الأصول والأسهم والصكوك وإدارة المخاطر", "Equities, Sukuk, CAPM, and portfolio optimization"),
  t("fa602", "ACCT 350", 6, 3, "المراجعة والتدقيق ومعايير IFRS", "Auditing & IFRS Standards", "ضوابط الرقابة الداخلية ومعايير التقارير المالية الدولية", "Internal controls, audit evidence, and IFRS compliance"),
  t("fa701", "FIN 420", 7, 3, "التمويل الإسلامي والتقنية المالية (FinTech)", "Islamic Finance & FinTech", "هيكلة التمويل المتوافق مع الشريعة والابتكار المالي", "Sharia-compliant structuring and digital banking"),
  t("fa801", "FIN 499", 8, 6, "التدريب التعاوني ومشروع التخرج المالي", "Finance/Accounting Co-op & Capstone", "التدريب في البنوك وشركات المراجعة والمحاسبة", "Co-op internship in banks, audit firms, or CMA entities"),
];

export const TPL_SHARIA_LAW: CourseTemplate[] = [
  t("sl101", "SHAR 101", 1, 3, "مدخل لدراسة الشريعة والأنظمة", "Intro to Sharia & Legal Studies", "مصادر التشريع الإسلامي والنظام الأساسي للحكم بالمملكة", "Sources of Sharia and Saudi Basic Law of Governance"),
  t("sl201", "FIQH 102", 2, 3, "فقه العبادات والأحوال الشخصية", "Fiqh of Worship & Family Law", "الطهارة والصلاة والزكاة وأحكام الأسرة والزواج والنفقة", "Jurisprudence of worship and Saudi personal status law"),
  t("sl202", "USUL 201", 3, 3, "أصول الفقه والقواعد الفقهية", "Principles of Jurisprudence (Usul al-Fiqh)", "الأدلة الشرعية ومقاصد الشريعة وطرق الاستنباط", "Legal reasoning, Qiyas, Ijma, and Islamic maxims"),
  t("sl301", "FIQH 205", 4, 3, "فقه المعاملات المالية والمصرفية", "Islamic Financial Transactions", "البيوع والإجارة والمضاربة والمرابحة والبيوع المعاصرة", "Contracts of exchange, Mudarabah, Murabaha, and Sukuk"),
  t("sl401", "LAW 210", 4, 3, "القانون الدستوري والإداري", "Constitutional & Administrative Law", "تنظيم السلطات والقرارات الإدارية وديوان المظالم", "Public authorities, administrative acts, and Board of Grievances"),
  t("sl501", "LAW 301", 5, 3, "النظام التجاري والشركات والعقود", "Commercial, Corporate & Contract Law", "نظام المعاملات المدنية والشركات والأوراق التجارية", "Saudi Civil Transactions Law, companies, and contracts"),
  t("sl502", "SHAR 310", 5, 3, "المواريث والوصايا والفرائض", "Inheritance Law (Faraid) & Wills", "قسمة التركات وحساب الفروض والعصبات", "Estate distribution rules and inheritance calculation"),
  t("sl601", "LAW 340", 6, 3, "الفقه الجنائي ونظام الإجراءات الجزائية", "Criminal Law & Procedure", "أركان الجريمة والحدود والتعازير وضمانات المتهم", "Criminal liability, evidence, and Saudi criminal procedure"),
  t("sl701", "LAW 410", 7, 3, "نظام المرافعات الشرعية والتحكيم التجاري", "Civil Litigation & Commercial Arbitration", "رفع الدعاوى والإثبات والاستئناف والتحكيم", "Pleadings, evidence standards, appeals, and arbitration"),
  t("sl801", "LAW 499", 8, 4, "المحكمة الصورية والتدريب القضائي/القانوني", "Moot Court & Legal Practicum", "المرافعة العملية وصياغة المذكرات القانونية", "Legal drafting, moot court advocacy, and law firm practicum"),
];

// ============================================================================
// 5. الآداب والعلوم الإنسانية والتربية والعلوم الأساسية والزراعة
// ============================================================================
export const TPL_EDU_CURR: CourseTemplate[] = [
  t("ed101", "EDUC 101", 1, 3, "أسس التربية وعلم النفس التربوي", "Foundations of Education & Psych", "نظريات التعلم والدافعية والفروق الفردية", "Learning theories, motivation, and cognitive development"),
  t("ed201", "EDUC 201", 2, 3, "مقدمة في التربية الخاصة والموهبة", "Intro to Special Education & Giftedness", "فئات الاحتياجات الخاصة واستراتيجيات الدمج التربوي", "Inclusive classroom practices and exceptional learners"),
  t("ed301", "CURR 201", 3, 3, "استراتيجيات التدريس الحديثة", "Modern Teaching Strategies", "التعلم النشط والصف المقلوب والتعلم القائم على المشاريع", "Active learning, flipped classrooms, and PBL"),
  t("ed401", "CURR 301", 4, 3, "تصميم المناهج وتطويرها", "Curriculum Design & Development", "صياغة نواتج التعلم وبناء الوحدات الدراسية", "Instructional design and outcome alignment"),
  t("ed501", "TECH 301", 5, 3, "تكنولوجيا التعليم والتعلم الرقمي", "Educational Technology & E-Learning", "توظيف المنصات التعليمية والذكاء الاصطناعي في التدريس", "Digital learning platforms and interactive media"),
  t("ed601", "CURR 401", 6, 3, "القياس والتقويم التربوي", "Educational Measurement & Assessment", "بناء الاختبارات التحصيلية وجداول المواصفات", "Rubrics, psychometric validity, and test construction"),
  t("ed701", "EDUC 420", 7, 3, "الإدارة الصفية والبحث الإجرائي", "Classroom Management & Action Research", "قيادة البيئة الصفية وحل المشكلات التربوية علمياً", "Classroom leadership and teacher action research"),
  t("ed801", "CURR 499", 8, 6, "التربية العملية والتدريب الميداني", "Teaching Practicum", "الممارسة التدريسية الكاملة في المدارس", "Supervised full-time school teaching practicum"),
];

export const TPL_ARTS_DES: CourseTemplate[] = [
  t("fa101", "ARTE 101", 1, 3, "الفنون التشكيلية والمجتمع", "Visual Arts & Society", "دور الفنون في الثقافة السعودية والتذوق الجمالي", "Visual arts in Saudi culture and aesthetics"),
  t("fa201", "ARTE 102", 2, 3, "أساسيات الرسم والتصوير التشكيلي", "Fundamentals of Drawing & Painting", "الظل والنور والمنظور وتقنيات الألوان", "Perspective, light/shadow, and color media"),
  t("fa301", "DES 201", 3, 3, "التصميم الجرافيكي والزخرفة الإسلامية", "Graphic Design & Islamic Ornament", "الهوية البصرية والتكوين الهندسي الإسلامي", "Visual identity, typography, and Islamic geometry"),
  t("fa401", "ARTE 202", 4, 3, "الخط العربي وتطبيقاته المعاصرة", "Arabic Calligraphy & Contemporary Design", "قواعد خط النسخ والثلث والديواني وتوظيفها فنياً", "Naskh, Thuluth, Diwani, and typographic art"),
  t("fa501", "ARTE 301", 5, 3, "النحت والخزف والطباعة الفنية", "Sculpture, Ceramics & Printmaking", "التشكيل بالطين والحرق والطباعة اليدوية", "Clay sculpture, glazing, and studio printmaking"),
  t("fa601", "DES 320", 6, 3, "التصميم الرقمي والوسائط المتعددة", "Digital Design & Multimedia", "برامج التصميم الإعلاني وتصميم الواجهات", "Vector illustration, editorial layout, and UI design"),
  t("fa701", "ARTE 401", 7, 3, "تاريخ الفن والنقد الفني وطرق التدريس", "Art History, Criticism & Pedagogy", "المدارس الفنية الحديثة وتقويم الأعمال الإبداعية", "Art movements, criticism, and studio pedagogy"),
  t("fa801", "ARTE 499", 8, 4, "مشروع التخرج الفني والمعرض", "Fine Arts Capstone & Exhibition", "إنتاج معرض فني متكامل أو مشروع هوية بصرية", "Curated capstone studio exhibition"),
];

export const TPL_LANG_MEDIA: CourseTemplate[] = [
  t("lm101", "LANG 101", 1, 3, "علم اللغة العام والمهارات اللغوية", "General Linguistics & Language Skills", "الصوتيات وعلم الدلالة وبناء التراكيب", "Phonetics, morphology, syntax, and semantics"),
  t("lm201", "LANG 201", 2, 3, "النحو والصرف / القواعد الأكاديمية", "Advanced Syntax & Morphology", "التحليل النحوي والصرفي وبناء الجمل الدقيقة", "Grammatical analysis and structural accuracy"),
  t("lm301", "LIT 210", 3, 3, "الأدب العربي والعالمي وتحليل النصوص", "Arabic & World Literature Analysis", "العصور الأدبية والنقد البلاغي والأسلوبي", "Literary eras, stylistics, and critical analysis"),
  t("lm401", "TRAN 301", 4, 3, "نظريات ومهارات الترجمة التحريرية", "Translation Theory & Written Practice", "ترجمة النصوص الصحفية والقانونية والعلمية", "Arabic-English legal, media, and scientific translation"),
  t("lm501", "COMM 310", 5, 3, "الإعلام الرقمي والعلاقات العامة", "Digital Media & Public Relations", "صناعة المحتوى وإدارة السمعة والحملات الإعلامية", "Digital storytelling, PR campaigns, and crisis media"),
  t("lm601", "TRAN 350", 6, 3, "الترجمة الفورية والوسائطية", "Consecutive & Simultaneous Interpreting", "تقنيات الاستماع الفوري وتدوين الملاحظات", "Note-taking, consecutive, and conference interpreting"),
  t("lm701", "COMM 410", 7, 3, "مناهج البحث اللغوي والإعلامي", "Linguistic & Media Research Methods", "تحليل الخطاب ومنهجيات الدراسات اللغوية", "Discourse analysis and empirical research"),
  t("lm801", "LANG 499", 8, 4, "مشروع التخرج والتدريب الميداني", "Languages & Media Capstone / Practicum", "مشروع ترجمة تخصصية أو حملة إعلامية متكاملة", "Professional translation or media production capstone"),
];

export const TPL_SCI_MATH: CourseTemplate[] = [
  t("sm101", "MATH 101", 1, 4, "التفاضل والتكامل (١ و ٢)", "Calculus I & II", "النهايات والاشتقاق والتكامل وتطبيقاتها", "Limits, derivatives, integrals, and series"),
  t("sm102", "PHYS 101", 1, 4, "الفيزياء العامة (الميكانيكا والكهرباء)", "General Physics (Mechanics & EM)", "قوانين الحركة والطاقة والكهرباء والمغناطيسية", "Classical mechanics, energy, and electromagnetism"),
  t("sm201", "CHEM 101", 2, 4, "الكيمياء العامة والتحليلية", "General & Analytical Chemistry", "البنية الذرية والروابط والمحاليل والمعايرة", "Atomic structure, bonding, solutions, and titration"),
  t("sm202", "BIOL 101", 2, 4, "الأحياء العامة وبيولوجيا الخلية", "General & Cell Biology", "الخلية الحيوانية والنباتية والأيض والوراثة", "Cellular organelles, metabolism, and genetics"),
  t("sm301", "MATH 208", 3, 3, "الجبر الخطي والمعادلات التفاضلية", "Linear Algebra & Differential Equations", "المصفوفات والفضاءات المتجهة وحل المعادلات التفاضلية", "Vector spaces, eigenvalues, and ODE systems"),
  t("sm401", "STAT 301", 4, 3, "الاحتمالات والإحصاء الرياضي", "Probability & Mathematical Statistics", "التوزيعات المستمرة والمنفصلة والاستدلال الإحصائي", "Probability distributions and statistical estimation"),
  t("sm501", "SCI 320", 5, 3, "التحليل المتقدم والنمذجة العلمية", "Advanced Analysis & Scientific Modeling", "المعادلات الجزئية والكيمياء الفيزيائية/العضوية أو الوراثة", "Discipline-specific advanced modeling and lab methods"),
  t("sm601", "SCI 360", 6, 3, "التقنيات المخبرية والتحليل الآلي", "Laboratory & Instrumental Analysis", "أجهزة التحليل الطيفي والكروماتوجرافي والمحاكاة", "Spectroscopy, chromatography, and computational labs"),
  t("sm701", "SCI 410", 7, 3, "الفيزياء/الكيمياء/الأحياء التطبيقية والبيئية", "Applied & Environmental Sciences", "الطاقة المستدامة والتقنية الحيوية وعلوم الأرض", "Sustainable energy, biotech, and environmental chemistry"),
  t("sm801", "SCI 499", 8, 4, "مشروع البحث العلمي والتخرج", "Senior Scientific Research Project", "إعداد بحث مخبري أو نظري ومناقشته علمياً", "Empirical or theoretical undergraduate thesis"),
];

export const TPL_AGRI_VET: CourseTemplate[] = [
  t("av101", "AGRI 101", 1, 3, "مبادئ الزراعة المستدامة والأمن الغذائي", "Sustainable Agriculture & Food Security", "الموارد الزراعية والمناخ الصحراوي والأمن الغذائي", "Arid-land agriculture and Vision 2030 food security"),
  t("av201", "FSCN 201", 2, 3, "كيمياء وسلامة الأغذية", "Food Chemistry & Safety", "المركبات الغذائية وجودة التصنيع ومعايير هيئة الغذاء والدواء", "Food macromolecules, preservation, and SFDA safety"),
  t("av301", "AGRI 220", 3, 3, "علوم التربة والري والبيئة النباتية", "Soil Science, Irrigation & Plant Physiology", "خصوبة التربة وتقنيات الري الذكي والزراعة المائية", "Soil chemistry, smart irrigation, and hydroponics"),
  t("av401", "VET 201", 4, 4, "التشريح والفسيولوجيا الحيوانية والبيطرية", "Veterinary Anatomy & Animal Physiology", "تشريح الحيوانات الاقتصادية وأجهزتها الحيوية", "Comparative anatomy and physiology of livestock"),
  t("av501", "VET 301", 5, 4, "علم الأمراض والأحياء الدقيقة البيطرية", "Veterinary Pathology & Microbiology", "الأمراض الوبائية والمناعة وصحة الثروة الحيوانية", "Zoonotic diseases, livestock immunity, and diagnostics"),
  t("av601", "FSCN 320", 6, 3, "التصنيع الغذائي والتغذية التطبيقية", "Food Processing & Applied Nutrition", "معالجة الألبان والتمور وتطوير المنتجات الغذائية", "Dairy, date processing, and food quality control"),
  t("av701", "VET 410", 7, 4, "الطب السريري والجراحة البيطرية", "Veterinary Clinical Medicine & Surgery", "تشخيص وعلاج الحيوانات الكبيرة والأليفة والوقاية", "Clinical diagnosis, therapeutics, and preventive medicine"),
  t("av801", "AGRI 499", 8, 6, "التدريب الميداني في المزارع والمراكز البيطرية", "Agricultural & Veterinary Field Practicum", "التطبيق الميداني في المشاريع الزراعية والعيادات البيطرية", "Field internship in farms, food plants, and vet clinics"),
];
