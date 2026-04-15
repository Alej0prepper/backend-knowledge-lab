import type { Metadata } from "next";
import Daily45Client from "./daily45-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 45 (Aggregates)",
  description: "Leccion sobre Aggregates y Aggregate Root para proteger consistencia entre entidades relacionadas.",
};

export default function Daily45Page() {
  return <Daily45Client />;
}
