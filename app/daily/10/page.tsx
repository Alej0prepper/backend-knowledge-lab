import type { Metadata } from "next";
import Daily10Client from "./daily10-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 10 (400 vs 401 vs 403 vs 500)",
  description: "Leccion sobre como disenar errores HTTP como parte del contrato de una API profesional.",
};

export default function Daily10Page() {
  return <Daily10Client />;
}
