import type { Metadata } from "next";
import Daily20Client from "./daily20-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 20 (Sin logs, estas ciego)",
  description: "Leccion sobre observabilidad: logs utiles para diagnosticar fallos reales en produccion.",
};

export default function Daily20Page() {
  return <Daily20Client />;
}
