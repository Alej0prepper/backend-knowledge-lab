import type { Metadata } from "next";
import Daily9Client from "./daily9-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 9 (Contratos en API)",
  description: "Leccion corta sobre por que el backend define contratos estables, no solo respuestas.",
};

export default function Daily9Page() {
  return <Daily9Client />;
}
