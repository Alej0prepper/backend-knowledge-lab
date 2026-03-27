import type { Metadata } from "next";
import Daily34Client from "./daily34-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 34 (Background Jobs)",
  description: "Leccion sobre tareas en segundo plano para mejorar velocidad, escalabilidad y robustez.",
};

export default function Daily34Page() {
  return <Daily34Client />;
}
