import type { Metadata } from "next";
import Daily40Client from "./daily40-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 40 (Auditoria)",
  description: "Leccion sobre auditoria para rastrear quien hizo que y cuando en sistemas reales.",
};

export default function Daily40Page() {
  return <Daily40Client />;
}
