import type { Metadata } from "next";
import Daily19Client from "./daily19-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 19 (Consistencia vs Disponibilidad)",
  description: "Leccion sobre trade-offs reales entre consistencia y disponibilidad en sistemas backend.",
};

export default function Daily19Page() {
  return <Daily19Client />;
}
