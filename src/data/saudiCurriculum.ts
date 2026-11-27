import { Language } from "../i18n/translations";
import { GENERAL_STAGES_DATA, GeneralStageItem } from "./generalEducationPlans";
import {
  CollegeItem,
  CourseItem,
  MajorItem,
  UNIVERSITIES_PLANS,
  UniversityPlanData,
} from "./universityPlans";

export type {
  CollegeItem,
  CourseItem,
  GeneralStageItem,
  MajorItem,
  UniversityPlanData,
};
export { GENERAL_STAGES_DATA, UNIVERSITIES_PLANS };

export interface AcademicSelectionIds {
  isUniversity: boolean;
  universityId: string;
  collegeId: string;
  majorId: string;
  generalStageId: string;
  courseId: string;
}

const LEGACY_STAGE_ALIASES: Record<string, string> = {
  primary: "primary-upper",
  highschool: "hs-general",
};

export function resolveAcademicSelection(
  sel: AcademicSelectionIds,
  lang: Language
): {
  university: UniversityPlanData;
  college: CollegeItem;
  major: MajorItem;
  stage: GeneralStageItem;
  course: CourseItem;
  contextLabel: string;
  breadcrumb: string;
} {
  const university =
    UNIVERSITIES_PLANS.find((u) => u.id === sel.universityId) ||
    UNIVERSITIES_PLANS[0];
  const college =
    university.colleges.find((c) => c.id === sel.collegeId) ||
    university.colleges[0];
  const major =
    college.majors.find((m) => m.id === sel.majorId) || college.majors[0];

  const mappedStageId =
    LEGACY_STAGE_ALIASES[sel.generalStageId] || sel.generalStageId;
  const stage =
    GENERAL_STAGES_DATA.find((s) => s.id === mappedStageId) ||
    GENERAL_STAGES_DATA.find((s) => s.id === "hs-general") ||
    GENERAL_STAGES_DATA[0];

  const availableCourses = sel.isUniversity ? major.courses : stage.courses;
  const course =
    availableCourses.find((c) => c.id === sel.courseId) || availableCourses[0];

  const breadcrumb = sel.isUniversity
    ? `${university.name[lang]} · ${college.name[lang]} · ${major.name[lang]}`
    : `${lang === "en" ? "Saudi K-12 & Qiyas" : "التعليم العام وقياس"} · ${stage.name[lang]}`;

  const courseLabel = lang === "en" ? "Course" : "مقرر";
  const subjectLabel = lang === "en" ? "Subject" : "مادة";

  const contextLabel = sel.isUniversity
    ? `${breadcrumb} · ${courseLabel}: ${course.title[lang]} (${course.code})`
    : `${breadcrumb} · ${subjectLabel}: ${course.title[lang]}`;

  return {
    university,
    college,
    major,
    stage,
    course,
    contextLabel,
    breadcrumb,
  };
}

export function getCatalogTotals(): {
  universities: number;
  colleges: number;
  majors: number;
  courses: number;
  generalStages: number;
  generalCourses: number;
} {
  let colleges = 0;
  let majors = 0;
  let courses = 0;
  for (const uni of UNIVERSITIES_PLANS) {
    colleges += uni.colleges.length;
    for (const col of uni.colleges) {
      majors += col.majors.length;
      for (const maj of col.majors) {
        courses += maj.courses.length;
      }
    }
  }
  let generalCourses = 0;
  for (const st of GENERAL_STAGES_DATA) {
    generalCourses += st.courses.length;
  }
  return {
    universities: UNIVERSITIES_PLANS.length,
    colleges,
    majors,
    courses,
    generalStages: GENERAL_STAGES_DATA.length,
    generalCourses,
  };
}
