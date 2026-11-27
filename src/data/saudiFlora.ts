import { LocalizedText } from "../i18n/translations";

export type SaudiPlantId =
  | "palm"
  | "ghada"
  | "talh"
  | "juniper"
  | "sidr"
  | "lavender";

export interface SaudiPlantSpecies {
  id: SaudiPlantId;
  name: LocalizedText;
  shortName: LocalizedText;
  scientificName: string;
  region: LocalizedText;
  description: LocalizedText;
  accentColor: string;
}

export const SAUDI_PLANTS: SaudiPlantSpecies[] = [
  {
    id: "palm",
    name: { ar: "نخلة الأحساء والعُلا", en: "Oasis Date Palm" },
    shortName: { ar: "النخيل", en: "Palm" },
    scientificName: "Phoenix dactylifera",
    region: { ar: "الأحساء · العُلا · القصيم", en: "Al-Ahsa · AlUla · Qassim" },
    description: {
      ar: "رمز العطاء والواحات السعودية الأصيلة",
      en: "Iconic symbol of Saudi oases and enduring resilience",
    },
    accentColor: "#15803d",
  },
  {
    id: "ghada",
    name: { ar: "شجرة الغضا", en: "Desert Ghada" },
    shortName: { ar: "الغضا", en: "Ghada" },
    scientificName: "Haloxylon persicum",
    region: { ar: "النفود · عنيزة", en: "Al-Nafud · Unaizah" },
    description: {
      ar: "سيدة الكثبان الرملية في صحراء القصيم والنفود",
      en: "Guardian of golden sand dunes in Al-Nafud & Qassim",
    },
    accentColor: "#047857",
  },
  {
    id: "talh",
    name: { ar: "شجرة الطلح النجدي", en: "Najdi Talh Acacia" },
    shortName: { ar: "الطلح", en: "Talh" },
    scientificName: "Vachellia gerrardii",
    region: { ar: "نجد · روضة خريم · وادي حنيفة", en: "Najd · Rawdat Khuraim · Wadi Hanifah" },
    description: {
      ar: "مظلة الأودية والروضات النجدية ذات التاج المسطح",
      en: "Flat-topped acacia canopy shading Najdi wadis",
    },
    accentColor: "#4d7c0f",
  },
  {
    id: "juniper",
    name: { ar: "شجرة العرعر العسيري", en: "Asir Mountain Juniper" },
    shortName: { ar: "العرعر", en: "Juniper" },
    scientificName: "Juniperus procera",
    region: { ar: "جبال السروات · عسير · الباحة", en: "Sarawat Mountains · Asir · Al-Baha" },
    description: {
      ar: "صنوبريات المرتفعات الخضراء المعمرة في جنوب المملكة",
      en: "Evergreen highland conifer of Saudi Arabia's southern peaks",
    },
    accentColor: "#0f766e",
  },
  {
    id: "sidr",
    name: { ar: "شجرة السدر البري", en: "Wild Sidr Tree" },
    shortName: { ar: "السدر", en: "Sidr" },
    scientificName: "Ziziphus spina-christi",
    region: { ar: "تهامة · حائل · أودية المملكة", en: "Tihamah · Hail · Saudi Wadis" },
    description: {
      ar: "شجرة مباركة دائمة الخضرة تُنتج أجود أنواع العسل البري",
      en: "Resilient evergreen tree famous for Saudi Sidr honey",
    },
    accentColor: "#166534",
  },
  {
    id: "lavender",
    name: { ar: "خزامى الصمان والشمال", en: "Saudi Desert Lavender" },
    shortName: { ar: "الخزامى", en: "Lavender" },
    scientificName: "Horwoodia dicksoniae",
    region: { ar: "الصمان · الجوف · الحدود الشمالية", en: "Al-Summan · Al-Jouf · Northern Borders" },
    description: {
      ar: "سجادة أرجوانية عطرية تكسو صحاري المملكة في الربيع",
      en: "Fragrant purple spring bloom across northern Saudi plains",
    },
    accentColor: "#7e22ce",
  },
];

export function getSaudiPlantById(id: string): SaudiPlantSpecies {
  return SAUDI_PLANTS.find((p) => p.id === id) || SAUDI_PLANTS[0];
}
