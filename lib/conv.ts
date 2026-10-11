import { converters as en } from "@/content/en/converters";
import { converters as uk } from "@/content/uk/converters";
export const getConv = (locale: string) => (locale === "uk" ? uk : en);
