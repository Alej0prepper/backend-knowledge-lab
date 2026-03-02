import type { Metadata } from "next";
import Daily15Client from "./daily15-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 15 (Happy Path vs Casos reales)",
  description: "Leccion sobre disenar backend para fallos reales y no solo para el flujo ideal.",
};

export default function Daily15Page() {
  return <Daily15Client />;
}
