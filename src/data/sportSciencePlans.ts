import { LocalizedText } from "../i18n/translations";
import type { CourseItem, MajorItem } from "./universityPlans";

function sp(
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

// ============================================================================
// 1. جامعة الملك فيصل - علوم الرياضة والنشاط البدني (128 ساعة - 8 مستويات)
// ============================================================================
export const KFU_SPORT_SCIENCES_MAJOR: MajorItem = {
  id: "kfu-sport",
  totalCredits: 128,
  name: { ar: "علوم الرياضة والنشاط البدني", en: "Sport Sciences & Physical Activity" },
  courses: [
    // Level 1
    sp("kfu-sp-101", "SPED 101", 1, 2, "مقدمة في علوم الرياضة", "Introduction to Sport Sciences", "المدخل التاريخي والفلسفي للتربية البدنية والرياضة", "Historical and philosophical foundations of sport sciences"),
    sp("kfu-sp-102", "SPED 102", 1, 3, "مبادئ التشريح الوظيفي للرياضيين", "Functional Anatomy for Athletes", "الجهاز العضلي والهيكلي والمفاصل أثناء الأداء الحركي", "Musculoskeletal system and joint mechanics during movement"),
    sp("kfu-sp-103", "SPED 103", 1, 2, "الميدان والمضمار (1)", "Track & Field Athletics I", "مهارات الجري والوثب والرمي وقوانين مسابقات المضمار", "Running, jumping, throwing techniques, and track rules"),
    sp("kfu-sp-104", "SPED 104", 1, 2, "التغذية والنشاط البدني", "Nutrition & Physical Activity", "توازن العناصر الغذائية وتغذية الرياضيين", "Macronutrient balance and athletic performance nutrition"),
    sp("kfu-sp-105", "SPED 105", 1, 2, "الكرة الطائرة", "Volleyball", "المهارات الأساسية (الإرسال، التمرير، الضرب الساحق، والصد)", "Serving, passing, spiking, blocking, and team rotations"),
    // Level 2
    sp("kfu-sp-201", "SPED 201", 2, 3, "علم وظائف أعضاء الجهد البدني", "Exercise Physiology", "استجابة الأجهزة الحيوية وأنظمة الطاقة أثناء التدريب", "Physiological responses and energy systems during training"),
    sp("kfu-sp-202", "SPED 202", 2, 3, "النمو البدني والتطور الحركي", "Physical Growth & Motor Development", "مراحل التطور البدني والحركي عبر الفئات العمرية", "Stages of physical growth and motor development across age"),
    sp("kfu-sp-203", "SPED 203", 2, 2, "كرة السلة", "Basketball", "المهارات الأساسية والخطط الدفاعية والهجومية", "Core skills, defensive and offensive systems"),
    sp("kfu-sp-204", "SPED 204", 2, 2, "كرة اليد", "Handball", "التصويب والتمرير وتنظيم اللعب الجماعي", "Shooting, passing, and team tactical organization"),
    sp("kfu-sp-205", "SPED 205", 2, 3, "البحث العلمي والإحصاء في علوم الرياضة", "Research & Statistics in Sport Sciences", "تصميم البحوث الرياضية والتحليل الإحصائي", "Sport research methodology and statistical analysis"),
    sp("kfu-sp-206", "ISLM 101", 2, 2, "الثقافة الإسلامية وأخلاقيات الرياضة", "Islamic Culture & Sport Ethics", "القيم الإسلامية والأخلاقية في الممارسة الرياضية", "Islamic values and ethical standards in sports"),
    // Level 3
    sp("kfu-sp-301", "SPED 301", 3, 3, "مبادئ علم الحركة", "Principles of Kinesiology", "الميكانيكا الحيوية وتحليل المهارات الحركية", "Biomechanics and motor skill analysis"),
    sp("kfu-sp-302", "SPED 302", 3, 3, "أسس التهيئة البدنية", "Foundations of Physical Conditioning", "عناصر اللياقة البدنية وتطوير التحمل والقوة والسرعة", "Fitness components, endurance, strength, and speed conditioning"),
    sp("kfu-sp-303", "SPED 303", 3, 2, "كرة القدم", "Football (Soccer)", "التكتيك والمهارات الفردية وقوانين التحكيم", "Tactical formations, individual technique, and refereeing"),
    sp("kfu-sp-304", "SPED 304", 3, 2, "مبادئ ألعاب المضرب", "Principles of Racket Sports", "التنس والريشة الطائرة وتنس الطاولة", "Tennis, badminton, and table tennis fundamentals"),
    sp("kfu-sp-305", "SPED 305", 3, 3, "الأنشطة البدنية والرياضية المعدلة", "Adapted Physical Activity & Sports", "تكييف البرامج الرياضية لذوي الإعاقة والاحتياجات الخاصة", "Adapting sport programs for people with disabilities"),
    sp("kfu-sp-306", "ARTE 101", 3, 2, "الفنون التشكيلية والمجتمع", "Visual Arts & Society", "الذائقة الجمالية ودور الفنون في الثقافة المجتمعية", "Aesthetic appreciation and arts in Saudi society"),
    // Level 4
    sp("kfu-sp-401", "SPED 401", 4, 2, "أساسيات القيادة الإدارية في الرياضة", "Foundations of Sport Leadership", "القيادة وإدارة الفرق والمنشآت الرياضية", "Leadership, team administration, and sport organizations"),
    sp("kfu-sp-402", "SPED 402", 4, 2, "علم الاجتماع الرياضي", "Sport Sociology", "التفاعل الاجتماعي والظواهر الرياضية في المجتمع", "Social dynamics and sport institutions in society"),
    sp("kfu-sp-403", "SPED 403", 4, 2, "الألعاب التمهيدية والحركية", "Lead-up & Motor Games", "الألعاب الصغيرة وتطوير المهارات الأساسية للأطفال", "Small-sided games and fundamental movement skills"),
    sp("kfu-sp-404", "SPED 404", 4, 2, "مبادئ الجمباز", "Principles of Gymnastics", "المرونة والتوازن والمهارات الأرضية والأجهزة", "Flexibility, balance, floor skills, and apparatus"),
    sp("kfu-sp-405", "SPED 405", 4, 2, "الرياضات المائية والسباحة", "Aquatics & Swimming", "طرق السباحة الأربعة والإنقاذ المائي", "Four competitive swimming strokes and water safety"),
    sp("kfu-sp-406", "EDUC 201", 4, 2, "مقدمة في التربية الخاصة", "Introduction to Special Education", "فئات التربية الخاصة واستراتيجيات الدمج التربوي", "Special education categories and inclusive practices"),
    // Level 5
    sp("kfu-sp-501", "SPED 501", 5, 3, "تخطيط التدريب الرياضي", "Sports Training Planning", "الأحمال التدريبية وبناء البرامج الموسمية", "Training loads and seasonal periodization"),
    sp("kfu-sp-502", "SPED 502", 5, 3, "الميكانيكا الحيوية التطبيقية", "Applied Biomechanics in Sport", "التحليل الحركي الكمي للرمي والوثب والجري", "Quantitative biomechanical analysis of sport skills"),
    sp("kfu-sp-503", "SPED 503", 5, 2, "الإصابات الرياضية وإسعافاتها الأولية", "Sports Injuries & First Aid", "الوقاية من إصابات الملاعب والتعامل الإسعافي الأولي", "Field injury prevention and acute emergency response"),
    sp("kfu-sp-504", "SPED 504", 5, 3, "سيكولوجية التدريبات الرياضية", "Psychology of Sports Training", "الدافعية والقلق التنافسي والإعداد النفسي للرياضيين", "Motivation, competitive anxiety, and mental preparation"),
    // Level 6
    sp("kfu-sp-601", "SPED 601", 6, 3, "القياس والتقويم في علوم الرياضة", "Measurement & Evaluation in Sport", "الاختبارات البدنية والمهارية وبناء البطاريات الاختبارية", "Physical/skill testing and psychometric evaluation"),
    sp("kfu-sp-602", "SPED 602", 6, 2, "الرياضة للجميع والبرامج الترويحية", "Sport for All & Recreation Programs", "إدارة الفعاليات المجتمعية والنشاط الترويحي", "Community events and recreational sport management"),
    sp("kfu-sp-603", "SPED 603", 6, 3, "استراتيجيات التدريس في التربية البدنية", "Teaching Strategies in Physical Education", "أساليب التدريس الحديثة وتصميم الوحدات التعليمية", "Modern pedagogy and instructional unit design"),
    sp("kfu-sp-604", "SPED 604", 6, 2, "القوام والتمرينات العلاجية", "Posture & Corrective Exercises", "تشخيص الانحرافات القوامية وبرامج التأهيل الحركي", "Postural deviations screening and corrective exercise"),
    sp("kfu-sp-605", "SPED 605", 6, 2, "المنازلات الرياضية والدفاع عن النفس", "Combat Sports & Self-Defense", "أساسيات الكاراتيه والجودو والتايكوندو", "Foundations of karate, judo, and taekwondo"),
    // Level 7
    sp("kfu-sp-701", "SPED 701", 7, 3, "اللياقة البدنية المرتبطة بالصحة", "Health-Related Physical Fitness", "تقييم مكونات الجسم ووصف النشاط البدني الصحي", "Body composition assessment and exercise prescription"),
    sp("kfu-sp-702", "SPED 702", 7, 3, "إدارة وتنظيم البطولات والفعاليات", "Tournament & Sport Event Management", "جداول المسابقات والأنظمة والتحكيم الرياضي", "Tournament bracketing, regulations, and officiating"),
    sp("kfu-sp-703", "SPED 703", 7, 3, "مشروع التخرج البحثي التطبيقي", "Applied Capstone Research Project", "إعداد ومناقشة بحث تطبيقي في علوم الرياضة", "Applied empirical research thesis in sport sciences"),
    // Level 8
    sp("kfu-sp-801", "SPED 801", 8, 8, "التدريب الميداني (الامتياز الرياضي)", "Field Practicum & Internship", "التطبيق الميداني في الأندية والمدارس ومراكز اللياقة", "Supervised internship in clubs, schools, and fitness centers"),
  ],
};

function buildCoreSportFoundation(prefix: string, codePrefix: string): CourseItem[] {
  return [
    sp(`${prefix}-f101`, `${codePrefix} 101`, 1, 2, "مقدمة في علوم الرياضة والنشاط البدني", "Introduction to Sport & Physical Activity", "الأسس التاريخية والفلسفية للرياضة والتربية البدنية", "Historical and philosophical foundations of sport"),
    sp(`${prefix}-f102`, `${codePrefix} 102`, 1, 3, "التشريح الوظيفي للرياضيين", "Functional Anatomy for Athletes", "دراسة العظام والمفاصل والعضلات العاملة أثناء الحركة", "Skeletal joints and muscular actions in sport"),
    sp(`${prefix}-f103`, `${codePrefix} 103`, 1, 2, "ألعاب القوى (الميدان والمضمار)", "Track & Field Athletics", "مهارات الجري والوثب والرمي وقواعد المنافسات", "Sprinting, jumping, throwing, and track regulations"),
    sp(`${prefix}-f201`, `${codePrefix} 201`, 2, 3, "فسيولوجيا الجهد البدني", "Exercise Physiology", "استجابة القلب والتنفس وأنظمة الطاقة أثناء التمرين", "Cardiorespiratory response and bioenergetics"),
    sp(`${prefix}-f202`, `${codePrefix} 202`, 2, 2, "اللياقة البدنية والتهيئة الحركية", "Physical Fitness & Conditioning", "تطوير القوة العضلية والتحمل والسرعة والمرونة", "Strength, endurance, speed, and flexibility conditioning"),
    sp(`${prefix}-f203`, `${codePrefix} 203`, 2, 2, "التغذية الرياضية والصحة", "Sport Nutrition & Health", "تخطيط التغذية المتوازنة للأداء الرياضي والاستشفاء", "Balanced nutrition for athletic performance and recovery"),
    sp(`${prefix}-f301`, `${codePrefix} 301`, 3, 3, "علم الحركة والميكانيكا الحيوية", "Kinesiology & Biomechanics", "تحليل القوى والروافع والانطلاق الحركي في الرياضة", "Kinematics, kinetics, and lever mechanics in sport"),
    sp(`${prefix}-f302`, `${codePrefix} 302`, 3, 2, "التعلم والتطور الحركي", "Motor Learning & Development", "مراحل اكتساب المهارة والتحكم العصبي العضلي", "Skill acquisition stages and neuromuscular control"),
    sp(`${prefix}-f303`, `${codePrefix} 303`, 3, 2, "الجمباز والتمرينات الأرضية", "Gymnastics & Floor Exercises", "مهارات التوازن والرشاقة والأداء على الأجهزة", "Balance, agility, floor routines, and apparatus"),
    sp(`${prefix}-f401`, `${codePrefix} 401`, 4, 3, "الألعاب الجماعية (قدم، سلة، يد، طائرة)", "Team Sports (Football, Basketball, Handball, Volleyball)", "المهارات الأساسية والخطط التكتيكية وقوانين التحكيم", "Core team skills, tactical formations, and officiating"),
    sp(`${prefix}-f402`, `${codePrefix} 402`, 4, 2, "السباحة وألعاب المضرب", "Swimming & Racket Sports", "طرق السباحة والإنقاذ المائي والتنس والريشة", "Swimming strokes, water safety, tennis, and badminton"),
  ];
}

// ============================================================================
// 2. جامعة الملك سعود - كلية علوم الرياضة والنشاط البدني (4 مسارات كاملة)
// ============================================================================
export const KSU_SPORT_MAJORS: MajorItem[] = [
  {
    id: "ksu-pe-track",
    totalCredits: 130,
    name: { ar: "مسار تدريس التربية البدنية", en: "Physical Education Teaching Track" },
    courses: [
      sp("ksu-pe-101", "SSP 101", 1, 2, "مقدمة في علوم الرياضة والنشاط البدني", "Introduction to Sport & Physical Activity", "الأسس العلمية والمهنية لمجالات علوم الرياضة", "Scientific and professional foundations of sport sciences"),
      sp("ksu-pe-102", "SSP 102", 1, 3, "التشريح الوظيفي", "Functional Anatomy", "بنية الجهاز العضلي والهيكلي والمفاصل", "Musculoskeletal structure and joint mechanics"),
      sp("ksu-pe-110", "SSP 110", 2, 3, "فسيولوجيا الجهد البدني", "Exercise Physiology", "تكيفات القلب والرئة وأنظمة الطاقة", "Cardiorespiratory adaptations and energy systems"),
      sp("ksu-pe-115", "SSP 115", 2, 2, "النمو والتطور الحركي للأطفال", "Child Growth & Motor Development", "خصائص النمو البدني للمراحل الدراسية", "Physical growth milestones across school ages"),
      sp("ksu-pe-210", "SSP 210", 3, 3, "التعلم الحركي والميكانيكا الحيوية", "Motor Learning & Biomechanics", "اكتساب المهارة وتحليل القوى الحركية", "Skill acquisition and biomechanical force analysis"),
      sp("ksu-pe-220", "SSP 220", 3, 2, "ألعاب القوى والجمباز", "Track & Field and Gymnastics", "مهارات الميدان والمضمار والتمرينات الأرضية", "Track & field events and floor gymnastics"),
      sp("ksu-pe-230", "SSP 230", 4, 3, "الألعاب الجماعية (قدم، سلة، يد، طائرة)", "Team Sports (Football, Basketball, Handball, Volleyball)", "المهارات الأساسية وقوانين التحكيم للألعاب الجماعية", "Core techniques and rules across major team sports"),
      sp("ksu-pe-240", "SSP 240", 4, 2, "ألعاب المضرب والسباحة", "Racket Sports & Swimming", "التنس والريشة والمهارات المائية", "Tennis, badminton, and aquatic skills"),
      sp("ksu-pe-250", "SSP 250", 4, 2, "الألعاب التمهيدية والصغيرة", "Lead-up & Small-Sided Games", "توظيف اللعب التربوي لتنمية مهارات الصفوف الأولية", "Educational games for elementary motor skill development"),
      sp("ksu-pe-310", "SSP 310", 5, 3, "طرائق تدريس التربية البدنية", "Physical Education Pedagogy", "إعداد خطط الدروس الصفية وإدارة الحصة الرياضية", "Lesson planning and gym class management"),
      sp("ksu-pe-320", "SSP 320", 5, 3, "التغذية والنشاط البدني", "Nutrition & Physical Activity", "الاحتياجات الغذائية للنمو والأداء البدني", "Dietary needs for growth and physical performance"),
      sp("ksu-pe-330", "SSP 330", 5, 2, "الإصابات الرياضية والإسعافات الأولية", "Sports Injuries & First Aid", "السلامة المدرسية والتعامل الأولي مع الإصابات", "School gym safety and acute injury management"),
      sp("ksu-pe-410", "SSP 410", 6, 3, "التربية البدنية المعدلة", "Adapted Physical Education", "برامج الدمج الرياضي للطلاب ذوي الإعاقة", "Inclusive athletic programs for students with disabilities"),
      sp("ksu-pe-415", "SSP 415", 6, 2, "القوام والتمرينات العلاجية المدرسية", "Posture & Corrective Exercises", "الكشف المبكر عن تشوهات القوام وتصحيحها", "Postural screening and corrective school routines"),
      sp("ksu-pe-420", "SSP 420", 7, 3, "القياس والتقويم في التربية البدنية", "Measurement & Evaluation in PE", "تقويم المهارات الحركية والاختبارات المدرسية", "Motor skill evaluation and school fitness testing"),
      sp("ksu-pe-430", "SSP 430", 7, 3, "مناهج التربية البدنية والبحث العلمي", "PE Curricula & Research Methods", "تحليل مناهج التعليم العام وإعداد البحوث التربوية", "K-12 PE curriculum analysis and research"),
      sp("ksu-pe-490", "SSP 490", 8, 8, "التدريب الميداني في المدارس", "School Teaching Practicum", "التطبيق التدريسي الفعلي في مراحل التعليم العام", "Supervised physical education teaching in schools"),
    ],
  },
  {
    id: "ksu-coach-track",
    totalCredits: 130,
    name: { ar: "مسار التدريب الرياضي", en: "Sports Coaching Track" },
    courses: [
      ...buildCoreSportFoundation("ksu-co", "COACH"),
      sp("ksu-co-210", "COACH 210", 4, 3, "أسس ونظريات التدريب الرياضي", "Principles & Theories of Sports Training", "تقنين الحمل التدريبي ودورات الإعداد السنوية", "Training load quantification and macrocycles"),
      sp("ksu-co-310", "COACH 310", 5, 3, "تدريب الأثقال والمقاومة", "Strength & Resistance Training", "تطوير القوة العضلية والقدرة الانفجارية", "Muscular strength and explosive power development"),
      sp("ksu-co-320", "COACH 320", 5, 3, "التحليل الحركي البيوميكانيكي", "Biomechanical Movement Analysis", "تصوير وتحليل الأداء المهاري لتصحيح الأخطاء", "Video kinematics and error correction"),
      sp("ksu-co-330", "COACH 330", 5, 2, "الإصابات الرياضية والتأهيل الميداني", "Sports Injuries & Field Rehab", "الوقاية وإعادة الرياضي للمنافسة بعد الإصابة", "Prevention and return-to-play protocols"),
      sp("ksu-co-410", "COACH 410", 6, 3, "الانتقاء الرياضي ولياقة الناشئين", "Talent Identification & Youth Conditioning", "معايير اكتشاف المواهب وتطوير الناشئين", "Talent identification protocols and youth development"),
      sp("ksu-co-415", "COACH 415", 6, 3, "التدريب التخصصي في الألعاب المختارة", "Specialized Coaching in Chosen Sport", "تخطيط الحصص التدريبية والتكتيك التنافسي", "Match tactics and specialized coaching plans"),
      sp("ksu-co-420", "COACH 420", 7, 3, "علم النفس الرياضي والتأهيل النفسي", "Sport Psychology & Mental Coaching", "التماسك الجماعي والتحكم بالضغوط التنافسية", "Team cohesion and competitive stress management"),
      sp("ksu-co-430", "COACH 430", 7, 3, "القياس والاختبارات البدنية للمنتخبات", "Performance Testing for Athletes", "بطاريات الاختبار الميدانية والمعملية للرياضيين", "Field and lab performance testing batteries"),
      sp("ksu-co-490", "COACH 490", 8, 6, "التدريب الميداني في الأندية والاتحادات", "Club & Federation Coaching Practicum", "إدارة الوحدات التدريبية مع الفرق الرياضية", "Hands-on coaching practicum with athletic clubs"),
    ],
  },
  {
    id: "ksu-fit-track",
    totalCredits: 129,
    name: { ar: "مسار اللياقة البدنية والصحية", en: "Physical Fitness & Wellness Track" },
    courses: [
      ...buildCoreSportFoundation("ksu-ft", "FIT"),
      sp("ksu-ft-210", "FIT 210", 4, 3, "فسيولوجيا اللياقة لأجل الصحة", "Physiology of Health-Related Fitness", "الوقاية من الأمراض المزمنة عبر النشاط البدني", "Chronic disease prevention through exercise"),
      sp("ksu-ft-310", "FIT 310", 5, 3, "تقييم الأداء البدني والاختبارات المعملية", "Performance & Lab Fitness Testing", "قياس VO2max وتخطيط الجهد البدني", "VO2max testing and graded exercise protocols"),
      sp("ksu-ft-320", "FIT 320", 5, 3, "تخطيط التغذية وضبط الوزن", "Nutrition & Weight Management", "توازن السعرات وتقنيات قياس مكونات الجسم", "Caloric balance and body composition analysis"),
      sp("ksu-ft-410", "FIT 410", 6, 3, "تصميم برامج اللياقة الشخصية والجماعية", "Personal & Group Fitness Programming", "بناء الوصفات التدريبية لمختلف الفئات العمرية", "Exercise prescription across diverse populations"),
      sp("ksu-ft-420", "FIT 420", 6, 3, "التمرينات العلاجية والتأهيل الحركي", "Corrective Exercise & Mobility Rehab", "تأهيل آلام الظهر والمفاصل والنشاط لكبار السن", "Back/joint rehabilitation and senior wellness"),
      sp("ksu-ft-430", "FIT 430", 7, 3, "إدارة المراكز والأندية الصحية", "Health Club & Studio Operations", "التشغيل والجودة وسلامة المتدربين في الأندية", "Facility operations, safety, and client retention"),
      sp("ksu-ft-440", "FIT 440", 7, 3, "مشروع التخرج في اللياقة والنشاط الصحي", "Fitness & Wellness Capstone Project", "تطبيق برنامج تدخل بدني لقياس الأثر الصحي", "Applied physical activity intervention project"),
      sp("ksu-ft-490", "FIT 490", 8, 6, "التطبيق الميداني في مراكز اللياقة والتأهيل", "Fitness & Wellness Center Internship", "العمل الميداني مع مختصي اللياقة والاختبارات", "Supervised practice in fitness and wellness facilities"),
    ],
  },
  {
    id: "ksu-mgmt-track",
    totalCredits: 129,
    name: { ar: "مسار الإدارة الرياضية والترويحية", en: "Sport & Recreation Management Track" },
    courses: [
      ...buildCoreSportFoundation("ksu-mg", "SMGT").slice(0, 7),
      sp("ksu-mg-210", "SMGT 210", 4, 3, "مبادئ الإدارة الرياضية", "Principles of Sport Management", "الحوكمة الرياضية والهيكل التنظيمي للأندية", "Sport governance and organizational structure"),
      sp("ksu-mg-220", "SMGT 220", 4, 3, "الاقتصاد والتمويل الرياضي", "Sport Economics & Finance", "ميزانيات الأندية والعائد على الاستثمار الرياضي", "Club budgets, revenues, and sport ROI"),
      sp("ksu-mg-310", "SMGT 310", 5, 3, "التسويق والرعاية الرياضية", "Sport Marketing & Sponsorship", "العلامة التجارية الرياضية وحقوق البث والرعاية", "Sport branding, media rights, and sponsorships"),
      sp("ksu-mg-320", "SMGT 320", 5, 3, "الإعلام والاتصال الرياضي", "Sport Media & Public Relations", "إدارة الحملات الإعلامية والمؤتمرات الرياضية", "Sports journalism, PR, and digital fan engagement"),
      sp("ksu-mg-410", "SMGT 410", 6, 3, "إدارة المنشآت والفعاليات الرياضية", "Sport Facilities & Event Management", "تشغيل الملاعب وتنظيم البطولات الكبرى", "Stadium operations and major tournament logistics"),
      sp("ksu-mg-415", "SMGT 415", 6, 3, "السياحة الرياضية وبرامج الترويح", "Sport Tourism & Recreation Programs", "تخطيط المهرجانات الرياضية والأنشطة المجتمعية", "Sport tourism events and community recreation"),
      sp("ksu-mg-420", "SMGT 420", 7, 3, "الأنظمة واللوائح الرياضية", "Sport Law & Regulations", "عقود اللاعبين واللوائح المحلية والدولية", "Athlete contracts and national/international regulations"),
      sp("ksu-mg-430", "SMGT 430", 7, 3, "التحول الرقمي والرياضات الإلكترونية", "Sport Analytics & Esports Management", "تنظيم بطولات الرياضات الإلكترونية وتحليل البيانات", "Esports governance and sports business analytics"),
      sp("ksu-mg-490", "SMGT 490", 8, 6, "التدريب التعاوني في المؤسسات والاتحادات", "Sport Management Cooperative Internship", "التطبيق الإداري في الأندية والاتحادات الرياضية", "Administrative internship in clubs and federations"),
    ],
  },
];

// ============================================================================
// 3. جامعة الأميرة نورة - كلية علوم الرياضة والنشاط البدني (3 مسارات)
// ============================================================================
export const PNU_SPORT_MAJORS: MajorItem[] = [
  {
    id: "pnu-fit-wellness",
    totalCredits: 129,
    name: { ar: "اللياقة البدنية والصحية", en: "Physical Fitness & Health" },
    courses: [
      ...buildCoreSportFoundation("pnu-fw", "SSPA"),
      sp("pnu-fw-403", "SSPA 403", 5, 3, "فسيولوجيا اللياقة وصحة المرأة", "Fitness Physiology & Women's Health", "تكييف البرامج الرياضية لمختلف مراحل حياة المرأة", "Exercise programming across women's lifespan"),
      sp("pnu-fw-501", "SSPA 501", 5, 3, "تقييم مكونات الجسم والاختبارات", "Body Composition & Fitness Assessment", "القياسات الأنثروبومترية واختبارات التحمل", "Anthropometry and cardiorespiratory fitness testing"),
      sp("pnu-fw-601", "SSPA 601", 6, 3, "البيلاتس واللياقة الجماعية", "Pilates & Group Fitness Instruction", "تصميم الحصص الجماعية والمرونة الحركية", "Group fitness choreography and core stability"),
      sp("pnu-fw-701", "SSPA 701", 7, 3, "إدارة المراكز الرياضية النسائية", "Women's Fitness Facility Management", "إدارة الجودة والسلامة في الأندية الصحية", "Quality operations and safety in fitness centers"),
      sp("pnu-fw-801", "SSPA 801", 8, 6, "التدريب الميداني والامتياز", "Field Practicum & Internship", "التطبيق العملي في الأندية والمراكز الصحية", "Supervised internship in health and fitness clubs"),
    ],
  },
  {
    id: "pnu-sport-coaching",
    totalCredits: 129,
    name: { ar: "التدريب الرياضي", en: "Sports Coaching" },
    courses: [
      ...buildCoreSportFoundation("pnu-sc", "COCH"),
      sp("pnu-sc-403", "COCH 403", 5, 3, "تخطيط الأحمال والموسم التدريبي", "Training Load & Periodization", "بناء دورات التدريب السنوية والفصلية", "Annual macrocycles and workload monitoring"),
      sp("pnu-sc-502", "COCH 502", 5, 3, "التحليل البيوميكانيكي للأداء", "Biomechanical Performance Analysis", "تحليل الفيديو وتصحيح التكنيك الرياضي", "Motion capture and technique optimization"),
      sp("pnu-sc-601", "COCH 601", 6, 3, "علم النفس الرياضي والإعداد الذهني", "Sport Psychology & Mental Prep", "تعزيز الثقة والتحكم بالقلق التنافسي", "Confidence building and competitive focus"),
      sp("pnu-sc-701", "COCH 701", 7, 3, "الإصابات الرياضية والوقاية", "Sports Injuries & Prevention", "برامج الإحماء الوقائي والتأهيل الأولي", "Injury prevention protocols and acute care"),
      sp("pnu-sc-801", "COCH 801", 8, 6, "التدريب الميداني في الأندية والاتحادات", "Coaching Field Practicum", "المشاركة الميدانية في تدريب الفرق الرياضية", "Hands-on team coaching internship"),
    ],
  },
  {
    id: "pnu-sport-mgmt",
    totalCredits: 128,
    name: { ar: "الإدارة الرياضية والترويحية", en: "Sport & Recreation Management" },
    courses: [
      ...buildCoreSportFoundation("pnu-sm", "SMGT").slice(0, 6),
      sp("pnu-sm-301", "SMGT 301", 4, 3, "مبادئ الإدارة والحوكمة الرياضية", "Sport Management & Governance", "إدارة المؤسسات والاتحادات الرياضية", "Sport organization leadership and governance"),
      sp("pnu-sm-402", "SMGT 402", 5, 3, "التسويق والفعاليات الرياضية", "Sport Marketing & Events", "تخطيط البطولات ورعاية الفعاليات", "Tournament marketing and corporate sponsorship"),
      sp("pnu-sm-502", "SMGT 502", 6, 3, "برامج الرياضة المجتمعية والترويح", "Community Sport & Recreation", "تصميم المبادرات الرياضية لجودة الحياة", "Quality of Life sport initiatives and outreach"),
      sp("pnu-sm-602", "SMGT 602", 7, 3, "التشريعات واللوائح الرياضية", "Sport Law & Regulations", "الأنظمة الرياضية والعقود الاحترافية", "Sport legislation and athlete contracts"),
      sp("pnu-sm-801", "SMGT 801", 8, 6, "التدريب التعاوني الإداري", "Sport Administration Internship", "التطبيق الميداني في المنشآت والاتحادات", "Administrative internship in sport entities"),
    ],
  },
];

// ============================================================================
// 4. جامعة جدة - كلية علوم الرياضة (3 مسارات كاملة)
// ============================================================================
export const UJ_SPORT_MAJORS: MajorItem[] = [
  {
    id: "uj-sport-coaching",
    totalCredits: 128,
    name: { ar: "التدريب الرياضي", en: "Sports Coaching" },
    courses: [
      ...buildCoreSportFoundation("uj-co", "SPCO"),
      sp("uj-co-405", "SPCO 405", 5, 3, "نظريات وطرق التدريب الرياضي", "Sports Training Theories", "تخطيط الأحمال البدنية والفنية للرياضيين", "Periodization and technical load planning"),
      sp("uj-co-502", "SPCO 502", 5, 3, "القياس والتقويم في التدريب", "Measurement & Evaluation in Coaching", "تقييم الأداء البدني والمهاري", "Physical and tactical performance evaluation"),
      sp("uj-co-601", "SPCO 601", 6, 3, "علم النفس الرياضي والإصابات", "Sport Psychology & Injury Care", "الإعداد النفسي وإسعافات الملاعب", "Mental preparation and field injury care"),
      sp("uj-co-701", "SPCO 701", 7, 3, "الانتقاء الرياضي واكتشاف المواهب", "Talent Identification & Selection", "المعايير البيومترية والبدنية للمواهب", "Biometric and physical talent screening"),
      sp("uj-co-801", "SPCO 801", 8, 6, "التدريب الميداني ومشروع التخرج", "Field Practicum & Capstone", "التطبيق الميداني في الأندية والاتحادات", "Club coaching internship and capstone"),
    ],
  },
  {
    id: "uj-sport-mgmt",
    totalCredits: 128,
    name: { ar: "الإدارة الرياضية", en: "Sport Management" },
    courses: [
      ...buildCoreSportFoundation("uj-sm", "SPMG").slice(0, 6),
      sp("uj-sm-301", "SPMG 301", 4, 3, "الإدارة والتنظيم في الهيئات الرياضية", "Sport Organization & Administration", "إدارة الأندية والمنشآت الرياضية", "Club and facility administration"),
      sp("uj-sm-402", "SPMG 402", 5, 3, "الاقتصاد والتسويق الرياضي", "Sport Economics & Marketing", "تسويق البطولات وحقوق البث والرعاية", "Sponsorship, media rights, and sport marketing"),
      sp("uj-sm-601", "SPMG 601", 6, 3, "إدارة المرافق والأحداث الكبرى", "Major Event & Facility Operations", "تنظيم الفعاليات والبطولات الوطنية والدولية", "Operations for major sporting events"),
      sp("uj-sm-701", "SPMG 701", 7, 3, "القانون الرياضي والعلاقات العامة", "Sport Law & Public Relations", "حوكمة العقود والإعلام الرياضي", "Contract law and sport media relations"),
      sp("uj-sm-801", "SPMG 801", 8, 6, "التدريب الميداني في الإدارة الرياضية", "Sport Management Internship", "تطبيق إداري ميداني بالأندية والمنشآت", "Field practicum in sport administration"),
    ],
  },
  {
    id: "uj-sport-fitness",
    totalCredits: 128,
    name: { ar: "اللياقة البدنية والصحية", en: "Physical Fitness & Health" },
    courses: [
      ...buildCoreSportFoundation("uj-ft", "SPFT"),
      sp("uj-ft-501", "SPFT 501", 5, 3, "وصف التمارين الصحية للأمراض المزمنة", "Clinical Exercise Prescription", "النشاط البدني للسكري وضغط الدم والقلب", "Exercise for metabolic and cardiovascular health"),
      sp("uj-ft-601", "SPFT 601", 6, 3, "التأهيل الحركي والقوام", "Movement Rehab & Posture", "تصحيح الاختلالات العضلية والقوامية", "Muscular imbalance and postural correction"),
      sp("uj-ft-701", "SPFT 701", 7, 3, "تغذية اللياقة واختبارات الأداء", "Fitness Nutrition & Lab Testing", "تقييم التحمل الهوائي ومكونات الجسم", "VO2 testing and body composition"),
      sp("uj-ft-801", "SPFT 801", 8, 6, "الامتياز الميداني في مراكز اللياقة", "Fitness Center Field Internship", "تدريب ميداني في الأندية ومراكز التأهيل", "Supervised fitness & wellness practicum"),
    ],
  },
];

// ============================================================================
// 5. جامعة أم القرى، الملك خالد، طيبة، القصيم - توسيع كامل للمستويات 1-8
// ============================================================================
export const UQU_SPORT_MAJOR: MajorItem = {
  id: "uqu-sport",
  totalCredits: 128,
  name: { ar: "علوم الرياضة (التدريب والإدارة الرياضية)", en: "Sport Sciences (Coaching & Sport Management)" },
  courses: [
    sp("uqu-sp-101", "SPRT 101", 1, 2, "تاريخ الرياضة والمهارات الجامعية", "History of Sport & Academic Skills", "تطور الحركة الأولمبية والرياضة السعودية", "Olympic history and Saudi sport evolution"),
    sp("uqu-sp-102", "SPRT 102", 1, 3, "التشريح الحركي للرياضيين", "Kinesiological Anatomy for Athletes", "العظام والمفاصل والمجموعات العضلية العاملة", "Skeletal joints and active muscle groups"),
    sp("uqu-sp-103", "SPRT 103", 1, 2, "ألعاب القوى والميدان والمضمار", "Track & Field Athletics", "الجري والوثب والرمي وقوانين المضمار", "Running, jumping, throwing, and rules"),
    sp("uqu-sp-201", "SPRT 201", 2, 3, "الثقافة الصحية وأسس التهيئة البدنية", "Health Literacy & Physical Conditioning", "الوقاية الصحية وتنمية القدرات البدنية", "Preventive health and physical fitness development"),
    sp("uqu-sp-202", "SPRT 202", 2, 3, "علم الحركة ووظائف أعضاء الجهد البدني", "Kinesiology & Exercise Physiology", "الميكانيكا الحيوية واستجابات القلب والتنفس", "Biomechanics and cardiorespiratory responses"),
    sp("uqu-sp-203", "SPRT 203", 2, 2, "التغذية والرياضة", "Nutrition & Sport", "تغذية الرياضيين وتوازن السوائل والطاقة", "Athletic nutrition, hydration, and energy balance"),
    sp("uqu-sp-301", "SPRT 301", 3, 2, "التمرينات البدنية وكرة القدم والطائرة", "Calisthenics, Football & Volleyball", "اللياقة التمهيدية ومهارات اللعب الجماعي", "Foundational exercises and team sport skills"),
    sp("uqu-sp-302", "SPRT 302", 3, 2, "كرة السلة وكرة اليد", "Basketball & Handball", "المهارات الهجومية والدفاعية والتحكيم", "Offensive/defensive skills and officiating"),
    sp("uqu-sp-303", "SPRT 303", 3, 2, "الجمباز والسباحة وألعاب المضرب", "Gymnastics, Swimming & Racket Sports", "المهارات الأرضية والسباحة والتنس والريشة", "Floor skills, aquatics, tennis, and badminton"),
    sp("uqu-sp-401", "SPRT 401", 4, 3, "أسس التدريب الرياضي والإصابات", "Sports Training & Injury Care", "بناء الأحمال التدريبية والوقاية من الإصابات", "Training load design and injury prevention"),
    sp("uqu-sp-402", "SPRT 402", 4, 2, "التعلم الحركي وعلم النفس الرياضي", "Motor Learning & Sport Psychology", "اكتساب المهارات والتحضير النفسي للمنافسات", "Skill acquisition and mental preparation"),
    sp("uqu-sp-501", "SPRT 501", 5, 3, "المنشآت والتجهيزات والإدارة الرياضية", "Sport Facilities & Management", "تخطيط المنشآت وتنظيم الموسم الرياضي", "Facility planning and seasonal competition management"),
    sp("uqu-sp-502", "SPRT 502", 5, 3, "التربية البدنية المعدلة وذوو الإعاقة", "Adapted Physical Education", "برامج الأنشطة البدنية الشاملة لذوي الإعاقة", "Inclusive physical activity for disabilities"),
    sp("uqu-sp-601", "SPRT 601", 6, 3, "القياس والتقويم والبحث العلمي الرياضي", "Sport Measurement & Research", "الاختبارات البدنية والإحصاء الرياضي", "Fitness testing and sport statistics"),
    sp("uqu-sp-602", "SPRT 602", 6, 3, "استراتيجيات تدريس التربية البدنية", "Physical Education Teaching Methods", "تصميم الدرس الرياضي وتنفيذه وتقويمه", "PE lesson planning, delivery, and assessment"),
    sp("uqu-sp-701", "SPRT 701", 7, 3, "تطبيقات التدريب الرياضي وإدارة البطولات", "Coaching Applications & Tournaments", "تنظيم المسابقات والخطط التدريبية المتقدمة", "Competition management and advanced coaching"),
    sp("uqu-sp-702", "SPRT 702", 7, 3, "مشروع التخرج التطبيقي", "Applied Graduation Project", "بحث تطبيقي في التدريب أو الإدارة الرياضية", "Empirical capstone in coaching or management"),
    sp("uqu-sp-801", "SPRT 801", 8, 8, "التدريب الميداني", "Field Practicum & Internship", "التطبيق الميداني في الأندية والمدارس بمكة المكرمة", "Supervised practicum in clubs and schools"),
  ],
};

export const KKU_SPORT_MAJOR: MajorItem = {
  id: "kku-sport",
  totalCredits: 128,
  name: { ar: "علوم الرياضة والتربية البدنية", en: "Sport Sciences & Physical Education" },
  courses: [
    sp("kku-sp-101", "PHED 101", 1, 3, "علم التشريح الرياضي", "Sports Anatomy", "تشريح الأجهزة العضلية والعظمية والمفصلية", "Musculoskeletal and articular anatomy"),
    sp("kku-sp-102", "PHED 102", 1, 2, "أسس ومبادئ علوم الرياضة", "Foundations of Sport Sciences", "الفلسفة التربوية والاجتماعية للنشاط البدني", "Educational and social foundations of physical activity"),
    sp("kku-sp-103", "PHED 103", 1, 2, "ألعاب القوى واللياقة الأساسية", "Track & Field and Basic Fitness", "مسابقات المضمار والميدان وعناصر اللياقة", "Track & field events and fitness fundamentals"),
    sp("kku-sp-201", "PHED 201", 2, 3, "فسيولوجيا الجهد البدني والمرتفعات", "Exercise & Altitude Physiology", "تكيفات الأداء البدني في المرتفعات والبيئات المختلفة", "Physiological adaptations at altitude and exertion"),
    sp("kku-sp-202", "PHED 202", 2, 2, "النمو والتطور الحركي", "Physical Growth & Motor Development", "التغيرات البدنية والحركية عبر مراحل العمر", "Physical and motor milestones across age"),
    sp("kku-sp-301", "PHED 301", 3, 3, "علم الحركة والميكانيكا الحيوية", "Kinesiology & Biomechanics", "التحليل الحركي للمهارات الرياضية الأساسية", "Biomechanical analysis of fundamental sport skills"),
    sp("kku-sp-302", "PHED 302", 3, 2, "كرة القدم وكرة اليد", "Football & Handball", "المهارات الفنية والخططية والتحكيم", "Technical/tactical skills and refereeing"),
    sp("kku-sp-401", "PHED 401", 4, 2, "التمرينات البدنية والجمباز والألعاب الجماعية", "Exercises, Gymnastics & Team Sports", "كرة السلة والطائرة والجمباز الأرضي", "Basketball, volleyball, and floor gymnastics"),
    sp("kku-sp-402", "PHED 402", 4, 2, "السباحة والمنازلات وألعاب المضرب", "Aquatics, Combat & Racket Sports", "السباحة والدفاع عن النفس والتنس والريشة", "Swimming, self-defense, tennis, and badminton"),
    sp("kku-sp-501", "PHED 501", 5, 3, "الإصابات الرياضية والتأهيل الحركي", "Sports Injuries & Rehabilitation", "الإسعافات الأولية والتأهيل العلاجي للرياضيين", "First aid and therapeutic sport rehabilitation"),
    sp("kku-sp-502", "PHED 502", 5, 3, "نظريات وطرق التدريب الرياضي", "Sports Training Methods", "تخطيط الأحمال البدنية وإعداد الفرق الرياضية", "Training load periodization and team prep"),
    sp("kku-sp-601", "PHED 601", 6, 3, "التغذية الرياضية والقياس والتقويم", "Sport Nutrition & Measurement", "تغذية الرياضيين والاختبارات البدنية والمهارية", "Athletic nutrition and fitness/skill assessment"),
    sp("kku-sp-602", "PHED 602", 6, 3, "طرق تدريس التربية البدنية والدمج", "PE Teaching & Adapted Activity", "استراتيجيات التدريس والأنشطة المعدلة لذوي الإعاقة", "Teaching pedagogy and adapted physical activity"),
    sp("kku-sp-701", "PHED 701", 7, 3, "الإدارة الرياضية وعلم النفس الرياضي", "Sport Management & Psychology", "إدارة المنشآت والبطولات والإعداد النفسي", "Facility management, tournaments, and mental prep"),
    sp("kku-sp-702", "PHED 702", 7, 3, "البحث العلمي ومشروع التخرج", "Sport Research & Capstone Project", "إعداد بحث ميداني في علوم الرياضة", "Applied empirical capstone in sport sciences"),
    sp("kku-sp-801", "PHED 801", 8, 6, "التدريب الميداني والامتياز الرياضي", "Sport Field Practicum & Internship", "التطبيق الميداني في المدارس والأندية", "Supervised field practicum in schools and clubs"),
  ],
};

export const TAIBAH_SPORT_MAJOR: MajorItem = {
  id: "taibahu-sport",
  totalCredits: 124,
  name: { ar: "علوم الرياضة والنشاط البدني", en: "Sport Sciences & Physical Activity" },
  courses: [
    sp("taibahu-sp-101", "PE 101", 1, 2, "مدخل الأنشطة الرياضية والبدنية", "Introduction to Sport & Physical Activities", "المفاهيم التأسيسية للتربية البدنية وعلوم الرياضة", "Foundational concepts in PE and sport sciences"),
    sp("taibahu-sp-102", "PE 102", 1, 3, "التشريح للرياضيين والصحة واللياقة", "Anatomy for Athletes, Health & Fitness", "التركيب العضلي ومبادئ اللياقة الصحية", "Muscular anatomy and health-related fitness"),
    sp("taibahu-sp-201", "PE 201", 2, 2, "التمرينات والجمباز وألعاب المضرب", "Calisthenics, Gymnastics & Racket Sports", "اللياقة الحركية والجمباز والتنس والريشة", "Motor conditioning, gymnastics, and racket sports"),
    sp("taibahu-sp-202", "PE 202", 2, 3, "فسيولوجيا الرياضة والتغذية", "Exercise Physiology & Nutrition", "أنظمة الطاقة والتوازن الغذائي للرياضيين", "Bioenergetics and athletic nutrition"),
    sp("taibahu-sp-301", "PE 301", 3, 3, "الرياضات الجماعية والمنازلات الرياضية", "Team Sports & Combat Sports", "كرة القدم والسلة واليد والطائرة والدفاع عن النفس", "Team ball sports and martial arts fundamentals"),
    sp("taibahu-sp-302", "PE 302", 3, 2, "ألعاب القوى والسباحة", "Track & Field and Swimming", "مهارات المضمار والميدان والرياضات المائية", "Track & field athletics and aquatic strokes"),
    sp("taibahu-sp-401", "PE 401", 4, 3, "الأنشطة البدنية المعدلة وعلم الحركة", "Adapted Physical Activity & Kinesiology", "تكييف البرامج لذوي الاحتياجات وتحليل الحركة", "Adaptive programs and movement biomechanics"),
    sp("taibahu-sp-402", "PE 402", 4, 2, "التطور والتعلم الحركي", "Motor Development & Learning", "اكتساب المهارات الحركية والتحكم العصبي", "Motor skill acquisition and neural control"),
    sp("taibahu-sp-501", "PE 501", 5, 3, "طرق تدريس التربية البدنية", "PE Teaching Strategies", "تخطيط الدرس وإدارة البيئة الصفية والملعب", "PE lesson planning and gym class management"),
    sp("taibahu-sp-502", "PE 502", 5, 2, "الإصابات الرياضية والقوام", "Sports Injuries & Posture", "الوقاية من إصابات الملاعب والتمرينات القوامية", "Injury prevention and postural correction"),
    sp("taibahu-sp-601", "PE 601", 6, 3, "فسيولوجيا الجهد البدني والتدريب الرياضي", "Exercise Physiology & Athletic Training", "تخطيط الأحمال التدريبية وقياس الكفاءة الفسيولوجية", "Training periodization and physiological testing"),
    sp("taibahu-sp-602", "PE 602", 6, 3, "القياس والتقويم والبحث العلمي", "Measurement, Evaluation & Research", "الاختبارات البدنية وتصميم البحوث الرياضية", "Fitness batteries and sport research design"),
    sp("taibahu-sp-701", "PE 701", 7, 3, "الإدارة الرياضية وعلم النفس الرياضي", "Sport Management & Psychology", "إدارة البطولات والدافعية التنافسية", "Tournament management and competitive motivation"),
    sp("taibahu-sp-801", "PE 801", 8, 6, "التدريب الميداني ومشروع التخرج", "Field Practicum & Graduation Project", "الممارسة الميدانية والبحث التطبيقي", "Supervised practicum and applied research"),
  ],
};

export const QU_SPORT_MAJOR: MajorItem = {
  id: "qu-sport",
  totalCredits: 128,
  name: { ar: "علوم الرياضة والنشاط البدني", en: "Sport Sciences & Physical Activity" },
  courses: [
    sp("qu-sp-101", "PHED 101", 1, 3, "التشريح الوظيفي وأسس علوم الرياضة", "Functional Anatomy & Sport Foundations", "المفاهيم الأولية وتشريح الجهاز الحركي", "Core principles and musculoskeletal anatomy"),
    sp("qu-sp-102", "PHED 102", 1, 2, "ألعاب القوى والتهيئة البدنية", "Track & Field and Conditioning", "الجري والوثب والرمي واللياقة الأساسية", "Running, jumping, throwing, and fitness"),
    sp("qu-sp-201", "PHED 201", 2, 3, "فسيولوجيا الجهد البدني والتغذية الرياضية", "Exercise Physiology & Sport Nutrition", "الطاقة الحيوية وبرامج التغذية للرياضيين", "Bioenergetics and athletic nutrition planning"),
    sp("qu-sp-202", "PHED 202", 2, 2, "التطور والنمو الحركي", "Physical Growth & Motor Development", "خصائص النمو عبر المراحل العمرية", "Physical growth across developmental stages"),
    sp("qu-sp-301", "PHED 301", 3, 3, "علوم الحركة والميكانيكا الحيوية", "Kinesiology & Biomechanics", "تحليل المهارات الحركية وقوانين الحركة", "Movement mechanics and skill analysis"),
    sp("qu-sp-302", "PHED 302", 3, 2, "السباحة وألعاب المضرب", "Aquatics & Racket Sports", "السباحة والتنس والريشة وتنس الطاولة", "Swimming, tennis, badminton, and table tennis"),
    sp("qu-sp-401", "PHED 401", 4, 3, "ألعاب القوى والجمباز والألعاب الجماعية", "Athletics, Gymnastics & Team Sports", "تطبيقات الميدان والمضمار والألعاب الرياضية", "Track & field, gymnastics, and team sports"),
    sp("qu-sp-402", "PHED 402", 4, 3, "التربية البدنية المعدلة والمنازلات", "Adapted PE & Combat Sports", "الدمج الرياضي وأساسيات الدفاع عن النفس", "Inclusive PE and martial arts fundamentals"),
    sp("qu-sp-501", "PHED 501", 5, 3, "التدريب الرياضي والإدارة الترويحية", "Athletic Training & Recreation Management", "تخطيط الموسم التدريبي وإدارة الفعاليات", "Seasonal training plans and event management"),
    sp("qu-sp-502", "PHED 502", 5, 3, "مناهج وطرق تدريس التربية البدنية", "PE Curriculum & Pedagogy", "تخطيط الحصة الدراسية واستراتيجيات التدريس", "PE lesson architecture and teaching methods"),
    sp("qu-sp-601", "PHED 601", 6, 3, "القياس والتقويم وعلم النفس الرياضي", "Measurement, Evaluation & Sport Psych", "الاختبارات البدنية والمهارية والتحضير النفسي", "Physical testing and mental preparation"),
    sp("qu-sp-701", "PHED 701", 7, 3, "البيئة الصحية للرياضيين والإصابات", "Athlete Health Environment & Injuries", "الوقاية من الإجهاد الحراري وإصابات الملاعب", "Heat stress prevention and sports injury care"),
    sp("qu-sp-702", "PHED 702", 7, 3, "مشروع التخرج البحثي", "Capstone Research Project", "بحث تطبيقي في علوم الحركة أو التدريب", "Applied research in kinesiology or coaching"),
    sp("qu-sp-801", "PHED 801", 8, 6, "التدريب الميداني في الأندية والمدارس", "Field Practicum in Clubs & Schools", "التأهيل الميداني وفق مسارات رؤية 2030", "Field training aligned with Vision 2030 sport tracks"),
  ],
};

// ============================================================================
// 6. منشئ خطة علوم الرياضة والتربية البدنية لبقية الجامعات السعودية (8 مستويات)
// ============================================================================
export function createRegionalSportMajor(
  uniId: string,
  name: LocalizedText = {
    ar: "علوم الرياضة والنشاط البدني (التربية البدنية)",
    en: "Sport Sciences & Physical Activity (PE)",
  }
): MajorItem {
  return {
    id: `${uniId}-sport`,
    totalCredits: 128,
    name,
    courses: [
      ...buildCoreSportFoundation(`${uniId}-sp`, "SPED"),
      sp(`${uniId}-sp-403`, "SPED 403", 4, 2, "التربية البدنية المعدلة والألعاب الصغيرة", "Adapted PE & Lead-up Games", "تكييف الأنشطة الحركية لذوي الاحتياجات والأطفال", "Adapting movement activities for special needs and youth"),
      sp(`${uniId}-sp-501`, "SPED 501", 5, 3, "نظريات التدريب الرياضي والأحمال", "Sports Training & Periodization", "بناء الموسم التدريبي وتنمية القوة والتحمل", "Periodization and strength/endurance planning"),
      sp(`${uniId}-sp-502`, "SPED 502", 5, 2, "الإصابات الرياضية والإسعافات الأولية", "Sports Injuries & First Aid", "الوقاية من الإصابات والتأهيل الحركي الأولي", "Injury prevention and initial athletic rehab"),
      sp(`${uniId}-sp-601`, "SPED 601", 6, 3, "طرق تدريس التربية البدنية وعلم النفس", "PE Pedagogy & Sport Psychology", "أساليب التدريس الحديثة والدافعية التنافسية", "Modern PE teaching methods and competitive motivation"),
      sp(`${uniId}-sp-602`, "SPED 602", 6, 3, "القياس والتقويم والبحث العلمي الرياضي", "Measurement, Evaluation & Research", "الاختبارات البدنية والمهارية والتحليل الإحصائي", "Physical/skill testing and sport statistics"),
      sp(`${uniId}-sp-701`, "SPED 701", 7, 3, "الإدارة الرياضية وتنظيم البطولات", "Sport Management & Tournaments", "إدارة المنشآت والفعاليات والأنشطة الترويحية", "Facility operations, tournaments, and recreation"),
      sp(`${uniId}-sp-702`, "SPED 702", 7, 3, "مشروع التخرج في علوم الرياضة", "Sport Sciences Capstone Project", "إعداد ومناقشة بحث تطبيقي في التخصص", "Applied capstone thesis in sport sciences"),
      sp(`${uniId}-sp-801`, "SPED 801", 8, 6, "التدريب الميداني في المدارس والأندية", "Field Practicum in Schools & Clubs", "الممارسة الميدانية المتكاملة تحت الإشراف", "Supervised field practicum in schools and clubs"),
    ],
  };
}
