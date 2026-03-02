import type { Metadata } from "next";
import DailyTemplateClient from "./daily-template-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia XX (TITULO DE LA LECCION)",
  description: "Resumen corto de la leccion.",
};

export default function DailyTemplatePage() {
  return <DailyTemplateClient />;
}
